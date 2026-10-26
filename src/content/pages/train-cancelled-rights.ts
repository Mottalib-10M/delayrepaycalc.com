import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'train-cancelled-rights',
  group: 'disruption',
  order: 21,
  tool: { kind: 'mini:crossop' },
  mini: { kind: 'mini:refund' },
  related: ['cancelled-train-refund', 'missed-connection-compensation', 'stranded-train-taxi-hotel', 'delay-repay-advance-tickets'],
  sources: ['gov_cancel', 'nrcot'],
  demarche: true,
  en: {
    slug: 'train-cancelled-what-are-my-rights',
    nav: 'Train cancelled',
    card: 'Your options the moment a train is cancelled: other trains of the same company, another operator within two hours, a later day, a refund or compensation.',
    title: 'Train Cancelled: Your Rights, Other Trains and Compensation',
    description: 'Train cancelled in Great Britain? Take another operator’s train within 2 hours, a train before or after, travel another day, or get a full refund. Your options.',
    h1: 'Train cancelled: your rights and your options',
    intro: 'Enter the time of the cancelled train: the tool gives the window in which another operator’s train can take your ticket.',
    resume: (h) => `When your train is cancelled in Great Britain, you have four options, and you choose. You can travel on another train: the National Rail Conditions of Travel normally let you use one of the ${h.num(h.N.alternativeTrains)} trains before or after the cancelled one with the same operator, and since ${h.date(h.N.crossOperatorFrom)} passengers of ${h.num(h.N.crossOperatorOperators.length)} participating operators can also board another participating company's train leaving within ${h.num(h.N.crossOperatorWindowHours)} hours before or after it, on a direct or reasonable route, by showing their original ticket. If you are likely to be more than ${h.num(h.N.laterDateDelay)} minutes late, you can use the ticket on a later date with comparable restrictions. If you decide not to travel at all, the unused ticket is refunded in full with no fee. And if you travel and arrive late, Delay Repay applies, counted from the planned arrival of the train you meant to take. ${h.N.crossOperatorLater.join(', ')} will join the cross-operator scheme later. The tool above gives the two-hour window for any departure time.`,
    faqs: (h) => [
      { q: 'Can I get on any train if mine is cancelled?', a: `Not any train. With the same operator, the Conditions of Travel normally allow the ${h.num(h.N.alternativeTrains)} trains before or after the cancelled one. With another operator, the train must belong to a company taking part in the cross-operator scheme and leave within ${h.num(h.N.crossOperatorWindowHours)} hours of your cancelled service, on a direct or reasonable route. Staff can also authorise other trains during major disruption; ask them before boarding.` },
      { q: 'Do I need a new ticket to use another operator after a cancellation?', a: 'No. Under the scheme in force since September 2026, you show your original ticket to the staff on the new train as proof of purchase. There is no new ticket to download. Keep the original ticket and note the times, because a Delay Repay claim for the late arrival will need them.' },
      { q: 'My train was cancelled the day before: am I still covered?', a: 'If the cancellation was decided after you bought your ticket, the options are the same: travel on another train, travel another day, or a full refund if you decide not to go. What changes is how the delay is measured: if a replacement timetable is in force on the day, compensation is based on it, not on the original timetable.' },
    ],
    body: (h) => `
<h2>Option 1: another train</h2>
${h.table(['Rule', 'Which trains', 'Source'], [
  ['Same operator', `${h.num(h.N.alternativeTrains)} trains before or after the cancelled one; another option if trains are infrequent`, h.src('nrcot', 'Conditions of Travel, 28.3')],
  ['Other operator', `a participating operator's train within ${h.num(h.N.crossOperatorWindowHours)} hours before or after, direct or reasonable route`, h.src('gov_cancel', 'DfT, from 20 September 2026')],
  ['Major disruption', 'what staff and the operator announce (ticket acceptance)', 'station and operator notices'],
], undefined, ['l', 'l', 'l'])}
<p>The operators taking part in the cross-operator scheme are ${h.N.crossOperatorOperators.join(', ')}. ${h.N.crossOperatorLater.join(', ')} will join later.</p>

<h2>Option 2: travel another day</h2>
<p>Condition 28.4 of the ${h.src('nrcot', 'Conditions of Travel')} lets you use your ticket on a later date when your train is likely to be more than ${h.num(h.N.laterDateDelay)} minutes late, subject to comparable restrictions on the ticket. For an Advance ticket, which is tied to a train, the operator issues a replacement; its website or staff tell you how. You then claim no delay for that journey, since you chose another day.</p>

<h2>Option 3: a full refund</h2>
<p>If you give up the trip because the train is cancelled, delayed or rescheduled, or your reservation cannot be honoured, condition 30 gives a full refund of the unused ticket, without an administration fee, from the retailer or operator that sold it. The same applies if you set off, could not complete the journey and went back to your starting point. You must notify the claim within ${h.num(h.N.refundNotifyDays)} days of the day you meant to travel, and the refund is paid within ${h.num(h.N.payWithinDays)} days of being agreed. The ${h.a('cancelled-train-refund', 'refund page')} has the details.</p>
<!--tool:mini:refund-->

<h2>Option 4: travel and claim Delay Repay</h2>
<p>If you travel on a later train and arrive late, the delay is measured from the planned arrival of the train you intended to catch to your real arrival, using the timetable in force on the day. A cancellation that makes you 45 minutes late on a ${h.gbp(30)} single with ${h.op('northern').name} is worth ${h.gbp(h.pay('northern', 'single', 30, 45))}. If the next train is an hour later, the claim reaches the 60-minute band: ${h.gbp(h.pay('northern', 'single', 30, 60))}.</p>

<h2>If you are stranded</h2>
<p>When disruption stops you completing a journey for which your ticket is valid, condition 28.2 expects the train companies, so far as they reasonably can, to arrange another way to reach your destination or, if necessary, overnight accommodation. After ${h.num(h.N.laterDateDelay)} minutes of delay, some companies provide refreshments (condition 28.6). Ask staff before paying for a taxi or a hotel yourself, and keep receipts; our ${h.a('stranded-train-taxi-hotel', 'page on stranded passengers')} covers what to ask for.</p>

<h2>Before you leave the station</h2>
<p>Ask staff which trains accept your ticket today, and photograph the departure board showing the cancellation: it supports any later claim. If you board another operator's train under the cross-operator scheme, keep your original ticket ready to show on board. Note the time you finally arrive: it is the basis of the Delay Repay claim, which our ${h.a('how-to-claim-delay-repay', 'claim guide')} covers.</p>`,
  },
});
