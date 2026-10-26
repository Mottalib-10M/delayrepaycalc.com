import { definePage } from '../../lib/guide-types';

const ID = 'heathrow-express';

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 113,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 25, delay: 45 } },
  mini: { kind: 'mini:returnlegs', props: { op: ID, price: 50, out: 45, back: 0 } },
  related: ['op-elizabeth-line', 'op-gatwick-express', 'op-gwr', 'delay-repay-amounts'],
  sources: ['op_heathrow_express_1', 'nrcot', 'orr_4410', 'cra2015'],
  demarche: true,
  en: {
    slug: 'heathrow-express-delay-compensation',
    nav: 'Heathrow Express',
    card: 'Heathrow Express has its own delay scheme, outside National Rail Delay Repay: a share of the ticket price from 30 minutes late, paid back to your card.',
    title: 'Heathrow Express Delay Compensation: Its Own Scheme',
    description: 'Heathrow Express delay compensation: its own scheme pays a share of the ticket price from 30 minutes late, refunded to a card. Bands, claim steps, time limit.',
    h1: 'Heathrow Express delay compensation',
    intro: 'Locked on Heathrow Express, the calculator above applies its own Conditions of Carriage to your fare and delay.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands; const r = h.orr(o.orr);
      return `Heathrow Express delay compensation follows the company's own Conditions of Carriage, not the Delay Repay schemes of the National Rail train companies. Heathrow Express is not in the list of train companies in Appendix A of the National Rail Conditions of Travel, so the national minimum for a delay of an hour does not apply to it. Its scheme pays nothing below ${h.num(b[0].from)} minutes late at your Heathrow Express destination, ${h.share(b[0].single)} of the price paid for the ticket from ${h.num(b[0].from)} minutes and ${h.share(b[1].single)} from ${h.num(b[1].from)} minutes. There is no band that gives back the whole fare: a ${h.gbp(25)} single that arrives two hours late returns ${h.gbp(h.pay(ID, 'single', 25, 120))}. On a return, the share is of the whole ticket price for a late leg. Claims must be made within ${h.num(o.deadlineDays)} days of the journey, and money goes back to a credit or debit card only. The line is owned by ${o.owner}; the ORR counted ${h.num(r.last!.received)} claims in ${h.ORR.lastYear.label}, with ${h.pc(r.last!.approvedPct!, 1)} of those closed approved.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Why does Heathrow Express not pay Delay Repay from 15 minutes?', a: `Because it is not part of the National Rail schemes. Heathrow Express sets its own rules in its Conditions of Carriage, where a delay of 15 to 29 minutes is listed as not eligible. Compensation starts at ${h.num(o.bands[0].from)} minutes, with a share of the ticket price rather than the band structure of National Rail operators.` },
        { q: 'Can Heathrow Express pay my compensation in cash or by bank transfer?', a: 'No. Its conditions pay refunds to a credit or debit card only, normally to the card used to buy the ticket unless you ask otherwise. If you paid with Oyster or contactless, the payment also goes to a card. Keep the card details at hand when you claim, especially if you were visiting and the card has since changed.' },
        { q: 'Can I claim under the Consumer Rights Act instead of the Heathrow Express scheme?', a: 'Yes. Heathrow Express says its scheme does not limit your other rights, such as those the Consumer Rights Act 2015 gives you where it is at fault, and that you can claim directly under them. You cannot be compensated twice for the same journey, so you choose one route. The Act may suit a claim for losses beyond the fare.' },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const b = o.bands; const r = h.orr(o.orr);
      return `
<h2>A non-stop airport line with its own rules</h2>
<p>Heathrow Express runs non-stop between London Paddington and Heathrow Airport. It shares tracks and stations with the ${h.a('op-elizabeth-line', 'Elizabeth line')} and ${h.a('op-gwr', 'Great Western Railway')}, but not their compensation. The company sets its rules in its ${h.src('op_heathrow_express_1', 'Conditions of Carriage')}, section 6, under the name Heathrow Express Delay Compensation Scheme. The ${h.src('nrcot', 'National Rail Conditions of Travel')} list the train companies they bind in Appendix A, and Heathrow Express is not among them.</p>
<p>The scheme counts the delay in arriving at your Heathrow Express destination, Paddington or the airport, compared with the timetable. The table puts its bands on a ${h.gbp(25)} single.</p>
${h.table(['Minutes late', 'Share of the ticket price', `On ${h.gbp(25)}`], [
  [`under ${h.num(b[0].from)}`, 'not eligible', h.gbp(h.pay(ID, 'single', 25, 20))],
  [h.mins(b[0]), h.share(b[0].single), h.gbp(h.pay(ID, 'single', 25, 45))],
  [h.mins(b[1]), h.share(b[1].single), h.gbp(h.pay(ID, 'single', 25, 90))],
], 'Heathrow Express Conditions of Carriage, section 6.1.', ['l', 'r', 'r'])}
<!--tool:mini:bands|{"op":"heathrow-express","price":25}-->

<h2>How it compares with Delay Repay</h2>
<p>A National Rail Delay Repay 15 operator such as ${h.a('op-gatwick-express', 'Gatwick Express')} pays ${h.share(h.op('gatwick-express').bands[0].single)} of a single from ${h.num(h.op('gatwick-express').bands[0].from)} minutes, ${h.share(h.op('gatwick-express').bands[1].single)} from ${h.num(h.op('gatwick-express').bands[1].from)} and the whole fare from ${h.num(h.op('gatwick-express').bands[2].from)}. Heathrow Express pays less at every step: nothing at 20 minutes, ${h.share(b[0].single)} at 45 and ${h.share(b[1].single)} however long the wait. Its wording also refers to "the price paid for the ticket", so a return with one late leg is compensated on the whole return price at the same share, which the calculator follows. A ${h.gbp(50)} return with a 45-minute outward delay gives ${h.gbp(h.pay(ID, 'return', 50, 45))}. No season ticket rule is published for this scheme.</p>
<p>Two other points from its conditions matter in practice. Advance tickets are neither refundable nor exchangeable if you decide not to travel. And a PREMIER+ Class passenger who had to travel in another class can ask for the difference between the two fares, a separate refund rather than delay compensation.</p>

<h2>Making the claim</h2>
<ol>
<li>Keep the ticket: at gated stations, staff will let you through on sight so that you can keep it as evidence.</li>
<li>Claim on the Heathrow Express website, with a scan or photo of the ticket, or send the ticket copy, journey details, payment details and contact details to its Customer Relations team.</li>
<li>Do it within ${h.num(o.deadlineDays)} days of the journey. Heathrow Express aims to pay within 20 days of receiving the claim, to the card used for the ticket.</li>
</ol>
<p>If you are unhappy with the answer, its conditions say each decision comes with reasons. For a loss bigger than the fare, such as a missed flight, the ${h.src('cra2015', 'Consumer Rights Act 2015')} is one of the other rights its conditions point to.</p>

<h2>Claims handled, and what the document says about itself</h2>
<p>The ORR reports Heathrow Express separately. In ${h.ORR.lastYear.label}, it closed ${h.num(r.last!.closed)} claims, all within 20 working days, and approved ${h.pc(r.last!.approvedPct!, 1)}. The provisional figures for ${h.ORR.current.label} give ${h.pc(r.current!.approvedPct!, 1)} approved (${h.src('orr_4410', 'ORR Table 4410')}).</p>
<p>${o.notes.join(' ')} The PDF read for this page is named for July 2026 and states that it is valid for tickets bought after ${h.date('2026-07-20')}, yet its page footers say "Issue September 2024" and its cover "Issue September 2023". The bands above come from that document; if your ticket was bought under an earlier version, check the conditions printed for it.</p>`;
    },
  },
});
