import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'is-a-railcard-worth-it',
  group: 'fares',
  order: 43,
  tool: { kind: 'mini:railcard' },
  mini: { kind: 'mini:whichcard' },
  related: ['which-railcard', '16-25-railcard', 'senior-railcard', 'cheap-train-tickets'],
  sources: ['railcards'],
  en: {
    slug: 'is-a-railcard-worth-it',
    nav: 'Railcard break-even',
    card: 'How many trips make a railcard pay for itself, with the minimum fare and time limits taken into account, for 1-year and 3-year cards.',
    title: 'Railcard Worth It? Trips Needed to Pay Back the Card Price',
    description: 'Is a railcard worth it? The number of trips that pay back its price at your usual fare, with minimum fares and time limits, and the 3-year card compared.',
    h1: 'Is a railcard worth it? The break-even point',
    intro: 'Choose a railcard, type a usual fare and how often you travel: the tool gives the trip that pays the card back and the net saving.',
    resume: (h) => `A railcard is worth it once the money it saves on your tickets is more than its price. Most cards cost ${h.gbp(h.card('16-25').price1y)} for a year and take a third off, so each trip saves a third of the fare: on a usual fare of ${h.gbp(30)}, a trip saves ${h.gbp(h.card('16-25').discount * 30 >= 0 ? Math.round(30 * h.card('16-25').discount * 100) / 100 : 0)} and the card pays for itself on the ${h.ord(Math.ceil(h.card('16-25').price1y / (Math.round(30 * h.card('16-25').discount * 100) / 100)))} trip. On a fare of ${h.gbp(60)}, two trips are enough. Two things can push the break-even further: minimum fares, which cap the saving on cheap weekday morning journeys with the 16-25, 26-30, Network and Veterans cards, and time limits, which remove the discount altogether on some trains, such as the Two Together card before 09:30 on weekdays. A 3-year card, where offered, costs ${h.gbp(h.card('senior').price3y ?? 0)}, about ${h.gbp(Math.round(((h.card('senior').price3y ?? 0) / 3) * 100) / 100)} a year, which lowers the break-even if you are sure to keep travelling. The tool above applies these rules to the card and fare you choose.`,
    faqs: (h) => [
      { q: 'Is a railcard worth it for one return trip?', a: `Sometimes. A return trip of ${h.gbp(105)} or more saves at least ${h.gbp(35)} with a third off, which already covers a ${h.gbp(h.card('16-25').price1y)} card, and the card then keeps saving for the rest of the year. For a cheaper single trip, it pays only if you travel again within the year.` },
      { q: 'Does the 3-year railcard save money?', a: `If you will travel for the whole three years, yes: ${h.gbp(h.card('senior').price3y ?? 0)} for three years against ${h.gbp(h.card('senior').price1y * 3)} for three single years. It is offered for the 16-25, Senior, Family & Friends, Disabled Persons and Veterans cards. If your plans may change, or you will age out of a card, the 1-year card is the safer choice.` },
      { q: 'How does the minimum fare change the break-even?', a: `With a minimum fare, a weekday morning ticket cannot fall below a set price after the discount: ${h.gbp(h.card('16-25').minFare ?? 0)} for the 16-25 card. On a ${h.gbp(15)} fare, the saving is then ${h.gbp(15 - (h.card('16-25').minFare ?? 0))} instead of ${h.gbp(5)}, so you need more trips. Advance tickets and some periods are exempt; check the card’s conditions.` },
    ],
    body: (h) => `
<h2>Trips needed, by usual fare</h2>
${h.table(['Usual fare', 'Saving per trip', 'Trips to pay back', 'Net after 12 trips'], [10, 20, 30, 45, 60, 90].map((f) => { const s = Math.round(f * h.card('16-25').discount * 100) / 100; return [h.gbp(f), h.gbp(s), Math.ceil(h.card('16-25').price1y / s), h.gbp(Math.round((12 * s - h.card('16-25').price1y) * 100) / 100)]; }), `A card of ${h.gbp(h.card('16-25').price1y)} a year taking a third off, no minimum fare. ${h.src('railcards', 'Railcards')}.`, ['r', 'r', 'r', 'r'])}

<h2>Reading the result for each card</h2>
<ul>
<li><strong>16-25 and 26-30.</strong> Minimum fare of ${h.gbp(h.card('16-25').minFare ?? 0)} on weekday mornings before 10am; the 16-25 card waives it in July and August.</li>
<li><strong>Two Together.</strong> One card for two people, both named, travelling together, from 09:30 on weekdays. Count the saving on both tickets.</li>
<li><strong>Family & Friends.</strong> A third off adults and ${h.pc(h.card('family-friends').childDiscount ?? 0)} off children; a single family day out can be enough to pay it back.</li>
<li><strong>Network.</strong> London and the South East only, after 10am on weekdays, with a minimum fare of ${h.gbp(h.card('network').minFare ?? 0)} on weekdays.</li>
<li><strong>Senior.</strong> No minimum fare, but not valid in London and the South East during the morning peak.</li>
<li><strong>16-17 Saver.</strong> Half off, seasons included, no time limit: usually worth it from the first season ticket.</li>
</ul>
<!--tool:mini:whichcard-->

<h2>Hidden savings</h2>
<p>Most railcards also discount Anytime Day Travelcards bought as part of a ticket from outside London's zones, subject to a minimum fare, and some cards discount companions or children, which the break-even above does not count. If you take a few longer trips a year, such as holidays or family visits, include them: one long-distance return often weighs more than ten short trips.</p>

<h2>When a railcard is not worth it</h2>
<p>If almost all your travel is on a season ticket, most railcards do nothing for it. If you travel only on weekday mornings with short cheap fares, the minimum fare can wipe out the saving. And if you take one short trip a year, the card costs more than it saves. The break-even tool shows these cases as a negative net figure.</p>

<h2>Three profiles, worked out</h2>
${h.table(['Traveller', 'Card', 'Trips a year', 'Usual fare', 'Net saving'], [
  ['Student going home each month', '16-25', 12, h.gbp(42), h.gbp(h.cards.length ? Math.round((12 * Math.round(42 * h.card('16-25').discount * 100) / 100 - h.card('16-25').price1y) * 100) / 100 : 0)],
  ['Retired couple, two trips each season', 'Senior (each)', 8, h.gbp(55), h.gbp(Math.round((8 * Math.round(55 * h.card('senior').discount * 100) / 100 - h.card('senior').price1y) * 100) / 100)],
  ['Weekend trips in the South East', 'Network', 10, h.gbp(22), h.gbp(Math.round((10 * Math.round(22 * h.card('network').discount * 100) / 100 - h.card('network').price1y) * 100) / 100)],
], 'Fares are examples; weekend and off-peak travel, so no minimum fare or time limit applies.', ['l', 'l', 'r', 'r', 'r'])}
<p>In each case the card is repaid within the first few trips, and everything after that is saving. The figures change quickly with the fare: half the fare, and the trips needed double.</p>

<h2>Buying at the right moment</h2>
<p>Buy the card before booking the trip that repays it, since the discount applies only to tickets bought while you hold a valid card. If an age limit is close, the 16-25 card can be bought up to the day before the 26th birthday and the 26-30 card up to the day before the 31st, each then lasting a full year. A 3-year card is worth it only if you will stay eligible and keep travelling for the three years.</p>
<p>Keep in mind that a railcard bought for one trip keeps working for the rest of its year, so later trips you had not planned are a bonus on top of the break-even.</p>`,
  },
});
