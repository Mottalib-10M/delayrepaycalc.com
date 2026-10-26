/**
 * Delay Repay calculator: operator, ticket, price and minutes late → the amount, the band that
 * applied, what the next band would pay, the last day to claim and the operator's own claim form.
 * Every rule comes from params-2026.json through `lib/engine/repay.ts`. First render = build
 * defaults and build day (RECETTE §17.5); the shared link and today are applied after mount.
 */
import { useEffect, useMemo, useState } from 'react';
import SelectField from '../ui/SelectField';
import NumberField from '../ui/NumberField';
import { DateField, PRIVACY } from './fields';
import { OPERATORS, operatorById, repay, claimDeadline, daysLeft, threshold, type TicketKind } from '../../lib/engine/repay';
import { money, dateL, formatNumberL, pct } from '../../lib/format-l';
import { readParams, num, str, updateURL } from '../../lib/url-state';

declare const __BUILD_DAY__: string;
interface Props { operator?: string; ticket?: TicketKind; price?: number; delay?: number; idPrefix?: string; primary?: boolean; lockOperator?: boolean; methodHref?: string }

const TICKETS: Array<{ value: TicketKind; label: string }> = [
  { value: 'single', label: 'Single (or one leg of two singles)' },
  { value: 'return', label: 'Return' },
  { value: 'weekly', label: 'Weekly season' },
  { value: 'monthly', label: 'Monthly season' },
  { value: 'annual', label: 'Annual season' },
  { value: 'flexi', label: 'Flexi season' },
];
const opOptions = [...OPERATORS].sort((a, b) => a.name.localeCompare(b.name)).map((o) => ({ value: o.id, label: o.name }));

