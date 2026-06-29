import type { Metadata } from 'next';
import AnimatedSection from '@/components/site/AnimatedSection';
import ContactForm from '@/components/site/ContactForm';
import { MapPin, Phone, Mail } from 'lucide-react';
import { getGlobalContent } from '@/lib/actions/content.actions';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Seridian Crest LLP for freight forwarding quotes and logistics enquiries.',
};

export default async function ContactPage() {
  const content = await getGlobalContent();

  const CONTACT_INFO = [
    { icon: MapPin, label: 'Head Office', value: content.address },
    { icon: Phone, label: 'Phone', value: content.phone, href: `tel:${content.phone.replace(/[^0-9+]/g, '')}` },
    { icon: Mail, label: 'Email', value: content.email, href: `mailto:${content.email}` },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-40 pb-24 section-padding hero-gradient relative overflow-hidden text-center" aria-label="Contact hero">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container-site relative z-10 max-w-3xl mx-auto">
          <AnimatedSection direction="up">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              Contact Us
            </h1>
            <p className="text-white/80 text-xl font-medium">
              Our maritime experts are ready to assist with your global logistics needs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Form + Info */}
      <section className="section-padding bg-brand-bg" aria-label="Contact form">
        <div className="container-site max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Info */}
            <AnimatedSection direction="up" delay={0.1}>
              <div className="space-y-10">
                <div>
                  <h2 className="text-3xl font-extrabold text-brand-primary mb-4">Get In Touch</h2>
                  <p className="text-brand-text-secondary text-lg">
                    Whether you have a specific shipment in mind or are exploring logistics options, our team is here to help.
                  </p>
                </div>

                <div className="space-y-8">
                  {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                    <div key={label} className="flex gap-6 items-start">
                      <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-sm border border-brand-border">
                        <Icon className="w-6 h-6 text-brand-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-brand-accent uppercase tracking-wider mb-1">{label}</p>
                        {href ? (
                          <a href={href} className="text-brand-text-primary text-lg font-medium hover:text-brand-primary transition-colors">{value}</a>
                        ) : (
                          <p className="text-brand-text-primary text-lg font-medium">{value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtle map / location visual */}
                <div className="rounded-3xl overflow-hidden border border-brand-border h-64 bg-brand-alt-bg flex items-center justify-center relative">
                   <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#1E5F8A 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                   <div className="relative z-10 text-center bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/50 shadow-sm">
                      <MapPin className="w-8 h-8 text-brand-primary mx-auto mb-2" />
                      <p className="font-bold text-brand-primary">Mumbai, India</p>
                   </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Form */}
            <AnimatedSection direction="up">
              <div className="bg-white rounded-3xl border border-brand-border p-8 md:p-10 shadow-xl shadow-brand-primary/5">
                <h2 className="text-2xl font-extrabold text-brand-primary mb-8">Send an Enquiry</h2>
                <ContactForm />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
