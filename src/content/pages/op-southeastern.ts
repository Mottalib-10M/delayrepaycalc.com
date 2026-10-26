import { definePage } from '../../lib/guide-types';

const ID = 'southeastern';
const and = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

export default definePage({
  id: 'op-southeastern',
  group: 'operators',
  order: 123,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 24, delay: 31 } },
  mini: { kind: 'mini:divisors', props: { op: ID } },
  related: ['delay-repay-15-minutes', 'delay-repay-amounts', 'how-to-claim-delay-repay', 'op-south-western-railway', 'op-thameslink'],
  sources: ['op_southeastern_1', 'op_southeastern_2', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'southeastern-delay-repay',
    nav: 'Southeastern',
    card: 'Southeastern pays from 15 minutes late on its Kent and south-east London trains: the journey rate for seasons, One Click claims and Oyster journeys.',
    title: 'Southeastern Delay Repay: One Click Claims and Journey Rates',
    description: 'Southeastern Delay Repay from 15 minutes late: single and return shares, the journey rate for Key and paper seasons, One Click claims and its claim figures.',
    h1: 'Southeastern Delay Repay: the journey rate and One Click',
    intro: 'Use the calculator above with Southeastern\'s bands already loaded: change the price or the delay to see the payment move between bands.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands; const r = h.orr(o.orr); const d = o.season!.divisors;
      return `Southeastern, the operator of commuter and high speed trains between London and Kent, pays ${o.scheme} on arrival delays at your destination. Singles earn ${h.share(b[0].single)}, ${h.share(b[1].single)} and ${h.share(b[2].single)} of the price from ${h.num(b[0].from)}, ${h.num(b[1].from)} and ${h.num(b[2].from)} minutes; returns earn half those shares per late leg and the full price from ${h.num(b[3].from)} minutes. For seasons it computes a "journey rate", the ticket price divided by ${h.num(d.flexi!)} for a Flexi, ${h.num(d.weekly!)} for a weekly, ${h.num(d.monthly!)} for a monthly and ${h.num(d.annual!)} for an annual, and pays the band share of it, rising to a return journey rate from two hours. Oyster and contactless journeys are treated as singles at the fare charged. Its One Click Delay Repay creates claims for Key smartcard holders and for eTicket, sTicket and Advance buyers. Claims are accepted for ${h.num(o.deadlineDays)} days. In ${h.ORR.lastYear.label}, ${h.pc(r.last!.within20Pct!, 1)} of its ${h.num(r.last!.closed)} closed claims were closed within 20 working days.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'How quickly does Southeastern send a One Click Delay Repay claim?', a: `Within 48 hours of the delay, by email or in the Southeastern app, or you can find it by logging into your account. You confirm the journey details and the claim is paid. It still has to be confirmed within the ${h.num(o.deadlineDays)}-day limit, so do not leave the message unopened for weeks.` },
        { q: 'Does Southeastern One Click work if I cannot tap out at my station?', a: 'Partly. One Click compares your tap in and tap out with the Key, or the scan of your eTicket or sTicket barcode, with train running data. Where a station has no reader, you can save your regular journeys in your account, but Southeastern must see a tap or a scan proving the trip.' },
        { q: 'How does Southeastern compensate a pay as you go Oyster journey?', a: `As a single ticket for the journey made, at the amount charged between your tap in and tap out. A ${h.gbp(4.2)} pay as you go fare that arrives ${h.num(32)} minutes late is worth ${h.gbp(h.pay(ID, 'single', 4.2, 32))}. Send a journey statement from Transport for London; card statements without the time of travel are not accepted.` },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const d = o.season!.divisors; const r = h.orr(o.orr);
      const rows = (['flexi', 'weekly', 'monthly', 'annual'] as const).map((k) => {
        const price = { flexi: 190, weekly: 95, monthly: 365, annual: 3800 }[k];
        return [`${k[0].toUpperCase()}${k.slice(1)} at ${h.gbp(price)}`, `÷ ${h.num(d[k]!)}`, h.gbp(price / d[k]!), h.gbp(h.pay(ID, k, price, 40)), h.gbp(h.pay(ID, k, price, 130))];
      });
      return `
<h2>The journey rate, worked through</h2>
<p>Southeastern's ${h.src('op_southeastern_1', 'Delay Repay FAQs')} set out a grid that every season holder can apply by hand: divide what you paid by a fixed number, and that is your journey rate. A quarterly season uses 120. The band then takes ${h.share(o.bands[0].season)}, ${h.share(o.bands[1].season)} or ${h.share(o.bands[2].season)} of the rate, and a delay of two hours or more pays the return journey rate, the maximum for a season. Here are four example seasons:</p>
${h.table(['Season', 'Divisor', 'Journey rate', `${h.num(40)} min late`, `${h.num(130)} min late`], rows, 'Example prices; divisors from Southeastern.', ['l', 'r', 'r', 'r', 'r'])}

<h2>Singles and returns</h2>
<p>A ${h.gbp(24)} single that reaches its station ${h.num(31)} minutes late pays ${h.gbp(h.pay(ID, 'single', 24, 31))}. A return is valued leg by leg: on a ${h.gbp(44)} day return, ${h.num(20)} minutes late going out and ${h.num(65)} minutes late coming back pay ${h.gbp(h.pay(ID, 'return', 44, 20, 65))} together. Try your own legs here:</p>
<!--tool:mini:returnlegs|{"op":"southeastern","price":44,"out":20,"back":65}-->

<h2>One Click Delay Repay</h2>
<p>Sign up once in your Southeastern account, under One Click Delay Repay. From then on, any delay of at least ${h.num(h.threshold(o))} minutes on Southeastern trains, detected from your taps, scans or the time of your Advance ticket, creates a claim for you to confirm. The scheme covers ${o.automatic!.replace('One Click Delay Repay: ', '')}. A ticket bought from another retailer is not included and is claimed on the ordinary ${h.src('op_southeastern_2', 'Delay Repay page')}; for those, Southeastern needs a copy of the ticket or the eTicket reference, not the order number of the third party.</p>
<p>Payment can be taken as ${and(o.payment)}.</p>

<h2>Claiming by hand: what to have ready</h2>
<p>For a manual claim, Southeastern asks for the ticket itself or its details: the eTicket reference shown under the QR code, or your Southeastern booking reference. For Oyster or contactless, it needs a journey statement or, for monthly and annual seasons on Oyster, the season ticket record, both available from Transport for London. Have the scheduled time of the train you meant to take and your real arrival time to hand; the form asks for both.</p>
<p>One Click and the manual form lead to the same payment. The difference is who notices the delay: with One Click, Southeastern does, from its running data; with the form, you do. If One Click misses a journey, nothing stops you claiming it yourself within the limit.</p>
<p>A worked season case: a Key smartcard monthly of ${h.gbp(365)} has a journey rate of ${h.gbp(365 / d.monthly!)}. Three delays of ${h.num(35)} minutes in a month bring ${h.gbp(3 * h.pay(ID, 'monthly', 365, 35))} in total, which the tool on this page lets you compare with other operators' divisors.</p>

<h2>Ownership and claim statistics</h2>
<p>Southeastern is run by the government's operator of last resort: ${o.owner}, as listed on the ${h.src('gov_gbr', 'GOV.UK page on Great British Railways')}. The ${h.src('orr_4410', 'Office of Rail and Road')} reports ${h.num(r.last!.received)} claims for ${h.ORR.lastYear.label}, ${h.pc(r.last!.approvedPct!, 1)} approved. For ${h.ORR.current.label}, the provisional periods show ${h.num(r.current!.received)} claims, ${h.pc(r.current!.approvedPct!, 1)} approved and ${h.pc(r.current!.within20Pct!, 1)} closed within 20 working days. Under every scheme, the ${h.src('nrcot', 'National Rail Conditions of Travel')} keep a floor of ${h.pc(h.N.minPct)} of the fare from ${h.num(h.N.minDelay)} minutes late.</p>`;
    },
  },
});
