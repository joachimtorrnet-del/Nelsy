import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '../lib/supabase';
import { validatePassword } from '../utils/validation';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  username: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  instagram: string;
  tiktok: string;
  plan: 'monthly' | 'yearly';
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
  agreedToTerms: boolean;
}

interface StepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  nextStep: () => void;
  prevStep?: () => void;
}

// ─── Main Onboarding ──────────────────────────────────────────────────────────

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    instagram: '',
    tiktok: '',
    plan: 'monthly',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
    agreedToTerms: false,
  });

  const navigate = useNavigate();

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
    else navigate('/dashboard');
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Progress Bar */}
      <div className="pt-4 px-4">
        <div className="flex gap-2 max-w-md mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex-1 h-1 rounded-full transition-all duration-300"
              style={{ backgroundColor: i <= step ? '#F52B8C' : '#E4E4E7' }}
            />
          ))}
        </div>
      </div>

      {/* Steps Content */}
      <div className="flex flex-col justify-between px-4 py-6 max-w-md mx-auto w-full min-h-[calc(100vh-2.5rem)]">
        {step === 1 && <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />}
        {step === 2 && <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 3 && <Step3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
        {step === 4 && <Step4 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} />}
      </div>

    </div>
  );
}

// ─── Step 1 — Signup ──────────────────────────────────────────────────────────

