import { definePage } from '../../lib/guide-types';

type Row = { received: number; closed: number; approved: number; approvedPct: number | null; within20Pct: number | null };
const NAMES: Record<string, [string, string]> = {
  'avanti-west-coast': ['Avanti West Coast', 'op-avanti-west-coast'], c2c: ['c2c', 'op-c2c'], 'caledonian-sleeper': ['Caledonian Sleeper', 'op-caledonian-sleeper'],
  'chiltern-railways': ['Chiltern Railways', 'op-chiltern-railways'], crosscountry: ['CrossCountry', 'op-crosscountry'], 'east-midlands-railway': ['East Midlands Railway', 'op-east-midlands-railway'],
  'elizabeth-line': ['Elizabeth line', 'op-elizabeth-line'], 'grand-central': ['Grand Central', 'op-grand-central'], gwr: ['Great Western Railway', 'op-gwr'],
  'greater-anglia': ['Greater Anglia', 'op-greater-anglia'], gtr: ['Govia Thameslink Railway (Southern, Thameslink, Great Northern, Gatwick Express)', 'op-southern'],
  'heathrow-express': ['Heathrow Express', 'op-heathrow-express'], 'hull-trains': ['Hull Trains', 'op-hull-trains'], lner: ['LNER', 'op-lner'],
  'london-overground': ['London Overground', 'op-london-overground'], lumo: ['Lumo', 'op-lumo'], merseyrail: ['Merseyrail', 'op-merseyrail'], northern: ['Northern', 'op-northern'],
  scotrail: ['ScotRail', 'op-scotrail'], 'south-western-railway': ['South Western Railway', 'op-south-western-railway'], southeastern: ['Southeastern', 'op-southeastern'],
  'transport-for-wales': ['Transport for Wales', 'op-transport-for-wales'], 'transpennine-express': ['TransPennine Express', 'op-transpennine-express'],
  'west-midlands-trains': ['West Midlands Trains (West Midlands Railway, London Northwestern Railway)', 'op-west-midlands-railway'],
};

