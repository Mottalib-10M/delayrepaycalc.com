import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'how-to-claim-delay-repay',
  group: 'claim',
  order: 5,
  tool: { kind: 'repay', props: { operator: 'northern', ticket: 'single', price: 21.5, delay: 33 } },
  mini: { kind: 'mini:deadline', props: { op: 'northern' } },
  related: ['delay-repay-time-limit', 'automatic-delay-repay', 'delay-repay-rejected', 'missed-connection-compensation'],
  sources: ['nrcot', 'nr_comp', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'how-to-claim-delay-repay',
    nav: 'How to claim',
    card: 'The claim step by step: which operator to claim from, what the form asks, the evidence that works and how you choose to be paid.',
    title: 'Delay Repay Claim: How to Claim Step by Step, With Evidence',
    description: 'Delay Repay claim step by step: which train company to claim from, what the form asks, the ticket evidence that works and how to be paid in money, not vouchers.',
    h1: 'How to claim Delay Repay, step by step',
    intro: 'Work out the amount first: the calculator shows what to expect, the last day to claim and a button to the form of the operator you choose.',
    resume: (h) => `To claim Delay Repay, you fill in a form on the website or app of the train company that ran the late train, within ${h.num(h.N.claimDays)} days of the journey. The form asks for the date, the stations, the scheduled departure of the train you meant to take, the minutes late at your destination, and a proof of the ticket: a photo of a paper ticket, the reference of an e-ticket or the smartcard number. You then choose how to be paid. Under condition 34 of the National Rail Conditions of Travel, at least one money option must be offered, such as a bank transfer, a refund to the card used or a cheque, so you never have to accept rail vouchers. If two operators ran your journey, you can send the claim to any company whose trains you used and it forwards the claim to the one responsible. Once the claim is agreed, payment is due within ${h.num(h.N.payWithinDays)} days. The calculator above estimates the amount and links to the form of the operator you pick.`,
    faqs: (h) => [
      { q: 'Do I need to keep my paper ticket to claim Delay Repay?', a: 'You need proof that you held a valid ticket for the whole journey. A paper ticket is the simplest: photograph both sides before a gate keeps it. Without the ticket, a receipt from the ticket machine or the booking confirmation with the price may be accepted, but the operator can ask for more. Mobile tickets and smartcards are checked from the retailer’s records.' },
      { q: 'Can I claim Delay Repay for someone else on my booking?', a: 'Yes, if you bought the tickets. Most forms let you add each passenger’s ticket, or ask you to claim once per ticket. Each ticket is compensated on its own price, so a railcard child ticket gets the share of its reduced fare.' },
      { q: 'How do I know which train I was supposed to catch?', a: 'Use the timetable of the day: the planned departure, from your starting station, of the train you meant to catch, as shown in the journey planner or on the station screens. If you arrived at the station after it had left, the next one counts. Delays are measured against the planned arrival of that train at your destination.' },
      { q: 'How long does it take to receive Delay Repay?', a: `Operators aim to process claims within a month of receipt, and once a claim is agreed the money is due within ${h.num(h.N.payWithinDays)} days under the Conditions of Travel. The Office of Rail and Road publishes how many claims each operator closes within 20 working days. A refund to a card or a bank transfer usually arrives faster than a cheque.` },
    ],
    body: (h) => `
<h2>Step 1: find the operator to claim from</h2>
<p>Claim from the company whose train was late or cancelled. On a direct train, that is the company that ran it, shown on the ticket booking, the station screens or the train itself. On a journey with a change, it is the company that caused you to arrive late at your final station. Condition 32.1 adds a safety net: you can claim from any company whose trains you used and it must pass the claim to the one responsible. The ${h.a('missed-connection-compensation', 'missed connection page')} covers journeys with changes.</p>

<h2>Step 2: gather what the form asks</h2>
${h.table(['The form asks', 'Where to find it'], [
  ['Date and stations of the journey', 'your ticket or booking confirmation'],
  ['Scheduled departure of your train', 'the journey planner, for the date of travel'],
  ['Minutes late at your destination', 'the screens on arrival, or the train running record online'],
  ['Ticket type and price paid', 'the ticket, the receipt or the booking email'],
  ['Proof of ticket', 'photo of both sides, e-ticket reference or smartcard number'],
  ['Payment details', 'bank details, or the card used to buy the ticket'],
], 'What a typical Delay Repay form asks. Exact fields vary between operators.', ['l', 'l'])}
<p>For a season ticket, the form also asks for the start and end dates and the price, and often accepts several journeys at once.</p>

<h2>Step 3: choose how to be paid</h2>
<p>Condition 34.1 of the ${h.src('nrcot', 'Conditions of Travel')} lists the payment methods: cheque, bank transfer, refund to your debit or credit card, or rail travel vouchers. The first three are called money options, and every operator must offer at least one. Where the delay was the operator's fault, you can ask for the money back by the method you used to buy the ticket. Vouchers can be spent at any staffed ticket office on the national network, but cannot always be changed into cash.</p>
<p>The payment options of each operator, as read on its terms, are shown on its page and in the fact box above each operator's calculator.</p>

<h2>Step 4: send it and keep the reference</h2>
<p>Submit within ${h.num(h.N.claimDays)} days of the journey. The form returns a claim reference, often by email: keep it until you are paid. If the claim is agreed, the money is due within ${h.num(h.N.payWithinDays)} days. If it is refused, or the amount seems wrong, reply quoting the reference and ask which band and which arrival time the operator used.</p>
<!--tool:mini:deadline-->

<h2>Claims that go faster</h2>
<ul>
<li><strong>Claim each journey soon after it.</strong> Claims sent the same week are easier to check against the train records.</li>
<li><strong>Use the scheduled departure, not the time you arrived at the station.</strong> The operator looks up that train.</li>
<li><strong>Enter the price you paid,</strong> including the railcard discount. A claim that states the full fare is corrected down, and slows things.</li>
<li><strong>Register once.</strong> Most operators keep an account so the next claim takes a minute, and some pay automatically when the ticket was bought on their own site, as the ${h.a('automatic-delay-repay', 'automatic Delay Repay page')} explains.</li>
</ul>
<p>Across Great Britain, the ${h.src('orr_4410', 'Office of Rail and Road')} reports that ${h.pc(h.ORR.lastYear.ops['great-britain'].within20Pct, 1)} of claims closed in ${h.ORR.lastYear.label} were closed within 20 working days, and ${h.pc(h.ORR.lastYear.ops['great-britain'].approvedPct, 1)} were approved.</p>`,
  },
});
