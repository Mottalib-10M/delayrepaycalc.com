import { definePage } from '../../lib/guide-types';

const ID = 'southern';
const and = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}` : xs[0] ?? '');

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 124,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 28, delay: 22 } },
  mini: { kind: 'mini:divisors', props: { op: ID } },
  related: ['op-thameslink', 'op-gatwick-express', 'op-great-northern', 'delay-repay-15-minutes', 'delay-repay-time-limit'],
  sources: ['op_southern_1', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'southern-delay-repay',
    nav: 'Southern',
    card: 'Southern pays from 15 minutes late: its bands priced on a real fare, the 464-journey rule for seasons, the payment options and the Key Smartcard route.',
    title: 'Southern Delay Repay: Bands, Seasons and Claim Rules',
    description: 'Southern Delay Repay pays from 15 minutes late at your destination. See what your single, return or season is worth, how Southern pays and the 28-day limit.',
    h1: 'Southern Delay Repay: what a late train is worth',
    intro: 'The calculator above is set to Southern: change the fare, the ticket and the minutes late at your destination to see the amount its bands give.',
    resume: (h) => {
      const o = h.op(ID); const b = o.bands; const s = o.season!;
      const own = h.P.ownership.find((x) => x.operator === 'Govia Thameslink Railway')!;
      const r = h.orr(o.orr);
      return `Southern Delay Repay starts paying when you reach your destination ${h.num(h.threshold(o))} minutes or more behind the timetable, whatever caused the delay. A single ticket earns ${h.share(b[0].single)} of its price from ${h.num(b[0].from)} minutes, ${h.share(b[1].single)} from ${h.num(b[1].from)} minutes and the whole fare from ${h.num(b[2].from)} minutes, so a ${h.gbp(28)} single that arrives 22 minutes late is worth ${h.gbp(h.pay(ID, 'single', 28, 22))} and the same trip 64 minutes late is worth ${h.gbp(h.pay(ID, 'single', 28, 64))}. On a return, each late leg counts for half the fare, and a delay of ${h.num(b[3].from)} minutes or more gives the whole return back. Season tickets are valued per journey: Southern divides an annual season by ${h.num(s.divisors.annual!)} and a weekly one by ${h.num(s.divisors.weekly!)}. Claims must reach Southern within ${h.num(o.deadlineDays)} days of the journey. Southern has been in public ownership since ${h.date(own.date)}, inside Govia Thameslink Railway, and the ORR reports that group as one: ${h.pc(r.last!.approvedPct!, 1)} of its closed claims were approved in ${h.ORR.lastYear.label}.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Can I make more than one Southern Delay Repay claim in the same day?', a: `Yes, as long as each claim is for a different journey or ticket. What Southern limits is the two-hour band: it pays a delay of ${h.num(o.bands[3].from)} minutes or more only once a day, because that band already returns a full day of travel. On an open return used over two days, that still means a single long-delay claim.` },
        { q: 'Does Southern accept claims for children travelling with me?', a: 'Southern expects each traveller to claim for their own ticket, but it accepts claims for a child or in other mitigating circumstances. Its online form lets you add up to three claims in one go and copy the journey details from the first. Each ticket must be different, or the duplicate is refused.' },
        { q: 'Which payment should I pick on a Southern claim?', a: `Choose carefully, because Southern says the option cannot be changed once the claim is sent. It offers ${and(o.payment)}. Cashable vouchers issued by Southern can be exchanged for money at ticket offices of the four sister brands. A failed bank or PayPal payment is replaced by a voucher sent by post.` },
        { q: 'Does Southern Delay Repay work with a Key Smartcard season?', a: 'Yes. Give the Key Smartcard number on the form and the season held on it is valued per journey like a paper season. If you register the card and sign up for Auto Delay Repay in your account, Southern says claiming becomes simpler, because it can find the delayed journeys on the card for you.' },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const s = o.season!; const b = o.bands;
      const r = h.orr(o.orr);
      return `
<h2>Four bands, priced on a Southern single</h2>
<p>Southern runs the commuter and coastal services south of London, to Brighton, the Sussex coast and Gatwick Airport, and it uses the Delay Repay 15 scheme shared by its sister brands. The minutes that count are those at the station printed on your ticket, not at the end of the train's route. The table applies Southern's bands to a ${h.gbp(28)} single.</p>
${h.table(['Minutes late', 'Share of a single', `On ${h.gbp(28)}`, 'Share of a return, per leg'], h.bandRows(ID, 28), `Southern bands, read on its ${h.src('op_southern_1', 'Delay Repay compensation page')}.`, ['l', 'r', 'r', 'r'])}
<p>The top band is where a return changes most. Below two hours, a late outward leg pays at most ${h.share(b[2].ret)} of the return fare; from ${h.num(b[3].from)} minutes, the whole ticket comes back. Southern's own wording says the share for a return applies to "the affected portion", which this site reads as half of the return fare.</p>
<!--tool:mini:bands|{"op":"southern","price":28}-->

<h2>Season tickets: the 464 rule and the daily cap</h2>
<p>For a season, Southern does not use the price of a day ticket. It works out what one single journey on your season is worth by dividing the price: an annual season covers ${h.num(s.divisors.annual!)} journeys, a monthly one ${h.num(s.divisors.monthly!)} and a weekly one ${h.num(s.divisors.weekly!)}, and a Flexi Season is divided by ${h.num(s.divisors.flexi!)}. Its page adds six-monthly and quarterly figures on the same basis. An annual season of ${h.gbp(4200)} is therefore worth ${h.gbp(Math.round((4200 / s.divisors.annual!) * 100) / 100)} a journey, and a 35-minute delay on it pays ${h.gbp(h.pay(ID, 'annual', 4200, 35))}.</p>
<p>From ${h.num(b[3].from)} minutes, a season holder gets two journeys, the value of a full day of travel: ${h.gbp(h.pay(ID, 'annual', 4200, 125))} on that annual season. That is also the most Southern pays for one day, so a second long delay on the way home adds nothing. Commuters who are often late should claim each journey on its own, since each one has its own ${h.num(o.deadlineDays)}-day limit.</p>

<h2>How the money reaches you</h2>
<p>The online form lists ${and(o.payment)}. A few details from Southern's page are worth knowing before you choose:</p>
<ul>
<li>A PayPal payment must be collected within 30 days, and the email address given must be the one linked to your PayPal account.</li>
<li>National Rail vouchers and e-vouchers are valid for 12 months; e-vouchers sit in your online account and cannot be exchanged.</li>
<li>Claims by post are accepted, but bank details cannot be sent by post, so the payment choice is narrower.</li>
<li>The form takes one image per claim, so scan several documents into a single file.</li>
</ul>
<p>Southern says it replies within 20 working days and usually much sooner outside periods of disruption. It also asks you to claim only once you have arrived, so that the delay you enter matches the real arrival time.</p>

<h2>Automatic claims with the Key</h2>
<p>${o.automatic ? `Southern's automatic route is open to ${o.automatic.charAt(0).toLowerCase()}${o.automatic.slice(1)}.` : ''} Other tickets, paper or e-ticket, go through the form with the ticket number or a photo of the ticket. Pay as you go journeys on Oyster or contactless need a print-out of the journey history from the TfL account, showing where you touched in and out and the fare charged.</p>

<h2>One group, four brands, one set of figures</h2>
<p>Southern, ${h.a('op-thameslink', 'Thameslink')}, ${h.a('op-great-northern', 'Great Northern')} and ${h.a('op-gatwick-express', 'Gatwick Express')} are run by Govia Thameslink Railway, now under ${h.src('gov_gbr', 'public ownership')}. The Office of Rail and Road reports the group, not each brand, so the figures below cover all four. In ${h.ORR.lastYear.label}, the group received ${h.num(r.last!.received)} claims, approved ${h.pc(r.last!.approvedPct!, 1)} of those closed and closed ${h.pc(r.last!.within20Pct!, 1)} within 20 working days. For ${h.ORR.current.label}, the provisional figures for the first ${h.num(h.ORR.current.periods.length)} periods show ${h.pc(r.current!.approvedPct!, 1)} approved (${h.src('orr_4410', 'ORR Table 4410')}).</p>
<p>If your journey used more than one operator, claim only from the one that caused the delay; Southern's page says you cannot claim from every company on the route. A missed connection is covered when you held a through ticket and left the connection time the timetable allows. The ${h.a('delay-repay-15-minutes', '15-minute threshold page')} compares Southern with operators that only pay from 30 minutes.</p>`;
    },
  },
});
