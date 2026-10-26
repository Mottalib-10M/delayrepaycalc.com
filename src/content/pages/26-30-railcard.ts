import { definePage } from '../../lib/guide-types';

export default definePage({
  id: '26-30-railcard',
  group: 'fares',
  order: 45,
  tool: { kind: 'mini:railcard', props: { card: 1, fare: 46, trips: 6 } },
  mini: { kind: 'mini:split' },
  related: ['16-25-railcard', 'two-together-railcard', 'is-a-railcard-worth-it', 'split-ticketing'],
  sources: ['railcards'],
  en: {
    slug: '26-30-railcard',
    nav: '26-30 Railcard',
    card: 'The digital-only card for 26 to 30 year olds: a third off, the weekday morning minimum fare, the last day to buy it and the trips that pay it back.',
    title: '26-30 Railcard: Digital Card, Discount and Minimum Fare',
    description: '26-30 Railcard: a third off most train fares for ages 26 to 30, digital only, with a weekday morning minimum fare. When to buy it, how many trips pay it back.',
    h1: '26-30 Railcard: a third off until you turn 31',
    intro: 'Type the fare of a typical trip and how many you make a year: the tool shows whether the card pays for itself and by how much.',
    resume: (h) => `The 26-30 Railcard takes a third off Standard Anytime, Off-Peak and Advance fares, and some First Class Advance fares, for anyone aged 26 to 30, for ${h.gbp(h.card('26-30').price1y)} a year. It is sold only online and lives in the Railcard app on your phone; there is no 3-year version and no paper card. It can be bought right up to the eve of your 31st birthday and used for the whole year, and you can renew it if it expires within 30 days, as long as the new card would not run past your 31st birthday. Like the 16-25 card, it has a minimum fare of ${h.gbp(h.card('26-30').minFare ?? 0)} on journeys before 10am Monday to Friday, which Advance tickets and public holidays escape; unlike the 16-25 card, the summer exemption of July and August does not apply. On a usual fare of ${h.gbp(46)}, each trip saves ${h.gbp(Math.round(46 * h.card('26-30').discount * 100) / 100)}, so the card pays for itself on the ${h.ord(Math.ceil(h.card('26-30').price1y / (Math.round(46 * h.card('26-30').discount * 100) / 100)))} trip. The tool above checks your own fare and number of trips.`,
    faqs: (h) => [
      { q: 'Can I get a 26-30 Railcard as a paper card?', a: 'No. It is digital only: you buy it online and it is stored in the Railcard app, where you show it to staff with your ticket. If you change phones, the card can be moved to the new device. Keep the phone charged on journeys, since travelling without the card shown can mean paying the full fare.' },
      { q: 'What happens to my 26-30 Railcard when I turn 31?', a: 'A card bought before your 31st birthday stays valid until it expires, a full year after purchase. You cannot renew it once the new card would run past your 31st birthday. After that, the Two Together Railcard, the Network Railcard or the Family & Friends Railcard may suit you, depending on who you travel with and where.' },
      { q: 'Does the 26-30 Railcard work on the London Underground?', a: 'For pay as you go, yes, once the discount is loaded onto an Oyster card registered in your name: it takes a third off single Off-Peak fares on the Underground and the DLR. It also discounts Anytime Day Travelcards bought with a rail ticket from outside London’s zones, subject to a minimum fare. Most other Underground tickets are excluded.' },
    ],
    body: (h) => `
<h2>Same discount, different rules from the 16-25 card</h2>
${h.table(['', '16-25 Railcard', '26-30 Railcard'], [
  ['Price', `${h.gbp(h.card('16-25').price1y)} (3 years ${h.gbp(h.card('16-25').price3y ?? 0)})`, `${h.gbp(h.card('26-30').price1y)}, 1 year only`],
  ['Format', 'digital or plastic', 'digital only'],
  ['Minimum fare before 10am on weekdays', h.gbp(h.card('16-25').minFare ?? 0), h.gbp(h.card('26-30').minFare ?? 0)],
  ['Minimum fare waived', 'Advance, public holidays, July and August', 'Advance, public holidays'],
  ['Last day to buy', 'day before 26th birthday', 'day before 31st birthday'],
], `${h.src('railcards', 'Railcards')}.`, ['l', 'l', 'l'])}

<h2>When the minimum fare bites</h2>
<p>On a weekday morning trip of ${h.gbp(15)}, a third off would give ${h.gbp(10)}, but the card charges ${h.gbp(h.card('26-30').minFare ?? 0)}: the saving drops from ${h.gbp(5)} to ${h.gbp(15 - (h.card('26-30').minFare ?? 0))}. On a trip of ${h.gbp(18)} or more, the minimum no longer matters. For people who commute short distances on weekday mornings, the card brings little; for weekend trips and longer journeys, the full third applies.</p>

<h2>Combining the card with a split</h2>
<p>A railcard applies to each ticket of a split journey, and its minimum fare applies to each ticket separately. Splitting a short morning trip into two small tickets can therefore cost more with the card than one through ticket. On longer journeys, a split with the railcard on each part can still beat the through fare: check with the calculator below the citable block, using the discounted prices of each part.</p>
<!--tool:mini:cardfare-->

<h2>What it does not cover</h2>
<p>Season tickets are not discounted, nor are most London Underground and DLR tickets other than pay as you go, some promotions of individual operators, and excursion or charter trains. Caledonian Sleeper tickets routed on the sleeper only, seated or in a room, are excluded too. The card belongs to one person and is valid only with the holder travelling.</p>

<h2>A late train on a railcard fare</h2>
<p>Compensation follows the price you paid. A ${h.gbp(30)} railcard single that arrives 35 minutes late with ${h.op('east-midlands-railway').name} pays ${h.gbp(h.pay('east-midlands-railway', 'single', 30, 35))}; an hour late, the whole ${h.gbp(30)}. The ${h.a('train-delay-compensation', 'compensation page')} explains the bands.</p>

<h2>Buying and renewing</h2>
<p>The card is bought online with proof of age, a passport, a UK driving licence or an EEA identity card, and it is usable at once in the Railcard app: there is no wait for the post. A renewal can be bought when the current card expires within 30 days, provided the new one would not run past your 31st birthday. Tickets must be bought while the card is valid, and the card shown on board with them.</p>

<h2>Who gains most</h2>
<p>People in their late twenties who visit family a few times a year, take weekend trips or travel for leisure gain the most, because these trips fall outside the weekday morning minimum. Someone making four long-distance returns a year at ${h.gbp(80)} saves ${h.gbp(Math.round(4 * 80 * h.card('26-30').discount * 100) / 100)} for ${h.gbp(h.card('26-30').price1y)}. Daily commuters on short weekday morning trips, on the other hand, gain little, since the minimum fare eats the discount and season tickets are excluded.</p>
<p>For them, a season or a Flexi season is usually a better route to cheaper travel than a railcard, which suits occasional and leisure journeys.</p>`,
  },
});
