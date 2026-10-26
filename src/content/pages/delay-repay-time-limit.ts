import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'delay-repay-time-limit',
  group: 'claim',
  order: 6,
  tool: { kind: 'mini:deadline' },
  mini: { kind: 'mini:refund' },
  related: ['how-to-claim-delay-repay', 'delay-repay-rejected', 'train-delay-compensation', 'delay-repay-return-ticket'],
  sources: ['nrcot', 'nr_comp'],
  demarche: true,
  en: {
    slug: 'delay-repay-time-limit',
    nav: '28-day time limit',
    card: 'The last day to claim for a late train, counted from the day of the journey, with each operator’s own limit and what to do after it.',
    title: 'Delay Repay Time Limit: The Last Day to Claim Your Journey',
    description: 'Delay Repay time limit: claim within 28 days of the journey under the Conditions of Travel. Get the last day for your trip and see which operators allow longer.',
    h1: 'Delay Repay time limit: the last day to claim',
    intro: 'Pick the operator and the day of the late journey: the tool gives the last day its form accepts, and the national rule behind it.',
    resume: (h) => `The Delay Repay time limit is ${h.num(h.N.claimDays)} days from the day you completed the journey. It is set by condition 33.1 of the national Conditions of Travel (version ${h.num(h.N.version)}), which every train company in Great Britain follows, and it can only be extended by the operator itself. A journey made on ${h.date('2026-11-02')} can therefore be claimed until ${h.date('2026-11-30')}. The count runs in calendar days, weekends and bank holidays included, and starts again for each journey: on a return ticket, the outward and return legs each have their own ${h.num(h.N.claimDays)} days. ${h.OPS.some((o) => o.deadlineDays > h.N.claimDays) ? `A few operators accept claims for longer: ${h.byName(h.OPS.filter((o) => o.deadlineDays > h.N.claimDays)).map((o) => `${o.name} (${h.num(o.deadlineDays)} days)`).join(', ')}.` : 'No operator on this site publishes a longer limit.'} Refunds for a journey you gave up because of disruption follow a separate rule: you must notify the company within ${h.num(h.N.refundNotifyDays)} days of the day you meant to travel.`,
    faqs: (h) => [
      { q: 'Can I still claim Delay Repay after 28 days?', a: 'Not as of right. The online forms reject journeys older than the limit, and the Conditions of Travel only allow the operator to extend it. If illness, a stay abroad or a late answer from the operator kept you from claiming, write to its customer relations team, explain why and attach the ticket. Some companies agree as a goodwill gesture; they are not obliged to.' },
      { q: 'Does the 28 days start on the day I bought the ticket?', a: 'No. It starts on the day you completed the late journey. A ticket bought in September for a journey on 10 November can be claimed until 8 December. For a season ticket, each delayed journey is a separate claim with its own deadline, which is why commuters often claim weekly rather than once at the end of the month.' },
      { q: 'What if my claim was lost by the operator?', a: 'Keep the reference number or confirmation email the form sends. If the operator says it never received the claim and the limit has now passed, the confirmation shows you claimed on time and the claim must be dealt with. Without one, a screenshot of the submitted form or a bank statement for the ticket helps. Ask for the claim to be reinstated in writing.' },
    ],
    body: (h) => `
<h2>Each operator's limit</h2>
<p>Every operator accepts claims for at least ${h.num(h.N.claimDays)} days. The table lists the limit each one publishes, with the last day for a journey made today.</p>
${h.table(['Operator', 'Time limit', 'Automatic claims'], h.byName(h.OPS).map((o) => [h.a(`op-${o.id}`, o.name), `${h.num(o.deadlineDays)} days`, o.automatic ?? 'no']), `Limits read on each operator's Delay Repay terms. National rule: ${h.src('nrcot', 'Conditions of Travel, condition 33.1')}.`, ['l', 'r', 'l'])}

<h2>Counting the days</h2>
<p>The count is simple: add ${h.num(h.N.claimDays)} days to the date of the journey. A journey on a Monday can be claimed until the Monday four weeks later. Nothing pauses the count, not a weekend, a bank holiday or a strike. Do not wait for the last evening: a site maintenance window or a slow upload of a ticket photo can make you miss it.</p>
<p>Two cases need care. On a <strong>return ticket</strong>, the outward and the return journeys are separate claims, each with its own date. On a <strong>season ticket</strong>, each delayed journey has its own limit too, even if you claim several in one go, so the oldest journey of a batch sets the date to beat.</p>
<!--tool:mini:deadline-->

<h2>Refunds have a different clock</h2>
<p>If the train you wanted was cancelled, delayed or rescheduled and you decided not to travel, you are owed a full refund without a fee under condition 30. That is not Delay Repay: you notify the train company or the retailer in writing within ${h.num(h.N.refundNotifyDays)} days of the day you meant to travel, and the money is due within ${h.num(h.N.payWithinDays)} days of the claim being agreed. For a ticket you no longer want for other reasons, the rule since ${h.date(h.N.refundBeforeValidFrom)} is stricter: the refund must be asked before the ticket becomes valid, by 23:59 the day before. The tool under the citable block above checks both cases.</p>

<h2>What to keep until the claim is paid</h2>
<ul>
<li>The ticket, or a clear photo of both sides, or the booking reference of an e-ticket.</li>
<li>The planned departure of the train you meant to catch, a field on every form.</li>
<li>Your real arrival time at your destination, noted on the day.</li>
<li>The claim reference and the confirmation email.</li>
</ul>
<p>Condition 33.1 lets you keep a used ticket for this purpose. If a ticket gate retains a paper ticket at the end of a journey, ask staff for it back or for a receipt before leaving the station, or photograph it before passing the gate.</p>

<h2>After the claim</h2>
<p>Once the operator agrees the claim, the money is due within ${h.num(h.N.payWithinDays)} days, with an industry target of one month for the whole process. If there is no answer after ${h.num(h.OMB.afterWorkingDays)} working days, or the answer is a refusal you disagree with, the ${h.a('rail-ombudsman', 'Rail Ombudsman')} can take the complaint. Its own limit is ${h.num(h.OMB.withinMonths)} months after the operator's final response. The ${h.a('delay-repay-rejected', 'rejected claims page')} lists the reasons operators give and how to answer them.</p>`,
  },
});
