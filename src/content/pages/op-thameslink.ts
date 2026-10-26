import { definePage } from '../../lib/guide-types';

const ID = 'thameslink';
const and = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}` : xs[0] ?? '');

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 125,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 34.5, delay: 41 } },
  mini: { kind: 'mini:returnlegs', props: { op: ID } },
  related: ['op-southern', 'op-great-northern', 'delay-repay-return-ticket', 'how-to-claim-delay-repay'],
  sources: ['op_thameslink_1', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'thameslink-delay-repay',
    nav: 'Thameslink',
    card: 'Thameslink trains cross London from north to south: what a late arrival pays, how a return is split, who to claim from on a mixed journey, and the charity option.',
    title: 'Thameslink Delay Repay: Amounts, Returns and Claims',
    description: 'Thameslink Delay Repay from 15 minutes late: the amount for your single or return, who to claim from on a mixed trip, payment choices and the time limit.',
    h1: 'Thameslink Delay Repay',
    intro: 'Type your Thameslink fare and how late you reached your destination: the calculator above, locked on Thameslink, gives the band and the amount.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands;
      const own = h.P.ownership.find((x) => x.operator === 'Govia Thameslink Railway')!;
      return `Thameslink Delay Repay compensates any journey that ends ${h.num(h.threshold(o))} minutes or more late because of a delay or cancellation to a Thameslink train. The share of the fare grows with the delay: ${h.share(b[0].single)} of a single from ${h.num(b[0].from)} minutes, ${h.share(b[1].single)} from ${h.num(b[1].from)} and all of it from ${h.num(b[2].from)}. A ${h.gbp(34.5)} single that reaches its station 41 minutes late gives back ${h.gbp(h.pay(ID, 'single', 34.5, 41))}. On a return, each late leg is worth a share of the return fare, ${h.share(b[1].ret)} at ${h.num(b[1].from)} minutes for instance, and a delay of ${h.num(b[3].from)} minutes or more returns the whole ticket. Seasons are valued per journey, with the divisors of the Govia Thameslink Railway group, now publicly owned since ${h.date(own.date)}. Claims must be sent within ${h.num(o.deadlineDays)} days, online or by post, and the money comes by ${and(o.payment)}, the last of these through a partnership with two charities.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'My Thameslink train was late but I started on another operator: who pays?', a: 'Claim from the company whose train caused the delay. Thameslink states that a journey using several operators cannot be claimed from all of them. If the Thameslink leg was on time and you were late because an earlier train ran late, the claim goes to that earlier operator. A through ticket covers missed connections when you left the timetabled connection time.' },
        { q: 'How much is a Thameslink return worth if both legs were late?', a: `Each leg is claimed and the two shares are added, up to the price of the ticket. With Thameslink, a 35-minute outward delay and a 20-minute return delay on a ${h.gbp(60)} return give ${h.gbp(h.pay(ID, 'return', 60, 35, 20))}. A single leg of ${h.num(o.bands[3].from)} minutes or more already returns the whole fare, so a second claim then adds nothing.` },
        { q: 'Can I give my Thameslink Delay Repay to charity?', a: 'Yes. Thameslink offers a donation option on the claim form, in partnership with Samaritans and Railway Children. It says the full amount raised by passengers goes to the two charities. You claim exactly as for a payment and select the charity instead of a bank transfer, PayPal or voucher.' },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const s = o.season!; const b = o.bands;
      const r = h.orr(o.orr);
      return `
<h2>A cross-London route, and the right company to claim from</h2>
<p>Thameslink trains run through central London, linking Bedfordshire, Hertfordshire and Cambridgeshire with the south coast and Kent. Many passengers board or leave them in the middle of a longer trip that also uses the Underground or another train company. That makes the first question practical: was the late train a Thameslink one? Thameslink's ${h.src('op_thameslink_1', 'Delay Repay page')} says to claim only from the operator responsible for the original delay. The delay is measured at the destination on your ticket, so a short late running on Thameslink that made you miss a connection can still add up to a full band at the end.</p>
<p>Under the ${h.src('nrcot', 'National Rail Conditions of Travel')}, a claim sent to the wrong company is passed on rather than refused, but sending it to the right one first saves time. Thameslink asks you to wait until you have arrived before claiming, so that the minutes you enter match the real arrival.</p>

<h2>Returns, one leg at a time</h2>
<p>The return fare covers two journeys, and the bands apply to each leg in turn. The table shows what a ${h.gbp(60)} Thameslink return pays depending on which legs were late; the calculator above and the return tool give the same result for your own fare.</p>
${h.table(['Outward', 'Return', 'Paid', 'Share of the fare'], [
  ['18 min', 'on time', h.gbp(h.pay(ID, 'return', 60, 18)), h.share(h.shareAt(ID, 18, 'return'))],
  ['47 min', 'on time', h.gbp(h.pay(ID, 'return', 60, 47)), h.share(h.shareAt(ID, 47, 'return'))],
  ['70 min', '25 min', h.gbp(h.pay(ID, 'return', 60, 70, 25)), h.share(Math.min(1, h.shareAt(ID, 70, 'return') + h.shareAt(ID, 25, 'return')))],
  ['130 min', 'on time', h.gbp(h.pay(ID, 'return', 60, 130)), h.share(h.shareAt(ID, 130, 'return'))],
], `Thameslink bands applied to a ${h.gbp(60)} return. Thameslink words the return rule as a share of "the affected portion".`, ['l', 'l', 'r', 'r'])}
<p>The cap matters on open returns. Thameslink pays a delay of ${h.num(b[3].from)} minutes or more only once a day, and the whole fare is the most a ticket can earn, so a return travelled over two days still gets one long-delay claim.</p>

<h2>Seasons and Flexi</h2>
<p>Thameslink values a season journey by dividing its price: ${h.num(s.divisors.weekly!)} journeys in a weekly season, ${h.num(s.divisors.monthly!)} in a monthly one and ${h.num(s.divisors.annual!)} in an annual one, with Flexi Season tickets divided by ${h.num(s.divisors.flexi!)}. A monthly season at ${h.gbp(480)} is worth ${h.gbp(480 / s.divisors.monthly!)} a journey, so a 32-minute delay pays ${h.gbp(h.pay(ID, 'monthly', 480, 32))}. Two hours or more pays two journeys, a full day of travel.</p>

<h2>Payment, donation and the post</h2>
<p>The online form offers ${and(o.payment)}. Thameslink partners with Samaritans and Railway Children for the donation option, chosen in place of a payment. A paper form can be posted, but it cannot carry bank details, so electronic payments need the online route. ${o.automatic ? `Automatic claims are available to ${o.automatic.charAt(0).toLowerCase()}${o.automatic.slice(1)}.` : ''}</p>

<h2>How the group handles claims</h2>
<p>Thameslink belongs to Govia Thameslink Railway, which also runs ${h.a('op-southern', 'Southern')}, ${h.a('op-great-northern', 'Great Northern')} and ${h.a('op-gatwick-express', 'Gatwick Express')} and passed into ${h.src('gov_gbr', 'public ownership')}. The ORR publishes one line for the whole group, so the figures here are not Thameslink's alone.</p>
<!--tool:mini:orrstats|{"op":"thameslink"}-->
<p>Across ${h.ORR.lastYear.label}, ${h.pc(r.last!.within20Pct!, 1)} of the group's closed claims were dealt with inside 20 working days and ${h.pc(r.last!.approvedPct!, 1)} were approved. The provisional figures for ${h.ORR.current.label} give ${h.pc(r.current!.approvedPct!, 1)} approved so far. If your claim is refused, the ${h.a('how-to-claim-delay-repay', 'claim guide')} explains how to ask for a review before going to the Rail Ombudsman.</p>`;
    },
  },
});
