import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'split-ticketing',
  group: 'fares',
  order: 40,
  tool: { kind: 'mini:split' },
  mini: { kind: 'mini:cheapest' },
  related: ['cheap-train-tickets', 'delay-repay-advance-tickets', 'which-railcard', 'missed-connection-compensation'],
  sources: ['nrcot'],
  en: {
    slug: 'split-ticketing',
    nav: 'Split ticketing',
    card: 'Buying two or more tickets for one journey: the rule that makes it valid, how to find the saving yourself, and what happens if the train is late.',
    title: 'Split Ticketing: Is It Legal, How to Save, What to Check',
    description: 'Split ticketing is allowed if your train calls at each station where the tickets change. Work out your saving from the fares you see, and what to check first.',
    h1: 'Split ticketing: buying one journey as several tickets',
    intro: 'Type the fare for the whole journey and the fares of each part: the tool gives the saving, if there is one.',
    resume: (h) => `Split ticketing means covering one train journey with two or more tickets, each valid for part of the route, because together they cost less than a single ticket for the whole trip. It is allowed by the National Rail Conditions of Travel: condition 14.2 says you may use a combination of tickets for a journey provided the trains you use call at the stations where you change from one ticket to the next. You do not have to get off; the train only needs a scheduled stop where passengers can board or alight. Condition 14.4 adds that each ticket's own conditions apply, so an Off-Peak ticket on one part must be used at an Off-Peak time on that part, and some tickets exclude combinations. Savings come from the way fares are set: a long-distance fare is not always the sum of its parts, and a peak fare may cover only the busy end of a journey. The tool above compares the fares you find; this site holds no fare database and never guesses a price.`,
    faqs: (h) => [
      { q: 'Is split ticketing legal on UK trains?', a: 'Yes. Condition 14.2 of the National Rail Conditions of Travel allows a journey on two or more tickets, provided the train calls at each station where one ticket ends and the next begins. A train passing through without stopping breaks the rule. Each ticket must also be valid for its own part: right route, right time, right railcard.' },
      { q: 'What if my train is late when I have split tickets?', a: 'You claim Delay Repay on the journey as a whole: the delay counts at your final destination. The compensation follows the price of the tickets covering the delayed journey. If a delay on the first part makes you miss a booked train on the second, condition 9.4 lets you take the next train of the company your ticket is valid with.' },
      { q: 'Can I use a railcard with split tickets?', a: 'Yes, on each ticket, as long as each fare accepts the railcard and its time restrictions are met for that part. A railcard minimum fare applies per ticket, so splitting a short morning journey into two small tickets can lose the discount on both. Check each part on its own.' },
    ],
    body: (h) => `
<h2>The rule in one line</h2>
<p>The train must be scheduled to stop at every station where your tickets change. That is the whole of condition 14.2 of the ${h.src('nrcot', 'Conditions of Travel')}. An information note under it adds that the stop must allow passengers to board or alight, as the ticket terms permit, and that you do not need to leave the train. Season tickets, zonal and area tickets are treated a little more simply under condition 14.3: if one ticket's last valid station is the next one's first, the train does not need to call there.</p>

<h2>Where the savings come from</h2>
<ul>
<li><strong>Peak restrictions that cover only part of the route.</strong> An Off-Peak fare may be valid from an intermediate station earlier than from your starting point.</li>
<li><strong>Fares set by different operators.</strong> Each part of a route can be priced by a different company or under different rules.</li>
<li><strong>Railcard minimum fares.</strong> A short part may fall under a minimum fare while a longer one does not.</li>
<li><strong>Advance fares on one part only.</strong> A cheap Advance ticket on a long leg combined with a flexible ticket on a short one.</li>
</ul>
<p>None of this can be predicted from the outside: compare real fares for real times, then let the tool do the arithmetic.</p>

<h2>A worked example</h2>
<p>Suppose a single for the whole journey costs ${h.gbp(92)}, and three tickets covering it cost ${h.gbp(38)}, ${h.gbp(29)} and ${h.gbp(12)}. Together they cost ${h.gbp(38 + 29 + 12)}, a saving of ${h.gbp(92 - 38 - 29 - 12)} on one journey. Over a return trip made twice a month, that is ${h.gbp((92 - 38 - 29 - 12) * 2 * 24)} a year. If the train you plan to take does not stop at the second change station, the split is invalid and the saving disappears; choose another train or another split.</p>
<!--tool:mini:cheapest-->

<h2>Checks before you buy</h2>
<ol>
<li>Open the timetable of the train you will take and confirm it stops at each change station.</li>
<li>Read each ticket's restrictions: Off-Peak times, route, the train for Advance tickets.</li>
<li>Apply your railcard to each ticket and check its minimum fare.</li>
<li>Carry all the tickets, or have them in one app, for inspection on board.</li>
</ol>

<h2>Delays on split tickets</h2>
<p>Split tickets do not reduce your rights. The delay is counted at your destination, against the timetable of the day, and the claim is made with all the tickets. For Advance tickets on separate parts, condition 9.4 lets you take the next train of the company your ticket is valid with when a connecting train was delayed or cancelled. Our ${h.a('delay-repay-advance-tickets', 'Advance and split ticket page')} covers the compensation side.</p>

<h2>Split tickets and railcards together</h2>
<p>A railcard can be used on every ticket of a split, and its discount often widens the saving. The minimum fares of some cards apply per ticket, however, so short morning parts may lose the discount. Run the calculator twice, with and without the railcard prices of each part, and keep the cheaper combination that respects every ticket's conditions.</p>`,
  },
});
