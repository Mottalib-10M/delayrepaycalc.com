import { definePage } from '../../lib/guide-types';

const ID = 'crosscountry';

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 105,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 58, delay: 38 } },
  mini: { kind: 'mini:orrstats', props: { op: ID } },
  related: ['delay-repay-15-minutes', 'how-to-claim-delay-repay', 'delay-repay-time-limit', 'op-avanti-west-coast', 'op-east-midlands-railway'],
  sources: ['op_crosscountry_1', 'op_crosscountry_2', 'nrcot', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'crosscountry-delay-repay',
    nav: 'CrossCountry',
    card: 'CrossCountry pays from 30 minutes late across its Birmingham-centred network: bands, season values, payment by bank transfer and a lower approval rate.',
    title: 'CrossCountry Delay Repay: What a 30-Minute Delay Pays',
    description: 'CrossCountry Delay Repay starts at 30 minutes late. See the amount for your fare, the season divisors, the bank transfer check and how often claims succeed.',
    h1: 'CrossCountry Delay Repay',
    intro: 'The calculator above uses the CrossCountry bands: enter your fare and the minutes late at your destination to see what the claim is worth.',
    resume: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr);
      return `CrossCountry's long cross-country routes all meet at Birmingham New Street, reaching Scotland, the North East, the South West, the South Coast, Cardiff and Stansted Airport. Its compensation follows ${o.scheme}: a train has to bring you to the destination on your ticket at least ${h.num(h.threshold(o))} minutes late before anything is due. From there a single earns ${h.share(o.bands[0].single)}, then the full price from ${h.num(o.bands[1].from)} minutes; a return earns ${h.share(o.bands[0].ret)} and ${h.share(o.bands[1].ret)} of its price per late leg, and the whole return once either leg is ${h.num(o.bands[2].from)} minutes late or more. On a ${h.gbp(58)} single, 38 minutes late means ${h.gbp(h.pay(ID, 'single', 58, 38))}. Payment comes by ${o.payment.join(' or ')}. The time limit is ${h.num(o.deadlineDays)} days. Of the claims it closed in ${h.ORR.lastYear.label}, CrossCountry approved ${h.pc(r.last?.approvedPct ?? 0, 1)}, one of the lowest rates among the national operators. It is run privately by Arriva.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Why was my CrossCountry Delay Repay payment returned by my bank?', a: 'CrossCountry pays by BACS bank transfer, and its claim page asks you to check before claiming that your bank can receive BACS payments. It warns that some online-only banks or accounts may restrict them. If a transfer fails, contact CrossCountry with your claim reference and give another account or ask for rail travel vouchers, the other method it offers.' },
        { q: 'How do I claim CrossCountry Delay Repay on a smartcard ticket?', a: `Enter the 18-digit number printed on the front of the smartcard in the field for the booking reference or ticket number, and upload a clear image of the front of the card. Each delayed journey is a separate claim, so a season on a smartcard is claimed journey by journey within ${h.num(o.deadlineDays)} days of each one.` },
        { q: 'Does CrossCountry accept paper Delay Repay claims?', a: 'Yes. Its page says the quickest route is the online form, but a paper form can be downloaded for those who cannot use it. Whichever you choose, the claim needs the ticket details, the train you took and the minutes late at your destination. Post takes longer, so keep a copy of the form and of the ticket before you send them.' },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr); const d = o.season!.divisors;
      const gb = h.ORR.lastYear.ops['great-britain'];
      return `
<h2>Half an hour before anything is owed</h2>
<p>CrossCountry is one of the companies on Delay Repay 30. On a journey such as Bristol to Birmingham, a 25-minute delay pays nothing, while on a Delay Repay 15 operator the same delay would return a quarter of the fare. The bands, applied to a ${h.gbp(58)} single, look like this.</p>
${h.table(['Arrival delay', 'Share of the single', `Amount on ${h.gbp(58)}`, 'Share of the return, each late leg'], h.bandRows(ID, 58), 'CrossCountry bands, read on an archived copy of its Delay Repay page.', ['l', 'r', 'r', 'r'])}
<p>Its page words returns as "either portion" of a return ticket: half the portion from 30 minutes, all of it from 60, and the full return when either or both legs are more than two hours late. The calculator treats a portion as half the return fare.</p>

<h2>Long journeys, many connections</h2>
<p>Many CrossCountry trips involve a change, either at Birmingham or onto another company's train. Compensation depends on your arrival at the final station on the ticket, so a 15-minute late CrossCountry train that makes you miss an hourly connection can produce a delay well over the threshold. The tool below adds the first delay and the wait for the next train to show the result; the claim then uses the real arrival time.</p>
<!--tool:mini:connection|{"op":"${ID}"}-->
<p>A claim goes to the company whose train caused the delay. If that was another operator, CrossCountry can refer the claim to it, and the ${h.a('how-to-claim-delay-repay', 'claim guide')} explains how journeys over several companies are handled.</p>

<h2>Season tickets</h2>
<p>The full Passenger Charter, read on an archived copy of May 2025, values one journey on a season as the price divided by ${h.num(d.weekly ?? 0)} for a weekly, ${h.num(d.flexi ?? 0)} for a Flexi Season, ${h.num(d.monthly ?? 0)} for a monthly and ${h.num(d.annual ?? 0)} for an annual, with a quarterly divisor as well. The single-ticket percentages then apply. On a monthly season of ${h.gbp(520)}, a 40-minute delay is worth ${h.gbp(h.pay(ID, 'monthly', 520, 40))}; at 70 minutes it is ${h.gbp(h.pay(ID, 'monthly', 520, 70))}. The season column does not double at two hours: it stays at one full journey.</p>

<h2>Approval rate and speed</h2>
<p>The ${h.src('orr_4410', 'ORR claim statistics')} put CrossCountry well below the national average. In ${h.ORR.lastYear.label} it received ${h.num(r.last?.received ?? 0)} claims and approved ${h.pc(r.last?.approvedPct ?? 0, 1)} of those closed, against ${h.pc(gb.approvedPct, 1)} across Great Britain; ${h.pc(r.last?.within20Pct ?? 0, 1)} were closed within 20 working days. Provisional figures for the first ${h.num(h.ORR.current.periods.length)} periods of ${h.ORR.current.label} show an approval rate of ${h.pc(r.current?.approvedPct ?? 0, 1)} and ${h.pc(r.current?.within20Pct ?? 0, 1)} closed within 20 working days. The statistics do not give reasons for refusals. Delays under the threshold, claims sent to the wrong company and journeys past the limit are common causes on any network; check the minutes and the deadline before sending.</p>
<p>Under the ${h.src('nrcot', 'National Rail Conditions of Travel')}, a refused claim for a delay of ${h.num(h.N.minDelay)} minutes or more still leaves you entitled to at least ${h.pc(h.N.minPct)} of the fare, and the Rail Ombudsman can review a final answer.</p>

<h2>What this page could not check</h2>
<p>CrossCountry's live pages block automated reading. The bands come from an ${h.src('op_crosscountry_1', 'archived copy of its Delay Repay page')} and the season divisors from an ${h.src('op_crosscountry_2', 'archived copy of its full charter')}. Both are official texts, but a change made since those copies would not show here; the claim form of the operator gives the binding figure.</p>`;
    },
  },
});
