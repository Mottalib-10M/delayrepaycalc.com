import { definePage } from '../../lib/guide-types';

const ID = 'scotrail';
const or = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} or ${xs[xs.length - 1]}`);

export default definePage({
  id: 'op-scotrail',
  group: 'operators',
  order: 121,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 15.6, delay: 40 } },
  mini: { kind: 'mini:deadline', props: { op: ID } },
  related: ['delay-repay-amounts', 'delay-repay-time-limit', 'delay-repay-return-ticket', 'op-caledonian-sleeper', 'op-lner'],
  sources: ['op_scotrail_1', 'op_scotrail_2', 'nrcot', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'scotrail-delay-repay',
    nav: 'ScotRail',
    card: 'ScotRail pays from 30 minutes late, missed connections included: its bands, the weekly season rule, claims by post and a sharp change in its claim figures.',
    title: 'ScotRail Delay Repay: The 30-Minute Guarantee Explained',
    description: 'ScotRail Delay Repay starts at 30 minutes late: shares of singles and returns, missed connections, Smartcard and season claims, and its latest approval figures.',
    h1: 'ScotRail Delay Repay: nothing before half an hour, then up to the full fare',
    intro: 'Enter your ScotRail fare and how late you arrived: the calculator above shows the amount under its 30-minute bands.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands; const r = h.orr(o.orr);
      return `ScotRail, Scotland's main train operator, runs ${o.scheme}, which it calls its Delay Repay guarantee. Below ${h.num(h.threshold(o))} minutes late at your destination there is no payment, which sets it apart from the many operators in England that start at ${h.num(h.threshold(h.op('southern')))}. From ${h.num(b[0].from)} minutes a single returns ${h.share(b[0].single)} of its price and from ${h.num(b[1].from)} minutes the whole of it; a late leg on a return earns ${h.share(b[0].ret)} or ${h.share(b[1].ret)} of the return fare, and a leg ${h.num(b[2].from)} minutes late or more gives back all of it. A connection missed because a ScotRail train ran late can be claimed too. Claims must reach it within ${h.num(o.deadlineDays)} days. In ${h.ORR.lastYear.label} the Office of Rail and Road counted ${h.num(r.last!.received)} claims to ScotRail and an approval rate of ${h.pc(r.last!.approvedPct!, 1)}; the first periods of ${h.ORR.current.label} show ${h.pc(r.current!.approvedPct!, 1)} approved and only ${h.pc(r.current!.within20Pct!, 1)} closed within 20 working days.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Does ScotRail pay for a missed connection?', a: `Yes. Its Delay Repay page says that if you missed a connection because a ScotRail train was late, you can claim for that too. What counts is how late you reached your final destination: a ${h.num(15)}-minute delay that made you miss a train and wait an hour for the next is a delay of over an hour at the end of the journey.` },
        { q: 'How do I claim ScotRail Delay Repay without going online?', a: `Pick up a claim form at a staffed ScotRail station, or download and print one, then post it with your ticket to ScotRail Customer Relations at the address on its Delay Repay page. The form must arrive within ${h.num(o.deadlineDays)} days of the delay, so allow time for the post rather than sending it on the last day.` },
        { q: 'How is a ScotRail monthly season compensated?', a: `The charter read for this page explains only the weekly rule: a share of a single fare, taking a weekly season to cover ${h.num(o.season!.divisors.weekly!)} one-way journeys. No divisor for monthly or annual seasons appears in it. The claim form works out those amounts, and the calculator here leaves them blank rather than guess.` },
        { q: 'What does ScotRail need from a Smartcard holder making a claim?', a: 'The Smartcard number printed on the back of the card. Holders of paper tickets send the original ticket, and season ticket holders on paper add a scan or photograph of the season ticket and of the photocard that goes with it. The same details are asked online and on the paper form.' },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const b = o.bands; const r = h.orr(o.orr); const w = o.season!.divisors.weekly!;
      return `
<h2>The thirty-minute line</h2>
<p>Because ScotRail starts at ${h.num(h.threshold(o))} minutes, a commuter arriving ${h.num(25)} minutes late gets nothing from the guarantee, where an operator on ${h.a('delay-repay-15-minutes', 'Delay Repay 15')} would already pay ${h.share(h.op('southern').bands[0].single)} of the fare. Above the line, the steps are the same as elsewhere. On an example single of ${h.gbp(15.6)}:</p>
${h.table(['Minutes late', 'Single', `Paid on ${h.gbp(15.6)}`, 'Return, per late leg'], h.bandRows(ID, 15.6), 'ScotRail Delay Repay guarantee.', ['l', 'r', 'r', 'r'])}
<!--tool:mini:bands|{"op":"scotrail","price":15.6}-->
<p>A return of ${h.gbp(28)} with the homeward leg ${h.num(b[2].from + 10)} minutes late pays ${h.gbp(h.pay(ID, 'return', 28, 0, b[2].from + 10))}, the whole ticket.</p>

<h2>Season tickets: only the weekly rule is written down</h2>
<p>The ${h.src('op_scotrail_2', 'Passenger Charter of April 2025')} pays season holders a share of a single fare and counts ${h.num(w)} one-way journeys a week. A weekly season of ${h.gbp(85)} is therefore worth ${h.gbp(85 / w)} a journey, and a ${h.num(45)}-minute delay on it pays ${h.gbp(h.pay(ID, 'weekly', 85, 45))}. For monthly and annual seasons the text gives no divisor, and this site does not invent one. Expect the claim form to apply a comparable value, and ask for the working if the figure looks low.</p>

<h2>One journey, from delay to claim</h2>
<p>Suppose you bought an Off-Peak return for ${h.gbp(36)}, travelled out on time and came home on a train that reached your station ${h.num(52)} minutes late. Only the late leg counts, valued at half the return: the claim is worth ${h.gbp(h.pay(ID, 'return', 36, 0, 52))}. Had the train been ${h.num(64)} minutes late, it would be ${h.gbp(h.pay(ID, 'return', 36, 0, 64))}. Note the arrival time on the day, keep the ticket, and claim for the return leg on its own date: the ${h.num(o.deadlineDays)} days run from that journey, not from the outward one.</p>
<p>If the late running made you miss a connection to another ScotRail train, enter your planned and actual arrival at the final station of the journey. The claim is for the whole trip, and the band is set by the total delay at the end.</p>

<h2>How the money comes back</h2>
<p>ScotRail lets you choose ${or(o.payment)}. Online, you need the ticket details or the Smartcard number; by post, the original ticket goes with the form. No automatic claim scheme was found in the pages read, so every late journey needs its own claim.</p>

<h2>The claim figures, and what changed</h2>
<p>The ${h.src('orr_4410', 'ORR table of delay compensation claims')} gives ScotRail ${h.num(r.last!.closed)} closed claims in ${h.ORR.lastYear.label}, with ${h.pc(r.last!.approvedPct!, 1)} approved and ${h.pc(r.last!.within20Pct!, 1)} closed within 20 working days. The provisional periods of ${h.ORR.current.label} look different: ${h.num(r.current!.received)} claims received, ${h.pc(r.current!.approvedPct!, 1)} approved and ${h.pc(r.current!.within20Pct!, 1)} closed in time. The table does not say why. If your claim is refused or delayed, ask for the reasons in writing; the ${h.src('nrcot', 'Conditions of Travel')} still guarantee ${h.pc(h.N.minPct)} of the fare from ${h.num(h.N.minDelay)} minutes, and an unresolved complaint can go to the Rail Ombudsman.</p>

<h2>What was read, and how old it is</h2>
<p>ScotRail's live pages blocked automated reading. The bands come from an ${h.src('op_scotrail_1', 'archived copy of its Delay Repay guarantee from September 2026')} and the season rule from an archived copy of its charter. ${o.notes.join(' ')} ScotRail is in ${o.owner}.</p>`;
    },
  },
});
