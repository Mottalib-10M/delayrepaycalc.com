import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'delay-repay-rejected',
  group: 'claim',
  order: 10,
  tool: { kind: 'mini:orrstats', props: { op: 'northern' } },
  mini: { kind: 'mini:ombudsman' },
  related: ['rail-ombudsman', 'delay-repay-claims-by-operator', 'how-to-claim-delay-repay', 'delay-repay-time-limit'],
  sources: ['orr_4410', 'nrcot', 'ombudsman'],
  demarche: true,
  en: {
    slug: 'delay-repay-claim-rejected',
    nav: 'Claim rejected',
    card: 'Why Delay Repay claims are refused, how often each operator approves them, and how to ask for a review before going to the Rail Ombudsman.',
    title: 'Delay Repay Claim Rejected: Reasons and How to Challenge It',
    description: 'Delay Repay claim rejected? The usual reasons, how often each train company approves claims, how to ask for a review and when the Rail Ombudsman steps in.',
    h1: 'Delay Repay claim rejected: what to do',
    intro: 'Pick the operator that refused your claim: the tool shows how many claims it approved and how fast, from the official statistics.',
    resume: (h) => `A rejected Delay Repay claim is not the end of the road. Across Great Britain, ${h.pc(h.ORR.lastYear.ops['great-britain'].approvedPct, 1)} of the claims closed in ${h.ORR.lastYear.label} were approved, according to the Office of Rail and Road, so most refusals concern a minority of claims with a problem the operator could not resolve: a train that its records show as on time or less late than stated, a ticket it could not match, a journey older than ${h.num(h.N.claimDays)} days, or a claim already paid on the same ticket. Each of these can be answered. Reply to the operator, quote the claim reference, and give what was missing: the scheduled departure, your real arrival time, a clearer photo of the ticket or the reason you claimed late. If the operator does not change its answer, its final response, or ${h.num(h.OMB.afterWorkingDays)} working days without one, opens the way to the Rail Ombudsman, which is free, independent and can make decisions the operator must follow if you accept them.`,
    faqs: (h) => [
      { q: 'The operator says my train was on time: how do I prove it was late?', a: 'The operator checks its train running records for the train you named. Make sure you gave the scheduled departure of the train you actually caught, from your starting station, and the arrival at your own destination. A photo of the station screen, a screenshot of a live journey app, or a note made on the day are useful. Ask the operator which arrival time it recorded.' },
      { q: 'Can a Delay Repay claim be refused because I used the wrong form?', a: 'It should not be. Condition 32.1 of the Conditions of Travel lets you claim from any operator whose trains you used, and that operator forwards the claim to the one responsible. If a company refuses because the delay was caused by another operator, ask it to forward the claim, as the Conditions require, rather than starting again.' },
      { q: 'How many Delay Repay claims are rejected?', a: `In ${h.ORR.lastYear.label}, operators in Great Britain closed ${h.num(h.ORR.lastYear.ops['great-britain'].closed)} claims and approved ${h.pc(h.ORR.lastYear.ops['great-britain'].approvedPct, 1)} of them, according to the Office of Rail and Road. The rate varies widely between operators; the statistics page compares them. A refusal can still be reviewed, and the review often turns on the arrival time used.` },
    ],
    body: (h) => `
<h2>The usual reasons for a refusal</h2>
${h.table(['Reason given', 'What to send back'], [
  ['Train not late enough in our records', 'the train you caught, the arrival you saw, any photo or screenshot'],
  ['Ticket not valid or not readable', 'a clear photo of both sides, the booking reference, the receipt'],
  ['Claim outside the time limit', `the date of submission or the reason for the delay; ask for goodwill`],
  ['Already compensated', 'show that the two claims cover different journeys (outward and return)'],
  ['Delay caused by another operator', 'ask the company to forward the claim under condition 32.1'],
  ['Refund already given for this journey', 'nothing: a refund and compensation cannot both be paid'],
], 'Common reasons, and the answer the Conditions of Travel support.', ['l', 'l'])}

<h2>Approval rates by operator</h2>
<p>The Office of Rail and Road publishes, every quarter, how many claims each operator received, closed and approved, and how many it closed within 20 working days. The tool at the top of the page reads the figures for one operator; the ${h.a('delay-repay-claims-by-operator', 'statistics page')} sets them side by side. A low approval rate does not prove that an operator is unfair, since claims vary, but a refusal from an operator that approves most claims is worth a second look.</p>

<h2>Asking for a review</h2>
<ol>
<li>Answer the refusal in writing, through the operator's claim account or its customer relations team, quoting the reference.</li>
<li>State the facts in two lines: the date, the stations, the scheduled train, the minutes late at your destination, the ticket and its price.</li>
<li>Point to the rule: the operator's band for that delay, and the ${h.src('nrcot', 'Conditions of Travel')} minimum of ${h.pc(h.N.minPct)} from ${h.num(h.N.minDelay)} minutes regardless of fault.</li>
<li>Ask for a final response if the operator keeps its decision.</li>
</ol>
<!--tool:mini:minimum-->

<h2>Going to the Rail Ombudsman</h2>
<p>The ${h.src('ombudsman', 'Rail Ombudsman')} takes complaints about train operators in ${h.OMB.nations} once the operator has had its chance: after ${h.num(h.OMB.afterWorkingDays)} working days from your complaint, or sooner if you have its final response. You then have ${h.num(h.OMB.withinMonths)} months to bring the case. It costs nothing. It first tries mediation; if that fails, an Ombudsman decides, and the operator must comply if you accept within ${h.num(h.OMB.acceptWorkingDays)} working days. It does not deal with claims above ${h.gbp(h.OMB.maxClaim)}, business losses or complaints about strike action. Our ${h.a('rail-ombudsman', 'Rail Ombudsman page')} covers the steps.</p>

<h2>When the amount, not the decision, is wrong</h2>
<p>Partial payments are often a band question: the operator paid for 15 to 29 minutes, you arrived 31 minutes late. Compare the amount with the calculator for your operator and ticket. A season ticket claim paid on the wrong divisor, or a return paid as if both legs were one, are other common slips. A short message with the arithmetic usually settles it.</p>

<h2>Keeping a paper trail</h2>
<p>Every exchange with the operator may later be read by the Ombudsman, so keep it in writing: the claim form, the refusal, your reply and any final response. Messages through the operator's online account are fine; a phone call should be followed by a short email recalling what was said. Dates matter for the ${h.num(h.OMB.afterWorkingDays)} working days and the ${h.num(h.OMB.withinMonths)} months.</p>`,
  },
});
