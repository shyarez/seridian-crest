import type { Metadata } from "next";
import AnimatedSection from "@/components/site/AnimatedSection";
import {
  ShieldCheck,
  BadgeCheck,
  FileCheck2,
  Globe,
  Award,
  Building2,
  CheckCircle,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Affiliations & Approvals",
  description:
    "Seridian Crest LLP is officially recognised and approved by leading government bodies and international trade agencies. View our accreditations and memberships.",
};

const APPROVALS = [
  {
    icon: ShieldCheck,
    agency: "Directorate General of Foreign Trade",
    short: "DGFT",
    badge: "Government of India",
    description:
      "Registered with the DGFT under the Ministry of Commerce & Industry, authorising us to engage in legal import-export operations under the Foreign Trade Policy.",
    tag: "Active",
    color: "bg-blue-50 border-blue-100",
    iconColor: "text-blue-700",
    iconBg: "bg-blue-100",
    badgeColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: Building2,
    agency: "Ministry of Micro, Small & Medium Enterprises",
    short: "MSME / Udyam",
    badge: "Government of India",
    description:
      "Certified under the Udyam Registration portal, recognising Seridian Crest as a registered MSME, qualifying us for government schemes and priority trade channels.",
    tag: "Active",
    color: "bg-emerald-50 border-emerald-100",
    iconColor: "text-emerald-700",
    iconBg: "bg-emerald-100",
    badgeColor: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: FileCheck2,
    agency: "Goods & Services Tax Network",
    short: "GSTN",
    badge: "Government of India",
    description:
      "Fully registered under the Goods and Services Tax regime, ensuring compliant invoicing, input tax credit, and transparent financial operations across all transactions.",
    tag: "Active",
    color: "bg-violet-50 border-violet-100",
    iconColor: "text-violet-700",
    iconBg: "bg-violet-100",
    badgeColor: "bg-violet-100 text-violet-700",
  },
  {
    icon: Globe,
    agency: "Customs & Central Excise Department",
    short: "Indian Customs",
    badge: "CBIC – Govt. of India",
    description:
      "Approved customs broker registration enabling us to handle customs clearance, duty filing, and cargo examination on behalf of our export clients at all major Indian ports.",
    tag: "Active",
    color: "bg-amber-50 border-amber-100",
    iconColor: "text-amber-700",
    iconBg: "bg-amber-100",
    badgeColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: Award,
    agency: "Export Promotion Council",
    short: "EPC Member",
    badge: "Ministry of Commerce",
    description:
      "Enrolled member of the relevant Export Promotion Council, granting access to market intelligence, buyer-seller meets, and government-backed promotional incentives.",
    tag: "Active",
    color: "bg-rose-50 border-rose-100",
    iconColor: "text-rose-700",
    iconBg: "bg-rose-100",
    badgeColor: "bg-rose-100 text-rose-700",
  },
  {
    icon: BadgeCheck,
    agency: "Federation of Indian Export Organisations",
    short: "FIEO",
    badge: "Apex Trade Body",
    description:
      "Associate member of FIEO, India's apex body for export promotion, connecting us to a nationwide network of exporters, freight forwarders, and international buyers.",
    tag: "Active",
    color: "bg-sky-50 border-sky-100",
    iconColor: "text-sky-700",
    iconBg: "bg-sky-100",
    badgeColor: "bg-sky-100 text-sky-700",
  },
];

const STATS = [
  { label: "Government Registrations", value: "4+" },
  { label: "Trade Body Memberships", value: "3+" },
  { label: "Years of Compliance", value: "5+" },
  { label: "Ports Covered", value: "12+" },
];

