import { definePage } from '../../lib/guide-types';

const ID = 'east-midlands-railway';

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 106,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 46, delay: 22 } },
  mini: { kind: 'mini:bands', props: { op: ID } },
  related: ['season-ticket-delay-repay', 'delay-repay-15-minutes', 'how-to-claim-delay-repay', 'op-crosscountry'],
  sources: ['op_east_midlands_railway_1', 'nrcot', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'east-midlands-railway-delay-repay',
    nav: 'EMR',
    card: 'East Midlands Railway pays from 15 minutes late: its four bands, the divisor tables for weekly, monthly and annual seasons, and what to upload with a claim.',
    title: 'East Midlands Railway Delay Repay: Bands and Season Rates',
    description: 'East Midlands Railway Delay Repay pays from 15 minutes late. Read its season divisor tables, the proof it asks for, its payment options and its approval rate.',
    h1: 'East Midlands Railway Delay Repay',
    intro: 'Set to East Midlands Railway, the calculator turns your fare and the minutes late into the amount its Delay Repay bands give.',
    resume: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr);
      return `East Midlands Railway, known as EMR, pays Delay Repay from ${h.num(h.threshold(o))} minutes late at your final destination under ${o.scheme}. Its page uses four timeframes: ${h.share(o.bands[0].single)} of a single or ${h.share(o.bands[0].ret)} of a return from ${h.num(o.bands[0].from)} minutes, ${h.share(o.bands[1].single)} or ${h.share(o.bands[1].ret)} from ${h.num(o.bands[1].from)}, the full single or ${h.share(o.bands[2].ret)} of the return from ${h.num(o.bands[2].from)}, and the full return from ${h.num(o.bands[3].from)} minutes. A ${h.gbp(46)} single that arrives 22 minutes late gives ${h.gbp(h.pay(ID, 'single', 46, 22))}. Season holders get a divisor table for each band instead of a single journey value. You claim within ${h.num(o.deadlineDays)} days and choose payment by ${o.payment.join(', ').replace(/, ([^,]*)$/, ' or $1')}. The company is ${o.owner.charAt(0).toLowerCase()}${o.owner.slice(1)}. In ${h.ORR.lastYear.label} it approved ${h.pc(r.last?.approvedPct ?? 0, 1)} of the ${h.num(r.last?.closed ?? 0)} claims it closed.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Can I claim East Midlands Railway Delay Repay for several journeys at once?', a: 'Not online: the web form takes one journey per claim, though an account saves your details and a season ticket for the next one. The paper form is different. EMR says one paper form can cover as many as five late journeys, and you can download it or pick one up at its stations, then post it.' },
        { q: 'What proof does East Midlands Railway want with a Delay Repay claim?', a: 'A photo of the ticket itself, not the seat reservation or receipt, in JPEG, TIF, PNG or GIF under 2MB. EMR wants a used ticket cut or marked before you send its photo; a ticket still valid, such as a season, is exempt. For a mobile season, enter the code from the coupon; screenshots are not accepted, so upload a photo of the booking confirmation showing the price.' },
        { q: 'Does East Midlands Railway pay if its delay made me miss another company’s train?', a: `Yes. EMR states that you can claim if one of its delays makes you miss a connection, whichever company runs the next train, provided you get to your final destination over ${h.num(h.threshold(o))} minutes late. Enter the whole journey from the first station to the last, even the parts that were not with EMR, so the claim is valued on the full cost.` },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr); const d = o.season!.divisors;
      const kinds: Array<['weekly' | 'monthly' | 'annual', string]> = [['weekly', 'Weekly'], ['monthly', 'Monthly'], ['annual', 'Annual']];
      return `
<h2>The four bands on a Midland Main Line fare</h2>
<p>EMR's main line runs north from London St Pancras to Leicester, Nottingham, Derby and Sheffield, alongside regional services across the East Midlands. On a ${h.gbp(46)} single, each band is worth the amounts below.</p>
${h.table(['Late at final destination', 'Single', `On ${h.gbp(46)}`, 'Return, per late leg'], h.bandRows(ID, 46), `Bands read on an ${h.src('op_east_midlands_railway_1', 'archived copy of the EMR Delay Repay page')}.`, ['l', 'r', 'r', 'r'])}
<p>The "final destination" means the station where you get off for good, not the end of the line. A 14-minute delay pays nothing; one more minute moves you into the first band.</p>

<h2>A divisor for every band</h2>
<p>Most companies divide a season price by one number to find a journey value, then apply a percentage. EMR prints the result directly: one divisor for each band and each season type. Dividing the season price by the figure in the right cell gives the compensation for one delayed journey.</p>
${h.table(['Season', ...o.bands.map((b) => h.mins(b) + ' min')], kinds.map(([k, label]) => [label, ...o.bands.map((b) => h.num((d[k] ?? 0) / b.season))]), 'Divide the season price by the figure for your delay. Flexi and quarterly divisors are not given on the page read.', ['l', 'r', 'r', 'r', 'r'])}
<p>The two methods give the same money. On an annual season of ${h.gbp(5568)}, a 45-minute delay pays ${h.gbp(h.pay(ID, 'annual', 5568, 45))} and a delay of two hours or more pays ${h.gbp(h.pay(ID, 'annual', 5568, 125))}, because the last column counts as a full day's return. No Flexi Season divisor is published, so the calculator cannot value a Flexi claim; the form of the operator works it out. Compare EMR with other operators in the tool below.</p>
<!--tool:mini:divisors|{"op":"${ID}","kind":2,"price":5568}-->

<h2>Filling in the claim</h2>
<ul>
<li>Claim online with an account, which keeps your personal details, preferred payment method and a saved season ticket, or post the paper form.</li>
<li>Enter every ticket used for the journey and upload an image of each one.</li>
<li>If you bought an e-ticket and lost access to the retailer's app, use the PDF sent by email at purchase.</li>
<li>If you entered something wrongly, do not send a second claim: correct it through the online portal or by phone.</li>
<li>For PayPal, the email on the claim must match the one on your PayPal account.</li>
</ul>
<p>EMR checks its train running system to confirm the delay and says it treats every claim individually rather than ruling any out automatically. Unlike several neighbours, it does not run an automatic claim scheme on the page read, so each journey needs a claim within ${h.num(o.deadlineDays)} days.</p>

<h2>Performance and the national picture</h2>
<p>EMR publishes its own Delay Repay performance by railway period on its page. The independent figure is the ORR's: in ${h.ORR.lastYear.label}, ${h.src('orr_4410', 'Table 4410')} records ${h.num(r.last?.received ?? 0)} claims received, ${h.pc(r.last?.approvedPct ?? 0, 1)} approved and ${h.pc(r.last?.within20Pct ?? 0, 1)} closed within 20 working days. Provisional figures for ${h.ORR.current.label} show ${h.num(r.current?.received ?? 0)} claims over the first ${h.num(h.ORR.current.periods.length)} periods, with ${h.pc(r.current?.approvedPct ?? 0, 1)} approved.</p>
<p>The ${h.src('nrcot', 'Conditions of Travel')} also matter when a train is cancelled. Since ${h.date(h.N.crossOperatorFrom)}, a group of operators accept each other's tickets within ${h.num(h.N.crossOperatorWindowHours)} hours of a cancelled train; ${h.N.crossOperatorLater.includes(o.name) ? 'East Midlands Railway is listed as joining that arrangement later, not yet among the first operators' : 'East Midlands Railway takes part'}. EMR remains privately run by Transport UK.</p>`;
    },
  },
});
