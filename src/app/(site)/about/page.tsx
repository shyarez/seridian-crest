import type { Metadata } from "next";
import AnimatedSection from "@/components/site/AnimatedSection";
import {
  Target,
  Eye,
  Shield,
  Clock,
  Search,
  HeartHandshake,
  CheckCircle,
  FileDown,
  Award,
  BookOpen,
  ShieldCheck,
  FileCheck2,
  BadgeCheck,
} from "lucide-react";
import { getGlobalContent } from "@/lib/data/content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Seridian Crest LLP, our mission, vision, and core values as an export-focused shipping and logistics company.",
};

const CORE_VALUES = [
  {
    icon: Shield,
    title: "Integrity",
    body: "Uncompromising ethical standards in all our operations.",
  },
  {
    icon: Clock,
    title: "Reliability",
    body: "Dependable service you can count on, every time.",
  },
  {
    icon: Search,
    title: "Transparency",
    body: "Clear communication and full visibility into your supply chain.",
  },
  {
    icon: CheckCircle,
    title: "Safety",
    body: "Prioritizing the safety of cargo, personnel, and the environment.",
  },
  {
    icon: Target,
    title: "Efficiency",
    body: "Optimized processes to save time and reduce costs.",
  },
  {
    icon: HeartHandshake,
    title: "Client Focus",
    body: "Building lasting partnerships through dedicated support.",
  },
];

const DIRECTORS = [
  {
    initials: "RK",
    name: "Rajesh Kumar",
    designation: "Managing Director",
    bio: "With over 20 years in global trade and export logistics, Rajesh leads Seridian Crest with a vision of building long-term, trust-based partnerships across international markets.",
    linkedin: "https://linkedin.com",
    color: "from-brand-primary to-[#1a3a5c]",
  },
  {
    initials: "PM",
    name: "Priya Mehta",
    designation: "Director – Operations",
    bio: "Priya oversees end-to-end shipment operations and compliance, ensuring every consignment is handled with precision, accountability, and full regulatory adherence.",
    linkedin: "https://linkedin.com",
    color: "from-[#0f4c81] to-[#0a2d4a]",
  },
  {
    initials: "AS",
    name: "Amit Shah",
    designation: "Director – Business Development",
    bio: "Amit spearheads strategic growth initiatives and client acquisition, forging export corridors into emerging markets across Southeast Asia, Europe, and the Middle East.",
    linkedin: "https://linkedin.com",
    color: "from-[#1e5f8a] to-[#0d3a5c]",
  },
];

