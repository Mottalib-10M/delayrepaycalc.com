import { definePage } from '../../lib/guide-types';

export default definePage({
  id: '16-25-railcard',
  group: 'fares',
  order: 44,
  tool: { kind: 'mini:railcard', props: { card: 0, fare: 28, trips: 10 } },
  mini: { kind: 'mini:cardfare', props: { card: 0, fare: 16, peak: 1 } },
  related: ['26-30-railcard', 'which-railcard', 'is-a-railcard-worth-it', 'cheap-train-tickets'],
  sources: ['railcards', 'gov_1617'],
  en: {
    slug: '16-25-railcard',
    nav: '16-25 Railcard',
    card: 'A third off for 16 to 25s and mature students: price, the £12 morning minimum fare, when it does not apply, and how many trips pay it back.',
    title: '16-25 Railcard: Price, Minimum Fare and When It Pays Off',
    description: '16-25 Railcard: a third off most fares for ages 16 to 25 and mature students, the weekday morning minimum fare, its exceptions and the trips that pay it back.',
    h1: '16-25 Railcard: what it saves and when',
    intro: 'Type a usual fare and how often you travel: the tool gives the trips needed to pay back the card and the net saving over a year.',
    resume: (h) => `The 16-25 Railcard costs ${h.gbp(h.card('16-25').price1y)} for one year or ${h.gbp(h.card('16-25').price3y ?? 0)} for three, and takes a third off Standard Anytime, Off-Peak and Advance fares across Great Britain, as well as First Class Advance fares. It is open to anyone aged 16 to 25, and to mature students of 26 or more, studying full time, who attend courses on campus, with a form signed by their college or university. The 1-year card can be bought or renewed until the day before your 26th birthday, the 3-year card until the day before your 24th. Its one catch is a minimum fare: on journeys before 10am Monday to Friday, a discounted ticket cannot cost less than ${h.gbp(h.card('16-25').minFare ?? 0)}, except for Advance tickets, on public holidays and throughout July and August. On a usual fare of ${h.gbp(28)}, the card saves ${h.gbp(Math.round(28 * h.card('16-25').discount * 100) / 100)} a trip and pays for itself after ${h.num(Math.ceil(h.card('16-25').price1y / (Math.round(28 * h.card('16-25').discount * 100) / 100)))} trips. Those aged 16 or 17 get more from the 16-17 Saver, at half price on all fares.`,
    faqs: (h) => [
      { q: 'Can I buy a 16-25 Railcard the day before I turn 26?', a: 'Yes. The 1-year card can be bought or renewed until you are 26, as late as the eve of the birthday, and stays valid for its full year. The 3-year card must be bought before your 24th birthday. After 26, the 26-30 Railcard takes over at the same price and discount, unless you are a mature student in full-time education.' },
      { q: 'Who counts as a mature student for the 16-25 Railcard?', a: 'Someone aged 26 or over in full-time education in Great Britain, meaning more than 15 hours a week for more than 20 weeks a year, attending courses on campus. Courses taken at a distance or part time, including the Open University, do not qualify. You need a form signed by the college or university and a student ID, and the application is checked by hand.' },
      { q: 'Does the £12 minimum fare apply at weekends?', a: `No. The minimum fare of ${h.gbp(h.card('16-25').minFare ?? 0)} applies only to journeys before 10am Monday to Friday. It does not apply at weekends, on public holidays, during July and August, or to Advance tickets. After 10am on weekdays, the full third comes off whatever the fare.` },
    ],
    body: (h) => `
<h2>What it costs and what it saves</h2>
${h.table(['Usual fare', 'With the card, after 10am', 'With the card, weekday before 10am', 'Saving after 10am'], [12, 18, 24, 40, 75].map((f) => [h.gbp(f), h.gbp(Math.round(f * (1 - h.card('16-25').discount) * 100) / 100), h.gbp(Math.max(Math.round(f * (1 - h.card('16-25').discount) * 100) / 100, Math.min(f, h.card('16-25').minFare ?? 0))), h.gbp(Math.round(f * h.card('16-25').discount * 100) / 100)]), `Anytime or Off-Peak fares, outside July and August. ${h.src('railcards', 'Railcards')}.`, ['r', 'r', 'r', 'r'])}
<p>The minimum fare matters only on cheap morning journeys: on a fare of ${h.gbp(18)}, the discounted price would be ${h.gbp(Math.round(18 * (1 - h.card('16-25').discount) * 100) / 100)} but the card charges ${h.gbp(h.card('16-25').minFare ?? 0)} before 10am. On longer journeys the full third applies at any time.</p>

<h2>Where it works, and where it does not</h2>
<ul>
<li><strong>Included:</strong> Standard Anytime and Off-Peak tickets, Standard and First Class Advance, Anytime Day Travelcards bought with a rail ticket from outside London's zones, Off-Peak pay as you go on Oyster once the discount is loaded, airport express trains, and some Caledonian Sleeper tickets.</li>
<li><strong>Not included:</strong> season tickets, most London Underground and DLR tickets other than pay as you go, some operator promotions, excursion and charter trains.</li>
</ul>
<!--tool:mini:cardfare-->

<h2>1 year or 3 years?</h2>
<p>The 3-year card costs ${h.gbp(h.card('16-25').price3y ?? 0)} against ${h.gbp(h.card('16-25').price1y * 3)} for three yearly cards, a saving of ${h.gbp(h.card('16-25').price1y * 3 - (h.card('16-25').price3y ?? 0))}. Because it must be bought before your 24th birthday, it fits students at the start of a course. If you are 23, a 3-year card bought before your birthday runs until you are 26.</p>

<h2>16 or 17? Compare with the 16-17 Saver</h2>
<p>The ${h.src('gov_1617', '16-17 Saver')} costs ${h.gbp(h.card('16-17').price1y)} and gives ${h.pc(h.card('16-17').discount)} off Anytime, Off-Peak, Advance and season tickets, with no minimum fare. Bought from 17 August 2026, it lasts a full year even past the 18th birthday. For a 16 or 17 year old who commutes to college by train, it saves far more than the 16-25 card.</p>

<h2>The card and a late train</h2>
<p>Delay Repay is worked out on what you paid, so a third less than the full fare. An hour late still refunds the whole single with most operators. If the train is cancelled and you do not travel, the discounted fare is refunded in full. Our ${h.a('delay-repay-advance-tickets', 'railcard and Advance page')} has the details.</p>

<h2>Buying the card</h2>
<p>The card can be bought online, as a digital card in the Railcard app or as a physical card sent by post, or at a staffed ticket office with an application form. Proof of age is needed, such as a passport or a driving licence, and mature students upload a signed mature student form and their student ID, which adds about five working days of manual checks. The card must be valid on the day of travel, not only on the day the ticket is bought.</p>

<h2>Students travelling home</h2>
<p>For students, the card works best on the long trips home at the start and end of term and at reading weeks. A student making six returns a year at ${h.gbp(60)} saves ${h.gbp(Math.round(6 * 60 * h.card('16-25').discount * 100) / 100)}, ten times the price of the card. Booking those trips as Advance tickets with the card stacks both savings, and the morning minimum fare does not apply to Advance tickets.</p>`,
  },
});
