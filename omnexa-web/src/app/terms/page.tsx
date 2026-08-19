import type { Metadata } from "next";

import { ContinueBlock } from "@/components/navigation/continue-block";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { site } from "@/lib/site";

import route from "@/styles/route.module.css";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for the Omnexa Labs website.",
  alternates: { canonical: "/terms" },
};

/**
 * Terms of use.
 *
 * Scoped narrowly to this website and drafted to be accurate rather than
 * comprehensive. Like the privacy page, it needs legal review before launch:
 * it is a placeholder describing real conditions, not a substitute for counsel.
 */
export default function TermsPage() {
  return (
    <main id="main">
      <PageHeader
        eyebrow="Legal / Terms"
        headingLines={["Terms of use."]}
        lede="Conditions that apply to this website."
      />

      <Section tone="light" density="editorial">
        <div className={route.prose}>
          <h2 className="omx-heading-3">Purpose of this site</h2>
          <p className="omx-body">
            This website presents information about {site.name}, its research
            and its systems. Research content published here describes work in
            progress. Descriptions of systems reflect design and development
            status and are not offers of a commercial product or service.
          </p>

          <h2 className="omx-heading-3">No professional advice</h2>
          <p className="omx-body">
            Nothing on this website constitutes professional, medical, legal or
            financial advice. In particular, information describing medical
            intelligence research or systems is provided for general information
            only and must not be used for diagnosis or treatment decisions.
          </p>

          <h2 className="omx-heading-3">Research content</h2>
          <p className="omx-body">
            Published research reflects findings at the time of publication and
            may be superseded. Preliminary results, hypotheses and open
            questions are identified as such and should not be read as
            established conclusions.
          </p>

          <h2 className="omx-heading-3">Intellectual property</h2>
          <p className="omx-body">
            Content on this website is the property of {site.name} unless
            otherwise stated. Publications and artifacts may carry their own
            licence terms, which take precedence where they apply.
          </p>

          <h2 className="omx-heading-3">External links</h2>
          <p className="omx-body">
            This website may link to external resources. {site.name} is not
            responsible for the content or availability of those resources.
          </p>
        </div>
      </Section>
      <Section tone="light" density="compact">
        <ContinueBlock
          links={[
            { label: "Privacy", href: "/privacy" },
            { label: "Contact Omnexa", href: "/company/contact" },
            { label: "Return home", href: "/" },
          ]}
        />
      </Section>

    </main>
  );
}
