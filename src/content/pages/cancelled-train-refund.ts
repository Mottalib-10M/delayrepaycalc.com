import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'cancelled-train-refund',
  group: 'disruption',
  order: 20,
  tool: { kind: 'mini:refund' },
  mini: { kind: 'mini:crossop' },
  related: ['train-cancelled-rights', 'train-strike-refund', 'season-ticket-refund', 'delay-repay-time-limit'],
  sources: ['nrcot', 'gov_cancel'],
  demarche: true,
  en: {
    slug: 'cancelled-train-refund',
    nav: 'Refunds',
    card: 'A full refund with no fee when a cancelled or delayed train makes you give up the trip, and the stricter rule since April 2026 for a change of plans.',
    title: 'Cancelled Train Refund: Full Refund, No Fee, Within 28 Days',
    description: 'Cancelled train refund: a full refund with no fee when you give up because of a cancellation or delay, claimed within 28 days, and the rule for changed plans.',
    h1: 'Refund for a cancelled or delayed train',
    intro: 'Say why you did not travel and type the price: the tool gives the refund, the fee and the last day to ask.',
    resume: (h) => `A cancelled train refund is due in full, with no administration fee, when you give up the trip because the train you meant to take is cancelled, delayed, rescheduled after you bought the ticket, or your reservation cannot be honoured. Condition 30 of the national Conditions of Travel (version ${h.num(h.N.version)}) sets the rule for every ticket except seasons, including Advance tickets that are otherwise non-refundable. It also applies if you set off, could not complete the journey because of the disruption and returned to your starting station. You claim from the retailer or train company that sold the ticket, stating the date, time and station you would have left from, and you must notify it within ${h.num(h.N.refundNotifyDays)} days of the day you intended to travel. The money is paid within ${h.num(h.N.payWithinDays)} days of the claim being agreed. A ticket you simply no longer want follows a stricter rule since ${h.date(h.N.refundBeforeValidFrom)}: the refund must be asked before the ticket becomes valid, with a fee of up to ${h.gbp(h.N.adminChargeMax)}.`,
    faqs: (h) => [
      { q: 'Is there a fee for a refund when my train is cancelled?', a: `No. Condition 30 rules out an administration fee when you give up because of a cancellation, a delay, a rescheduled train or a reservation that cannot be honoured. The fee of up to ${h.gbp(h.N.adminChargeMax)} per ticket applies only to refunds asked for other reasons, under condition 29, and not at all if a delay on any leg was the reason you could not complete the journey.` },
      { q: 'How do I get a refund for a ticket bought on an app?', a: 'From the retailer that sold it, usually through the booking in the app or on its website, where a refund button appears for eligible tickets. Choose the reason linked to disruption so that no fee is charged. A ticket bought at a ticket office just before travelling can be refunded there straight away, by the same means of payment.' },
      { q: 'Can I get a refund if I only travelled half of my journey?', a: 'If you set off, could not complete the journey because of a delay or cancellation and went back to your starting point, condition 30 gives a full refund of the tickets for that journey. If you continued to your destination and arrived late, there is no refund: you claim Delay Repay for the late arrival instead.' },
    ],
    body: (h) => `
<h2>Two kinds of refund</h2>
${h.table(['', 'Because of disruption (condition 30)', 'Change of plans (condition 29)'], [
  ['When', 'train cancelled, delayed or rescheduled; reservation not honoured', 'any other reason'],
  ['Deadline', `notify within ${h.num(h.N.refundNotifyDays)} days of the day you meant to travel`, 'before midnight on the eve of its first valid day'],
  ['Fee', 'none', `up to ${h.gbp(h.N.adminChargeMax)} per ticket (${h.gbp(h.N.adminChargeSeasonMax)} for a season)`],
  ['Advance tickets', 'refunded in full', 'not refundable unless their terms say so'],
  ['Payment', `within ${h.num(h.N.payWithinDays)} days of agreement`, 'within one month of the application'],
], `${h.src('nrcot', 'National Rail Conditions of Travel')}, version ${h.num(h.N.version)}, in force since ${h.date(h.N.from)}.`, ['l', 'l', 'l'])}

<h2>The rule since April 2026</h2>
<p>Since ${h.date(h.N.refundBeforeValidFrom)}, a refund for a change of plans must be requested before the ticket first becomes valid, that is by 23:59 on the day before the date on the ticket. After that, a refund is considered only in exceptional circumstances with evidence the ticket was not used, and no later than 28 days after it expires. The refund for disruption is not affected: if the train is cancelled or delayed and you give up, you are still entitled to the full amount. This is why it pays to choose the right reason when you ask.</p>
<!--tool:mini:refund-->

<h2>How the money comes back</h2>
<p>The refund follows the way you paid: a card is credited, cash is paid in cash or by another method you agree, rail travel vouchers come back as vouchers. A ticket bought at a ticket office just before the train can be refunded at once at that office. For a ticket bought online, the retailer's account or app has the refund request.</p>

<h2>Refund or Delay Repay?</h2>
<p>The two cannot be combined for the same journey. If you can still travel, compare: a delay of an hour or more pays the whole single with most operators, as much as a refund, and you reach your destination. If the trip has lost its point, the refund gives back the full price, including for a return you will not use at all. With another train available within ${h.num(h.N.crossOperatorWindowHours)} hours on a participating operator, as the ${h.a('train-cancelled-rights', 'cancellation page')} explains, travelling and claiming is often the better choice.</p>

<h2>Season tickets</h2>
<p>Seasons are outside condition 30. A day you cannot travel because of disruption is handled through the operator's Delay Repay terms, which sometimes treat an abandoned journey as a long delay, and a season you stop using is refunded under Part G of the Conditions, minus the travel already used and a fee of up to ${h.gbp(h.N.seasonRefund.adminMax)}. The ${h.a('season-ticket-refund', 'season refund page')} works out the figure.</p>

<h2>A refund step by step</h2>
<ol>
<li>Find who sold the ticket: the app, the website or the ticket office named on your booking.</li>
<li>Ask for a refund and choose the reason linked to the cancellation or delay, so that no fee is applied.</li>
<li>Give the date, the time and the station you would have left from, as condition 30.2 requires.</li>
<li>Keep the confirmation. If no money arrives within ${h.num(h.N.payWithinDays)} days of the agreement, write back quoting it.</li>
</ol>`,
  },
});
