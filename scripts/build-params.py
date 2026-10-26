#!/usr/bin/env python3
"""Assemble src/data/params-2026.json from data/params-national.json and data/operators.json.

Les barèmes des opérateurs (data/operators.json) et les règles nationales (data/params-national.json)
sont relus à la main sur les sources citées (RECETTE §17.4) ; ce script ne fait que les réunir, vérifier
leur forme et ajouter les sources de chaque opérateur au registre des sources.
Usage : python3 scripts/build-params.py
"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
nat = json.load(open(os.path.join(ROOT, 'data', 'params-national.json')))
ops = json.load(open(os.path.join(ROOT, 'data', 'operators.json')))

errors = []
for o in ops['operators']:
    bands = o['bands']
    if not bands:
        errors.append(f"{o['id']}: aucun palier")
    prev = None
    for b in sorted(bands, key=lambda b: b['from']):
        if prev is not None and prev['to'] is not None and b['from'] != prev['to'] + 1:
            errors.append(f"{o['id']}: paliers non contigus ({prev['to']} -> {b['from']})")
        for k, mx in (('single', 1), ('ret', 1), ('season', 2)):
            if not (0 <= b[k] <= mx):
                errors.append(f"{o['id']}: part {k} hors de [0, 1]")
        prev = b
    if o['deadlineDays'] < 28:
        errors.append(f"{o['id']}: délai inférieur aux 28 jours des Conditions of Travel")
    for s in o['sources']:
        if s not in ops['sources']:
            errors.append(f"{o['id']}: source inconnue {s}")
    # Le minimum national (condition 33.3) : 60 minutes et plus, au moins 50 % du prix de la partie retardée.
    b60 = next((b for b in bands if b['from'] <= 60 and (b['to'] is None or b['to'] >= 60)), None)
    if not b60 or b60['single'] < 0.5 or b60['ret'] < 0.25:
        errors.append(f"{o['id']}: sous le minimum national à 60 minutes")
if errors:
    sys.exit('\n'.join(errors))

out = {k: v for k, v in nat.items() if k != 'sources'}
out['_lisezmoi'] = 'Généré par scripts/build-params.py depuis data/params-national.json et data/operators.json : ne pas modifier à la main.'
out['sources'] = {**nat['sources'], **ops['sources']}
out['operators'] = ops['operators']
json.dump(out, open(os.path.join(ROOT, 'src', 'data', 'params-2026.json'), 'w'), ensure_ascii=False, indent=1)
print(f"params-2026.json : {len(ops['operators'])} opérateurs, {len(out['sources'])} sources")
