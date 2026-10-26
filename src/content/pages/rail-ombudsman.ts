import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'rail-ombudsman',
  group: 'claim',
  order: 11,
  tool: { kind: 'mini:ombudsman' },
  mini: { kind: 'mini:losses' },
  related: ['delay-repay-rejected', 'consequential-losses-train-delay', 'delay-repay-claims-by-operator', 'train-strike-refund'],
  sources: ['ombudsman', 'nrcot'],
  demarche: true,
  en: {
    slug: 'rail-ombudsman',
    nav: 'Rail Ombudsman',
    card: 'When the Rail Ombudsman can take a complaint about a train company, what it can decide, its time limits and what it will not look at.',
    title: 'Rail Ombudsman: When and How to Take a Train Complaint There',
    description: 'Rail Ombudsman: free for passengers, from 40 working days after your complaint or a final response, within 12 months. What it covers, decides and refuses.',
    h1: 'Rail Ombudsman: taking a complaint further',
    intro: 'Enter the day the train company received your complaint: the tool counts the working days until the Ombudsman can take it.',
    resume: (h) => `The Rail Ombudsman is the free, independent service that settles complaints passengers could not resolve with a train company or station operator in ${h.OMB.nations}. You can go to it once the company has had ${h.num(h.OMB.afterWorkingDays)} working days to deal with your complaint, or earlier if it has sent you a final response, sometimes called a deadlock letter, that you are not happy with. Unless circumstances are exceptional, you must bring the case within ${h.num(h.OMB.withinMonths)} months of that final response. The Ombudsman first tries mediation; if no agreement is reached, an Ombudsman decides. The decision binds the company if you accept it within ${h.num(h.OMB.acceptWorkingDays)} working days, and the company then has ${h.num(h.OMB.complyWorkingDays)} working days to comply, or ${h.num(h.OMB.refundWorkingDays)} for a refund. It does not bind you: you can refuse and go to court. It aims to complete cases within ${h.num(h.OMB.aimWorkingDays)} working days, and it will not take claims above ${h.gbp(h.OMB.maxClaim)}, business losses or complaints about strike action.`,
    faqs: (h) => [
      { q: 'Does it cost anything to use the Rail Ombudsman?', a: 'No. The service is free for passengers. It is funded by the rail industry it oversees, like most ombudsman schemes, and it states that this funding does not affect its independence. You do not need a lawyer or a representative: you fill in a form online, by phone or on paper and send the evidence you have.' },
      { q: 'Can the Rail Ombudsman make a train company pay more Delay Repay?', a: 'It can decide that the company did not apply its own commitments, such as its Passenger’s Charter bands, or your consumer rights, and order it to put things right, which can include a payment. It looks at the quality of service against those commitments. It cannot change industry policy, such as the bands an operator chose.' },
      { q: 'What evidence should I send to the Rail Ombudsman?', a: 'Your ticket or booking, the claim and complaint references, the replies from the operator including any final response, notes of times, and photos or screenshots of screens or journey apps. Receipts for extra costs such as a taxi help if you claim them. The Ombudsman asks the operator for its side, including train records and its charter.' },
    ],
    body: (h) => `
<h2>Before the Ombudsman: the company's own process</h2>
<p>The Ombudsman only steps in after the train company has had a fair chance. Start with the company's own complaints process, in writing, quoting your claim reference. Condition 35 of the ${h.src('nrcot', 'National Rail Conditions of Travel')} points passengers who are not satisfied with the outcome of a claim to the Rail Ombudsman. Keep everything the company sends you, especially a message saying it will not change its position: that is the final response that opens the way immediately.</p>
${h.table(['Step', 'Time limit'], [
  ['Delay Repay claim to the operator', `${h.num(h.N.claimDays)} days after the journey`],
  ['Operator pays an agreed claim', `${h.num(h.N.payWithinDays)} days after agreeing it`],
  ['Ombudsman can take the complaint', `${h.num(h.OMB.afterWorkingDays)} working days after your complaint, or at the final response`],
  ['Bring the case to the Ombudsman', `${h.num(h.OMB.withinMonths)} months after the final response`],
  ['Operator answers the Ombudsman', `${h.num(h.OMB.providerReplyWorkingDays)} working days expected`],
  ['Accept a decision', `${h.num(h.OMB.acceptWorkingDays)} working days`],
  ['Operator complies', `${h.num(h.OMB.complyWorkingDays)} working days, ${h.num(h.OMB.refundWorkingDays)} for a refund`],
], `Sources: ${h.src('nrcot', 'Conditions of Travel')}, ${h.src('ombudsman', 'Rail Ombudsman FAQ')}.`, ['l', 'l'])}

<h2>What it covers and what it does not</h2>
<p>The Ombudsman looks at train delays and cancellations, refunds and ticket sales, customer service, overcrowding and other safety issues, information about journeys and engineering work, station facilities, on-train services, and assistance for disabled passengers. It judges the service against what the company committed to and your consumer rights.</p>
<p>It leaves aside transport policy and the running of the industry, strikes, the effect of a line on nearby homes, penalty fares and parking fines, issues outside the company's control, cases already decided by a court, an offer you have already accepted, business losses, or claims above ${h.gbp(h.OMB.maxClaim)}. When a complaint is outside its remit, it says why and may pass it to Transport Focus or London TravelWatch.</p>

<h2>Mediation, then a decision</h2>
<p>Stage one is mediation: the Ombudsman reviews the evidence and tries to get you and the company to agree, by phone, email or letter. Stage two is adjudication: an Ombudsman decides on the evidence. The decision is binding on the company if you accept it, and never binding on you. Once the case is decided it is closed, but you keep the right to go to court.</p>
<!--tool:mini:ombudsman-->

<h2>Working days, counted</h2>
<p>The tool counts working days from the day the operator received your complaint, skipping weekends and the bank holidays of England and Wales published on GOV.UK. Scotland has different bank holidays, which can shift the date by a day or two there. If the operator replies with a final response before the date, you do not need to wait.</p>

<h2>Claims beyond the ticket</h2>
<p>Delay Repay is capped at the price of the ticket under the industry arrangements. For other losses, a missed flight or a hotel night, the operator decides at its discretion, and your rights under the Consumer Rights Act remain. The Ombudsman can look at such a complaint if it is under ${h.gbp(h.OMB.maxClaim)} and not a business loss. Our ${h.a('consequential-losses-train-delay', 'page on consequential losses')} explains how to build that claim.</p>`,
  },
});
