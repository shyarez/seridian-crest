'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 inset-x-0 z-50 transition-all duration-300 bg-white shadow-sm border-b border-brand-border',
        scrolled ? 'py-2' : 'py-3 md:py-4'
      )}
    >
      <nav className="container-site flex items-center justify-between px-6 md:px-10 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 group">
  {/* Seal / Logo */}
  <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
    <Image
      src="/logo.png"
      alt="Seridian Crest LLP"
      fill
      className="object-contain"
      priority
    />
  </div>

  {/* Company Name */}
  <div className="flex flex-col">
    <span className="text-2xl md:text-4xl font-bold text-brand-primary leading-tight">
      Seridian Crest LLP
    </span>

    <span className="text-sm md:text-base text-brand-text-secondary mt-1">
      Global Export Services
    </span>
  </div>
</Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'text-sm font-bold uppercase tracking-wider transition-colors hover:text-brand-accent',
                pathname === link.href ? 'text-brand-primary' : 'text-brand-text-secondary'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-primary text-white font-bold text-sm hover:bg-brand-secondary transition-colors shadow-md hover:-translate-y-0.5"
          >
            <Phone className="w-4 h-4" /> Get Quote
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className={cn('md:hidden p-2 rounded-lg transition-colors text-brand-primary hover:bg-brand-bg')}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-brand-border"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'px-4 py-3 rounded-xl text-sm font-semibold transition-colors',
                    pathname === href
                      ? 'text-brand-primary bg-brand-bg'
                      : 'text-brand-text-secondary hover:text-brand-primary hover:bg-brand-bg'
                  )}
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-4 px-4 py-3 rounded-xl bg-brand-primary text-white text-sm font-bold text-center"
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
