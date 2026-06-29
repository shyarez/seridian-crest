import { IService } from '@/types';
import { CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
  service: IService;
  index: number;
}

function DynamicIcon({ name }: { name: string }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[name] as React.ComponentType<{ className?: string }>;
  return Icon ? <Icon className="w-6 h-6" /> : <LucideIcons.Anchor className="w-6 h-6" />;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group relative bg-white rounded-2xl border border-navy-100 p-8 hover:shadow-2xl hover:shadow-navy-900/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Hover accent */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-400 to-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />

      {/* Icon */}
      <div className="w-14 h-14 rounded-xl bg-navy-950 text-gold-400 flex items-center justify-center mb-6 shadow-lg shadow-navy-950/20 group-hover:bg-gold-500 group-hover:text-navy-950 transition-all duration-300">
        <DynamicIcon name={service.icon} />
      </div>

      {/* Title & Description */}
      <h3 className="text-xl font-bold text-navy-950 mb-3 group-hover:text-navy-800 transition-colors">
        {service.title}
      </h3>
      <p className="text-navy-600/70 text-sm leading-relaxed mb-6">
        {service.description}
      </p>

      {/* Features */}
      {service.features?.length > 0 && (
        <ul className="space-y-2 mb-6">
          {service.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-navy-700">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/contact"
        className="inline-flex items-center gap-1 text-sm font-medium text-navy-800 hover:text-gold-600 transition-colors group/link"
      >
        Enquire now
        <span className="inline-block translate-x-0 group-hover/link:translate-x-1 transition-transform">→</span>
      </Link>
    </article>
  );
}
