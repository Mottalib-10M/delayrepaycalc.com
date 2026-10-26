import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'family-and-friends-railcard',
  group: 'fares',
  order: 49,
  tool: { kind: 'mini:railcard', props: { card: 5, fare: 64, trips: 3 } },
  mini: { kind: 'mini:whichcard', props: { age: 38, with: 2 } },
  related: ['which-railcard', 'two-together-railcard', 'network-railcard', 'cheap-train-tickets'],
  sources: ['railcards'],
  en: {
    slug: 'family-and-friends-railcard',
    nav: 'Family & Friends',
    card: 'A third off for up to four adults and 60% off for up to four children: who can be named, the child rules, and a family day out costed.',
    title: 'Family & Friends Railcard: Adult and Child Discounts Costed',
    description: 'Family & Friends Railcard: a third off for up to 4 adults and 60% off for up to 4 children aged 5 to 15 when a named adult travels with a child, costed.',
    h1: 'Family & Friends Railcard: adults and children',
    intro: 'Type the full adult fare of a family trip and how often you take it: the tool shows how quickly the card pays back.',
    resume: (h) => `The Family & Friends Railcard costs ${h.gbp(h.card('family-friends').price1y)} for a year or ${h.gbp(h.card('family-friends').price3y ?? 0)} for three. When at least one named adult travels with at least one child aged 5 to 15, it takes a third off the tickets of up to four adults and ${h.pc(h.card('family-friends').childDiscount ?? 0)} off those of up to four children, with a ${h.gbp(1)} minimum child fare. Anyone from 16 upwards can hold it, and two adults can be named: a partner, a grandparent, a friend or a childminder, who do not have to travel together. Children under 5 travel free anyway; adding one child ticket for a child aged 5 to 15 is what unlocks the adult discount. A child who turns 16 keeps the child discount until a 1-year card expires, or until the day before 17 on a 3-year card. The card works across Great Britain on Anytime, Off-Peak, Super Off-Peak and Standard Advance fares, except during the morning peak in London and the South East. One day out for two adults and two children often repays it in a single trip.`,
    faqs: (h) => [
      { q: 'Can grandparents use a Family & Friends Railcard?', a: 'Yes. Any adult aged 16 or over can be one of the two named holders, related to the children or not. A grandparent named on the card can take grandchildren aged 5 to 15 alone, and the adult discount applies to them and to up to three other adults travelling with the group.' },
      { q: 'Do I need a child with me to use the Family & Friends Railcard?', a: 'Yes. At least one named adult and at least one child aged 5 to 15 must travel together for any discount. Children under 5 travel free, but with only a toddler you can add one child ticket, at the £1 minimum, to unlock the adult discount. Without any child, the Two Together or a personal railcard may help instead.' },
      { q: 'Is the Family & Friends Railcard valid in the morning?', a: 'Across most of Great Britain, yes, at any time. In London and the South East, it is not valid during the morning peak, except on public holidays; peak times vary by route and some stations have easements. Weekend and holiday trips, the usual family journeys, are not affected.' },
    ],
    body: (h) => {
      const A = Math.round(64 * (1 - h.card('family-friends').discount) * 100) / 100;
      const C = Math.max(1, Math.round(32 * (1 - (h.card('family-friends').childDiscount ?? 0)) * 100) / 100);
      return `
<h2>A family trip, costed</h2>
${h.table(['Traveller', 'Full fare', 'With the card'], [
  ['Adult', h.gbp(64), h.gbp(A)],
  ['Adult', h.gbp(64), h.gbp(A)],
  ['Child aged 5 to 15', h.gbp(32), h.gbp(C)],
  ['Child aged 5 to 15', h.gbp(32), h.gbp(C)],
  ['Total', h.gbp(192), h.gbp(Math.round((2 * A + 2 * C) * 100) / 100)],
], `Example return fares; a child fare taken as half the adult fare for the example. ${h.src('railcards', 'Railcards')}.`, ['l', 'r', 'r'])}
<p>The saving on this one trip, ${h.gbp(Math.round((192 - 2 * A - 2 * C) * 100) / 100)}, is several times the price of the card.</p>

<h2>Who can be on the card</h2>
<ul>
<li>Two named adults, aged 16 or over, related or not; they do not have to travel together.</li>
<li>Up to four adults in total per journey, at least one of them named.</li>
<li>Up to four children aged 5 to 15, at least one on each journey.</li>
<li>Children under 5 travel free, with or without the card.</li>
</ul>
<!--tool:mini:railcard-->

<h2>Teenagers turning 16</h2>
<p>When a child turns 16, the child discount continues while travelling with a named adult: until the 1-year card expires, or until the day before the 17th birthday on a 3-year card. After that, a 16-25 Railcard or a 16-17 Saver gives the teenager a discount of their own, ${h.pc(h.card('16-17').discount)} off with the Saver.</p>

<h2>What is not covered</h2>
<p>The morning peak in London and the South East, First Class tickets except weekend upgrades, most London Underground and DLR tickets, some promotions of individual operators including group offers, excursion and charter trains and some coach links. Season tickets are not discounted.</p>

<h2>Delays on a family trip</h2>
<p>Each ticket is compensated on its own discounted price, so list every ticket of the booking in the claim. If the family above is 35 minutes late on the outward leg with ${h.op('crosscountry').name}, the four return tickets pay ${h.gbp(Math.round((2 * h.pay('crosscountry', 'return', A, 35) + 2 * h.pay('crosscountry', 'return', C, 35)) * 100) / 100)} together.</p>

<h2>Buying it</h2>
<p>Anyone from the age of 16 upwards can buy the card online, as a digital or physical card, or at a staffed ticket office with an application form. There are no eligibility conditions. You can name a second adult at purchase: a partner, a grandparent, a friend or a childminder who may travel with the children. Children are not named on the card.</p>

<h2>Holidays and half-terms</h2>
<p>The card pays most during school holidays, when families make long trips. A family of two adults and two children taking three such trips a year, each costing ${h.gbp(192)} at full fare as in the table, saves about ${h.gbp(Math.round(3 * (192 - 2 * A - 2 * C) * 100) / 100)} over the year. A 3-year card at ${h.gbp(h.card('family-friends').price3y ?? 0)} lowers the cost further for families who travel every year.</p>

<h2>Groups and other offers</h2>
<p>The card cannot be combined with some operator promotions, including group offers such as GroupSave. When three or four adults travel without children, compare the group offer with individual railcards: the Family & Friends card gives nothing unless a child aged 5 to 15 is on the journey.</p>
<p>Children under 5 travel free in any case, so they never need a ticket of their own except to unlock the adult discount when no older child travels.</p>`;
    },
  },
});
