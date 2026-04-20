import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingSuccess() {
  const navigate = useNavigate();
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((d) => (d.length >= 3 ? '' : d + '.'));
    }, 400);
    const timer = setTimeout(() => navigate('/dashboard'), 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #F52B8C 0%, #D81B60 100%)' }}
    >
      <div className="text-center text-white">
        <div className="w-24 h-24 bg-white rounded-full mx-auto mb-8 flex items-center justify-center shadow-2xl">
          <svg className="w-12 h-12 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold mb-4">Bienvenue sur Nelsy ! 🎉</h1>
        <p className="text-xl mb-8" style={{ color: 'rgba(255,255,255,0.90)' }}>
          Ton studio est prêt. Construis ton empire !
        </p>
        <div className="flex items-center justify-center gap-2" style={{ color: 'rgba(255,255,255,0.70)' }}>
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Redirection vers ton dashboard{dots}</span>
        </div>
      </div>
    </div>
  );
}
