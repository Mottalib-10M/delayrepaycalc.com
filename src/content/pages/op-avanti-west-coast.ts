import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const ID = 'avanti-west-coast';
const handover = (h: Helpers) => h.P.ownership.find((x) => x.operator === 'Avanti West Coast')?.date ?? '2027-03-07';

export default definePage({
  id: `op-${ID}`,
  group: 'operators',
  order: 101,
  operator: ID,
  tool: { kind: 'repay', props: { operator: ID, lock: true, ticket: 'single', price: 92, delay: 47 } },
  mini: { kind: 'mini:divisors', props: { op: ID } },
  related: ['season-ticket-delay-repay', 'automatic-delay-repay', 'delay-repay-return-ticket', 'op-lner', 'op-crosscountry'],
  sources: ['op_avanti_west_coast_1', 'op_avanti_west_coast_2', 'nrcot', 'orr_4410', 'gov_gbr'],
  demarche: true,
  en: {
    slug: 'avanti-west-coast-delay-repay',
    nav: 'Avanti West Coast',
    card: 'Avanti West Coast pays from 15 minutes late on the West Coast Main Line: its bands, season values, automatic claims on Advance tickets and claim record.',
    title: 'Avanti West Coast Delay Repay: Bands, Seasons and Claims',
    description: 'Avanti West Coast Delay Repay pays from 15 minutes late. See the share of your fare for each band, the season ticket values and how it handles claims.',
    h1: 'Avanti West Coast Delay Repay',
    intro: 'The calculator is set to Avanti West Coast: change the fare, the ticket type or the minutes late and the amount follows its published bands.',
    resume: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr);
      return `Avanti West Coast runs a ${o.scheme} scheme, so compensation starts once you reach your destination ${h.num(h.threshold(o))} minutes late, whatever caused the delay. Its Passenger's Charter of April 2026 sets ${h.share(o.bands[0].single)} of a single fare from ${h.num(o.bands[0].from)} minutes, ${h.share(o.bands[1].single)} from ${h.num(o.bands[1].from)} and the whole single from ${h.num(o.bands[2].from)}; on a return the same steps give ${h.share(o.bands[0].ret)}, ${h.share(o.bands[1].ret)} and ${h.share(o.bands[2].ret)} of the return fare per late leg, rising to the full return from ${h.num(o.bands[3].from)} minutes. A ${h.gbp(92)} single that arrives 47 minutes late is therefore worth ${h.gbp(h.pay(ID, 'single', 92, 47))}. Claims must reach the company within ${h.num(o.deadlineDays)} days. In ${h.ORR.lastYear.label}, it received ${h.num(r.last?.received ?? 0)} claims, more than any other operator in the ORR table, and approved ${h.pc(r.last?.approvedPct ?? 0, 1)} of those it closed. The company is ${o.owner.charAt(0).toLowerCase()}${o.owner.slice(1)}.`;
    },
    faqs: (h) => {
      const o = h.op(ID);
      return [
        { q: 'Does Avanti West Coast start a Delay Repay claim for me automatically?', a: `Only in one case. If you booked an Advance ticket on its own website or app for at least one leg on its trains, the company begins the claim for you. Every other ticket, including those bought from another retailer, needs a claim on its form within ${h.num(o.deadlineDays)} days. Registering a Delay Repay account with the same email as your main account lets it tell you when a journey qualifies.` },
        { q: 'Can I claim from Avanti West Coast with a paper form instead of online?', a: 'Yes. Its charter says paper application forms are available at its stations and can be handed to staff or posted free of charge. A paper claim is paid by cheque or National Rail travel vouchers only, because the company does not accept card or bank details on paper. Online claims can choose card payment or a bank transfer as well.' },
        { q: 'How quickly does Avanti West Coast pay a Delay Repay claim?', a: `Its Passenger's Charter says it aims to conclude a claim within five working days. The ORR figures back up the speed: in ${h.ORR.lastYear.label}, ${h.pc(h.orr(o.orr).last?.within20Pct ?? 0, 1)} of its closed claims were dealt with inside 20 working days. If a decision takes longer or looks wrong, ask the company to review it before going to the Rail Ombudsman.` },
        { q: 'What happens to Avanti West Coast Delay Repay when it moves into public ownership?', a: `The government plans to bring the West Coast franchise into public ownership on ${h.date(handover(h))}. Nothing published so far changes the Delay Repay bands, and the National Rail Conditions of Travel continue to apply to every operator. Claims for journeys before the handover will still be handled under the terms in force on the day you travelled.` },
      ];
    },
    body: (h) => {
      const o = h.op(ID); const r = h.orr(o.orr); const d = o.season!.divisors;
      return `
<h2>Where the bands bite on long-distance fares</h2>
<p>Avanti's trains run the West Coast Main Line out of London Euston towards Birmingham, Manchester, Liverpool and Glasgow. Fares on those routes are high, so the step from one band to the next is worth real money. The table applies the company's bands to a walk-up single of ${h.gbp(92)}.</p>
${h.table(['Minutes late', 'Share of a single', `On a ${h.gbp(92)} single`, 'Share of a return, per late leg'], h.bandRows(ID, 92), `Bands of ${o.name}, read in its ${h.src('op_avanti_west_coast_1', "Passenger's Charter, April 2026")}.`, ['l', 'r', 'r', 'r'])}
<p>The delay is measured at the station where your ticket ends, not at the end of the train's route. The charter also says the company looks at the whole journey on your ticket, connections included, and that the timetable used is the published one, which can be an emergency timetable announced in advance. When part of the trip was with another train company and Avanti did not cause the delay, it passes your claim on and tells you it has done so.</p>

<h2>Season tickets on the West Coast</h2>
<p>For a season, the company first estimates the value of one delayed journey and then applies the band. It divides a weekly season by ${h.num(d.weekly ?? 0)}, a Flexi Season by ${h.num(d.flexi ?? 0)}, a monthly by ${h.num(d.monthly ?? 0)} and an annual by ${h.num(d.annual ?? 0)}; the charter adds a quarterly divisor, which the calculator does not use. On an annual season of ${h.gbp(6400)}, a 35-minute delay pays ${h.gbp(h.pay(ID, 'annual', 6400, 35))} and a delay of an hour pays ${h.gbp(h.pay(ID, 'annual', 6400, 65))}.</p>
<p>Unlike several commuter operators, Avanti does not double the season payment at two hours: its charter keeps the season column at the full value of one journey from ${h.num(o.bands[3].from)} minutes. The tool under the summary compares that value across operators. When a "do not travel" warning is issued, its charter says season holders who follow it can claim through Delay Repay rather than a refund. Our ${h.a('season-ticket-delay-repay', 'season ticket guide')} explains the method in full.</p>

<h2>Claiming and getting paid</h2>
<p>The claim goes through the company's own Delay Repay site. You show the ticket as a photo, scan or screenshot, and the number of a season ticket. If your arrival station has automatic gates, the charter asks you to tell the member of staff on the gate that you want to keep your ticket for a claim. Online claims can be paid by ${o.payment.join(', ')}. Holders of Advance tickets bought direct have a head start, because the claim is opened for them; our page on ${h.a('automatic-delay-repay', 'automatic Delay Repay')} compares that with other companies.</p>
<p>The national rules still sit underneath. Under the ${h.src('nrcot', 'National Rail Conditions of Travel')}, version ${h.num(h.N.version)}, any delay of ${h.num(h.N.minDelay)} minutes or more earns at least ${h.pc(h.N.minPct)} of the fare, and the charter reminds passengers that the same loss cannot be claimed twice. In exceptional circumstances the company will also consider extra costs through its contact form.</p>

<h2>Claim volumes and approval rate</h2>
<p>The Office of Rail and Road publishes every operator's claim handling in ${h.src('orr_4410', 'Table 4410')}. For ${h.ORR.lastYear.label}, Avanti received ${h.num(r.last?.received ?? 0)} claims, closed ${h.num(r.last?.closed ?? 0)} and approved ${h.num(r.last?.approved ?? 0)}, which is ${h.pc(r.last?.approvedPct ?? 0, 1)}. In the first ${h.num(h.ORR.current.periods.length)} periods of ${h.ORR.current.label}, still provisional, it had received ${h.num(r.current?.received ?? 0)} claims and approved ${h.pc(r.current?.approvedPct ?? 0, 1)} of those closed, with ${h.pc(r.current?.within20Pct ?? 0, 1)} closed inside 20 working days.</p>
<!--tool:mini:orrstats|{"op":"${ID}"}-->

<h2>Ownership</h2>
<p>Avanti West Coast is still run privately by FirstGroup and Trenitalia. According to the ${h.src('gov_gbr', 'government page on Great British Railways')}, it is due to pass into public ownership on ${h.date(handover(h))}, the last date on the current transfer list. Until then, the April 2026 charter is the reference for every claim.</p>`;
    },
  },
});
