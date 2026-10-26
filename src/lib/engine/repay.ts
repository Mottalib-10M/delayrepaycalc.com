/**
 * Delay Repay engine: what a late train is worth on a given ticket, with a given operator.
 * Every band, divisor and time limit comes from `data/params-2026.json` (read on each operator's
 * Passenger's Charter or Delay Repay terms, date in `readOn`). Pure functions, no clock: the caller
 * passes "today" (hydration, RECETTE §17.5).
 */
import P from '../../data/params-2026.json';
import { addDays, dayNum, type Iso } from './dates';

/** One delay band: from `from` minutes (inclusive) to `to` (inclusive, null = no upper end). */
export interface Band { from: number; to: number | null; single: number; ret: number; season: number }
export type SeasonKind = 'weekly' | 'monthly' | 'annual' | 'flexi';
export interface Operator {
  id: string; name: string; scheme: string; bands: Band[];
  season: { divisors: Partial<Record<SeasonKind, number>>; basis: 'single' | 'return'; note: string } | null;
  deadlineDays: number; payment: string[]; automatic: string | null; claimUrl: string; claimLabel: string;
  readOn: string; sources: string[]; notes: string[]; owner: string; orr: string | null;
}
export type TicketKind = 'single' | 'return' | SeasonKind;

export const OPERATORS = (P as unknown as { operators: Operator[] }).operators;
export const operatorById = (id: string) => OPERATORS.find((o) => o.id === id);
const fallback = () => OPERATORS[0];

/** Smallest delay that pays with this operator (15 for Delay Repay 15, 30 for Delay Repay 30…). */
export const threshold = (op: Operator) => Math.min(...op.bands.map((b) => b.from));

export function bandFor(op: Operator, minutes: number): Band | null {
  const m = Math.floor(Math.max(0, minutes));
  return op.bands.find((b) => m >= b.from && (b.to === null || m <= b.to)) ?? null;
}

/** Value of one journey on a season ticket: price divided by the operator's divisor for that kind. */
export function seasonJourneyValue(op: Operator, kind: SeasonKind, price: number): number | null {
  const d = op.season?.divisors[kind];
  return d ? price / d : null;
}

export interface RepayInput {
  operator: string; ticket: TicketKind; price: number;
  /** Minutes late at the destination, outward journey (or the only journey). */
  delay: number;
  /** Return tickets only: minutes late on the way back (0 if on time). */
  delayBack?: number;
}
export interface RepayResult {
  amount: number; pct: number; basis: number; basisLabel: string;
  band: Band | null; bandBack: Band | null; threshold: number; eligible: boolean;
  /** Next band up for the outward journey: from how many minutes, and what it would pay. */
  next: { from: number; amount: number } | null;
  op: Operator; seasonUnsupported: boolean;
}

/** Share of the basis paid for one journey in a band, by ticket kind. */
const share = (b: Band | null, t: TicketKind) => (!b ? 0 : t === 'single' ? b.single : t === 'return' ? b.ret : b.season);

export function repay(i: RepayInput): RepayResult {
  const op = operatorById(i.operator) ?? fallback();
  const price = Math.max(0, i.price || 0);
  const isSeason = i.ticket !== 'single' && i.ticket !== 'return';
  let basis = price, basisLabel = i.ticket === 'single' ? 'single fare paid' : 'return fare paid', seasonUnsupported = false;
  if (isSeason) {
    const v = seasonJourneyValue(op, i.ticket as SeasonKind, price);
    if (v === null) { seasonUnsupported = true; basis = 0; } else basis = v;
    basisLabel = op.season?.basis === 'return' ? 'value of one day’s travel on the season' : 'value of one journey on the season';
  }
  const band = bandFor(op, i.delay);
  const bandBack = i.ticket === 'return' ? bandFor(op, i.delayBack ?? 0) : null;
  let pct = share(band, i.ticket) + (i.ticket === 'return' ? share(bandBack, 'return') : 0);
  if (i.ticket === 'return') pct = Math.min(1, pct);
  const amount = Math.round(basis * pct * 100) / 100;
  const higher = op.bands.filter((b) => b.from > Math.floor(Math.max(0, i.delay))).sort((a, b) => a.from - b.from)[0];
  const next = higher ? { from: higher.from, amount: Math.round(basis * Math.min(1, share(higher, i.ticket) + (i.ticket === 'return' ? share(bandBack, 'return') : 0)) * 100) / 100 } : null;
  return { amount, pct, basis, basisLabel, band, bandBack, threshold: threshold(op), eligible: amount > 0, next, op, seasonUnsupported };
}

/** Last day to claim: `deadlineDays` after the day of travel (the National Rail Conditions count 28 days from the journey). */
export function claimDeadline(op: Operator, travelled: Iso): Iso {
  return addDays(travelled, op.deadlineDays);
}
/** Days left to claim on `today` (negative once the deadline has passed). */
export const daysLeft = (op: Operator, travelled: Iso, today: Iso) => dayNum(claimDeadline(op, travelled)) - dayNum(today);

/**
 * Minimum under the National Rail Conditions of Travel (condition 33.3): 60 minutes or more late,
 * 50% of the price paid for the delayed portion. Every operator's own scheme pays at least this.
 */
export function nrcotMinimum(price: number, ticket: 'single' | 'return', delay: number, bothLegs = false): number {
  const N = P.national;
  if (delay < N.minDelay) return 0;
  const portion = ticket === 'single' || bothLegs ? price : price / 2;
  return Math.round(portion * N.minPct * 100) / 100;
}

/** Compensation over a season ticket's life when `n` journeys fall in the same band. */
export function seasonTotal(op: Operator, kind: SeasonKind, price: number, delay: number, n: number) {
  const r = repay({ operator: op.id, ticket: kind, price, delay });
  return { per: r.amount, total: Math.round(r.amount * Math.max(0, Math.floor(n)) * 100) / 100, r };
}