const COUNTRY_CODES = [
  { code: '+93', flag: '🇦🇫', name: 'Afghanistan' },
  { code: '+355', flag: '🇦🇱', name: 'Albania' },
  { code: '+213', flag: '🇩🇿', name: 'Algeria' },
  { code: '+376', flag: '🇦🇩', name: 'Andorra' },
  { code: '+244', flag: '🇦🇴', name: 'Angola' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: '+374', flag: '🇦🇲', name: 'Armenia' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+43', flag: '🇦🇹', name: 'Austria' },
  { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+32', flag: '🇧🇪', name: 'Belgium' },
  { code: '+501', flag: '🇧🇿', name: 'Belize' },
  { code: '+229', flag: '🇧🇯', name: 'Benin' },
  { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
  { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: '+387', flag: '🇧🇦', name: 'Bosnia' },
  { code: '+267', flag: '🇧🇼', name: 'Botswana' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+673', flag: '🇧🇳', name: 'Brunei' },
  { code: '+359', flag: '🇧🇬', name: 'Bulgaria' },
  { code: '+226', flag: '🇧🇫', name: 'Burkina Faso' },
  { code: '+257', flag: '🇧🇮', name: 'Burundi' },
  { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
  { code: '+237', flag: '🇨🇲', name: 'Cameroon' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: '+238', flag: '🇨🇻', name: 'Cape Verde' },
  { code: '+236', flag: '🇨🇫', name: 'Central African Rep.' },
  { code: '+235', flag: '🇹🇩', name: 'Chad' },
  { code: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: '+269', flag: '🇰🇲', name: 'Comoros' },
  { code: '+242', flag: '🇨🇬', name: 'Congo' },
  { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+385', flag: '🇭🇷', name: 'Croatia' },
  { code: '+53', flag: '🇨🇺', name: 'Cuba' },
  { code: '+357', flag: '🇨🇾', name: 'Cyprus' },
  { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
  { code: '+45', flag: '🇩🇰', name: 'Denmark' },
  { code: '+253', flag: '🇩🇯', name: 'Djibouti' },
  { code: '+1809', flag: '🇩🇴', name: 'Dominican Republic' },
  { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: '+20', flag: '🇪🇬', name: 'Egypt' },
  { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
  { code: '+240', flag: '🇬🇶', name: 'Equatorial Guinea' },
  { code: '+291', flag: '🇪🇷', name: 'Eritrea' },
  { code: '+372', flag: '🇪🇪', name: 'Estonia' },
  { code: '+251', flag: '🇪🇹', name: 'Ethiopia' },
  { code: '+679', flag: '🇫🇯', name: 'Fiji' },
  { code: '+358', flag: '🇫🇮', name: 'Finland' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+241', flag: '🇬🇦', name: 'Gabon' },
  { code: '+220', flag: '🇬🇲', name: 'Gambia' },
  { code: '+995', flag: '🇬🇪', name: 'Georgia' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+233', flag: '🇬🇭', name: 'Ghana' },
  { code: '+30', flag: '🇬🇷', name: 'Greece' },
  { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: '+224', flag: '🇬🇳', name: 'Guinea' },
  { code: '+245', flag: '🇬🇼', name: 'Guinea-Bissau' },
  { code: '+592', flag: '🇬🇾', name: 'Guyana' },
  { code: '+509', flag: '🇭🇹', name: 'Haiti' },
  { code: '+504', flag: '🇭🇳', name: 'Honduras' },
  { code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
  { code: '+36', flag: '🇭🇺', name: 'Hungary' },
  { code: '+354', flag: '🇮🇸', name: 'Iceland' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+98', flag: '🇮🇷', name: 'Iran' },
  { code: '+964', flag: '🇮🇶', name: 'Iraq' },
  { code: '+353', flag: '🇮🇪', name: 'Ireland' },
  { code: '+972', flag: '🇮🇱', name: 'Israel' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+225', flag: '🇨🇮', name: 'Ivory Coast' },
  { code: '+1876', flag: '🇯🇲', name: 'Jamaica' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+7', flag: '🇰🇿', name: 'Kazakhstan' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
  { code: '+856', flag: '🇱🇦', name: 'Laos' },
  { code: '+371', flag: '🇱🇻', name: 'Latvia' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+266', flag: '🇱🇸', name: 'Lesotho' },
  { code: '+231', flag: '🇱🇷', name: 'Liberia' },
  { code: '+218', flag: '🇱🇾', name: 'Libya' },
  { code: '+423', flag: '🇱🇮', name: 'Liechtenstein' },
  { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
  { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
  { code: '+853', flag: '🇲🇴', name: 'Macao' },
  { code: '+261', flag: '🇲🇬', name: 'Madagascar' },
  { code: '+265', flag: '🇲🇼', name: 'Malawi' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+960', flag: '🇲🇻', name: 'Maldives' },
  { code: '+223', flag: '🇲🇱', name: 'Mali' },
  { code: '+356', flag: '🇲🇹', name: 'Malta' },
  { code: '+222', flag: '🇲🇷', name: 'Mauritania' },
  { code: '+230', flag: '🇲🇺', name: 'Mauritius' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: '+373', flag: '🇲🇩', name: 'Moldova' },
  { code: '+377', flag: '🇲🇨', name: 'Monaco' },
  { code: '+976', flag: '🇲🇳', name: 'Mongolia' },
  { code: '+382', flag: '🇲🇪', name: 'Montenegro' },
  { code: '+212', flag: '🇲🇦', name: 'Morocco' },
  { code: '+258', flag: '🇲🇿', name: 'Mozambique' },
  { code: '+95', flag: '🇲🇲', name: 'Myanmar' },
  { code: '+264', flag: '🇳🇦', name: 'Namibia' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
  { code: '+227', flag: '🇳🇪', name: 'Niger' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+389', flag: '🇲🇰', name: 'North Macedonia' },
  { code: '+47', flag: '🇳🇴', name: 'Norway' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+507', flag: '🇵🇦', name: 'Panama' },
  { code: '+675', flag: '🇵🇬', name: 'Papua New Guinea' },
  { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
  { code: '+51', flag: '🇵🇪', name: 'Peru' },
  { code: '+63', flag: '🇵🇭', name: 'Philippines' },
  { code: '+48', flag: '🇵🇱', name: 'Poland' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+40', flag: '🇷🇴', name: 'Romania' },
  { code: '+7', flag: '🇷🇺', name: 'Russia' },
  { code: '+250', flag: '🇷🇼', name: 'Rwanda' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+221', flag: '🇸🇳', name: 'Senegal' },
  { code: '+381', flag: '🇷🇸', name: 'Serbia' },
  { code: '+232', flag: '🇸🇱', name: 'Sierra Leone' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
  { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
  { code: '+252', flag: '🇸🇴', name: 'Somalia' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: '+211', flag: '🇸🇸', name: 'South Sudan' },
  { code: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+249', flag: '🇸🇩', name: 'Sudan' },
  { code: '+597', flag: '🇸🇷', name: 'Suriname' },
  { code: '+268', flag: '🇸🇿', name: 'Swaziland' },
  { code: '+46', flag: '🇸🇪', name: 'Sweden' },
  { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { code: '+963', flag: '🇸🇾', name: 'Syria' },
  { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
  { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
  { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+66', flag: '🇹🇭', name: 'Thailand' },
  { code: '+228', flag: '🇹🇬', name: 'Togo' },
  { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey' },
  { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
  { code: '+256', flag: '🇺🇬', name: 'Uganda' },
  { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
  { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
  { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
  { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+967', flag: '🇾🇪', name: 'Yemen' },
  { code: '+260', flag: '🇿🇲', name: 'Zambia' },
  { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
];

function CountryCodePicker({ value, onChange }: { value: string; onChange: (code: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = COUNTRY_CODES.find((c) => c.code === value) ?? COUNTRY_CODES[0];
  const filtered = COUNTRY_CODES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search)
  );

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 50);
    else setSearch('');
  }, [open]);

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-3 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#F52B8C] transition bg-white whitespace-nowrap"
      >
        <span>{selected.flag}</span>
        <span className="font-medium">{selected.code}</span>
        <span className="text-gray-400 text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 z-50 bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden" style={{ width: 260 }}>
          {/* Search */}
          <div className="p-2 border-b border-gray-100">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#F52B8C] transition"
            />
          </div>
          {/* List */}
          <div className="overflow-y-auto" style={{ maxHeight: 220 }}>
            {filtered.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-4">No results</p>
            ) : (
              filtered.map((c) => (
                <button
                  key={`${c.name}-${c.code}`}
                  type="button"
                  onClick={() => { onChange(c.code); setOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition text-left ${c.code === value && c.name === selected.name ? 'bg-[#F52B8C]/5 text-[#F52B8C] font-semibold' : 'text-gray-700'}`}
                >
                  <span className="text-base flex-shrink-0">{c.flag}</span>
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-gray-400 text-xs flex-shrink-0">{c.code}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Step1({ formData, setFormData, nextStep }: StepProps) {
  const [errors, setErrors] = useState({ username: '', fullName: '', email: '', phone: '', password: '' });
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailExists, setEmailExists] = useState<boolean | null>(null);
  const [countryCode, setCountryCode] = useState('+33');

  const validateEmailFormat = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const checkUsernameAvailability = async (username: string) => {
    if (!username || username.length < 3) { setUsernameAvailable(null); return; }
    if (!supabase) return;
    setCheckingUsername(true);
    try {
      const { data } = await supabase.from('profiles').select('slug').eq('slug', username).maybeSingle();
      if (data) {
        setUsernameAvailable(false);
        setErrors((prev) => ({ ...prev, username: 'This username is already taken' }));
      } else {
        setUsernameAvailable(true);
        setErrors((prev) => ({ ...prev, username: '' }));
      }
    } catch { /* ignore */ } finally {
      setCheckingUsername(false);
    }
  };

  const checkEmailExists = async (email: string) => {
    if (!validateEmailFormat(email)) { setEmailExists(null); return; }
    if (!supabase) return;
    setCheckingEmail(true);
    try {
      const { data } = await supabase.from('profiles').select('id').eq('email', email).maybeSingle();
      if (data) {
        setEmailExists(true);
        setErrors((prev) => ({ ...prev, email: 'This email is already registered' }));
      } else {
        setEmailExists(false);
        setErrors((prev) => ({ ...prev, email: '' }));
      }
    } catch { /* ignore */ } finally {
      setCheckingEmail(false);
    }
  };

  useEffect(() => {
    if (formData.username.length >= 3) {
      const timer = setTimeout(() => checkUsernameAvailability(formData.username), 500);
      return () => clearTimeout(timer);
    } else {
      setUsernameAvailable(null);
    }
  }, [formData.username]);

  useEffect(() => {
    if (validateEmailFormat(formData.email)) {
      const timer = setTimeout(() => checkEmailExists(formData.email), 600);
      return () => clearTimeout(timer);
    } else {
      setEmailExists(null);
    }
  }, [formData.email]);

  const validateForm = (): boolean => {
    const newErrors = { username: '', fullName: '', email: '', phone: '', password: '' };
    let isValid = true;

    if (!formData.username || formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters'; isValid = false;
    } else if (usernameAvailable === false) {
      newErrors.username = 'This username is already taken'; isValid = false;
    }
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name'; isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required'; isValid = false;
    } else if (!validateEmailFormat(formData.email)) {
      newErrors.email = 'Please enter a valid email address'; isValid = false;
    } else if (emailExists === true) {
      newErrors.email = 'This email is already registered'; isValid = false;
    }
    if (!formData.phone || formData.phone.length < 8) {
      newErrors.phone = 'Please enter a valid phone number'; isValid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'; isValid = false;
    } else {
      const pwCheck = validatePassword(formData.password);
      if (!pwCheck.valid) { newErrors.password = pwCheck.errors[0]; isValid = false; }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = () => {
    if (checkingUsername || checkingEmail) return;
    if (validateForm()) nextStep();
  };

  const inputClass = (error: string, valid?: boolean) =>
    `border-2 rounded-2xl focus:outline-none transition ${
      error ? 'border-red-500' : valid ? 'border-green-500' : 'border-gray-200 focus:border-[#F52B8C]'
    }`;

  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">
          {formData.username ? `Hey @${formData.username} 👋` : 'Hey 👋'}
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 text-center">Let's build your empire!</p>

        <div className="space-y-3">
          {/* Username */}
          <div className="space-y-1">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none select-none">
                getnelsy.com/
              </div>
              <input
                type="text"
                placeholder="yourname"
                value={formData.username}
                onChange={(e) => {
                  const value = e.target.value.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-_]/g, '');
                  setFormData({ ...formData, username: value });
                }}
                className={`w-full pl-24 pr-10 py-4 text-base ${inputClass(errors.username, usernameAvailable === true)}`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {checkingUsername && (
                  <svg className="animate-spin h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {!checkingUsername && usernameAvailable === true && (
                  <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {!checkingUsername && usernameAvailable === false && (
                  <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            {errors.username && <p className="text-xs text-red-600">{errors.username}</p>}
            {!errors.username && usernameAvailable === true && formData.username && (
              <p className="text-xs text-green-600">✓ Username available — getnelsy.com/{formData.username}</p>
            )}
          </div>

          {/* Full Name */}
          <div className="space-y-1">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className={`w-full px-4 py-4 text-base ${inputClass(errors.fullName)}`}
            />
            {errors.fullName && <p className="text-xs text-red-600">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => {
                  setEmailExists(null);
                  setErrors((prev) => ({ ...prev, email: '' }));
                  setFormData({ ...formData, email: e.target.value });
                }}
                className={`w-full px-4 pr-10 py-4 text-base ${inputClass(errors.email, emailExists === false)}`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {checkingEmail && (
                  <svg className="animate-spin h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                )}
                {!checkingEmail && emailExists === false && (
                  <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {!checkingEmail && emailExists === true && (
                  <svg className="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <div className="flex gap-2">
              <CountryCodePicker
                value={countryCode}
                onChange={(code) => {
                  setCountryCode(code);
                  const digits = formData.phone.replace(/^\+\d+\s?/, '');
                  setFormData({ ...formData, phone: `${code} ${digits}`.trim() });
                }}
              />
              <input
                type="tel"
                placeholder="Phone number"
                value={formData.phone.replace(/^\+\d+\s?/, '')}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '');
                  setFormData({ ...formData, phone: `${countryCode} ${digits}`.trim() });
                }}
                className={`flex-1 px-4 py-4 text-base ${inputClass(errors.phone)}`}
              />
            </div>
            {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <input
              type="password"
              placeholder="Password (min 8 chars, uppercase, number)"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full px-4 py-4 text-base ${inputClass(errors.password)}`}
            />
            {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
            {formData.password && !errors.password && validatePassword(formData.password).valid && (
              <p className="text-xs text-green-600">✓ Strong password</p>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          By continuing, you agree to our{' '}
          <a href="/terms" className="underline" style={{ color: '#F52B8C' }}>Terms</a>{' '}
          and{' '}
          <a href="/privacy" className="underline" style={{ color: '#F52B8C' }}>Privacy</a>.
          Protected under <span className="font-semibold">GDPR</span>.
        </p>
        <p className="text-xs text-gray-600 mt-2 text-center">
          Have an account?{' '}
          <Link to="/login" className="font-semibold text-[#F52B8C]">Login</Link>
        </p>
      </div>

      <button
        onClick={handleNext}
        disabled={checkingUsername || checkingEmail || usernameAvailable === false || emailExists === true}
        className="w-full py-4 text-white rounded-2xl font-bold text-base transition active:scale-95 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#F52B8C' }}
        onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#E0167A'; }}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F52B8C')}
      >
        {checkingUsername ? 'Checking...' : 'Next'}
      </button>
    </>
  );
}

// ─── Step 2 — Connect Socials ─────────────────────────────────────────────────

function Step2({ formData, setFormData, nextStep }: StepProps) {
  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">
          Connect your socials
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 text-center">
          We'll use it to personalize your studio
        </p>

        <div className="space-y-3">
          {/* Instagram */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span className="text-gray-500 text-sm">@</span>
            </div>
            <input
              type="text"
              placeholder="yourname"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              className="w-full pl-16 pr-4 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#F52B8C] transition"
            />
          </div>

          {/* TikTok */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
              <span className="text-gray-500 text-sm">@</span>
            </div>
            <input
              type="text"
              placeholder="yourname"
              value={formData.tiktok}
              onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
              className="w-full pl-16 pr-4 py-4 text-base border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-[#F52B8C] transition"
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={nextStep}
          className="w-full py-4 text-white rounded-2xl font-bold text-base transition active:scale-95"
          style={{ backgroundColor: '#F52B8C' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E0167A')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F52B8C')}
        >
          Next
        </button>
        <button onClick={nextStep} className="w-full font-semibold text-sm" style={{ color: '#F52B8C' }}>
          Skip
        </button>
      </div>
    </>
  );
}

// ─── Step 3 — Pricing ─────────────────────────────────────────────────────────

function Step3({ formData, setFormData, nextStep }: StepProps) {
  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">
          Pick your plan 💸
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6 text-center">
          Start earning today — free for 14 days
        </p>

        <div className="space-y-3">
          {/* Monthly Plan */}
          <button
            onClick={() => setFormData({ ...formData, plan: 'monthly' })}
            className="relative w-full p-4 border-4 rounded-2xl text-left transition"
            style={{
              borderColor: formData.plan === 'monthly' ? '#F52B8C' : '#E4E4E7',
              boxShadow: formData.plan === 'monthly' ? '0 8px 24px rgba(245,43,140,0.15)' : 'none',
            }}
          >
            <div className="absolute top-4 left-4">
              <div
                className="w-5 h-5 rounded-full border-4 flex items-center justify-center transition"
                style={{
                  borderColor: formData.plan === 'monthly' ? '#F52B8C' : '#D4D4D8',
                  backgroundColor: formData.plan === 'monthly' ? '#F52B8C' : 'transparent',
                }}
              >
                {formData.plan === 'monthly' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </div>
            <div className="pl-8">
              <div className="font-bold text-base text-gray-900 mb-0.5">Monthly</div>
              <div className="text-gray-600 text-sm">
                <span className="text-lg font-bold text-gray-900">$0</span> for 14 days, then{' '}
                <span className="text-lg font-bold text-gray-900">$29</span>/mo
              </div>
            </div>
          </button>

          {/* Yearly Plan */}
          <button
            onClick={() => setFormData({ ...formData, plan: 'yearly' })}
            className="relative w-full p-4 border-4 rounded-2xl text-left transition"
            style={{
              borderColor: formData.plan === 'yearly' ? '#F52B8C' : '#E4E4E7',
              boxShadow: formData.plan === 'yearly' ? '0 8px 24px rgba(245,43,140,0.15)' : 'none',
            }}
          >
            <div className="absolute -top-2.5 right-4">
              <span className="px-2.5 py-1 bg-blue-500 text-white text-xs font-bold rounded-full shadow">
                Save 20%
              </span>
            </div>
            <div className="absolute top-4 left-4">
              <div
                className="w-5 h-5 rounded-full border-4 flex items-center justify-center transition"
                style={{
                  borderColor: formData.plan === 'yearly' ? '#F52B8C' : '#D4D4D8',
                  backgroundColor: formData.plan === 'yearly' ? '#F52B8C' : 'transparent',
                }}
              >
                {formData.plan === 'yearly' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </div>
            <div className="pl-8">
              <div className="font-bold text-base text-gray-900 mb-0.5">Yearly</div>
              <div className="text-gray-600 text-sm">
                <span className="text-lg font-bold text-gray-900">$0</span> for 14 days, then{' '}
                <span className="text-lg font-bold text-gray-900">$25</span>/mo{' '}
                <span className="text-xs text-gray-500">($300/yr)</span>
              </div>
            </div>
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Due today <span className="text-xl font-bold" style={{ color: '#F52B8C' }}>$0</span> 🙌
        </p>
      </div>

      <button
        onClick={nextStep}
        className="w-full py-4 text-white rounded-2xl font-bold text-base transition active:scale-95"
        style={{ backgroundColor: '#F52B8C' }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E0167A')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F52B8C')}
      >
        Next
      </button>
    </>
  );
}

// ─── Step 4 — Payment (embedded Stripe Elements) ──────────────────────────────

const PRICE_IDS: Record<'monthly' | 'yearly', string> = {
  monthly: 'price_1T8RQeKByJwN07Hw4mAN6FFD',
  yearly: 'price_1T8RRxKByJwN07HwySgYEPTu',
};

const STRIPE_APPEARANCE = {
  theme: 'stripe' as const,
  variables: {
    colorPrimary: '#F52B8C',
    colorBackground: '#ffffff',
    colorText: '#111827',
    colorDanger: '#ef4444',
    fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
    borderRadius: '12px',
    spacingUnit: '4px',
  },
  rules: {
    '.Input': { border: '2px solid #E4E4E7', padding: '14px 16px', fontSize: '15px' },
    '.Input:focus': { border: '2px solid #F52B8C', boxShadow: 'none', outline: 'none' },
    '.Label': { fontWeight: '600', fontSize: '13px', marginBottom: '6px' },
    '.Tab': { border: '2px solid #E4E4E7', borderRadius: '10px' },
    '.Tab--selected': { border: '2px solid #F52B8C', color: '#F52B8C' },
    '.Tab:focus': { boxShadow: 'none' },
  },
};

// Inner component — must live inside <Elements> to call useStripe/useElements
interface PaymentStepProps {
  plan: 'monthly' | 'yearly';
  formattedDate: string;
  intentType: 'setup' | 'payment';
  onSuccess: () => void;
  onBack: () => void;
}

function PaymentStep({ plan, formattedDate, intentType, onSuccess, onBack }: PaymentStepProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    const result = intentType === 'setup'
      ? await stripe.confirmSetup({ elements, redirect: 'if_required' })
      : await stripe.confirmPayment({ elements, redirect: 'if_required' });

    if (result.error) {
      setError(result.error.message ?? 'Payment failed. Please try again.');
      setLoading(false);
    } else {
      onSuccess();
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 text-center">
          Add your payment details
        </h1>
        <p className="text-base text-gray-500 mb-6 text-center">
          You won't be charged until {formattedDate} 🎉
        </p>

        {/* Plan recap */}
        <div className="flex items-center justify-between bg-gray-50 rounded-2xl px-4 py-3 mb-5 border border-gray-100">
          <div>
            <p className="text-xs text-gray-500">Plan</p>
            <p className="font-bold text-gray-900">{plan === 'monthly' ? 'Monthly — $29/mo' : 'Yearly — $25/mo'}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Due today</p>
            <p className="text-2xl font-bold" style={{ color: '#F52B8C' }}>$0</p>
          </div>
        </div>

        {/* Embedded payment form */}
        <div className="mb-4">
          <PaymentElement options={{ layout: 'tabs', wallets: { applePay: 'auto', googlePay: 'auto' } } as object} />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs mb-3">
            {error}
          </div>
        )}

        <p className="text-xs text-center text-gray-400 mb-4 flex items-center justify-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Secured by Stripe — Apple Pay & Google Pay supported
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleConfirm}
          disabled={!stripe || !elements || loading}
          className="w-full py-4 text-white rounded-2xl font-bold text-base hover:opacity-90 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ backgroundColor: '#F52B8C' }}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </>
          ) : 'Start your 14-day free trial'}
        </button>
        <button onClick={onBack} disabled={loading} className="w-full font-semibold text-sm disabled:opacity-50" style={{ color: '#F52B8C' }}>
          ← Change plan
        </button>
      </div>
    </>
  );
}

function Step4({ formData, setFormData, nextStep, prevStep }: StepProps) {
  const [phase, setPhase] = useState<'info' | 'payment'>('info');
  const [clientSecret, setClientSecret] = useState('');
  const [intentType, setIntentType] = useState<'setup' | 'payment'>('setup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accountCreated, setAccountCreated] = useState(false);

  const trialEndDate = new Date();
  trialEndDate.setDate(trialEndDate.getDate() + 14);
  const formattedDate = trialEndDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const handleCreateAccountAndFetchIntent = async () => {
    if (!formData.agreedToTerms) { setError('Please accept the terms and conditions'); return; }
    if (!supabase) { setError('Configuration error. Please contact support.'); return; }

    setLoading(true);
    setError('');

    try {
      let session;

      if (!accountCreated) {
        // 1. Create Supabase account
        setError('Step 1/4 — Creating your account...');
        const { data: { user }, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
              slug: formData.username,
              phone: formData.phone,
              instagram: formData.instagram,
              tiktok: formData.tiktok,
            },
          },
        });
        if (signUpError) throw new Error(`[signup] ${signUpError.message}`);
        if (!user) throw new Error('[signup] No user returned');

        // 2. Wait for DB trigger to create profile
        setError('Step 2/4 — Setting up your profile...');
        let profile = null;
        let retries = 6;
        while (retries > 0 && !profile) {
          await new Promise((r) => setTimeout(r, 500));
          const { data } = await supabase.from('profiles').select('id').eq('id', user.id).maybeSingle();
          if (data) { profile = data; break; }
          retries--;
        }
        if (!profile) throw new Error('[profile] Profile creation timed out');

        // 3. Sign in to get a valid session
        setError('Step 3/4 — Signing you in...');
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (signInError) throw new Error(`[signin] ${signInError.message}`);

        setAccountCreated(true);
      }

      // Get current session (works whether account was just created or already existed)
      const { data: { session: currentSession } } = await supabase.auth.getSession();
      session = currentSession;
      if (!session) throw new Error('[session] No session available');

      // 4. Create subscription intent
      setError('Step 4/4 — Setting up payment...');
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-subscription-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
          'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY as string,
        },
        body: JSON.stringify({ priceId: PRICE_IDS[formData.plan], plan: 'pro' }),
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`[intent] ${res.status}: ${body}`);
      }
      const data = await res.json() as { clientSecret: string; type: 'setup' | 'payment' };

      setError('');
      setClientSecret(data.clientSecret);
      setIntentType(data.type);
      setPhase('payment');

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('[Onboarding]', msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Payment phase — render embedded Stripe PaymentElement
  if (phase === 'payment' && clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret, appearance: STRIPE_APPEARANCE }}>
        <PaymentStep
          plan={formData.plan}
          formattedDate={formattedDate}
          intentType={intentType}
          onSuccess={nextStep}
          onBack={() => setPhase('info')}
        />
      </Elements>
    );
  }

  // Info phase — plan recap + terms + create account button
  return (
    <>
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 text-center">
          Free till {formattedDate} 🎉
        </h1>
        <p className="text-base text-gray-500 mb-6 text-center">Cancel anytime before your trial ends</p>

        {/* Plan recap */}
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-4 mb-4 border-2" style={{ borderColor: '#F52B8C' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500 mb-0.5">Your plan</p>
              <p className="text-lg font-bold text-gray-900">
                {formData.plan === 'monthly' ? 'Monthly' : 'Yearly'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-0.5">Due today</p>
              <p className="text-2xl font-bold" style={{ color: '#F52B8C' }}>$0</p>
            </div>
          </div>
          <div className="pt-3 border-t border-gray-200 space-y-1.5">
            {[
              '14-day free trial starts today',
              `Then ${formData.plan === 'monthly' ? '$29/month' : '$300/year ($25/mo)'}`,
              `Cancel anytime before ${formattedDate}`,
            ].map((text) => (
              <div key={text} className="flex items-center gap-2 text-xs text-gray-600">
                <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Terms */}
        <label className="flex items-start gap-2 cursor-pointer mb-4">
          <input
            type="checkbox"
            checked={formData.agreedToTerms}
            onChange={(e) => setFormData({ ...formData, agreedToTerms: e.target.checked })}
            className="mt-0.5 w-4 h-4 rounded border-2 border-gray-300 accent-[#F52B8C]"
          />
          <span className="text-xs text-gray-600">
            I agree to the{' '}
            <a href="/terms" className="underline" style={{ color: '#F52B8C' }}>Terms</a>{' '}
            and{' '}
            <a href="/privacy" className="underline" style={{ color: '#F52B8C' }}>Privacy Policy</a>.
            GDPR compliant.
          </span>
        </label>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs mb-3">
            {error}
          </div>
        )}
      </div>

      <div className="space-y-3">
        <button
          onClick={handleCreateAccountAndFetchIntent}
          disabled={!formData.agreedToTerms || loading}
          className="w-full py-4 text-white rounded-2xl font-bold text-base hover:opacity-90 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          style={{ backgroundColor: '#F52B8C' }}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Setting up your account...
            </>
          ) : 'Start your 14-day free trial →'}
        </button>
        <button
          onClick={prevStep}
          disabled={loading}
          className="w-full font-semibold text-sm disabled:opacity-50"
          style={{ color: '#F52B8C' }}
        >
          ← Back to plans
        </button>
      </div>
    </>
  );
}
