import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Preferences } from '@capacitor/preferences';

export const isNative = () => Capacitor.isNativePlatform();
export const platform = () => Capacitor.getPlatform();

/**
 * Open a website page outside the app (system browser).
 * Capacitor sends navigations to non-app URLs to Safari / Chrome, so window.open is enough here.
 */
export function openExternal(url: string) {
  window.open(url, '_blank', 'noopener');
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

/**
 * getnelsy.com links that open the app (universal links / Android App Links, see
 * docs/mobile/app-store-checklist.md). Only the pro dashboard maps to app screens:
 * public studio pages (getnelsy.com/<slug>) are for clients and stay in the browser.
 */
export function routeForWebUrl(raw: string): string | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }
  if (!/^(www\.)?getnelsy\.com$/.test(u.hostname)) return null;
  const path = u.pathname.replace(/\/+$/, '');
  const map: Record<string, string> = {
    '/dashboard': '/home',
    '/dashboard/calendar': '/bookings',
    '/dashboard/preview': '/preview',
    '/dashboard/settings': '/settings',
    '/dashboard/products': '/studio?tab=products',
    '/dashboard/kit': '/studio?tab=kit',
    '/dashboard/audience': '/audience',
    '/login': '/login',
  };
  return map[path] ?? (path.startsWith('/dashboard/') ? '/home' : null);
}

/** Native chrome setup. No-op in the browser. */
export async function initNativeShell(onBack: () => void, onDeepLink: (route: string) => void) {
  if (!isNative()) return;
  try {
    // Style.Light = dark status bar text, for the white screens.
    await StatusBar.setStyle({ style: Style.Light });
    if (platform() === 'android') {
      await StatusBar.setOverlaysWebView({ overlay: true });
    }
  } catch {
    /* status bar plugin unavailable */
  }
  void App.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack) onBack();
    else void App.exitApp();
  });
  void App.addListener('appUrlOpen', ({ url }) => {
    const route = routeForWebUrl(url);
    if (route) onDeepLink(route);
  });
  await SplashScreen.hide();
}

/** Small key/value store: Capacitor Preferences on device, localStorage in the browser. */
export const prefs = {
  async get<T>(key: string, fallback: T): Promise<T> {
    try {
      const { value } = await Preferences.get({ key });
      return value == null ? fallback : (JSON.parse(value) as T);
    } catch {
      return fallback;
    }
  },
  async set(key: string, value: unknown) {
    try {
      await Preferences.set({ key, value: JSON.stringify(value) });
    } catch {
      /* storage unavailable */
    }
  },
};
