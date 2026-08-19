# Omnexa Labs Website — Stage 6 Company, People, Careers & Insights Experience

**Document type:** Implementation Specification  
**Audience:** Codex / Frontend Engineers / Product Designers / Content Engineers / Recruiting / Communications  
**Stage:** 6 — Company, People, Careers & Insights  
**Depends on:**
- `omnexa_labs_stage_1_visual_design_system.md`
- `omnexa_labs_stage_2_information_architecture.md`
- `omnexa_labs_stage_3_homepage_experience.md`
- `omnexa_labs_stage_4_research_experience.md`
- `omnexa_labs_stage_5_systems_experience.md`

---

# 1. Objective

Stage 6 defines the institutional, human, editorial, and recruiting experience for the Omnexa Labs public website.

The goal is to explain:

```text
who Omnexa is
why Omnexa exists
how Omnexa works
who is doing the work
what Omnexa believes
what Omnexa is thinking
how people can join
how external collaborators can engage
```

This stage must not turn the website into a generic corporate site.

The institutional layer should reinforce the same identity already established by Research and Systems:

> **Omnexa Labs is a research and engineering institution building intelligent systems from first principles through deployment.**

---

# 2. Canonical Routes

```text
/company/
├── about/
├── mission/
├── principles/
├── people/
│   └── [person-slug]/
└── contact/

/careers/
├── open-roles/
│   └── [role-slug]/
├── research/
├── engineering/
└── culture/

/insights/
├── research-notes/
├── engineering/
├── perspectives/
├── news/
└── [article-slug]/
```

---

# 3. Institutional Experience Model

The institutional experience should answer four questions:

```text
WHO ARE WE?
WHY DO WE EXIST?
HOW DO WE WORK?
WHO SHOULD JOIN US?
```

The editorial experience should answer:

```text
WHAT ARE WE LEARNING?
WHAT ARE WE BUILDING?
WHAT DO WE THINK?
WHAT HAS CHANGED?
```

---

# 4. Company Landing Page

Route:

```text
/company/
```

Purpose:

Provide a concise institutional overview and direct visitors deeper into mission, principles, people, and contact.

Canonical order:

```text
01 Company Hero
02 What Omnexa Is
03 Mission
04 Research + Engineering Model
05 Principles
06 People
07 Where We Work
08 Join Omnexa
09 Contact / Collaborate
10 Footer Transition
```

---

# 5. Company Hero

Preferred headline:

```text
BUILDING
AN INSTITUTION
FOR INTELLIGENCE.
```

Alternative:

```text
RESEARCH.
ENGINEERING.
INTELLIGENCE.
```

Preferred default:

```text
BUILDING
AN INSTITUTION
FOR INTELLIGENCE.
```

Supporting copy:

> Omnexa Labs is an AI research and engineering lab focused on advancing machine intelligence and building systems that apply that research to real problems.

CTA:

```text
Explore our mission ↓
```

---

# 6. Company Positioning Section

Headline:

```text
WE ARE
A RESEARCH
AND ENGINEERING
LAB.
```

Supporting copy:

> Omnexa combines long-term research with applied engineering. We study intelligent systems, build the infrastructure required to improve them, and turn promising ideas into operational technologies.

Key framing:

```text
Research creates knowledge.
Engineering creates capability.
Systems create impact.
```

---

# 7. Mission Page

Route:

```text
/company/mission/
```

The mission page should read more like a manifesto than a corporate About page.

Canonical structure:

```text
01 Mission Hero
02 Why Intelligence Matters
03 Why Omnexa Exists
04 Research Philosophy
05 Engineering Philosophy
06 Long-Term Orientation
07 Areas of Impact
08 What We Refuse to Optimize For
09 Closing Manifesto
```

---

# 8. Mission Hero

Headline:

```text
ADVANCE
INTELLIGENCE.
BUILD WHAT
MATTERS.
```

Primary copy:

> Our mission is to advance artificial intelligence through rigorous research and applied engineering, and to build systems that expand what individuals, organizations, and scientific institutions can accomplish.

Do not overstate societal impact.

---

# 9. Why Omnexa Exists

Suggested framing:

> The most important AI systems will not be created by treating models as isolated products. They will emerge from better research methods, better learning systems, better infrastructure, better coordination, and better ways for humans and intelligent systems to work together.

This section should connect ResearchOS, Cadence, MedApp, and future systems without becoming a product list.

---

# 10. Research Philosophy

