/**
 * One page = ONE data file in `src/content/pages/<id>.ts` (English, en-GB). How to add a page:
 * CONTRIBUTING-PAGES.md.
 */
import type { Helpers } from './helpers';

export type Lang = 'en';
/** Section of the site: menus, footer and home lists follow it. */
export type Group = 'claim' | 'disruption' | 'operators' | 'fares';
export interface FAQ { q: string; a: string }
/**
 * `repay` (props: operator, ticket, price, delay), `split` (split-ticket saving), `railcard`
 * (props: card) or `mini:<spec>` from `lib/mini-specs.ts`.
 */
export interface ToolDef { kind: string; props?: Record<string, string | number | boolean> }
export interface PageText {
  /** Path after /en/, without slashes at the ends; may hold one "/". */
  slug: string; nav: string; card: string;
  /** 50–60 characters, key term first (RECETTE §11). */
  title: string;
  /** 150–160 characters. */
  description: string;
  h1: string; intro: string;
  /** Citable block, one paragraph of 120 words or more (RECETTE §21), folded after its first sentence. */
  resume: (h: Helpers) => string;
  faqs: (h: Helpers) => FAQ[];
  /** HTML; `<!--tool:mini:spec-->` or `<!--tool:repay|{"ticket":"return"}-->` places a tool in the body. */
  body: (h: Helpers) => string;
}
export interface PageDef {
  id: string; group: Group; order: number;
  tool?: ToolDef; mini?: ToolDef;
  related: string[];
  /** Keys of `data/params-2026.json` sources. */
  sources: string[];
  /** Claim or complaint page: the "independent, not a train company" line under the H1. */
  demarche?: boolean;
  /** Operator pages: id of the operator in params-2026.json → operators (fact box under the tool). */
  operator?: string;
  en: PageText;
}
export const definePage = (g: PageDef): PageDef => g;
