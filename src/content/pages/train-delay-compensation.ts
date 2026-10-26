import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'train-delay-compensation',
  group: 'claim',
  order: 1,
  tool: { kind: 'repay', props: { operator: 'avanti-west-coast', ticket: 'single', price: 64, delay: 42 } },
  mini: { kind: 'mini:minimum' },
  related: ['delay-repay-amounts', 'how-to-claim-delay-repay', 'delay-repay-time-limit', 'consequential-losses-train-delay', 'rail-ombudsman'],
  sources: ['nrcot', 'nr_comp', 'orr_4410', 'cra2015'],
  demarche: true,
  en: {
    slug: 'train-delay-compensation',
    nav: 'Train delay compensation',
    card: 'What a late train is worth in Great Britain: the national minimum, the Delay Repay bands of each operator and the rules every claim follows.',
    title: 'Train Delay Compensation: What You Get and How to Claim',
    description: 'Train delay compensation in Great Britain: the Delay Repay bands, the 60-minute national minimum, the 28-day limit and the amount for your ticket, worked out.',
    h1: 'Train delay compensation in Great Britain',
    intro: 'Pick the company that ran the late train, your ticket and the minutes late at your destination: the amount, the band and the last day to claim appear at once.',
    resume: (h) => `Train delay compensation in Great Britain is paid by the train company whose service made you late, under a scheme called Delay Repay that almost every operator now runs. It does not depend on the cause: a signal failure, bad weather or a trespasser on the line all count, because the scheme pays for the delay, not for a fault. The amount is a share of the price you paid, set by bands of minutes late at your destination: with most operators a single ticket earns 25% from 15 minutes, 50% from 30 minutes and the full fare from 60 minutes. Underneath every scheme sits the National Rail Conditions of Travel, version ${h.N.version}, in force since ${h.date(h.N.from)}: from ${h.num(h.N.minDelay)} minutes late, you are owed at least ${h.pc(h.N.minPct)} of the price of the delayed journey, whoever caused it. You claim from the operator, usually online, within ${h.num(h.N.claimDays)} days of the journey. The calculator above applies each operator's published bands to your fare.`,
    faqs: (h) => [
      { q: 'Do I get compensation if the delay was caused by bad weather?', a: `In most cases, yes. Delay Repay schemes pay for the minutes lost rather than for a fault. From ${h.num(h.N.minDelay)} minutes late, the Conditions of Travel make compensation due regardless of cause. Under that, condition 33.4 lets a company exclude delays caused entirely outside the rail industry's control, but only if its own charter says so, which the calculator notes for each operator.` },
      { q: 'Is delay compensation paid on the minutes late at my stop or at the final station?', a: 'At the station on your ticket where your journey ends. A train that left on time but reached your destination 35 minutes late is a 35-minute delay, even if it was later still at the end of its route. If you changed trains, it is your arrival at your own destination against the planned connection that counts.' },
      { q: 'Who pays when two companies ran my journey?', a: 'You make one claim, normally to the company whose train was late or cancelled and caused you to arrive late. If you are not sure, claim from the company that ran the last train or the one that sold the ticket: the industry passes claims between operators, and a claim to the wrong one is forwarded rather than refused.' },
      { q: 'Can I claim compensation as well as a refund?', a: `Not for the same journey. If the disruption made you give up the trip and you were refunded, there is nothing left to compensate. Compensation is for a journey you made and arrived late. The Conditions of Travel also say you cannot recover the same loss twice under different rules.` },
    ],
    body: (h) => `
<h2>The three layers of protection</h2>
<p>Passengers on the national network are covered by three sets of rules stacked on top of each other. Read from the bottom up, they explain why two people on the same late train can be offered different amounts.</p>
<ul>
<li><strong>Your consumer rights.</strong> A train ticket is a contract for a service. Under ${h.src('cra2015', 'section 49 of the Consumer Rights Act 2015')}, the service must be performed with reasonable care and skill. The Conditions of Travel point to this right and say compensation under it is assessed case by case.</li>
<li><strong>The national minimum.</strong> The ${h.src('nrcot', 'National Rail Conditions of Travel')} set a floor in condition 33: from ${h.num(h.N.minDelay)} minutes late, at least ${h.pc(h.N.minPct)} of the price of a single, or of the return portion that was late. It applies on every operator whatever the cause.</li>
<li><strong>The operator's own scheme.</strong> Each company publishes its Delay Repay terms in its Passenger's Charter. They pay more than the minimum and start earlier, at 15 or 30 minutes.</li>
</ul>

<h2>How the amount is set</h2>
<p>Three things decide the figure: the price you paid, the type of ticket, and the band your delay falls in. For a single, the share applies to the fare. For a return, it applies to the whole return fare but each leg counts for half, so a late outward leg alone pays half the single-ticket share. For a season ticket, the operator first divides the season price by a fixed number of journeys to get the value of one trip. The table shows the most common bands on a single fare of ${h.gbp(40)}.</p>
${h.table(['Minutes late', 'Share of a single', `On a ${h.gbp(40)} single`, 'Share of a return, per late leg'], h.bandRows('southern', 40), `Bands of ${h.op('southern').name}, a Delay Repay 15 operator. Each operator's own bands are on the ${h.a('delay-repay-amounts', 'amounts page')}.`, ['l', 'r', 'r', 'r'])}
<p>The 120-minute band matters mostly for returns: a two-hour delay on one leg gives back the whole return fare with most companies. Operators that start at 30 minutes, such as ${h.op('crosscountry').name}, use their own steps, which the calculator reads from their terms.</p>

<h2>What does not count</h2>
<p>Compensation is about the arrival time of a journey you made. A few cases fall outside it. If you chose to travel earlier to avoid announced disruption, there is no delay to measure. When a strike or engineering work changed the timetable in advance, condition 32 measures the delay against the timetable in force on the day of travel, not against the usual one; our ${h.a('train-strike-refund', 'page on strikes and planned disruption')} works through it. Delays under the threshold of the operator, 15 or 30 minutes, pay nothing, and the national minimum only starts at ${h.num(h.N.minDelay)} minutes.</p>
<!--tool:mini:timetable-->

<h2>From delay to money in four steps</h2>
<ol>
<li>Note your scheduled and actual arrival times at your destination, and keep the ticket or a photo of it.</li>
<li>Claim on the website or app of the operator that made you late, within ${h.num(h.N.claimDays)} days of the journey. Our ${h.a('delay-repay-time-limit', 'time limit page')} gives the exact date.</li>
<li>Choose how to be paid. The Conditions of Travel require at least one money option, such as a bank transfer or a refund to the card used, so you never have to accept vouchers.</li>
<li>If the answer is a refusal or a figure that looks wrong, ask the operator to review it, then take it to the ${h.a('rail-ombudsman', 'Rail Ombudsman')}, which is free.</li>
</ol>
<p>The Office of Rail and Road publishes how operators handle claims. Across Great Britain in ${h.ORR.lastYear.label}, ${h.pc(h.ORR.lastYear.ops['great-britain'].approvedPct, 1)} of closed claims were approved and ${h.pc(h.ORR.lastYear.ops['great-britain'].within20Pct, 1)} were closed within 20 working days (${h.src('orr_4410', 'ORR Table 4410')}).</p>

<h2>Costs beyond the ticket</h2>
<p>Delay Repay gives back part or all of the fare and nothing more. A missed flight, a lost hour of paid work or a taxi home are separate claims: the operator may pay some as a goodwill gesture, and the Consumer Rights Act lets you claim losses that were foreseeable, up to the courts if needed. Our ${h.a('consequential-losses-train-delay', 'consequential losses page')} explains what to keep and how to ask.</p>`,
  },
});
