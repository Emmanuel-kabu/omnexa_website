import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TextAction } from "@/components/actions/text-action";
import { SampleBadge } from "@/components/brand/sample-badge";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { jobsRepository } from "@/content/repositories";
import { site } from "@/lib/site";

import route from "@/styles/route.module.css";

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const roles = await jobsRepository.getOpenRoles();
  return roles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const role = await jobsRepository.getBySlug(slug);
  if (!role) return { title: "Role not found" };

  return {
    title: `${role.title}: Careers`,
    description: role.summary,
    alternates: { canonical: `/careers/open-roles/${role.slug}` },
    // A closed role must not be indexed as if it were open.
    robots: role.status === "open" ? undefined : { index: false, follow: true },
  };
}

/**
 * Job detail: Stage 6 §36-39, §80.
 *
 * `JobPosting` structured data is emitted only for genuinely open roles, and
 * only from fields that exist. No salary and no `validThrough` are invented
 * (§80). A closed role stays addressable, is clearly marked, and loses its
 * apply action entirely (§38).
 */
export default async function RolePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const role = await jobsRepository.getBySlug(slug);
  if (!role) notFound();

  const isOpen = role.status === "open";

  const schema =
    isOpen && role.publishedAt
      ? {
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: role.title,
          description: role.summary,
          datePosted: role.publishedAt,
          employmentType: role.employmentType,
          hiringOrganization: {
            "@type": "Organization",
            name: site.name,
            sameAs: site.url,
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: role.location,
            },
          },
          ...(role.closingDate ? { validThrough: role.closingDate } : {}),
        }
      : null;

  const sections = [
    { title: "Mission of the role", body: role.mission },
    { title: "Responsibilities", list: role.responsibilities },
    { title: "Required qualifications", list: role.requirements },
    ...(role.preferred.length > 0
      ? [{ title: "Preferred qualifications", list: role.preferred }]
      : []),
  ];

  return (
    <main id="main">
      {schema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      ) : null}

      <PageHeader
        breadcrumb={[
          { label: "Careers", href: "/careers" },
          { label: "Open roles", href: "/careers/open-roles" },
          { label: role.title },
        ]}
        eyebrow={isOpen ? "Open role" : "Closed role"}
        headingLines={[role.title]}
        size="heading-1"
        lede={role.summary}
        meta={
          <>
            <TechnicalLabel as="span">{role.department}</TechnicalLabel>
            <TechnicalLabel as="span">{role.location}</TechnicalLabel>
            <TechnicalLabel as="span">{role.employmentType}</TechnicalLabel>
            {role.workMode ? (
              <TechnicalLabel as="span">{role.workMode}</TechnicalLabel>
            ) : null}
            {!isOpen ? (
              <TechnicalLabel as="span" tone="accent">
                Closed
              </TechnicalLabel>
            ) : null}
            <SampleBadge sample={role.sample} />
          </>
        }
      />

      <Section tone="light" density="editorial">
        <div className={route.reading}>
          <div className={route.readingMain}>
            {sections.map((section) => (
              <div key={section.title} className={route.block}>
                <h2 className={`omx-heading-3 ${route.blockTitle}`}>
                  {section.title}
                </h2>
                {"body" in section && section.body ? (
                  <p className="omx-body" style={{ color: "var(--text-secondary)" }}>
                    {section.body}
                  </p>
                ) : null}
                {"list" in section && section.list ? (
                  <ul className={route.list}>
                    {/* Markers come from CSS rather than a text character, so
                        screen readers announce the item and not a stray glyph. */}
                    {section.list.map((item) => (
                      <li key={item} className={route.bulletItem}>
                        <span className="omx-body">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>

          <aside className={route.readingAside}>
            <div className={route.metaBlock}>
              <div className={route.metaItem}>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  Department
                </TechnicalLabel>
                <span className={`omx-body-sm ${route.metaValue}`}>
                  {role.department}
                </span>
              </div>
              <div className={route.metaItem}>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  Location
                </TechnicalLabel>
                <span className={`omx-body-sm ${route.metaValue}`}>
                  {role.location}
                </span>
              </div>
              <div className={route.metaItem}>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  Type
                </TechnicalLabel>
                <span className={`omx-body-sm ${route.metaValue}`}>
                  {role.employmentType}
                </span>
              </div>
            </div>

            {/* Apply is shown only for open roles with a real destination */}
            {isOpen && role.applicationUrl ? (
              <TextAction href={role.applicationUrl} variant="primary">
                Apply for this role
              </TextAction>
            ) : isOpen ? (
              <p className="omx-body-sm" style={{ color: "var(--text-muted)" }}>
                An application link has not been published for this role yet.
              </p>
            ) : (
              <p className="omx-body-sm" style={{ color: "var(--text-muted)" }}>
                This role is closed and is no longer accepting applications.
              </p>
            )}
          </aside>
        </div>
      </Section>
    </main>
  );
}
