import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = slug.trim().toLowerCase().replace(/\s+/g, '-');
    if (!cleaned) {
      setError('Entrez votre nom ou celui de votre salon');
      return;
    }
    if (cleaned.length < 3) {
      setError('Minimum 3 caractères');
      return;
    }
    navigate(`/onboarding?slug=${cleaned}`);
  };

  const handleSlugChange = (val: string) => {
    setSlug(val);
    setError('');
  };

  return (
    <section className="relative bg-cream overflow-hidden pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-100 rounded-full opacity-40 blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Sparkles className="w-4 h-4" />
              Rejoins 500+ prothésistes
            </motion.div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-espresso tracking-tight leading-[1.1] mb-6">
              Votre salon d'ongles
              <br />
              <span className="text-gradient">mérite mieux</span>
              <br />
              qu'un lien Instagram
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Créez votre mini-site de réservation en 5 minutes. Acomptes automatiques,
              zéro commission, dashboard pro.
            </p>

            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm pointer-events-none">
                    nelsy.app/
                  </span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => handleSlugChange(e.target.value)}
                    placeholder="votre-nom"
                    className="w-full pl-[90px] pr-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 focus:outline-none text-espresso text-base transition-all min-h-[52px]"
                    aria-label="Votre nom de studio"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-bold text-base bg-gradient-to-r from-[#667eea] to-[#764ba2] shadow-lg hover:shadow-xl transition-shadow whitespace-nowrap min-h-[52px]"
                >
                  Créer mon studio
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-sm text-red-500 text-left"
                >
                  {error}
                </motion.p>
              )}
            </form>

            {/* Social proof */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <div className="flex -space-x-2">
                {['M', 'S', 'A', 'J', 'L'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full ring-2 ring-white flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      background: [
                        'linear-gradient(135deg,#667eea,#764ba2)',
                        'linear-gradient(135deg,#f093fb,#f5576c)',
                        'linear-gradient(135deg,#10b981,#059669)',
                        'linear-gradient(135deg,#f6d365,#fda085)',
                        'linear-gradient(135deg,#a18cd1,#fbc2eb)',
                      ][i],
                    }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600 text-center lg:text-left">
                <span className="font-semibold text-espresso">500+ prothésistes</span> nous font confiance
                <br />
                <span className="text-emerald-600 font-medium">45 000€ traités ce mois</span>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-3 justify-center lg:justify-start">
              {['Sans carte bancaire', 'Annulation libre', 'Support 7j/7'].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 text-sm text-gray-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Phone mockup */}
          <motion.div
            className="flex-1 w-full max-w-xs mx-auto lg:max-w-sm"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <PhoneMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative mx-auto" style={{ width: '280px' }}>
      {/* Phone shell */}
      <div className="relative bg-espresso rounded-[3rem] p-3 shadow-2xl">
        {/* Notch */}
        <div className="absolute top-7 left-1/2 -translate-x-1/2 w-24 h-5 bg-espresso rounded-full z-10" />
        {/* Screen */}
        <div className="bg-gray-50 rounded-[2.5rem] overflow-hidden" style={{ minHeight: '540px' }}>
          {/* Status bar */}
          <div className="bg-gray-50 pt-8 pb-2 px-6 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-800">9:41</span>
            <div className="flex gap-1 items-center">
              <div className="w-4 h-2 bg-gray-800 rounded-sm" />
            </div>
          </div>

          {/* Studio header */}
          <div className="px-4 pb-4 bg-gray-50">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div>
                <div className="font-bold text-sm text-gray-900">Studio Maya ✨</div>
                <div className="text-xs text-gray-500">⭐ 4.9 · 127 avis</div>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Nail artist passionnée · Paris 11e
            </p>
          </div>

          {/* Services */}
          <div className="px-4 space-y-3 pb-4">
            {[
              { name: 'Pose Gel Complète', price: 75, time: 90, deposit: 25 },
              { name: 'Nail Art Prestige', price: 120, time: 150, deposit: 40 },
            ].map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm"
              >
                <div className="flex justify-between items-start mb-1.5">
                  <span className="font-bold text-xs text-gray-900">{s.name}</span>
                  <span className="font-black text-base text-gray-900">{s.price}€</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                  <span>⏱ {s.time}min</span>
                  <span>·</span>
                  <span className="text-purple-600 font-medium">Acompte {s.deposit}€</span>
                </div>
                <div className="w-full py-1.5 rounded-lg bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white text-xs font-bold text-center">
                  Réserver →
                </div>
              </motion.div>
            ))}
          </div>

          {/* Powered by */}
          <div className="text-center py-3">
            <span className="text-xs text-gray-300">Propulsé par Nelsy</span>
          </div>
        </div>
      </div>

      {/* Floating booking badge */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="absolute -right-6 top-24 bg-white rounded-2xl px-3 py-2 shadow-xl border border-gray-100"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
            <span className="text-xs">✓</span>
          </div>
          <div>
            <div className="text-xs font-bold text-gray-900">Réservation reçue</div>
            <div className="text-xs text-gray-400">Amélie · 75€</div>
          </div>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1.5 }}
        className="absolute -left-8 bottom-32 bg-white rounded-2xl px-3 py-2 shadow-xl border border-gray-100"
      >
        <div className="text-xs font-bold text-emerald-600">+75€ reçus 🎉</div>
        <div className="text-xs text-gray-400">Acompte sécurisé</div>
      </motion.div>
    </div>
  );
}
