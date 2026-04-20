import { useI18n } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
      <button
        onClick={() => setLanguage('fr')}
        className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${
          language === 'fr'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        FR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 rounded-md text-xs font-bold transition-all ${
          language === 'en'
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        EN
      </button>
    </div>
  );
}