Core ideas:

```text
Ask important questions.
Measure what matters.
Preserve uncertainty.
Build reproducibly.
Treat failed experiments as information.
Connect research to systems.
Let systems create new research questions.
```

---

# 11. Engineering Philosophy

Core ideas:

```text
Build from clear system models.
Specialize where specialization matters.
Make state observable.
Design for failure.
Keep humans in critical loops.
Treat security as architecture.
Use evidence before claims.
Design for continuous improvement.
```

---

# 12. Long-Term Orientation

Possible message:

> Omnexa is being built for research programs and systems that may evolve over years, not only short product cycles. We value compounding knowledge, durable infrastructure, and research that becomes more valuable as it connects to future work.

Avoid claims about timelines that do not exist.

---

# 13. Impact Areas

Possible institutional impact domains:

```text
Healthcare
Education
Science
Software
Government & Policy
Agriculture
Manufacturing
Commerce
```

Only present domains Omnexa genuinely intends to pursue.

Do not create fake case studies.

---

# 14. What We Refuse to Optimize For

This can become a distinctive institutional section.

Possible items:

```text
Hype over evidence
Speed over correctness
Autonomy without accountability
Growth without safety
Complexity without purpose
Claims without measurement
```

This section should be concise and serious.

---

# 15. Principles Page

Route:

```text
/company/principles/
```

Purpose:

Document the values that shape research, engineering, product, and institutional decisions.

Canonical categories:

```text
Scientific Rigor
Engineering Excellence
Evidence Over Hype
Human Direction
Responsible Development
Security by Design
Reproducibility
Long-Term Thinking
Open Inquiry
Continuous Learning
```

Only include principles Omnexa actually intends to follow.

---

# 16. Principle Presentation

Do not use icon cards.

Preferred:

```text
01 / SCIENTIFIC RIGOR

We separate observations, hypotheses,
and conclusions. We design research
to survive scrutiny.

────────────────────────────────────

02 / EVIDENCE OVER HYPE

We prefer measured capability to
promotional claims.
```

---

# 17. Principle Data Model

```ts
type CompanyPrinciple = {
  id: string;
  title: string;
  summary: string;
  body?: RichContent;
  category?: string;
  order: number;
  visibility: ContentVisibility;
};
```

---

# 18. About Page

Route:

```text
/company/about/
```

Purpose:

Explain Omnexa as an organization, not repeat the mission page.

Canonical structure:

```text
01 About Hero
02 What Omnexa Labs Is
03 Research Divisions
04 Systems
05 Operating Model
06 ResearchOS
07 People
08 Location / Origin
09 Current Stage
10 Contact
```

---

# 19. About Hero

Headline:

```text
OMNEXA
LABS.
```

Subheadline:

```text
AI RESEARCH
AND ENGINEERING.
```

Supporting copy:

> Omnexa Labs advances AI through research and applied engineering across machine intelligence, autonomous systems, computational discovery, software, healthcare, and research infrastructure.

---

# 20. Research Divisions Overview

Use the canonical four research divisions:

```text
01 Developmental Intelligence & Autonomous Research
02 Foundation Models & Machine Intelligence
03 Algorithms, Mathematics & Computational Discovery
04 AI for Software & Computational Systems
```

Each links directly to Stage 4 research routes.

---

# 21. Operating Model

Show the institutional loop:

```text
RESEARCH
   ↓
EXPERIMENT
   ↓
ENGINEER
   ↓
SYSTEM
   ↓
DEPLOY
   ↓
LEARN
   ↺
RESEARCH
```

This is consistent with earlier stages.

---

# 22. Origin / Location

Public location framing may include:

```text
Accra, Ghana
```

or another accurate city-level institutional location.

Do not expose precise private addresses unless intentionally public.

The visual treatment can acknowledge Ghana subtly without becoming tourism branding.

---

# 23. People Landing Page

Route:

```text
/company/people/
```

Purpose:

Show the people behind the research and systems.

The page should organize people around work rather than hierarchy alone.

Canonical structure:

```text
01 People Hero
02 Leadership / Research Leads
03 Researchers
04 Engineers
05 System Teams
06 Advisors / Collaborators if applicable
07 Join Omnexa
```

Only render categories that have actual people.

---

# 24. People Hero

Headline:

```text
THE PEOPLE
BEHIND
THE WORK.
```

Supporting copy:

> Researchers and engineers building Omnexa's models, systems, infrastructure, and research programs.

