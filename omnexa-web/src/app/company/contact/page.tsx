import type { Metadata } from "next";

import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { TechnicalLabel } from "@/components/typography/technical-label";
import { CoordinateLabel } from "@/components/brand/coordinate-label";
import { contactChannels, site } from "@/lib/site";

import styles from "./contact.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Research collaboration, partnerships, press and careers enquiries for Omnexa Labs.",
  alternates: { canonical: "/company/contact" },
};

/**
 * Contact: Stage 6 §53-58.
 *
 * Intent routing is implemented; the submission backend is not, because there
 * is none. Stage 7 §108 is explicit: "Do not pretend submission succeeded."
 * Rendering a form that discards its input would be exactly that, so each
 * intent instead resolves to a real destination when one is configured, and
 * states the truth when one is not.
 *
 * Wiring this up is a one-line change: set `contactEmail` in `lib/site.ts`
 * (or point each channel at a scoped form/ATS URL) and every intent below
 * becomes a working `mailto:` without touching this page.
 */
export default function ContactPage() {
  const configured = Boolean(site.contactEmail);

  return (
    <main id="main">
      <PageHeader
        breadcrumb={[{ label: "Company", href: "/company" }, { label: "Contact" }]}
        headingLines={["Work with", "Omnexa."]}
        lede="For research collaboration, partnerships, media, careers, or other enquiries, choose the path that best matches your reason for contacting Omnexa Labs."
      />

      <Section tone="light" density="editorial">
        <ul className={styles.channels} role="list">
          {contactChannels.map((channel, index) => {
            const href = site.contactEmail
              ? `mailto:${site.contactEmail}?subject=${encodeURIComponent(channel.subject)}`
              : undefined;

            const content = (
              <>
                <TechnicalLabel as="span" tone="muted" size="sm">
                  {String(index + 1).padStart(2, "0")}
                </TechnicalLabel>
                <span className={styles.channelBody}>
                  <span className={`omx-heading-3 ${styles.channelTitle}`}>
                    {channel.label}
                  </span>
                  <span className={`omx-body-sm ${styles.channelDetail}`}>
                    {channel.detail}
                  </span>
                </span>
                {href ? (
                  <span className={styles.arrow} aria-hidden="true">
                    →
                  </span>
                ) : null}
              </>
            );

            return (
              <li key={channel.label} className={styles.channel}>
                {href ? (
                  <a href={href} className={styles.channelLink}>
                    {content}
                  </a>
                ) : (
                  <div className={styles.channelLink}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>

        {!configured ? (
          <div className={styles.notice}>
            <TechnicalLabel as="h2" tone="secondary">
              Contact channel
            </TechnicalLabel>
            <p className="omx-body-lg">
              A public contact address has not been published yet.
            </p>
            <p className={`omx-body ${styles.noticeDetail}`}>
              Rather than show a form that would silently discard your message,
              this page lists the enquiry types Omnexa handles. The channels
              above activate as soon as a contact address or application system
              is configured.
            </p>
          </div>
        ) : null}
      </Section>

      <Section tone="subtle" density="compact">
        <div className={styles.location}>
          <TechnicalLabel as="h2" tone="muted">
            Where we work
          </TechnicalLabel>
          <CoordinateLabel />
        </div>
      </Section>
    </main>
  );
}
