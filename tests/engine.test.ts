/** Engine checks against examples worked by hand from the operators' published terms. */
import { describe, expect, it } from 'vitest';
import { repay, claimDeadline, nrcotMinimum, operatorById, threshold, OPERATORS, seasonTotal } from '../src/lib/engine/repay';
import { discounted, breakEven, splitSaving, railcardById } from '../src/lib/engine/fares';
import { addWorkingDays } from '../src/lib/engine/dates';
import P from '../src/data/params-2026.json';

describe('Delay Repay 15 (Southern)', () => {
  it('single: 25% / 50% / 100%', () => {
    expect(repay({ operator: 'southern', ticket: 'single', price: 40, delay: 14 }).amount).toBe(0);
    expect(repay({ operator: 'southern', ticket: 'single', price: 40, delay: 15 }).amount).toBe(10);
    expect(repay({ operator: 'southern', ticket: 'single', price: 40, delay: 30 }).amount).toBe(20);
    expect(repay({ operator: 'southern', ticket: 'single', price: 40, delay: 60 }).amount).toBe(40);
  });
  it('return: 12.5% per leg, both legs added, 120+ refunds the return, capped at the price', () => {
    expect(repay({ operator: 'southern', ticket: 'return', price: 80, delay: 20 }).amount).toBe(10);
    expect(repay({ operator: 'southern', ticket: 'return', price: 80, delay: 45, delayBack: 45 }).amount).toBe(40);
    expect(repay({ operator: 'southern', ticket: 'return', price: 80, delay: 125 }).amount).toBe(80);
    expect(repay({ operator: 'southern', ticket: 'return', price: 80, delay: 125, delayBack: 125 }).amount).toBe(80);
  });
  it('annual season: price / 464, two journeys from 120 minutes', () => {
    expect(repay({ operator: 'southern', ticket: 'annual', price: 4640, delay: 32 }).amount).toBe(5);
    expect(repay({ operator: 'southern', ticket: 'annual', price: 4640, delay: 130 }).amount).toBe(20);
    expect(seasonTotal(operatorById('southern')!, 'annual', 4640, 32, 3).total).toBe(15);
  });
});

describe('other schemes', () => {
  it('CrossCountry starts at 30 minutes', () => {
    expect(threshold(operatorById('crosscountry')!)).toBe(30);
    expect(repay({ operator: 'crosscountry', ticket: 'single', price: 50, delay: 25 }).amount).toBe(0);
    expect(repay({ operator: 'crosscountry', ticket: 'single', price: 50, delay: 35 }).amount).toBe(25);
  });
  it('West Midlands Railway values a weekly season by the day: £100 / 5 × 25% at 30 minutes', () => {
    expect(repay({ operator: 'west-midlands-railway', ticket: 'weekly', price: 100, delay: 30 }).amount).toBe(5);
  });
  it('a season with no published divisor is flagged, not guessed', () => {
    const r = repay({ operator: 'scotrail', ticket: 'annual', price: 3000, delay: 40 });
    expect(r.seasonUnsupported).toBe(true);
    expect(r.amount).toBe(0);
  });
  it('Grand Central pays from 60 minutes', () => {
    expect(repay({ operator: 'grand-central', ticket: 'single', price: 60, delay: 59 }).amount).toBe(0);
    expect(repay({ operator: 'grand-central', ticket: 'single', price: 60, delay: 130 }).amount).toBe(45);
  });
});

describe('national rules', () => {
  it('every operator pays at least the Conditions of Travel minimum from 60 minutes', () => {
    for (const o of OPERATORS) {
      for (const m of [60, 90, 150]) {
        expect(repay({ operator: o.id, ticket: 'single', price: 100, delay: m }).amount, `${o.id} ${m}`).toBeGreaterThanOrEqual(nrcotMinimum(100, 'single', m));
      }
    }
  });
  it('claim deadline: 28 days after the journey', () => {
    expect(claimDeadline(operatorById('northern')!, '2026-11-02')).toBe('2026-11-30');
  });
  it('Rail Ombudsman: 40 working days, bank holidays skipped', () => {
    expect(addWorkingDays('2026-12-01', 40, P.bankHolidays.englandWales)).toBe('2027-01-29');
  });
});

describe('fares', () => {
  it('16-25 Railcard: a third off, £12 minimum before 10am', () => {
    const c = railcardById('16-25');
    expect(discounted(c, 30, false)).toBe(20);
    expect(discounted(c, 15, true)).toBe(12);
    expect(discounted(c, 10, true)).toBe(10);
    expect(breakEven(c, 30, 6).trips).toBe(4);
  });
  it('split tickets', () => {
    const s = splitSaving(92, [38, 29, 12]);
    expect(s.saving).toBe(13);
    expect(s.cheaper).toBe(true);
  });
});
