import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const ID = 'chiltern-railways';
const and = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const since = (h: Helpers) => h.date(h.P.ownership.find((x) => x.operator === 'Chiltern Railways')!.date);

export default definePage({
  id: 'op-chiltern-railways',
  group: 'operators',
  order: 104,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 32, delay: 22 } },
  mini: { kind: 'mini:bands', props: { op: ID } },
  related: ['delay-repay-15-minutes', 'delay-repay-time-limit', 'how-to-claim-delay-repay', 'op-west-midlands-railway'],
  sources: ['op_chiltern_railways_1', 'op_chiltern_railways_2', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'chiltern-railways-delay-repay',
    nav: 'Chiltern Railways',
    card: 'Late out of Marylebone? Chiltern Railways pays from 15 minutes: its bands, the season divisors, the paper form and what changed with public ownership.',
    title: 'Chiltern Railways Delay Repay: Bands, Seasons and the Form',
    description: 'Chiltern Railways Delay Repay from 15 minutes late: the share of each ticket, how a season journey is valued, claiming online or by post, and its claim record.',
    h1: 'Chiltern Railways Delay Repay: what a late Marylebone train pays',
    intro: 'The calculator above already holds Chiltern Railways\' bands: enter your fare and the minutes late at your destination to see the amount.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands; const r = h.orr(o.orr);
      return `Chiltern Railways, which runs trains out of London Marylebone towards Aylesbury, Oxford and Birmingham, compensates delays under ${o.scheme}. Only a delay of more than ${h.num(h.threshold(o) - 1)} minutes at your destination qualifies. A single then returns ${h.share(b[0].single)} of its price, rising to ${h.share(b[1].single)} from ${h.num(b[1].from)} minutes and the whole fare from ${h.num(b[2].from)} minutes; on a return, each late leg is worth half those shares until a delay of ${h.num(b[3].from)} minutes brings back the entire return. Season holders are paid on the value of one journey, and from two hours on the value of a return journey. Claims go in within ${h.num(o.deadlineDays)} days, online or on a paper form sent by post with the tickets. The company passed into public ownership on ${since(h)}. Over ${h.ORR.lastYear.label} it approved ${h.pc(r.last!.approvedPct!, 1)} of the claims it closed and closed ${h.pc(r.last!.within20Pct!, 1)} within 20 working days.`;
    },
    faqs: (h) => {
      const o = h.op(ID); const d = o.season!.divisors;
      return [
        { q: 'Can I still claim from Chiltern Railways by post?', a: 'Yes. Besides the online compensation form, Chiltern lets you download a claim form and post it to the address printed on it with the tickets you are claiming for, or pick up the same form at any staffed Chiltern station. Keep a photo or copy of the tickets before sending them, since the originals go with the claim.' },
        { q: 'How does Chiltern Railways value a journey on a Flexi Season?', a: `It treats one journey as ${h.num(1)}/${h.num(d.flexi!)} of the Flexi Season price, then applies the band share to that value. A Flexi bought for ${h.gbp(160)} gives a journey value of ${h.gbp(160 / d.flexi!)}, so a ${h.num(35)}-minute delay pays ${h.gbp(h.pay(ID, 'flexi', 160, 35))} and a delay of two hours or more pays twice the journey value.` },
        { q: 'I paid by contactless on Chiltern Railways: what proof do I send?', a: 'Chiltern asks contactless and Oyster users to attach their journey history from the TfL website. The free history shows only the last seven days of travel, so to look further back you need a TfL account linked to your card. Send the page that shows the delayed journey and the fare charged for it.' },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const d = o.season!.divisors; const r = h.orr(o.orr);
      return `
<h2>The Chiltern bands for a ${h.gbp(32)} single</h2>
<p>Here is the scale set out on Chiltern's ${h.src('op_chiltern_railways_1', 'compensation page')}, applied to a ${h.gbp(32)} fare. Under ${h.num(h.threshold(o))} minutes nothing is paid; the scale then climbs in four steps.</p>
${h.table(['Minutes late', 'Share of a single', `On a ${h.gbp(32)} single`, 'Share of a return, per late leg'], h.bandRows(ID, 32), 'Chiltern Railways, Delay Repay 15.', ['l', 'r', 'r', 'r'])}
<p>A return of ${h.gbp(58)} with the evening leg ${h.num(40)} minutes late pays ${h.gbp(h.pay(ID, 'return', 58, 0, 40))}. If both legs are late, the two amounts add up, never beyond the price of the ticket; our ${h.a('delay-repay-return-ticket', 'return ticket page')} explains the arithmetic.</p>

<h2>Season tickets: one journey, then a return journey</h2>
<p>Chiltern's table converts each season into the price of one single journey: ${h.num(1)}/${h.num(d.annual!)} of an annual, ${h.num(1)}/${h.num(d.monthly!)} of a monthly, ${h.num(1)}/${h.num(d.flexi!)} of a Flexi Season and ${h.num(1)}/${h.num(d.weekly!)} of a weekly; a quarterly is divided by 120. The band percentages then apply to that single journey value, except at two hours or more, when the payment is the full cost of a return journey.</p>
<p>Example: an annual season of ${h.gbp(4600)} is worth ${h.gbp(4600 / d.annual!)} a journey. A ${h.num(20)}-minute delay pays ${h.gbp(h.pay(ID, 'annual', 4600, 20))}, a delay of an hour pays ${h.gbp(h.pay(ID, 'annual', 4600, 60))} and a delay of over two hours pays ${h.gbp(h.pay(ID, 'annual', 4600, 125))}.</p>

<h2>Three practical points from its claim pages</h2>
<ol>
<li><strong>Keep paper tickets out of the barrier.</strong> Chiltern asks passengers holding a paper single or return not to put it through the gate at the end of the journey, because it is needed for the claim.</li>
<li><strong>Claim from the right company.</strong> If the delay started on another operator's train, the claim goes to that operator: Chiltern says it cannot consider claims for services it does not run.</li>
<li><strong>Choose the payment.</strong> The form offers ${and(o.payment)}. You never have to take vouchers if you prefer money.</li>
</ol>
<p>The page also uses the phrase "within the railway industry control" when it describes who can claim. The ${h.src('nrcot', 'National Rail Conditions of Travel')} still guarantee at least ${h.pc(h.N.minPct)} of the fare from ${h.num(h.N.minDelay)} minutes late, whatever caused the delay, and Delay Repay schemes are normally paid regardless of cause. Mention that if a claim is refused on the ground of cause.</p>
<!--tool:mini:deadline|{"op":"chiltern-railways"}-->
<p>Chiltern also reminds passengers that Delay Repay is not the only route. A delay can instead be claimed under its Passenger Charter or under the Consumer Rights Act 2015, though the same money cannot be recovered twice, and other losses caused by Chiltern Railways, unrelated to the delay itself, may be claimed separately. In practice, Delay Repay is the quickest for the fare; the other routes matter when the cost of the delay went well beyond the ticket.</p>

<h2>A new owner and its claim record</h2>
<p>Chiltern Railways joined the ${h.src('gov_gbr', 'public ownership programme')} on ${since(h)}, the most recent transfer before Great Western Railway's, due on ${h.date(h.P.ownership.find((x) => x.operator === 'Great Western Railway')!.date)}. The bands on this page were read on its website on ${h.date(o.readOn)}, after the change. ${h.src('orr_4410', 'ORR statistics')} for ${h.ORR.lastYear.label}: ${h.num(r.last!.received)} claims received, ${h.num(r.last!.approved)} approved. For ${h.ORR.current.label}, provisional figures to date show ${h.num(r.current!.received)} claims and an approval rate of ${h.pc(r.current!.approvedPct!, 1)}, with ${h.pc(r.current!.within20Pct!, 1)} closed inside 20 working days.</p>`;
    },
  },
});
