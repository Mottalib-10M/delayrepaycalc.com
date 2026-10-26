import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'op-london-northwestern-railway',
  group: 'operators',
  order: 116,
  operator: 'london-northwestern-railway',
  tool: { kind: 'repay', props: { operator: 'london-northwestern-railway', lock: true, ticket: 'single', price: 28, delay: 22 } },
  mini: { kind: 'mini:returnlegs', props: { op: 'london-northwestern-railway', price: 46, out: 22, back: 0 } },
  related: ['op-west-midlands-railway', 'op-avanti-west-coast', 'delay-repay-return-ticket', 'delay-repay-time-limit'],
  sources: ['op_london_northwestern_railway_1', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'london-northwestern-railway-delay-repay',
    nav: 'London Northwestern',
    card: 'London Northwestern Railway Delay Repay between Euston, Milton Keynes, Northampton and Birmingham, with its rule for contactless and capped fares and seasons.',
    title: 'LNR Delay Repay: London Northwestern Fares and Contactless',
    description: 'London Northwestern Railway Delay Repay: bands from 15 minutes, how contactless and capped fares are valued, returns, seasons and what the claim form asks for.',
    h1: 'London Northwestern Railway Delay Repay',
    intro: 'Locked to London Northwestern Railway, the calculator above turns your fare and the minutes late at your station into a Delay Repay amount.',
    resume: (h) => {
      const o = h.op('london-northwestern-railway'); const r = h.orr(o.orr); const b = o.bands;
      return `London Northwestern Railway, LNR for short, runs the stopping and semi-fast trains out of London Euston towards Milton Keynes, Northampton and Birmingham, and on to Crewe and Liverpool. Many of its passengers commute into London, and a growing number pay with contactless, which is why its Delay Repay page sets out a rule found on few others: a pay as you go journey is compensated on its single fare, but a day on which the daily or weekly price cap applied is compensated as a share of that daily capped fare. The bands are the usual Delay Repay 15 scale: ${h.share(b[0].single)} of a single from ${h.num(b[0].from)} minutes, ${h.share(b[1].single)} from ${h.num(b[1].from)} and the full single from ${h.num(b[2].from)}. A ${h.gbp(28)} single ${h.num(22)} minutes late earns ${h.gbp(h.pay('london-northwestern-railway', 'single', 28, 22))}. You have ${h.num(o.deadlineDays)} days to claim. LNR belongs to West Midlands Trains, in public ownership since ${h.date(h.P.ownership.find((x) => x.operator === 'West Midlands Trains')!.date)}, and the ORR's figures for that group show ${h.pc(r.last!.approvedPct!, 1)} of closed claims approved in ${h.ORR.lastYear.label}.`;
    },
    faqs: (h) => {
      const o = h.op('london-northwestern-railway');
      return [
        { q: 'How is a capped contactless day valued by London Northwestern Railway Delay Repay?', a: 'If the daily or weekly price cap applied, London Northwestern Railway treats the daily capped fare as your daily travel cost and pays a share of it. Each travel day starts at 04:30 and ends just before 04:30 the following morning. If the cap did not apply, the delayed pay as you go journey is compensated on its own single fare, like a paper single.' },
        { q: 'What proof does London Northwestern Railway want for an Oyster journey?', a: 'For an Oyster card, the form wants the TfL journey statement attached, showing the journey and to enter the twelve-digit card number. Contactless and smartcard journeys are claimed through the option for a ticket without a QR code. Keep the statement until the claim is paid, since it also records where you tapped in and out.' },
        { q: 'How do I count changes on the London Northwestern Railway claim form?', a: `Count only the changes between trains, from one to six, and leave out any Underground, bus or tram connection. The example London Northwestern Railway gives is Wolverton to Gatwick Airport: three legs including the Underground between Euston and Victoria, entered as one change and two train legs. Claim within ${h.num(o.deadlineDays)} days from the company whose train caused the first delay.` },
      ];
    },
    body: (h) => {
      const o = h.op('london-northwestern-railway'); const r = h.orr(o.orr); const d = o.season!.divisors; const b = o.bands;
      return `
<h2>Paper tickets, e-tickets and returns on the Euston line</h2>
<p>For a single or return bought in advance or on the day, LNR works on the price you paid. A return counts as two journeys, each worth half of the fare, so a late outward train on a ${h.gbp(46)} return earns half of what the same delay earns on a single. The table runs the full scale on a ${h.gbp(28)} single.</p>
${h.table(['Late by', 'Single share', `Paid on ${h.gbp(28)}`, 'Return share per leg'], h.bandRows('london-northwestern-railway', 28), `London Northwestern Railway bands, from an ${h.src('op_london_northwestern_railway_1', 'archived copy of its Delay Repay page')}.`, ['l', 'r', 'r', 'r'])}
<p>Two examples on that ${h.gbp(46)} return: ${h.num(22)} minutes late on the way out and on time coming back gives ${h.gbp(h.pay('london-northwestern-railway', 'return', 46, 22))}; ${h.num(70)} minutes late both ways gives ${h.gbp(h.pay('london-northwestern-railway', 'return', 46, 70, 70))}, the full price. The tool beside this page adds the two legs for any fare.</p>

<h2>Pay as you go with contactless</h2>
<p>Where LNR accepts contactless pay as you go, you are charged the best adult fare for the time of travel, with daily and weekly capping when you make several journeys into or within London. For Delay Repay this creates two cases:</p>
<ul>
<li><strong>A single pay as you go journey:</strong> the delay band applies to the fare charged for that journey.</li>
<li><strong>A capped day or week:</strong> the daily capped fare becomes your daily travel cost, and the band applies to it in the same way as for a season.</li>
</ul>
<p>The capped day is counted from 04:30 to 04:29 the following morning, so a late train home after midnight still belongs to the previous day's cap.</p>

<h2>Seasons on LNR</h2>
<p>Seasons follow the group rule of a daily travel cost, one return per working day. A weekly is divided by ${h.num(d.weekly!)}, a monthly by ${h.num(d.monthly!)}, an annual by ${h.num(d.annual!)} and a Flexi Season by ${h.num(d.flexi!)}. The shares of that daily cost are ${b.map((x) => h.share(x.season)).join(', ')} through the bands. For an annual of ${h.gbp(6400)}, the daily cost is ${h.gbp(Math.round((6400 / d.annual!) * 100) / 100)} and a ${h.num(45)}-minute delay pays ${h.gbp(h.pay('london-northwestern-railway', 'annual', 6400, 45))}.</p>
<!--tool:mini:deadline|{"op":"london-northwestern-railway"}-->

<h2>Payment, automatic claims and the group statistics</h2>
<p>LNR pays by ${o.payment.join(', ')}. ${o.automatic}: you confirm a claim rather than build it. As our source was an archived copy of its page, read on the date its label gives, check the live page if your case depends on a detail.</p>
<p>The ORR's ${h.src('orr_4410', 'Table 4410')} does not separate LNR from West Midlands Railway, so the following figures cover West Midlands Trains as a whole: ${h.num(r.last!.closed)} claims closed in ${h.ORR.lastYear.label} with ${h.pc(r.last!.within20Pct!, 1)} handled within 20 working days, and ${h.num(r.current!.received)} received so far in ${h.ORR.current.label}, ${h.pc(r.current!.approvedPct!, 1)} of them approved on provisional data. The group moved into ${h.src('gov_gbr', 'public ownership')} as one company. Fast trains on the same line are run by Avanti: compare with the ${h.a('op-avanti-west-coast', 'Avanti West Coast page')}, or read the ${h.a('op-west-midlands-railway', 'West Midlands Railway page')} for the Birmingham network.</p>`;
    },
  },
});