---

# 25. People Index Presentation

Avoid generic employee cards.

Preferred row:

```text
EMMANUEL KABU

Lead AI / ML Engineer
Research & Development

Research
Developmental Intelligence
AI for Software Systems

Systems
Cadence
ResearchOS

View profile →
```

Portraits may be used, but the work should remain primary.

---

# 26. Person Page

Route:

```text
/company/people/[person-slug]/
```

Canonical order:

```text
01 Person Header
02 Role / Focus
03 Bio
04 Research Areas
05 Programs / Projects
06 Publications
07 Systems
08 Insights
09 External Links
```

---

# 27. Person Data Model

```ts
type Person = {
  id: string;
  name: string;
  slug: string;
  role: string;
  team?: string;
  bio: string;
  portrait?: MediaAsset;

  researchAreaIds: string[];
  researchProgramIds: string[];
  researchProjectIds: string[];
  publicationIds: string[];
  systemIds: string[];
  insightIds: string[];

  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;

  visibility: ContentVisibility;
};
```

---

# 28. Person Profile Integrity

Do not invent:

```text
degrees
past employers
awards
publications
titles
research claims
social links
```

All person metadata must come from the content source.

---

# 29. Careers Landing

Route:

```text
/careers/
```

Purpose:

Recruit people who understand Omnexa's mission and technical environment.

Canonical order:

```text
01 Careers Hero
02 Why Join
03 Research Environment
04 Engineering Environment
05 How We Work
06 What We Value
07 Open Roles
08 Culture
09 Hiring Process
10 FAQ
11 CTA
```

---

# 30. Careers Hero

Headline:

```text
BUILD
WHAT COMES
NEXT.
```

Supporting copy:

> Join Omnexa Labs to work on machine intelligence, autonomous systems, research infrastructure, software engineering, healthcare AI, and the systems that connect them.

CTA:

```text
View open roles ↓
```

---

# 31. Why Join

Avoid generic startup perks language.

Focus on:

```text
important technical problems
research ownership
engineering depth
cross-disciplinary work
ability to build systems from research
high agency
learning
long-term technical growth
```

---

# 32. Research Careers Page

Route:

```text
/careers/research/
```

Purpose:

Explain what research work at Omnexa looks like.

Possible themes:

```text
research questions
experimentation
publication
reproducibility
AI research agents
ResearchOS
human-AI research workflow
```

Headline:

```text
RESEARCH
AT OMNEXA.
```

---

# 33. Engineering Careers Page

Route:

```text
/careers/engineering/
```

Purpose:

Explain engineering culture.

Possible themes:

```text
systems thinking
specialization
AI-native engineering
reliability
security
data
ML infrastructure
frontend/backend/platform engineering
```

Headline:

```text
ENGINEERING
AT OMNEXA.
```

---

# 34. Culture Page

Route:

```text
/careers/culture/
```

Do not fabricate culture.

Use only real operating principles.

Potential sections:

```text
High ownership
Deep work
Research + engineering
Direct communication
Technical rigor
Learning
Documentation
Review
Long-term thinking
```

---

# 35. Open Roles Index

Route:

```text
/careers/open-roles/
```

Index should be simple and factual.

Filter dimensions:

```text
Department
Team
Location
Work Mode
Employment Type
```

Example row:

```text
ML / RL Engineer — Autonomous Agents

Engineering
Accra, Ghana
Full-time

View role →
```

Do not hide role location.

---

# 36. Job Detail Page

Route:

```text
/careers/open-roles/[role-slug]/
```

Canonical structure:

```text
01 Role Header
02 Mission of Role
03 What You Will Work On
04 Responsibilities
05 Required Qualifications
06 Preferred Qualifications
07 Team / Related Systems
08 Research Areas
09 Location / Work Model
10 Hiring Process
11 Apply
```

---

# 37. Job Data Model

```ts
type Job = {
  id: string;
  title: string;
  slug: string;
  department: string;
  team?: string;
  location: string;
  employmentType: string;
  workMode?: "onsite" | "hybrid" | "remote";

  summary: string;
  mission: string;
  responsibilities: string[];
  requirements: string[];
  preferred?: string[];

  researchAreaIds?: string[];
  systemIds?: string[];

  applicationUrl?: string;
  status: "draft" | "open" | "closed";
  publishedAt?: string;
  closingDate?: string;
};
```

---

# 38. Job Status Rules

