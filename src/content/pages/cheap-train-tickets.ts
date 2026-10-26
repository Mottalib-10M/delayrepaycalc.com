import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cheap-train-tickets',
  group: 'fares',
  order: 41,
  tool: { kind: 'mini:cheapest' },
  mini: { kind: 'mini:railcard' },
  related: ['split-ticketing', 'which-railcard', 'is-a-railcard-worth-it', 'rail-fares-2027'],
  sources: ['nrcot', 'railcards', 'gov_freeze'],
  en: {
    slug: 'cheap-train-tickets',
    nav: 'Cheaper tickets',
    card: 'Anytime, Off-Peak and Advance fares compared with and without a railcard, and the rules that make a cheap ticket a good or a risky buy.',
    title: 'Cheap Train Tickets: Anytime, Off-Peak, Advance, Railcards',
    description: 'Cheap train tickets in Great Britain: Anytime, Off-Peak and Advance fares compared, with or without a railcard, and what each one allows if your train is late.',
    h1: 'Cheaper train tickets: which fare to buy',
    intro: 'Type the fares you see for your trip and pick a railcard: the tool ranks them by what you would actually pay.',
    resume: (h) => `Cheap train tickets in Great Britain come from three fare types and a discount. Anytime tickets are the most flexible and the dearest. Off-Peak tickets are cheaper but valid only at the times the operator sets for each route. Advance tickets are cheapest but tied to one train and, unless disruption gets in the way, not refundable. A railcard takes a third off most of these fares for ${h.gbp(h.card('16-25').price1y)} a year, with time limits or minimum fares that depend on the card. Regulated fares in England, which include many season tickets and Off-Peak returns between major cities, were frozen from ${h.date(h.FARES.freezeFrom)} instead of rising by ${h.pc(h.FARES.wouldHaveRisenPct, 1)}. Cheap is not only about the price: an Advance ticket on a train that is cancelled can still be refunded in full, but an Advance ticket you no longer want cannot, whereas a change of plans on a flexible ticket can be refunded for a fee of up to ${h.gbp(h.N.adminChargeMax)} if you ask before it becomes valid. The tool above compares the fares you find.`,
    faqs: (h) => [
      { q: 'Are Advance tickets always the cheapest?', a: 'Often on long-distance routes, but not always. Advance fares are released in limited numbers per train and rise as they sell. Close to the date, an Off-Peak ticket with a railcard can cost less than the remaining Advance fares, and it lets you take any Off-Peak train. Compare all three before buying.' },
      { q: 'When are Off-Peak times?', a: 'Each operator sets Off-Peak validity for each route, usually outside the weekday morning and evening peaks. The restrictions are shown when you buy and on the ticket conditions. A ticket used outside its valid times is not valid for that train, which can mean paying a higher fare on board.' },
      { q: 'Does a cheaper ticket get less Delay Repay?', a: 'Yes, in pounds, because Delay Repay is a share of the price paid. In proportion it is the same: an hour late refunds the whole single with most operators, whether it cost £15 or £90. A cancelled Advance ticket that you do not use is refunded in full under condition 30 of the Conditions of Travel.' },
    ],
    body: (h) => `
<h2>Three fares compared</h2>
${h.table(['', 'Anytime', 'Off-Peak', 'Advance'], [
  ['Times', 'any train', 'off-peak times set for the route', 'the booked train only'],
  ['Railcard', 'a third off with most cards', 'a third off with most cards', 'a third off with most cards'],
  ['Refund for a change of plans', `before it becomes valid, fee up to ${h.gbp(h.N.adminChargeMax)}`, `before it becomes valid, fee up to ${h.gbp(h.N.adminChargeMax)}`, 'usually not refundable'],
  ['Refund if the train is cancelled and you do not go', 'full, no fee', 'full, no fee', 'full, no fee'],
  ['Delay Repay', 'share of the price paid', 'share of the price paid', 'share of the price paid'],
], `${h.src('nrcot', 'Conditions of Travel')}, conditions 29 and 30; ${h.src('railcards', 'Railcards')}.`, ['l', 'l', 'l', 'l'])}

<h2>The railcard question</h2>
<p>For ${h.gbp(h.card('16-25').price1y)} a year, most railcards take a third off adult fares. A card pays for itself once the savings pass its price: with a usual fare of ${h.gbp(45)}, that is after ${h.num(Math.ceil(h.card('16-25').price1y / (45 - Math.round(45 * (1 - h.card('16-25').discount) * 100) / 100)))} trips. The limits differ: the 16-25 and 26-30 cards have a minimum fare of ${h.gbp(h.card('16-25').minFare ?? 0)} before 10am on weekdays, the Two Together card is not valid before 09:30 on weekdays, the Network card covers only London and the South East. The ${h.a('which-railcard', 'railcard chooser')} lists the cards you can hold.</p>
<!--tool:mini:railcard-->

<h2>Splitting the journey</h2>
<p>Buying two or more tickets for one journey is allowed if your train stops where the tickets change. It sometimes beats every through fare. The ${h.a('split-ticketing', 'split ticketing page')} explains the rule and has a calculator for the fares you find.</p>

<h2>What a cheap ticket costs when things go wrong</h2>
<p>The cheapest ticket is also the most rigid. If you miss an Advance train through your own fault, the ticket is not valid on the next one. If the railway makes you miss it, through a late connecting train, condition 9.4 lets you take the next train of the company your ticket is valid with. If the train is cancelled and you give up, the full price comes back. If you travel late, Delay Repay pays a share of what you paid. Weigh the saving against how sure your plans are.</p>

<h2>Fares in 2026 and 2027</h2>
<p>The freeze of regulated fares in England from ${h.date(h.FARES.freezeFrom)} kept many season tickets and commuter fares at their 2025 level. Unregulated fares, such as most Advance tickets, are set by operators. The government has not announced the fares for March 2027 yet: the ${h.a('rail-fares-2027', 'rail fares 2027 page')} follows the decision.</p>

<h2>Five habits that lower the fare</h2>
<ol>
<li>Book long-distance trips early, when Advance fares are released, and set a price alert if your retailer offers one.</li>
<li>Travel outside the peak when you can: Off-Peak and Super Off-Peak fares cost less on most routes.</li>
<li>Hold the railcard that fits you, and use it on every eligible ticket.</li>
<li>Compare a return with two singles; on some routes, two singles cost the same and offer more flexibility.</li>
<li>Check whether a split makes the same train cheaper.</li>
</ol>
<p>None of these habits reduces your rights when the train is late: Delay Repay and refunds apply to every fare.</p>`,
  },
});
