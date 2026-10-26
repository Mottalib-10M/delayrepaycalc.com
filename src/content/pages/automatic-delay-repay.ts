import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'automatic-delay-repay',
  group: 'claim',
  order: 9,
  tool: { kind: 'repay', props: { operator: 'transpennine-express', ticket: 'single', price: 33, delay: 47 } },
  mini: { kind: 'mini:deadline', props: { op: 'transpennine-express' } },
  related: ['how-to-claim-delay-repay', 'delay-repay-advance-tickets', 'season-ticket-delay-repay', 'delay-repay-time-limit'],
  sources: ['nr_comp', 'nrcot'],
  en: {
    slug: 'automatic-delay-repay',
    nav: 'Automatic claims',
    card: 'Which operators start or pay the claim for you, for which tickets, and what you still need to do when the email arrives.',
    title: 'Automatic Delay Repay: Operators That Claim for You in 2026',
    description: 'Automatic Delay Repay in 2026: which train companies start or pay the claim for you, on which tickets and smartcards, and what you still do to get paid.',
    h1: 'Automatic Delay Repay: which operators claim for you',
    intro: 'Check the amount you should see in the operator’s email: pick the company, the ticket and the minutes late.',
    resume: (h) => `Automatic Delay Repay means the operator detects your late journey and starts the claim, or pays it, without a form. Of the ${h.num(h.OPS.length)} operators on this site, ${h.num(h.OPS.filter((o) => o.automatic).length)} offer some form of it, but always for limited tickets: Advance tickets bought on the operator's own website or app, or season tickets and pay-as-you-go journeys on its smartcard. In most cases you receive an email after the journey with a link, and you confirm the claim and the payment method in a few clicks; some smartcard schemes credit the money with no action at all. Tickets bought from another retailer, paper tickets and fares outside the scheme are not covered: for them you claim on the form within ${h.num(h.N.claimDays)} days, as usual. Several schemes require you to opt in, in your account, before the day of travel. An automatic email that never arrives does not extend the time limit, so if nothing has come within a few days, claim yourself.`,
    faqs: (h) => [
      { q: 'Why did I not get an automatic Delay Repay email?', a: `Usually because the ticket was not covered: bought from another retailer, a paper ticket, or a fare type outside the scheme. Some operators also require you to opt in in your account before travelling. The email can also land in a spam folder. Whatever the reason, the time limit still runs, so claim on the operator’s form within ${h.num(h.N.claimDays)} days of the journey.` },
      { q: 'Does automatic Delay Repay pay the same amount as a manual claim?', a: 'Yes. The automatic route uses the same bands and the same price paid; it only saves you the form. The calculator above shows what the email should offer. If the amount looks lower, check that the operator used your real arrival time: an automatic claim is based on its train running records for the train booked.' },
      { q: 'Can I switch an automatic claim to a bank transfer?', a: 'In most schemes the email lets you choose among the payment methods the operator offers, and the Conditions of Travel require at least one money option, such as a card refund or a bank transfer. Smartcard schemes that credit the card account automatically may pay in vouchers or account credit; read the scheme terms before you sign up.' },
    ],
    body: (h) => `
<h2>Who offers it, for which tickets</h2>
<p>The table lists what each operator says about automatic claims on the pages read. "No" means no automatic route is mentioned: claim on the form.</p>
${h.table(['Operator', 'Automatic claims'], h.byName(h.OPS).map((o) => [h.a(`op-${o.id}`, o.name), o.automatic ?? 'No']), `Read on each operator's Delay Repay terms; the date is on each operator page. List of schemes: ${h.src('nr_comp', 'National Rail Enquiries')}.`, ['l', 'l'])}

<h2>Three kinds of automatic claim</h2>
<ul>
<li><strong>Advance tickets bought direct.</strong> The most common. The operator knows the train you booked, checks its arrival and sends an email with a pre-filled claim. You confirm and choose a payment.</li>
<li><strong>Smartcards.</strong> Some commuter operators read the times you tap in and out and pay delays on your smartcard. c2c goes furthest: its smartcard pays small sums even for delays of a few minutes, under the 15-minute band.</li>
<li><strong>Travelcards on Oyster in London.</strong> For the Elizabeth line and London Overground, Transport for London asks holders of a Travelcard on Oyster to wait 48 hours before applying online, as some refunds are made automatically.</li>
</ul>

<h2>What it does not cover</h2>
<p>Automatic claims stop at the edge of the operator's own sales. A ticket bought from a third-party retailer, from another train company or from a ticket office is not known to the system in the same way, and paper tickets cannot be tracked. Journeys involving two operators are also a weak point: the email comes from the operator you booked with, and only for its own train. If the delay came from a connection on another company, claim that one yourself, as explained on the ${h.a('missed-connection-compensation', 'missed connection page')}.</p>
<!--tool:mini:orrstats-->

<h2>Setting it up</h2>
<ol>
<li>Create an account with the operator you travel with most, and buy Advance tickets there if you want the email.</li>
<li>Look for an opt-in setting for automatic or one-click Delay Repay, and tick it before the day of travel.</li>
<li>Register a smartcard season in the same account if the operator pays smartcard delays.</li>
<li>Add a payment method you prefer: a bank transfer or a card refund rather than vouchers.</li>
</ol>
<p>If the email has not arrived a few days after a late journey, do not wait: the ${h.num(h.N.claimDays)}-day limit of condition 33.1 of the ${h.src('nrcot', 'Conditions of Travel')} still applies. The ${h.a('how-to-claim-delay-repay', 'claim guide')} covers the form.</p>`,
  },
});
