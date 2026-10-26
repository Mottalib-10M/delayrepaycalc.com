import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'season-ticket-delay-repay',
  group: 'claim',
  order: 7,
  tool: { kind: 'repay', props: { operator: 'southern', ticket: 'annual', price: 4380, delay: 32 } },
  mini: { kind: 'mini:season', props: { op: 'southern' } },
  related: ['season-ticket-refund', 'delay-repay-amounts', 'delay-repay-time-limit', 'train-strike-refund', 'automatic-delay-repay'],
  sources: ['nrcot', 'nr_comp'],
  demarche: true,
  en: {
    slug: 'season-ticket-delay-repay',
    nav: 'Season tickets',
    card: 'How a weekly, monthly, annual or Flexi season is turned into a value per journey, the divisor of each operator, and what a month of delays adds up to.',
    title: 'Season Ticket Delay Repay: Divisors and Amount per Journey',
    description: 'Season ticket Delay Repay: how each operator divides a weekly, monthly, annual or Flexi season into a value per journey, and what your delays are worth.',
    h1: 'Delay Repay on a season ticket',
    intro: 'Choose the operator, the season type, its price and the minutes late: the tool divides the season into one journey and applies the band.',
    resume: (h) => `Delay Repay on a season ticket starts by turning the season price into the value of one journey. Most operators divide a weekly season by ${h.num(h.op('southern').season?.divisors.weekly ?? 0)}, a monthly by ${h.num(h.op('southern').season?.divisors.monthly ?? 0)}, an annual by ${h.num(h.op('southern').season?.divisors.annual ?? 0)} and a Flexi season by ${h.num(h.op('southern').season?.divisors.flexi ?? 0)}: the number of single journeys the ticket is assumed to cover. The delay bands then apply to that value as for a single ticket: with a Delay Repay 15 operator, 25% from 15 minutes, 50% from 30 and 100% from 60, and many operators pay two journeys from 120 minutes. An annual season bought for ${h.gbp(4380)} with ${h.op('southern').name} is worth ${h.gbp(Math.round((4380 / (h.op('southern').season?.divisors.annual ?? 1)) * 100) / 100)} a journey, so a 32-minute delay pays ${h.gbp(h.pay('southern', 'annual', 4380, 32))}. West Midlands Railway and London Northwestern Railway use a daily value instead, with half the shares. The National Rail Conditions of Travel leave season tickets to each operator's charter, so the divisor of the company that ran the late train decides.`,
    faqs: (h) => [
      { q: 'Can I claim Delay Repay on a season ticket for every late journey?', a: 'Yes. Each late journey is a separate claim, valued at the share of one journey for its delay band. Commuters on busy lines often claim several times a week. Some operators cap the claims of one day: Transport for Wales accepts two a day on a season, and the Govia Thameslink brands one claim of 120 minutes or more a day, worth a full day of travel.' },
      { q: 'What if I did not travel because of a strike, with a season ticket?', a: 'Delay Repay pays for journeys made late, so a day you stayed at home is not a delay. South Western Railway lets a season holder who abandons the journey claim it as a delay of 120 minutes or more, and Transport for Wales accepts season claims for strike days. Other operators have their own terms, so check the operator page before assuming nothing is due.' },
      { q: 'Is a Flexi season compensated like a weekly one?', a: 'It is divided differently. A Flexi season covers a set number of days of travel, so operators divide its price by the number of single journeys in those days, which gives a higher value per journey than a weekly season. The calculator applies the Flexi divisor published by the operator, where one is published.' },
    ],
    body: (h) => `
<h2>The divisor of each operator</h2>
<p>The table lists the divisor each operator publishes for each season type, as read on its terms, with the basis it applies. A dash means no divisor is published: the operator's claim form works out the value, and the calculator cannot.</p>
${h.table(['Operator', 'Weekly', 'Monthly', 'Annual', 'Flexi', 'Value of'], h.byName(h.OPS).map((o) => [h.a(`op-${o.id}`, o.name), o.season?.divisors.weekly ?? '-', o.season?.divisors.monthly ?? '-', o.season?.divisors.annual ?? '-', o.season?.divisors.flexi ?? '-', o.season ? (o.season.basis === 'return' ? 'one day' : 'one journey') : 'none published']), 'Season price divided by this number gives the value used for each claim. Read on each operator’s Delay Repay terms or Passenger’s Charter.', ['l', 'r', 'r', 'r', 'r', 'l'])}

<h2>Why the divisors are what they are</h2>
<p>The numbers follow a working week: five days, two journeys a day. A weekly season is ten journeys. A month of four weeks is forty. An annual season is ${h.num(h.op('southern').season?.divisors.annual ?? 0)} journeys, which is 232 days of two journeys each. The daily value used by ${h.op('west-midlands-railway').name} is the same arithmetic stopped at the day: weekly divided by ${h.num(h.op('west-midlands-railway').season?.divisors.weekly ?? 0)}, annual by ${h.num(h.op('west-midlands-railway').season?.divisors.annual ?? 0)}, with shares halved, so the amount per late journey comes out the same.</p>

<h2>The 120-minute band on a season</h2>
<p>From two hours late, many operators pay the value of two journeys, the cost of a day's return travel, rather than one. ${h.byName(h.OPS.filter((o) => o.season && o.bands.some((b) => b.season >= 2))).map((o) => o.name).join(', ')} publish this. Others pay the value of one journey at most. A day thrown into chaos is therefore worth claiming as one long delay rather than two shorter ones.</p>
<!--tool:mini:divisors-->

<h2>A month of delays, worked out</h2>
<p>Take a monthly season bought for ${h.gbp(420)} with ${h.op('southeastern').name}. One journey is worth ${h.gbp(Math.round((420 / (h.op('southeastern').season?.divisors.monthly ?? 1)) * 100) / 100)}. In a month with six delays of 15 to 29 minutes, two of 30 to 59 minutes and one of more than an hour, the claims come to ${h.gbp(6 * h.pay('southeastern', 'monthly', 420, 20) + 2 * h.pay('southeastern', 'monthly', 420, 40) + h.pay('southeastern', 'monthly', 420, 70))}. Small sums each time, but over a year of disrupted mornings they can repay a few weeks of the season. The tool under the citable block adds up identical delays for you.</p>

<h2>Claiming smoothly as a commuter</h2>
<ul>
<li><strong>Register the season once</strong> in the operator's online account, with its price and dates: later claims take a minute.</li>
<li><strong>Use automatic claims where they exist.</strong> Several operators pay smartcard seasons without a form, as the ${h.a('automatic-delay-repay', 'automatic Delay Repay page')} lists.</li>
<li><strong>Watch the ${h.num(h.N.claimDays)} days.</strong> Each journey has its own limit, so claim weekly rather than at the end of the season.</li>
<li><strong>Stopping the season?</strong> A refund for the unused part follows separate rules in Part G of the ${h.src('nrcot', 'Conditions of Travel')}, with a fee of up to ${h.gbp(h.N.seasonRefund.adminMax)}: see the ${h.a('season-ticket-refund', 'season ticket refund page')}.</li>
</ul>`,
  },
});