Primary index:

```text
show only open roles
```

Closed roles:

```text
remain addressable only if needed
display CLOSED clearly
do not show Apply CTA
```

Draft roles:

```text
never public
```

---

# 39. Hiring Process

Only include actual steps.

Possible pattern:

```text
Application
Technical conversation
Practical evaluation
Team discussion
Final decision
```

Do not invent a process if one is not established.

---

# 40. Careers Empty State

If no roles:

```text
NO OPEN ROLES

We are not currently listing open positions.

Follow Omnexa Labs for future opportunities.
```

Do not manufacture roles to make the careers page look active.

---

# 41. Insights Landing

Route:

```text
/insights/
```

Purpose:

Provide an editorial surface for work that is valuable but not necessarily a formal research publication.

Canonical categories:

```text
Research Notes
Engineering
Perspectives
News
```

---

# 42. Insights Hero

Headline:

```text
NOTES,
SYSTEMS,
IDEAS.
```

Supporting copy:

> Research observations, engineering decisions, technical perspectives, and institutional updates from Omnexa Labs.

---

# 43. Insights Content Taxonomy

## Research Notes

Shorter technical research material:

```text
experiment observations
research hypotheses
methodological notes
dataset observations
early findings
research retrospectives
```

## Engineering

```text
architecture
ML infrastructure
agent systems
distributed systems
data systems
MLOps
reliability
security
research tooling
```

## Perspectives

```text
long-form institutional views
AI research direction
human-AI systems
responsible AI
future technology
scientific commentary
```

## News

```text
research releases
system releases
company milestones
events
partnerships
new publications
```

---

# 44. Insights Index Layout

Prefer editorial rows.

Example:

```text
ENGINEERING

DESIGNING SPECIALIZED
SOFTWARE ENGINEERING AGENTS

14 AUG 2026
Emmanuel Kabu

Read →
```

Avoid a three-column blog card grid.

---

# 45. Insights Category Pages

Routes:

```text
/insights/research-notes/
/insights/engineering/
/insights/perspectives/
/insights/news/
```

Each category page includes:

```text
category thesis
featured article
latest entries
filters where useful
archive
```

---

# 46. Insight Article Page

Route:

```text
/insights/[article-slug]/
```

Canonical structure:

```text
01 Article Header
02 Deck / Summary
03 Author(s)
04 Body
05 Figures / Code / Diagrams as needed
06 Related Research
07 Related Systems
08 Related Articles
09 Author Profile
```

---

# 47. Insight Data Model

```ts
type Insight = {
  id: string;
  title: string;
  slug: string;
  type: "research-note" | "engineering" | "perspective" | "news";

  excerpt: string;
  body: RichContent;

  authorIds: string[];
  researchAreaIds?: string[];
  researchProgramIds?: string[];
  systemIds?: string[];
  publicationIds?: string[];

  heroMedia?: MediaAsset;
  tags?: string[];

  publishedAt: string;
  updatedAt?: string;
  visibility: ContentVisibility;
};
```

---

# 48. Research Notes Integrity

Research Notes must visibly distinguish:

```text
observation
hypothesis
early result
open question
```

Do not let early research commentary look like a peer-reviewed result.

Optional metadata:

```text
STATUS / RESEARCH NOTE
RELATED / OMX-DI-007
```

---

# 49. Engineering Article Style

Engineering content may include:

```text
architecture diagrams
code
data flow
tradeoffs
benchmarks
failure modes
design decisions
```

The style should remain explanatory, not product marketing.

---

# 50. Perspectives Style

Perspectives may be more editorial.

Rules:

```text
clearly identify opinion
avoid presenting opinion as scientific fact
link to evidence where relevant
avoid sensational framing
```

---

# 51. News Integrity

News should be factual and date-specific.

Examples:

```text
new publication released
system enters staging
partnership announced
conference participation
research milestone
```

Do not use News for vague promotional posts.

---

# 52. Insight Relationships

Every article may link to:

```text
research areas
programs
projects
publications
systems
people
```

Use explicit relationships where possible.

---

# 53. Contact Page

Route:

```text
/company/contact/
```

Purpose:

Route inbound interest efficiently.

Possible intent categories:

```text
Research Collaboration
Partnership
Careers
Press
General Inquiry
```

---

# 54. Contact Hero

Headline:

```text
WORK WITH
OMNEXA.
```

Supporting copy:

