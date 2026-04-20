import { useState, useCallback } from 'react';

interface ToastState {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

export function useToast() {
  const [toast, setToast] = useState<ToastState | null>(null);

  const showSuccess = useCallback((message: string) => {
    setToast({ type: 'success', message });
  }, []);

  const showError = useCallback((message: string) => {
    setToast({ type: 'error', message });
  }, []);

  const showWarning = useCallback((message: string) => {
    setToast({ type: 'warning', message });
  }, []);

  const showInfo = useCallback((message: string) => {
    setToast({ type: 'info', message });
  }, []);

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  return { toast, showSuccess, showError, showWarning, showInfo, hideToast };
}
