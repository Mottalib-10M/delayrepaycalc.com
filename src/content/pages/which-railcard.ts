import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'which-railcard',
  group: 'fares',
  order: 42,
  tool: { kind: 'mini:whichcard' },
  mini: { kind: 'mini:cardfare' },
  related: ['is-a-railcard-worth-it', '16-25-railcard', 'two-together-railcard', 'senior-railcard', 'network-railcard'],
  sources: ['railcards', 'gov_1617'],
  en: {
    slug: 'which-railcard',
    nav: 'Which railcard',
    card: 'Every national railcard side by side: who can hold it, its price, the discount, the time limits and the minimum fare.',
    title: 'Which Railcard: Every Card, Price, Discount and Restriction',
    description: 'Which railcard can you get? Every national card compared: age or group, price for 1 or 3 years, discount, time limits and minimum fares, with a quick chooser.',
    h1: 'Which railcard is right for you?',
    intro: 'Answer four questions: the tool lists the national railcards you can hold, the most useful first.',
    resume: (h) => `Railcards cut the price of most train tickets across Great Britain by a third, for a yearly fee, and the right one depends on your age, who you travel with and where. Young people aged 16 to 25, and mature students, can hold the 16-25 Railcard; those aged 26 to 30 the 26-30 Railcard; people of 60 and over the Senior Railcard. Couples or any two named adults travelling together can share the Two Together Railcard for ${h.gbp(h.card('two-together').price1y)}. Families with children aged 5 to 15 use the Family & Friends Railcard, which takes a third off for adults and ${h.pc(h.card('family-friends').childDiscount ?? 0)} off for children. The Network Railcard covers London and the South East. The Disabled Persons Railcard costs ${h.gbp(h.card('disabled').price1y)} and also discounts a companion, and the Veterans Railcard serves those who served in the armed forces. The 16-17 Saver gives ${h.pc(h.card('16-17').discount)} off, seasons included. Most cards cost ${h.gbp(h.card('senior').price1y)} a year, several also ${h.gbp(h.card('senior').price3y ?? 0)} for three years. Each has its own limits, set out below.`,
    faqs: (h) => [
      { q: 'Can I hold two railcards at once?', a: 'Yes, you can own more than one, for example a 16-25 Railcard and a share in a Two Together Railcard, but only one railcard discount applies to each ticket. Choose the card whose conditions fit each trip: the Two Together card when you travel as a pair after 09:30, your own card when you travel alone or earlier.' },
      { q: 'Do railcards work on Advance tickets?', a: 'Most do: the 16-25, 26-30, Senior, Two Together, Family & Friends, Disabled Persons and Veterans Railcards discount Standard Advance fares, subject to their time limits, and the 16-17 Saver takes half off them. The weekday morning minimum fare of the age-based cards does not apply to Advance tickets. The Network Railcard is the exception: Advance tickets are excluded.' },
      { q: 'Is there a railcard for commuters?', a: `Railcards do not discount season tickets, with one exception: the 16-17 Saver takes ${h.pc(h.card('16-17').discount)} off seasons too. Commuters usually save through the season ticket itself or a Flexi season. Some cards, such as the Network Railcard and the Two Together card, are not valid in the weekday morning peak, which suits leisure trips rather than commuting.` },
    ],
    body: (h) => `
<h2>All national railcards</h2>
${h.table(['Railcard', 'Who', '1 year', '3 years', 'Discount', 'Main limit'], h.cards.map((c) => [h.a(({ '16-25': '16-25-railcard', '26-30': '26-30-railcard', senior: 'senior-railcard', 'two-together': 'two-together-railcard', network: 'network-railcard', 'family-friends': 'family-and-friends-railcard' } as Record<string, string>)[c.id] ?? 'which-railcard', c.name), c.ages, h.gbp(c.price1y), c.price3y ? h.gbp(c.price3y) : '-', h.share(c.discount), c.minFare !== null ? `minimum fare ${h.gbp(c.minFare)} ${c.minFareWhen}` : c.notBefore ? `not before ${c.notBefore} on weekdays` : c.notes]), `Read on ${h.src('railcards', 'railcard.co.uk')} (Rail Delivery Group); 16-17 Saver changes: ${h.src('gov_1617', 'Department for Transport')}.`, ['l', 'l', 'r', 'r', 'r', 'l'])}

<h2>Choosing in three questions</h2>
<ol>
<li><strong>Your age.</strong> Under 31, an age-based card is usually the obvious choice; 60 and over, the Senior card.</li>
<li><strong>Who you travel with.</strong> A regular companion makes the Two Together card worth a look, children make the Family & Friends card the strongest.</li>
<li><strong>Where and when.</strong> Mostly in London and the South East after 10am? The Network card has no age condition. Weekday mornings? Check the card's time limit or minimum fare.</li>
</ol>
<!--tool:mini:cardfare-->

<h2>Minimum fares and time limits, explained</h2>
<p>A minimum fare is the lowest price you pay with the card at certain times: with the 16-25 card, a ticket used before 10am on a weekday cannot cost less than ${h.gbp(h.card('16-25').minFare ?? 0)} after the discount, except Advance tickets and in July and August. A time limit is stricter: the card gives no discount at all on trains before a set time. The Network card combines both: valid after 10am on weekdays, with a minimum fare of ${h.gbp(h.card('network').minFare ?? 0)} on weekdays. These rules decide whether a card pays for itself on your trips, which the ${h.a('is-a-railcard-worth-it', 'break-even page')} works out.</p>

<h2>Railcards and Delay Repay</h2>
<p>A railcard fare is still a ticket like any other: if the train is late, Delay Repay applies to the discounted price you paid. If the train is cancelled and you give up, the discounted price comes back in full. The railcard itself is not refunded or extended because of disruption.</p>
<p>The railcard must be carried on every journey, on the app or as a card, and shown with the ticket when asked.</p>`,
  },
});