> For research collaboration, partnerships, media, careers, or other inquiries, choose the path that best matches your reason for contacting Omnexa Labs.

---

# 55. Contact Routing

Preferred:

```text
Research Collaboration →
Partnership →
Press →
Careers →
General Inquiry →
```

Each may open:

```text
a scoped form
an email destination
or an external application flow
```

depending on actual infrastructure.

---

# 56. Contact Form Data Model

If forms are implemented:

```ts
type ContactSubmission = {
  intent:
    | "research-collaboration"
    | "partnership"
    | "press"
    | "careers"
    | "general";

  name: string;
  email: string;
  organization?: string;
  message: string;
};
```

Do not collect unnecessary sensitive personal data.

---

# 57. Contact Security

Forms require:

```text
server-side validation
rate limiting
spam protection
input sanitization
logging without sensitive over-collection
CSRF protection where relevant
privacy notice
```

Do not expose raw recipient addresses in frontend code when avoidable.

---

# 58. Contact Success State

Example:

```text
MESSAGE RECEIVED

Thank you for contacting Omnexa Labs.
Your inquiry has been received.
```

Do not promise a response time unless Omnexa has an actual SLA.

---

# 59. Company / Careers / Insights Navigation

Primary navigation remains:

```text
Research
Systems
Insights
Company
Careers
```

Within Company:

```text
About
Mission
Principles
People
Contact
```

Within Careers:

```text
Open Roles
Research
Engineering
Culture
```

Within Insights:

```text
Research Notes
Engineering
Perspectives
News
```

---

# 60. Page-Level Visual Identity

Company:

```text
editorial
institutional
spacious
human
```

People:

```text
human-centered
work-first
minimal
```

Careers:

```text
ambitious
clear
technical
direct
```

Insights:

```text
editorial
dense
research-connected
```

Do not let Careers look like a separate recruiting SaaS site.

---

# 61. Photography Rules

Company / People photography may use:

```text
real team portraits
researchers at work
whiteboards
technical environments
hardware
meetings where meaningful
```

Avoid:

```text
stock diversity imagery
fake office scenes
AI-generated portraits
people pointing at laptop charts
```

---

# 62. Person Portrait Direction

Preferred:

```text
natural
documentary
consistent crop family
neutral or real work environment
```

Do not over-style with heavy gradients or artificial sci-fi backgrounds.

---

# 63. Company Content Architecture

Suggested:

```text
src/components/company/
├── landing/
├── about/
├── mission/
├── principles/
├── people/
├── contact/
└── shared/
```

---

# 64. Careers Component Architecture

```text
src/components/careers/
├── landing/
│   ├── careers-hero.tsx
│   ├── why-join.tsx
│   ├── research-environment.tsx
│   ├── engineering-environment.tsx
│   ├── values.tsx
│   ├── open-roles-preview.tsx
│   └── hiring-process.tsx
│
├── roles/
│   ├── role-index.tsx
│   ├── role-row.tsx
│   ├── role-filter.tsx
│   └── role-detail.tsx
│
├── research/
├── engineering/
├── culture/
└── shared/
```

---

# 65. Insights Component Architecture

```text
src/components/insights/
├── landing/
│   ├── insights-hero.tsx
│   ├── featured-insight.tsx
│   ├── latest-insights.tsx
│   └── insight-category-index.tsx
│
├── article/
│   ├── article-header.tsx
│   ├── article-body.tsx
│   ├── article-figure.tsx
│   ├── article-code.tsx
│   ├── article-author.tsx
│   └── related-insights.tsx
│
├── research-notes/
├── engineering/
├── perspectives/
├── news/
└── shared/
```

---

# 66. Route Structure

```text
src/app/(site)/
├── company/
│   ├── page.tsx
│   ├── about/page.tsx
│   ├── mission/page.tsx
│   ├── principles/page.tsx
│   ├── people/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   └── contact/page.tsx
│
├── careers/
│   ├── page.tsx
│   ├── open-roles/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── research/page.tsx
│   ├── engineering/page.tsx
│   └── culture/page.tsx
│
└── insights/
    ├── page.tsx
    ├── research-notes/page.tsx
    ├── engineering/page.tsx
    ├── perspectives/page.tsx
    ├── news/page.tsx
    └── [slug]/page.tsx
```

---

# 67. Query Layer

Suggested:

