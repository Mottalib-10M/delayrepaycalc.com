import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'op-west-midlands-railway',
  group: 'operators',
  order: 128,
  operator: 'west-midlands-railway',
  tool: { kind: 'repay', props: { operator: 'west-midlands-railway', lock: true, ticket: 'single', price: 9.4, delay: 27 } },
  mini: { kind: 'mini:divisors', props: { op: 'west-midlands-railway' } },
  related: ['op-london-northwestern-railway', 'season-ticket-delay-repay', 'delay-repay-15-minutes', 'how-to-claim-delay-repay'],
  sources: ['op_west_midlands_railway_1', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'west-midlands-railway-delay-repay',
    nav: 'West Midlands Railway',
    card: 'West Midlands Railway Delay Repay around Birmingham: Swift and season holders valued on a daily return, extra expenses it may cover and the one-click Advance claim.',
    title: 'West Midlands Railway Delay Repay: Swift, Seasons, Expenses',
    description: 'West Midlands Railway Delay Repay: bands from 15 minutes, Swift and season tickets valued on a daily return, extra costs it may refund and how claims are paid.',
    h1: 'West Midlands Railway Delay Repay around Birmingham',
    intro: 'Working from the West Midlands Railway scale, the calculator above gives the amount for your fare and delay, and the band you fall in.',
    resume: (h) => {
      const o = h.op('west-midlands-railway'); const r = h.orr(o.orr); const b = o.bands; const d = o.season!.divisors;
      const own = h.P.ownership.find((x) => x.operator === 'West Midlands Trains');
      return `West Midlands Railway is the local network of Birmingham and the surrounding counties, and most of its passengers travel on short daily tickets, Swift smartcards or seasons. Its Delay Repay 15 scheme starts paying when you arrive ${h.num(h.threshold(o))} minutes late: on a ${h.gbp(9.4)} single, ${h.num(27)} minutes late gives ${h.gbp(h.pay('west-midlands-railway', 'single', 9.4, 27))}, and from ${h.num(b[2].from)} minutes the whole fare is repaid. What sets it apart is the way seasons are valued. Instead of one single journey, WMR counts a daily travel cost, one return journey per working day: the season price is divided by ${h.num(d.weekly!)} for a weekly, ${h.num(d.monthly!)} for a monthly, ${h.num(d.annual!)} for an annual and ${h.num(d.flexi!)} for a Flexi Season, and each delayed trip earns ${h.share(b[0].season)} to ${h.share(b[3].season)} of that daily cost. Claims must be sent within ${h.num(o.deadlineDays)} days. Since ${h.date(own!.date)}, West Midlands Trains, which runs WMR, has been in public ownership; the ORR reports it as one company with London Northwestern Railway, and approved ${h.pc(r.last!.approvedPct!, 1)} of the claims it closed in ${h.ORR.lastYear.label}.`;
    },
    faqs: (h) => {
      const o = h.op('west-midlands-railway');
      return [
        { q: 'Can West Midlands Railway pay for a taxi or a hotel after a delay?', a: 'It may. Separately from Delay Repay, its Customer Relations team considers reasonable extra expenses caused by a delay or cancellation, case by case, with receipts. Its page mentions alternative transport if your next connection is more than an hour after the one you missed, a night in a hotel if you cannot finish the journey that day, and non-alcoholic refreshments when the delay passes 60 minutes.' },
        { q: 'Is a Swift card covered by West Midlands Railway Delay Repay?', a: 'Yes. West Midlands Railway lists Swift among both its daily tickets and its season products. A daily Swift product is compensated on its price like a paper single or return, and a Swift season on the daily travel cost worked out from the season price. On the form, choose the option for a ticket without a QR code and give the card details it asks for.' },
        { q: 'When does West Midlands Railway pay after approving a claim?', a: `West Midlands Railway says approved claims should be paid within 14 days of the decision. You choose the method on the form: ${o.payment.join(', ')}. Online claimants can give the money to Birmingham Children’s Hospital Charity. A complete, accurate form is processed faster, because missing details mean the team has to contact you.` },
      ];
    },
    body: (h) => {
      const o = h.op('west-midlands-railway'); const r = h.orr(o.orr); const d = o.season!.divisors; const b = o.bands;
      const daily = (p: number, k: 'weekly' | 'monthly' | 'annual') => Math.round((p / d[k]!) * 100) / 100;
      return `
<h2>Daily travel cost: the WMR way of valuing a season</h2>
<p>Most operators turn a season into a value per single journey. West Midlands Railway turns it into the cost of one day's return travel, assuming five working days a week. The arithmetic ends up in the same place for one delayed trip, but it reads differently on the claim, so it helps to see it laid out. For a monthly season of ${h.gbp(118)}:</p>
${h.table(['Delay', 'Share of the daily cost', `Daily cost ${h.gbp(daily(118, 'monthly'))}`, 'Paid'], b.map((x) => [h.mins(x) + ' min', h.share(x.season), h.gbp(daily(118, 'monthly')), h.gbp(h.pay('west-midlands-railway', 'monthly', 118, x.from))]), `Monthly season of ${h.gbp(118)} divided by ${h.num(d.monthly!)} return journeys, per the ${h.src('op_west_midlands_railway_1', 'WMR Delay Repay page')}.`, ['l', 'r', 'r', 'r'])}
<p>An annual season of ${h.gbp(1150)} gives a daily cost of ${h.gbp(daily(1150, 'annual'))}; a delay of ${h.num(b[3].from)} minutes or more refunds the whole of that day. Creating a Delay Repay account lets you store the season details for repeat claims while the ticket is valid.</p>
<!--tool:mini:bands|{"op":"west-midlands-railway","price":9.4}-->

<h2>Daily tickets and what they include</h2>
<p>WMR's daily tickets cover Advance singles, Anytime, Off-Peak and Super Off-Peak singles and returns, AnyTrain, nNetwork One Day and Daytripper tickets, and Swift daily products. All are compensated as a share of the price paid: ${h.share(b[0].single)}, ${h.share(b[1].single)} and ${h.share(b[2].single)} of a single, and half those shares for each late leg of a return until the top band, where one leg refunds ${h.share(b[3].ret)}. ${o.automatic}, so if you booked that way you may receive a claim to confirm rather than one to fill in.</p>

<h2>Rules worth knowing before you claim</h2>
<ul>
<li>One claim per journey. If several operators were involved, claim from the one that caused the first delay or made you miss a connection.</li>
<li>Give the train you planned to catch, not the one you ended up on.</li>
<li>Delays are measured against the advertised timetable, so planned engineering works and replacement buses that were in the timetable usually earn nothing.</li>
<li>The maximum is the price of the ticket, or the daily travel cost for a season.</li>
<li>False details on a claim are treated as fraud under the Fraud Act 2006.</li>
</ul>
<p>On the online form, enter the stations where your whole journey started and finished and the timetabled departure of your first train. When you count the changes, leave out Underground, bus and tram connections. Trains are generally not held for connecting passengers, so a missed connection caused by a WMR train can lead to Delay Repay, a refund or extra expenses depending on what happened.</p>

<h2>A group figure in the ORR statistics</h2>
<p>The Office of Rail and Road does not split WMR from its sister brand: its ${h.src('orr_4410', 'Table 4410')} reports West Midlands Trains as a whole. For that group, ${h.num(r.last!.received)} claims arrived in ${h.ORR.lastYear.label}, ${h.pc(r.last!.approvedPct!, 1)} of closed claims were approved and ${h.pc(r.last!.within20Pct!, 1)} closed within 20 working days. Provisional figures for ${h.ORR.current.label} show ${h.num(r.current!.received)} claims so far and an approval rate of ${h.pc(r.current!.approvedPct!, 1)}. The company has been in ${h.src('gov_gbr', 'public ownership')} since ${h.date(h.P.ownership.find((x) => x.operator === 'West Midlands Trains')!.date)}. Its longer-distance brand, which runs towards London and Liverpool, has its own ${h.a('op-london-northwestern-railway', 'London Northwestern Railway page')}.</p>`;
    },
  },
});
