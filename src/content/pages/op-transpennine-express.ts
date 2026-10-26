import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'op-transpennine-express',
  group: 'operators',
  order: 126,
  operator: 'transpennine-express',
  tool: { kind: 'repay', props: { operator: 'transpennine-express', lock: true, ticket: 'single', price: 39, delay: 47 } },
  mini: { kind: 'mini:orrstats', props: { op: 'transpennine-express' } },
  related: ['automatic-delay-repay', 'delay-repay-advance-tickets', 'season-ticket-delay-repay', 'op-northern', 'how-to-claim-delay-repay'],
  sources: ['op_transpennine_express_1', 'op_transpennine_express_2', 'op_transpennine_express_3', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'transpennine-express-delay-repay',
    nav: 'TransPennine Express',
    card: 'TransPennine Express moved its Delay Repay claims to a new portal in October 2026: the bands, the season divisor table, Payit links and the one-click email for TPE Advance.',
    title: 'TransPennine Express Delay Repay: New Portal and Payit',
    description: 'TransPennine Express Delay Repay: bands from 15 minutes, its divisor table for seasons, the new claim portal and Payit links, plus one-click claims for Advance.',
    h1: 'TransPennine Express Delay Repay after the portal change',
    intro: 'Set to TransPennine Express, the calculator above shows what a late TPE train is worth on your fare; change the minutes to watch the band move.',
    resume: (h) => {
      const o = h.op('transpennine-express'); const r = h.orr(o.orr); const b = o.bands;
      return `TransPennine Express, known as TPE, changed how its Delay Repay claims are handled on ${h.date('2026-10-18')}, without changing what it pays. New claims now go through an upgraded portal, references start with the letters TPT, and a new payment route called Payit sends a secure link so the money can land in your bank account without you typing in your bank details. The scale itself is Delay Repay 15: ${h.share(b[0].single)} of a single from ${h.num(b[0].from)} minutes late, ${h.share(b[1].single)} from ${h.num(b[1].from)}, the full single from ${h.num(b[2].from)}. A ${h.gbp(39)} single on a train ${h.num(47)} minutes late is worth ${h.gbp(h.pay('transpennine-express', 'single', 39, 47))}. Season tickets are valued with a divisor table that changes with each band, and the top band pays ${h.share(h.shareAt('transpennine-express', b[3].from, 'monthly'))} of a journey. Claims must reach TPE within ${h.num(o.deadlineDays)} days. Over ${h.ORR.lastYear.label}, the ORR recorded ${h.num(r.last!.received)} claims to TPE and an approval rate of ${h.pc(r.last!.approvedPct!, 1)}.`;
    },
    faqs: (h) => {
      const o = h.op('transpennine-express');
      return [
        { q: 'What happens to a TransPennine Express claim I sent before the new portal?', a: `TransPennine Express says claims sent before ${h.date('2026-10-18')} and not yet settled stay in the existing claims portal until they are completed, and you can keep tracking them there. Closed historic claims become visible once they reach that status. Only new claims go through the upgraded portal, which may ask for a new password the first time you log in.` },
        { q: 'Do I need a NatWest account to be paid by Payit for a TransPennine Express delay?', a: 'No. TransPennine Express explains that Payit works with customers of many UK banks and that you do not share your bank details with it. If your claim succeeds and Payit is available, you receive a secure link and choose the account for the payment. The link stays valid for 30 days from the day it is issued, so act on it promptly.' },
        { q: 'Which TransPennine Express tickets get the one-click Delay Repay email?', a: `Only tickets of the type TPE Advance, bought on the TPE website or app, covering a whole journey from end to end on its network, with the email of your booking account matching your Delay Repay account and after you opt in. ${o.automatic}. The email usually arrives within the first few days, and payment back to the original card takes about three working days after that.` },
        { q: 'Does TransPennine Express pay for a delay during engineering works?', a: 'Delays are measured against the timetable in force on the day of travel. When planned works, such as the long programme on its core route across the Pennines, are built into an amended timetable, the scheduled arrival is the amended one and only the extra delay beyond it can be claimed. A train later than that revised arrival is treated like any other delay.' },
      ];
    },
    body: (h) => {
      const o = h.op('transpennine-express'); const r = h.orr(o.orr); const d = o.season!.divisors; const b = o.bands;
      return `
<h2>Where TPE runs and what its scale pays</h2>
<p>TransPennine Express runs intercity trains across the north of England and up to Scotland: Manchester and Liverpool to Leeds, York and Newcastle, Manchester Piccadilly to Edinburgh, and the line from York to Scarborough. Fares on these routes sit between a commuter ticket and a long-distance one, which makes the first band worth claiming. The table applies TPE's bands to an example single of ${h.gbp(39)}.</p>
${h.table(['Delay at destination', 'Single', `Paid on ${h.gbp(39)}`, 'Return, each late leg'], h.bandRows('transpennine-express', 39), `TransPennine Express bands, from its ${h.src('op_transpennine_express_1', 'Delay Repay claim form')} and ${h.src('op_transpennine_express_2', 'Passenger’s Charter')}.`, ['l', 'r', 'r', 'r'])}
<p>On a ${h.gbp(72)} return, an outward train ${h.num(25)} minutes late pays ${h.gbp(h.pay('transpennine-express', 'return', 72, 25))}, and a homeward train ${h.num(b[3].from)} minutes late or more refunds the whole ticket on its own: ${h.gbp(h.pay('transpennine-express', 'return', 72, 0, b[3].from))}.</p>

<h2>The divisor table for season tickets</h2>
<p>Instead of a single journey value with a percentage on top, TPE publishes a divisor for each band. For a ${h.num(d.monthly!)}-journey month, a delay in the top band divides the monthly price by half that number, and a delay in the first band divides it by four times that number. The result is the same as taking ${h.share(b[0].season)}, ${h.share(b[1].season)}, ${h.share(b[2].season)} or ${h.share(b[3].season)} of one journey worth ${h.num(1)}/${h.num(d.monthly!)} of the month. The Flexi Season is valued at ${h.num(1)}/${h.num(d.flexi!)} of its price and the annual at ${h.num(1)}/${h.num(d.annual!)}. A monthly of ${h.gbp(320)} and a ${h.num(65)}-minute delay give ${h.gbp(h.pay('transpennine-express', 'monthly', 320, 65))}.</p>
<!--tool:mini:divisors|{"op":"transpennine-express","price":320}-->

<h2>The ${h.date('2026-10-18')} change, step by step</h2>
<p>TPE's ${h.src('op_transpennine_express_3', 'notice on the changes')} is clear that the Delay Repay scheme itself is unchanged. What moved is the machinery around it:</p>
<ul>
<li>New Delay Repay and refund claims go through the upgraded TPE portal; no new account is needed, though a password reset may be requested.</li>
<li>New claim references begin with TPT, so an older reference in another format belongs to the previous system.</li>
<li>If you were paid straight to a payment card, you need to enter the card details again.</li>
<li>Payit is added to the payment choices, which also include ${o.payment.filter((x) => x !== 'bank transfer link').join(', ')}.</li>
</ul>
<p>Appeals follow the route set out in your claim outcome email.</p>

<h2>When another company's train was the late one</h2>
<p>Many TPE journeys start or end on another operator's train. TPE's automated scheme notes that if the first train, run by another company, was delayed while the TPE part ran on time, the claim goes to that other operator in the normal way. The same logic applies to manual claims: the company whose train caused the delay pays. TPE also reminds passengers that Delay Repay is its standard level of compensation, and that any request for more, such as a taxi or an extra night away, goes to its Customer Relations team rather than through the claim form.</p>

<h2>Approval rates and public ownership</h2>
<p>Over ${h.ORR.lastYear.label}, TPE closed ${h.num(r.last!.closed)} claims, approved ${h.pc(r.last!.approvedPct!, 1)} of them and closed ${h.pc(r.last!.within20Pct!, 1)} within 20 working days. The provisional figures for ${h.ORR.current.label} show ${h.num(r.current!.received)} claims received so far and ${h.pc(r.current!.approvedPct!, 1)} approved (${h.src('orr_4410', 'ORR Table 4410')}). The company is run by DfT Operator, the government's operator of last resort, and so is already in ${h.src('gov_gbr', 'public ownership')}. If your journey continued on a stopping train, the ${h.a('op-northern', 'Northern page')} covers that operator.</p>`;
    },
  },
});
