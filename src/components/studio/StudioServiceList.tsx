import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Clock } from 'lucide-react';
import type { Service } from '@/types';
import { formatCurrency } from '@/lib/utils';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

function ServiceCard({
  service,
  accentColor,
  onBook,
}: {
  service: Service;
  accentColor: string;
  onBook: () => void;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm"
    >
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-snug">{service.name}</h3>
          <span className="text-xl font-extrabold text-gray-900 flex-shrink-0">{service.price}€</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 mb-3">
          {service.category && (
            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
              {service.category}
            </span>
          )}
          {service.category && <span className="text-gray-200">·</span>}
          <span className="flex items-center gap-1 text-[11px] text-gray-400">
            <Clock className="w-3 h-3" />
            {service.duration} min
          </span>
          {service.deposit > 0 && (
            <>
              <span className="text-gray-200">·</span>
              <span className="text-[11px] text-gray-400">
                Acompte {formatCurrency(service.deposit)}
              </span>
            </>
          )}
        </div>

        {service.description && (
          <p className="text-sm text-gray-500 leading-relaxed mb-3">{service.description}</p>
        )}
      </div>

      {/* CTA */}
      <button
        onClick={onBook}
        className="w-full py-3.5 font-bold text-sm text-white transition-opacity hover:opacity-90 active:scale-[0.99]"
        style={{ background: accentColor }}
      >
        Réserver
      </button>
    </motion.div>
  );
}

interface Props {
  services: Service[];
  accentColor?: string;
  onBook: (service: Service) => void;
}

export function StudioServiceList({ services, accentColor = '#F52B8C', onBook }: Props) {
  if (services.length === 0) return null;

  return (
    <section id="services" className="px-4 mb-5">
      <motion.div
        className="flex flex-col gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            accentColor={accentColor}
            onBook={() => onBook(service)}
          />
        ))}
      </motion.div>
    </section>
  );
}
