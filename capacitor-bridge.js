/**
 * Hero Mode — Capacitor Native Bridge
 *
 * Loaded ONLY inside the native Capacitor shell (iOS/Android).
 * On the web PWA this file is not referenced, so window.HMNativeBridge
 * stays as the no-op stub defined inside index.html.
 *
 * To activate: add <script src="capacitor-bridge.js"></script> in index.html
 * AFTER the Capacitor core script, BEFORE the app's closing </body>.
 *
 * How to add to www/ sync:
 *   In scripts/sync-www.js, add 'capacitor-bridge.js' to the FILES array.
 */

import { App } from '@capacitor/app';
import { Share } from '@capacitor/share';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { PushNotifications } from '@capacitor/push-notifications';
import { StatusBar, Style } from '@capacitor/status-bar';

// ── Override the stub defined in index.html ───────────────────
window.HMNativeBridge = {

  // ── Share sheet ──────────────────────────────────────────────
  // Called by hmShareBridge() in index.html
  share: async ({ blob, title, text, url }) => {
    // Capacitor Share doesn't accept raw Blobs — convert to data URI first,
    // then let the OS share sheet handle it. On iOS this triggers the native
    // share extension; on Android it opens the intent chooser.
    if (blob) {
      const reader = new FileReader();
      const dataUri = await new Promise(res => {
        reader.onloadend = () => res(reader.result);
        reader.readAsDataURL(blob);
      });
      // @capacitor/share v6+ accepts files[] with base64 data URIs
      await Share.share({
        title: title || 'Hero Mode Workout',
        text:  text  || 'Check out my workout on Hero Mode!',
        url:   url   || 'https://heromode.app',
        files: [dataUri],
        dialogTitle: 'Share your workout',
      });
    } else {
      await Share.share({
        title: title || 'Hero Mode Workout',
        text:  text  || 'Check out my workout on Hero Mode!',
        url:   url   || 'https://heromode.app',
        dialogTitle: 'Share your workout',
      });
    }
  },

  // ── Deep link handler ────────────────────────────────────────
  // Called by hmCheckImportParam() in index.html on startup
  onDeepLink: (cb) => {
    App.addListener('appUrlOpen', (event) => {
      // event.url = "heromode://open?import=<b64>&ref=<name>"
      // or         "https://heromode.app/?import=<b64>&ref=<name>"
      try {
        const parsed = new URL(event.url);
        const importB64 = parsed.searchParams.get('import');
        const ref       = parsed.searchParams.get('ref');
        if (importB64) cb({ importB64, ref });
      } catch (e) {
        console.warn('[HMBridge] deep link parse error', e);
      }
    });
  },

  // ── Haptics ──────────────────────────────────────────────────
  haptic: async (style = 'medium') => {
    const styleMap = {
      light:  ImpactStyle.Light,
      medium: ImpactStyle.Medium,
      heavy:  ImpactStyle.Heavy,
    };
    await Haptics.impact({ style: styleMap[style] || ImpactStyle.Medium });
  },

  // ── Push notifications ───────────────────────────────────────
  push: {
    register: async () => {
      let perms = await PushNotifications.checkPermissions();
      if (perms.receive === 'prompt') {
        perms = await PushNotifications.requestPermissions();
      }
      if (perms.receive !== 'granted') return;
      await PushNotifications.register();
      PushNotifications.addListener('registration', (token) => {
        console.log('[HMBridge] push token:', token.value);
        // TODO: send token to your backend / RevenueCat
      });
    },
  },

  // ── Status bar ───────────────────────────────────────────────
  setStatusBarDark: async () => {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#0A0A08' });
  },
};

// Apply status bar styling immediately on native load
window.HMNativeBridge.setStatusBarDark().catch(() => {});

// Wire deep-link handler so imports work when app is opened via URL
if (typeof hmCheckImportParam === 'function') {
  hmCheckImportParam();
}

console.log('[HMBridge] Capacitor native bridge loaded.');
