import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'two-together-railcard',
  group: 'fares',
  order: 46,
  tool: { kind: 'mini:railcard', props: { card: 3, fare: 52, trips: 4 } },
  mini: { kind: 'mini:cheapest', props: { card: 3 } },
  related: ['which-railcard', 'family-and-friends-railcard', 'is-a-railcard-worth-it', 'cheap-train-tickets'],
  sources: ['railcards'],
  en: {
    slug: 'two-together-railcard',
    nav: 'Two Together',
    card: 'One card for two named adults travelling together: a third off both tickets from 09:30 on weekdays, and how few trips repay it.',
    title: 'Two Together Railcard: Rules, 09:30 Limit and Real Savings',
    description: 'Two Together Railcard: one card for two named adults who travel together, a third off both fares, not before 09:30 on weekdays. What it saves on your own trips.',
    h1: 'Two Together Railcard: a third off for pairs',
    intro: 'Type the combined fare for the two of you and how often you travel together: the tool gives the payback and the yearly saving.',
    resume: (h) => `The Two Together Railcard costs ${h.gbp(h.card('two-together').price1y)} a year for two people, ${h.gbp(h.card('two-together').price1y / 2)} each, and takes a third off both adult tickets when the two named holders travel together. Any two people aged 16 or over can share it: partners, friends, a parent and an adult child. There is no age condition and no proof needed beyond a photo of each holder. It works on Standard and First Class Anytime, Off-Peak, Super Off-Peak and Advance fares, and on the airport express trains, but not before 09:30 on weekdays, except on public holidays; at weekends it works all day. There is no minimum fare. Because it discounts two tickets at once, it pays back quickly: on a trip where each ticket costs ${h.gbp(26)}, the two of you save ${h.gbp(Math.round(52 * h.card('two-together').discount * 100) / 100)}, so the card is repaid on the ${h.ord(Math.ceil(h.card('two-together').price1y / (Math.round(52 * h.card('two-together').discount * 100) / 100)))} trip. Each holder can also have a personal railcard for trips made alone.`,
    faqs: (h) => [
      { q: 'Do both people on a Two Together Railcard have to travel together?', a: 'Yes, every time. The discount applies only when the two named holders make the same journey together, and both may be asked to show the card on board. If one of you travels alone, the card gives no discount for that trip; a personal railcard, if you hold one, can be used instead.' },
      { q: 'Can I use the Two Together Railcard before 9:30?', a: 'Not from Monday to Friday, except on public holidays. A weekday train leaving before 09:30 is charged at full fare even with the card. At weekends and on public holidays there is no time limit. Some stations have easements on time restrictions, which the Railcards website lists.' },
      { q: 'Can a parent and an adult child share a Two Together Railcard?', a: 'Yes. Any two people aged 16 or over can be the named holders, whatever their relationship. A parent with children of 5 to 15 will usually do better with the Family & Friends Railcard, because it also takes 60% off the children’s tickets.' },
    ],
    body: (h) => `
<h2>Two tickets, one card</h2>
${h.table(['Each ticket', 'Both full fare', 'Both with the card', 'Saving per trip'], [12, 20, 26, 40, 65].map((f) => [h.gbp(f), h.gbp(2 * f), h.gbp(Math.round(2 * f * (1 - h.card('two-together').discount) * 100) / 100), h.gbp(Math.round(2 * f * h.card('two-together').discount * 100) / 100)]), `From 09:30 on weekdays and all day at weekends. ${h.src('railcards', 'Railcards')}.`, ['r', 'r', 'r', 'r'])}

<h2>The 09:30 rule</h2>
<p>The only real limit is the time. From Monday to Friday, the discount applies on trains from 09:30; before that, the full fare is due. Public holidays are treated like weekends. For couples who commute together, the card helps only on the return leg and weekend trips; for days out and holidays, it fits perfectly. Check the departure time of the first train of your journey, not the time you buy.</p>
<!--tool:mini:railcard-->

<h2>Two Together or Family & Friends?</h2>
<p>The two cards cost the same. Two Together suits two adults travelling as a pair. Family & Friends needs at least one child aged 5 to 15 on each trip, but discounts up to four adults and four children, and is not limited at 09:30, only in the London and South East morning peak. A couple with children on most trips gains more from Family & Friends; without children, Two Together is the only one of the two that works.</p>

<h2>What is not discounted</h2>
<p>Season tickets, most London Underground and DLR tickets, some promotions of individual operators, excursion and charter trains, and combined rail and sea journeys to Ireland, Northern Ireland, the Isle of Man and Calais are outside the card. Caledonian Sleeper tickets are discounted only for seats.</p>

<h2>Delays with a Two Together fare</h2>
<p>Each discounted ticket is compensated on its own price. If both of you were on a train that arrived 40 minutes late with ${h.op('chiltern-railways').name}, each ${h.gbp(Math.round(26 * (1 - h.card('two-together').discount) * 100) / 100)} single pays ${h.gbp(h.pay('chiltern-railways', 'single', Math.round(26 * (1 - h.card('two-together').discount) * 100) / 100, 40))}; the claim can usually list both tickets.</p>

<h2>Buying it</h2>
<p>The card is sold online, as a digital card or a physical one, or at a staffed ticket office with an application form. Both holders are named, with a passport-style photo of each; there are no other conditions. It costs the same as a personal railcard but covers two people, so for a couple who travel together it is half the price of two individual cards.</p>

<h2>A year of weekends away</h2>
<p>Take a couple who make five weekend trips a year, each with two returns of ${h.gbp(48)}. Without the card they pay ${h.gbp(5 * 2 * 48)}; with it, ${h.gbp(Math.round(5 * 2 * 48 * (1 - h.card('two-together').discount) * 100) / 100)}. After the card's price, the saving is ${h.gbp(Math.round((5 * 2 * 48 * h.card('two-together').discount - h.card('two-together').price1y) * 100) / 100)}. Add Advance fares on long trips and the saving grows, because the card applies to Standard and First Class Advance tickets too.</p>

<h2>Practical points</h2>
<ul>
<li>Buy both tickets on the same booking with the card selected, so the discount applies to both.</li>
<li>Carry the card on each journey; if one holder has it on their phone, travel together.</li>
<li>If you split up during a trip, the tickets bought with the card are only valid when you travel together.</li>
</ul>
<p>Each holder may also hold a personal railcard; for any one ticket, only one railcard discount applies, so pick the card that matches the trip.</p>`,
  },
});
