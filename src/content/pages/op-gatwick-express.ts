import { definePage } from '../../lib/guide-types';

const ID = 'gatwick-express';
const and = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}` : xs[0] ?? '');

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 108,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 22.5, delay: 18 } },
  mini: { kind: 'mini:bands', props: { op: ID } },
  related: ['op-southern', 'op-heathrow-express', 'delay-repay-return-ticket', 'how-to-claim-delay-repay'],
  sources: ['op_gatwick_express_1', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'gatwick-express-delay-repay',
    nav: 'Gatwick Express',
    card: 'Late on the airport run between Victoria and Gatwick: what Gatwick Express pays on a single or return, how to claim without an account, and seasons without Flexi.',
    title: 'Gatwick Express Delay Repay: Airport Trips and Seasons',
    description: 'Gatwick Express Delay Repay pays from 15 minutes late. Price your airport single or return, see how to claim and be paid and how seasons are valued per journey.',
    h1: 'Gatwick Express Delay Repay',
    intro: 'The calculator above is set to Gatwick Express: enter what you paid and how late you arrived to get the band and the amount.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands;
      return `Gatwick Express Delay Repay covers the non-stop trains between London Victoria and Gatwick Airport, and it pays from ${h.num(h.threshold(o))} minutes late at your destination, whether you were heading for a flight or coming home from one. It is not a separate scheme: Gatwick Express applies the Delay Repay 15 rules of Govia Thameslink Railway, the group that also runs Southern, Thameslink and Great Northern. On a ${h.gbp(22.5)} single, an 18-minute delay pays ${h.gbp(h.pay(ID, 'single', 22.5, 18))}, 35 minutes pays ${h.gbp(h.pay(ID, 'single', 22.5, 35))} and an hour or more pays the whole fare. A return is worth ${h.share(b[0].ret)} of its price per leg in the first band, rising to all of it when one leg is ${h.num(b[3].from)} minutes late. There is no automatic claim on Gatwick Express tickets in the terms read, so every traveller claims within ${h.num(o.deadlineDays)} days. Payment is by ${and(o.payment)}, and the choice cannot be changed once the claim is sent.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Can I claim Gatwick Express Delay Repay if I live abroad?', a: `Yes. The scheme is about the journey, not where you live. Among the payment options Gatwick Express offers, PayPal only needs an account and the email address linked to it, and the money must be collected within 30 days of being paid. Claim within ${h.num(o.deadlineDays)} days of the trip, with a photo of the ticket or its booking reference.` },
        { q: 'I missed my flight because Gatwick Express was late: what can I get?', a: 'Delay Repay gives back part or all of the fare, according to the minutes late at Gatwick. It does not pay for the flight. A loss like that can only be asked of the operator separately, by showing that the service was not provided with reasonable care and skill; the Gatwick Express page speaks of recovering up to the price of the ticket on that ground.' },
        { q: 'Does Gatwick Express publish a Flexi Season divisor?', a: `No. Its page lists weekly, monthly, quarterly, six-monthly and annual seasons, valued as ${h.num(o.season!.divisors.weekly!)}, ${h.num(o.season!.divisors.monthly!)} and ${h.num(o.season!.divisors.annual!)} journeys for the weekly, monthly and annual tickets, but gives no rule for Flexi. If you hold one, the claim form works out the value; the calculator here cannot.` },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const s = o.season!;
      const r = h.orr(o.orr);
      const own = h.P.ownership.find((x) => x.operator === 'Govia Thameslink Railway')!;
      return `
<h2>Late into the airport, or late back to Victoria</h2>
<p>The delay is measured at the station on your ticket. Heading out, that is Gatwick Airport; coming back, it is Victoria. Leaving late does not matter if the train makes up time and arrives within ${h.num(h.threshold(o) - 1)} minutes of the timetable. The table applies the bands to a ${h.gbp(22.5)} airport single.</p>
${h.table(['Minutes late', 'Share of a single', `On ${h.gbp(22.5)}`, 'Share of a return, per leg'], h.bandRows(ID, 22.5), `Gatwick Express bands, read on its ${h.src('op_gatwick_express_1', 'Delay Repay compensation page')}.`, ['l', 'r', 'r', 'r'])}
<p>Air travellers often buy a return and use the second half a week or two later. Each leg is a separate claim with its own ${h.num(o.deadlineDays)} days, counted from the day it was travelled.</p>
<!--tool:mini:returnlegs|{"op":"gatwick-express","price":42}-->

<h2>Claiming without an account</h2>
<p>An online account stores your details and opens the e-voucher option, but it is not required. You need proof of travel: the original paper ticket or its receipt, the unique ticket number or an image of an e-ticket or barcode ticket, or, for Oyster and contactless, a print-out of the journey from the TfL account. One image is accepted per claim. The payment choice is final once the claim is sent, and the full list is ${and(o.payment)}. National Rail vouchers issued by the group can be cashed at Gatwick Express, Great Northern, Southern or Thameslink ticket offices, and vouchers last 12 months.</p>
<p>Groups travelling to the airport together can add up to three claims in one submission, copying the journey details, as long as each claim carries a different ticket. The page says claims for others are accepted for children or in mitigating circumstances.</p>

<h2>Seasons on the airport line</h2>
<p>Commuters between Victoria and Gatwick, or onwards, value one journey by dividing the season price: ${h.num(s.divisors.weekly!)} for a weekly, ${h.num(s.divisors.monthly!)} for a monthly and ${h.num(s.divisors.annual!)} for an annual season, with quarterly and six-monthly seasons pro rata. The bands then give ${h.share(o.bands[0].season)}, ${h.share(o.bands[1].season)} and ${h.share(o.bands[2].season)} of one journey, and two journeys from ${h.num(o.bands[3].from)} minutes. An annual season of ${h.gbp(3600)} is worth ${h.gbp(h.pay(ID, 'annual', 3600, 60))} for a delay of an hour.</p>

<h2>Limits of what was read</h2>
<p>${o.notes.join(' ')} The Gatwick Express page also carries a paragraph naming Thameslink as the company that checks claims, a sign that the four brands share their text; the rules on it are the same as on the Southern and Thameslink pages. ${o.automatic ? '' : 'No automatic claim route is described for Gatwick Express tickets, unlike the Key Smartcard sign-up of its sister brands.'}</p>

<h2>Ownership and claim statistics</h2>
<p>Gatwick Express has been run in ${h.src('gov_gbr', 'public ownership')} since ${h.date(own.date)} as part of Govia Thameslink Railway. The ORR does not report it separately: the group, with ${h.a('op-southern', 'Southern')} and its other brands, approved ${h.pc(r.last!.approvedPct!, 1)} of the claims it closed in ${h.ORR.lastYear.label}, and ${h.pc(r.current!.approvedPct!, 1)} in the provisional figures for ${h.ORR.current.label} (${h.src('orr_4410', 'ORR Table 4410')}). Arriving from Heathrow instead? The ${h.a('op-heathrow-express', 'Heathrow Express page')} explains why that line sits outside Delay Repay.</p>`;
    },
  },
});
