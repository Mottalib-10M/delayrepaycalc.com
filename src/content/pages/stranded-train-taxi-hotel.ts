import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'stranded-train-taxi-hotel',
  group: 'disruption',
  order: 24,
  tool: { kind: 'mini:losses', props: { op: 'transpennine-express', price: 42, min: 150, cost: 85 } },
  mini: { kind: 'mini:crossop', props: { h: 22, m: 5 } },
  related: ['consequential-losses-train-delay', 'train-cancelled-rights', 'missed-connection-compensation', 'rail-ombudsman'],
  sources: ['nrcot', 'gov_cancel'],
  demarche: true,
  en: {
    slug: 'stranded-by-train-taxi-hotel',
    nav: 'Stranded: taxi, hotel',
    card: 'Last train cancelled or a connection missed late at night: what the railway must arrange, taxis and hotels, refreshments, and the costs you can claim.',
    title: 'Stranded by a Train: Taxi, Hotel and Refreshments to Ask For',
    description: 'Stranded by a cancelled or late train? What train companies must try to arrange: another way home, a hotel if needed, refreshments after an hour, your receipts.',
    h1: 'Stranded by a train: taxi, hotel and refreshments',
    intro: 'Compare the ticket compensation with what the night cost you: the tool separates Delay Repay from the costs claimed apart.',
    resume: (h) => `When disruption leaves you unable to finish a trip on a valid ticket you are using, condition 28.2 of the National Rail Conditions of Travel expects the train companies, so far as they reasonably can, to arrange another way to reach your destination or, if necessary, overnight accommodation. In practice that means a replacement road vehicle, a taxi booked by staff or a hotel room, arranged by the railway and paid by it. Once the delay passes ${h.num(h.N.laterDateDelay)} minutes, condition 28.6 adds that the operator can, in some cases, hand out food and drink in reasonable relation to the wait. The key word is provide: ask staff at the station or on the train before paying yourself. Costs you pay on your own initiative, a taxi or a hotel booked without asking, are not covered by Delay Repay, which is capped at the price of the ticket. You can still claim them from the operator as a separate request, with receipts, and the operator decides at its discretion; your rights under the Consumer Rights Act 2015 remain.`,
    faqs: (h) => [
      { q: 'Will the train company pay for my taxi if the last train is cancelled?', a: 'It should try to get you to your destination when the disruption stops a journey your ticket covers, and staff often book taxis or road vehicles for that. A taxi arranged by the railway costs you nothing. A taxi you book yourself without asking is refunded only at the company’s discretion, so ask staff first, and if nobody is available, keep the receipt and a note of the time.' },
      { q: 'Do I get a hotel if I am stranded overnight by a train cancellation?', a: 'The Conditions of Travel say a train company will, where it reasonably can and if necessary, provide overnight accommodation when disruption stops you completing your journey. That depends on what is possible at that hour and place. Ask staff to arrange it. If you must book yourself, choose a reasonable room near the station and keep the receipt for a claim.' },
      { q: 'Am I entitled to food and drink when my train is delayed?', a: `Condition 28.6 says that once the delay passes ${h.num(h.N.laterDateDelay)} minutes, the operator can, in some cases, hand out food and drink, where there is some on board or at the station or it can reasonably be supplied, in proportion to the wait. It is not an automatic right to reimbursement of a meal you bought; ask on board or at the station.` },
    ],
    body: (h) => `
<h2>What to ask for, in order</h2>
<ol>
<li><strong>Another train.</strong> One of the ${h.num(h.N.alternativeTrains)} trains before or after with the same operator, or since ${h.date(h.N.crossOperatorFrom)}, a participating operator's train within ${h.num(h.N.crossOperatorWindowHours)} hours if yours was cancelled. The tool under the citable block gives that window.</li>
<li><strong>Another way to your destination.</strong> A road vehicle or taxi arranged by the railway, under condition 28.2.</li>
<li><strong>A room for the night,</strong> if nothing else is possible, under the same condition.</li>
<li><strong>Refreshments</strong> after ${h.num(h.N.laterDateDelay)} minutes of delay, where the company provides them (condition 28.6).</li>
</ol>
<p>Ask the staff at the station, the guard on the train or the operator's assistance line. Note the name of the person you spoke to and the time: if no help comes and you have to pay, that note supports your claim.</p>

<h2>When you pay yourself</h2>
<p>Sometimes there is nobody to ask. Then act reasonably: the cheapest practical way home, a modest hotel near the station, and receipts for everything. Delay Repay, under the industry arrangements of condition 32.2 of the ${h.src('nrcot', 'Conditions of Travel')}, is limited to the price of your ticket; other losses are considered only in exceptional circumstances, at the operator's discretion, through a written request. Your statutory rights are not affected, so a cost that was a foreseeable result of a service not performed with reasonable care and skill can be claimed under the Consumer Rights Act, up to the courts if needed.</p>
<!--tool:mini:losses-->

<h2>Writing the request</h2>
<p>Send it to the operator whose disruption stranded you, separate from the Delay Repay claim, with:</p>
<ul>
<li>the journey, the ticket and the Delay Repay claim reference;</li>
<li>what happened and when, including who you asked for help and the answer;</li>
<li>each cost, with its receipt, and why it was needed;</li>
<li>the amount you ask for.</li>
</ul>
<p>If the operator refuses or does not reply within ${h.num(h.OMB.afterWorkingDays)} working days, the ${h.a('rail-ombudsman', 'Rail Ombudsman')} can look at a claim of up to ${h.gbp(h.OMB.maxClaim)}, unless it is a business loss.</p>

<h2>A late-night example</h2>
<p>A passenger holds a single of ${h.gbp(42)} and reaches the change station at 22:05 after the last connection has gone, arriving home by the first train the next morning, more than ${h.num(150)} minutes late. Delay Repay with ${h.op('transpennine-express').name} pays ${h.gbp(h.pay('transpennine-express', 'single', 42, 150))}, the full fare. A hotel of ${h.gbp(85)} booked by staff costs nothing; the same hotel booked alone becomes a separate request, decided by the operator, which the ${h.a('consequential-losses-train-delay', 'consequential losses page')} helps to prepare.</p>

<h2>Travelling with reduced mobility</h2>
<p>Passengers who booked assistance should tell staff at once when disruption strands them, so that any alternative transport offered is accessible. The duty in condition 28.2 to provide another way to the destination applies to every passenger whose journey is stopped, and the ${h.a('rail-ombudsman', 'Rail Ombudsman')} covers complaints about passenger assistance. Keep the booking reference of the assistance with your other evidence, together with the names of the staff you dealt with, the times and any written message from the operator.</p>`,
  },
});