export default function RepayCalc({ operator: o0 = 'avanti-west-coast', ticket: t0 = 'single', price: p0 = 60, delay: d0 = 35, idPrefix = 'dr', primary = true, lockOperator = false, methodHref }: Props) {
  const [op, setOp] = useState(o0);
  const [ticket, setTicket] = useState<TicketKind>(t0);
  const [price, setPrice] = useState(p0);
  const [delay, setDelay] = useState(d0);
  const [back, setBack] = useState(0);
  const [today, setToday] = useState(__BUILD_DAY__);
  const [travel, setTravel] = useState(__BUILD_DAY__);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    const t = new Date().toISOString().slice(0, 10);
    setToday(t);
    if (!primary) { setTravel(t); return; }
    const u = readParams(window.location.search);
    if (!lockOperator && operatorById(str(u, 'op', o0))) setOp(str(u, 'op', o0));
    const tk = str(u, 't', t0) as TicketKind; if (TICKETS.some((x) => x.value === tk)) setTicket(tk);
    setPrice(num(u, 'p', p0)); setDelay(num(u, 'd', d0)); setBack(num(u, 'b', 0));
    setTravel(/^\d{4}-\d{2}-\d{2}$/.test(str(u, 'day', '')) ? str(u, 'day', t) : t);
  }, []);
  useEffect(() => { if (primary && touched) updateURL({ op: lockOperator ? undefined : op, t: ticket, p: price, d: delay, b: ticket === 'return' ? back : undefined, day: travel }); }, [op, ticket, price, delay, back, travel, touched]);
  const touch = <T,>(f: (v: T) => void) => (v: T) => { setTouched(true); f(v); };
  const id = (s: string) => `${idPrefix}-${s}`;

  const r = useMemo(() => repay({ operator: op, ticket, price, delay, delayBack: back }), [op, ticket, price, delay, back]);
  const o = r.op;
  const deadline = claimDeadline(o, travel);
  const left = daysLeft(o, travel, today);
  const isSeason = ticket !== 'single' && ticket !== 'return';
  const div = isSeason ? o.season?.divisors[ticket as 'weekly'] : undefined;
  const bandTxt = (b: typeof r.band) => (b ? `${formatNumberL(b.from)}${b.to === null ? '+' : `–${formatNumberL(b.to)}`} min` : 'under the threshold');

  return (
    <div className="not-prose rounded-xl border border-accent-200 bg-white p-4 sm:p-5" data-repay>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <form className="grid min-w-0 grid-cols-[minmax(0,1fr)] content-start gap-x-4 gap-y-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" onSubmit={(e) => e.preventDefault()} {...(primary ? {} : { 'data-simulateur-secondaire': '' })}>
          {!lockOperator && <SelectField id={id('op')} label="Train company you claim from" value={op} onChange={touch(setOp)} options={opOptions} className="sm:col-span-2" />}
          <SelectField id={id('ticket')} label="Ticket" value={ticket} onChange={touch((x: string) => setTicket(x as TicketKind))} options={TICKETS} />
          <NumberField id={id('price')} label={isSeason ? 'Price paid for the season' : 'Price paid'} value={price} onChange={touch(setPrice)} unit="£" max={20000} decimals={2} />
          <NumberField id={id('delay')} label={ticket === 'return' ? 'Minutes late, outward' : 'Minutes late at destination'} value={delay} onChange={touch(setDelay)} unit="min" max={1440} />
          {ticket === 'return'
            ? <NumberField id={id('back')} label="Minutes late, return" value={back} onChange={touch(setBack)} unit="min" max={1440} />
            : <DateField id={id('day')} label="Day of the journey" value={travel} onChange={touch(setTravel)} />}
          {ticket === 'return' && <DateField id={id('day2')} label="Day of the late journey" value={travel} onChange={touch(setTravel)} />}
          <p className="text-xs text-navy-600 sm:col-span-2">{PRIVACY}</p>
        </form>
        <div aria-live="polite" {...(primary ? { 'data-resultat': '' } : {})} className="rounded-lg bg-accent-50 p-4">
          <p className="text-sm font-medium text-navy-700">{o.name} would pay</p>
          <p className="tabular-nums mt-1 text-4xl font-bold text-navy-900">{money(r.amount)}</p>
          <p className="text-sm text-navy-700">{r.seasonUnsupported ? 'This operator publishes no divisor for this season type: claim on its form, which works it out.' : r.eligible ? `${pct(r.pct, 'en', r.pct * 100 % 1 ? 1 : 0)} of the ${r.basisLabel}` : `Nothing below ${formatNumberL(r.threshold)} minutes with ${o.name}`}</p>
          <table className="mt-3 w-full text-sm"><tbody className="divide-y divide-accent-200">
            <tr><td className="py-1.5 pr-2 text-navy-700">Scheme</td><td className="py-1.5 text-right font-medium">{o.scheme}, from {formatNumberL(threshold(o))} min</td></tr>
            <tr><td className="py-1.5 pr-2 text-navy-700">Band applied</td><td className="py-1.5 text-right font-medium">{bandTxt(r.band)}{ticket === 'return' && back > 0 ? ` + ${bandTxt(r.bandBack)}` : ''}</td></tr>
            {isSeason && !r.seasonUnsupported && <tr><td className="py-1.5 pr-2 text-navy-700">Season price ÷ {formatNumberL(div ?? 0)}</td><td className="py-1.5 text-right font-medium">{money(Math.round(r.basis * 100) / 100)}</td></tr>}
            {r.next && <tr><td className="py-1.5 pr-2 text-navy-700">From {formatNumberL(r.next.from)} min late</td><td className="py-1.5 text-right font-medium">{money(r.next.amount)}</td></tr>}
            <tr><td className="py-1.5 pr-2 text-navy-700">Claim by</td><td className="py-1.5 text-right font-medium">{dateL(deadline)}{left >= 0 ? ` (${formatNumberL(left)} day${left === 1 ? '' : 's'} left)` : ' (passed)'}</td></tr>
          </tbody></table>
          <div className="mt-3 flex flex-wrap items-center gap-3 print:hidden">
            <a href={o.claimUrl} target="_blank" rel="nofollow noopener noreferrer" className="inline-flex h-10 items-center rounded-lg bg-accent-700 px-4 text-sm font-medium text-white hover:bg-accent-800">{o.claimLabel}</a>
            {methodHref && <a href={methodHref} className="text-sm text-navy-700 underline">How this is worked out</a>}
          </div>
          <p className="mt-2 text-xs text-navy-600">Estimate from the scheme {o.name} publishes, read on {dateL(o.readOn)}. The operator checks the train you were on and decides the claim.</p>
        </div>
      </div>
    </div>
  );
}
