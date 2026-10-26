import { definePage } from '../../lib/guide-types';

const lc = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);

export default definePage({
  id: 'op-merseyrail',
  group: 'operators',
  order: 119,
  operator: 'merseyrail',
  tool: { kind: 'repay', props: { operator: 'merseyrail', lock: true, ticket: 'single', price: 5.1, delay: 34 } },
  mini: { kind: 'mini:orrstats', props: { op: 'merseyrail' } },
  related: ['op-northern', 'delay-repay-amounts', 'delay-repay-time-limit', 'delay-repay-rejected'],
  sources: ['op_merseyrail_1', 'op_merseyrail_2', 'nrcot', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'merseyrail-delay-compensation',
    nav: 'Merseyrail',
    card: 'Merseyrail does not run Delay Repay: its own scheme repays a full single after half an hour, and seasons earn a share of their price when punctuality falls short.',
    title: 'Merseyrail Delay Compensation: Its Own Rules Explained',
    description: 'Merseyrail delay compensation: a full single or half a return from 30 minutes late on its lines, less on through tickets, season payouts tied to punctuality.',
    h1: 'Merseyrail delay compensation: a scheme of its own',
    intro: 'The calculator above applies Merseyrail’s own rule to a ticket bought for its Northern and Wirral lines: enter the fare and the minutes late.',
    resume: (h) => {
      const o = h.op('merseyrail'); const r = h.orr(o.orr); const b = o.bands[0];
      return `Merseyrail, the electric network of Liverpool and the Wirral, does not use the Delay Repay bands of most train companies. Its own scheme has a single step: if your ticket is for a trip that never leaves the Merseyrail Northern or Wirral line and you arrive ${h.num(b.from)} minutes or more late, you get ${h.share(b.single)} of a single back, or ${h.share(b.ret)} of a return. A ${h.gbp(5.1)} single that is ${h.num(34)} minutes late is therefore refunded in full, ${h.gbp(h.pay('merseyrail', 'single', 5.1, 34))}, while a delay of ${h.num(b.from - 1)} minutes pays nothing at all. Tickets that also cover other lines get a smaller fixed share, and season tickets and Railpasses work on a different principle altogether, a payment after expiry linked to how punctual the network was over their validity. Payment goes back to the method you used to buy the ticket unless you agree another. The pages read give no time limit, so the calculator assumes the national ${h.num(o.deadlineDays)} days. The ORR recorded ${h.num(r.last!.received)} claims to Merseyrail in ${h.ORR.lastYear.label}, ${h.pc(r.last!.approvedPct!, 1)} of those closed being approved.`;
    },
    faqs: (h) => {
      const o = h.op('merseyrail');
      return [
        { q: 'Does Merseyrail pay anything for a 20-minute delay?', a: `No. Merseyrail has no band below ${h.num(h.threshold(o))} minutes, unlike operators on the Delay Repay 15 scale. A shorter delay earns nothing under its scheme. If the delay grows past that point at your destination station, a single ticket wholly on its network is refunded in full. A delay on a connecting train run by another company is claimed from that company under its own rules.` },
        { q: 'How do Merseyrail season ticket holders get compensation?', a: 'Not per journey. Merseyrail compares its average performance with the targets in its Passenger Charter over the period your season or Railpass covered, and pays a share of the ticket price if it fell short. You wait until the ticket has expired, then claim with proof of purchase or your MetroCard number. Its page says such claims are processed and paid within 20 days.' },
        { q: 'Can I get a Merseyrail refund at the station if my train is cancelled?', a: 'Yes. If your train was late or cancelled and you give up the trip, take the ticket back to the ticket office where you bought it before leaving the station. You are refunded in full by the method you paid with. If you did not get it there, Merseyrail has an online claim form. No administration charge applies to refunds caused by delays or cancellations.' },
      ];
    },
    body: (h) => {
      const o = h.op('merseyrail'); const r = h.orr(o.orr); const b = o.bands[0];
      return `
<h2>One threshold instead of four bands</h2>
<p>Most operators pay a quarter, a half or the whole fare depending on how late you are. Merseyrail has one line in the sand: ${h.num(b.from)} minutes. Below it, nothing; from it, the full single or ${h.share(b.ret)} of a return. Because Merseyrail fares are short-distance and modest, the amounts are small, but the rule is generous for those who cross the threshold.</p>
${h.table(['Ticket', 'Delay', 'Share', 'Example'], [
  ['Single, Merseyrail only', `${h.num(b.from)} min or more`, h.share(b.single), h.gbp(h.pay('merseyrail', 'single', 5.1, b.from))],
  ['Return, one leg late', `${h.num(b.from)} min or more`, h.share(b.ret), h.gbp(h.pay('merseyrail', 'return', 7.4, b.from))],
  ['Return, both legs late', `${h.num(b.from)} min or more each`, h.share(Math.min(1, b.ret * 2)), h.gbp(h.pay('merseyrail', 'return', 7.4, b.from, b.from))],
  ['Any ticket', `under ${h.num(b.from)} min`, h.share(0), h.gbp(0)],
], `Examples on a ${h.gbp(5.1)} single and a ${h.gbp(7.4)} return, from Merseyrail’s ${h.src('op_merseyrail_1', 'single and return compensation page')}.`, ['l', 'l', 'r', 'r'])}
<!--tool:mini:returnlegs|{"op":"merseyrail","price":7.4,"out":35,"back":0}-->

<h2>Tickets that go beyond the Merseyrail network</h2>
<p>A through ticket bought for a journey that continues beyond the Northern and Wirral lines is not covered by the full-refund rule. When you are delayed on Merseyrail with such a ticket, the scheme pays a smaller fixed share of the price. As recorded in our data, Merseyrail ${lc(o.notes[0])} The calculator does not apply that reduced share, so for these tickets the figure it shows is an upper bound.</p>

<h2>Seasons and Railpasses: paid on punctuality</h2>
<p>Commuters on monthly or longer tickets are not compensated delay by delay. Instead, once the ticket has expired, Merseyrail looks at its average performance against the targets in its charter over the validity of the ticket. The rule in our data reads: ${lc(o.notes[1])} The current figures are published at stations and online, and the claim is made with a form, attaching proof of purchase or quoting the MetroCard number for a ticket bought at a station. Because no per-journey value exists, the season tools on this site do not cover Merseyrail.</p>

<h2>Timetable of the day and replacement buses</h2>
<p>Delays are measured on the timetable in force on the day you travel. When a replacement timetable is in place, it becomes the reference, and a journey on a rail replacement bus is measured the same way: actual arrival against the arrival in that day's timetable. Claims for other costs caused by a delay are limited to the price of the ticket, although Merseyrail may consider exceptional cases at its discretion if you write with receipts.</p>

<h2>Limits of what we read, and who runs it</h2>
<p>Merseyrail's help pages refused automated reading, so its rules come from archived copies of its ${h.src('op_merseyrail_1', 'single and return page')} and ${h.src('op_merseyrail_2', 'season and Railpass page')}. ${o.notes[2]} The single and return page speaks both of 30 minutes or more and of more than half an hour; the calculator counts a delay of exactly ${h.num(b.from)} minutes as eligible. The network is a ${lc(o.owner)}, separate from the public ownership programme for English franchises. On the ORR figures for ${h.ORR.current.label} so far, Merseyrail received ${h.num(r.current!.received)} claims and approved ${h.pc(r.current!.approvedPct!, 1)}, with ${h.pc(r.current!.within20Pct!, 1)} closed within 20 working days (${h.src('orr_4410', 'ORR Table 4410')}). For the wider region, the ${h.a('op-northern', 'Northern page')} covers the regional trains that run beyond the Merseyrail network.</p>`;
    },
  },
});
