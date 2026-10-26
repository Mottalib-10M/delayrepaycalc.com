import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'rail-fares-2027',
  group: 'fares',
  order: 50,
  tool: { kind: 'mini:freeze' },
  mini: { kind: 'mini:divisors', props: { kind: 2, price: 5200, op: 'south-western-railway' } },
  related: ['cheap-train-tickets', 'season-ticket-delay-repay', 'season-ticket-refund', 'is-a-railcard-worth-it'],
  sources: ['gov_freeze', 'gov_gbr', 'nrcot'],
  en: {
    slug: 'rail-fares-2027',
    nav: 'Rail fares 2027',
    card: 'The 2026 freeze of regulated fares in England, what it saved, and what is known about fares from March 2027: test a rise on your own ticket.',
    title: 'Rail Fares 2027: After the 2026 Freeze, What Comes Next',
    description: 'Rail fares 2027: regulated fares in England were frozen in March 2026 instead of rising 5.8%. What the freeze saved, what is still to come, and your ticket.',
    h1: 'Rail fares in 2027: after the freeze',
    intro: 'Type the price of your season or regulated ticket: the tool shows what the 2026 freeze saved you and the price after any rise you want to test for 2027.',
    resume: (h) => `Regulated rail fares in England were frozen from ${h.date(h.FARES.freezeFrom)}, the first freeze in thirty years according to the Department for Transport. Regulated fares are those whose rises the government controls: ${h.FARES.freezeScope}. Without the freeze, announced on ${h.date(h.FARES.freezeAnnounced)}, they would have risen by ${h.pc(h.FARES.wouldHaveRisenPct, 1)}; the government expects passengers to save ${h.gbp(h.FARES.savingMillions)} million in 2026 to 2027, with examples of ${h.FARES.examples.map((e) => `${h.gbp(e.saving)} a year from ${e.route}`).join(', ')} for a commuter on flexi seasons three days a week. For March 2027, ${h.FARES.next2027 ? `the government has announced ${h.FARES.next2027}.` : `no decision had been published on GOV.UK when this page was last checked, on ${h.date(h.FARES.next2027Checked)}: the rise, or another freeze, is still to come, and this page will give it once it is announced.`} Unregulated fares, such as most Advance tickets, are set by operators. Scotland and Wales set their own fares policy. The tool above tests any rise on your own ticket.`,
    faqs: (h) => [
      { q: 'Will train fares go up in March 2027?', a: `It has not been announced. Regulated fare rises in England are decided by the government, usually in the months before the change in March. The freeze of ${h.date(h.FARES.freezeFrom)} covered one year. Until a decision is published, the tool on this page lets you test any rise on your own ticket price; the page will be updated with the official figure.` },
      { q: 'Which tickets were covered by the 2026 rail fare freeze?', a: 'Regulated fares in England: season tickets, peak returns for commuters and off-peak returns between major cities, according to the Department for Transport. Other fares, such as Advance tickets, are set by the operators. Fares in Scotland and Wales follow the policies of their own governments.' },
      { q: 'Does a fare freeze change Delay Repay on my season ticket?', a: 'Only through the price. Delay Repay on a season ticket is a share of the season price divided by a fixed number of journeys, so a frozen price keeps the value of each claim where it was. A higher price after a rise would raise the value of each claim by the same percentage.' },
    ],
    body: (h) => `
<h2>What the freeze saved</h2>
${h.table(['Season or fare price', `Rise avoided (${h.pc(h.FARES.wouldHaveRisenPct, 1)})`, 'Price kept'], [800, 1800, 3200, 5200, 7600].map((p) => [h.gbp(p), h.gbp(Math.round(p * h.FARES.wouldHaveRisenPct * 100) / 100), h.gbp(p)]), `Rise that regulated fares would have had on ${h.date(h.FARES.freezeFrom)}, according to the ${h.src('gov_freeze', 'Department for Transport')}.`, ['r', 'r', 'r'])}
<p>The Department's own examples are flexi seasons used three days a week: ${h.FARES.examples.map((e) => `${e.route}, ${h.gbp(e.saving)} a year`).join('; ')}.</p>

<h2>How regulated fares are usually set</h2>
<p>The government decides each year how far regulated fares in England may change, and the new fares apply from March. Separately, official statistics measure every year the change in the prices train companies charge passengers. The release covering the 2027 change is due between July and August 2027. A decision on the March 2027 change, a rise or another freeze, belongs to the government, and this page reports it only once published.</p>
<!--tool:mini:freeze-->

<h2>Public ownership and fares</h2>
<p>The fares policy now sits alongside the move of operators into public ownership ahead of ${h.src('gov_gbr', 'Great British Railways')}. ${h.P.ownership.filter((o) => !o.future).map((o) => `${o.operator} on ${h.date(o.date)}`).join(', ')} have transferred. ${h.P.ownership.filter((o) => o.future).map((o) => `${o.operator} is due on ${h.date(o.date)}`).join(' and ')}. Ownership does not by itself change your fare or your Delay Repay: each operator's scheme stays as published until it changes its charter.</p>

<h2>Planning a season ticket renewal</h2>
<ul>
<li>A season bought before a rise keeps its price for its whole length: an annual bought in February covers the following year at the old price.</li>
<li>If a rise is announced, compare renewing early with the refund rules of Part G of the ${h.src('nrcot', 'Conditions of Travel')}, which deduct the travel used and a fee of up to ${h.gbp(h.N.seasonRefund.adminMax)}.</li>
<li>A Flexi season may cost less than a full season for hybrid workers: count your days.</li>
</ul>
<p>The ${h.a('season-ticket-refund', 'season refund page')} works out what an early renewal would cost if you hand back the old season.</p>

<h2>Scotland and Wales</h2>
<p>The freeze announced by the Department for Transport covers regulated fares in England. Fares on services in Scotland and Wales follow the policies of the Scottish Government and the Welsh Government, through ScotRail and Transport for Wales, and cross-border journeys can mix both. If you travel mainly in Scotland or Wales, check the announcements of those governments for 2027 rather than the English decision.</p>

<h2>Keeping an eye on the decision</h2>
<p>The figure for March 2027 will appear on GOV.UK when the government publishes it. This page is updated by hand when that happens, with the date of the decision and the regulated rise or freeze it sets.</p>
<p>Until then, test a rise of your choice on your own ticket with the tool above.</p>`,
  },
});