```text
src/content/queries/company/
├── get-company-home.ts
├── get-mission.ts
├── get-principles.ts
├── get-people.ts
└── get-person.ts

src/content/queries/careers/
├── get-careers-home.ts
├── get-open-roles.ts
└── get-role.ts

src/content/queries/insights/
├── get-insights-home.ts
├── get-insights-by-type.ts
├── get-insight.ts
└── get-related-insights.ts
```

---

# 68. Company Data Schema

Suggested:

```ts
type CompanyProfile = {
  name: string;
  shortDescription: string;
  mission: RichContent;
  about: RichContent;
  location?: string;
  researchAreaIds: string[];
  systemIds: string[];
  principles: CompanyPrinciple[];
  socialLinks?: SocialLink[];
};
```

---

# 69. Cross-Entity Relationships

Important relationships:

```text
Person ↔ Research
Person ↔ Publication
Person ↔ System
Person ↔ Insight

Job ↔ Research Area
Job ↔ System

Insight ↔ Research
Insight ↔ System
Insight ↔ Publication
```

Do not rely only on free-form tags.

---

# 70. People Page Query

Example:

```ts
async function getPeoplePage() {
  const people = await peopleRepository.getPublicPeople();

  return groupPeopleByWork(people);
}
```

Grouping should be based on real metadata.

---

# 71. Careers Query

```ts
async function getCareersHome() {
  const openRoles = await jobsRepository.getOpenRoles();

  return {
    openRoles,
    roleCount: openRoles.length,
  };
}
```

Do not show a role count if it could become stale unless generated dynamically.

---

# 72. Insights Query

```ts
async function getInsightsHome() {
  const [featured, researchNotes, engineering, perspectives, news] =
    await Promise.all([
      insightRepo.getFeatured(),
      insightRepo.getByType("research-note"),
      insightRepo.getByType("engineering"),
      insightRepo.getByType("perspective"),
      insightRepo.getByType("news"),
    ]);

  return {
    featured,
    researchNotes,
    engineering,
    perspectives,
    news,
  };
}
```

---

# 73. Editorial Workflow

Insight content should support:

```text
draft
review
scheduled
published
archived
```

Public visibility only begins at:

```text
published
```

---

# 74. Authoring Metadata

Every insight should include:

```text
author
published date
updated date where meaningful
content type
related research/system metadata
```

Do not publish anonymous institutional content unless intentionally authored as `Omnexa Labs`.

---

# 75. Reading Experience

Recommended prose width:

```text
680–780px
```

Long-form article layout:

```text
left:
metadata / local nav where needed

center:
article

right:
related work / author / references
```

Mobile:

```text
article first
metadata near top
related work below
```

---

# 76. Article Figures

Figures may contain:

```text
diagrams
charts
screenshots
tables
code
```

Every figure requires:

```text
caption
context
accessible alternative where necessary
```

---

# 77. Article Code

Engineering articles may include code.

Requirements:

```text
syntax highlighting
language label
copy button
horizontal overflow
accessible controls
```

Do not load code-highlighting bundles globally if not needed.

---

# 78. Article SEO

Examples:

```text
[Article Title] — Omnexa Labs
[Person Name] — Omnexa Labs
Careers — Omnexa Labs
[Role Title] — Careers | Omnexa Labs
```

Descriptions come from excerpts/bios/role summaries.

---

# 79. Structured Data

Possible:

```text
Organization
Person
Article
NewsArticle
JobPosting
BreadcrumbList
```

Use only when the content qualifies.

---

# 80. JobPosting Structured Data

Only generate for open roles with accurate:

```text
title
description
datePosted
employmentType
jobLocation
hiringOrganization
validThrough if known
```

Do not invent salary or closing date.

---

# 81. People Structured Data

Person pages may use:

```text
Person
```

Only include real public information.

---

# 82. Insights Open Graph

Preferred:

```text
ARTICLE TYPE
TITLE
AUTHOR
DATE
minimal research/system visual
```

Do not use generic blog thumbnails.

---

# 83. Careers Open Graph

Preferred:

```text
OMNEXA LABS
CAREERS

BUILD
WHAT COMES
NEXT.
```

Role-specific previews may use:

```text
ROLE TITLE
TEAM
LOCATION
```

---

# 84. Analytics

Recommended:

```text
company_mission_open
company_principle_open
person_open
person_research_open
person_publication_open

careers_open
career_area_open
job_open
job_apply_click

insights_open
insight_category_open
insight_open
insight_related_research_open
insight_related_system_open

contact_intent_select
contact_submit
```

