import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface Props {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose: () => void;
  duration?: number;
}

const CONFIGS = {
  success: {
    icon: CheckCircle,
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    iconColor: 'text-green-500',
  },
  error: {
    icon: XCircle,
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: AlertCircle,
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    iconColor: 'text-yellow-500',
  },
  info: {
    icon: Info,
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    iconColor: 'text-blue-500',
  },
} as const;

export default function Toast({ type, message, onClose, duration = 3000 }: Props) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = CONFIGS[type];
  const Icon = config.icon;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
      <div className={`${config.bg} ${config.border} border rounded-2xl shadow-lg p-4 flex items-center gap-3 min-w-[320px] max-w-md`}>
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0`} />
        <p className={`${config.text} font-medium flex-1 text-sm`}>{message}</p>
        <button
          onClick={onClose}
          className={`${config.iconColor} hover:opacity-70 transition flex-shrink-0`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
