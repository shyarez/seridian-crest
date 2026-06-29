import AnimatedSection from './AnimatedSection';

const STATS = [
  { value: '25+', label: 'Years of Excellence' },
  { value: '80+', label: 'Ports Covered' },
  { value: '5,000+', label: 'Shipments Handled' },
  { value: '98%', label: 'On-Time Delivery' },
];

export default function StatsBar() {
  return (
    <section className="bg-navy-900 border-y border-white/5 py-12" aria-label="Company statistics">
      <div className="container-site px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ value, label }, i) => (
            <AnimatedSection key={label} delay={i * 0.1} direction="up">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-gradient-gold mb-1">{value}</p>
                <p className="text-white/50 text-sm">{label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