---

# 85. Privacy

Do not collect unnecessary personal data.

Careers applications should be handled by:

```text
a proper applicant system
or a scoped secure form
```

if implemented.

Do not send resumes through generic analytics.

---

# 86. Contact Analytics

Analytics may record:

```text
intent category
submission success/failure
```

Do not record:

```text
message body
email address
name
organization
```

in analytics event payloads.

---

# 87. Accessibility

Requirements:

```text
one H1 per route
logical headings
keyboard navigation
visible focus
semantic forms
form labels
error summaries
screen-reader-friendly article structure
semantic dates
accessible person links
reduced motion
200% zoom support
```

---

# 88. Form Accessibility

Contact/application forms require:

```text
explicit labels
field descriptions where needed
inline error messages
error summary
focus management
autocomplete attributes
keyboard submit
success confirmation
```

Do not rely on placeholders as labels.

---

# 89. Mobile Company Experience

Mobile should preserve:

```text
mission clarity
people context
careers hierarchy
article readability
```

Do not stack endless cards.

Use:

```text
editorial rows
section breaks
large typography
compact metadata
```

---

# 90. Responsive People Index

Desktop:

```text
portrait / name / work / research / systems
```

Mobile:

```text
name
role
research focus
systems
portrait optional or smaller
```

The page remains work-first.

---

# 91. Responsive Careers

Job rows on mobile should show:

```text
title
team
location
employment type
```

Do not hide location behind interaction.

---

# 92. Responsive Insights

Article index mobile:

```text
TYPE
TITLE
DATE
AUTHOR
```

No tiny card thumbnails required.

---

# 93. Performance

Company/Careers/Insights should be lighter than Research/Systems.

Targets:

```text
LCP < 2.5s
INP < 200ms
CLS < 0.1
```

Use:

```text
server rendering
static generation
optimized images
lazy media
minimal client JavaScript
```

---

# 94. Caching

Good candidates for static generation/revalidation:

```text
mission
principles
people
articles
job detail
category pages
```

Open-role indexes may revalidate more frequently.

---

# 95. Search Integration

Global search must index:

```text
people
roles
insights
company pages
```

Examples:

```text
"autonomous agents"
→ research
→ Cadence
→ relevant role
→ related engineering article
```

---

# 96. Company Anti-Template Rules

Codex must reject:

```text
generic "Our Story" timeline without real events
fake office counters
fake employee statistics
generic values icon grid
stock culture photography
fake testimonials
random awards
fake press logos
```

---

# 97. Careers Anti-Template Rules

Reject:

```text
ping-pong table culture
fake perks
"rockstar" language
"ninja" language
unrealistic urgency
generic startup clichés
```

The recruiting experience should be technical, ambitious, and grounded.

---

# 98. Insights Anti-Template Rules

Reject:

```text
generic blog card grid
SEO-farm content
AI-generated filler posts
fake publication dates
clickbait titles
random stock thumbnails
```

Insights should feel like real thinking emerging from real work.

---

# 99. Company Content Integrity

Never invent:

```text
headcount
funding
revenue
offices
history
partnerships
clients
awards
press mentions
founding dates
team biographies
```

Only include verified public facts.

---

# 100. Stage 6 Codex Implementation Sequence

## Phase 1 — Content Models

Implement:

```text
CompanyProfile
CompanyPrinciple
Person
Job
Insight
ContactIntent
```

Add schemas and validation.

---

## Phase 2 — Company Routes

Create:

```text
/company
/company/about
/company/mission
/company/principles
/company/people
/company/people/[slug]
/company/contact
```

Use static composition first.

---

## Phase 3 — Careers Routes

Create:

```text
/careers
/careers/open-roles
/careers/open-roles/[slug]
/careers/research
/careers/engineering
/careers/culture
```

Implement empty role state.

---

## Phase 4 — Insights Routes

Create:

```text
/insights
/insights/research-notes
/insights/engineering
/insights/perspectives
/insights/news
/insights/[slug]
```

Implement editorial index and article template.

---

## Phase 5 — Relationships

Connect:

```text
people ↔ research
people ↔ publications
people ↔ systems
people ↔ insights

jobs ↔ research
jobs ↔ systems

insights ↔ research
insights ↔ systems
```

---

## Phase 6 — People Experience

Implement:

```text
people index
person profiles
work-first grouping
related research
related systems
related publications
```

---

## Phase 7 — Careers Experience

Implement:

