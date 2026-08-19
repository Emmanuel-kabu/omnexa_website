import { contentConfig } from "./content-config";

/**
 * Institutional constants.
 *
 * Centralised so navigation labels, location strings and organisation
 * metadata are never hardcoded into low-level components: a prerequisite
 * for the internationalisation readiness required by Stage 2 §79.
 */

export const site = {
  name: "Omnexa Labs",
  shortName: "Omnexa",
  /** Stage 3 §45 */
  title: "Omnexa Labs: AI Research & Engineering",
  description:
    "Omnexa Labs researches advanced intelligence and engineers AI systems across autonomous agents, foundation models, computational discovery, software systems, healthcare, and research infrastructure.",
  /** Stage 1 §1 */
  brandStatement: "We research intelligence. We engineer it into real systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://omnexalabs.com",
  /**
   * Public contact address. Deliberately undefined until a real address is
   * confirmed: the contact page renders an honest "not yet published" state
   * rather than inventing one (Stage 6 §99, Stage 7 §108).
   */
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  locale: "en",
  founded: "2026",
  location: {
    city: "Accra",
    country: "Ghana",
    short: "ACCRA / GH",
    /** Stage 1 §16.3, §29 */
    coordinates: "05°33'N 00°12'W",
  },
} as const;

/**
 * Stage 2 §4: primary navigation order is deliberate, not alphabetical.
 *
 * Derived rather than static, so an unpublished section cannot leave a link
 * pointing at a 404. `Systems` drops out entirely while
 * `contentConfig.publishSystems` is off.
 */
const allPrimaryNavigation = [
  { label: "Research", href: "/research" },
  // Applied engineering is half of the mission and a permanent section. The
  // named systems are a separate, conditional entry beneath it.
  { label: "Engineering", href: "/engineering" },
  { label: "Systems", href: "/systems" },
  { label: "Insights", href: "/insights" },
  { label: "Company", href: "/company" },
  { label: "Careers", href: "/careers" },
] as const;

export const primaryNavigation = allPrimaryNavigation.filter(
  (item) => contentConfig.publishSystems || item.href !== "/systems",
);

/**
 * Stage 2 §5: the expanded menu exposes deeper hierarchy.
 *
 * The `index` values here are the authored order; the exported list re-derives
 * them from what actually survives filtering, so the menu never shows a gap.
 */
const allMenuSections = [
  {
    index: "01",
    label: "Research",
    href: "/research",
    links: [
      { label: "Research Areas", href: "/research/areas" },
      { label: "Archive", href: "/research/archive" },
      { label: "Programs", href: "/research/programs" },
      { label: "Projects", href: "/research/projects" },
      { label: "Experiments", href: "/research/experiments" },
      { label: "Publications", href: "/research/publications" },
    ],
  },
  {
    index: "02",
    label: "Engineering",
    href: "/engineering",
    /*
     * Cross-references, not children: /engineering has no child routes. The
     * column heading already links to /engineering, so listing it again as its
     * own first child emitted the same href twice, five pixels apart.
     */
    links: [
      { label: "Writing on engineering", href: "/insights/engineering" },
      { label: "Engineering roles", href: "/careers/engineering" },
    ],
  },
  {
    index: "03",
    label: "Systems",
    href: "/systems",
    links: [
      { label: "Cadence", href: "/systems/cadence" },
      { label: "MedApp", href: "/systems/medapp" },
      { label: "ResearchOS", href: "/systems/researchos" },
    ],
  },
  {
    index: "04",
    label: "Insights",
    href: "/insights",
    links: [
      { label: "Research Notes", href: "/insights/research-notes" },
      { label: "Engineering", href: "/insights/engineering" },
      { label: "Perspectives", href: "/insights/perspectives" },
      { label: "News", href: "/insights/news" },
    ],
  },
  {
    index: "05",
    label: "Company",
    href: "/company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Mission", href: "/company/mission" },
      { label: "Principles", href: "/company/principles" },
      { label: "People", href: "/company/people" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    index: "06",
    label: "Careers",
    href: "/careers",
    links: [
      { label: "Open Roles", href: "/careers/open-roles" },
      { label: "Research", href: "/careers/research" },
      { label: "Engineering", href: "/careers/engineering" },
      { label: "Culture", href: "/careers/culture" },
    ],
  },
] as const;

/**
 * Routes withheld while `publishResearchOutputs` is off.
 *
 * The four output indexes plus two surfaces that exist only to present them:
 * the archive draws its entries exclusively from those types, and the atlas
 * visualises the graph they form. Both would render empty rather than merely
 * shorter, which is the case this list exists to prevent. Research Areas is
 * absent from the list on purpose, since areas are real and stay published.
 */
const RESEARCH_OUTPUT_ROUTES = new Set([
  "/research/programs",
  "/research/projects",
  "/research/experiments",
  "/research/publications",
  "/research/archive",
  "/insights/research-notes",
]);

function isPublishedRoute(href: string): boolean {
  if (!RESEARCH_OUTPUT_ROUTES.has(href)) return true;
  return contentConfig.publishResearchOutputs;
}

/**
 * The expanded menu and the footer directory both read this, so hiding a
 * section removes it from both at once. Indices are re-derived so the menu
 * never shows a gap such as 01, 03, 04.
 *
 * Links are filtered before sections, because a section whose every child is
 * withheld should disappear rather than render an empty column. Research
 * survives that test on the strength of Research Areas alone.
 */
export const menuSections = allMenuSections
  .filter((section) => contentConfig.publishSystems || section.href !== "/systems")
  .map((section) => ({
    ...section,
    links: section.links.filter((link) => isPublishedRoute(link.href)),
  }))
  .filter((section) => section.links.length > 0)
  .map((section, position) => ({
    ...section,
    index: String(position + 1).padStart(2, "0"),
  }));

/** Stage 2 §5: secondary utility links. */
export const utilityLinks = [
  { label: "Search", href: "/search", external: false },
  { label: "Contact", href: "/company/contact", external: false },
  { label: "Privacy", href: "/privacy", external: false },
] as const;

/**
 * External profiles.
 *
 * Deliberately empty until real Omnexa accounts are confirmed: Stage 6 §99
 * forbids inventing institutional presence. The footer renders this list
 * dynamically, so adding a verified profile here is the only change needed.
 */
export const socialLinks: ReadonlyArray<{ label: string; href: string }> = [];

/** Stage 6 §53-55: structured intent routing rather than one generic form. */
export const contactChannels = [
  {
    label: "Research collaboration",
    subject: "Research collaboration",
    detail:
      "Joint research, shared datasets, evaluation, or academic collaboration.",
  },
  {
    label: "Partnership",
    subject: "Partnership",
    detail: "Applying Omnexa systems or research within your organisation.",
  },
  {
    label: "Press",
    subject: "Press enquiry",
    detail: "Media enquiries about Omnexa research, systems or the lab.",
  },
  {
    label: "Careers",
    subject: "Careers enquiry",
    detail: "Questions about roles, hiring, or working at Omnexa.",
  },
  {
    label: "General enquiry",
    subject: "General enquiry",
    detail: "Anything that does not fit the categories above.",
  },
] as const;
