import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'train-strike-refund',
  group: 'disruption',
  order: 23,
  tool: { kind: 'mini:timetable' },
  mini: { kind: 'mini:refund' },
  related: ['cancelled-train-refund', 'season-ticket-delay-repay', 'train-cancelled-rights', 'rail-ombudsman'],
  sources: ['nrcot', 'ombudsman'],
  demarche: true,
  en: {
    slug: 'train-strike-refund',
    nav: 'Strikes and engineering',
    card: 'Strike days, engineering work and emergency timetables: what is refunded, why delays count against the timetable of the day, and seasons.',
    title: 'Train Strike Refund: Strike Days, Engineering Work, Seasons',
    description: 'Train strike refund rules: a full refund if your train is cancelled or rescheduled, delays counted on the timetable of the day, and what season holders can get.',
    h1: 'Train strikes and planned disruption: refunds and compensation',
    intro: 'Type when your train was due in the timetable of the day and when it arrived: the tool shows the delay that counts and what it pays.',
    resume: (h) => `On a strike day, or when engineering work or forecast bad weather replaces the normal timetable, two rules decide what you get back. First, if the train you booked is cancelled or rescheduled after you bought the ticket and you decide not to travel, condition 30 of the national Conditions of Travel gives a full refund with no fee, whatever the type of ticket; you notify it within ${h.num(h.N.refundNotifyDays)} days of the day you meant to travel. Second, if you travel, Delay Repay is counted against the timetable in place on the day of travel, as shown in journey planners and on station screens, not against the usual timetable. A train that the strike timetable already showed arriving 30 minutes later than normal is not 30 minutes late; only minutes beyond the day's timetable count. Season ticket holders depend on their operator's terms: some, such as ${h.op('transport-for-wales').name}, accept Delay Repay claims for strike days, while TfL services exclude strikes from their delay refunds. The Rail Ombudsman does not look at complaints about strike action itself.`,
    faqs: (h) => [
      { q: 'Can I get my money back if I booked before a strike was announced?', a: `Yes, if your train is cancelled or its times changed after you bought the ticket and you decide not to travel. Condition 30 gives a full refund with no administration fee, including on Advance tickets. Tell the retailer within ${h.num(h.N.refundNotifyDays)} days of the day you meant to travel. You can often use the ticket on another day instead, if the operator announces it.` },
      { q: 'Is Delay Repay paid during a strike?', a: 'Yes, on the delay beyond the timetable in force that day. If the reduced timetable shows your train arriving at 09:40 and it arrives at 10:20, the delay is 40 minutes and pays the 30-minute band. If it arrives at 09:40, nothing is due, even though it is later than the usual timetable. Cancellations of trains in the strike timetable count like any other.' },
      { q: 'Do I get anything back on my season ticket for strike days?', a: 'It depends on the operator. Delay Repay pays for journeys made late, and a day at home is not a journey. Some operators accept claims for days a season could not be used because of industrial action, as Transport for Wales states for tickets bought from it. Others offer nothing beyond Delay Repay. Check the operator page, then its terms.' },
    ],
    body: (h) => `
<h2>The timetable of the day</h2>
<p>Condition 32.1 of the ${h.src('nrcot', 'Conditions of Travel')} counts the delay from the arrival planned by the timetable in force on your day of travel. Where a replacement timetable is in force, for planned engineering, urgent repairs or bad weather expected, compensation is based on that replacement timetable. Operators publish such changes as soon as they can, and the timetable becomes the one journey planners show.</p>
${h.table(['Normal arrival', 'Arrival in timetable of the day', 'Actual arrival', 'Delay that counts', `Single of £24, ${h.op('northern').name}`], [
  ['09:10', '09:10', '09:40', '30 min', h.gbp(h.pay('northern', 'single', 24, 30))],
  ['09:10', '09:40', '09:40', '0 min', h.gbp(h.pay('northern', 'single', 24, 0))],
  ['09:10', '09:40', '10:25', '45 min', h.gbp(h.pay('northern', 'single', 24, 45))],
  ['09:10', '09:40', '11:00', '80 min', h.gbp(h.pay('northern', 'single', 24, 80))],
], 'Worked examples. Delay = actual arrival minus arrival in the timetable of the day.', ['r', 'r', 'r', 'r', 'r'])}

<h2>Refunds when the strike changes your train</h2>
<p>A strike often cancels trains or moves them. If the train you meant to take is cancelled, delayed or rescheduled after you bought the ticket, and you decide not to travel, condition 30 gives a full refund of the unused ticket with no administration fee. This covers Advance tickets, which are otherwise non-refundable. Under condition 28.4, a train likely to be more than ${h.num(h.N.laterDateDelay)} minutes late also lets you use the ticket on a later date with comparable restrictions.</p>
<!--tool:mini:refund-->

<h2>Season tickets on strike days</h2>
<p>A season ticket holder who stays at home has made no late journey, so Delay Repay alone pays nothing. What happens next is up to each operator: ${h.op('transport-for-wales').name} states that season holders who bought from it can claim Delay Repay for days they could not travel because of industrial action; ${h.op('south-western-railway').name} asks season holders who abandon a disrupted journey to claim it as a delay of 120 minutes or more. Look at your operator's page and its terms before the ${h.num(h.N.claimDays)} days run out. A season you no longer need can be handed back under Part G of the Conditions, as the ${h.a('season-ticket-refund', 'season refund page')} explains.</p>

<h2>What the Ombudsman will not look at</h2>
<p>The ${h.src('ombudsman', 'Rail Ombudsman')} lists strike action among the subjects it cannot investigate, alongside public policy on how the railway is run. A dispute about how your claim was handled on a strike day, a refund refused or an amount paid on the wrong band, is about the operator's service and its commitments; whether that falls within its remit is for the Ombudsman to decide when you submit it. Complaints about the strike itself go to neither the operator's Delay Repay team nor the Ombudsman.</p>

<h2>London's own services</h2>
<p>The ${h.a('op-elizabeth-line', 'Elizabeth line')} and ${h.a('op-london-overground', 'London Overground')} follow Transport for London's refund rules, which exclude delays caused by strikes, planned works, weather and security alerts. National Rail operators running into London follow their own Delay Repay schemes on the same days.</p>

<h2>Check before you travel</h2>
<p>On a strike day, look up your train in a journey planner the evening before and on the morning itself: that is the timetable your delay will be measured against. If your train has gone from it, the refund or the later-date options above apply.</p>`,
  },
});
