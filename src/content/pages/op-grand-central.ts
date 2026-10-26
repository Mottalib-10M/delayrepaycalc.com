import { definePage } from '../../lib/guide-types';

const ID = 'grand-central';

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 109,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 54, delay: 95 } },
  mini: { kind: 'mini:returnlegs', props: { op: ID, price: 96, out: 130, back: 0 } },
  related: ['delay-repay-amounts', 'delay-repay-return-ticket', 'op-lner', 'op-hull-trains', 'op-lumo'],
  sources: ['op_grand_central_1', 'op_grand_central_2', 'nrcot', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'grand-central-delay-compensation',
    nav: 'Grand Central',
    card: 'Grand Central pays nothing before an hour late: its Charter Compensation in three steps, the free single journey option and how few claims it approves.',
    title: 'Grand Central Delay Compensation: The One-Hour Charter',
    description: 'Grand Central delay compensation starts at 60 minutes late, in three bands up to the full fare. See what you get, the free single option and its claim record.',
    h1: 'Grand Central delay compensation',
    intro: 'The calculator applies Grand Central’s Charter Compensation: with the minutes late and the fare you paid, it shows which of its three bands you reach.',
    resume: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr);
      return `Grand Central, an open access operator owned by Arriva, does not use Delay Repay. It pays what it calls Charter Compensation, and only from ${h.num(h.threshold(o))} minutes late, the same point at which the National Rail Conditions of Travel guarantee their minimum. Its policy has three steps: ${h.share(o.bands[0].single)} of a single fare for a delay of one to two hours, ${h.share(o.bands[1].single)} for two to three hours, and the whole single beyond three hours. A return is compensated on the "relevant portion"; read as half the return fare, that is ${h.share(o.bands[0].ret)}, ${h.share(o.bands[1].ret)} and ${h.share(o.bands[2].ret)} per late leg. A ${h.gbp(54)} single arriving 95 minutes late gives ${h.gbp(h.pay(ID, 'single', 54, 95))}. Payment is by PayPal or bank transfer, or, for journeys to or from London King's Cross, a free single journey. Claims must arrive within ${h.num(o.deadlineDays)} days. In ${h.ORR.lastYear.label}, only ${h.pc(r.last?.approvedPct ?? 0, 1)} of the claims it closed were approved.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Does Grand Central pay anything for a 45-minute delay?', a: `No. Grand Central's Charter Compensation starts at ${h.num(h.threshold(o))} minutes late at your destination, so a 45-minute delay pays nothing under its scheme. The National Rail Conditions of Travel minimum also starts at ${h.num(h.N.minDelay)} minutes. If the delay cost you money, such as a missed connection you had to pay for, you can still raise it with the company under the Consumer Rights Act.` },
        { q: 'How does the Grand Central free single journey work?', a: 'Instead of money, Grand Central can send a discount code for a replacement Advance Single on any of its services where Advance Singles are sold. It is only offered when your journey started or finished at London King’s Cross. The code is issued in the class of your original ticket, covers one journey for one person, and cannot be exchanged later for another form of compensation.' },
        { q: 'Where do I post a paper Grand Central compensation claim?', a: 'Grand Central asks for postal claims to go to its Customer Relations Manager at its Wakefield address, not to the Sheffield address printed on the old form. It recommends recorded delivery, as it does not accept liability for lost tickets or forms, and says postal claims take considerably longer than the online form, where most claims are resolved within ten working days.' },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr);
      return `
<h2>A scheme built around hours, not minutes</h2>
<p>Grand Central runs a small number of long-distance trains from London King's Cross to the North East and to West Yorkshire, using the East Coast Main Line. As an open access operator, it sets its own compensation in its ${h.src('op_grand_central_2', 'Passenger Charter')}, and its bands are counted in hours.</p>
${h.table(['Delay at your destination', 'Share of a single', `Paid on a ${h.gbp(54)} single`, 'Return, per late leg'], h.bandRows(ID, 54), `Charter Compensation, as set out on Grand Central's ${h.src('op_grand_central_1', 'refunds and compensation page')}. Returns are read as half the fare per leg.`, ['l', 'r', 'r', 'r'])}
<p>Compared with ${h.a('op-lner', 'LNER')}, which runs on the same line, the gap is large. LNER pays half of a single from 30 minutes and the full single from one hour. Grand Central pays nothing until one hour, then half; the full single only comes back after three hours. On a ${h.gbp(54)} single delayed 70 minutes, the difference is ${h.gbp(h.pay('lner', 'single', 54, 70))} with LNER against ${h.gbp(h.pay(ID, 'single', 54, 70))} with Grand Central.</p>
<!--tool:mini:bands|{"op":"${ID}","price":54}-->

<h2>Return tickets</h2>
<p>The policy applies the same percentages to "the relevant portion of a return ticket" and does not say what share of the fare a portion is. Taking each leg as half of the return, an outward leg two and a half hours late on a ${h.gbp(96)} return pays ${h.gbp(h.pay(ID, 'return', 96, 150))}. If the way back is also an hour late, the two legs together give ${h.gbp(h.pay(ID, 'return', 96, 150, 65))}. There is no separate rule refunding the whole return after two hours, as many Delay Repay operators have. Grand Central publishes no season ticket divisor either, so seasons are left out of the calculator.</p>

<h2>Claiming and choosing how to be paid</h2>
<p>The company replaced its old process with an online Charter Compensation system where you can track a claim, manage payment preferences and see past claims. It needs a readable scan or photo of the ticket, in JPEG or PDF, and details of fellow passengers if you claim for more than one ticket. When you claim, you choose between:</p>
<ul>
<li><strong>PayPal</strong>, paid to the account linked to the email you give;</li>
<li><strong>bank transfer</strong>, for which you supply the sort code, the number of the account and the name it is held in;</li>
<li><strong>a complimentary single journey</strong>, sent as a discount code, if the trip started or ended at London King's Cross. The company keeps the right to offer this at its discretion.</li>
</ul>
<p>Most claims are resolved within ten working days and all should be answered within twenty. The limit is ${h.num(o.deadlineDays)} days from the end of your journey; the ${h.a('delay-repay-time-limit', 'time limit page')} gives the exact last day. Grand Central also states that its policy does not limit your rights under the Consumer Rights Act 2015.</p>

<h2>The lowest approval rate on the East Coast</h2>
<p>The ${h.src('orr_4410', 'ORR figures')} show how the one-hour threshold plays out. In ${h.ORR.lastYear.label}, Grand Central received ${h.num(r.last?.received ?? 0)} claims and approved ${h.num(r.last?.approved ?? 0)}, or ${h.pc(r.last?.approvedPct ?? 0, 1)} of those it closed. On the same line, ${h.a('op-hull-trains', 'Hull Trains')} approved ${h.pc(h.orr('hull-trains').last?.approvedPct ?? 0, 1)} and LNER ${h.pc(h.orr('lner').last?.approvedPct ?? 0, 1)}. The statistics do not say why claims fail, but a claim for a delay under an hour has nothing to pay under this scheme. For the first ${h.num(h.ORR.current.periods.length)} periods of ${h.ORR.current.label}, provisional figures give ${h.pc(r.current?.approvedPct ?? 0, 1)} approved and ${h.pc(r.current?.within20Pct ?? 0, 1)} closed within 20 working days.</p>
<p>Before claiming, check that your arrival really was an hour or more after the time in the timetable. For a shorter delay, the ${h.src('nrcot', 'Conditions of Travel')} offer nothing either, since their ${h.pc(h.N.minPct)} minimum begins at ${h.num(h.N.minDelay)} minutes.</p>`;
    },
  },
});
