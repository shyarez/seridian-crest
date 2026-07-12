import type { Metadata } from "next";
import AnimatedSection from "@/components/site/AnimatedSection";
import {
  Package,
  Anchor,
  Wheat,
  Flame,
  Layers,
  Gem,
  Shirt,
  FlaskConical,
  ArrowRight,
  CheckCircle2,
  Globe,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore the range of export commodities handled by Seridian Crest LLP — from agricultural produce and industrial goods to chemicals, minerals, and more.",
};

const PRODUCT_CATEGORIES = [
  {
    icon: Wheat,
    title: "Agricultural Commodities",
    tagline: "Farm-fresh exports, global reach",
    description:
      "We handle end-to-end export logistics for a wide range of agricultural products, ensuring compliance with phytosanitary regulations, storage requirements, and international food safety standards.",
    items: [
      "Basmati & Non-Basmati Rice",
      "Wheat & Wheat Products",
      "Pulses & Lentils",
      "Spices & Herbs",
      "Oilseeds & Edible Oils",
      "Fresh & Frozen Vegetables",
    ],
    destinations: ["Middle East", "Africa", "Southeast Asia", "Europe"],
    color: "from-emerald-600 to-teal-700",
    bgLight: "bg-emerald-50 border-emerald-100",
    tagColor: "bg-emerald-100 text-emerald-700",
    checkColor: "text-emerald-600",
  },
  {
    icon: Layers,
    title: "Industrial & Engineering Goods",
    tagline: "Precision manufacturing, global delivery",
    description:
      "From heavy machinery parts to precision-engineered components, we manage the complex documentation, packing, and shipping requirements for industrial export cargo.",
    items: [
      "Steel & Iron Products",
      "Machinery & Equipment",
      "Auto Components",
      "Castings & Forgings",
      "Pipes & Fittings",
      "Fabricated Metal Structures",
    ],
    destinations: ["USA", "Germany", "UAE", "Australia"],
    color: "from-slate-700 to-slate-900",
    bgLight: "bg-slate-50 border-slate-100",
    tagColor: "bg-slate-100 text-slate-700",
    checkColor: "text-slate-600",
  },
  {
    icon: Flame,
    title: "Petroleum & Energy Products",
    tagline: "Compliant, safe, and efficient energy exports",
    description:
      "We coordinate the export of petroleum derivatives and energy-related commodities under strict HAZMAT and international maritime safety protocols, ensuring safe and timely delivery.",
    items: [
      "Petroleum Coke (Petcoke)",
      "Bitumen & Asphalt",
      "Lubricants & Greases",
      "Fuel Additives",
      "Industrial Solvents",
      "Chemical Intermediates",
    ],
    destinations: ["Bangladesh", "Sri Lanka", "East Africa", "SE Asia"],
    color: "from-orange-600 to-red-700",
    bgLight: "bg-orange-50 border-orange-100",
    tagColor: "bg-orange-100 text-orange-700",
    checkColor: "text-orange-600",
  },
  {
    icon: FlaskConical,
    title: "Chemicals & Pharmaceuticals",
    tagline: "Regulated exports, handled with precision",
    description:
      "Our compliance experts manage the intricate export procedures for chemical and pharmaceutical goods, including hazardous material declarations, MSDS compliance, and regulatory filings.",
    items: [
      "Specialty Chemicals",
      "Dyestuffs & Pigments",
      "Agrochemicals & Pesticides",
      "Pharmaceutical Formulations",
      "Bulk Drug Substances",
      "Polymer Granules",
    ],
    destinations: ["Europe", "North America", "Latin America", "ASEAN"],
    color: "from-violet-600 to-purple-800",
    bgLight: "bg-violet-50 border-violet-100",
    tagColor: "bg-violet-100 text-violet-700",
    checkColor: "text-violet-600",
  },
  {
    icon: Gem,
    title: "Minerals & Mining Products",
    tagline: "Raw earth resources, carefully exported",
    description:
      "We facilitate the export of mineral ores, processed stone, and mining derivatives with expertise in bulk cargo handling, port coordination, and origin certification.",
    items: [
      "Iron Ore & Concentrates",
      "Granite & Marble Blocks",
      "Silica Sand & Quartz",
      "Bauxite & Aluminium Ore",
      "Coal & Coke",
      "Processed Stone Products",
    ],
    destinations: ["China", "Japan", "South Korea", "Gulf Countries"],
    color: "from-amber-600 to-yellow-700",
    bgLight: "bg-amber-50 border-amber-100",
    tagColor: "bg-amber-100 text-amber-700",
    checkColor: "text-amber-600",
  },
  {
    icon: Shirt,
    title: "Textiles & Garments",
    tagline: "Indian craftsmanship, worldwide markets",
    description:
      "From ready-made garments to raw fabric bales, we manage the full export lifecycle including quality checks, packing standards, buyer documentation, and last-mile port services.",
    items: [
      "Ready-Made Garments (RMG)",
      "Cotton Yarn & Fabric",
      "Home Furnishings & Textiles",
      "Technical Textiles",
      "Handloom & Handicraft Products",
      "Synthetic & Blended Fabrics",
    ],
    destinations: ["EU", "USA", "UK", "Japan", "Australia"],
    color: "from-pink-600 to-rose-700",
    bgLight: "bg-pink-50 border-pink-100",
    tagColor: "bg-pink-100 text-pink-700",
    checkColor: "text-pink-600",
  },
];

