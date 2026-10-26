import { definePage } from '../../lib/guide-types';

const ID = 'lumo';

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 118,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 39, delay: 33 } },
  mini: { kind: 'mini:divisors', props: { op: ID } },
  related: ['automatic-delay-repay', 'how-to-claim-delay-repay', 'op-lner', 'op-hull-trains', 'op-grand-central'],
  sources: ['op_lumo_1', 'nrcot', 'orr_4410'],
  demarche: true,
  en: {
    slug: 'lumo-delay-repay',
    nav: 'Lumo',
    card: 'Lumo pays from 30 minutes late between London and Edinburgh: how Auto Delay Repay works on LumoFixed and LumoFlex, what it pays and why claims fail.',
    title: 'Lumo Delay Repay: Auto Claims, Amounts and Exclusions',
    description: 'Lumo Delay Repay pays from 30 minutes late. Learn when Auto Delay Repay applies, what a single or return earns, the exclusions it lists and how fast it pays.',
    h1: 'Lumo Delay Repay',
    intro: 'Locked on Lumo, the calculator shows what its Delay Repay terms pay for your fare and the minutes you arrived late.',
    resume: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr);
      return `Lumo is the low-fare open access service of FirstGroup on the East Coast route between London King's Cross and Edinburgh. Its Delay Repay starts at ${h.num(h.threshold(o))} minutes late, as with other ${o.scheme} companies, but stops at two levels: ${h.share(o.bands[0].single)} of a single or ${h.share(o.bands[0].ret)} of a return for ${h.num(o.bands[0].from)} to ${h.num(o.bands[0].to ?? 0)} minutes, then the whole single or ${h.share(o.bands[1].ret)} of a return from one hour, however long the delay lasts. With low advance fares the sums are modest: a ${h.gbp(39)} single arriving 33 minutes late earns ${h.gbp(h.pay(ID, 'single', 39, 33))}. Advance tickets bought direct can be claimed automatically if you opt in to Auto Delay Repay before the day of travel ends; everything else goes through its portal within ${h.num(o.deadlineDays)} days. Lumo aims to decide every claim within 20 working days, and in ${h.ORR.lastYear.label} it approved ${h.pc(r.last?.approvedPct ?? 0, 1)} of the claims it closed.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Which Lumo tickets are covered by Auto Delay Repay?', a: `Only LumoFixed and LumoFlex advance tickets bought on the Lumo website or the LumoGo app with the email of your Lumo account. You must opt in no later than the day of travel, and it cannot be added afterwards. When the train is ${h.num(h.threshold(o))} minutes late or more, the claim is processed within 24 hours. Lumo open Anytime tickets are always claimed through the ordinary portal.` },
        { q: 'Will Lumo refuse my Delay Repay claim if I knew about the disruption?', a: 'Usually, yes. Lumo says it tries to warn passengers of delays and cancellations before they buy, so it does not normally accept a claim when you knew there was disruption, bought a ticket anyway and travelled on it. Where Lumo was at fault, it will still consider extra costs caused by a delay through the feedback form on its website.' },
        { q: 'I bought a ticket for another train company on the LumoGo app: does Lumo pay my delay?', a: `No. Lumo's page says that tickets bought through the LumoGo app or its website for travel with another operator are claimed from the company you travelled with. Claims sent to the wrong operator are referred to the one responsible, which is one of the reasons Lumo lists for unsuccessful claims. The ${h.num(o.deadlineDays)}-day limit applies either way.` },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr); const d = o.season!.divisors; const w = h.ORR.current.ops['lumo-west-coast'];
      return `
<h2>Opting in before you travel</h2>
<p>Lumo's Auto Delay Repay is the quickest way to be paid, but its conditions are strict. You pre-register with the same email you use to buy advance tickets on the website or the LumoGo app; the option covers LumoFixed and LumoFlex fares only; it must be switched on by the day of travel at the latest; and once on, it applies to future eligible journeys. If the train reaches your station ${h.num(h.threshold(o))} minutes late or more, Lumo processes the claim for you within 24 hours of the journey. Our page on ${h.a('automatic-delay-repay', 'automatic Delay Repay')} compares this with schemes that start a claim without any sign-up.</p>
<p>Everyone else uses the non-automated portal. If you used several tickets for a single journey, you are compensated for the whole journey if one ticket covered the delayed Lumo service, so keep paper tickets until the claim is paid.</p>

<h2>What the two levels pay</h2>
${h.table(['Arrival delay', 'Single', `Single at ${h.gbp(39)}`, 'Return, each late leg'], h.bandRows(ID, 39), `Lumo bands, from its ${h.src('op_lumo_1', 'Delay Repay help page')}. Delays under 30 minutes pay nothing.`, ['l', 'r', 'r', 'r'])}
<p>The cap at one hour matters for returns. A ${h.gbp(70)} return with a three-hour delay on one leg gives ${h.gbp(h.pay(ID, 'return', 70, 180))}, not the whole fare; both legs late by an hour give ${h.gbp(h.pay(ID, 'return', 70, 60, 60))}. For a season, divide the price by ${h.num((d.weekly ?? 0) / o.bands[0].season)} (weekly), ${h.num((d.monthly ?? 0) / o.bands[0].season)} (monthly) or ${h.num((d.annual ?? 0) / o.bands[0].season)} (annual) for a delay of 30 to 59 minutes, and by ${h.num(d.weekly ?? 0)}, ${h.num(d.monthly ?? 0)} or ${h.num(d.annual ?? 0)} above one hour; each delayed journey is claimed on its own with a copy of the season.</p>

<h2>Why Lumo turns claims down</h2>
<p>Lumo publishes the most common reasons for an unsuccessful claim:</p>
<ul>
<li>the delay was under 30 minutes;</li>
<li>the same journey was claimed twice, or the ticket had already been claimed against;</li>
<li>the journey details were wrong;</li>
<li>the claim arrived more than ${h.num(o.deadlineDays)} days after travel;</li>
<li>the delay was on another operator's train, so the claim was passed to that company.</li>
</ul>
<p>An appeal goes by email to its customer experience team. If the answer still seems wrong, the Rail Ombudsman can review it once the company has given a final response.</p>
<!--tool:mini:orrstats|{"op":"${ID}"}-->

<h2>Payment, timing and the figures</h2>
<p>The online form offers ${o.payment.join(', ')}; the charity option goes to Action for Children. Once a claim is approved, Lumo says bank transfers are made within 14 days and a cheque may need as long as 28 days to reach you. It also points out that, under the ${h.src('nrcot', 'Conditions of Travel')}, the date a claim is agreed may not be the date it was received. A postal claim goes to Freepost LUMO DELAY REPAY with the original tickets, addressed exactly as shown and with no stamp.</p>
<p>${h.src('orr_4410', 'ORR Table 4410')} shows ${h.num(r.last?.received ?? 0)} Lumo claims received in ${h.ORR.lastYear.label}, with ${h.pc(r.last?.within20Pct ?? 0, 1)} closed inside 20 working days. For ${h.ORR.current.label}, provisional figures for the first ${h.num(h.ORR.current.periods.length)} periods give ${h.num(r.current?.received ?? 0)} claims and ${h.pc(r.current?.approvedPct ?? 0, 1)} approved.${w ? ` The same table now lists a separate Lumo West Coast line, with ${h.num(w.received)} claims so far and ${h.pc(w.approvedPct ?? 0, 1)} approved; the Lumo pages read give no separate terms for it.` : ''}</p>`;
    },
  },
});
