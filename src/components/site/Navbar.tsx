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
  { href: '/products', label: 'Products' },
  { href: '/affiliations', label: 'Affiliations' },
  { href: '/gallery', label: 'Gallery' },
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'sticky top-0 inset-x-0 z-50 bg-white border-b border-brand-border shadow-sm transition-all duration-300',
        scrolled ? 'py-2' : 'py-2 sm:py-3'
      )}
    >
      <nav className="container-site flex items-center justify-between min-h-[72px] px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Seridian Crest LLP"
              fill
              priority
              className="object-contain"
            />
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight text-brand-primary">
              Seridian Crest
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                'text-sm font-bold uppercase tracking-wide transition-colors duration-200 hover:text-brand-primary',
                pathname === link.href
                  ? 'text-brand-primary'
                  : 'text-brand-text-secondary'
              )}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-brand-secondary"
          >
            <Phone className="h-4 w-4" />
            Get Quote
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          className="lg:hidden flex-shrink-0 rounded-lg p-2 text-brand-primary transition-colors hover:bg-brand-bg"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-brand-border bg-white"
          >
            <div className="px-4 py-4">
              <div className="flex flex-col gap-1">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'rounded-xl px-4 py-3 text-sm font-semibold transition-all',
                      pathname === href
                        ? 'bg-brand-bg text-brand-primary'
                        : 'text-brand-text-secondary hover:bg-brand-bg hover:text-brand-primary'
                    )}
                  >
                    {label}
                  </Link>
                ))}

                <Link
                  href="/contact"
                  className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-secondary"
                >
                  <Phone className="h-4 w-4" />
                  Request a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}