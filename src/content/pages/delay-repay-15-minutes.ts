import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'delay-repay-15-minutes',
  group: 'claim',
  order: 3,
  tool: { kind: 'mini:dr15' },
  mini: { kind: 'mini:bands', props: { op: 'crosscountry', price: 55 } },
  related: ['delay-repay-amounts', 'train-delay-compensation', 'delay-repay-claims-by-operator', 'how-to-claim-delay-repay'],
  sources: ['nr_comp', 'nrcot'],
  en: {
    slug: 'delay-repay-15-minutes',
    nav: '15-minute delays',
    card: 'Which operators pay from 15 minutes late, which wait until 30, and what a short delay is worth on your fare.',
    title: 'Delay Repay 15: Which Operators Pay From 15 Minutes Late',
    description: 'Delay Repay 15 pays 25% of a single from 15 minutes late. See which train companies use it, which start at 30 minutes and what a short delay is worth to you.',
    h1: 'Delay Repay 15: compensation from 15 minutes late',
    intro: 'Type a fare and the minutes late: the tool compares what a Delay Repay 15 operator and a company starting later would pay for the same delay.',
    resume: (h) => `Delay Repay 15 is the version of the scheme that pays from 15 minutes late instead of 30. On a single ticket, a delay of 15 to 29 minutes at your destination gives back 25% of the price paid; on a return, 12.5% of the return fare for each late leg. Above that, it follows the same bands as other schemes: 50% of a single from 30 minutes and the full fare from 60. Of the ${h.num(h.OPS.length)} operators on this site, ${h.num(h.OPS.filter((o) => h.threshold(o) <= 15).length)} pay from 15 minutes, and ${h.num(h.OPS.filter((o) => h.threshold(o) > 15).length)} start later, mostly at 30 minutes. The difference matters on busy commuter lines, where short delays are frequent and add up over a month. Nothing in the National Rail Conditions of Travel requires payment for delays under ${h.num(h.N.minDelay)} minutes: the 15-minute band exists only because an operator's own charter offers it, so check the company that ran your train, not the one you usually use.`,
    faqs: (h) => [
      { q: 'Is a 14-minute delay worth claiming?', a: 'No. Under Delay Repay 15 the first band starts at 15 whole minutes late at your destination, so 14 minutes pays nothing, even with operators that are generous elsewhere. The timetable used is the one in force on the day. If your train was 14 minutes late at your station but you missed a connection and arrived much later, the delay to count is your final arrival.' },
      { q: 'Why does my usual train company pay at 15 minutes but another does not?', a: 'Each operator sets its scheme in its own Passenger’s Charter, and the national Conditions of Travel only fix a floor from 60 minutes. So the bands differ from one company to the next, even on the same route. What decides your claim is the operator that ran the late train, not the one you usually travel with or the one that sold you the ticket.' },
      { q: 'Do 15-minute delays on a season ticket pay anything?', a: 'With a Delay Repay 15 operator, yes, but the amount per journey is small, because the season price is first divided into the value of one journey or one day. Short delays are worth claiming one by one when they are frequent: twenty claims in a month can add up to a noticeable part of the season price. The season ticket page shows the arithmetic.' },
    ],
    body: (h) => `
<h2>Which operators use Delay Repay 15</h2>
<p>The list below sorts every operator on this site by the first delay that pays. It comes from each company's published terms, the same data used by the calculator.</p>
${h.table(['Operator', 'Pays from', 'Single, first band'], h.byName(h.OPS).sort((a, b) => h.threshold(a) - h.threshold(b) || a.name.localeCompare(b.name)).map((o) => [h.a(`op-${o.id}`, o.name), `${h.num(h.threshold(o))} min`, h.share(o.bands.slice().sort((x, y) => x.from - y.from)[0].single)]), `First band of each scheme, single tickets. Schemes listed by ${h.src('nr_comp', 'National Rail Enquiries')}, terms read on each operator's site.`, ['l', 'r', 'r'])}

<h2>What a short delay is worth</h2>
<p>A 15-minute band pays a quarter of the fare. On a ${h.gbp(12)} single on a commuter line, that is ${h.gbp(h.pay('southern', 'single', 12, 18))}; on a ${h.gbp(58)} long-distance single it is ${h.gbp(h.pay('southern', 'single', 58, 18))}. On a return, divide again by two: a return of ${h.gbp(24)} with one leg 20 minutes late pays ${h.gbp(h.pay('southern', 'return', 24, 20))}. Small amounts, but the claim takes a few minutes online, and the operator pays them like any other. The tool at the top of the page shows the gap between the two kinds of scheme for any fare and delay.</p>

<h2>When the operator starts at 30 minutes</h2>
<p>Companies that start later do not pay for the first half hour. ${h.op('crosscountry').name}, for example, runs a scheme that begins at ${h.num(h.threshold(h.op('crosscountry')))} minutes. A passenger whose journey involved two operators should look at which train caused the delay: a late connection on a Delay Repay 15 company is claimed under its bands, even if the longer part of the trip was with another operator.</p>
<!--tool:mini:connection-->

<h2>Delays just under a band</h2>
<p>Delays are counted in whole minutes at the station where your journey ends. Arriving 29 minutes late pays the 15-minute share; 30 minutes pays double. Note the arrival time shown on the screens or in a journey app as soon as you get off: if the operator's records show a different time, your note and a photo help. The operator checks your claim against its own train running records, so a claim that rounds up a minute is likely to be paid on the lower band.</p>

<h2>Short delays and the national rules</h2>
<p>The ${h.src('nrcot', 'Conditions of Travel')} only guarantee compensation from ${h.num(h.N.minDelay)} minutes. Under that, condition 33.4 lets a company refuse claims for delays caused entirely outside the rail industry's control, if its charter lists such exclusions. Most Delay Repay 15 schemes pay whatever the cause, which is why it is worth reading the operator page before giving up on a short delay caused by weather or an incident on the line. The ${h.a('delay-repay-amounts', 'amounts page')} compares every band, and the ${h.a('delay-repay-claims-by-operator', 'operator statistics')} show how often claims are approved.</p>`,
  },
});
