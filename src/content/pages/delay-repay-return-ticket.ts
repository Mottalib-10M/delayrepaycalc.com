import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'delay-repay-return-ticket',
  group: 'claim',
  order: 4,
  tool: { kind: 'repay', props: { operator: 'lner', ticket: 'return', price: 96, delay: 50 } },
  mini: { kind: 'mini:returnlegs', props: { op: 'gwr', price: 64, out: 35, back: 70 } },
  related: ['delay-repay-amounts', 'delay-repay-15-minutes', 'delay-repay-advance-tickets', 'how-to-claim-delay-repay'],
  sources: ['nrcot', 'nr_comp'],
  en: {
    slug: 'delay-repay-return-ticket',
    nav: 'Return tickets',
    card: 'One late leg or two on a return ticket: how each leg is valued, when the whole fare comes back, and returns against two singles.',
    title: 'Delay Repay on a Return Ticket: One Late Leg or Both Legs',
    description: 'Delay Repay on a return ticket pays per late leg, each worth half the fare, up to the full price. Work out one or both late legs and compare with two singles.',
    h1: 'Delay Repay on a return ticket',
    intro: 'Choose the operator, type the return fare and the minutes late on each leg: the tool adds both legs and stops at the price of the ticket.',
    resume: (h) => `Delay Repay on a return ticket is worked out leg by leg. The return fare covers two journeys, so each journey is treated as half of it, and the share for the delay band applies to that half. With a Delay Repay 15 operator, a late outward leg pays 12.5% of the return fare from 15 minutes, 25% from 30 minutes and 50% from 60 minutes; if one leg is two hours late or more, most operators refund the whole return. When both legs are late, you claim each journey and the amounts are added, up to the price of the ticket. The National Rail Conditions of Travel set the same logic for the minimum from ${h.num(h.N.minDelay)} minutes: ${h.pc(h.N.minPct)} of the price of the late portion, or ${h.pc(h.N.minPct)} of the whole fare if both legs were delayed. Two singles bought instead of a return are compensated as two separate tickets, each on its own price, which sometimes pays more for the same delay.`,
    faqs: (h) => [
      { q: 'Do I claim the outward and return journeys of a return ticket separately?', a: 'Usually yes. Most claim forms ask for one journey at a time, with its date, scheduled departure and minutes late. You enter the same ticket for both claims; the operator checks that the two claims together do not exceed the price of the ticket. If the two legs were with different operators, each claim goes to the company that ran the late train.' },
      { q: 'What if my return journey was cancelled and I came back another day?', a: `Condition 28.4 of the Conditions of Travel lets you use your ticket on a later date if your train is likely to be more than ${h.num(h.N.laterDateDelay)} minutes late, on similar restrictions. You would then claim no delay for that leg, because you chose to travel later. If you travelled on the day and arrived late, the delay at your destination is what you claim.` },
      { q: 'Is an open return compensated differently from a day return?', a: 'No. The scheme looks at the price you paid for the return and the delay on each journey, not at how long the return part is valid. An open return used a week later is still half of the fare for that leg. What changes is the time limit: the 28 days run from the day of each journey, so the return leg has its own deadline.' },
    ],
    body: (h) => `
<h2>How each leg is valued</h2>
<p>Take a return bought for ${h.gbp(80)} with a Delay Repay 15 operator. The table shows what one late leg pays, and what two late legs pay together. The figures come from ${h.op('southern').name}'s bands; the calculator above uses the bands of the operator you pick.</p>
${h.table(['Outward late', 'Return late', 'Paid', 'Share of the fare'], [
  ['20 min', 'on time', h.gbp(h.pay('southern', 'return', 80, 20)), h.share(h.shareAt('southern', 20, 'return'))],
  ['45 min', 'on time', h.gbp(h.pay('southern', 'return', 80, 45)), h.share(h.shareAt('southern', 45, 'return'))],
  ['70 min', 'on time', h.gbp(h.pay('southern', 'return', 80, 70)), h.share(h.shareAt('southern', 70, 'return'))],
  ['45 min', '45 min', h.gbp(h.pay('southern', 'return', 80, 45, 45)), h.share(h.pay('southern', 'return', 80, 45, 45) / 80)],
  ['70 min', '70 min', h.gbp(h.pay('southern', 'return', 80, 70, 70)), h.share(h.pay('southern', 'return', 80, 70, 70) / 80)],
  ['125 min', 'on time', h.gbp(h.pay('southern', 'return', 80, 125)), h.share(h.shareAt('southern', 125, 'return'))],
], `Return of ${h.gbp(80)}, bands of ${h.op('southern').name}. Two legs together never pay more than the ticket.`, ['l', 'l', 'r', 'r'])}

<h2>A return or two singles?</h2>
<p>On many long-distance routes a single costs little less than a return, and on some, two singles cost the same as a return. When that is the case, two singles are better protected: each single is a ticket on its own, so a 45-minute delay on one of them pays half of that single, not a quarter of a return. Take a route where the return is ${h.gbp(80)} and each single ${h.gbp(40)}: a 45-minute outward delay pays ${h.gbp(h.pay('southern', 'return', 80, 45))} on the return and ${h.gbp(h.pay('southern', 'single', 40, 45))} on the single. The figure is the same here because the single is exactly half. The gap appears with the 120-minute band, where one leg of a return can refund ${h.gbp(h.pay('southern', 'return', 80, 125))} but a single at most ${h.gbp(40)}, or when the single costs more than half the return.</p>
<!--tool:mini:returnlegs-->

<h2>Off-Peak and Anytime returns</h2>
<p>The type of return does not change the arithmetic. An Off-Peak return is compensated on the Off-Peak price you paid, an Anytime return on the Anytime price. If a railcard reduced the fare, the reduced price is the base. Advance tickets are sold as singles, so a trip made of two Advance tickets is two singles for Delay Repay, with the rules on our ${h.a('delay-repay-advance-tickets', 'Advance and railcard page')}.</p>

<h2>Claiming both legs</h2>
<ol>
<li>Claim the outward journey within ${h.num(h.N.claimDays)} days of that journey, with the ticket details and the scheduled departure.</li>
<li>Claim the return journey within ${h.num(h.N.claimDays)} days of the return, quoting the same ticket. Some forms let you add the second journey to the first claim.</li>
<li>If the operator refuses the second claim because the ticket was already used for a claim, point out that the two legs are separate journeys and that the total stays under the price paid.</li>
</ol>
<p>The ${h.a('delay-repay-time-limit', 'time limit page')} gives the last day for each leg, and our ${h.a('how-to-claim-delay-repay', 'claim guide')} covers what to send.</p>

<h2>When a leg is cancelled</h2>
<p>If the outward train was cancelled and you gave up the trip, you are owed a full refund of the unused return, without a fee, under condition 30 of the ${h.src('nrcot', 'Conditions of Travel')}. If you began the journey but could not complete it and went back to your starting station, the same full refund applies. You cannot take the refund and Delay Repay for the same journey. The ${h.a('cancelled-train-refund', 'cancellation refund page')} covers it.</p>`,
  },
});
