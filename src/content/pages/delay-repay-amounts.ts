import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'delay-repay-amounts',
  group: 'claim',
  order: 2,
  tool: { kind: 'mini:bands', props: { op: 'lner', price: 72 } },
  mini: { kind: 'mini:dr15' },
  related: ['delay-repay-15-minutes', 'delay-repay-return-ticket', 'season-ticket-delay-repay', 'train-delay-compensation'],
  sources: ['nr_comp', 'nrcot'],
  en: {
    slug: 'how-much-is-delay-repay',
    nav: 'How much you get',
    card: 'The share of your fare each operator pays at 15, 30, 60 and 120 minutes late, side by side, with the amount on your own fare.',
    title: 'Delay Repay Amounts: How Much Each Train Company Pays',
    description: 'Delay Repay amounts for every train company in Great Britain: the share of a single or return paid at 15, 30, 60 and 120 minutes late, on your own fare.',
    h1: 'How much Delay Repay pays, operator by operator',
    intro: 'Choose an operator and type the fare: every band of its scheme is turned into pounds, from the first minute that pays to the full refund.',
    resume: (h) => `How much Delay Repay pays depends on three facts: the operator that ran the late train, the type of ticket and the band of minutes your arrival falls in. Most companies in Great Britain run Delay Repay 15, which pays 25% of a single fare from 15 minutes late, 50% from 30 minutes and 100% from 60 minutes. On a return, each leg is worth half, so the same delays pay 12.5%, 25% and 50% of the return fare per late leg, and a delay of two hours or more on one leg refunds the whole return. A few operators start at 30 minutes and use their own steps. Whatever the scheme, the National Rail Conditions of Travel guarantee at least ${h.pc(h.N.minPct)} of the price of the delayed journey once you are ${h.num(h.N.minDelay)} minutes late. The table below sets every operator's bands side by side, read from each company's published terms, and the tool above applies one of them to the fare you type.`,
    faqs: (h) => [
      { q: 'Is Delay Repay worked out on the price I paid or the full fare?', a: 'On the price you paid. A ticket bought with a railcard, an Advance fare or a fare reduced by a promotion is compensated on what left your account, not on the full Anytime fare for the route. That is why two passengers on the same late train can get very different amounts.' },
      { q: 'Does a delay of 59 minutes pay the same as 30 minutes?', a: 'Yes, within the same band the amount does not change: 30 and 59 minutes late both pay the 30-minute share. What counts is the band your arrival falls in, measured in whole minutes against the timetable of the day. A few minutes can move you into the next band, so note the real arrival time on the station screen or in a journey app.' },
      { q: 'Are Delay Repay amounts rounded?', a: 'The calculator shows the amount to the penny, as the share times the price. A 25% claim on a fare of £13.90 comes to £3.475, so the payment will be £3.47 or £3.48 depending on how the operator rounds. The confirmation from the operator states the amount it worked out; if it differs by more than a penny, compare the band it used with yours.' },
    ],
    body: (h) => `
<h2>Every operator, every band</h2>
<p>The table gives the share of the price paid on a single ticket at each common delay, for each operator. It is generated from the same data as the calculator. Where a cell shows 0%, that operator pays nothing at that delay under its own scheme.</p>
${h.table(['Operator', 'Scheme', '15 min', '30 min', '60 min', '120 min'], h.byName(h.OPS).map((o) => [h.a(`op-${o.id}`, o.name), o.scheme, h.share(h.shareAt(o.id, 15)), h.share(h.shareAt(o.id, 30)), h.share(h.shareAt(o.id, 60)), h.share(h.shareAt(o.id, 120))]), `Share of a single fare. Each scheme read on the operator's Passenger's Charter or Delay Repay terms; the date is on each operator's page. List of schemes: ${h.src('nr_comp', 'National Rail Enquiries')}.`, ['l', 'l', 'r', 'r', 'r', 'r'])}

<h2>Returns pay per leg</h2>
<p>A return ticket covers two journeys, so each journey is valued at half the return price. With a Delay Repay 15 operator, a return bought for ${h.gbp(80)} pays ${h.gbp(h.pay('southern', 'return', 80, 20))} if the outward train is 20 minutes late, ${h.gbp(h.pay('southern', 'return', 80, 45))} at 45 minutes and ${h.gbp(h.pay('southern', 'return', 80, 75))} at 75 minutes. If both legs are late, the two amounts are added, up to the price of the ticket. The 120-minute band is where returns differ most: one leg two hours late pays ${h.gbp(h.pay('southern', 'return', 80, 125))}, the whole fare. Our ${h.a('delay-repay-return-ticket', 'return ticket page')} works through two late legs.</p>
<!--tool:mini:returnlegs-->

<h2>Season tickets are valued per journey</h2>
<p>A season ticket has no price per journey printed on it, so each operator converts the season price into the value of one journey or one day of travel. It divides the price by a fixed number, called a divisor, then applies the band shares to that value. A monthly season and an annual season on the same route do not give the same amount per delay, because the annual divisor assumes more journeys. The ${h.a('season-ticket-delay-repay', 'season ticket page')} lists the divisors.</p>

<h2>The national minimum, for operators that pay less</h2>
<p>Every scheme in the table pays at least what the ${h.src('nrcot', 'National Rail Conditions of Travel')} require from ${h.num(h.N.minDelay)} minutes: ${h.pc(h.N.minPct)} of the price of a single, or of the late portion of a return. Before 60 minutes, the operator's scheme alone decides. That is the main difference between operators: with a Delay Repay 15 company, a 20-minute delay on a ${h.gbp(30)} single pays ${h.gbp(h.pay('southern', 'single', 30, 20))}; with a company whose scheme starts later, the same delay pays nothing.</p>

<h2>Reading your amount</h2>
<ul>
<li><strong>Use the price paid.</strong> With a railcard, the base is the discounted fare.</li>
<li><strong>Count minutes at your destination.</strong> The band uses your arrival at the station on your ticket, against the timetable in force that day.</li>
<li><strong>Two singles are two tickets.</strong> If you bought two singles instead of a return, each is compensated as a single, on its own price.</li>
<li><strong>Split tickets</strong> are compensated on the tickets that covered the late part, which our ${h.a('split-ticketing', 'split ticketing page')} explains.</li>
</ul>
<p>An amount that looks low is worth checking against the table before you accept it. A claim decided on the wrong band can be reviewed: write back to the operator with your arrival time and ask which band was used. If it does not answer within ${h.num(h.OMB.afterWorkingDays)} working days, the ${h.a('rail-ombudsman', 'Rail Ombudsman')} can look at it.</p>`,
  },
});
