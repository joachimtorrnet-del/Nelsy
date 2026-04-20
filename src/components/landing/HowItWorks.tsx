import { motion } from 'framer-motion';
import { Sparkles, Share2, Calendar, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Sparkles,
    number: '01',
    title: 'Créez votre studio en 5 min',
    description: 'Configurez vos services, vos disponibilités et votre mini-site personnalisé. Pas besoin de compétences techniques.',
    color: 'from-purple-400 to-purple-600',
    bgLight: 'bg-purple-50',
  },
  {
    icon: Share2,
    number: '02',
    title: 'Partagez votre lien dans votre bio',
    description: 'Un seul lien nelsy.app/votre-nom dans votre bio Instagram. Vos followers deviennent des clientes.',
    color: 'from-pink-400 to-rose-500',
    bgLight: 'bg-pink-50',
  },
  {
    icon: Calendar,
    number: '03',
    title: 'Vos clientes réservent en 3 clics',
    description: 'Choix du service, sélection du créneau, paiement de l\'acompte. Confirmation instantanée par email.',
    color: 'from-emerald-400 to-teal-500',
    bgLight: 'bg-emerald-50',
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-black text-espresso mb-4">
            Opérationnel en 5 minutes
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            Vraiment. Pas 5 heures, pas 5 jours. 5 minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector lines (desktop) */}
          <div className="hidden md:block absolute top-16 left-[calc(33%-20px)] right-[calc(33%-20px)] h-0.5 bg-gradient-to-r from-purple-200 via-pink-200 to-emerald-200" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              {/* Icon circle */}
              <div className="relative mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg relative z-10`}
                >
                  <step.icon className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-espresso rounded-full flex items-center justify-center z-20">
                  <span className="text-white text-xs font-black">{step.number}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-espresso mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>

              {index < steps.length - 1 && (
                <div className="md:hidden mt-6 text-gray-300">
                  <ArrowRight className="w-6 h-6 mx-auto rotate-90" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
