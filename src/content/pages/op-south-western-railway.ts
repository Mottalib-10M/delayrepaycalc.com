import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const ID = 'south-western-railway';
const or = (xs: string[]) => (xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} or ${xs[xs.length - 1]}`);
const since = (h: Helpers) => h.date(h.P.ownership.find((x) => x.operator === 'South Western Railway')!.date);

export default definePage({
  id: 'op-south-western-railway',
  group: 'operators',
  order: 122,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 28.5, delay: 18 } },
  mini: { kind: 'mini:returnlegs', props: { op: ID } },
  related: ['delay-repay-15-minutes', 'delay-repay-return-ticket', 'how-to-claim-delay-repay', 'op-southeastern', 'op-gwr'],
  sources: ['op_south_western_railway_1', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'south-western-railway-delay-repay',
    nav: 'South Western Railway',
    card: 'SWR compensation out of Waterloo: Delay Repay 15 bands, Automated Delay Repay on Touch smartcards, season holders who abandon a journey, and Island Line.',
    title: 'South Western Railway Delay Repay: Bands, ADR and Seasons',
    description: 'South Western Railway Delay Repay from 15 minutes: bands for each ticket, Automated Delay Repay with Touch and Tap2Go, seasons and abandoned journeys.',
    h1: 'South Western Railway Delay Repay: claims, automatic claims and seasons',
    intro: 'The calculator above runs South Western Railway\'s bands: put in what you paid and how late you reached your station.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands; const r = h.orr(o.orr);
      return `South Western Railway (SWR) carries passengers out of London Waterloo across Surrey, Hampshire, Dorset and further west, and compensates late arrivals under ${o.scheme}. The ticket you hold sets the base: a single returns ${h.share(b[0].single)} of its price from ${h.num(b[0].from)} minutes late, ${h.share(b[1].single)} from ${h.num(b[1].from)} and all of it from ${h.num(b[2].from)}, while each late leg of a return counts for half those shares until ${h.num(b[3].from)} minutes, when the whole return comes back. Season holders are paid on the value of a single journey, capped at two single journeys for the longest delays. ${o.automatic}. Claims are due within ${h.num(o.deadlineDays)} days of travel. SWR was the first operator moved into public ownership, on ${since(h)}. In ${h.ORR.lastYear.label}, the Office of Rail and Road recorded ${h.num(r.last!.received)} claims to SWR and an approval rate of ${h.pc(r.last!.approvedPct!, 1)}.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'My South Western Railway season journey was abandoned because of disruption: what do I claim?', a: `Season holders cannot get an abandoned journey refund from SWR. Its Delay Repay page tells them to submit a Delay Repay claim instead and, to receive a full day's compensation, to enter it as a delay of ${h.num(o.bands[3].from)} minutes or more. That pays the value of two single journeys on the season.` },
        { q: 'Who can sign up for South Western Railway Automated Delay Repay?', a: 'Two groups only: passengers who bought their season online from SWR and put it on a Touch Smartcard, Tap2Go included, and passengers who bought an Advance ticket on its website. Others claim manually. The email address of the SWR account and of the Delay Repay account must be the same for the link to work.' },
        { q: 'Why has South Western Railway not sent me an automated claim?', a: 'Automated Delay Repay matches your ticket and taps with the running data of the trains. SWR says the match fails in a small number of cases, for example when a tap in or tap out is missing, the ticket data is incomplete, or real-time train information is missing. If no claim arrives, make one yourself; a duplicate created later is caught and handled.' },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const d = o.season!.divisors; const r = h.orr(o.orr);
      return `
<h2>Single, return and season on one page</h2>
<p>The bands below are applied to a ${h.gbp(28.5)} single. A return uses the right-hand column; the return tool on this page adds both legs of a return for you.</p>
${h.table(['Minutes late', 'Single ticket', `Paid on ${h.gbp(28.5)}`, 'Return, each late leg'], h.bandRows(ID, 28.5), 'South Western Railway Delay Repay.', ['l', 'r', 'r', 'r'])}
<p>For seasons, SWR's own table is written as a share of the cost of a return journey, which is the same as a share of a single journey doubled. A single journey is ${h.num(1)}/${h.num(d.weekly!)} of a weekly, ${h.num(1)}/${h.num(d.flexi!)} of a Flexi, ${h.num(1)}/${h.num(d.monthly!)} of a monthly and ${h.num(1)}/${h.num(d.annual!)} of an annual. With an annual season of ${h.gbp(5400)}, a ${h.num(30)}-minute delay pays ${h.gbp(h.pay(ID, 'annual', 5400, 30))} and a delay of two hours or more pays ${h.gbp(h.pay(ID, 'annual', 5400, 120))}, the most a single day can bring.</p>

<h2>Automated Delay Repay in practice</h2>
<p>ADR has to be switched on: select it in your Delay Repay account, choose your payment method and save your usual journey. Then tap in and out each time. When a delay is detected, SWR emails you to say it believes you were delayed; the claim sits in your Delay Repay account for you to approve, amend if the amount looks wrong, or decline if you were not on that train. For Tap2Go, the value can take up to seven days to finalise, because the fare depends on the travel actually made.</p>
<p>The payment options listed for SWR claims are ${or(o.payment)}.</p>

<h2>Delay Repay or a refund?</h2>
<p>SWR draws the line clearly. Claim Delay Repay if you started the journey by train and finished it another way, or travelled at least part of it and reached your destination later than the advertised timetable. Ask for a refund instead if disruption made you give up the trip, gave up and went back to your starting station, or hold an unused daily ticket; that request has to reach SWR no later than ${h.num(h.N.refundNotifyDays)} days after the ticket expired.</p>

<h2>Proof for manual claims</h2>
<ul>
<li>Tickets from another retailer: a copy of the ticket or the eTicket reference. Order references from third parties are not accepted.</li>
<li>Oyster and contactless: a journey statement from the TfL website. A card statement without the time or the journey on it will not be accepted.</li>
<li>Seasons: a copy of the matching photocard with every claim.</li>
<li>A lost ticket: a receipt that shows the journey.</li>
</ul>
<p>Claims for losses beyond the fare go through the Consumer Rights Act route, assessed case by case; SWR aims to answer them within 20 working days.</p>

<h2>Island Line, ownership and claim figures</h2>
<p>${o.notes.join(' ')} No separate compensation page for it was found. The company has been publicly owned since ${since(h)}, the first transfer on the ${h.src('gov_gbr', 'GOV.UK public ownership page')}. ${h.src('orr_4410', 'ORR figures')}: in ${h.ORR.lastYear.label}, ${h.num(r.last!.closed)} claims closed, ${h.pc(r.last!.approvedPct!, 1)} approved and ${h.pc(r.last!.within20Pct!, 1)} closed within 20 working days. For ${h.ORR.current.label}, provisional: ${h.num(r.current!.received)} received, ${h.pc(r.current!.approvedPct!, 1)} approved. The ${h.src('nrcot', 'Conditions of Travel')} remain the minimum: ${h.pc(h.N.minPct)} of the fare from ${h.num(h.N.minDelay)} minutes.</p>
<!--tool:mini:orrstats|{"op":"south-western-railway"}-->`;
    },
  },
});
