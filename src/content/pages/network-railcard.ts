import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'network-railcard',
  group: 'fares',
  order: 47,
  tool: { kind: 'mini:railcard', props: { card: 4, fare: 24, trips: 12 } },
  mini: { kind: 'mini:cardfare', props: { card: 4, fare: 17, peak: 1 } },
  related: ['which-railcard', 'two-together-railcard', 'family-and-friends-railcard', 'op-southeastern'],
  sources: ['railcards'],
  en: {
    slug: 'network-railcard',
    nav: 'Network Railcard',
    card: 'London and the South East after 10am: a third off for any adult and up to three companions, the £13 weekday minimum and the area boundary.',
    title: 'Network Railcard: Area, 10am Rule, £13 Minimum and Savings',
    description: 'Network Railcard: a third off in London and the South East after 10am on weekdays, for you and up to 3 adults, 60% off children, and a £13 weekday minimum.',
    h1: 'Network Railcard: London and the South East',
    intro: 'Type a usual off-peak fare inside the area and how often you travel: the tool shows when the card pays back, with the weekday minimum fare.',
    resume: (h) => `The Network Railcard is the regional card of London and the South East. It costs ${h.gbp(h.card('network').price1y)} a year, anyone aged 16 or over can buy it with no other condition, and it takes a third off most tickets for journeys that start and end inside the Network Railcard area, for the holder and up to three other adults travelling together, plus ${h.pc(h.card('network').childDiscount ?? 0)} off for up to four children aged 5 to 15. The limits are time and place. From Monday to Friday it is valid only on journeys after 10am, and a minimum fare of ${h.gbp(h.card('network').minFare ?? 0)} applies on weekdays; at weekends and on public holidays it works all day with no minimum. Child tickets have a minimum of ${h.gbp(1)}. Journeys that leave the area are not discounted beyond its boundary, and Advance tickets are excluded. On a usual fare of ${h.gbp(24)}, the card saves ${h.gbp(Math.round(24 * h.card('network').discount * 100) / 100)} a trip and pays back on the ${h.ord(Math.ceil(h.card('network').price1y / (Math.round(24 * h.card('network').discount * 100) / 100)))} trip, faster when friends come along.`,
    faqs: (h) => [
      { q: 'Can I use a Network Railcard to travel outside London and the South East?', a: 'Only as far as the boundary of the Network Railcard area. For the part of the journey beyond it, you buy a full-price ticket before crossing the boundary, and your train must stop at the boundary station. Journeys whose start or end is outside the area are not discounted as a whole.' },
      { q: 'Why did my Network Railcard ticket cost £13?', a: `Because the weekday minimum fare applies: from Monday to Friday, a discounted adult ticket cannot cost less than ${h.gbp(h.card('network').minFare ?? 0)}, even after 10am. On fares under about ${h.gbp(20)}, the minimum takes most or all of the discount. At weekends and on public holidays, there is no minimum and the full third comes off.` },
      { q: 'Can friends use my Network Railcard without me?', a: 'No. The holder must travel, and up to three other adults on the same journey get a third off, with up to four children at 60% off. The other adults do not need to be named or related. Without the holder on board, their tickets are not valid at the discounted price.' },
    ],
    body: (h) => `
<h2>What a trip costs with the card</h2>
${h.table(['Usual fare', 'Weekend', 'Weekday after 10am', 'Weekday before 10am'], [12, 16, 20, 30, 45].map((f) => { const d = Math.round(f * (1 - h.card('network').discount) * 100) / 100; return [h.gbp(f), h.gbp(d), h.gbp(Math.max(d, Math.min(f, h.card('network').minFare ?? 0))), 'full fare']; }), `Adult tickets inside the area. ${h.src('railcards', 'Railcards')}.`, ['r', 'r', 'r', 'r'])}

<h2>The area</h2>
<p>The card covers London and the South East, the area shown on the Network Railcard map published by Railcards. Journeys within it are discounted; a journey that leaves it is discounted only up to the boundary station, provided you buy the rest before crossing and the train stops there. Some stations have easements allowing earlier departures on weekdays, listed by Railcards.</p>
<!--tool:mini:cardfare-->

<h2>Group savings</h2>
<p>The card's strength is the group. With three friends, a trip where each ticket costs ${h.gbp(24)} saves ${h.gbp(Math.round(4 * 24 * h.card('network').discount * 100) / 100)} in one go, more than twice the price of the card. Add two children and they travel at ${h.pc(h.card('network').childDiscount ?? 0)} off. For families who always travel with children, the Family & Friends card offers the same child discount and works across Great Britain, but has a morning peak limit in this area too.</p>

<h2>What is excluded</h2>
<p>Weekday journeys before 10am, journeys starting or ending outside the area, Advance tickets, most London Underground and DLR tickets, excursion and charter trains and some coach links are outside the card. The card is not valid for season tickets.</p>

<h2>Late trains in the area</h2>
<p>Most operators of the area run Delay Repay 15. A ${h.gbp(16)} Network Railcard ticket that arrives 20 minutes late with ${h.op('southeastern').name} pays ${h.gbp(h.pay('southeastern', 'single', 16, 20))}; at 30 minutes, ${h.gbp(h.pay('southeastern', 'single', 16, 30))}. The ${h.a('op-southeastern', 'Southeastern page')} and the ${h.a('op-southern', 'Southern page')} have the details.</p>

<h2>Buying it</h2>
<p>Anyone aged 16 or over can buy the card online, as a digital card in the Railcard app with a passport-style photo or as a physical card by post, or at a staffed ticket office with an application form. There are no age, residence or other conditions. A card bought online arrives by email as an activation link for the app; the purchase confirmation alone cannot be used to buy discounted tickets.</p>

<h2>Who it suits</h2>
<p>The card is built for leisure travel in the region: shopping trips, visits to friends, days at the coast, family outings at weekends. Someone making two off-peak returns a month at ${h.gbp(24)} saves ${h.gbp(Math.round(24 * 24 * h.card('network').discount * 100) / 100)} over a year for ${h.gbp(h.card('network').price1y)}. Commuters gain little, since weekday journeys before 10am are excluded and seasons are not discounted.</p>

<h2>Network or a personal card?</h2>
<p>If you are under 31 or over 60, compare with your age-based card. The 16-25 and 26-30 cards work across Great Britain with no 10am limit, but they discount only your own ticket. The Senior card works everywhere except the morning peak in the region. The Network card wins when you travel in a group in the South East, because companions save too.</p>
<p>Whichever card you choose, the discount applies only to tickets bought while the card is valid, and the card must be carried on every journey.</p>
<p>Child tickets bought with the card cost at least £1 each.</p>`,
  },
});
