import { definePage } from '../../lib/guide-types';

const ID = 'elizabeth-line';
const and = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}` : xs[0] ?? '');

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 107,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 5.6, delay: 35 } },
  mini: { kind: 'mini:orrstats', props: { op: ID } },
  related: ['op-london-overground', 'op-heathrow-express', 'op-gwr', 'delay-repay-time-limit', 'delay-repay-amounts'],
  sources: ['op_elizabeth_line_1', 'op_elizabeth_line_2', 'nrcot', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'elizabeth-line-delay-refund',
    nav: 'Elizabeth line',
    card: 'The Elizabeth line refunds a single fare after 30 minutes late, under Transport for London rules rather than Delay Repay: who qualifies, what is excluded and how to apply.',
    title: 'Elizabeth Line Delay Refund: 30 Minutes and the Rules',
    description: 'Elizabeth line delay refund: TfL pays back the single fare when you arrive 30 minutes or more late for a reason in its control. Exclusions and how to apply.',
    h1: 'Elizabeth line delay refund',
    intro: 'Set to the Elizabeth line, the calculator above shows whether a delay reaches the 30-minute mark and what the single fare refund would be.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands[0]; const r = h.orr(o.orr);
      return `The Elizabeth line does not run Delay Repay. Its trains follow the service delay refund of Transport for London, set out in the TfL Conditions of Carriage: if your journey is delayed by ${h.num(b.from)} minutes or more for a reason within TfL's control, you can apply for your money back for that journey, at its single pay as you go price, or of its cash value on a paper ticket. There are no steps beyond that: ${h.num(b.from - 1)} minutes pays nothing, and ${h.num(b.from)} minutes pays the same as two hours. You apply within ${h.num(o.deadlineDays)} days, and the money comes back as ${and(o.payment)}. The exclusions are wider than on National Rail: planned works, bad weather, security alerts, a passenger taken ill and strikes all fall outside. Those exclusions are worth keeping in mind when reading the line's record: it approved ${h.pc(r.last!.approvedPct!, 1)} of the claims it closed in ${h.ORR.lastYear.label}, against ${h.pc(h.ORR.lastYear.ops['great-britain'].approvedPct, 1)} across Great Britain, according to the Office of Rail and Road.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Does the Elizabeth line pay anything for a 20-minute delay?', a: `No. Transport for London's threshold on the Elizabeth line is ${h.num(o.bands[0].from)} minutes, twice the 15 minutes it uses on the Tube and DLR. A shorter delay gets no refund, even if it made you miss something. Only the time lost on the journey itself counts, measured against the timetable.` },
        { q: 'Can I get an Elizabeth line refund when trains were delayed by a strike?', a: 'Not under the service delay refund. The TfL Conditions of Carriage say these refunds are suspended during strike action, and higher fares paid on another route because of a strike are not refunded either. The same goes for planned engineering works and closures announced in advance, which is why it is worth checking the status of the line before travelling.' },
        { q: 'How do I apply for an Elizabeth line refund with contactless?', a: `Register the card in a TfL online account, sign in, open the journey and payment history and choose the service delay refund. Do it within ${h.num(o.deadlineDays)} days. TfL says the review can take up to 10 working days, and an unsuccessful claim can be appealed by phone.` },
        { q: 'Do the national Conditions of Travel apply to the Elizabeth line?', a: 'Its operator, GTS Rail Operations, appears in the list of train companies in Appendix A of the National Rail Conditions of Travel, version 8. Those conditions give at least half the fare for a delay of 60 minutes or more, whatever the cause. If a long delay on a National Rail ticket was refused, quote that condition when you ask for a review.' },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr); const b = o.bands[0];
      return `
