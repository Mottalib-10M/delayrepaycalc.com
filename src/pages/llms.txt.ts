/** llms.txt (RECETTE §21), generated at build from the page registry: always in sync with the site. */
import { PAGES } from '../lib/guides';
import { SITE_URL, LAST_UPDATED, SITE_NAMES } from '../data/site-config';
import { route } from '../i18n/routes';
import { GROUPS_ORDER, groupLabel } from '../i18n/nav';
import params from '../data/params-2026.json';
import orr from '../data/orr-claims.json';

const words = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
export function GET() {
  const lines = [
    `# ${SITE_NAMES.en}`,
    '',
    `> Free Delay Repay calculator for Great Britain: applies the published compensation scheme of ${params.operators.length} train operators (bands from 15, 30 or 60 minutes, return legs, season ticket divisors) to a ticket, price and delay, gives the last day to claim (${params.national.claimDays} days under the National Rail Conditions of Travel, version ${params.national.version}), and links to each operator's own claim form. Also refunds after cancellations, strikes, missed connections, the Rail Ombudsman, ORR claim statistics, railcards and split tickets. Independent site, not a train company or National Rail. Calculators run in the browser. Published by Radif Partners. Last updated ${words(LAST_UPDATED)}.`,
    '',
    '## Data',
    `- Operator schemes read on each operator's Passenger's Charter or Delay Repay terms, and national rules on the National Rail Conditions of Travel, retrieved ${words(params.retrieved_at)}.`,
    `- Delay compensation claims statistics: Office of Rail and Road, Table 4410, release of ${words(orr.published)} (Open Government Licence v3.0).`,
    '- Bank holidays: GOV.UK, 2025 to 2027 (OGL v3.0).',
    '',
    `- [Delay Repay calculator](${SITE_URL}${route('home', 'en')}): amount, band and claim deadline for any operator and ticket`,
    '',
    ...GROUPS_ORDER.flatMap((g) => [`## ${groupLabel(g, 'en', false)}`, ...PAGES.filter((p) => p.group === g).map((p) => `- [${p.en.nav}](${SITE_URL}${route(p.id, 'en')}): ${p.en.card}`), '']),
    '## About',
    `- [Method and sources](${SITE_URL}${route('method', 'en')})`,
    `- [About](${SITE_URL}${route('about', 'en')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
