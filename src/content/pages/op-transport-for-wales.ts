import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'op-transport-for-wales',
  group: 'operators',
  order: 127,
  operator: 'transport-for-wales',
  tool: { kind: 'repay', props: { operator: 'transport-for-wales', lock: true, ticket: 'single', price: 21, delay: 63 } },
  mini: { kind: 'mini:deadline', props: { op: 'transport-for-wales' } },
  related: ['season-ticket-delay-repay', 'automatic-delay-repay', 'delay-repay-time-limit', 'op-gwr', 'delay-repay-amounts'],
  sources: ['op_transport_for_wales_1', 'nrcot', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'transport-for-wales-delay-repay',
    nav: 'Transport for Wales',
    card: 'Transport for Wales Delay Repay: the Welsh operator’s bands, two season claims a day, strike-day claims for its season holders and automatic claims on Advance tickets.',
    title: 'Transport for Wales Delay Repay: Bands, Seasons, Strikes',
    description: 'Transport for Wales Delay Repay: what TfW pays from 15 minutes late, how season and strike claims work, Advance tickets it claims for you and payment options.',
    h1: 'Transport for Wales Delay Repay',
    intro: 'The calculator above holds the Transport for Wales scale: type your fare and the minutes late at your station to get the amount and the band.',
    resume: (h) => {
      const o = h.op('transport-for-wales'); const r = h.orr(o.orr); const b = o.bands;
      return `Transport for Wales, which trades as TfW, pays Delay Repay when one of its trains is delayed or cancelled and you reach your destination more than ${h.num(h.threshold(o))} minutes after the timetable. The scheme covers every ticket type it sells, seasons included. Singles earn ${h.share(b[0].single)}, ${h.share(b[1].single)} or ${h.share(b[2].single)} of the fare depending on whether the delay falls between ${h.mins(b[0])}, ${h.mins(b[1])} or ${h.num(b[2].from)} minutes and over; a ${h.gbp(21)} single that is ${h.num(63)} minutes late therefore comes back in full, ${h.gbp(h.pay('transport-for-wales', 'single', 21, 63))}. On a return, each late leg is worth half the fare, and a single leg ${h.num(b[3].from)} minutes late refunds ${h.share(b[3].ret)} of it. TfW has two features rarely found elsewhere: season holders may make up to two claims a day, and those who bought their season from TfW can claim for days when strikes stopped them travelling. Claims must reach it within ${h.num(o.deadlineDays)} days. In ${h.ORR.lastYear.label} it approved ${h.pc(r.last!.approvedPct!, 1)} of ${h.num(r.last!.closed)} claims closed.`;
    },
    faqs: (h) => {
      const o = h.op('transport-for-wales'); const b = o.bands;
      return [
        { q: 'Can I claim Transport for Wales Delay Repay on my season ticket for a strike day?', a: 'Yes, if the season was bought from Transport for Wales. Its page says season holders can use the Delay Repay form for days when industrial action stopped them travelling, choosing Strike Action as the reason for the delay. Season tickets bought from another retailer are not mentioned in that rule, so check with the seller of your ticket in that case.' },
        { q: 'How many Transport for Wales delays can I claim in one day on a season?', a: `Up to two. TfW compensates each delayed journey made on a season ticket separately and allows at most two claims per day, which matches an outward and a return trip. Each journey is valued at a fraction of the season price, ${h.num(1)}/${h.num(o.season!.divisors.annual!)} for an annual, and earns ${h.share(b[0].season)} to ${h.share(b[3].season)} of that value depending on the delay.` },
        { q: 'What if a Transport for Wales train was replaced by a bus at short notice?', a: 'TfW says that if you took an emergency rail replacement bus that was not planned in advance, it measures the delay from the planned arrival of your train. A rail replacement bus that was planned and built into the timetable is different: the delay is then measured against that amended timetable, so only lateness beyond it counts.' },
        { q: 'How quickly does Transport for Wales pay once a claim is approved?', a: 'It depends on the method. TfW says PayPal payments arrive within 48 hours of the claim being processed and are only offered on its online form, while bank transfers take up to 10 working days. A charity donation is paid to the charity on approval. For automatic claims on Advance tickets, payment can take up to five working days after you confirm the journey.' },
      ];
    },
    body: (h) => {
      const o = h.op('transport-for-wales'); const r = h.orr(o.orr); const d = o.season!.divisors; const b = o.bands;
      return `
<h2>A Welsh network with long rural lines</h2>
<p>TfW runs the trains of Wales and the borders: the main line through Cardiff and Swansea, the valley lines, the North Wales coast, the Cambrian lines to the west coast and long rural routes such as the Heart of Wales line, as well as services into Shrewsbury, Chester and Manchester. Weather often disrupts the rural lines, and Delay Repay does not exclude it: what counts is the delay at your station, not its cause. The table applies the TfW bands to a ${h.gbp(21)} single.</p>
${h.table(['Minutes late', 'Single', `On ${h.gbp(21)}`, 'Return, each late leg'], h.bandRows('transport-for-wales', 21), `Transport for Wales bands, read on its ${h.src('op_transport_for_wales_1', 'Delay Repay page')}.`, ['l', 'r', 'r', 'r'])}

<h2>Seasons, Multiflex and the two-claim rule</h2>
<p>Season ticket and Multiflex holders claim each delayed journey separately. TfW values one journey at ${h.num(1)}/${h.num(d.weekly!)} of a weekly, ${h.num(1)}/${h.num(d.monthly!)} of a monthly and ${h.num(1)}/${h.num(d.annual!)} of an annual, then applies the usual shares. Unlike several English operators, its top season band stays at ${h.share(b[3].season)} of one journey rather than two. With a ${h.gbp(2900)} annual season, one journey is worth ${h.gbp(2900 / d.annual!)} and a ${h.num(40)}-minute delay pays ${h.gbp(h.pay('transport-for-wales', 'annual', 2900, 40))}. ${o.notes[0]} No Flexi divisor appears on the page read, so the calculator leaves that case to the claim form.</p>
<!--tool:mini:divisors|{"op":"transport-for-wales","kind":2,"price":2900}-->

<h2>Claims TfW opens for you</h2>
<p>${o.automatic}. In practice, if you bought an Advance ticket for a TfW service on its website or app, its system checks the journey; when it finds a delay of at least ${h.num(h.threshold(o))} minutes it prepares the claim and emails you to confirm the details. For every other ticket you fill in the form, which asks for the journey, the ticket and how you want to be paid: ${o.payment.join(', ')}.</p>
<p>A practical point for pay as you go users: on disrupted days, TfW asks you to tap in at your origin and out at your destination even when part of the trip is by replacement bus, and missing taps can be added in its app or on its website. Its pay as you go is valid only on TfW and CrossCountry services.</p>

<p>If the disruption makes you give up the trip and your ticket is unused, TfW points you to a fee-free refund from wherever you bought it, which is a separate process from Delay Repay.</p>

<h2>Claim figures and ownership</h2>
<p>The ORR's ${h.src('orr_4410', 'Table 4410')} shows TfW received ${h.num(r.last!.received)} claims in ${h.ORR.lastYear.label} and closed ${h.pc(r.last!.within20Pct!, 1)} within 20 working days. For ${h.ORR.current.label}, provisional figures show ${h.num(r.current!.received)} claims so far, with ${h.pc(r.current!.approvedPct!, 1)} approved. TfW is under ${o.owner.charAt(0).toLowerCase()}${o.owner.slice(1)}, so the transfers of English franchises to public ownership do not concern it. Journeys on the main line from South Wales to London are run by GWR: see the ${h.a('op-gwr', 'GWR page')} for its rules.</p>`;
    },
  },
});
