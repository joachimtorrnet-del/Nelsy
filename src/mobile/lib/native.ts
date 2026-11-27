import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Preferences } from '@capacitor/preferences';

export const isNative = () => Capacitor.isNativePlatform();

/**
 * Open a website page outside the app (system browser).
 * Capacitor sends navigations to non-app URLs to Safari / Chrome, so window.open is enough here.
 * Used for plan management on purpose: subscriptions are bought on the website, never in-app.
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

/** Native chrome setup. No-op in the browser. */
export async function initNativeShell(onBack: () => void) {
  if (!isNative()) return;
  try {
    await StatusBar.setStyle({ style: Style.Light });
    if (Capacitor.getPlatform() === 'android') {
      await StatusBar.setOverlaysWebView({ overlay: true });
    }
  } catch {
    /* status bar plugin unavailable */
  }
  void App.addListener('backButton', ({ canGoBack }) => {
    if (canGoBack) onBack();
    else void App.exitApp();
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
