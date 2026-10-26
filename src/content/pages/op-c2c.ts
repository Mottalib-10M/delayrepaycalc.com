import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const ID = 'c2c';
const and = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const since = (h: Helpers) => h.date(h.P.ownership.find((x) => x.operator === 'c2c')!.date);

export default definePage({
  id: 'op-c2c',
  group: 'operators',
  order: 102,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 15.5, delay: 32 } },
  mini: { kind: 'mini:returnlegs', props: { op: ID } },
  related: ['delay-repay-15-minutes', 'delay-repay-return-ticket', 'how-to-claim-delay-repay', 'delay-repay-time-limit', 'op-greater-anglia'],
  sources: ['op_c2c_1', 'op_c2c_2', 'op_c2c_3', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'c2c-delay-repay',
    nav: 'c2c',
    card: 'c2c compensation on the Fenchurch Street line: the Delay Repay 15 bands, the smartcard payments for very short delays and how seasons are valued.',
    title: 'c2c Delay Repay: Smartcard Payments and the 15-Minute Bands',
    description: 'c2c Delay Repay: what a late train between Fenchurch Street and Essex pays, the automatic smartcard credit for short delays, season values and claim stats.',
    h1: 'c2c Delay Repay: from a two-minute delay to a full refund',
    intro: 'The calculator above is set to c2c: change the fare or the minutes late at your stop and the band and amount follow.',
    resume: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr);
      return `c2c, the line from London Fenchurch Street through south Essex to Southend and Shoeburyness, runs ${o.scheme}: a single ticket earns ${h.share(o.bands[0].single)} of its price from ${h.num(o.bands[0].from)} minutes late, ${h.share(o.bands[1].single)} from ${h.num(o.bands[1].from)} minutes and the whole fare from ${h.num(o.bands[2].from)} minutes. What sets it apart is the c2c Smartcard. A season or daily ticket loaded on it, tapped in and out and linked to an online account, is credited automatically, and the credit starts with delays of two minutes, far below the ${h.num(h.threshold(o))}-minute threshold that applies to everyone else. Claims are accepted for ${h.num(o.deadlineDays)} days after the journey. The company has been in public ownership since ${since(h)}. In ${h.ORR.lastYear.label}, the Office of Rail and Road counted ${h.num(r.last!.received)} claims to c2c, of which ${h.pc(r.last!.approvedPct!, 1)} were approved once closed.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Does c2c pay anything for a delay shorter than 15 minutes?', a: `Only to Smartcard holders who have joined Automatic Delay Repay. For them, c2c credits a small sum for each full minute late, from two minutes up to ${h.num(h.threshold(o) - 1)} minutes, into their online account as an eVoucher. Holders of e-tickets, Oyster or contactless get nothing below ${h.num(h.threshold(o))} minutes and must claim on the form for longer delays.` },
        { q: 'What are the four conditions for c2c Automatic Delay Repay?', a: 'You need a c2c Smartcard, a valid ticket loaded onto it, a tap in at the origin station and a tap out at the destination, and an online account on the c2c website that holds the Smartcard. Missing any one of the four means no automatic credit, but you can still make a normal claim for that journey through the form.' },
        { q: 'How does c2c value one journey on a monthly season?', a: `It divides the season price by the number of single journeys it is assumed to cover. For a monthly ticket that is ${h.num(o.season!.divisors.monthly!)} journeys, built from ${h.num(o.season!.divisors.monthly! / 2)} working days with two trips each. A ${h.gbp(480)} monthly therefore gives a journey value of ${h.gbp(480 / o.season!.divisors.monthly!)}, and the band share applies to that value.` },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr); const d = o.season!.divisors;
      return `
