/** Writing helpers handed to every page: links, figures read from params-2026.json and orr-claims.json, tables. */
import { route, ROUTES, type Locale } from '../i18n/routes';
import { formatNumberL, money, pct, dateL } from './format-l';
import { OPERATORS, operatorById, threshold, repay, type Operator, type TicketKind } from './engine/repay';
import { RAILCARDS, railcardById } from './engine/fares';
import P from '../data/params-2026.json';
import ORR from '../data/orr-claims.json';

export type SourceKey = keyof typeof P.sources;
const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption: string | undefined, align: Array<'l' | 'r'>) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumberL(c)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

type OrrRow = { received: number; closed: number; approved: number; approvedPct: number | null; within20Pct: number | null };
/** ORR statistics for an operator page id (the ORR reports GTR and West Midlands Trains as one operator each). */
export function orrFor(orrId: string | null | undefined): { last: OrrRow | null; current: OrrRow | null } {
  if (!orrId) return { last: null, current: null };
  const L = (ORR.lastYear.ops as Record<string, OrrRow>)[orrId] ?? null;
  const C = (ORR.current.ops as Record<string, OrrRow>)[orrId] ?? null;
  return { last: L, current: C };
}

/** Every page id of the plan: a link to a planned page that is not written yet renders as text. */
export const PLANNED: string[] = [
  ...OPERATORS.map((o) => `op-${o.id}`),
  'train-delay-compensation', 'delay-repay-amounts', 'delay-repay-15-minutes', 'delay-repay-return-ticket', 'season-ticket-delay-repay',
  'delay-repay-time-limit', 'how-to-claim-delay-repay', 'delay-repay-advance-tickets', 'automatic-delay-repay', 'delay-repay-rejected',
  'rail-ombudsman', 'delay-repay-claims-by-operator', 'cancelled-train-refund', 'train-cancelled-rights', 'missed-connection-compensation',
  'train-strike-refund', 'stranded-train-taxi-hotel', 'consequential-losses-train-delay', 'split-ticketing', 'cheap-train-tickets',
  'which-railcard', 'is-a-railcard-worth-it', '16-25-railcard', '26-30-railcard', 'two-together-railcard', 'network-railcard',
  'senior-railcard', 'family-and-friends-railcard', 'rail-fares-2027', 'season-ticket-refund',
];
export function helpers(lang: Locale = 'en', strict = false) {
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict && !PLANNED.includes(id)) throw new Error(`Unknown page id in a link: ${id}`); return text; }
    return `<a href="${route(id, lang)}">${text}</a>`;
  };
  const ext = (url: string, text: string) => `<a href="${url}" target="_blank" rel="nofollow noopener noreferrer">${text}</a>`;
  const src = (k: SourceKey, text: string) => ext(P.sources[k].url, text);
  const gbp = (n: number) => money(n);
  const num = (n: number, d = 0) => formatNumberL(n, 'en', d);
  const pc = (x: number, d = 0) => pct(x, 'en', d);
  const op = (id: string): Operator => { const o = operatorById(id); if (!o) throw new Error(`Unknown operator ${id}`); return o; };
  /** Worked amount for an example, always from the engine. */
  const pay = (operator: string, ticket: TicketKind, price: number, delay: number, delayBack = 0) => repay({ operator, ticket, price, delay, delayBack }).amount;
  const mins = (b: { from: number; to: number | null }) => (b.to === null ? `${formatNumberL(b.from)} or more` : `${formatNumberL(b.from)} to ${formatNumberL(b.to)}`);
  const share = (x: number) => pct(x, 'en', Math.round(x * 1000) % 10 ? 1 : 0);
  /** The operator's bands applied to an example fare: minutes, share of a single, amount, share of a return per leg. */
  const bandRows = (id: string, price: number) => op(id).bands.map((b) => [mins(b), share(b.single), money(Math.round(price * b.single * 100) / 100), share(b.ret)]);
  /** Share of the price paid at `m` minutes late for a ticket kind (0 to 1), from the engine. */
  const shareAt = (id: string, m: number, t: TicketKind = 'single') => repay({ operator: id, ticket: t, price: 100, delay: m }).pct;
  const byName = <T extends { name: string }>(xs: T[]) => [...xs].sort((a, b) => a.name.localeCompare(b.name));
  const ord = (n: number) => { const t = n % 100, u = n % 10; return `${formatNumberL(n)}${t >= 11 && t <= 13 ? 'th' : u === 1 ? 'st' : u === 2 ? 'nd' : u === 3 ? 'rd' : 'th'}`; };
  return {
    ord, mins, share, bandRows, shareAt, byName,
    lang, a, ext, src, gbp, num, pc, P, N: P.national, OMB: P.ombudsman, FARES: P.fares, ORR, OPS: OPERATORS, op, pay, threshold,
    orr: orrFor, cards: RAILCARDS, card: railcardById,
    date: (iso: string) => dateL(iso),
    table: (h: string[], r: Array<Array<string | number>>, c?: string, al: Array<'l' | 'r'> = []) => table(h, r, c, al),
  };
}
export type Helpers = ReturnType<typeof helpers>;
