#!/usr/bin/env python3
"""Relève des statistiques ORR « Table 4410: Delay compensation claims » (Open Government Licence v3.0).

Lit la page de la table sur le portail de données de l'ORR, télécharge le classeur ODS qu'elle cite,
et écrit src/data/orr-claims.json : pour chaque opérateur, l'exercice clos le plus récent (avril à mars)
et le cumul provisoire de l'exercice en cours (périodes ferroviaires publiées), avec la date de
publication et la prochaine date annoncée.

Usage : python3 scripts/update-data.py            (affiche ce qui changerait)
        python3 scripts/update-data.py --write    (écrit le JSON)
        python3 scripts/update-data.py --file x.ods --write   (classeur déjà téléchargé)
Sortie : 0 si rien n'a changé ou si l'écriture a réussi, 2 si les chiffres ont changé sans --write.
Bibliothèque standard seulement (le workflow GitHub n'installe rien).
"""
import json, os, re, sys, urllib.request, zipfile, io, datetime
import xml.etree.ElementTree as ET

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'src', 'data', 'orr-claims.json')
PAGE = 'https://dataportal.orr.gov.uk/statistics/passenger-experience/delay-compensation-claims/table-4410-delay-compensation-claims/'
UA = 'Mozilla/5.0 (compatible; delayrepaycalc data refresh; +https://delayrepaycalc.com)'
NS = {'table': 'urn:oasis:names:tc:opendocument:xmlns:table:1.0', 'text': 'urn:oasis:names:tc:opendocument:xmlns:text:1.0', 'office': 'urn:oasis:names:tc:opendocument:xmlns:office:1.0'}
T = '{%s}' % NS['table']

# Colonne ORR -> identifiant de page du site (un opérateur ORR peut couvrir plusieurs marques).
COLS = {
    'Avanti West Coast': 'avanti-west-coast', 'c2c': 'c2c', 'Caledonian Sleeper': 'caledonian-sleeper',
    'Chiltern Railways': 'chiltern-railways', 'CrossCountry': 'crosscountry', 'East Midlands Railway': 'east-midlands-railway',
    'Elizabeth line': 'elizabeth-line', 'Grand Central': 'grand-central', 'Great Western Railway': 'gwr',
    'Greater Anglia': 'greater-anglia', 'Greater Thameslink Railway': 'gtr', 'Govia Thameslink Railway': 'gtr',
    'Heathrow Express': 'heathrow-express', 'Hull Trains': 'hull-trains', 'London North Eastern Railway': 'lner',
    'London Overground': 'london-overground', 'Lumo (East Coast)': 'lumo', 'Lumo': 'lumo', 'Lumo (West Coast)': 'lumo-west-coast',
    'Merseyrail': 'merseyrail', 'Northern Trains': 'northern', 'ScotRail': 'scotrail', 'South Western Railway': 'south-western-railway',
    'Southeastern': 'southeastern', 'TfW Rail': 'transport-for-wales', 'TransPennine Express': 'transpennine-express',
    'West Midlands Trains': 'west-midlands-trains', 'Great Britain': 'great-britain',
}
MEASURES = {
    'Volume of claims received within period': 'received', 'Volume of claims closed within period': 'closed',
    'Volume of claims approved within period': 'approved', 'Percentage closed within 20 working days': 'within20',
}


def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.read()


def rows_of(data):
    root = ET.fromstring(zipfile.ZipFile(io.BytesIO(data)).read('content.xml'))
    sheets = {}
    for t in root.iter(T + 'table'):
        rows = []
        for r in t.iter(T + 'table-row'):
            rep = int(r.get(T + 'number-rows-repeated', '1'))
            row = []
            for c in r:
                if c.tag not in (T + 'table-cell', T + 'covered-table-cell'):
                    continue
                n = int(c.get(T + 'number-columns-repeated', '1'))
                v = c.get('{%s}value' % NS['office']) or ' '.join(''.join(x.itertext()) for x in c.iter('{%s}p' % NS['text']))
                row += [v] * min(n, 60)
            while row and row[-1] == '':
                row.pop()
            if row:
                rows += [row] * min(rep, 1)
        sheets[t.get(T + 'name')] = rows
    return sheets


def num(v):
    try:
        return float(v)
    except (TypeError, ValueError):
        return None