<h2>Two ways to be compensated on the same line</h2>
<p>Most passengers on the Fenchurch Street route meet c2c's compensation through the ordinary claim form, which applies the ${h.a('delay-repay-15-minutes', 'national 15-minute bands')}. Smartcard users can step out of that routine. Once Automatic Delay Repay is switched on in their account, c2c compares their tap-in and tap-out with the running of the trains and credits the account without any form being filled in. The page that explains the scheme stresses that it leaves out e-tickets as well as Oyster and contactless pay as you go: those journeys still need a manual claim.</p>
<p>The automatic route pays out as an eVoucher into the online account. A manual claim offers ${and(o.payment)}, so a passenger who wants the money on a card rather than as credit should check how the account is set up.</p>

<h2>The bands applied to a typical Southend fare</h2>
<p>On a single of ${h.gbp(15.5)}, a ${h.num(32)}-minute delay pays ${h.gbp(h.pay(ID, 'single', 15.5, 32))}. The table below sets out every band for that fare. For a return, each late leg is valued against the return fare, and c2c's pages describe the two-hour band as giving back the cost of the return journey.</p>
${h.table(['Minutes late', 'Share of a single', `On a ${h.gbp(15.5)} single`, 'Share of a return, per late leg'], h.bandRows(ID, 15.5), 'c2c bands as read on its Delay Repay pages.', ['l', 'r', 'r', 'r'])}

<h2>Season tickets: working days, not calendar days</h2>
<p>c2c explains its divisors in plain arithmetic. A weekly season is taken to cover five working days with two journeys each, so its price is divided by ${h.num(d.weekly!)}. A Flexi is divided by ${h.num(d.flexi!)}, a monthly by ${h.num(d.monthly!)} and an annual by ${h.num(d.annual!)}. Other validities follow the same rule of five working days a week. When the delay reaches two hours, the payment becomes the value of a return journey, twice the single journey value.</p>
<p>Take an annual season of ${h.gbp(5200)}. One journey is worth ${h.gbp(5200 / d.annual!)}; a ${h.num(45)}-minute delay on it pays ${h.gbp(h.pay(ID, 'annual', 5200, 45))}, and an hour or more pays ${h.gbp(h.pay(ID, 'annual', 5200, 60))}. Compare other operators' divisors for the same price with the tool below.</p>
<!--tool:mini:divisors|{"op":"c2c","price":5200,"kind":2}-->

<h2>A discrepancy between the charter and the web pages</h2>
<p>The documents read for this page do not all agree. c2c's ${h.src('op_c2c_2', "Passenger's Charter valid from July 2025")} describes the ${h.num(o.bands[2].from)} to ${h.num(o.bands[2].to!)} minute band as the full cost of a return journey, while its ${h.src('op_c2c_3', 'Delay Repay page')} and ${h.src('op_c2c_1', 'Automatic Delay Repay page')} say ${h.share(o.bands[2].single)} of a single. The calculator follows the web pages. If a claim in that band comes back lower than you expected, quote the charter wording when you ask for a review.</p>

<h2>How c2c handles claims, in figures</h2>
<p>The ${h.src('orr_4410', 'Office of Rail and Road')} publishes claim statistics for each operator. For c2c in ${h.ORR.lastYear.label}: ${h.num(r.last!.received)} claims received, ${h.num(r.last!.closed)} closed, ${h.pc(r.last!.approvedPct!, 1)} approved and ${h.pc(r.last!.within20Pct!, 1)} closed within 20 working days. For ${h.ORR.current.label}, from the first provisional periods: ${h.num(r.current!.received)} received and ${h.pc(r.current!.approvedPct!, 1)} approved, with ${h.pc(r.current!.within20Pct!, 1)} handled inside 20 working days.</p>
<p>c2c moved into public ownership on ${since(h)}, one of the first franchises to pass to the ${h.src('gov_gbr', 'public ownership programme')}. The bands and the smartcard scheme continued under the new owner. Whatever the cause of the delay, the ${h.src('nrcot', 'National Rail Conditions of Travel')} still guarantee at least ${h.pc(h.N.minPct)} of the fare from ${h.num(h.N.minDelay)} minutes, and the ${h.a('delay-repay-time-limit', 'time limit page')} gives the last date for any journey.</p>`;
    },
  },
});