export default function AffiliationsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-40 pb-24 section-padding hero-gradient relative overflow-hidden text-center"
        aria-label="Affiliations hero"
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="container-site relative z-10 max-w-3xl mx-auto">
          <AnimatedSection direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4" />
              Officially Recognised
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Affiliations &amp; Approvals
            </h1>
            <p className="text-white/80 text-xl font-medium">
              Backed by government bodies and trade institutions — our
              accreditations reflect our commitment to compliance, transparency,
              and trusted global trade.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats bar */}
      <section
        className="bg-white border-b border-brand-border"
        aria-label="Affiliation statistics"
      >
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-brand-border">
            {STATS.map(({ label, value }, i) => (
              <AnimatedSection key={label} delay={i * 0.08} direction="up">
                <div className="py-10 px-6 text-center">
                  <p className="text-4xl font-extrabold text-brand-primary mb-1">
                    {value}
                  </p>
                  <p className="text-brand-text-secondary text-sm font-medium">
                    {label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Approvals */}
      <section
        className="section-padding bg-brand-bg"
        aria-label="Agency approvals"
      >
        <div className="container-site">
          <AnimatedSection direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">
                Government & Regulatory Approvals
              </h2>
              <p className="text-brand-text-secondary text-lg">
                We are approved and registered with the following government
                bodies, ensuring fully compliant and legally authorised
                export-import operations.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {APPROVALS.map(
              (
                {
                  icon: Icon,
                  agency,
                  short,
                  badge,
                  description,
                  tag,
                  color,
                  iconColor,
                  iconBg,
                  badgeColor,
                },
                i
              ) => (
                <AnimatedSection key={agency} delay={i * 0.08} direction="up">
                  <div
                    className={`rounded-2xl border p-8 flex flex-col h-full bg-white hover:shadow-lg transition-shadow duration-300 ${color}`}
                  >
                    {/* Header row */}
                    <div className="flex items-start justify-between gap-3 mb-5">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}
                      >
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${badgeColor}`}
                      >
                        <CheckCircle className="w-3 h-3" />
                        {tag}
                      </span>
                    </div>
                    {/* Agency info */}
                    <p className="text-xs font-bold uppercase tracking-widest text-brand-text-secondary mb-1">
                      {short}
                    </p>
                    <h3 className="text-base font-extrabold text-brand-primary mb-1 leading-snug">
                      {agency}
                    </h3>
                    <p className="text-xs text-brand-text-secondary mb-4 font-medium">
                      {badge}
                    </p>
                    <p className="text-brand-text-secondary text-sm leading-relaxed flex-1">
                      {description}
                    </p>
                  </div>
                </AnimatedSection>
              )
            )}
          </div>
        </div>
      </section>

      {/* Trust statement */}
      <section
        className="section-padding bg-white"
        aria-label="Compliance commitment"
      >
        <div className="container-site max-w-5xl mx-auto">
          <div className="bg-brand-bg rounded-3xl border border-brand-border p-10 md:p-14 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <AnimatedSection direction="left">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                  <Star className="w-5 h-5 text-brand-primary" />
                </div>
                <span className="text-sm font-bold text-brand-primary uppercase tracking-wider">
                  Our Commitment
                </span>
              </div>
              <h2 className="text-3xl font-extrabold text-brand-primary mb-4 leading-tight">
                Compliance is Not an Option — It&apos;s Our Foundation
              </h2>
              <p className="text-brand-text-secondary leading-relaxed">
                Every affiliation we hold is maintained with active renewal,
                ongoing audits, and adherence to the latest regulatory
                frameworks. Our clients can ship with complete confidence
                knowing that Seridian Crest operates within every applicable
                legal boundary — domestically and internationally.
              </p>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <ul className="space-y-4">
                {[
                  "Proactive renewal of all registrations before expiry",
                  "Regular internal compliance audits",
                  "Dedicated documentation team for customs & trade",
                  "Zero tolerance for undocumented shipments",
                  "Full traceability across all export transactions",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-brand-text-secondary text-sm"
                  >
                    <CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    {point}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="section-padding bg-brand-primary text-center"
        aria-label="Call to action"
      >
        <div className="container-site max-w-3xl mx-auto">
          <AnimatedSection direction="up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Questions About Our Credentials?
            </h2>
            <p className="text-brand-highlight text-lg mb-10 font-medium">
              We are happy to share copies of our certificates and registration
              documents upon request. Reach out to our compliance team.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-brand-primary font-bold hover:bg-brand-bg transition-all shadow-xl hover:-translate-y-1"
            >
              Contact Us
            </a>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
