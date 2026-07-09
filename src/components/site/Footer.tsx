import Link from 'next/link';
import { Anchor, Mail, Phone, MapPin } from 'lucide-react';

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

const SERVICES = [
  'Liner Agency & Husbandry',
  'Freight Forwarding',
  'Project Cargo',
  'Customs Clearance',
];

interface FooterProps {
  phone: string;
  email: string;
  address: string;
}

export default function Footer({ phone, email, address }: FooterProps) {
  return (
    <footer className="bg-brand-primary text-white">
      <div className="container-site section-padding pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                <Anchor className="w-5 h-5 text-brand-primary" strokeWidth={2.5} />
              </div>
              <div className="leading-tight">
                <span className="block text-white font-bold text-xl tracking-tight">Seridian Crest</span>
                <span className="block text-brand-highlight text-[10px] uppercase tracking-[0.2em] font-bold">LLP</span>
              </div>
            </Link>
            <p className="text-brand-bg/70 text-sm leading-relaxed mb-6">
              Focused primarily on export services, connecting your cargo to ports worldwide with dependable freight forwarding and full customs compliance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Quick Links
            </h3>
            <ul className="space-y-4">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-brand-bg/70 text-sm hover:text-white font-medium transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Our Services
            </h3>
            <ul className="space-y-4">
              {SERVICES.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="text-brand-bg/70 text-sm hover:text-white font-medium transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-highlight shrink-0" />
                <span className="text-brand-bg/70 text-sm leading-relaxed">
                  {address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-highlight shrink-0" />
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-brand-bg/70 text-sm hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-highlight shrink-0" />
                <a href={`mailto:${email}`} className="text-brand-bg/70 text-sm hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-bg/50 text-sm">
            © {new Date().getFullYear()} Seridian Crest LLP. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-brand-bg/50 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-brand-bg/50 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