export default async function AboutPage() {
  const content = await getGlobalContent();

  return (
    <>
      {/* Hero */}
      <section
        className="pt-40 pb-24 section-padding hero-gradient relative overflow-hidden text-center"
        aria-label="About hero"
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
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              About Seridian Crest
            </h1>
            <p className="text-white/80 text-xl font-medium">
              Driven by a primary focus on export services, delivering reliable
              shipping solutions from port to destination.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Overview */}
      <section
        className="section-padding bg-white"
        aria-label="Company Overview"
      >
        <div className="container-site max-w-4xl mx-auto text-center">
          <AnimatedSection direction="up">
            <h2 className="text-3xl font-extrabold text-brand-primary mb-8">
              Company Overview
            </h2>
            <p className="text-brand-text-secondary text-lg leading-relaxed mb-12">
              {content.aboutContent}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Company Directors */}
      <section
        className="section-padding bg-brand-bg"
        aria-label="Company directors"
      >
        <div className="container-site">
          <AnimatedSection direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">
                Our Leadership
              </h2>
              <p className="text-brand-text-secondary text-lg">
                The experienced directors driving Seridian Crest&apos;s vision
                forward.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {DIRECTORS.map(
              ({ initials, name, designation, bio, linkedin, color }, i) => (
                <AnimatedSection key={name} delay={i * 0.1} direction="up">
                  <div className="bg-white rounded-3xl border border-brand-border shadow-sm overflow-hidden flex flex-col h-full group hover:shadow-xl transition-shadow duration-300">
                    {/* Avatar banner */}
                    <div
                      className={`bg-gradient-to-br ${color} h-40 flex items-center justify-center relative`}
                    >
                      <div className="w-20 h-20 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center">
                        <span className="text-white font-extrabold text-2xl tracking-wide">
                          {initials}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className="p-7 flex flex-col flex-1">
                      <h3 className="text-xl font-extrabold text-brand-primary mb-1">
                        {name}
                      </h3>
                      <p className="text-sm font-semibold text-brand-text-secondary mb-4 uppercase tracking-wider">
                        {designation}
                      </p>
                      <p className="text-brand-text-secondary text-sm leading-relaxed flex-1 mb-6">
                        {bio}
                      </p>
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-primary hover:opacity-70 transition-opacity w-fit"
                        aria-label={`${name} LinkedIn profile`}
                      >
                        LinkedIn Profile
                      </a>
                    </div>
                  </div>
                </AnimatedSection>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section
        className="section-padding bg-brand-bg"
        aria-label="Mission and vision"
      >
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedSection direction="left" delay={0}>
              <div className="bg-white rounded-3xl p-10 h-full border border-brand-border shadow-sm">
                <div className="w-14 h-14 rounded-2xl bg-brand-alt-bg flex items-center justify-center mb-8">
                  <Target className="w-7 h-7 text-brand-primary" />
                </div>
                <h2 className="text-2xl font-extrabold text-brand-primary mb-4">
                  Our Mission
                </h2>
                <p className="text-brand-text-secondary text-lg leading-relaxed">
                  {content.mission}
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.1}>
              <div className="bg-brand-primary rounded-3xl p-10 h-full shadow-xl">
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                  <Eye className="w-7 h-7 text-brand-highlight" />
                </div>
                <h2 className="text-2xl font-extrabold text-white mb-4">
                  Our Vision
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  {content.vision}
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-white" aria-label="Core values">
        <div className="container-site">
          <AnimatedSection direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">
                Our Core Values
              </h2>
              <p className="text-brand-text-secondary text-lg">
                The principles that guide every shipment we handle.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CORE_VALUES.map(({ icon: Icon, title, body }, i) => (
              <AnimatedSection key={title} delay={i * 0.1} direction="up">
                <div className="bg-brand-bg rounded-2xl p-8 border border-brand-border hover:shadow-lg transition-shadow h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Icon className="w-6 h-6 text-brand-primary" />
                    </div>
                    <h3 className="font-bold text-brand-primary text-xl">
                      {title}
                    </h3>
                  </div>
                  <p className="text-brand-text-secondary leading-relaxed">
                    {body}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Download Company Brochure */}
      <section
        className="section-padding bg-brand-bg"
        aria-label="Download company brochure"
      >
        <div className="container-site max-w-5xl mx-auto">
          <AnimatedSection direction="up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">
                Company Brochure
              </h2>
              <p className="text-brand-text-secondary text-lg">
                Get a comprehensive overview of our services, capabilities, and
                global network in one document.
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={0.1}>
            <div className="bg-white rounded-3xl border border-brand-border shadow-sm overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left info panel */}
                <div className="p-10 flex flex-col justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-brand-alt-bg flex items-center justify-center mb-6">
                    <BookOpen className="w-7 h-7 text-brand-primary" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-brand-primary mb-3">
                    Seridian Crest — Company Profile
                  </h3>
                  <p className="text-brand-text-secondary leading-relaxed mb-6">
                    Discover our end-to-end export logistics solutions, fleet
                    capabilities, compliance framework, and partnership model —
                    all in a single, easy-to-share brochure.
                  </p>
                  <ul className="space-y-2 mb-8">
                    {[
                      "Service portfolio & specialisations",
                      "Global shipping routes & partners",
                      "Compliance & documentation standards",
                      "Client onboarding process",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-brand-text-secondary text-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-brand-primary shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/downloads/seridian-crest-brochure.pdf"
                    download
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-brand-primary text-white font-bold hover:opacity-90 transition-all shadow-lg hover:-translate-y-0.5 w-fit"
                  >
                    <FileDown className="w-5 h-5" />
                    Download Brochure
                  </a>
                </div>
                {/* Right decorative panel */}
                <div className="bg-brand-primary p-10 flex flex-col items-center justify-center gap-6 min-h-[260px]">
                  <div className="w-24 h-24 rounded-3xl bg-white/10 flex items-center justify-center">
                    <FileDown className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-white/70 text-sm text-center max-w-[200px]">
                    PDF format · Updated 2025 · Free to download
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Download Certificates */}
      <section
        className="section-padding bg-white"
        aria-label="Download certificates"
      >
        <div className="container-site">
          <AnimatedSection direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">
                Our Certifications
              </h2>
              <p className="text-brand-text-secondary text-lg">
                We are fully accredited and certified to the highest industry
                standards. Download our official certificates below.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: ShieldCheck,
                title: "ISO 9001:2015",
                subtitle: "Quality Management System",
                description:
                  "Certified to the international standard for quality management, ensuring consistent, high-quality service delivery.",
                file: "/downloads/certificates/iso-9001.pdf",
              },
              {
                icon: FileCheck2,
                title: "IEC Certification",
                subtitle: "Importer Exporter Code",
                description:
                  "Officially registered under the Directorate General of Foreign Trade, enabling lawful import-export operations.",
                file: "/downloads/certificates/iec-certificate.pdf",
              },
              {
                icon: BadgeCheck,
                title: "MSME Registration",
                subtitle: "Udyam Certificate",
                description:
                  "Recognised by the Ministry of MSME under Udyam Registration, reflecting our commitment to Indian enterprise.",
                file: "/downloads/certificates/msme-udyam.pdf",
              },
            ].map(({ icon: Icon, title, subtitle, description, file }, i) => (
              <AnimatedSection key={title} delay={i * 0.1} direction="up">
                <div className="bg-brand-bg rounded-2xl border border-brand-border p-8 flex flex-col h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-5">
                    <Icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-primary mb-1">
                    {title}
                  </h3>
                  <p className="text-sm font-medium text-brand-text-secondary mb-3">
                    {subtitle}
                  </p>
                  <p className="text-brand-text-secondary text-sm leading-relaxed mb-6 flex-1">
                    {description}
                  </p>
                  <a
                    href={file}
                    download
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-brand-border text-brand-primary font-semibold text-sm hover:bg-brand-alt-bg transition-all w-fit"
                  >
                    <Award className="w-4 h-4" />
                    Download Certificate
                  </a>
                </div>
              </AnimatedSection>
            ))}
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
              Ready to Work With Us?
            </h2>
            <p className="text-brand-highlight text-lg mb-10 font-medium">
              {content.ctaText}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white text-brand-primary font-bold hover:bg-brand-bg transition-all shadow-xl hover:-translate-y-1"
            >
              Contact Us
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
