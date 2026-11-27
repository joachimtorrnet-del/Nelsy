import { createContext, useContext } from 'react';
import type { ProSnapshot } from '../lib/types';

export interface ProDataValue {
  data: ProSnapshot | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  setServiceActive: (id: string, active: boolean) => Promise<void>;
  signOut: () => Promise<void>;
}

export const ProDataContext = createContext<ProDataValue | null>(null);

export function useProData(): ProDataValue {
  const ctx = useContext(ProDataContext);
  if (!ctx) throw new Error('useProData must be used inside <ProDataProvider>');
  return ctx;
}
