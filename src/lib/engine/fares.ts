/**
 * Fares engine: railcards (price, discount, minimum fare, break-even) and split tickets.
 * Railcard terms come from `data/params-2026.json` → `railcards` (read on railcard.co.uk, date in
 * `retrieved_at`). Split-ticket savings are arithmetic on fares the visitor types: the site holds no
 * fare database and never guesses a fare.
 */
import P from '../../data/params-2026.json';

export interface Railcard {
  id: string; name: string; price1y: number; price3y: number | null; discount: number; childDiscount: number | null;
  /** Minimum adult fare (after discount) when it applies, and when it applies. */
  minFare: number | null; minFareWhen: string | null;
  /** Earliest weekday departure allowed, or null if none (e.g. "09:30"). */
  notBefore: string | null; ages: string; travellers: string; seasons: boolean; notes: string;
}
export const RAILCARDS = (P as unknown as { railcards: { cards: Railcard[] } }).railcards.cards;
export const railcardById = (id: string) => RAILCARDS.find((r) => r.id === id) ?? RAILCARDS[0];

const r2 = (x: number) => Math.round(x * 100) / 100;

/**
 * Discounted fare for one adult ticket. When a minimum fare applies to the trip, the railcard fare is
 * never below it; and if the full fare is already below the minimum, the full fare is paid.
 */
export function discounted(card: Railcard, fare: number, minFareApplies: boolean): number {
  const f = Math.max(0, fare);
  let d = f * (1 - card.discount);
  if (minFareApplies && card.minFare !== null) d = Math.max(d, Math.min(f, card.minFare));
  return r2(d);
}

export interface BreakEven { savingPerTrip: number; trips: number | null; yearSaving: number; net: number }
/**
 * How many trips pay for the railcard. `fare` = usual full fare of one trip (single or return as
 * the visitor travels), `perYear` = trips in a year, `years` = 1 or 3.
 */
export function breakEven(card: Railcard, fare: number, perYear: number, minFareApplies = false, years: 1 | 3 = 1): BreakEven {
  const price = years === 3 && card.price3y ? card.price3y / 3 : card.price1y;
  const saving = r2(Math.max(0, fare) - discounted(card, fare, minFareApplies));
  const trips = saving > 0 ? Math.ceil(price / saving) : null;
  const yearSaving = r2(saving * Math.max(0, Math.floor(perYear)));
  return { savingPerTrip: saving, trips, yearSaving, net: r2(yearSaving - price) };
}

export interface SplitResult { through: number; legs: number; saving: number; pct: number; cheaper: boolean }
/** Through fare against the sum of the split legs typed by the visitor. */
export function splitSaving(through: number, legs: number[]): SplitResult {
  const t = Math.max(0, through || 0);
  const s = r2(legs.reduce((a, b) => a + Math.max(0, b || 0), 0));
  const saving = r2(t - s);
  return { through: t, legs: s, saving, pct: t > 0 ? saving / t : 0, cheaper: saving > 0 };
}
