import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'season-ticket-refund',
  group: 'fares',
  order: 51,
  tool: { kind: 'mini:seasonrefund' },
  mini: { kind: 'mini:season', props: { op: 'c2c', kind: 1, price: 380, min: 22, n: 8 } },
  related: ['season-ticket-delay-repay', 'rail-fares-2027', 'cancelled-train-refund', 'train-strike-refund'],
  sources: ['nrcot'],
  en: {
    slug: 'season-ticket-refund',
    nav: 'Season ticket refund',
    card: 'Handing back a weekly, monthly or annual season: how the refund is worked out, the days you must have left, the fee and the illness rule.',
    title: 'Season Ticket Refund: How Much You Get Back and Deadlines',
    description: 'Season ticket refund rules: travel used is deducted day by day, a fee of up to £10, a minimum of days left, and no refund on an annual after 10 months 12 days.',
    h1: 'Season ticket refund: handing a season back',
    intro: 'Enter the season price, its start date, the day you hand it back and the prices on your route: the tool estimates the refund.',
    resume: (h) => `A season ticket refund is governed by Part G of the National Rail Conditions of Travel, version ${h.num(h.N.version)}. You hand the season back to the train company or retailer that sold it, and the refund is calculated from that day: condition 40.2 takes off the price of a return trip for every day between the first day of the season and to the day you return it, plus an administration charge of up to ${h.gbp(h.N.seasonRefund.adminMax)}. Its own example shows the logic: a monthly season returned after nine days loses the price of a 7-day season and two day returns. To get money back at all, a weekly season must have at least ${h.num(h.N.seasonRefund.weeklyMinDaysLeft)} days of validity left and a season of one to ten months at least ${h.num(h.N.seasonRefund.monthsMinDaysLeft)} days; an annual season gives no refund after ${h.N.seasonRefund.annualNoRefundAfter}. If illness stopped you asking in time, the refund runs from the day the illness started, with a medical certificate. Because longer seasons carry a bigger discount, a refund is usually smaller than the unused share of the price suggests.`,
    faqs: (h) => [
      { q: 'Why is my season ticket refund less than the unused months?', a: 'Because the days you used are charged at the price of shorter tickets, which cost more per day than the season. On a monthly season returned after nine days, condition 40.2 deducts a 7-day season and two day returns, not nine thirtieths of the monthly price. An administration fee is also taken.' },
      { q: 'Can I get a refund on an annual season ticket after ten months?', a: `Not after ${h.N.seasonRefund.annualNoRefundAfter}: condition 40.4 says an annual season no longer qualifies for a monetary refund from then. Before that date, the refund is the price minus the travel used, valued under condition 40.2, minus the fee. Check the date carefully if you are changing job or moving near the end of the year.` },
      { q: 'I was ill and could not hand my season back: can I still get a refund?', a: 'Yes. Condition 40.5 lets the refund be calculated from the day your illness started rather than the day you returned the ticket, provided a doctor’s certificate or other proof of the illness backs it. Ask the company that sold the season, and send the evidence with the ticket.' },
    ],
    body: (h) => `
<h2>The conditions, in a table</h2>
${h.table(['Rule', 'Detail'], [
  ['Where', 'the train company or retailer that sold the season (condition 40.1)'],
  ['Calculated from', 'the day you return the season (condition 40.2)'],
  ['Deducted', 'a return journey for each day since the start, priced as in the example of condition 40.2'],
  ['Fee', `up to ${h.gbp(h.N.seasonRefund.adminMax)} (condition 40.2)`],
  ['Weekly seasons', `at least ${h.num(h.N.seasonRefund.weeklyMinDaysLeft)} days left (condition 40.3.1)`],
  ['Seasons of 1 to 10 months', `at least ${h.num(h.N.seasonRefund.monthsMinDaysLeft)} days left (condition 40.3.2)`],
  ['Annual seasons', `no refund after ${h.N.seasonRefund.annualNoRefundAfter} (condition 40.4)`],
  ['Illness', 'refund from the start of the illness, with evidence (condition 40.5)'],
], `${h.src('nrcot', 'National Rail Conditions of Travel')}, Part G.`, ['l', 'l'])}

<h2>An estimate, step by step</h2>
<p>Take a monthly season of ${h.gbp(380)} returned after nine days on a route where a 7-day season costs ${h.gbp(105)} and a day return ${h.gbp(24)}. The deduction is ${h.gbp(105)} plus two day returns, ${h.gbp(48)}, so ${h.gbp(153)}. With the maximum fee of ${h.gbp(h.N.seasonRefund.adminMax)}, the refund is about ${h.gbp(380 - 153 - h.N.seasonRefund.adminMax)}. For an annual season the retailer works on the same principle over many weeks; the tool above gives an estimate, and the retailer's figure is the one that counts.</p>
<!--tool:mini:seasonrefund-->

<h2>Delay Repay before you hand it back</h2>
<p>Claims for delays during the season remain open for ${h.num(h.N.claimDays)} days after each journey, even if you return the season. Send them before or just after the refund, so nothing is lost. The tool under the citable block adds up identical delays on a season, using the divisor of the operator.</p>

<h2>Seasons and disruption</h2>
<p>A season is not refunded under condition 30 when trains are cancelled: the Conditions send season holders to each operator's own process. Days lost to disruption are handled through Delay Repay, sometimes as a delay of 120 minutes or more, as the ${h.a('train-strike-refund', 'strikes page')} describes for some operators. A long period of disruption that makes the season useless is a case for a complaint and, if needed, the ${h.a('rail-ombudsman', 'Rail Ombudsman')}.</p>

<h2>Changing instead of refunding</h2>
<p>If you move or change job, condition 41 lets you exchange a season valid for a month or more, with at least seven days left, for one covering another journey or class. You pay only the price difference for the days remaining, or get a refund of it if the new journey is cheaper, and no administration charge is taken. The new season starts the day after the old one is handed in and ends on the same date. This often loses less than a refund followed by a new purchase.</p>

<h2>Before handing it back</h2>
<p>Count the days remaining: a weekly season needs ${h.num(h.N.seasonRefund.weeklyMinDaysLeft)} and a monthly at least ${h.num(h.N.seasonRefund.monthsMinDaysLeft)} for any money to come back. Check the price of a 7-day season and a day return on your route, so you can follow the retailer's arithmetic. And file every pending Delay Repay claim first.</p>
<p>Then hand the season back as early as you can: each extra day costs another return journey in the deduction.</p>`,
  },
});
