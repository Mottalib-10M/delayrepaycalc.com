import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'op-gwr',
  group: 'operators',
  order: 111,
  operator: 'gwr',
  tool: { kind: 'repay', props: { operator: 'gwr', lock: true, ticket: 'single', price: 62, delay: 37 } },
  mini: { kind: 'mini:divisors', props: { op: 'gwr' } },
  related: ['season-ticket-delay-repay', 'automatic-delay-repay', 'delay-repay-return-ticket', 'delay-repay-rejected', 'op-transport-for-wales'],
  sources: ['op_gwr_1', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'gwr-delay-repay',
    nav: 'GWR',
    card: 'Great Western Railway Delay Repay: bands from 15 minutes, a double journey for season holders after two hours, automated alerts and the coming switch to public ownership.',
    title: 'GWR Delay Repay: Bands, Season Rules and How It Pays',
    description: 'GWR Delay Repay worked out: what Great Western Railway pays from 15 minutes late on singles, returns and seasons, carnets and rovers, payment options, claims.',
    h1: 'GWR Delay Repay: what Great Western Railway pays',
    intro: 'The calculator above is set to Great Western Railway: change the fare, the ticket type or the minutes late and the GWR band and amount update straight away.',
    resume: (h) => {
      const o = h.op('gwr'); const r = h.orr(o.orr); const b = o.bands;
      const gbr = h.P.ownership.find((x) => x.operator === o.name);
      return `Great Western Railway runs Delay Repay 15: if a GWR train gets you to your destination ${h.num(h.threshold(o))} minutes or more behind the timetable, part of the fare comes back. A single earns ${h.share(b[0].single)} between ${h.mins(b[0])} minutes, ${h.share(b[1].single)} between ${h.mins(b[1])} minutes and ${h.share(b[2].single)} from ${h.num(b[2].from)} minutes, so a ${h.gbp(62)} single that arrives ${h.num(37)} minutes late is worth ${h.gbp(h.pay('gwr', 'single', 62, 37))}. Each leg of a return counts for half the fare, and one leg ${h.num(b[3].from)} minutes late or more refunds ${h.share(b[3].ret)} of it. Season holders get a stronger top band than the single column: ${h.share(h.shareAt('gwr', b[3].from, 'weekly'))} of one journey's value, a weekly being divided by ${h.num(o.season!.divisors.weekly!)} and an annual by ${h.num(o.season!.divisors.annual!)}. Claims must arrive within ${h.num(o.deadlineDays)} days. In ${h.ORR.lastYear.label} the company received ${h.num(r.last!.received)} claims and approved ${h.pc(r.last!.approvedPct!, 1)} of those it closed. GWR is still run by FirstGroup and is due to move into public ownership on ${h.date(gbr!.date)}.`;
    },
    faqs: (h) => {
      const o = h.op('gwr');
      return [
        { q: 'Can I claim GWR Delay Repay for my whole family on one form?', a: 'Yes. Great Western Railway explains that its online form lets you claim for several passengers at once, which helps when you travelled with children. You upload a copy of every ticket in the claim and state what each one cost. Each ticket is then valued on its own price, so a child fare earns the same share of a smaller amount.' },
        { q: 'How does GWR value a carnet or a rover ticket for Delay Repay?', a: 'Great Western Railway divides the price of the carnet or rover by its days of validity, giving a daily return rate. The share for your delay band is then applied to that daily figure, in the same way as for an ordinary return. Keep the receipt, because the form needs the price you paid and the validity of the ticket.' },
        { q: 'Can I change how GWR pays me after I have sent the claim?', a: `No. Great Western Railway says the payment method cannot be changed once the claim is submitted, so choose carefully on the form. Online claims offer ${o.payment.slice(0, 4).join(', ')}, or a donation to its charity partners. A paper form narrows the choice to a cheque, a voucher or a charity donation, which is a reason to claim online if you want the money in your account.` },
        { q: 'Why might GWR turn down a claim when my train was clearly late?', a: 'The reasons Great Western Railway lists most often are a claim sent after the limit, a ticket not valid for the journey, unreadable proof of purchase, or details of the train you actually caught instead of the one you planned to take. Delays measured against a timetable already amended for engineering work are also usually refused. You can appeal from your Delay Repay account if you think it got the facts wrong.' },
      ];
    },
    body: (h) => {
      const o = h.op('gwr'); const r = h.orr(o.orr); const d = o.season!.divisors; const b = o.bands;
      const gbr = h.P.ownership.find((x) => x.operator === o.name);
      return `
<h2>The GWR scale, applied to one fare</h2>
<p>Great Western Railway publishes three columns: singles, returns and season tickets. The first two follow the common national pattern. The third does not, and it is where GWR stands out. Below, the bands are applied to a ${h.gbp(62)} single taken as an example fare.</p>
${h.table(['Minutes late', 'Share of a single', `On a ${h.gbp(62)} single`, 'Share of a return, per late leg'], h.bandRows('gwr', 62), `Great Western Railway bands, read on its ${h.src('op_gwr_1', 'Delay Repay page')}.`, ['l', 'r', 'r', 'r'])}
<p>A return of ${h.gbp(110)} with an outward train ${h.num(45)} minutes late pays ${h.gbp(h.pay('gwr', 'return', 110, 45))}. If the homeward train is also ${h.num(70)} minutes late, the two legs together come to ${h.gbp(h.pay('gwr', 'return', 110, 45, 70))}. GWR caps compensation at a full day's travel, so two claims on the same ticket never return more than you paid for it.</p>

<h2>Season tickets: the ${h.share(h.shareAt('gwr', b[3].from, 'weekly'))} band</h2>
<p>For a season, GWR first works out the cost of one journey: ${h.num(d.weekly!)}th of a weekly, ${h.num(d.flexi!)}th of a Flexi Season, ${h.num(d.monthly!)}th of a monthly and ${h.num(d.annual!)}th of an annual. The band then applies to that cost. Up to ${h.num(b[2].to!)} minutes the shares match the single column. From ${h.num(b[3].from)} minutes late, though, the season column reads ${h.share(b[3].season)} of a journey, the value of a full day's return, while several other operators stop at one journey. An annual season of ${h.gbp(5200)} gives a journey value of ${h.gbp(Math.round((5200 / d.annual!) * 100) / 100)}; a ${h.num(130)}-minute delay on it pays ${h.gbp(h.pay('gwr', 'annual', 5200, 130))}.</p>
<p>Carnets and rovers have their own rule: the price is divided by the number of days the ticket is valid, giving a daily return rate that the bands are applied to. The tool lower down compares the journey value of your season with the same season priced on another operator.</p>
<!--tool:mini:orrstats|{"op":"gwr"}-->

<h2>Automated notifications rather than automatic payment</h2>
<p>GWR does not pay anyone without a claim, but it does start the process for some passengers. ${o.automatic}. If you opt in with an Advance ticket bought on its website, GWR checks your booked train and emails you when it finds a qualifying delay; you then accept, amend or reject the claim. Pay as you go on its touch smartcard in the Bristol area works the same way, using your taps in and out at the end of the day, and so do seasons loaded on a GWR smartcard. A missing tap, or a tap at a different station, stops the alert, but a manual claim is still open to you.</p>
<p>One time-limit exception is published on the page read. After a cyber incident at Transport for London cut off access to contactless journey histories, GWR said that contactless passengers held up on the Paddington to Reading stretch could claim outside the usual ${h.num(o.deadlineDays)} days, with a downloaded statement as proof.</p>

<h2>Claim volumes and approval rates</h2>
<p>The Office of Rail and Road counts GWR among the busiest claim handlers in Great Britain. Over ${h.ORR.lastYear.label} it received ${h.num(r.last!.received)} claims, closed ${h.num(r.last!.closed)}, approved ${h.pc(r.last!.approvedPct!, 1)} and closed ${h.pc(r.last!.within20Pct!, 1)} within 20 working days. In ${h.ORR.current.label}, on the provisional figures published so far, ${h.num(r.current!.received)} claims arrived and the approval rate stood at ${h.pc(r.current!.approvedPct!, 1)} (${h.src('orr_4410', 'ORR Table 4410')}).</p>

<h2>Who runs GWR, and what changes on ${h.date(gbr!.date)}</h2>
<p>Its trains run west from London Paddington to Reading, Oxford, Bristol, South Wales, Devon and Cornwall, including the Night Riviera sleeper. The operator is privately run by FirstGroup today. The government's ${h.src('gov_gbr', 'public ownership programme')} lists it for transfer on ${h.date(gbr!.date)}. A change of owner does not by itself alter the scheme: the bands and divisors here are those GWR published when we read its page, which was an archived copy, as the source label states. The ${h.a('season-ticket-delay-repay', 'season ticket guide')} compares the GWR rule with other operators.</p>`;
    },
  },
});
