import { definePage } from '../../lib/guide-types';

const ID = 'london-overground';

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 117,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 3.1, delay: 40 } },
  mini: { kind: 'mini:returnlegs', props: { op: ID, price: 9.4 } },
  related: ['op-elizabeth-line', 'op-c2c', 'delay-repay-15-minutes', 'how-to-claim-delay-repay'],
  sources: ['op_london_overground_1', 'op_london_overground_2', 'nrcot', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'london-overground-delay-refund',
    nav: 'London Overground',
    card: 'Delayed on the Liberty, Lioness, Mildmay, Suffragette, Weaver or Windrush line: the 30-minute TfL refund, the causes it leaves out and the account you need.',
    title: 'Overground Delay Refund: When TfL Pays Back Your Fare',
    description: 'London Overground delay refund: 30 minutes late for a reason TfL controls gives back your single pay as you go fare. Who can claim, exclusions, deadline.',
    h1: 'London Overground delay refund',
    intro: 'The calculator above is locked on London Overground: it checks your delay against the 30-minute threshold and shows the fare that would come back.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands[0]; const r = h.orr(o.orr);
      return `A London Overground delay refund is not Delay Repay. The six Overground lines, Liberty, Lioness, Mildmay, Suffragette, Weaver and Windrush, follow the Transport for London service delay refund: a journey that ends ${h.num(b.from)} minutes or more late for a reason within TfL's control earns back its single pay as you go fare. On the Tube and the DLR the same refund starts at 15 minutes, so a trip that switches from the Underground to the Overground can meet one threshold and miss the other. Paper single and return tickets get the cash value of the delayed journey. You must apply within ${h.num(o.deadlineDays)} days, and you are repaid by bank transfer or as pay as you go credit. Strikes, planned works, weather, security alerts and passengers taken ill do not qualify. In ${h.ORR.lastYear.label}, the Office of Rail and Road counted ${h.num(r.last!.received)} claims on the Overground, of which ${h.pc(r.last!.approvedPct!, 1)} were approved, rising to ${h.pc(r.current!.approvedPct!, 1)} in the first, provisional months of ${h.ORR.current.label}.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Do I need an account to claim a London Overground refund on contactless?', a: 'Yes. TfL only takes service delay refunds for contactless payments through an online account in which the card is registered. Once it is, the refund is requested from the journey and payment history. For a Travelcard on Oyster, TfL also accepts claims by phone in some cases when you cannot get online, but never by email.' },
        { q: 'Can a Freedom Pass holder claim a London Overground delay refund?', a: 'No. TfL excludes free travel from service delay refunds: Freedom Pass, 60+ Oyster photocard and Veterans Oyster photocard holders, and children under 11 travelling free with an adult. With nothing paid for the journey, there is no fare to refund, whatever the length of the delay.' },
        { q: 'My London Overground train was 35 minutes late in the snow: can I claim?', a: `Under TfL's service delay refund, probably not, because adverse weather is listed as outside its control. The ${h.num(o.bands[0].from)}-minute threshold only pays for delays TfL could control. If you held a National Rail ticket and the delay reached an hour, the National Rail Conditions of Travel give a floor regardless of cause, which you can cite when asking for a review.` },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr); const b = o.bands[0];
      return `
<h2>Which journeys qualify</h2>
<p>TfL's ${h.src('op_london_overground_1', 'service delay refund page')} sets two thresholds. The Underground and DLR pay from 15 minutes; the London Overground and the Elizabeth line only from ${h.num(b.from)} minutes. You get back what the late journey costs as a single pay as you go trip, the same whether the train was ${h.num(b.from)} minutes or two hours late. A ${h.gbp(3.1)} fare and a 40-minute delay therefore bring back ${h.gbp(h.pay(ID, 'single', 3.1, 40))}.</p>
<p>The cause decides the rest. The ${h.src('op_london_overground_2', 'TfL Conditions of Carriage')} put each case in one of three boxes:</p>
${h.table(['Cause of the delay', 'Refund'], [
  ['A cause within TfL control', 'single fare of the journey'],
  ['Planned service changes and engineering works', 'none'],
  ['Adverse weather, security alert, passenger taken ill', 'none'],
  ['Strike action', 'none: refunds suspended'],
  ['Higher fare paid on another route, delay within TfL control', 'difference, case by case'],
], 'London Overground, TfL Conditions of Carriage, section 8.2 and Appendix 2.', ['l', 'l'])}

<h2>Return tickets and Travelcards</h2>
<p>Most Overground journeys are paid by contactless or Oyster, one fare per trip. Paper tickets are rarer, but TfL treats them the same way: the cash value of the delayed journey comes back, not the whole ticket. For a return, the calculator values one late leg at ${h.share(b.ret)} of the price. A Travelcard on Oyster is claimed online; TfL asks you to wait 48 hours first, since it sometimes refunds automatically, and does not accept those claims by email.</p>
<p>Claims for paper tickets and National Rail smartcards go to TfL Customer Services with your contact details, the route, the time and length of the delay, and images of both sides of the ticket. TfL then contacts you to process it.</p>

<h2>Timing, review and appeal</h2>
<p>The limit is ${h.num(o.deadlineDays)} days from the delayed journey, the same as on the national network. TfL says a review can take up to 10 working days. If the claim is refused and you think it should have been paid, the appeal is made by phone. Because the threshold is measured in whole minutes, note the time you touched out: it is the easiest evidence of your real arrival.</p>

<h2>Where the Overground meets National Rail</h2>
<p>The company running the Overground, Arriva Rail London, appears in Appendix A of the ${h.src('nrcot', 'National Rail Conditions of Travel')}, which list the train companies bound by them. Those conditions set a minimum of ${h.pc(h.N.minPct)} of the fare from ${h.num(h.N.minDelay)} minutes, with no exclusion for the cause once that point is reached. TfL's pages do not explain how this floor applies to its own refund, so treat it as an argument for a review, not as a promise. Several Overground stations are shared with National Rail operators such as ${h.a('op-c2c', 'c2c')} and Greater Anglia, whose Delay Repay pays from 15 minutes on their own trains.</p>

<h2>Approval rates over two years</h2>
<p>The ORR reports the Overground on its own line. Every claim it received in ${h.ORR.lastYear.label} was closed, ${h.pc(r.last!.within20Pct!, 1)} of them inside 20 working days, and the approval rate stood at ${h.pc(r.last!.approvedPct!, 1)}. The provisional count for the first ${h.num(h.ORR.current.periods.length)} periods of ${h.ORR.current.label} is ${h.num(r.current!.closed)} claims closed with ${h.pc(r.current!.approvedPct!, 1)} approved (${h.src('orr_4410', 'ORR Table 4410')}).</p>
<!--tool:mini:orrstats|{"op":"london-overground"}-->
<p>For the other TfL rail service with a ${h.num(b.from)}-minute rule, see the ${h.a('op-elizabeth-line', 'Elizabeth line page')}.</p>`;
    },
  },
});