```text
why join
research environment
engineering environment
culture
open roles
role detail
hiring process
```

---

## Phase 8 — Insights Experience

Implement:

```text
featured insight
category indexes
article pages
figures
code
related work
author profiles
```

---

## Phase 9 — Contact

Implement:

```text
intent routing
forms if needed
server validation
rate limiting
spam protection
success/error states
```

---

## Phase 10 — SEO / Structured Data

Implement:

```text
Organization
Person
Article
NewsArticle
JobPosting
breadcrumbs
Open Graph
canonical URLs
```

Only where valid.

---

## Phase 11 — Accessibility Audit

Verify:

```text
forms
keyboard
focus
heading hierarchy
screen reader
zoom
reduced motion
article reading order
```

---

## Phase 12 — Performance / Editorial QA

Measure:

```text
bundle size
image weight
LCP
INP
CLS
article readability
index performance
```

Verify every claim and public bio.

---

# 101. Stage 6 Acceptance Criteria

## Company

- [ ] Company landing page exists.
- [ ] Mission page exists.
- [ ] Principles page exists.
- [ ] About page exists.
- [ ] Company content links to Research and Systems.
- [ ] No generic corporate marketing architecture is introduced.

## People

- [ ] People index exists.
- [ ] Profiles are data-driven.
- [ ] Profiles link to research.
- [ ] Profiles link to publications.
- [ ] Profiles link to systems.
- [ ] No biography data is invented.
- [ ] Work is more prominent than decorative profile cards.

## Careers

- [ ] Careers landing page exists.
- [ ] Research careers page exists.
- [ ] Engineering careers page exists.
- [ ] Culture page exists.
- [ ] Open roles index exists.
- [ ] Job detail exists.
- [ ] Closed roles cannot accept applications.
- [ ] Zero-open-role state works.
- [ ] No fake perks or roles are present.

## Insights

- [ ] Insights landing exists.
- [ ] Research Notes category exists.
- [ ] Engineering category exists.
- [ ] Perspectives category exists.
- [ ] News category exists.
- [ ] Article detail exists.
- [ ] Articles support research/system relationships.
- [ ] Research Notes distinguish hypotheses from conclusions.
- [ ] No generic blog-card visual language dominates.

## Contact

- [ ] Contact page exists.
- [ ] Intent routing exists.
- [ ] Forms use server-side validation if present.
- [ ] Spam/rate-limit protection is implemented if forms are present.
- [ ] Success/error states are accessible.
- [ ] Analytics do not capture message content or personal identifiers.

## Accessibility

- [ ] One H1 per route.
- [ ] Forms are properly labeled.
- [ ] Error states are announced.
- [ ] Keyboard navigation works.
- [ ] Focus is visible.
- [ ] 200% zoom works.
- [ ] Article reading order is logical.
- [ ] Portraits have appropriate alt text.

## SEO

- [ ] Dynamic metadata works.
- [ ] Person structured data is valid when used.
- [ ] Article structured data is valid when used.
- [ ] JobPosting structured data exists only for open accurate roles.
- [ ] Canonical URLs exist.
- [ ] Sitemap includes published public content only.

## Integrity

- [ ] No fake headcount.
- [ ] No fake funding.
- [ ] No fake partners.
- [ ] No fake awards.
- [ ] No fake employee histories.
- [ ] No fake job openings.
- [ ] No fake article authors or dates.

---

# 102. Non-Goals for Stage 6

Do not build in this stage:

```text
authenticated employee profiles
internal HR systems
applicant tracking backend
private employee directory
internal company wiki
internal research notes
customer support system
CRM
newsletter automation
```

Stage 6 is the public institutional, editorial, and recruiting experience.

---

# 103. Stage 6 Quality Bar

A visitor should be able to understand:

```text
what Omnexa is
why it exists
what principles guide it
who is doing the work
what the team is thinking
what roles exist
how to contact the organization
```

without the site feeling generic, corporate, or promotional.

---

# 104. Final Institutional Narrative

The institutional experience should complete the public Omnexa story:

```text
RESEARCH
→ what we investigate

SYSTEMS
→ what we build

COMPANY
→ why we exist

PEOPLE
→ who does the work

INSIGHTS
→ what we are learning

CAREERS
→ who should join

CONTACT
→ how others can engage
```

The central idea is:

> **Omnexa should feel like an institution with a body of work, a way of thinking, and a clear technical direction — not merely a company with products.**
