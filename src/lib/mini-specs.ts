/**
 * Mini-tools of the pages (RECETTE §9.3): one subject = one calculation, always through the engines
 * (`lib/engine/repay.ts`, `lib/engine/fares.ts`) and params-2026.json, never a second formula.
 * Date inputs hold day numbers (days since 1970-01-01, UTC).
 */
import type { MiniSpec, MiniInput } from './mini-types';
import P from '../data/params-2026.json';
import ORR from '../data/orr-claims.json';
import { money, formatNumberL, dateL, pct } from './format-l';
import { dayNum, isoOf, addDays, addWorkingDays, addMonths } from './engine/dates';
import { OPERATORS, operatorById, repay, threshold, claimDeadline, nrcotMinimum, seasonTotal, type TicketKind, type SeasonKind } from './engine/repay';
import { RAILCARDS, breakEven, discounted, splitSaving } from './engine/fares';

const N = P.national, OMB = P.ombudsman, F = P.fares;
const D = (n: number) => dateL(isoOf(n));
const n0 = (v: number) => formatNumberL(v);
const pc = (x: number) => pct(x, 'en', Math.round(x * 1000) % 10 ? 1 : 0);
const clamp = (x: number, a: number, b: number) => Math.max(a, Math.min(b, Math.round(x)));
const yn = [{ value: '0', label: 'No' }, { value: '1', label: 'Yes' }];
const EX = dayNum('2026-10-26');
const OPS_SORTED = [...OPERATORS].sort((a, b) => a.name.localeCompare(b.name));
const OP_OPTIONS = OPS_SORTED.map((o, i) => ({ value: String(i), label: o.name }));
const opAt = (i: number | undefined) => OPS_SORTED[clamp(i ?? 0, 0, OPS_SORTED.length - 1)];
const opIndex = (id: string) => Math.max(0, OPS_SORTED.findIndex((o) => o.id === id));
const opInput = (def = 'avanti-west-coast'): MiniInput => ({ id: 'op', label: 'Train company', def: opIndex(def), options: OP_OPTIONS });
const BH = [...P.bankHolidays.englandWales];
const SEASONS: Array<{ value: string; label: string; kind: SeasonKind }> = [
  { value: '0', label: 'Weekly', kind: 'weekly' }, { value: '1', label: 'Monthly', kind: 'monthly' },
  { value: '2', label: 'Annual', kind: 'annual' }, { value: '3', label: 'Flexi', kind: 'flexi' },
];
const CARD_OPTIONS = RAILCARDS.map((c, i) => ({ value: String(i), label: c.name }));
type OrrRow = { approvedPct: number | null; within20Pct: number | null; closed: number };
const orrOf = (id: string | null) => (id ? ((ORR.lastYear.ops as Record<string, OrrRow>)[id] ?? null) : null);

