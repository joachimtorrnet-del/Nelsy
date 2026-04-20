import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { TrendingUp, Shield, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: 'Zéro commission sur vos prestations',
    description:
      'Gardez 100% de vos revenus. Seul 1€ de frais tech par réservation payé par la cliente.',
    badge: 'vs 30% sur Treatwell',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    gradient: 'from-emerald-400 to-teal-500',
    bg: 'bg-emerald-50',
    stat: '100%',
    statLabel: 'de vos revenus gardés',
  },
  {
    icon: Shield,
    title: 'Protection Anti No-Show',
    description:
      'Acomptes sécurisés via Stripe. Vos clientes s\'engagent vraiment et vous protégez votre planning.',
    badge: '98% de présence',
    badgeColor: 'bg-blue-100 text-blue-700',
    gradient: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50',
    stat: '-78%',
    statLabel: 'de no-shows',
  },
  {
    icon: BarChart3,
    title: 'Dashboard CEO',
    description:
      'Pilotez votre rentabilité en temps réel. CA net, occupation, solde disponible, tout sous la main.',
    badge: 'Insights en temps réel',
    badgeColor: 'bg-purple-100 text-purple-700',
    gradient: 'from-purple-400 to-pink-500',
    bg: 'bg-purple-50',
    stat: '3×',
    statLabel: 'plus de temps économisé',
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function BentoFeatures() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-black text-espresso mb-4">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conçu spécifiquement pour les nail techs. Pas une solution générique.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              className={`${feature.bg} rounded-3xl p-8 border border-white relative overflow-hidden cursor-default`}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>

              {/* Badge */}
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${feature.badgeColor} mb-4`}>
                {feature.badge}
              </span>

              <h3 className="text-xl font-bold text-espresso mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{feature.description}</p>

              {/* Stat */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-espresso">{feature.stat}</span>
                <span className="text-sm text-gray-500 font-medium">{feature.statLabel}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
