import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'missed-connection-compensation',
  group: 'disruption',
  order: 22,
  tool: { kind: 'mini:connection' },
  mini: { kind: 'mini:bands', props: { op: 'crosscountry', price: 70 } },
  related: ['how-to-claim-delay-repay', 'train-cancelled-rights', 'delay-repay-15-minutes', 'split-ticketing'],
  sources: ['nrcot'],
  demarche: true,
  en: {
    slug: 'missed-connection-compensation',
    nav: 'Missed connections',
    card: 'A late first train that makes you miss the next one: how the delay is measured at your final station and which operator to claim from.',
    title: 'Missed Connection Compensation: Train Delays With a Change',
    description: 'Missed connection compensation: the delay counts at your final station, not at the change. Which train company to claim from and what a missed train is worth.',
    h1: 'Missed a connection because of a late train',
    intro: 'Type the delay of the first train and the wait for the next connection: the tool gives the delay at your destination and the compensation.',
    resume: (h) => `Missed connection compensation is worked out on your arrival at your final destination, not on the delay of the first train. A train that arrives 12 minutes late may cost you a connection that runs once an hour, so you reach your destination more than an hour late: that is the delay you claim, and on a single ticket it falls in the 60-minute band, which refunds the whole fare with most operators. The National Rail Conditions of Travel measure compensation by how late you reach your destination station against the timetable of the day, and that you can claim from any train company whose services you used, which forwards the claim to the company responsible. The operator that pays is the one whose late or cancelled train caused the missed connection. Under condition 9.4, a ticket valid only on booked trains stays valid, without penalty, on the next train of the same company when a delayed or cancelled connecting train makes you miss the booked one; keep it and the times, and claim within ${h.num(h.N.claimDays)} days of the journey.`,
    faqs: (h) => [
      { q: 'Which company pays when a late train makes me miss a connection with another operator?', a: 'The company whose train was late and caused the missed connection, even if the longer part of the journey was with the other operator. You can still send the claim to either company: condition 32.1 of the Conditions of Travel requires the one you contact to forward it to the company responsible. Its bands, 15 or 30 minutes, decide the amount.' },
      { q: 'Is a missed connection covered if I left too little time to change?', a: 'Condition 20 of the Conditions of Travel asks you to allow enough time to change trains, and says the journey plans of National Rail and train companies already allow sufficient time. A connection shown by a journey planner is therefore a valid plan, and missing it because of a delay counts. A tighter connection chosen against the planner is harder to defend.' },
      { q: 'Does a missed connection count on split tickets?', a: 'The delay is still measured at the end of the journey, and the tickets are valid as long as each train calls at the station where they change. Compensation follows the price of the tickets covering the delayed journey. If the late train was on one ticket and the missed connection on another, explain the whole journey in the claim and attach both.' },
    ],
    body: (h) => `
<h2>Measuring the delay</h2>
<p>Write down three times: the planned arrival at your final station, the time you actually arrived there, and the train you missed. The delay is the gap between the first two. The first train's own delay does not matter on its own: 12 minutes late can mean 72 minutes late at your destination, or zero if the connection waited.</p>
${h.table(['First train late', 'Wait for next connection', 'Late at destination', 'Single of £50, CrossCountry', 'Single of £50, Southern'], [
  ['8 min', '30 min', '38 min', h.gbp(h.pay('crosscountry', 'single', 50, 38)), h.gbp(h.pay('southern', 'single', 50, 38))],
  ['12 min', '60 min', '72 min', h.gbp(h.pay('crosscountry', 'single', 50, 72)), h.gbp(h.pay('southern', 'single', 50, 72))],
  ['20 min', '15 min', '35 min', h.gbp(h.pay('crosscountry', 'single', 50, 35)), h.gbp(h.pay('southern', 'single', 50, 35))],
  ['5 min', '120 min', '125 min', h.gbp(h.pay('crosscountry', 'single', 50, 125)), h.gbp(h.pay('southern', 'single', 50, 125))],
], 'Assuming the next connection runs on time. Bands of each operator, as read on its terms.', ['r', 'r', 'r', 'r', 'r'])}

<h2>Which operator to claim from</h2>
<p>The company responsible is the one whose train was late or cancelled and broke the chain. On a journey from a branch line to a main line, it is often the small operator's train that made you miss an intercity service. Its scheme then applies, even if the ticket was sold by the other company and most of the fare covers the long-distance leg. Condition 32.1 of the ${h.src('nrcot', 'Conditions of Travel')} spares you the guesswork: claim from any company whose trains you used and it forwards the claim.</p>
<!--tool:mini:connection-->

<h2>Your ticket on the next train</h2>
<p>When a delay makes you miss a connection, continue on the next suitable train to your destination and explain to staff on board. For an Advance ticket, which is tied to booked trains, condition 9.4 of the Conditions of Travel lets you take the next train of the company your ticket was valid with, at no extra cost, when a previous connecting train was delayed or cancelled. If the next train is with another company and your connecting train was cancelled rather than missed, the cross-operator rule of the ${h.a('train-cancelled-rights', 'cancellation page')} may also help.</p>

<h2>Long waits and the last train</h2>
<p>If the missed connection was the last one of the day, the Conditions say train companies will, where they reasonably can, arrange another way to reach your destination or, if necessary, overnight accommodation. Ask staff at the station first: arrangements made by the railway are paid by the railway. A taxi you book yourself may or may not be reimbursed, as the ${h.a('stranded-train-taxi-hotel', 'stranded passengers page')} explains.</p>

<h2>Claiming a journey with a change</h2>
<ul>
<li>Enter the journey from your first station to your final station, not just the late leg.</li>
<li>Give the scheduled departure of your first train and the planned arrival at the end.</li>
<li>Name the missed connection in the comments, with its time, and the train you finally took.</li>
<li>Attach every ticket used for the journey.</li>
</ul>
<p>The calculator at the top of the page uses the bands of the operator you choose for the late train.</p>`,
  },
});
