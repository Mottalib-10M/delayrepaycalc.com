import { definePage } from '../../lib/guide-types';

const ID = 'great-northern';
const and = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}` : xs[0] ?? '');

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 110,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 27.8, delay: 33 } },
  mini: { kind: 'mini:deadline', props: { op: ID } },
  related: ['op-thameslink', 'op-lner', 'delay-repay-time-limit', 'delay-repay-amounts'],
  sources: ['op_great_northern_1', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'great-northern-delay-repay',
    nav: 'Great Northern',
    card: 'Great Northern season holders and day travellers: the value of each late journey, the proof the form accepts and the last day to claim each one.',
    title: 'Great Northern Delay Repay: Seasons, Proof and Deadline',
    description: 'Great Northern Delay Repay pays from 15 minutes late. Work out a season journey, see which proof of travel the form takes and the last day to claim each delay.',
    h1: 'Great Northern Delay Repay for commuters and day trips',
    intro: 'Locked on Great Northern, the calculator above turns your fare and the minutes late at your station into the amount and band of its scheme.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands; const s = o.season!;
      return `Great Northern Delay Repay pays when a delay or cancellation to one of its trains makes you arrive ${h.num(h.threshold(o))} minutes or more late. Most of its passengers commute on season tickets, and for them the scheme works per journey: Great Northern treats a monthly season as ${h.num(s.divisors.monthly!)} single journeys, a weekly one as ${h.num(s.divisors.weekly!)} and an annual one as ${h.num(s.divisors.annual!)}, then pays ${h.share(b[0].season)} of one journey from ${h.num(b[0].from)} minutes, ${h.share(b[1].season)} from ${h.num(b[1].from)}, a whole journey from ${h.num(b[2].from)} and two journeys from ${h.num(b[3].from)}. A monthly season costing ${h.gbp(520)} therefore earns ${h.gbp(h.pay(ID, 'monthly', 520, 33))} for a 33-minute delay. A day ticket uses the same steps on the fare paid: ${h.gbp(h.pay(ID, 'single', 27.8, 33))} on a ${h.gbp(27.8)} single in the same case. Every delayed journey has its own limit of ${h.num(o.deadlineDays)} days from the day of travel, which is why regular travellers claim as they go rather than once a month.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'What counts as proof of travel for a Great Northern claim?', a: 'It depends on the ticket. A paper ticket can be shown by the original, its receipt or a photo; a season needs a scan or photo with its photocard. Barcode tickets and e-tickets need the unique ticket number or an image. A Key Smartcard needs its number, and Oyster or contactless journeys need a print-out of the journey history.' },
        { q: 'Is a Great Northern claim for last month still possible?', a: `Only for journeys made in the last ${h.num(o.deadlineDays)} days. The count starts on the day of each delayed journey, not on the day you bought the season or the day you claim. A delay from five weeks ago is outside the limit, and the form will not take it; a late claim can only be asked as a goodwill gesture.` },
        { q: 'Why did Great Northern pay less than I expected on my season?', a: `Usually because the season is valued per journey, not per day. A monthly season is split into ${h.num(o.season!.divisors.monthly!)} journeys, so a 30-minute delay pays half of one of them. Two hours or more pays two journeys, the most Great Northern pays for one day. Check the season type entered on the claim: weekly, monthly and annual tickets use different divisors.` },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const s = o.season!;
      const r = h.orr(o.orr);
      const own = h.P.ownership.find((x) => x.operator === 'Govia Thameslink Railway')!;
      return `
<h2>From Moorgate and King's Cross: a monthly season, priced</h2>
<p>Great Northern runs out of London King's Cross and Moorgate towards Hertfordshire, Cambridge, Peterborough and King's Lynn. Season tickets are its daily business, so the clearest example is a monthly one. The table takes a ${h.gbp(520)} monthly season and shows what one delayed journey pays in each band.</p>
${h.table(['Minutes late', 'Journeys paid', 'Amount'], [
  ['15 to 29', h.share(o.bands[0].season), h.gbp(h.pay(ID, 'monthly', 520, 20))],
  ['30 to 59', h.share(o.bands[1].season), h.gbp(h.pay(ID, 'monthly', 520, 40))],
  ['60 to 119', h.share(o.bands[2].season), h.gbp(h.pay(ID, 'monthly', 520, 75))],
  ['120 or more', h.share(o.bands[3].season), h.gbp(h.pay(ID, 'monthly', 520, 130))],
], `A ${h.gbp(520)} monthly season divided by ${h.num(s.divisors.monthly!)} gives ${h.gbp(520 / s.divisors.monthly!)} a journey. Shares are of one journey; ${h.share(o.bands[3].season)} means two journeys.`, ['l', 'r', 'r'])}
<p>Flexi Season holders follow the same steps with the price divided by ${h.num(s.divisors.flexi!)}. A week with three delays of about 40 minutes on a monthly season adds up to ${h.gbp(Math.round(h.pay(ID, 'monthly', 520, 40) * 3 * 100) / 100)}: small amounts, which is why claiming each one quickly matters.</p>
<!--tool:mini:divisors|{"op":"great-northern","price":520}-->

<h2>Proof of travel the form accepts</h2>
<p>Great Northern's ${h.src('op_great_northern_1', 'Delay Repay compensation page')} lists the evidence it wants for each kind of ticket. Giving the ticket number when you claim online speeds up the check.</p>
<ul>
<li><strong>Paper tickets:</strong> the original, the receipt if the ticket is gone, a scan or photo of a season with its photocard, or a screenshot of the booking showing ticket type, date and cost.</li>
<li><strong>Barcode tickets and e-tickets:</strong> the unique ticket number, or an image of the ticket with the station and date.</li>
<li><strong>Key Smartcard:</strong> the number printed on the front. A smartcard from another company needs its number and the receipt for the ticket loaded on it.</li>
<li><strong>Oyster and contactless:</strong> a print-out of the journey from your TfL account showing where you touched in and out and the fare.</li>
</ul>
<p>The form accepts one image per claim, up to 5MB, so combine several documents into one scan.</p>

<h2>A deadline for every journey</h2>
<p>The limit is ${h.num(o.deadlineDays)} days from the day of each delayed journey. Three delays in one week give three deadlines, and the oldest is the one to watch if you claim them together. The online form takes up to three claims in one submission, each assessed separately, so answers may arrive on different days. Payment is by ${and(o.payment)}; Great Northern also offers the donation to Samaritans or Railway Children described on its page. ${o.automatic ? `Its automatic route is for ${o.automatic.charAt(0).toLowerCase()}${o.automatic.slice(1)}.` : ''}</p>

<h2>Who runs it, and how claims are handled</h2>
<p>Great Northern is one of the four brands of Govia Thameslink Railway, in ${h.src('gov_gbr', 'public ownership')} since ${h.date(own.date)}, alongside ${h.a('op-thameslink', 'Thameslink')}, Southern and Gatwick Express. Because the ORR reports the group as a whole, its statistics describe all four brands together: ${h.num(r.last!.closed)} claims closed in ${h.ORR.lastYear.label}, ${h.pc(r.last!.approvedPct!, 1)} approved and ${h.pc(r.last!.within20Pct!, 1)} closed within 20 working days, then ${h.pc(r.current!.approvedPct!, 1)} approved in the provisional figures for ${h.ORR.current.label} (${h.src('orr_4410', 'ORR Table 4410')}).</p>
<p>Some Great Northern passengers change at Finsbury Park or King's Cross onto other operators, including ${h.a('op-lner', 'LNER')} on the East Coast main line, which pays only from 30 minutes. If the late train was not a Great Northern one, the claim goes to the company that ran it. The ${h.a('delay-repay-time-limit', 'time limit page')} covers what to do once ${h.num(o.deadlineDays)} days have passed.</p>`;
    },
  },
});