export default definePage({
  id: 'delay-repay-claims-by-operator',
  group: 'claim',
  order: 12,
  tool: { kind: 'mini:orrstats' },
  mini: { kind: 'mini:dr15' },
  related: ['delay-repay-rejected', 'delay-repay-15-minutes', 'how-to-claim-delay-repay', 'automatic-delay-repay'],
  sources: ['orr_4410'],
  en: {
    slug: 'delay-repay-claims-by-operator',
    nav: 'Claims statistics',
    card: 'How many Delay Repay claims each operator approves and how fast it closes them, from the Office of Rail and Road’s official statistics.',
    title: 'Delay Repay Claims by Operator: Approval Rates and Speed',
    description: 'Delay Repay claims by operator: how many each train company received, approved and closed within 20 working days, from the official ORR statistics, updated.',
    h1: 'Delay Repay claims by operator: approval and speed',
    intro: 'Pick an operator: the tool shows the share of claims it approved and closed within 20 working days in the last full year.',
    resume: (h) => {
      const G = h.ORR.lastYear.ops['great-britain'] as Row; const C = h.ORR.current.ops['great-britain'] as Row;
      return `The Office of Rail and Road publishes, each quarter, how train operators handle delay compensation claims: how many they received, how many they closed, how many they approved, and the share closed within 20 working days. In ${h.ORR.lastYear.label}, operators in Great Britain closed ${h.num(G.closed)} claims and approved ${h.pc(G.approvedPct ?? 0, 1)} of them; ${h.pc(G.within20Pct ?? 0, 1)} were closed within 20 working days. In the first ${h.num(h.ORR.current.periods.length)} four-week periods of ${h.ORR.current.label}, still provisional, ${h.num(C.closed)} claims were closed and ${h.pc(C.approvedPct ?? 0, 1)} approved. The figures differ widely between operators, reflecting their passengers, their tickets and how claims are checked, so a low rate is a reason to claim carefully rather than proof of unfairness. The table below gives every operator the statistics report, and the page is refreshed each time a new release comes out: the latest release is dated ${h.date(h.ORR.published)}, the next is due on ${h.date(h.ORR.next)}.`;
    },
    faqs: (h) => [
      { q: 'Which train company approves the most Delay Repay claims?', a: `The ranking changes from one release to the next, and the table on this page is sorted by approval rate for ${h.ORR.lastYear.label}. Compare operators of a similar kind: long-distance operators with many Advance tickets and commuter operators with many season tickets receive very different claims, which affects the rate as much as the way claims are handled.` },
      { q: 'Why are some operators missing from the claims statistics?', a: 'The Office of Rail and Road reports operators as legal entities. Govia Thameslink Railway covers Southern, Thameslink, Great Northern and Gatwick Express together; West Midlands Trains covers West Midlands Railway and London Northwestern Railway. Their brand pages on this site quote the group figure, and say so. Stansted Express claims are part of Greater Anglia.' },
      { q: 'What does closed within 20 working days mean for my claim?', a: 'It is the share of claims the operator finished, approved or rejected, within 20 working days of receiving them. It says nothing about your own claim, but an operator that closes nearly all claims within that time is unlikely to have lost yours if you have heard nothing after a month: ask for news with your reference.' },
    ],
    body: (h) => {
      const rows = Object.entries(h.ORR.lastYear.ops as Record<string, Row>).filter(([k]) => k !== 'great-britain' && NAMES[k])
        .sort((a, b) => (b[1].approvedPct ?? 0) - (a[1].approvedPct ?? 0))
        .map(([k, r]) => { const c = (h.ORR.current.ops as Record<string, Row>)[k]; return [h.a(NAMES[k][1], NAMES[k][0]), r.closed, r.approvedPct === null ? '-' : h.pc(r.approvedPct, 1), r.within20Pct === null ? '-' : h.pc(r.within20Pct, 1), c && c.approvedPct !== null ? h.pc(c.approvedPct, 1) : '-']; });
      return `
<h2>Every operator, last full year</h2>
${h.table(['Operator', 'Claims closed', 'Approved', 'Closed in 20 working days', `Approved, ${h.ORR.current.label} so far`], rows, `Office of Rail and Road, ${h.src('orr_4410', 'Table 4410, delay compensation claims')}, release of ${h.date(h.ORR.published)}. Contains public sector information licensed under the Open Government Licence v3.0. Current year provisional.`, ['l', 'r', 'r', 'r', 'r'])}

<h2>How to read these figures</h2>
<ul>
<li><strong>Approved</strong> is the number of approved claims reported by the operator, divided here by the claims it closed in the same period.</li>
<li><strong>Closed within 20 working days</strong> is a speed measure. It covers rejections as well as payments.</li>
<li><strong>Received and closed</strong> can differ, since a claim received late in a period may be closed in the next one.</li>
<li><strong>The current year</strong> is provisional: later releases may revise them.</li>
</ul>

<h2>Why operators differ</h2>
<p>An operator with frequent short delays and many season ticket holders receives many small claims, some of them for delays that its records put just under a band. An operator with long-distance Advance tickets bought on its own site may pay a large share automatically. The type of scheme matters too: an operator that starts paying at 30 minutes rejects claims for 20-minute delays that a Delay Repay 15 operator would pay. The ${h.a('delay-repay-15-minutes', 'Delay Repay 15 page')} lists which is which.</p>
<!--tool:mini:dr15-->

<h2>Using the figures for your own claim</h2>
<p>Statistics cannot predict a single decision, but they tell you what is normal. If your claim has been refused by an operator that approves most claims, the refusal is likely to rest on a fact that can be checked: the train, the arrival time, the ticket. Ask which one, and send what is missing, as the ${h.a('delay-repay-rejected', 'rejected claims page')} explains. If an operator takes much longer than the industry to answer, the ${h.num(h.OMB.afterWorkingDays)} working days after which the ${h.a('rail-ombudsman', 'Rail Ombudsman')} can step in run from your complaint, not from your claim.</p>

<h2>How this page is kept up to date</h2>
<p>A script reads the latest release of Table 4410 published by the Office of Rail and Road each month and updates the figures when a new release appears; the tables and the tool read the same file. The release used here is dated ${h.date(h.ORR.published)}, and the next one is announced for ${h.date(h.ORR.next)}.</p>`;
    },
  },
});
