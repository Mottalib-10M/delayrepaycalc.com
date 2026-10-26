import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const ID = 'greater-anglia';
const and = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
const since = (h: Helpers) => h.date(h.P.ownership.find((x) => x.operator === 'Greater Anglia')!.date);

export default definePage({
  id: 'op-greater-anglia',
  group: 'operators',
  order: 112,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 42, delay: 48 } },
  mini: { kind: 'mini:orrstats', props: { op: ID } },
  related: ['delay-repay-amounts', 'delay-repay-return-ticket', 'how-to-claim-delay-repay', 'op-c2c'],
  sources: ['op_greater_anglia_1', 'op_greater_anglia_2', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'greater-anglia-delay-repay',
    nav: 'Greater Anglia',
    card: 'Greater Anglia and Stansted Express compensation from 15 minutes late: the bands, the season values, claiming online or by Freepost, and the limits.',
    title: 'Greater Anglia Delay Repay: Stansted Express Included',
    description: 'Greater Anglia Delay Repay, Stansted Express included: shares from 15 minutes late, season journey values, how to send contactless proof and its claim figures.',
    h1: 'Greater Anglia Delay Repay, including Stansted Express',
    intro: 'Type a Greater Anglia or Stansted Express fare and the minutes late: the calculator above uses the bands the two share.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands; const r = h.orr(o.orr);
      return `Greater Anglia, whose trains leave London Liverpool Street for Essex, Suffolk, Norfolk and Cambridgeshire, pays ${o.scheme} on the delay at your destination, measured against the planned, advertised timetable, and states that the reason for the delay does not matter. A single returns ${h.share(b[0].single)} from ${h.num(b[0].from)} minutes, ${h.share(b[1].single)} from ${h.num(b[1].from)} minutes and the full price from ${h.num(b[2].from)} minutes; a return pays ${h.share(b[0].ret)}, ${h.share(b[1].ret)} and ${h.share(b[2].ret)} of its price for one late leg, and all of it from ${h.num(b[3].from)} minutes. Stansted Express, its airport service, sends claims to the same form with the same bands. Seasons are valued at ${h.num(1)}/${h.num(o.season!.divisors.weekly!)} of a weekly, ${h.num(1)}/${h.num(o.season!.divisors.monthly!)} of a monthly and ${h.num(1)}/${h.num(o.season!.divisors.annual!)} of an annual. The limit is ${h.num(o.deadlineDays)} days. Publicly owned since ${since(h)}, it closed ${h.num(r.last!.closed)} claims in ${h.ORR.lastYear.label} and approved ${h.pc(r.last!.approvedPct!, 1)} of them.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Can I claim Stansted Express delays on the Greater Anglia form?', a: `Yes. The Stansted Express help page sends passengers to the Greater Anglia website to claim, and the bands are the same: from ${h.num(h.threshold(o))} minutes late on a one-way ticket, up to the whole fare from ${h.num(o.bands[2].from)} minutes. A claim by post goes to the Freepost Greater Anglia Customer Relations address with the claim form.` },
        { q: 'Does Greater Anglia pay Delay Repay during engineering works?', a: 'Not usually. The Stansted Express page says compensation is not normally offered during pre-planned engineering works or when replacement buses run, and both pages say a claim is not normally accepted if you were told before travelling that there would be a delay. A journey that ran later than the revised timetable of the day can still be claimed.' },
        { q: 'Is there a Greater Anglia divisor for Flexi Season tickets?', a: `None was found in the pages read. Greater Anglia gives the share of a weekly, monthly and annual season that counts as one journey, but says nothing about Flexi Seasons. The calculator therefore cannot value a Flexi journey for this operator; the claim form works out the amount itself, and you can compare it with the ${h.num(h.op('southern').season!.divisors.flexi!)} journeys used by operators such as Southern.` },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const d = o.season!.divisors; const r = h.orr(o.orr);
      return `
<h2>From Liverpool Street to the coast: the scale</h2>
<p>Each band on a single of ${h.gbp(42)}, an example fare out of London. For one late leg of a return, read the last column against the return price.</p>
${h.table(['Delay at your destination', 'Single', `On ${h.gbp(42)}`, 'Return, per late leg'], h.bandRows(ID, 42), 'Greater Anglia and Stansted Express bands.', ['l', 'r', 'r', 'r'])}
<p>The bands are the same on the airport trains: a Stansted Express single of ${h.gbp(21)} that arrives ${h.num(35)} minutes late pays ${h.gbp(h.pay(ID, 'single', 21, 35))}. As everywhere on the network, the delay is counted on arrival, so a late departure that recovers on the way earns nothing.</p>
<!--tool:mini:bands|{"op":"greater-anglia","price":21}-->

<h2>Season holders: a value per journey, and an account</h2>
<p>Greater Anglia uses the proportionate cost of the season ticket: ${h.num(1)}/${h.num(d.weekly!)} of a weekly, ${h.num(1)}/${h.num(d.monthly!)} of a monthly and ${h.num(1)}/${h.num(d.annual!)} of an annual. On an annual of ${h.gbp(6100)}, that is ${h.gbp(6100 / d.annual!)} a journey, and a ${h.num(65)}-minute delay pays ${h.gbp(h.pay(ID, 'annual', 6100, 65))}. Unlike several operators, it does not pay a return journey for delays over two hours on a season: the share stays at one journey.</p>
<p>No automatic scheme appears in the data read, but season holders can open a Delay Repay account so that their details are filled in for each claim, which saves retyping the ticket for every late train.</p>

<h2>Proof that the claim form asks for</h2>
<p>Paper tickets are best photographed before a gate keeps them. If you paid with contactless, attach a TfL contactless statement or a bank statement showing the journey. The Stansted Express page asks claimants to keep full card numbers, card security codes and complete bank details out of the claim: the team contacts you securely if it needs more. Payment options are ${and(o.payment)}, and payments are usually made within 14 days of the claim being approved. Taxis, hotels or missed flights are not part of Delay Repay; the airport service suggests travel insurance for those.</p>

<p>Two warnings from the pages read are worth keeping in mind. Making a claim does not guarantee a payment and does not affect your legal rights, and every relevant section of the form must be completed: a claim with missing times or ticket details is the one most often sent back. Enter the scheduled departure of the train you meant to catch, not the one you finally boarded.</p>

<h2>Sources read, owner and claim statistics</h2>
<p>Greater Anglia's live pages could not be read directly. The figures come from an ${h.src('op_greater_anglia_1', 'archived copy of its Delay Repay page from December 2025')} and an ${h.src('op_greater_anglia_2', 'archived Stansted Express page from September 2026')}. Both describe the same scheme. If the live page now says otherwise, it prevails.</p>
<p>The company returned to public hands on ${since(h)} under the ${h.src('gov_gbr', 'public ownership programme')}. According to the ${h.src('orr_4410', 'Office of Rail and Road')}, it received ${h.num(r.last!.received)} claims in ${h.ORR.lastYear.label} and closed ${h.pc(r.last!.within20Pct!, 1)} within 20 working days. For ${h.ORR.current.label}, the provisional periods show ${h.num(r.current!.received)} claims received and ${h.pc(r.current!.approvedPct!, 1)} approved. Above all of this, the ${h.src('nrcot', 'Conditions of Travel')} guarantee ${h.pc(h.N.minPct)} of the fare from ${h.num(h.N.minDelay)} minutes.</p>`;
    },
  },
});
