import { Capacitor } from '@capacitor/core';

/**
 * Store rules for plan purchases, in one place.
 *
 * Nelsy subscriptions are sold on getnelsy.com only, never inside the app. The App Store
 * build ships as a free companion app (Guideline 3.1.3(f)): "no purchasing inside the app,
 * or calls to action for purchase outside of the app". So the native builds never show a
 * price, a trial offer, an upgrade button or a link to a plan page. They only show the
 * current plan status. Google Play's payments policy is treated the same way.
 *
 * Plain browser runs (dev, `?demo=1` previews) keep the website links.
 * `?store=1` in a demo URL forces the store behaviour so it can be checked in a browser.
 * VITE_PLAN_LINKS=android re-enables the links in Android builds only, if the founder decides to.
 */
function forcedStoreMode(): boolean {
  try {
    const q = new URLSearchParams(window.location.hash.split('?')[1] ?? '');
    const s = new URLSearchParams(window.location.search);
    if (q.get('store') === '1' || s.get('store') === '1') sessionStorage.setItem('nelsy-app-store', '1');
    return sessionStorage.getItem('nelsy-app-store') === '1';
  } catch {
    return false;
  }
}

export function planLinksAllowed(): boolean {
  const platform = Capacitor.getPlatform();
  if (platform === 'ios') return false;
  if (platform === 'android') return import.meta.env.VITE_PLAN_LINKS === 'android';
  return !forcedStoreMode();
}
