import type { Metadata } from "next";

import { ContinueBlock } from "@/components/navigation/continue-block";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";

import route from "@/styles/route.module.css";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Omnexa Labs handles data on this website.",
  alternates: { canonical: "/privacy" },
};

/**
 * Privacy: Stage 7 §123-124.
 *
 * This page describes what the site ACTUALLY does today, which is very
 * little: no analytics provider is configured, no cookies are set, and no
 * contact backend receives data. Stage 7 §123 forbids copying a generic
 * privacy policy, and §124 forbids a cookie banner disconnected from real
 * behaviour, so neither appears here.
 *
 * This is a factual description of current implementation, not legal advice.
 * It must be reviewed by counsel and updated whenever analytics, forms or
 * third-party processors are introduced.
 */
export default function PrivacyPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Legal / Privacy"
        headingLines={["Privacy."]}
        lede="What this website collects, and what it does not."
      />

      <Section tone="light" density="editorial">
        <div className={route.prose}>
          <h2 className="omx-heading-3">Analytics</h2>
          <p className="omx-body">
            No analytics provider is currently configured on this website. No
            behavioural tracking, profiling or advertising identifiers are used.
          </p>

          <h2 className="omx-heading-3">Cookies and storage</h2>
          <p className="omx-body">
            This website does not set cookies and does not write to local
            storage. No consent banner is shown because there is nothing to
            consent to.
          </p>

          <h2 className="omx-heading-3">Contact information</h2>
          <p className="omx-body">
            No contact form is currently active on this website, so no personal
            information is collected or transmitted through it. If you contact
            Omnexa Labs directly, your message and contact details are used only
            to respond to your enquiry.
          </p>

          <h2 className="omx-heading-3">Third-party processors</h2>
          <p className="omx-body">
            Fonts are self-hosted and served from this site&rsquo;s own origin;
            no request is made to a third-party font provider. Hosting
            infrastructure processes standard server request data such as IP
            address and user agent for the purpose of serving the site.
          </p>

          <h2 className="omx-heading-3">Changes</h2>
          <p className="omx-body">
            This statement describes the site as currently implemented. It will
            be updated if analytics, forms, or other third-party services are
            introduced.
          </p>
        </div>
      </Section>
      <Section tone="light" density="compact">
        <ContinueBlock
          links={[
            { label: "Terms of use", href: "/terms" },
            { label: "Contact Omnexa", href: "/company/contact" },
            { label: "Return home", href: "/" },
          ]}
        />
      </Section>

    </main>
  );
}
