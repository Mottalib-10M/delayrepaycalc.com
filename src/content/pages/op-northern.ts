import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'op-northern',
  group: 'operators',
  order: 120,
  operator: 'northern',
  tool: { kind: 'repay', props: { operator: 'northern', lock: true, ticket: 'single', price: 14.8, delay: 19 } },
  mini: { kind: 'mini:bands', props: { op: 'northern' } },
  related: ['delay-repay-15-minutes', 'how-to-claim-delay-repay', 'season-ticket-delay-repay', 'op-transpennine-express', 'op-merseyrail'],
  sources: ['op_northern_1', 'op_northern_2', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'northern-delay-repay',
    nav: 'Northern',
    card: 'Northern Delay Repay on short commuter fares: what 15 minutes late is worth, the free-ticket option, season values and why its terms were read on archived copies.',
    title: 'Northern Delay Repay: Short Delays, Cheap Fares, Real Money',
    description: 'Northern Delay Repay on everyday fares: bands from 15 minutes, season ticket values, the free ticket option, payment choices and claim approval rates.',
    h1: 'Northern Delay Repay on short commuter journeys',
    intro: 'The calculator above already uses the Northern scale: enter what you paid and how late you arrived to see the band, the amount and your last day to claim.',
    resume: (h) => {
      const o = h.op('northern'); const r = h.orr(o.orr); const b = o.bands;
      return `Northern runs local and regional trains across the north of England, where many fares are short and cheap, and that is exactly why its Delay Repay 15 scheme is worth knowing. A train that reaches your destination ${h.num(h.threshold(o))} minutes late already pays ${h.share(b[0].single)} of a single: on a ${h.gbp(14.8)} ticket and a ${h.num(19)}-minute delay that is ${h.gbp(h.pay('northern', 'single', 14.8, 19))}. From ${h.num(b[1].from)} minutes the share rises to ${h.share(b[1].single)}, and from ${h.num(b[2].from)} minutes the whole single comes back. Returns are split in two, each late leg counting for half the fare, and season tickets are valued per journey. You have ${h.num(o.deadlineDays)} days from the journey to claim, online, on a paper form from a staffed station or by post. In ${h.ORR.lastYear.label}, Northern received ${h.num(r.last!.received)} claims and approved ${h.pc(r.last!.approvedPct!, 1)} of the ${h.num(r.last!.closed)} it closed. One limit applies to what we read: its live pages refused automated reading, so the bands come from archived copies of its official pages.`;
    },
    faqs: (h) => {
      const o = h.op('northern');
      return [
        { q: 'Is it worth claiming Northern Delay Repay on a ticket of a few pounds?', a: `Usually, yes, because the claim takes a few minutes and the amounts add up over a year. A ${h.gbp(6.5)} single that arrives ${h.num(20)} minutes late pays ${h.gbp(h.pay('northern', 'single', 6.5, 20))}, and the same ticket an hour late pays all of it back. Commuters who claim every eligible journey on a season ticket often recover a noticeable part of the season price.` },
        { q: 'Can Northern give me a free ticket instead of money for a delay?', a: 'Its charter says that for delays over 30 minutes it can offer a free ticket across its network, to use when you choose, or National Rail vouchers valid on any rail ticket. These are options, not obligations: you can still ask for money, such as a card refund, when you fill in the form. The archived claim page also listed a cashable voucher and a charity donation.' },
        { q: 'Does Northern compensate delays on an emergency timetable?', a: 'Its charter says that if a temporary or emergency timetable covered your journey, the delay is counted against that timetable. Planned engineering timetables are announced well in advance, and a delay is then measured from the revised arrival time. Emergency timetables after storms or urgent repairs are announced at short notice through its website, app and stations.' },
        { q: 'Which company do I claim from if a Northern train made me miss another train?', a: `Northern pays only when one of its own services caused the first delay; if another operator was responsible, you claim from that company. When a late Northern train made you miss a connection, claim from Northern with your whole journey on the form, not just the affected part, within ${h.num(o.deadlineDays)} days.` },
      ];
    },
    body: (h) => {
      const o = h.op('northern'); const r = h.orr(o.orr); const d = o.season!.divisors; const b = o.bands;
      return `
<h2>Small fares, same percentages</h2>
<p>A large share of Northern journeys cost less than a long-distance fare by a wide margin. The percentages, however, are the same as on any Delay Repay 15 operator, so the money depends on the price you paid. The table uses a ${h.gbp(14.8)} single as an example.</p>
${h.table(['Arrived late by', 'Share of a single', `On ${h.gbp(14.8)}`, 'Share of a return, per leg'], h.bandRows('northern', 14.8), `Northern bands, from the ${h.src('op_northern_1', 'archived copy of its Delay Repay page')}.`, ['l', 'r', 'r', 'r'])}
<p>A ${h.gbp(24)} return with a ${h.num(35)}-minute delay on the way home earns ${h.gbp(h.pay('northern', 'return', 24, 0, 35))}, ${h.share(h.shareAt('northern', 35, 'return'))} of the ticket, because only one of its two halves was late. If both legs ran more than an hour late, the total is ${h.gbp(h.pay('northern', 'return', 24, 65, 65))}, which is the whole fare.</p>
<!--tool:mini:orrstats|{"op":"northern"}-->

<h2>Season tickets and the Flexi Season</h2>
<p>For a season, Northern values one journey by counting a working week of trips to and from your destination: ${h.num(d.weekly!)} a week for a weekly season, ${h.num(d.flexi!)} for a Flexi Season, ${h.num(d.monthly!)} for a monthly and ${h.num(d.annual!)} a year for an annual. So a ${h.gbp(68)} weekly gives a journey value of ${h.gbp(68 / d.weekly!)}, and a ${h.num(40)}-minute delay on it pays ${h.gbp(h.pay('northern', 'weekly', 68, 40))}. Each delayed journey is a separate claim with its own deadline.</p>
<p>One caution on seasons. The charter table, as extracted from the archived PDF, lists a season column and a Flexi column whose order could not be confirmed with certainty. The calculator applies the season shares that match the single column, capped at one journey from ${h.num(b[3].from)} minutes, which is the reading we consider most likely. If the figure you receive differs, the charter is the reference to quote.</p>

<h2>How Northern pays and how fast</h2>
<p>The online form lets you pick the payment. In our data the options are: ${o.payment.join(', ')}. The archived claim page also mentioned payment to a UK bank account and a payment link through NatWest PayIt, plus a free ticket usable only on Northern trains. ${o.automatic ? `Some claims are started for you: ${o.automatic.charAt(0).toLowerCase()}${o.automatic.slice(1)}.` : ''} Northern says it aims to review claims within five working days and sends a claim reference by email, which you should keep.</p>
<p>The Office of Rail and Road figures give a sense of the pace. Over ${h.ORR.lastYear.label}, ${h.pc(r.last!.within20Pct!, 1)} of Northern claims were closed within 20 working days. For ${h.ORR.current.label}, the provisional count so far stands at ${h.num(r.current!.received)} claims received with ${h.pc(r.current!.approvedPct!, 1)} approved (${h.src('orr_4410', 'ORR Table 4410')}).</p>

<h2>What we could and could not read</h2>
<p>Northern's live website blocked automated reading. The bands, payment options and season rules here therefore come from ${h.src('op_northern_1', 'an archived copy of its Delay Repay page')} and ${h.src('op_northern_2', 'its Passengers’ Charter')}, both official documents but not the current versions. The scheme has been stable, yet a detail may have changed since. Northern is run by the government's operator of last resort, DfT Operator, and so is already in ${h.src('gov_gbr', 'public ownership')}. Neighbouring routes are covered on our ${h.a('op-transpennine-express', 'TransPennine Express page')}, and the ${h.a('delay-repay-15-minutes', '15-minute rule')} is explained in its own guide.</p>`;
    },
  },
});
