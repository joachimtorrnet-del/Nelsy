import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Language = 'fr' | 'en';

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fr: {
    // ── Navigation ──────────────────────────────────────────────
    'nav.features': 'Fonctionnalités',
    'nav.pricing': 'Tarifs',
    'nav.faq': 'FAQ',
    'nav.login': 'Connexion',
    'nav.signup': 'Essai gratuit',

    // ── Hero ────────────────────────────────────────────────────
    'hero.badge': 'La plateforme #1 pour les nail artists',
    'hero.title': 'Arrêtez de perdre des clientes à cause des DMs',
    'hero.subtitle': 'Nelsy transforme votre Instagram en un système de réservation professionnel avec paiements en ligne. En 10 minutes.',
    'hero.benefit1': 'Configuration en 10 minutes',
    'hero.benefit2': 'Paiements automatiques 24/7',
    'hero.benefit3': '3h économisées par semaine',
    'hero.cta': 'Commencer gratuitement',
    'hero.cta.secondary': 'Voir la démo',
    'hero.social': 'Déjà +500 nail artists',
    'hero.trusted': 'Utilisé par 500+ nail artists',
    'hero.secure': 'Paiements sécurisés',

    // ── Stats ───────────────────────────────────────────────────
    'stats.artists': 'Nail artists',
    'stats.bookings': 'Réservations',
    'stats.revenue': 'CA généré',
    'stats.satisfaction': 'Satisfaction',

    // ── Trust Bar ───────────────────────────────────────────────
    'trust.title': 'Elles nous font confiance',

    // ── Before/After ────────────────────────────────────────────
    'comparison.title': 'Avant vs Après Nelsy',
    'comparison.subtitle': 'La différence qui change tout',
    'comparison.before.label': '❌ Avant Nelsy',
    'comparison.after.label': '✨ Avec Nelsy',
    'comparison.before.1': '50+ DMs par jour à gérer',
    'comparison.before.2': '3h perdues en messages',
    'comparison.before.3': '30% de no-shows',
    'comparison.before.4': 'Instagram seule vitrine',
    'comparison.before.5': 'Stress constant',
    'comparison.after.1': 'Réservations automatiques 24/7',
    'comparison.after.2': '3h économisées par semaine',
    'comparison.after.3': 'Acomptes payés d\'avance',
    'comparison.after.4': 'Dashboard pro complet',
    'comparison.after.5': 'Sérénité totale',
    'comparison.cta': 'Passer à Nelsy maintenant →',

    // ── Features ────────────────────────────────────────────────
    'features.title': 'Tout ce dont vous avez besoin',
    'features.subtitle': 'Un outil complet pour professionnaliser votre activité',

    'features.booking.badge': 'Réservations',
    'features.booking.title': 'Vos clientes réservent seules, 24h/24',
    'features.booking.desc': 'Fini les allers-retours en DM. Vos clientes choisissent leur créneau, paient l\'acompte, et c\'est réglé.',
    'features.booking.benefit1': 'Calendrier synchronisé en temps réel',
    'features.booking.benefit2': 'Rappels automatiques par email',
    'features.booking.benefit3': 'Zéro risque de double booking',
    'features.booking.cta': 'Voir comment ça marche →',

    'features.payment.badge': 'Paiements',
    'features.payment.title': 'Encaissez les acomptes automatiquement',
    'features.payment.desc': 'Les acomptes sont prélevés à la réservation via Stripe. Fini les no-shows. Votre CA est sécurisé.',
    'features.payment.benefit1': 'Paiements sécurisés par Stripe',
    'features.payment.benefit2': 'Virement sous 2 jours ouvrés',
    'features.payment.benefit3': 'Commission fixe 1€ par réservation',
    'features.payment.cta': 'Configurer les paiements →',

    'features.calendar.title': 'Calendrier intelligent',
    'features.calendar.desc': 'Gérez vos disponibilités en temps réel. Double-booking impossible.',

    'features.analytics.title': 'Statistiques détaillées',
    'features.analytics.desc': 'Suivez votre CA, vos clientes fidèles et optimisez votre activité.',

    // ── Testimonials ────────────────────────────────────────────
    'testimonials.title': 'Elles ont transformé leur activité',
    'testimonials.subtitle': 'Découvrez leurs résultats concrets',
    'testimonials.1.quote': 'Avec Nelsy, je ne perds plus de clientes à cause des DMs. Tout est automatisé, mes réservations ont augmenté de 40%.',
    'testimonials.1.metric.label': 'CA augmenté',
    'testimonials.1.metric.value': '+40%',
    'testimonials.2.quote': 'Les acomptes automatiques ont éliminé les no-shows. J\'ai récupéré 3h par semaine que je consacre enfin à ma famille.',
    'testimonials.2.metric.label': 'No-shows évités',
    'testimonials.2.metric.value': '-85%',
    'testimonials.3.quote': 'Setup en 10 minutes, mes clientes adorent l\'interface. C\'est le meilleur investissement que j\'ai fait pour mon activité.',
    'testimonials.3.metric.label': 'Temps économisé',
    'testimonials.3.metric.value': '3h/sem',
    'testimonials.video_coming': 'Vidéos témoignages bientôt disponibles',

    // ── ROI Calculator ──────────────────────────────────────────
    'calculator.title': 'Combien allez-vous économiser ?',
    'calculator.subtitle': 'Calculez votre ROI en 30 secondes',
    'calculator.bookings_per_week': 'Combien de rendez-vous par semaine ?',
    'calculator.avg_price': 'Prix moyen de vos prestations',
    'calculator.time_saved': 'Économisées par semaine',
    'calculator.extra_revenue': 'CA supplémentaire / mois',
    'calculator.no_shows_saved': 'Pertes no-shows évitées',
    'calculator.total_gain': 'Gain total mensuel estimé',
    'calculator.cta': 'Commencer à économiser maintenant →',

    // ── Pricing ─────────────────────────────────────────────────
    'pricing.title': 'Un tarif simple et transparent',
    'pricing.subtitle': 'Commencez gratuitement, passez au Pro quand vous êtes prête',
    'pricing.monthly': 'Mensuel',
    'pricing.annual': 'Annuel',

    'pricing.free': 'Gratuit',
    'pricing.free.badge': 'DÉCOUVERTE',
    'pricing.free.desc': 'Pour découvrir Nelsy',
    'pricing.free.cta': 'Commencer gratuitement',
    'pricing.free.period': 'Pour toujours',
    'pricing.free.feature1': '10 réservations / mois',
    'pricing.free.feature2': 'Page personnalisée',
    'pricing.free.feature3': 'Calendrier basique',
    'pricing.free.feature4': 'Support email',

    'pricing.pro': 'Pro',
    'pricing.pro.badge': 'PLUS POPULAIRE',
    'pricing.pro.label': 'PROFESSIONNEL',
    'pricing.pro.price': '29€',
    'pricing.pro.price.annual': '23€',
    'pricing.pro.period': '/mois',
    'pricing.pro.desc': 'Pour les professionnelles',
    'pricing.pro.cta': 'Essayer 14 jours gratuits →',
    'pricing.pro.trial_note': 'Sans carte bancaire requise',
    'pricing.pro.annual_note': 'Soit 276€/an au lieu de 348€',
    'pricing.pro.feature1': 'Réservations illimitées',
    'pricing.pro.feature2': 'Paiements en ligne',
    'pricing.pro.feature3': 'Calendrier complet',
    'pricing.pro.feature4': 'Rappels automatiques',
    'pricing.pro.feature5': 'Dashboard analytics',
    'pricing.pro.feature6': 'Support prioritaire',

    'pricing.enterprise.badge': 'SALONS & RÉSEAUX',
    'pricing.enterprise.title': 'Enterprise',
    'pricing.enterprise.price': 'Sur devis',
    'pricing.enterprise.period': 'Tarification sur mesure',
    'pricing.enterprise.cta': 'Nous contacter',
    'pricing.enterprise.feature1': 'Multi-salons',
    'pricing.enterprise.feature2': 'Gestion d\'équipe',
    'pricing.enterprise.feature3': 'API dédiée',
    'pricing.enterprise.feature4': 'Account manager',
    'pricing.enterprise.feature5': 'Formation sur mesure',

    'pricing.popular': 'Populaire',
    'pricing.feature.bookings': 'Réservations illimitées',
    'pricing.feature.payments': 'Paiements en ligne',
    'pricing.feature.calendar': 'Calendrier complet',
    'pricing.feature.analytics': 'Statistiques avancées',
    'pricing.feature.support': 'Support prioritaire',
    'pricing.feature.custom': 'Page personnalisée',

    'pricing.trust.secure': 'Paiements sécurisés SSL',
    'pricing.trust.payment': 'Powered by Stripe',
    'pricing.trust.cancel': 'Annulation à tout moment',

    // ── FAQ ─────────────────────────────────────────────────────
    'faq.title': 'Questions fréquentes',
    'faq.subtitle': 'Tout ce que vous devez savoir',
    'faq.search_placeholder': 'Rechercher une question...',
    'faq.still_questions': 'Vous avez encore des questions ?',
    'faq.contact_us': 'Notre équipe est là pour vous aider',
    'faq.cta': 'Contacter le support',
    'faq.q1': 'Comment fonctionne le paiement des acomptes ?',
    'faq.a1': 'Vos clientes paient l\'acompte directement via Stripe lors de la réservation. L\'argent est transféré sur votre compte bancaire sous 2 jours ouvrés.',
    'faq.q2': 'Combien prend Nelsy de commission ?',
    'faq.a2': 'Nelsy prend 1€ par réservation avec acompte. C\'est tout. Aucune commission sur vos tarifs.',
    'faq.q3': 'Puis-je personnaliser ma page ?',
    'faq.a3': 'Oui, vous pouvez personnaliser le nom, la description, les services, les prix et les photos de votre page.',
    'faq.q4': 'Mes données sont-elles sécurisées ?',
    'faq.a4': 'Toutes vos données sont hébergées en Europe et chiffrées. Les paiements sont gérés par Stripe, certifié PCI-DSS.',
    'faq.q5': 'Puis-je annuler à tout moment ?',
    'faq.a5': 'Oui, sans engagement ni frais d\'annulation. Vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord.',
    'faq.q6': 'Y a-t-il une application mobile ?',
    'faq.a6': 'Une application iOS et Android est en cours de développement. En attendant, la version web est entièrement responsive.',

    // ── Final CTA ───────────────────────────────────────────────
    'final_cta.title': 'Prête à transformer votre activité ?',
    'final_cta.subtitle': 'Rejoignez 500+ nail artists qui ont dit adieu aux DMs et bonjour à la sérénité.',
    'final_cta.primary': 'Commencer gratuitement →',
    'final_cta.secondary': 'Réserver une démo',
    'final_cta.guarantee1': 'Sans carte bancaire',
    'final_cta.guarantee2': 'Annulation à tout moment',
    'final_cta.guarantee3': 'Configuration en 10 min',
    'final_cta.urgency': 'Offre early bird : -20% sur le plan Pro',

    'cta.title': 'Prête à vous lancer ?',
    'cta.subtitle': 'Rejoignez +500 nail artists qui ont transformé leur activité avec Nelsy.',
    'cta.button': 'Créer mon salon gratuitement',
    'cta.note': 'Aucune carte bancaire requise · Annulation à tout moment',

    // ── Footer ──────────────────────────────────────────────────
    'footer.product': 'Produit',
    'footer.company': 'Entreprise',
    'footer.resources': 'Ressources',
    'footer.legal': 'Légal',
    'footer.about': 'À propos',
    'footer.blog': 'Blog',
    'footer.careers': 'Recrutement',
    'footer.privacy': 'Confidentialité',
    'footer.terms': 'CGU',
    'footer.contact': 'Contact',
    'footer.demo': 'Voir la démo',
    'footer.changelog': 'Nouveautés',
    'footer.help': 'Centre d\'aide',
    'footer.community': 'Communauté',
    'footer.api': 'API',
    'footer.pricing': 'Tarifs',
    'footer.features': 'Fonctionnalités',
    'footer.tagline': 'La plateforme #1 pour les nail artists qui veulent professionnaliser leur activité.',
    'footer.rights': 'Tous droits réservés.',

    // ── Dashboard ───────────────────────────────────────────────
    'dashboard.title': 'Tableau de bord',
    'dashboard.welcome': 'Bonjour',
    'dashboard.revenue': 'Chiffre d\'affaires',
    'dashboard.bookings': 'Réservations',
    'dashboard.clients': 'Clientes',
    'dashboard.upcoming': 'Prochaines réservations',
    'dashboard.no_upcoming': 'Aucune réservation à venir',
    'dashboard.this_month': 'Ce mois',
    'dashboard.vs_last': 'vs mois dernier',
    'dashboard.new': 'nouvelles',
    'dashboard.total': 'total',
    'dashboard.confirm': 'Confirmer',
    'dashboard.cancel': 'Annuler',

    // ── Studio ──────────────────────────────────────────────────
    'studio.book': 'Réserver',
    'studio.services': 'Services',
    'studio.about': 'À propos',
    'studio.deposit': 'Acompte',
    'studio.duration': 'min',
    'studio.verified': 'Vérifié',
    'studio.share': 'Partager',
  },

  en: {
    // ── Navigation ──────────────────────────────────────────────
    'nav.features': 'Features',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.login': 'Login',
    'nav.signup': 'Free trial',

    // ── Hero ────────────────────────────────────────────────────
    'hero.badge': 'The #1 platform for nail artists',
    'hero.title': 'Stop losing clients because of DMs',
    'hero.subtitle': 'Nelsy transforms your Instagram into a professional booking system with online payments. In 10 minutes.',
    'hero.benefit1': 'Setup in 10 minutes',
    'hero.benefit2': 'Automated payments 24/7',
    'hero.benefit3': '3 hours saved per week',
    'hero.cta': 'Start for free',
    'hero.cta.secondary': 'See demo',
    'hero.social': 'Already 500+ nail artists',
    'hero.trusted': 'Trusted by 500+ nail artists',
    'hero.secure': 'Secure payments',

    // ── Stats ───────────────────────────────────────────────────
    'stats.artists': 'Nail artists',
    'stats.bookings': 'Bookings',
    'stats.revenue': 'Revenue generated',
    'stats.satisfaction': 'Satisfaction',

    // ── Trust Bar ───────────────────────────────────────────────
    'trust.title': 'They trust us',

    // ── Before/After ────────────────────────────────────────────
    'comparison.title': 'Before vs After Nelsy',
    'comparison.subtitle': 'The difference that changes everything',
    'comparison.before.label': '❌ Before Nelsy',
    'comparison.after.label': '✨ With Nelsy',
    'comparison.before.1': '50+ DMs per day to manage',
    'comparison.before.2': '3 hours lost in messages',
    'comparison.before.3': '30% no-show rate',
    'comparison.before.4': 'Instagram your only showcase',
    'comparison.before.5': 'Constant stress',
    'comparison.after.1': 'Automatic bookings 24/7',
    'comparison.after.2': '3 hours saved per week',
    'comparison.after.3': 'Deposits paid upfront',
    'comparison.after.4': 'Complete professional dashboard',
    'comparison.after.5': 'Total peace of mind',
    'comparison.cta': 'Switch to Nelsy now →',

    // ── Features ────────────────────────────────────────────────
    'features.title': 'Everything you need',
    'features.subtitle': 'A complete tool to professionalize your business',

    'features.booking.badge': 'Bookings',
    'features.booking.title': 'Clients book themselves, 24/7',
    'features.booking.desc': 'No more back-and-forth DMs. Clients choose their slot, pay the deposit, and it\'s done.',
    'features.booking.benefit1': 'Real-time synchronized calendar',
    'features.booking.benefit2': 'Automatic email reminders',
    'features.booking.benefit3': 'Zero risk of double booking',
    'features.booking.cta': 'See how it works →',

    'features.payment.badge': 'Payments',
    'features.payment.title': 'Collect deposits automatically',
    'features.payment.desc': 'Deposits are collected at booking time via Stripe. No more no-shows. Your revenue is secured.',
    'features.payment.benefit1': 'Secure payments by Stripe',
    'features.payment.benefit2': 'Transfer within 2 business days',
    'features.payment.benefit3': 'Fixed €1 fee per booking',
    'features.payment.cta': 'Set up payments →',

    'features.calendar.title': 'Smart calendar',
    'features.calendar.desc': 'Manage availability in real-time. Double-booking impossible.',

    'features.analytics.title': 'Detailed analytics',
    'features.analytics.desc': 'Track revenue, loyal clients and optimize your business.',

    // ── Testimonials ────────────────────────────────────────────
    'testimonials.title': 'They transformed their business',
    'testimonials.subtitle': 'Discover their concrete results',
    'testimonials.1.quote': 'With Nelsy, I no longer lose clients because of DMs. Everything is automated, my bookings increased by 40%.',
    'testimonials.1.metric.label': 'Revenue increased',
    'testimonials.1.metric.value': '+40%',
    'testimonials.2.quote': 'Automatic deposits eliminated no-shows. I got back 3 hours per week that I finally dedicate to my family.',
    'testimonials.2.metric.label': 'No-shows avoided',
    'testimonials.2.metric.value': '-85%',
    'testimonials.3.quote': 'Set up in 10 minutes, my clients love the interface. Best investment I\'ve made for my business.',
    'testimonials.3.metric.label': 'Time saved',
    'testimonials.3.metric.value': '3h/week',
    'testimonials.video_coming': 'Video testimonials coming soon',

    // ── ROI Calculator ──────────────────────────────────────────
    'calculator.title': 'How much will you save?',
    'calculator.subtitle': 'Calculate your ROI in 30 seconds',
    'calculator.bookings_per_week': 'How many appointments per week?',
    'calculator.avg_price': 'Average price of your services',
    'calculator.time_saved': 'Saved per week',
    'calculator.extra_revenue': 'Extra revenue / month',
    'calculator.no_shows_saved': 'No-show losses avoided',
    'calculator.total_gain': 'Estimated monthly total gain',
    'calculator.cta': 'Start saving now →',

    // ── Pricing ─────────────────────────────────────────────────
    'pricing.title': 'Simple, transparent pricing',
    'pricing.subtitle': 'Start free, upgrade to Pro when you\'re ready',
    'pricing.monthly': 'Monthly',
    'pricing.annual': 'Annual',

    'pricing.free': 'Free',
    'pricing.free.badge': 'STARTER',
    'pricing.free.desc': 'To discover Nelsy',
    'pricing.free.cta': 'Start for free',
    'pricing.free.period': 'Forever',
    'pricing.free.feature1': '10 bookings / month',
    'pricing.free.feature2': 'Custom page',
    'pricing.free.feature3': 'Basic calendar',
    'pricing.free.feature4': 'Email support',

    'pricing.pro': 'Pro',
    'pricing.pro.badge': 'MOST POPULAR',
    'pricing.pro.label': 'PROFESSIONAL',
    'pricing.pro.price': '$29',
    'pricing.pro.price.annual': '$23',
    'pricing.pro.period': '/month',
    'pricing.pro.desc': 'For professionals',
    'pricing.pro.cta': '14-day free trial →',
    'pricing.pro.trial_note': 'No credit card required',
    'pricing.pro.annual_note': '$276/year instead of $348',
    'pricing.pro.feature1': 'Unlimited bookings',
    'pricing.pro.feature2': 'Online payments',
    'pricing.pro.feature3': 'Full calendar',
    'pricing.pro.feature4': 'Automatic reminders',
    'pricing.pro.feature5': 'Analytics dashboard',
    'pricing.pro.feature6': 'Priority support',

    'pricing.enterprise.badge': 'SALONS & NETWORKS',
    'pricing.enterprise.title': 'Enterprise',
    'pricing.enterprise.price': 'Custom',
    'pricing.enterprise.period': 'Custom pricing',
    'pricing.enterprise.cta': 'Contact us',
    'pricing.enterprise.feature1': 'Multi-location',
    'pricing.enterprise.feature2': 'Team management',
    'pricing.enterprise.feature3': 'Dedicated API',
    'pricing.enterprise.feature4': 'Account manager',
    'pricing.enterprise.feature5': 'Custom onboarding',

    'pricing.popular': 'Popular',
    'pricing.feature.bookings': 'Unlimited bookings',
    'pricing.feature.payments': 'Online payments',
    'pricing.feature.calendar': 'Full calendar',
    'pricing.feature.analytics': 'Advanced analytics',
    'pricing.feature.support': 'Priority support',
    'pricing.feature.custom': 'Custom page',

    'pricing.trust.secure': 'SSL secured payments',
    'pricing.trust.payment': 'Powered by Stripe',
    'pricing.trust.cancel': 'Cancel anytime',

    // ── FAQ ─────────────────────────────────────────────────────
    'faq.title': 'Frequently asked questions',
    'faq.subtitle': 'Everything you need to know',
    'faq.search_placeholder': 'Search a question...',
    'faq.still_questions': 'Still have questions?',
    'faq.contact_us': 'Our team is here to help',
    'faq.cta': 'Contact support',
    'faq.q1': 'How does deposit payment work?',
    'faq.a1': 'Clients pay the deposit directly via Stripe when booking. Money is transferred to your bank account within 2 business days.',
    'faq.q2': 'What commission does Nelsy take?',
    'faq.a2': 'Nelsy takes €1 per booking with deposit. That\'s all. No commission on your rates.',
    'faq.q3': 'Can I customize my page?',
    'faq.a3': 'Yes, you can customize the name, description, services, prices and photos on your page.',
    'faq.q4': 'Is my data secure?',
    'faq.a4': 'All data is hosted in Europe and encrypted. Payments are managed by Stripe, PCI-DSS certified.',
    'faq.q5': 'Can I cancel anytime?',
    'faq.a5': 'Yes, no commitment or cancellation fees. You can cancel your subscription at any time from your dashboard.',
    'faq.q6': 'Is there a mobile app?',
    'faq.a6': 'An iOS and Android app is in development. In the meantime, the web version is fully responsive.',

    // ── Final CTA ───────────────────────────────────────────────
    'final_cta.title': 'Ready to transform your business?',
    'final_cta.subtitle': 'Join 500+ nail artists who said goodbye to DMs and hello to peace of mind.',
    'final_cta.primary': 'Start for free →',
    'final_cta.secondary': 'Book a demo',
    'final_cta.guarantee1': 'No credit card',
    'final_cta.guarantee2': 'Cancel anytime',
    'final_cta.guarantee3': 'Setup in 10 min',
    'final_cta.urgency': 'Early bird offer: -20% on Pro plan',

    'cta.title': 'Ready to get started?',
    'cta.subtitle': 'Join 500+ nail artists who transformed their business with Nelsy.',
    'cta.button': 'Create my salon for free',
    'cta.note': 'No credit card required · Cancel anytime',

    // ── Footer ──────────────────────────────────────────────────
    'footer.product': 'Product',
    'footer.company': 'Company',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.about': 'About',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.contact': 'Contact',
    'footer.demo': 'See demo',
    'footer.changelog': 'Changelog',
    'footer.help': 'Help center',
    'footer.community': 'Community',
    'footer.api': 'API',
    'footer.pricing': 'Pricing',
    'footer.features': 'Features',
    'footer.tagline': 'The #1 platform for nail artists who want to professionalize their business.',
    'footer.rights': 'All rights reserved.',

    // ── Dashboard ───────────────────────────────────────────────
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Hello',
    'dashboard.revenue': 'Revenue',
    'dashboard.bookings': 'Bookings',
    'dashboard.clients': 'Clients',
    'dashboard.upcoming': 'Upcoming bookings',
    'dashboard.no_upcoming': 'No upcoming bookings',
    'dashboard.this_month': 'This month',
    'dashboard.vs_last': 'vs last month',
    'dashboard.new': 'new',
    'dashboard.total': 'total',
    'dashboard.confirm': 'Confirm',
    'dashboard.cancel': 'Cancel',

    // ── Studio ──────────────────────────────────────────────────
    'studio.book': 'Book',
    'studio.services': 'Services',
    'studio.about': 'About',
    'studio.deposit': 'Deposit',
    'studio.duration': 'min',
    'studio.verified': 'Verified',
    'studio.share': 'Share',
  },
};

function detectBrowserLanguage(): Language {
  const saved = localStorage.getItem('nelsy-language');
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as { state?: { language?: string } };
      if (parsed?.state?.language === 'fr' || parsed?.state?.language === 'en') {
        return parsed.state.language;
      }
    } catch { /* ignore */ }
  }
  const lang = navigator.language || 'fr';
  return lang.startsWith('fr') ? 'fr' : 'en';
}

export const useI18n = create<I18nStore>()(
  persist(
    (set, get) => ({
      language: detectBrowserLanguage(),
      setLanguage: (lang) => set({ language: lang }),
      t: (key) => {
        const { language } = get();
        return translations[language][key] ?? key;
      },
    }),
    { name: 'nelsy-language' }
  )
);