def build(data):
    sheets = rows_of(data)
    cover = ' '.join(' '.join(r) for r in sheets.get('Cover_sheet', []))
    pub = re.search(r'initially published at [0-9:]+ on (\d{1,2} \w+ \d{4})', cover)
    nxt = re.search(r'next publication date is scheduled for [0-9:]+ on (\d{1,2} \w+ \d{4})', cover)
    iso = lambda s: datetime.datetime.strptime(s, '%d %B %Y').date().isoformat() if s else None
    main = next(v for k, v in sheets.items() if k.startswith('4410'))
    hdr = None
    annual, periods = {}, {}
    for r in main:
        if r and r[0] == 'Time period':
            hdr = [re.sub(r'\s*\[note \d+\]', '', h).strip() for h in r]
            continue
        if not hdr or len(r) < 3 or r[1] not in MEASURES:
            continue
        label, m = r[0], MEASURES[r[1]]
        mper = re.match(r'Apr (\d{4}) to Mar (\d{4}) Period (\d{2})', label)
        myear = re.match(r'Apr (\d{4}) to Mar (\d{4})( \[p\])?$', label)
        for i, col in enumerate(hdr[2:], start=2):
            op = COLS.get(col)
            if not op or i >= len(r):
                continue
            v = num(r[i])
            if mper:
                key = f'{mper.group(1)}-{mper.group(2)[2:]}'
                periods.setdefault(key, {}).setdefault(int(mper.group(3)), {}).setdefault(op, {})[m] = v
            elif myear:
                key = f'{myear.group(1)}-{myear.group(2)[2:]}'
                annual.setdefault(key, {}).setdefault(op, {})[m] = v
    years = sorted(annual)
    closed_years = [y for y in years if len(periods.get(y, {})) == 13]
    last_full = closed_years[-1]
    current = sorted(periods)[-1]
    cur_periods = sorted(periods[current])

    def summarise(d):
        out = {}
        for op, v in d.items():
            if v.get('closed'):
                out[op] = {
                    'received': round(v.get('received') or 0), 'closed': round(v['closed']), 'approved': round(v.get('approved') or 0),
                    'approvedPct': round((v.get('approved') or 0) / v['closed'], 4) if v['closed'] else None,
                    'within20Pct': round(v['within20'], 4) if v.get('within20') is not None else None,
                }
        return out

    # Exercice en cours : somme des périodes publiées ; le délai de 20 jours est pondéré par les clôtures.
    agg = {}
    for p in cur_periods:
        for op, v in periods[current][p].items():
            a = agg.setdefault(op, {'received': 0, 'closed': 0, 'approved': 0, 'w': 0})
            for k in ('received', 'closed', 'approved'):
                a[k] += v.get(k) or 0
            if v.get('within20') is not None and v.get('closed'):
                a['w'] += v['within20'] * v['closed']
    cur = {op: {'received': a['received'], 'closed': a['closed'], 'approved': a['approved'], 'within20': a['w'] / a['closed'] if a['closed'] else None} for op, a in agg.items()}
    return {
        'source': 'Office of Rail and Road, Table 4410: Delay compensation claims (Open Government Licence v3.0)',
        'url': PAGE,
        'published': iso(pub.group(1) if pub else None),
        'next': iso(nxt.group(1) if nxt else None),
        'lastYear': {'label': f'April {last_full[:4]} to March 20{last_full[-2:]}', 'ops': summarise(annual[last_full])},
        'current': {'label': f'April {current[:4]} to March 20{current[-2:]}', 'periods': cur_periods, 'provisional': True, 'ops': summarise(cur)},
    }


def main():
    args = sys.argv[1:]
    if '--file' in args:
        data = open(args[args.index('--file') + 1], 'rb').read()
    else:
        html = get(PAGE).decode('utf-8', 'ignore')
        m = re.search(r'href="([^"]*4410[^"]*\.ods[^"]*)"', html)
        if not m:
            sys.exit('Lien du classeur ODS introuvable sur la page de la table 4410')
        href = m.group(1).replace('&amp;', '&')
        data = get(href if href.startswith('http') else 'https://dataportal.orr.gov.uk' + href)
    new = build(data)
    old = json.load(open(OUT)) if os.path.exists(OUT) else None
    same = old is not None and {k: v for k, v in old.items() if k != 'retrieved_at'} == new
    new['retrieved_at'] = old['retrieved_at'] if same else datetime.date.today().isoformat()
    print(f"ORR 4410 publié le {new['published']}, prochain le {new['next']} ; exercice clos {new['lastYear']['label']}, en cours {new['current']['label']} (périodes {new['current']['periods']})")
    if same:
        print('Aucun changement.')
        return 0
    if '--write' in args:
        json.dump(new, open(OUT, 'w'), ensure_ascii=False, indent=1)
        print('Écrit :', OUT)
        return 0
    print('Les chiffres ont changé (relancer avec --write).')
    return 2


if __name__ == '__main__':
    sys.exit(main())
