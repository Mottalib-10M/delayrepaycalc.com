import { definePage } from '../../lib/guide-types';

const ID = 'hull-trains';

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 114,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 45, delay: 40 } },
  mini: { kind: 'mini:returnlegs', props: { op: ID, price: 110, out: 135, back: 0 } },
  related: ['delay-repay-return-ticket', 'season-ticket-delay-repay', 'op-lner', 'op-lumo', 'op-grand-central'],
  sources: ['op_hull_trains_1', 'nrcot', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'hull-trains-delay-repay',
    nav: 'Hull Trains',
    card: 'Hull Trains pays from 30 minutes late between Hull and London: two bands only, no full return refund after two hours, and season divisors per band.',
    title: 'Hull Trains Delay Repay: Two Bands and No 120-Minute Step',
    description: 'Hull Trains Delay Repay pays from 30 minutes late in two bands, with no extra step at two hours. Work out singles, returns and seasons and see how it pays.',
    h1: 'Hull Trains Delay Repay',
    intro: 'The figures above follow the Hull Trains table: a fare and the minutes late at your destination give the amount, using the company’s two bands.',
    resume: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr);
      return `Hull Trains is a small open access company, owned by FirstGroup, running between Hull and London King's Cross. It compensates journeys that reach their destination at least ${h.num(h.threshold(o))} minutes late, with only two bands: ${h.share(o.bands[0].single)} of a single or ${h.share(o.bands[0].ret)} of a return from ${h.num(o.bands[0].from)} to ${h.num(o.bands[0].to ?? 0)} minutes, then the full single or ${h.share(o.bands[1].ret)} of a return from ${h.num(o.bands[1].from)} minutes. There is no further step at two hours, so a single late leg never brings back more than half of a return fare. The company's own example is a ${h.gbp(45)} Hull to London single arriving 40 minutes late, which pays ${h.gbp(h.pay(ID, 'single', 45, 40))}. Claims go through its portal or a Freepost form within ${h.num(o.deadlineDays)} days of travel. Of the ${h.num(r.last?.closed ?? 0)} claims it closed in ${h.ORR.lastYear.label}, it approved ${h.pc(r.last?.approvedPct ?? 0, 1)}.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'My Hull Trains return was three hours late on the way back: do I get the full fare?', a: `Not under its Delay Repay table. Hull Trains has no band from 120 minutes, so a leg that is ${h.num(o.bands[1].from)} minutes late or more pays ${h.share(o.bands[1].ret)} of the return fare however long the delay. If both legs were late, the two claims add up to the full fare at most. Buying two singles instead would give the whole price of the late single back.` },
        { q: 'How long does Hull Trains take to pay Delay Repay?', a: `Its page says approved claims are processed within 10 to 15 working days. You claim through its Delay Repay portal, where an account lets you follow each claim, using your booking reference, the date and the train you took. The ORR records that ${h.pc(h.orr(o.orr).last?.within20Pct ?? 0, 1)} of its claims in ${h.ORR.lastYear.label} were closed within 20 working days.` },
        { q: 'Can I send a Hull Trains Delay Repay claim by post without a stamp?', a: 'Yes. Download the compensation claim form and post it to FREEPOST Hull Trains Delay Repay, writing the address exactly as shown, with no stamp. Include the ticket or a copy. Season ticket holders must claim each delayed journey separately and give the details of the specific train they were on, whether the claim goes online or by post.' },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr); const d = o.season!.divisors;
      const kinds: Array<['weekly' | 'monthly' | 'annual', string]> = [['weekly', 'Weekly'], ['monthly', 'Monthly'], ['annual', 'Annual']];
      return `
<h2>Why two bands change the return arithmetic</h2>
<p>Most operators add a fourth band at two hours that refunds a whole return when one leg is very late. Hull Trains does not. Its ${h.src('op_hull_trains_1', 'refunds and Delay Repay page')} lists "under 30 minutes", "30 to 59 minutes" and "60 minutes or more", and nothing beyond. On a single ticket the effect is nil, since the full fare comes back from one hour anyway. On a return, it caps one late leg at half the fare.</p>
${h.table(['Delay at destination', 'Single', `Single of ${h.gbp(45)}`, 'Return, per late leg'], h.bandRows(ID, 45), 'Hull Trains Delay Repay table. A cancelled train you chose not to take is refunded in full instead.', ['l', 'r', 'r', 'r'])}
<p>Take a ${h.gbp(110)} return. If the train home reaches Hull two and a quarter hours late, Hull Trains pays ${h.gbp(h.pay(ID, 'return', 110, 135))}; ${h.a('op-lner', 'LNER')}, with a 120-minute band, would refund the whole ${h.gbp(110)} for the same delay on its own return. Both legs late by an hour or more brings the Hull Trains figure to ${h.gbp(h.pay(ID, 'return', 110, 65, 135))}, the full fare. For people who often travel on long delays, two singles can therefore be the safer purchase.</p>

<h2>Season tickets, divided by band</h2>
<p>The page gives one divisor per season type and per band. Divide the season price by the figure in the right column to get the compensation for one delayed journey.</p>
${h.table(['Season', `${h.mins(o.bands[0])} min`, `${h.mins(o.bands[1])} min`], kinds.map(([k, label]) => [label, h.num((d[k] ?? 0) / o.bands[0].season), h.num((d[k] ?? 0) / o.bands[1].season)]), 'Divisors from the Hull Trains season table. A quarterly divisor is also published.', ['l', 'r', 'r'])}
<p>The company's worked example is an annual season of ${h.gbp(3840)} with a 45-minute delay: ${h.gbp(h.pay(ID, 'annual', 3840, 45))}. The same season at 75 minutes late gives ${h.gbp(h.pay(ID, 'annual', 3840, 75))}. Include a copy of the season with every claim, and name the specific train on which you were delayed. Because the divisors already include the band, there is no percentage left to apply: the result of the division is the payment for that journey, and two delayed journeys in a week mean two claims, each with its own date and its own deadline.</p>
<!--tool:mini:divisors|{"op":"${ID}","kind":2,"price":3840}-->

<h2>Being paid, or giving it away</h2>
<p>Hull Trains offers more payment routes than most: ${o.payment.join(', ')}. The charity option sends the money to its partner, PAUL For Brain Recovery, a Humber charity helping people with a brain injury and their families; you tick it on the online form.</p>
<p>A refund is a different thing. If your train was cancelled or delayed and you decided not to travel, you ask for your money back at the point of purchase within ${h.num(h.N.refundNotifyDays)} days, with no administration fee in that case. Delay Repay is only for a journey you made and finished late.</p>

<h2>Claim figures for a small operator</h2>
<p>With one main route, Hull Trains handles a small share of national claims. ${h.src('orr_4410', 'ORR Table 4410')} records ${h.num(r.last?.received ?? 0)} claims received in ${h.ORR.lastYear.label}, ${h.num(r.last?.approved ?? 0)} of them approved. In the first ${h.num(h.ORR.current.periods.length)} periods of ${h.ORR.current.label}, provisional figures show ${h.num(r.current?.received ?? 0)} claims and an approval rate of ${h.pc(r.current?.approvedPct ?? 0, 1)}. As with every operator, the ${h.src('nrcot', 'National Rail Conditions of Travel')} still guarantee at least ${h.pc(h.N.minPct)} of the late portion of the fare from ${h.num(h.N.minDelay)} minutes.</p>`;
    },
  },
});
