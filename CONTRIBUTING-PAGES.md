# Adding or editing a page

One page = one file `src/content/pages/<id>.ts` exporting `definePage({...})` (types in
`src/lib/guide-types.ts`). The file name must equal `id`. Models: `train-delay-compensation.ts` (guide),
`op-avanti-west-coast.ts` (operator page). The page is built at `/en/<en.slug>/`; menus, footer, home lists,
llms.txt and sitemap follow by themselves. English only (en-GB).

## Fields

- `group`: `claim`, `operators`, `disruption` or `fares`; `order`: position in its group.
- `tool`: the main tool, right under the H1 (first screen):
  - `{ kind: 'repay', props?: { operator, ticket: 'single'|'return'|'weekly'|'monthly'|'annual'|'flexi', price, delay, lock } }`
  - `{ kind: 'mini:<spec>', props?: {...} }`, specs in `src/lib/mini-specs.ts` (`MINI_KINDS`), always computed by
    `src/lib/engine/repay.ts` or `src/lib/engine/fares.ts`. Numeric props override input defaults; `op` takes an operator id.
- `mini`: a second tool under the citable block. In a body, `<!--tool:mini:deadline-->` or
  `<!--tool:mini:bands|{"op":"lner","price":40}-->` places a tool between paragraphs.
- `operator`: on operator pages, the operator id (adds the fact box under the calculator).
- `related`: 3–5 page ids. `sources`: keys of `src/data/params-2026.json` → `sources`.
- `demarche: true` on claim and complaint pages: adds the "independent site" line under the H1.

## Text rules (checked by `npx vitest run tests/pages.test.ts`, then `npm run check`)

- `title` 50–60 characters, key term first, never "How…", "What…", "UK…", a nation or London first.
- `description` 150–160 characters.
- `resume(h)`: ONE paragraph (no tags but links) of at least 120 words answering the page's query with figures.
- `faqs(h)`: 3–5 questions unique across the site, each answer 42–88 words, plain text.
- `body(h)`: HTML with at least three `<h2>` sections; resume + body at least 650 words. No `<h1>`.
- No em dash; British spelling; dates in words; coming changes written as coming, with their date.
- Pages must read differently (check-unique): no shared boilerplate paragraph.
- Links only to primary sources (`h.src(key, text)`) and internal pages (`h.a(id, text)`). Never a claims company,
  retailer or forum; never mention a search engine or another site. Claim forms are linked only by the calculator
  and the operator fact box, as the operator's own form.

## Figures

Never type a band, a divisor or a number of days: read them through `h` (`src/lib/helpers.ts`): `h.N` (national
rules, Conditions of Travel), `h.OMB` (Rail Ombudsman), `h.FARES`, `h.ORR` (claims statistics), `h.op(id)`,
`h.pay(op, ticket, price, delay, delayBack)`, `h.bandRows`, `h.shareAt`, `h.card(id)`, `h.gbp`, `h.date(iso)`,
`h.table(headers, rows, caption, align)`. Example fares (`h.gbp(40)`) are fine. A fact that is not in a primary
text is not written.

## Data

- `data/operators.json` (each operator's bands, divisors, time limit, payment, automatic claims, claim form, sources)
  and `data/params-national.json` (Conditions of Travel, Rail Ombudsman, fares, ownership, railcards, bank holidays)
  are read by hand on the sources; `python3 scripts/build-params.py` merges them into `src/data/params-2026.json`
  and checks the bands (contiguous, shares in range, national minimum at 60 minutes).
- `src/data/orr-claims.json`: ORR Table 4410, refreshed by `scripts/update-data.py` (workflow
  `.github/workflows/update-data.yml`, monthly; exit code 2 on a change without `--write`).
- Texts of the sources (copyrighted) go in `data/textes-sources/*.txt`, ignored by git, for `check-copie`.
