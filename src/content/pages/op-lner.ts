import { definePage } from '../../lib/guide-types';

const ID = 'lner';

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 115,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 78, delay: 64 } },
  mini: { kind: 'mini:deadline', props: { op: ID } },
  related: ['delay-repay-return-ticket', 'automatic-delay-repay', 'op-lumo', 'op-hull-trains', 'op-grand-central'],
  sources: ['op_lner_1', 'op_lner_2', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'lner-delay-repay',
    nav: 'LNER',
    card: 'LNER compensates from 30 minutes late on the East Coast Main Line: what each band pays, how One-click Delay Repay works and how returns are read.',
    title: 'LNER Delay Repay: 30-Minute Bands and One-click Claims',
    description: 'LNER Delay Repay starts at 30 minutes late, not 15. See what each band pays on singles, returns and seasons, how One-click claims work and its claim record.',
    h1: 'LNER Delay Repay',
    intro: 'This calculator is fixed on LNER: type what you paid and how late you reached your station to see the band and the amount its terms give.',
    resume: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr);
      return `LNER, the East Coast operator between London King's Cross, Yorkshire, the North East and Edinburgh, runs ${o.scheme}: nothing is paid for a delay under ${h.num(h.threshold(o))} minutes, which sets it apart from the many companies that start at 15. From ${h.num(o.bands[0].from)} to ${h.num(o.bands[0].to ?? 0)} minutes late, a single earns ${h.share(o.bands[0].single)} of its price; from ${h.num(o.bands[1].from)} minutes the whole single comes back. On a return, its page speaks of the "relevant portion" of the ticket; read as half the return fare, that gives ${h.share(o.bands[0].ret)} and then ${h.share(o.bands[1].ret)} of the return per late leg, and from ${h.num(o.bands[2].from)} minutes the whole return. A ${h.gbp(78)} single arriving 64 minutes late returns ${h.gbp(h.pay(ID, 'single', 78, 64))}. Claims are due within ${h.num(o.deadlineDays)} days of travel. LNER is in public ownership, run by the government's DfT Operator, and in ${h.ORR.lastYear.label} approved ${h.pc(r.last?.approvedPct ?? 0, 1)} of the claims it closed.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Why does LNER pay nothing for a 20-minute delay?', a: `Because LNER uses the Delay Repay 30 scheme, its first band starts at ${h.num(h.threshold(o))} minutes late at your destination. A 20-minute delay falls below it. The National Rail Conditions of Travel only guarantee a minimum from ${h.num(h.N.minDelay)} minutes, so there is no national rule that fills the gap. If a delay with another company caused you to miss an LNER train, that company's own bands may apply instead.` },
        { q: 'How does LNER One-click Delay Repay work?', a: 'If you bought the ticket on the LNER website or app and opted in to One-click Delay Repay, LNER sends an email within 30 minutes of a qualifying delay with a link to claim. Its page says claims are verified quickly and paid within three to five days. Without the opt-in, or with a ticket from another retailer, you fill in the normal form.' },
        { q: 'Can I give my LNER Delay Repay compensation to charity?', a: `Yes. LNER lets you donate a claim to its charity partner, the Campaign Against Living Miserably, known as CALM. You choose this on the claim itself. The pages read for this site do not list the other payment methods in detail, so the payment option is whatever you select on the form when you claim, within the ${h.num(o.deadlineDays)}-day limit.` },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr); const d = o.season!.divisors;
      return `
<h2>Three bands, starting at half an hour</h2>
<p>Long-distance fares on the East Coast can be high, and LNER's scheme is shorter than most: three bands instead of four. A delay of 25 minutes on a King's Cross to Newcastle trip earns nothing, where a company on Delay Repay 15 would already pay a quarter of the single. Once the half hour is passed, the scheme is generous, since the whole single comes back from one hour.</p>
${h.table(['Delay at your station', 'Single', `Example on ${h.gbp(78)}`, 'Return, per late leg'], h.bandRows(ID, 78), `LNER bands, from its ${h.src('op_lner_1', 'Delay Repay page')} and its ${h.src('op_lner_2', "Passenger's Charter of April 2026")}.`, ['l', 'r', 'r', 'r'])}

<h2>Return tickets and the "relevant portion"</h2>
<p>LNER expresses the return bands as a share of the "relevant portion" of the return ticket: half of it from 30 minutes, all of it from 60. It does not say how much of the fare a portion is. This site treats each leg as half the return fare, which is how most operators state it, and the calculator therefore shows ${h.share(o.bands[0].ret)} and ${h.share(o.bands[1].ret)} of the return price. If the form values a leg differently, its figure prevails. From two hours on either leg, the page is explicit: the full cost of the return is paid.</p>
<p>On a ${h.gbp(150)} return with the outward leg 45 minutes late and the way back on time, the reading above gives ${h.gbp(h.pay(ID, 'return', 150, 45, 0))}. If the return leg is also 70 minutes late, the two legs add up to ${h.gbp(h.pay(ID, 'return', 150, 45, 70))}.</p>
<!--tool:mini:returnlegs|{"op":"${ID}","price":150,"out":45,"back":70}-->

<h2>Seasons, Flexi and smartcards</h2>
<p>For a season ticket, LNER first works out the "cost of your single ticket": the price divided by ${h.num(d.weekly ?? 0)} for a weekly, ${h.num(d.flexi ?? 0)} for a Flexi Season, ${h.num(d.monthly ?? 0)} for a monthly and ${h.num(d.annual ?? 0)} for an annual. The single-ticket bands then apply to that value, so an annual season of ${h.gbp(9000)} gives ${h.gbp(h.pay(ID, 'annual', 9000, 40))} for a 40-minute delay and ${h.gbp(h.pay(ID, 'annual', 9000, 75))} for a 75-minute one. Each delayed journey is its own claim with its own ${h.num(o.deadlineDays)}-day limit. Our ${h.a('season-ticket-delay-repay', 'season ticket page')} explains why commuters on Delay Repay 30 routes claim less often but for larger sums.</p>

<h2>Booked direct or elsewhere</h2>
<p>How you claim depends on where the ticket came from. A ticket bought from LNER can be tracked in My Account, and the One-click option removes the form altogether for those who opted in. A ticket from another retailer or train company goes through LNER's separate portal. Either way, the deadline is the same and the claim belongs to LNER only if its train made you late; the ${h.a('how-to-claim-delay-repay', 'step-by-step claim guide')} covers journeys shared with other operators.</p>
<p>On the same line, three open access companies run their own schemes: ${h.a('op-hull-trains', 'Hull Trains')}, ${h.a('op-lumo', 'Lumo')} and ${h.a('op-grand-central', 'Grand Central')}. A ticket valid only on one of them is claimed from that company, not from LNER.</p>

<h2>How LNER handles claims</h2>
<p>According to ${h.src('orr_4410', 'ORR Table 4410')}, LNER received ${h.num(r.last?.received ?? 0)} compensation claims in ${h.ORR.lastYear.label} and closed ${h.pc(r.last?.within20Pct ?? 0, 1)} of them within 20 working days. For ${h.ORR.current.label}, provisional figures for the first ${h.num(h.ORR.current.periods.length)} periods show ${h.num(r.current?.received ?? 0)} claims received and an approval rate of ${h.pc(r.current?.approvedPct ?? 0, 1)}. LNER is listed among the operators already ${h.src('gov_gbr', 'under public ownership')}, run by DfT Operator.</p>`;
    },
  },
});
