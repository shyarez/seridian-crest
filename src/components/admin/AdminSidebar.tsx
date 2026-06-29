'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Anchor, LayoutDashboard, FileText, Layers, Inbox, LogOut, ChevronLeft,
} from 'lucide-react';

const NAV = [
  { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/admin/content', icon: FileText, label: 'Content' },
  { href: '/admin/services', icon: Layers, label: 'Services' },
  { href: '/admin/leads', icon: Inbox, label: 'Leads' },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch('/api/auth', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <aside
      className={cn(
        'relative flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300',
        collapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Logo */}
      <div className={cn('flex items-center gap-3 px-4 h-16 border-b border-sidebar-border shrink-0', collapsed && 'justify-center px-0')}>
        <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center shrink-0">
          <Anchor className="w-4 h-4 text-navy-950" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="leading-tight">
            <span className="block text-sidebar-foreground font-bold text-sm">Seridian Crest</span>
            <span className="block text-gold-400 text-[9px] uppercase tracking-widest">Admin</span>
          </div>
        )}
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[4.5rem] w-6 h-6 rounded-full bg-sidebar border border-sidebar-border flex items-center justify-center text-sidebar-foreground/40 hover:text-sidebar-foreground transition-colors z-10"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <ChevronLeft className={cn('w-3 h-3 transition-transform', collapsed && 'rotate-180')} />
      </button>

      {/* Nav */}
      <nav className="flex-1 px-2 py-4 space-y-1" aria-label="Admin navigation">
        {NAV.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                active
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent',
                collapsed && 'justify-center px-0'
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-2 pb-4 border-t border-sidebar-border pt-4">
        {!collapsed && (
          <p className="text-sidebar-foreground/30 text-xs px-3 mb-3 truncate" title={email}>{email}</p>
        )}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          title={collapsed ? 'Log out' : undefined}
          className={cn(
            'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/60 hover:text-red-400 hover:bg-red-500/10 transition-all',
            collapsed && 'justify-center px-0'
          )}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!collapsed && <span>{loggingOut ? 'Logging out…' : 'Log Out'}</span>}
        </button>
      </div>
    </aside>
  );
}