const SPECS: Record<string, () => MiniSpec> = {
  /** Claim deadline for a journey date. */
  deadline: () => ({
    title: 'Last day to claim Delay Repay', cta: 'Work out the amount too', ctaPage: 'home',
    inputs: [opInput(), { id: 'day', label: 'Day of the late journey', def: EX, date: true }],
    run: (v) => {
      const o = opAt(v.op); const d = isoOf(v.day ?? EX);
      return { head: ['Claim by', dateL(claimDeadline(o, d))], rows: [['Time limit at ' + o.name, `${n0(o.deadlineDays)} days`], ['Counted from', dateL(d)], ['National Rail minimum', `${n0(N.claimDays)} days`]], note: 'The operator’s form refuses claims after its limit; a late claim can only be asked as a goodwill gesture.' };
    },
  }),
  /** Return ticket: one or both legs late. */
  returnlegs: () => ({
    title: 'Delay Repay on a return ticket', cta: 'Full calculator', ctaPage: 'home',
    inputs: [opInput('lner'), { id: 'price', label: 'Return fare paid', def: 90, unit: '£', max: 2000, decimals: 2 }, { id: 'out', label: 'Minutes late, outward', def: 40, unit: 'min', max: 1440 }, { id: 'back', label: 'Minutes late, return', def: 0, unit: 'min', max: 1440 }],
    run: (v) => {
      const o = opAt(v.op); const r = repay({ operator: o.id, ticket: 'return', price: v.price ?? 0, delay: v.out ?? 0, delayBack: v.back ?? 0 });
      return { head: ['You would get', money(r.amount)], rows: [['Share of the return fare', pc(r.pct)], ['Outward band', r.band ? `${n0(r.band.from)} min and over` : 'none'], ['Return band', r.bandBack ? `${n0(r.bandBack.from)} min and over` : 'none'], ['Capped at', money(v.price ?? 0)]] };
    },
  }),
  /** Delay Repay 15 against Delay Repay 30. */
  dr15: () => ({
    title: 'What a 15 to 29 minute delay pays', cta: 'Check your own journey', ctaPage: 'home',
    inputs: [{ id: 'price', label: 'Single fare paid', def: 24, unit: '£', max: 2000, decimals: 2 }, { id: 'min', label: 'Minutes late', def: 20, unit: 'min', max: 1440 }],
    run: (v) => {
      const at = (ids: string[]) => ids.map((id) => operatorById(id)).filter((o): o is NonNullable<typeof o> => !!o);
      const dr15 = OPERATORS.filter((o) => threshold(o) <= 15), dr30 = OPERATORS.filter((o) => threshold(o) > 15);
      const a = dr15[0] ? repay({ operator: dr15[0].id, ticket: 'single', price: v.price ?? 0, delay: v.min ?? 0 }).amount : 0;
      const b = dr30[0] ? repay({ operator: dr30[0].id, ticket: 'single', price: v.price ?? 0, delay: v.min ?? 0 }).amount : 0;
      void at;
      return { head: ['With a Delay Repay 15 operator', money(a)], rows: [['With a Delay Repay 30 operator', money(b)], ['Operators paying from 15 min', n0(dr15.length)], ['Operators paying from 30 min or later', n0(dr30.length)]] };
    },
  }),
  /** Season ticket, one or several delayed journeys. */
  season: () => ({
    title: 'Delay Repay on a season ticket', cta: 'Season tickets explained', ctaPage: 'season-ticket-delay-repay',
    inputs: [opInput('southern'), { id: 'kind', label: 'Season type', def: 2, options: SEASONS.map(({ value, label }) => ({ value, label })) }, { id: 'price', label: 'Season price', def: 4200, unit: '£', max: 30000 }, { id: 'min', label: 'Minutes late', def: 35, unit: 'min', max: 1440 }, { id: 'n', label: 'Delayed journeys like this', def: 3, max: 500 }],
    run: (v) => {
      const o = opAt(v.op); const k = SEASONS[clamp(v.kind ?? 0, 0, 3)].kind;
      const s = seasonTotal(o, k, v.price ?? 0, v.min ?? 0, v.n ?? 1);
      if (s.r.seasonUnsupported) return { head: ['Per journey', 'not published'], rows: [['Operator', o.name]], note: `${o.name} does not publish a divisor for this season type: its claim form works the value out.` };
      return { head: ['Total for these journeys', money(s.total)], rows: [['Per delayed journey', money(s.per)], [`Season price ÷ ${n0(o.season?.divisors[k] ?? 0)}`, money(Math.round(s.r.basis * 100) / 100)], ['Share for this delay', pc(s.r.pct)]] };
    },
  }),
  /** National minimum against the operator's scheme. */
  minimum: () => ({
    title: 'National minimum against the operator’s scheme', cta: 'Train delay compensation explained', ctaPage: 'train-delay-compensation',
    inputs: [opInput(), { id: 'price', label: 'Single fare paid', def: 50, unit: '£', max: 2000, decimals: 2 }, { id: 'min', label: 'Minutes late', def: 65, unit: 'min', max: 1440 }],
    run: (v) => {
      const o = opAt(v.op); const own = repay({ operator: o.id, ticket: 'single', price: v.price ?? 0, delay: v.min ?? 0 }).amount;
      const min = nrcotMinimum(v.price ?? 0, 'single', v.min ?? 0);
      return { head: [`${o.name} pays`, money(own)], rows: [['Conditions of Travel minimum', money(min)], ['Minimum applies from', `${n0(N.minDelay)} min`], ['Operator scheme starts at', `${n0(threshold(o))} min`]] };
    },
  }),
  /** Refund when you choose not to travel because of disruption. */
  refund: () => ({
    title: 'Refund if you give up on a disrupted trip', cta: 'Cancelled train refunds', ctaPage: 'cancelled-train-refund',
    inputs: [{ id: 'price', label: 'Price of the unused tickets', def: 45, unit: '£', max: 5000, decimals: 2 }, { id: 'day', label: 'Day you meant to travel', def: EX, date: true }, { id: 'why', label: 'Why you did not travel', def: 0, options: [{ value: '0', label: 'Train cancelled, delayed or rescheduled' }, { value: '1', label: 'Change of plans, no disruption' }] }],
    run: (v) => {
      const disrupted = (v.why ?? 0) === 0;
      const d = isoOf(v.day ?? EX);
      if (disrupted) return { head: ['Refund', money(v.price ?? 0)], rows: [['Administration fee', money(0)], ['Tell the retailer by', dateL(addDays(d, N.refundNotifyDays))], ['Paid within', `${n0(N.payWithinDays)} days of agreement`]] };
      return { head: ['Refund', 'before the ticket is valid only'], rows: [['Ask by', `23:59 the day before ${dateL(d)}`], ['Fee, if refundable', `up to ${money(N.adminChargeMax)}`], ['Advance tickets', 'not refundable']], note: `Rule in force since ${dateL(N.refundBeforeValidFrom)}.` };
    },
  }),
  /** Cross-operator ticket acceptance window after a cancellation. */
  crossop: () => ({
    title: 'Which trains can I take after a cancellation?', cta: 'Train cancelled: your options', ctaPage: 'train-cancelled-rights',
    inputs: [{ id: 'h', label: 'Cancelled train, hour', def: 18, max: 23 }, { id: 'm', label: 'Minutes', def: 15, max: 59 }],
    run: (v) => {
      const t = clamp(v.h ?? 0, 0, 23) * 60 + clamp(v.m ?? 0, 0, 59); const w = N.crossOperatorWindowHours * 60;
      const f = (x: number) => { const y = ((x % 1440) + 1440) % 1440; return `${String(Math.floor(y / 60)).padStart(2, '0')}:${String(y % 60).padStart(2, '0')}`; };
      return { head: ['Another operator’s train leaving', `${f(t - w)} to ${f(t + w)}`], rows: [['Same operator', `${n0(N.alternativeTrains)} trains before or after`], ['Scheme in force since', dateL(N.crossOperatorFrom)], ['Operators taking part', n0(N.crossOperatorOperators.length)]] };
    },
  }),
  /** Delay counted against the timetable of the day (strikes, engineering). */
  timetable: () => ({
    title: 'Delay counted on the timetable of the day', cta: 'Strike days and Delay Repay', ctaPage: 'train-strike-refund',
    inputs: [opInput('northern'), { id: 'price', label: 'Single fare paid', def: 18, unit: '£', max: 2000, decimals: 2 }, { id: 'plan', label: 'Arrival in the timetable of the day (min after normal)', def: 30, unit: 'min', max: 600 }, { id: 'real', label: 'Actual arrival (min after normal)', def: 75, unit: 'min', max: 1440 }],
    run: (v) => {
      const o = opAt(v.op); const late = Math.max(0, (v.real ?? 0) - (v.plan ?? 0));
      const r = repay({ operator: o.id, ticket: 'single', price: v.price ?? 0, delay: late });
      return { head: ['Delay that counts', `${n0(late)} min`], rows: [['Compensation', money(r.amount)], ['Late against the normal timetable', `${n0(v.real ?? 0)} min`], ['Not counted', `${n0(Math.min(v.plan ?? 0, v.real ?? 0))} min already in the day’s timetable`]] };
    },
  }),
  /** Missed connection: what counts is arrival at the final destination. */
  connection: () => ({
    title: 'Missed connection: delay at the final station', cta: 'Missed connections explained', ctaPage: 'missed-connection-compensation',
    inputs: [opInput('crosscountry'), { id: 'price', label: 'Through ticket price', def: 70, unit: '£', max: 2000, decimals: 2 }, { id: 'first', label: 'First train late by', def: 12, unit: 'min', max: 600 }, { id: 'wait', label: 'Wait for the next connection', def: 60, unit: 'min', max: 600 }],
    run: (v) => {
      const o = opAt(v.op); const total = (v.first ?? 0) + (v.wait ?? 0);
      const r = repay({ operator: o.id, ticket: 'single', price: v.price ?? 0, delay: total });
      return { head: ['Compensation', money(r.amount)], rows: [['Late at the final station', `about ${n0(total)} min`], ['First train alone', `${n0(v.first ?? 0)} min`], ['Who to claim from', `the operator that caused the delay; any operator forwards it`]], note: 'Assumes the next connection runs on time; the claim uses the real arrival time.' };
    },
  }),
  /** Rail Ombudsman: when it can take a complaint. */
  ombudsman: () => ({
    title: 'When can the Rail Ombudsman take my complaint?', cta: 'Rail Ombudsman explained', ctaPage: 'rail-ombudsman',
    inputs: [{ id: 'day', label: 'Day the operator received your complaint', def: EX, date: true }],
    run: (v) => {
      const d = isoOf(v.day ?? EX); const from = addWorkingDays(d, OMB.afterWorkingDays, BH);
      return { head: ['Ombudsman from', dateL(from)], rows: [['Unless a final response comes first', 'then straight away'], ['After a final response, within', `${n0(OMB.withinMonths)} months`], ['Claims above', `${money(OMB.maxClaim)} are outside its scope`]], note: `${n0(OMB.afterWorkingDays)} working days, weekends and England and Wales bank holidays skipped.` };
    },
  }),
  /** ORR approval and speed statistics for one operator. */
  orrstats: () => ({
    title: 'How an operator handles Delay Repay claims', cta: 'All operators compared', ctaPage: 'delay-repay-claims-by-operator',
    inputs: [opInput('crosscountry')],
    run: (v) => {
      const o = opAt(v.op); const s = orrOf(o.orr);
      if (!s) return { head: ['Approved', 'not reported'], rows: [['Operator', o.name]], note: 'The ORR does not report this operator separately.' };
      return { head: ['Claims approved', pc(s.approvedPct ?? 0)], rows: [['Closed within 20 working days', pc(s.within20Pct ?? 0)], ['Claims closed', n0(s.closed)], ['Period', ORR.lastYear.label]], note: 'Office of Rail and Road, Table 4410 (OGL v3.0). Where the ORR reports a group, the figure covers all its brands.' };
    },
  }),
  /** Railcard break-even. */
  railcard: () => ({
    title: 'Does a railcard pay for itself?', cta: 'Which railcard fits you', ctaPage: 'which-railcard',
    inputs: [{ id: 'card', label: 'Railcard', def: 0, options: CARD_OPTIONS }, { id: 'fare', label: 'Usual full fare of one trip', def: 30, unit: '£', max: 1000, decimals: 2 }, { id: 'trips', label: 'Trips a year', def: 6, max: 1000 }, { id: 'peak', label: 'Weekday before 10am?', def: 0, options: yn }],
    run: (v) => {
      const c = RAILCARDS[clamp(v.card ?? 0, 0, RAILCARDS.length - 1)];
      const b = breakEven(c, v.fare ?? 0, v.trips ?? 0, (v.peak ?? 0) === 1);
      return { head: ['Pays for itself after', b.trips === null ? 'never at this fare' : `${n0(b.trips)} trip${b.trips === 1 ? '' : 's'}`], rows: [['Railcard (1 year)', money(c.price1y)], ['Saving per trip', money(b.savingPerTrip)], ['Net over a year', money(b.net)]], note: c.minFare !== null ? `Minimum fare ${money(c.minFare)} ${c.minFareWhen}.` : c.notes };
    },
  }),
  /** Which railcard: eligibility from a few answers. */
  whichcard: () => ({
    title: 'Which railcards can I get?', cta: 'Is a railcard worth it?', ctaPage: 'is-a-railcard-worth-it',
    inputs: [{ id: 'age', label: 'Your age', def: 27, max: 120 }, { id: 'with', label: 'Usually travelling', def: 0, options: [{ value: '0', label: 'Alone' }, { value: '1', label: 'With the same adult' }, { value: '2', label: 'With children aged 5 to 15' }] }, { id: 'se', label: 'Mostly in London and the South East?', def: 0, options: yn }, { id: 'dis', label: 'Disability that qualifies?', def: 0, options: yn }],
    run: (v) => {
      const age = clamp(v.age ?? 0, 0, 120); const out: string[] = [];
      if (age >= 16 && age <= 17) out.push('16-17 Saver');
      if (age >= 16 && age <= 25) out.push('16-25 Railcard');
      if (age >= 26 && age <= 30) out.push('26-30 Railcard');
      if (age >= 60) out.push('Senior Railcard');
      if ((v.dis ?? 0) === 1) out.push('Disabled Persons Railcard');
      if (age >= 16 && (v.with ?? 0) === 1) out.push('Two Together Railcard');
      if (age >= 16 && (v.with ?? 0) === 2) out.push('Family & Friends Railcard');
      if (age >= 16 && (v.se ?? 0) === 1) out.push('Network Railcard');
      const best = out[0] ?? 'none of the national cards';
      return { head: ['Look first at', best], rows: out.slice(1, 4).map((x, i) => [`Also open to you (${i + 1})`, x] as [string, string]).concat(out.length ? [] : [['Veterans Railcard', 'if you served in HM Armed Forces']]), note: 'Mature students aged 26 and over can also hold a 16-25 Railcard; veterans have their own card.' };
    },
  }),
  /** One railcard: fare with and without. */
  cardfare: () => ({
    title: 'Fare with the railcard', cta: 'Does it pay for itself?', ctaPage: 'is-a-railcard-worth-it',
    inputs: [{ id: 'card', label: 'Railcard', def: 0, options: CARD_OPTIONS }, { id: 'fare', label: 'Full adult fare', def: 40, unit: '£', max: 1000, decimals: 2 }, { id: 'peak', label: 'Minimum fare applies to this trip?', def: 0, options: yn }],
    run: (v) => {
      const c = RAILCARDS[clamp(v.card ?? 0, 0, RAILCARDS.length - 1)]; const d = discounted(c, v.fare ?? 0, (v.peak ?? 0) === 1);
      return { head: ['You pay', money(d)], rows: [['Discount', pc(c.discount)], ['Saving', money(Math.max(0, (v.fare ?? 0) - d))], ['Minimum fare', c.minFare !== null ? money(c.minFare) : 'none']], note: c.notes };
    },
  }),
  /** Split ticketing saving. */
  split: () => ({
    title: 'Split ticket saving', cta: 'Split ticketing explained', ctaPage: 'split-ticketing',
    inputs: [{ id: 'through', label: 'Fare for the whole journey', def: 92, unit: '£', max: 2000, decimals: 2 }, { id: 'a', label: 'First leg fare', def: 38, unit: '£', max: 2000, decimals: 2 }, { id: 'b', label: 'Second leg fare', def: 41, unit: '£', max: 2000, decimals: 2 }, { id: 'c', label: 'Third leg fare (0 if none)', def: 0, unit: '£', max: 2000, decimals: 2 }],
    run: (v) => {
      const s = splitSaving(v.through ?? 0, [v.a ?? 0, v.b ?? 0, v.c ?? 0]);
      return { head: [s.cheaper ? 'You save' : 'No saving', money(Math.max(0, s.saving))], rows: [['Whole journey', money(s.through)], ['Sum of the legs', money(s.legs)], ['Saving', pc(Math.max(0, s.pct))]], note: 'Valid only if your train calls at each station where the tickets change (National Rail Conditions of Travel, condition 14).' };
    },
  }),
  /** Cheapest ticket among the types the visitor can see. */
  cheapest: () => ({
    title: 'Cheapest way to pay for this trip', cta: 'Split ticketing', ctaPage: 'split-ticketing',
    inputs: [{ id: 'anytime', label: 'Anytime fare', def: 120, unit: '£', max: 2000, decimals: 2 }, { id: 'offpeak', label: 'Off-Peak fare (0 if none)', def: 75, unit: '£', max: 2000, decimals: 2 }, { id: 'advance', label: 'Advance fare (0 if none)', def: 39, unit: '£', max: 2000, decimals: 2 }, { id: 'card', label: 'Railcard', def: RAILCARDS.length, options: [...CARD_OPTIONS, { value: String(RAILCARDS.length), label: 'No railcard' }] }],
    run: (v) => {
      const ci = clamp(v.card ?? RAILCARDS.length, 0, RAILCARDS.length); const c = ci < RAILCARDS.length ? RAILCARDS[ci] : null;
      const rows: Array<[string, number]> = [['Anytime', v.anytime ?? 0], ['Off-Peak', v.offpeak ?? 0], ['Advance', v.advance ?? 0]].filter(([, x]) => (x as number) > 0) as Array<[string, number]>;
      const priced = rows.map(([l, x]) => [l, c ? discounted(c, x, false) : x] as [string, number]).sort((a, b) => a[1] - b[1]);
      const best = priced[0];
      return { head: [best ? `Cheapest: ${best[0]}` : 'Enter a fare', best ? money(best[1]) : '£0'], rows: priced.map(([l, x]) => [l, money(x)] as [string, string]), note: 'Advance fares are tied to one train; Off-Peak hours are set by the operator for each route.' };
    },
  }),
  /** Fare freeze: what a 5.8% rise would have added. */
  freeze: () => ({
    title: 'What the 2026 fare freeze saved on your ticket', cta: 'Rail fares 2027', ctaPage: 'rail-fares-2027',
    inputs: [{ id: 'price', label: 'Regulated fare or season price', def: 5200, unit: '£', max: 30000 }, { id: 'rise', label: 'Rise to test for March 2027', def: 0, unit: '%', max: 20, decimals: 1 }],
    run: (v) => {
      const p = v.price ?? 0; const saved = Math.round(p * F.wouldHaveRisenPct * 100) / 100; const next = Math.round(p * (1 + (v.rise ?? 0) / 100) * 100) / 100;
      return { head: ['Freeze saved you', money(saved)], rows: [['Rise avoided in March 2026', pc(F.wouldHaveRisenPct)], ['Price after the rise you test', money(next)], ['2027 decision', F.next2027 ? String(F.next2027) : 'not published yet']], note: 'The freeze covers regulated fares in England; Scotland and Wales set their own fares.' };
    },
  }),
  /** Consequential losses: what Delay Repay covers and what it does not. */
  losses: () => ({
    title: 'Ticket compensation against your other costs', cta: 'Claiming more than the ticket', ctaPage: 'consequential-losses-train-delay',
    inputs: [opInput(), { id: 'price', label: 'Ticket price', def: 35, unit: '£', max: 2000, decimals: 2 }, { id: 'min', label: 'Minutes late', def: 90, unit: 'min', max: 1440 }, { id: 'cost', label: 'Taxi, hotel or other cost', def: 120, unit: '£', max: 20000, decimals: 2 }],
    run: (v) => {
      const o = opAt(v.op); const r = repay({ operator: o.id, ticket: 'single', price: v.price ?? 0, delay: v.min ?? 0 });
      const gap = Math.max(0, (v.cost ?? 0) - 0);
      return { head: ['Delay Repay', money(r.amount)], rows: [['Other costs claimed separately', money(gap)], ['Industry scheme limit', 'price of the ticket'], ['Beyond that', 'goodwill or Consumer Rights Act']], note: 'You cannot recover the same money twice (Conditions of Travel, condition 32).' };
    },
  }),
  /** Operator page: the operator's band table for a fare. */
  bands: () => ({
    title: 'Every band for your fare', cta: 'Full calculator', ctaPage: 'home',
    inputs: [opInput(), { id: 'price', label: 'Single fare paid', def: 40, unit: '£', max: 2000, decimals: 2 }],
    run: (v) => {
      const o = opAt(v.op);
      const rows = o.bands.map((b) => [`${n0(b.from)}${b.to === null ? '+' : `–${n0(b.to)}`} min`, money(Math.round((v.price ?? 0) * b.single * 100) / 100)] as [string, string]);
      return { head: [`${o.name}, from`, `${n0(threshold(o))} min`], rows, note: `Single tickets. Return: ${o.bands.map((b) => pc(b.ret)).join(' / ')} of the return fare per late leg.` };
    },
  }),
  /** Season divisors compared across operators for the same price. */
  divisors: () => ({
    title: 'One journey on your season, by operator', cta: 'Season ticket Delay Repay', ctaPage: 'season-ticket-delay-repay',
    inputs: [{ id: 'kind', label: 'Season type', def: 1, options: SEASONS.map(({ value, label }) => ({ value, label })) }, { id: 'price', label: 'Season price', def: 400, unit: '£', max: 30000 }, opInput('southeastern')],
    run: (v) => {
      const k = SEASONS[clamp(v.kind ?? 0, 0, 3)].kind; const o = opAt(v.op); const d = o.season?.divisors[k];
      return { head: ['Value used per journey', d ? money(Math.round(((v.price ?? 0) / d) * 100) / 100) : 'not published'], rows: [['Divisor at ' + o.name, d ? n0(d) : 'none'], ['30 to 59 min late pays', d ? money(repay({ operator: o.id, ticket: k, price: v.price ?? 0, delay: 30 }).amount) : '—'], ['60 to 119 min late pays', d ? money(repay({ operator: o.id, ticket: k, price: v.price ?? 0, delay: 60 }).amount) : '—']] };
    },
  }),
  /** Season ticket refund (Conditions of Travel, condition 40). */
  seasonrefund: () => ({
    title: 'Refund value of a season you stop using', cta: 'Season tickets and Delay Repay', ctaPage: 'season-ticket-delay-repay',
    inputs: [{ id: 'price', label: 'Monthly or annual season price', def: 4800, unit: '£', max: 30000 }, { id: 'start', label: 'Start date', def: dayNum('2026-03-01'), date: true }, { id: 'back', label: 'Day you hand it back', def: dayNum('2026-10-26'), date: true }, { id: 'weekly', label: 'Weekly season price on the route', def: 140, unit: '£', max: 5000 }, { id: 'day', label: 'Day return on the route', def: 32, unit: '£', max: 2000, decimals: 2 }],
    run: (v) => {
      const used = Math.max(0, (v.back ?? 0) - (v.start ?? 0)); const weeks = Math.floor(used / 7); const rest = used % 7;
      const deduction = weeks * (v.weekly ?? 0) + Math.min(rest * (v.day ?? 0), v.weekly ?? 0);
      const refund = Math.max(0, (v.price ?? 0) - deduction - N.seasonRefund.adminMax);
      return { head: ['Refund, at least about', money(Math.round(refund))], rows: [['Days used', n0(used)], ['Deducted for travel used', money(Math.round(deduction))], ['Administration fee, up to', money(N.seasonRefund.adminMax)]], note: 'Condition 40.2: a return journey is deducted for each day since the start, priced as in its example (7-day seasons, then day returns). Annual seasons: no refund after 10 months and 12 days.' };
    },
  }),
};

export function getSpec(kind: string): MiniSpec {
  const f = SPECS[kind];
  if (!f) throw new Error(`Unknown mini-tool: ${kind}`);
  return f();
}
export const MINI_KINDS = Object.keys(SPECS);
export { addMonths };
/** Index of an operator in the mini-tools' list, for page defaults given as an operator id. */
export const opIndexOf = (id: string) => { if (!operatorById(id)) throw new Error(`Unknown operator ${id}`); return opIndex(id); };