<h2>One threshold, one amount</h2>
<p>The Elizabeth line crosses London from Reading and Heathrow in the west to Shenfield and Abbey Wood in the east, through tunnels under the centre. It is run for Transport for London, and its delay refund follows ${h.src('op_elizabeth_line_2', 'section 8.2 of the TfL Conditions of Carriage')}, not a Passenger's Charter. The rule is binary: a delay of ${h.num(b.from)} minutes or more, for a reason within TfL's control, gives back the single pay as you go fare of that journey. Anything shorter gives nothing.</p>
${h.table(['Minutes late', 'Refund', `On a ${h.gbp(5.6)} pay as you go fare`], [
  ['Under ' + h.num(b.from), 'nothing', h.gbp(h.pay(ID, 'single', 5.6, 25))],
  [h.mins(b), 'the single fare', h.gbp(h.pay(ID, 'single', 5.6, b.from))],
], 'Elizabeth line service delay refund, TfL Conditions of Carriage.', ['l', 'l', 'r'])}
<p>On a paper single or return, TfL refunds the cash value of the delayed journey rather than the whole ticket, so a late outward trip on a return is worth ${h.share(b.ret)} of the return price in the calculator above. A Travelcard on Oyster is handled online, and TfL asks you to wait 48 hours first, because in some cases it refunds automatically.</p>

<h2>What TfL will not refund</h2>
<p>This is where the Elizabeth line differs most from Delay Repay, which pays whatever the cause. Under its conditions, no refund is due when the delay came from:</p>
<ul>
<li>planned service changes or engineering works;</li>
<li>bad weather;</li>
<li>a security alert;</li>
<li>a customer incident, such as a passenger taken ill on a train;</li>
<li>strike action, during which service delay refunds are suspended altogether.</li>
</ul>
<p>Free travel is excluded too: Freedom Pass, 60+ Oyster and Veterans Oyster holders, and children under 11 travelling free with an adult, cannot claim. If a delay within TfL's control forced you onto another route at a higher fare, TfL may refund the difference, case by case.</p>

<h2>How to apply</h2>
<p>The ${h.src('op_elizabeth_line_1', 'TfL service delay refund page')} sets the route by payment method:</p>
<ol>
<li><strong>Contactless:</strong> register the card in an online account, then choose the service delay refund from the journey and payment history.</li>
<li><strong>Adult Oyster:</strong> apply in the online contactless and Oyster account.</li>
<li><strong>Oyster photocards</strong> such as Zip or 18+ Student: use the Oyster contact form or call TfL.</li>
<li><strong>Paper ticket or a National Rail smartcard:</strong> send the journey details, the time of the delay and images of the ticket to TfL Customer Services by post or email.</li>
</ol>
<p>Whatever the route, the deadline is ${h.num(o.deadlineDays)} days from the delayed journey. A review can take up to 10 working days, and TfL accepts an appeal by phone.</p>
<!--tool:mini:deadline|{"op":"elizabeth-line"}-->

<h2>The National Rail floor behind it</h2>
<p>One detail is easy to miss. The company that operates the line, GTS Rail Operations, trading as Elizabeth line, is listed in Appendix A of the ${h.src('nrcot', 'National Rail Conditions of Travel')}. Condition 33 of those conditions gives at least ${h.pc(h.N.minPct)} of the fare from ${h.num(h.N.minDelay)} minutes late and says that, from that point, compensation is due regardless of fault. TfL's own pages do not say how the two sets of rules meet. If you travelled on a National Rail ticket and a delay of an hour or more was refused because of the weather, it is reasonable to cite condition 33 when you ask for the decision to be reviewed.</p>

<h2>Claims in figures</h2>
<p>The Office of Rail and Road lists the Elizabeth line separately. In ${h.ORR.lastYear.label}, it received ${h.num(r.last!.received)} claims, closed the same number and approved ${h.pc(r.last!.approvedPct!, 1)}; every one was closed within 20 working days. The provisional figures for ${h.ORR.current.label} show ${h.pc(r.current!.approvedPct!, 1)} approved (${h.src('orr_4410', 'ORR Table 4410')}). The sister service is covered on the ${h.a('op-london-overground', 'London Overground page')}; trains that share the western end of the line belong to ${h.a('op-gwr', 'Great Western Railway')} and ${h.a('op-heathrow-express', 'Heathrow Express')}, each with its own rules.</p>`;
    },
  },
});
