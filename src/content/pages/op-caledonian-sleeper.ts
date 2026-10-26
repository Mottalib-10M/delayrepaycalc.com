import { definePage } from '../../lib/guide-types';

const ID = 'caledonian-sleeper';
const or = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} or ${xs[xs.length - 1]}`);

export default definePage({
  id: 'op-caledonian-sleeper',
  group: 'operators',
  order: 103,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 160, delay: 75 } },
  mini: { kind: 'mini:orrstats', props: { op: ID } },
  related: ['delay-repay-return-ticket', 'delay-repay-time-limit', 'how-to-claim-delay-repay', 'op-scotrail', 'op-avanti-west-coast'],
  sources: ['op_caledonian_sleeper_1', 'op_caledonian_sleeper_2', 'nrcot', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'caledonian-sleeper-delay-repay',
    nav: 'Caledonian Sleeper',
    card: 'A late overnight train between London and Scotland: the 30-minute bands, what happens to the room supplement and the automatic claim link.',
    title: 'Caledonian Sleeper Delay Repay: Fares, Rooms and Claim Links',
    description: 'Caledonian Sleeper Delay Repay from 30 minutes late: the share of the fare and of the room supplement, the emailed claim link and the card refund it makes.',
    h1: 'Caledonian Sleeper Delay Repay: compensation for a late night train',
    intro: 'Set the price of your sleeper ticket and the minutes late on arrival: the calculator above applies Caledonian Sleeper\'s bands for a single journey.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands; const r = h.orr(o.orr);
      return `Caledonian Sleeper compensates guests whose overnight train between London and Scotland arrives ${h.num(h.threshold(o))} minutes or more behind its scheduled time at their destination, whatever time it left. It belongs to the ${o.scheme} family: ${h.share(b[0].single)} of a single fare from ${h.num(b[0].from)} minutes and the whole fare from ${h.num(b[1].from)} minutes, with a late leg on a return worth ${h.share(b[0].ret)} or ${h.share(b[1].ret)} of the return fare, and the full return from ${h.num(b[2].from)} minutes. The room or berth supplement is compensated as well, on the same steps. Guests who booked on its website or through its Guest Service Centre receive an email with a claim link and must click it within ${h.num(o.deadlineDays)} days; others claim on a form. Payment goes back to a debit or credit card. In ${h.ORR.lastYear.label}, ${h.pc(r.last!.approvedPct!, 1)} of its ${h.num(r.last!.closed)} closed claims were approved.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Is the Caledonian Sleeper room supplement refunded when the train is late?', a: `Yes. The bands published in its Guest Experience Charter treat the supplement for a room separately from the fare and pay ${h.share(o.bands[0].single)} of it from ${h.num(o.bands[0].from)} minutes late and all of it from ${h.num(o.bands[1].from)} minutes. A guest in a room on a late arrival therefore gets back a share of both parts of the price.` },
        { q: 'Why can Caledonian Sleeper not pay my compensation to an American Express card?', a: 'Its after-your-trip page says it cannot compensate bookings made with American Express. Compensation for third party bookings is refunded to a debit or credit card after the team has worked out the amount, so a guest who paid with that card should say so in the claim and ask how the money can be returned instead.' },
        { q: 'I booked my Caledonian Sleeper ticket through another retailer: how do I claim?', a: `Automatic claims only cover tickets bought on its own website or through its Guest Service Centre. Third party bookings use the Delay Repay form on its website with Delay Repay chosen as the subject, or a printable form, with a copy of the ticket. The same ${h.num(o.deadlineDays)}-day limit from the date of travel applies.` },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const b = o.bands; const r = h.orr(o.orr);
      return `
<h2>Arrival time is what counts on a night train</h2>
<p>A sleeper that leaves London late but makes up time overnight owes nothing; one that leaves on time and loses an hour north of the border does. Caledonian Sleeper measures the delay as the gap between the scheduled and actual arrival at the guest's own destination, against the timetable it publishes in advance on its website. Guests getting off at an intermediate stop are therefore judged on that stop, not on the end of the route.</p>
<p>The trains run overnight from London Euston to Scottish cities such as Edinburgh, Glasgow, Inverness, Aberdeen and Fort William. Every guest, in a seat or a room, is covered by the same bands.</p>

<h2>What a late arrival is worth</h2>
<p>Below, the bands on a fare of ${h.gbp(160)}. The ${h.num(b[2].from)}-minute band adds nothing to a single but matters for a return, where it gives back the whole return fare for one late leg.</p>
${h.table(['Minutes late', 'Share of a single', `On a ${h.gbp(160)} fare`, 'Share of a return, per late leg'], h.bandRows(ID, 160), 'Caledonian Sleeper bands, from its Guest Experience Charter.', ['l', 'r', 'r', 'r'])}
<p>A return bought for ${h.gbp(300)} with one leg ${h.num(70)} minutes late pays ${h.gbp(h.pay(ID, 'return', 300, 70))}; with that leg more than two hours late it pays ${h.gbp(h.pay(ID, 'return', 300, 130))}. Use the tool below to try both legs.</p>
<!--tool:mini:returnlegs|{"op":"caledonian-sleeper","price":300,"out":70,"back":0}-->

<h2>Claim link, form or post</h2>
<ul>
<li><strong>Booked on its website or by phone with the Guest Service Centre.</strong> ${o.automatic}. After you confirm the journey, the payment is processed. The link has to be used within ${h.num(o.deadlineDays)} days.</li>
<li><strong>Booked elsewhere.</strong> Fill in the form on its after-your-trip page, or the printable version, and attach a copy of the ticket. It may ask to see the original. The page asks guests not to send bank details in the form.</li>
</ul>
<p>The money goes back by ${or(o.payment)}. The operator says it aims to deal with a claim in 10 working days, and that a refusal comes with its reasons; an appeal can then go to the Rail Ombudsman.</p>

<h2>Where the figures come from, and their limits</h2>
<p>Its ${h.src('op_caledonian_sleeper_1', 'current after-your-trip page')} confirms the scheme starts at ${h.num(h.threshold(o))} minutes and pays all or part of the ticket, but gives no percentages. The bands used here come from the ${h.src('op_caledonian_sleeper_2', 'Guest Experience Charter of December 2019')}, which the current terms still point to. If the operator has changed its steps since, its own answer prevails. No season tickets are sold on these trains, so no divisor applies. The ${h.src('nrcot', 'National Rail Conditions of Travel')} remain the floor: at least ${h.pc(h.N.minPct)} of the fare from ${h.num(h.N.minDelay)} minutes.</p>
<p>Caledonian Sleeper is in ${o.owner}. Its claim handling stands out in the ${h.src('orr_4410', 'ORR figures')}: in ${h.ORR.lastYear.label}, ${h.num(r.last!.received)} claims received, ${h.pc(r.last!.approvedPct!, 1)} approved and ${h.pc(r.last!.within20Pct!, 1)} closed within 20 working days. For ${h.ORR.current.label}, the provisional count so far is ${h.num(r.current!.received)} claims, with ${h.pc(r.current!.approvedPct!, 1)} approved. Small volumes make such shares move quickly from one period to the next.</p>`;
    },
  },
});
