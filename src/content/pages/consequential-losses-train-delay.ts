import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'consequential-losses-train-delay',
  group: 'disruption',
  order: 25,
  tool: { kind: 'mini:losses' },
  mini: { kind: 'mini:minimum', props: { op: 'gwr', price: 64, min: 95 } },
  related: ['stranded-train-taxi-hotel', 'rail-ombudsman', 'train-delay-compensation', 'delay-repay-rejected'],
  sources: ['nrcot', 'cra2015', 'ombudsman'],
  demarche: true,
  en: {
    slug: 'train-delay-consequential-losses',
    nav: 'Costs beyond the ticket',
    card: 'A missed flight, a lost shift or a non-refundable booking: what you can claim beyond Delay Repay, under the Consumer Rights Act, and how.',
    title: 'Train Delay Consequential Losses: Claiming Beyond the Fare',
    description: 'Train delay consequential losses: Delay Repay stops at the fare, but a missed flight or taxi can be claimed at the operator’s discretion or under consumer law.',
    h1: 'Claiming more than the ticket after a train delay',
    intro: 'Enter the ticket, the delay and what the delay cost you: the tool shows what Delay Repay covers and what must be claimed apart.',
    resume: (h) => `Consequential losses are the costs a train delay causes beyond the ticket: a missed flight, a non-refundable hotel or concert, a taxi, a lost half-day of paid work. Delay Repay does not cover them. Condition 32.2 of the National Rail Conditions of Travel caps claims under the industry arrangements at the price of your ticket or tickets, and says a train company may consider other losses only in exceptional circumstances, at its sole discretion, on a written request. That is not the end of your rights. The same condition keeps your statutory rights, and the Conditions point to section 49 of the Consumer Rights Act 2015: a service must be performed with reasonable care and skill. A loss that was a foreseeable result of a failure to do so can be claimed from the operator and, if refused, through the Rail Ombudsman for amounts up to ${h.gbp(h.OMB.maxClaim)} that are not business losses, or the small claims court. You cannot recover the same money twice: Delay Repay already paid is deducted.`,
    faqs: (h) => [
      { q: 'Can I claim for a missed flight caused by a late train?', a: 'Not through Delay Repay, which stops at the ticket price. You can write to the operator asking for a discretionary payment, with the flight booking, the new ticket and the timetable you relied on. Under consumer law the question is whether the loss was foreseeable and whether you left reasonable time. A tight plan with no margin weakens the claim.' },
      { q: 'Can I claim lost wages because my train was late?', a: 'You can ask, but expect resistance. The Conditions of Travel treat losses beyond the fare as discretionary, and the Rail Ombudsman does not take claims for business losses. A self-employed person’s lost booking is often seen as a business loss. Employees who lose pay can put the case to the operator with proof from the employer, and court is the last resort.' },
      { q: 'Should I accept Delay Repay if I also want to claim other losses?', a: 'Yes. Delay Repay is a separate scheme for the fare, and accepting it does not stop you asking for other losses. What you cannot do is recover the same money twice, so the amount already paid is taken into account. Mention the Delay Repay payment in your letter, with its reference, so the operator sees what is left.' },
    ],
    body: (h) => `
<h2>Three routes, from simplest to hardest</h2>
${h.table(['Route', 'What it covers', 'Limit', 'Decided by'], [
  ['Delay Repay', 'a share of the fare, by minutes late', 'the price of the ticket', 'the operator, by its published bands'],
  ['Discretionary payment', 'other losses, in exceptional cases', 'none set', 'the operator, at its discretion'],
  ['Consumer Rights Act 2015', 'foreseeable losses from a service not performed with reasonable care and skill', 'what the court or the Ombudsman awards', `Rail Ombudsman (up to ${h.gbp(h.OMB.maxClaim)}) or a court`],
], `Sources: ${h.src('nrcot', 'Conditions of Travel, conditions 32 and 35')}; ${h.src('cra2015', 'Consumer Rights Act 2015, section 49')}; ${h.src('ombudsman', 'Rail Ombudsman')}.`, ['l', 'l', 'l', 'l'])}

<h2>Building a claim that holds</h2>
<ul>
<li><strong>Show the link.</strong> The timetable you relied on, the delay, and why the delay caused the loss: the flight left, the event started, the shift began.</li>
<li><strong>Show you were reasonable.</strong> A journey planned with a sensible margin, an attempt to find another train, help asked from staff.</li>
<li><strong>Show the amount.</strong> Receipts, booking confirmations, a payslip or an employer's letter. Deduct anything refunded elsewhere, such as travel insurance.</li>
<li><strong>Keep it proportionate.</strong> A cheap alternative taken promptly is easier to recover than an expensive one.</li>
</ul>
<!--tool:mini:minimum-->

<h2>Sending it</h2>
<p>Write to the operator responsible for the delay, separately from the Delay Repay claim. Condition 32.2 asks for a written request to the company's address, which National Rail Enquiries lists. Set out the facts, the costs and the amount, and ask for a final response if the answer is no. ${h.num(h.OMB.afterWorkingDays)} working days without an answer, or a final response you disagree with, lets you go to the ${h.a('rail-ombudsman', 'Rail Ombudsman')} within ${h.num(h.OMB.withinMonths)} months.</p>

<h2>Small claims court</h2>
<p>If the Ombudsman cannot take the case, because it is a business loss or over ${h.gbp(h.OMB.maxClaim)}, or you do not accept its decision, the courts remain. For modest sums, the small claims track of the county court in England and Wales, and the simple procedure in Scotland, are designed for people without lawyers, but they involve fees and time. Weigh the amount against the effort, and keep the correspondence with the operator: it is the core of the file.</p>

<h2>Travel insurance and cards</h2>
<p>Before chasing the operator, check whether travel insurance or a card benefit covers missed departures. Some policies cover a missed departure caused by a public transport failure; read their conditions. An insurer that pays may then deduct what the operator pays, and the operator will deduct what you have already recovered: the same money is never paid twice.</p>

<h2>A worked example</h2>
<p>A passenger pays ${h.gbp(64)} for a single to an airport station with ${h.op('gwr').name}; the train arrives 95 minutes late and the flight is missed, with a new flight costing ${h.gbp(180)}. Delay Repay pays ${h.gbp(h.pay('gwr', 'single', 64, 95))}, the full fare. The ${h.gbp(180)} is a separate claim: the passenger shows the booking, the planned arrival leaving a reasonable margin, and the new ticket. The operator may offer something as a gesture; if not, the Ombudsman can consider it, since it is not a business loss and is under ${h.gbp(h.OMB.maxClaim)}.</p>`,
  },
});
