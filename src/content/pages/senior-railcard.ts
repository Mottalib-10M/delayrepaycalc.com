import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'senior-railcard',
  group: 'fares',
  order: 48,
  tool: { kind: 'mini:railcard', props: { card: 2, fare: 38, trips: 5 } },
  mini: { kind: 'mini:returnlegs', props: { op: 'gwr', price: 58, out: 65, back: 0 } },
  related: ['which-railcard', 'is-a-railcard-worth-it', 'two-together-railcard', 'delay-repay-return-ticket'],
  sources: ['railcards'],
  en: {
    slug: 'senior-railcard',
    nav: 'Senior Railcard',
    card: 'A third off for people aged 60 and over, with no minimum fare: the morning peak limit in London and the South East, prices and the 3-year card.',
    title: 'Senior Railcard: Over 60s Discount, Peak Limit, 3-Year Card',
    description: 'Senior Railcard for people aged 60 and over: a third off most fares, no minimum fare, not valid in the London and South East morning peak; 1 or 3-year card.',
    h1: 'Senior Railcard: a third off from 60',
    intro: 'Type the usual fare of your trips and how many you make: the tool shows when the card has paid for itself.',
    resume: (h) => `The Senior Railcard is for anyone aged 60 or over. It costs ${h.gbp(h.card('senior').price1y)} for a year or ${h.gbp(h.card('senior').price3y ?? 0)} for three, and takes a third off Standard and First Class Anytime, Off-Peak, Super Off-Peak and Advance fares across Great Britain, with no minimum fare at any time. Proof of age is needed when you first buy it, with a passport-style photo for the digital card; renewing through a Railcard account avoids a new check. The one restriction concerns London and the South East: the card is not valid during the morning peak for journeys between two stations inside the Network Railcard area, except on public holidays, and peak times vary locally. Elsewhere in Great Britain there is no time limit. It also discounts Off-Peak pay as you go on Oyster once loaded, Anytime Day Travelcards bought with a rail ticket from outside London's zones, and the airport express trains. On a usual fare of ${h.gbp(38)}, each trip saves ${h.gbp(Math.round(38 * h.card('senior').discount * 100) / 100)} and the card is repaid on the ${h.ord(Math.ceil(h.card('senior').price1y / (Math.round(38 * h.card('senior').discount * 100) / 100)))} trip.`,
    faqs: (h) => [
      { q: 'What ID do I need for a Senior Railcard?', a: 'Proof that you are 60 or over, such as a passport or a UK driving licence (licences from Northern Ireland are excluded on the Railcards list), plus, for a digital card, a photo of the passport kind. If you buy online and keep a Railcard account, renewals do not need a new identity check.' },
      { q: 'Can I use a Senior Railcard in the morning?', a: 'Yes, anywhere outside London and the South East, at any time. Inside that area, the card is not valid during the morning peak for journeys between two of its stations, except on public holidays. Peak times differ from route to route, and some stations have easements; check locally or on the Railcards list of easements before travelling.' },
      { q: 'Is the 3-year Senior Railcard better value?', a: `It costs ${h.gbp(h.card('senior').price3y ?? 0)} against ${h.gbp(h.card('senior').price1y * 3)} for three 1-year cards, a saving of ${h.gbp(h.card('senior').price1y * 3 - (h.card('senior').price3y ?? 0))}. Since there is no upper age limit, the only risk is travelling less than planned. For anyone who takes a few train trips each year, the 3-year card is the cheaper choice.` },
    ],
    body: (h) => `
<h2>Prices and savings</h2>
${h.table(['Usual fare', 'With the card', 'Saving', 'Trips to repay a 1-year card'], [15, 25, 38, 60, 110].map((f) => { const s = Math.round(f * h.card('senior').discount * 100) / 100; return [h.gbp(f), h.gbp(Math.round((f - s) * 100) / 100), h.gbp(s), Math.ceil(h.card('senior').price1y / s)]; }), `No minimum fare. ${h.src('railcards', 'Railcards')}.`, ['r', 'r', 'r', 'r'])}

<h2>The London and South East morning limit</h2>
<p>In the weekday morning peak, the Senior Railcard cannot be used for trips between two stations inside the Network Railcard area, from Monday to Friday, except public holidays. Outside that area, or on a journey that starts or ends outside it, there is no limit. Each operator sets its own morning peak, so a 09:15 train may be fine on one route and excluded on another. When in doubt, travel a little later or check the easements published by Railcards.</p>
<!--tool:mini:railcard-->

<h2>Travelling as a couple</h2>
<p>Two people over 60 can each hold a Senior Railcard, for ${h.gbp(2 * h.card('senior').price1y)} together, or share one Two Together Railcard for ${h.gbp(h.card('two-together').price1y)}. The Two Together card is cheaper but works only when both travel together and not before 09:30 on weekdays. If you often travel alone, two Senior cards are more flexible.</p>

<h2>Longer trips and Delay Repay</h2>
<p>On longer journeys with Off-Peak and Advance fares, a delay can be worth a good part of the fare. Compensation is calculated on the discounted price: a ${h.gbp(58)} return with ${h.op('gwr').name} where the outward train is 65 minutes late pays ${h.gbp(h.pay('gwr', 'return', 58, 65))}. The tool under the citable block works out both legs, and the ${h.a('delay-repay-return-ticket', 'return ticket page')} explains it.</p>

<h2>What the card does not cover</h2>
<p>Season tickets, including Travelcard seasons, most London Underground and DLR tickets other than Oyster pay as you go, some promotions of individual operators, excursion and charter trains and most RailAir services are outside it. Caledonian Sleeper discounts apply to seated tickets and some rooms.</p>

<h2>Buying it</h2>
<p>The card can be bought online, as a digital or physical card, or at a staffed ticket office. Proof of age is needed at the first purchase, such as a passport or a UK driving licence, along with a passport-style photo for a digital card. Buying online and keeping a Railcard account means future renewals need no further identity check. Allow up to ten days for a card sent by standard post.</p>

<h2>A year of trips</h2>
<p>Take someone who visits family four times a year on returns of ${h.gbp(70)} and makes six shorter day trips at ${h.gbp(20)}. Without the card the year costs ${h.gbp(4 * 70 + 6 * 20)}; with it, ${h.gbp(Math.round((4 * 70 + 6 * 20) * (1 - h.card('senior').discount) * 100) / 100)}, a saving of ${h.gbp(Math.round((4 * 70 + 6 * 20) * h.card('senior').discount * 100) / 100)} before the price of the card. Because there is no minimum fare, even short off-peak hops count fully.</p>

<h2>Other discounts with the card</h2>
<p>Holders can load the discount onto an Oyster card to save on Off-Peak pay as you go fares on National Rail, the Underground and the DLR in London. Anytime Day Travelcards bought with a rail ticket from outside London's zones are discounted, subject to a minimum fare. Gatwick Express, Stansted Express and Heathrow Express accept the card.</p>`,
  },
});