const STATS = [
  { label: "Product Categories", value: "6+" },
  { label: "Export Destinations", value: "40+" },
  { label: "Commodities Handled", value: "120+" },
  { label: "Shipments Per Year", value: "500+" },
];

const CAPABILITIES = [
  {
    icon: Package,
    title: "FCL & LCL Shipments",
    body: "We handle both Full Container Load and Less than Container Load exports with precision packing and stowage plans.",
  },
  {
    icon: Anchor,
    title: "Breakbulk & ODC",
    body: "Oversized and out-of-gauge cargo is our speciality — we plan, survey, and execute complex heavy-lift export moves.",
  },
  {
    icon: Globe,
    title: "Multi-Modal Routing",
    body: "Sea, air, and inland transport combined for optimal transit times and cost-efficiency across all product types.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance & Documentation",
    body: "From phytosanitary certificates to HAZMAT declarations — our team ensures every shipment is fully compliant.",
  },
];

export default function ProductsPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-40 pb-24 section-padding hero-gradient relative overflow-hidden text-center"
        aria-label="Products hero"
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
              <Package className="w-4 h-4" />
              Export Commodities
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Products We Export
            </h1>
            <p className="text-white/80 text-xl font-medium">
              A diverse portfolio of export commodities — handled with precision,
              compliance, and care across every global trade lane.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats bar */}
      <section
        className="bg-white border-b border-brand-border"
        aria-label="Product statistics"
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

      {/* Product Categories */}
      <section
        className="section-padding bg-brand-bg"
        aria-label="Product categories"
      >
        <div className="container-site">
          <AnimatedSection direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">
                Export Product Categories
              </h2>
              <p className="text-brand-text-secondary text-lg">
                We manage logistics for a broad spectrum of export commodities
                across six major categories — each with specialist handling and
                documentation expertise.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-8">
            {PRODUCT_CATEGORIES.map(
              (
                {
                  icon: Icon,
                  title,
                  tagline,
                  description,
                  items,
                  destinations,
                  color,
                  bgLight,
                  tagColor,
                  checkColor,
                },
                i
              ) => (
                <AnimatedSection key={title} delay={0.08} direction="up">
                  <div
                    className={`bg-white rounded-3xl border overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 ${bgLight}`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3">
                      {/* Left gradient panel */}
                      <div
                        className={`bg-gradient-to-br ${color} p-10 flex flex-col justify-between min-h-[220px]`}
                      >
                        <div className="w-14 h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center mb-6">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
                            {tagline}
                          </p>
                          <h3 className="text-2xl font-extrabold text-white leading-tight">
                            {title}
                          </h3>
                        </div>
                      </div>

                      {/* Middle: description + destinations */}
                      <div className="p-8 flex flex-col justify-between border-r border-brand-border">
                        <div>
                          <p className="text-brand-text-secondary leading-relaxed text-sm mb-6">
                            {description}
                          </p>
                          <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-brand-text-secondary mb-2">
                              Key Destinations
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {destinations.map((d) => (
                                <span
                                  key={d}
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${tagColor}`}
                                >
                                  {d}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: items list */}
                      <div className="p-8">
                        <p className="text-xs font-bold uppercase tracking-widest text-brand-text-secondary mb-4">
                          Commodities Handled
                        </p>
                        <ul className="space-y-2.5">
                          {items.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2.5 text-sm text-brand-text-secondary"
                            >
                              <CheckCircle2
                                className={`w-4 h-4 shrink-0 ${checkColor}`}
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            )}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section
        className="section-padding bg-white"
        aria-label="Shipping capabilities"
      >
        <div className="container-site">
          <AnimatedSection direction="up">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-primary mb-4">
                How We Ship It
              </h2>
              <p className="text-brand-text-secondary text-lg">
                Whatever the commodity, we have the infrastructure, expertise,
                and partnerships to get it to its destination safely and on
                time.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {CAPABILITIES.map(({ icon: Icon, title, body }, i) => (
              <AnimatedSection key={title} delay={i * 0.1} direction="up">
                <div className="bg-brand-bg rounded-2xl border border-brand-border p-8 h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm mb-5">
                    <Icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <h3 className="text-base font-extrabold text-brand-primary mb-2">
                    {title}
                  </h3>
                  <p className="text-brand-text-secondary text-sm leading-relaxed">
                    {body}
                  </p>
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
              Have a Product to Export?
            </h2>
            <p className="text-brand-highlight text-lg mb-10 font-medium">
              Tell us what you need to ship and where. Our team will design a
              compliant, cost-effective logistics solution tailored to your
              product.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-primary font-bold hover:bg-brand-bg transition-all shadow-xl hover:-translate-y-1"
            >
              Request a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
