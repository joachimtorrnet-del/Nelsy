import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const starterFeatures = [
  '3 services maximum',
  '10 réservations/mois',
  'Vitrine personnalisable',
  'Acomptes sécurisés',
  'Branding "Powered by Nelsy"',
];

const proFeatures = [
  'Services illimités',
  'Réservations illimitées',
  'Dashboard Analytics complet',
  'Branding personnalisé (aucune mention Nelsy)',
  'Support prioritaire 7j/7',
  'Statistiques avancées + exports',
];

const faqs = [
  {
    q: 'Combien je garde vraiment sur une réservation ?',
    a: 'Tout. Nelsy ne prend aucune commission sur vos prestations. Votre cliente paie exactement le prix de votre service. Vous recevez 100% (moins les frais Stripe de ~2.9%) — zéro commission Nelsy.',
  },
  {
    q: 'Comment je reçois mon argent ?',
    a: 'Via Stripe Connect. Les acomptes atterrissent directement sur votre compte Stripe. Vous pouvez virer sur votre compte bancaire à tout moment, généralement en 2 jours ouvrés.',
  },
  {
    q: 'Puis-je annuler à tout moment ?',
    a: 'Oui, sans engagement et sans frais. Si vous annulez, votre studio reste actif jusqu\'à la fin de la période payée. Aucune surprise.',
  },
  {
    q: 'Comment mes clientes paient-elles ?',
    a: 'Carte bancaire via Stripe (Visa, Mastercard, American Express). Paiement 100% sécurisé. Vos clientes voient "Powered by Stripe" qui est reconnu comme gage de confiance.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        className="w-full flex items-center justify-between py-4 text-left focus:outline-none"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-semibold text-espresso pr-4">{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-gray-600 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Pricing() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white" id="tarifs">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-black text-espresso mb-4">
            Tarifs transparents
          </h2>
          <p className="text-lg text-gray-600">Aucune surprise. Aucune commission cachée.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {/* Starter */}
          <motion.div
            className="bg-white border-2 border-gray-200 rounded-3xl p-8 flex flex-col"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ borderColor: '#d8b4fe', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
          >
            <div className="mb-6">
              <h3 className="text-2xl font-black text-espresso mb-1">Starter</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-5xl font-black text-espresso">0€</span>
                <span className="text-gray-400">/mois</span>
              </div>
              <p className="text-gray-500 text-sm">Pour commencer et tester sans risque</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {starterFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-gray-500" />
                  </div>
                  <span className="text-gray-700 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/onboarding')}
              className="w-full py-3.5 rounded-2xl border-2 border-gray-200 font-bold text-espresso hover:border-purple-300 transition-colors min-h-[52px]"
            >
              Commencer gratuitement
            </motion.button>
          </motion.div>

          {/* Pro */}
          <motion.div
            className="bg-espresso rounded-3xl p-8 flex flex-col relative overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ boxShadow: '0 20px 50px rgba(45,36,36,0.3)' }}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500 rounded-full opacity-10 translate-x-1/2 -translate-y-1/2" />

            {/* Badge */}
            <div className="absolute top-6 right-6">
              <span className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-xs font-black px-3 py-1.5 rounded-full">
                POPULAIRE
              </span>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-black text-white mb-1">Pro</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-5xl font-black text-white">29,99€</span>
                <span className="text-gray-400">/mois</span>
              </div>
              <p className="text-gray-400 text-sm">Pour les nail techs qui veulent scaler</p>
            </div>

            <ul className="space-y-3 mb-8 flex-1">
              {proFeatures.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300 text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <motion.button
              whileHover={{ scale: 1.02, opacity: 0.95 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/dashboard')}
              className="w-full py-3.5 rounded-2xl font-bold text-espresso bg-white hover:bg-gray-100 transition-colors min-h-[52px]"
            >
              Essai gratuit 14 jours →
            </motion.button>

            <p className="text-center text-gray-500 text-xs mt-3">Sans CB • Annulation libre</p>
          </motion.div>
        </div>

        {/* FAQ */}
        <motion.div
          className="bg-gray-50 rounded-3xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-espresso mb-6">Questions fréquentes</h3>
          {faqs.map((faq) => (
            <FAQItem key={faq.q} {...faq} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
