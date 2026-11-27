import { createContext, useContext } from 'react';
import type { ProSnapshot } from '../lib/types';

export interface ProDataValue {
  data: ProSnapshot | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  setServiceActive: (id: string, active: boolean) => Promise<void>;
  /** Writes one key of profiles.notification_preferences. Resolves false if it could not be saved. */
  setNotificationPref: (key: string, value: boolean) => Promise<boolean>;
  /** Saves profiles.timezone. */
  setTimezone: (tz: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

export const ProDataContext = createContext<ProDataValue | null>(null);

export function useProData(): ProDataValue {
  const ctx = useContext(ProDataContext);
  if (!ctx) throw new Error('useProData must be used inside <ProDataProvider>');
  return ctx;
}
