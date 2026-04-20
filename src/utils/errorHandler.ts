export class AppError extends Error {
  code?: string;
  statusCode?: number;

  constructor(message: string, code?: string, statusCode?: number) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export function handleSupabaseError(error: unknown): string {
  if (!error) return 'An unknown error occurred';

  const msg = (error as { message?: string }).message ?? '';

  if (msg.includes('Invalid login credentials')) return 'Invalid email or password';
  if (msg.includes('Email not confirmed')) return 'Please confirm your email address';
  if (msg.includes('User already registered')) return 'This email is already registered';
  if (msg.includes('rate limit')) return 'Too many attempts. Please wait a few minutes';
  if (msg.includes('Failed to fetch') || msg.includes('Load failed') || msg.includes('NetworkError')) return 'Network error. Please check your connection';

  return msg || 'An error occurred. Please try again';
}

export function handleStripeError(error: unknown): string {
  if (!error) return 'Payment error occurred';

  const e = error as { code?: string; message?: string };

  if (e.code === 'card_declined') return 'Your card was declined';
  if (e.code === 'insufficient_funds') return 'Insufficient funds';
  if (e.code === 'expired_card') return 'Your card has expired';
  if (e.code === 'incorrect_cvc') return 'Incorrect CVC code';

  return e.message || 'Payment failed. Please try again';
}

export function logError(error: Error, context?: unknown) {
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });

  // TODO: Send to error tracking service
  // Sentry.captureException(error, { extra: context });
}
