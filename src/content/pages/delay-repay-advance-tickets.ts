import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'delay-repay-advance-tickets',
  group: 'claim',
  order: 8,
  tool: { kind: 'repay', props: { operator: 'avanti-west-coast', ticket: 'single', price: 27.5, delay: 64 } },
  mini: { kind: 'mini:cardfare', props: { fare: 54 } },
  related: ['delay-repay-return-ticket', 'split-ticketing', 'automatic-delay-repay', 'which-railcard', 'cancelled-train-refund'],
  sources: ['nrcot', 'railcards', 'gov_cancel'],
  en: {
    slug: 'delay-repay-advance-tickets',
    nav: 'Advance and railcard',
    card: 'Advance tickets, railcard fares and split tickets: what Delay Repay is worked out on, and what happens when the booked train is cancelled.',
    title: 'Delay Repay on Advance Tickets, Railcards and Split Tickets',
    description: 'Delay Repay on Advance tickets, railcard fares and split tickets is worked out on the price paid. See what a late or cancelled booked train is worth to you.',
    h1: 'Delay Repay on Advance tickets, railcard fares and split tickets',
    intro: 'Type the price you actually paid, after the railcard discount: the calculator applies the band of the operator that ran the late train.',
    resume: (h) => `Delay Repay on an Advance ticket, a railcard fare or a split ticket is worked out on the price you paid, not on the full fare for the route. An Advance single bought for ${h.gbp(27.5)} that arrives 64 minutes late with ${h.op('avanti-west-coast').name} pays ${h.gbp(h.pay('avanti-west-coast', 'single', 27.5, 64))}, the whole fare, because the 60-minute band refunds 100% of a single. With a railcard, the base is the fare after its discount, usually a third off. Advance tickets are sold as singles and tied to a booked train, so the rules of the National Rail Conditions of Travel on disruption matter more than usual: if the booked train is cancelled, condition 28.3 normally lets you take one of the ${h.num(h.N.alternativeTrains)} trains before or after it with the same operator, and since ${h.date(h.N.crossOperatorFrom)} many operators also accept tickets on another company's train leaving within ${h.num(h.N.crossOperatorWindowHours)} hours. If the disruption makes you give up the trip, condition 30 gives a full refund, even on a ticket that is otherwise non-refundable.`,
    faqs: (h) => [
      { q: 'Can I claim Delay Repay on a cheap Advance ticket?', a: 'Yes. Advance tickets are covered like any other ticket, and the share applies to what you paid. A cheap fare gives a small amount, but a delay of an hour or more refunds the whole single with most operators. Several companies even start the claim for you when the Advance ticket was bought on their own website or app.' },
      { q: 'Does a railcard discount reduce Delay Repay?', a: 'Yes, because the scheme pays a share of the price paid. With a third off, the compensation is a third lower than for the same delay on a full fare. The railcard still pays for itself through the cheaper fares; the compensation simply follows the price. Enter the discounted price in the calculator.' },
      { q: 'Is an Advance ticket refunded if the booked train is cancelled?', a: `Yes, if the cancellation makes you give up the trip. Condition 30 of the Conditions of Travel gives a full refund, with no administration fee, when the train you meant to take is cancelled, delayed or rescheduled, and Advance tickets are included. Tell the retailer within ${h.num(h.N.refundNotifyDays)} days of the day you meant to travel. If you travel on another train instead, Delay Repay applies to that journey.` },
    ],
    body: (h) => `
<h2>The price paid is the base</h2>
<p>Every scheme pays a share of the price paid for the ticket. That makes Delay Repay on cheap tickets small in pounds but identical in proportion. The table compares the same 40-minute delay with ${h.op('avanti-west-coast').name} on three fares for the same trip.</p>
${h.table(['Ticket', 'Price paid', '40 min late', '70 min late'], [
  ['Anytime single', h.gbp(96), h.gbp(h.pay('avanti-west-coast', 'single', 96, 40)), h.gbp(h.pay('avanti-west-coast', 'single', 96, 70))],
  ['Same with a railcard', h.gbp(Math.round(96 * (1 - h.card('16-25').discount) * 100) / 100), h.gbp(h.pay('avanti-west-coast', 'single', Math.round(96 * (1 - h.card('16-25').discount) * 100) / 100, 40)), h.gbp(h.pay('avanti-west-coast', 'single', Math.round(96 * (1 - h.card('16-25').discount) * 100) / 100, 70))],
  ['Advance single', h.gbp(27.5), h.gbp(h.pay('avanti-west-coast', 'single', 27.5, 40)), h.gbp(h.pay('avanti-west-coast', 'single', 27.5, 70))],
], `Example fares; bands of ${h.op('avanti-west-coast').name}. A railcard takes a third off most fares (${h.src('railcards', 'Railcards')}).`, ['l', 'r', 'r', 'r'])}

<h2>When the booked train is cancelled</h2>
<p>An Advance ticket is valid only on the train booked, which is why disruption needs care. Under condition 28.3 of the ${h.src('nrcot', 'National Rail Conditions of Travel')}, when a service is cancelled after you bought your ticket you will normally be allowed to travel on one of the ${h.num(h.N.alternativeTrains)} trains before or after it with the same operator; where trains are much less frequent, the operator provides another option. Since ${h.date(h.N.crossOperatorFrom)}, a scheme announced by the Department for Transport also lets passengers of ${h.num(h.N.crossOperatorOperators.length)} operators use another participating company's train leaving within ${h.num(h.N.crossOperatorWindowHours)} hours of the cancelled one. The ${h.a('train-cancelled-rights', 'cancelled train page')} explains both.</p>
<!--tool:mini:crossop-->

<h2>Giving up the trip</h2>
<p>If the train you meant to take is cancelled, delayed or rescheduled and you decide not to travel, condition 30 gives a full refund of the unused ticket without an administration fee, and that includes Advance tickets. If you had started and went back to your departure station because of the disruption, the same refund applies. You must tell the retailer or operator within ${h.num(h.N.refundNotifyDays)} days of the day you intended to travel. What you cannot do is get a refund and claim Delay Repay for the same journey.</p>

<h2>Split tickets</h2>
<p>A journey made on two or more tickets, each covering part of the route, is valid as long as the train calls at the station where the tickets change (condition 14.2). For Delay Repay, what counts is the delay at the destination of your journey. Claim with every ticket you held for that journey: the operator values the claim on the tickets it judges covered the delayed part, and if only one did, its answer should say which price it used. Our ${h.a('split-ticketing', 'split ticketing page')} explains the rule and the saving.</p>

<h2>Small fares, simple habits</h2>
<ul>
<li>Note the price after any discount: the e-ticket or the booking email shows it.</li>
<li>If you bought on the operator's own website, look for an automatic claim email first, listed on the ${h.a('automatic-delay-repay', 'automatic Delay Repay page')}.</li>
<li>Keep the booking until the claim is paid, even for a fare of a few pounds.</li>
</ul>

<h2>First Class Advance and seat reservations</h2>
<p>A First Class Advance ticket is compensated on its own price like any other. If the train runs without the first class accommodation shown in the timetable, or it is full, condition 31.1 adds a separate right: a refund of at least the difference between your first class ticket and the cheapest standard walk-up fare on that service, claimed within ${h.num(h.N.claimDays)} days from the company you travelled with.</p>`,
  },
});
