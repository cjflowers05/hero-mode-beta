# Hero Mode → iOS/Android via Capacitor — Setup Runbook

*This is the follow-the-steps guide to turn the PWA into real iOS/Android apps. The project is now fully scaffolded — `android/` and `ios/` are real native projects sitting in this folder, already containing Hero Mode's web build. You do NOT need to change the app's logic; you wrap it.*

---

## Status as of 2026-07-27

| Platform | Scaffolded | Buildable on this machine? | What's left |
|---|---|---|---|
| **Android** | ✅ `android/` project exists, synced | **Yes** — just needs Android Studio installed | Install Android Studio → open → Run |
| **iOS** | ✅ `ios/` project exists, synced | **No — hard blocker** | Needs a Mac (see below). No workaround; Xcode is Apple-only. |

Both platforms use **`npm run cap:android`** / **`npm run cap:ios`** to re-sync the latest web code and open the native IDE — see below.

---

## How the pieces fit together

```
Current/
├── index.html, manifest.json, sw.js, icon-*.png   ← the LIVE dev copy (edit these)
├── www/                                            ← Capacitor's web root (generated)
├── android/                                        ← real Android Studio project (generated)
├── ios/                                             ← real Xcode project (generated)
├── scripts/sync-www.js                             ← copies root → www/
└── package.json                                    ← npm scripts below
```

You keep developing exactly like before — editing `index.html` at the project root, testing with the local dev server. **`www/`, `android/`, and `ios/` are generated** from that root copy; nothing hand-edits them directly except native-only config (app icons, splash colors, permissions).

### The npm scripts
```bash
npm run sync-www      # copies index.html/manifest/sw/icons → www/
npm run cap:sync       # sync-www, then push www/ into both android/ and ios/
npm run cap:android    # sync-www + sync + opens Android Studio
npm run cap:ios        # sync-www + sync + opens Xcode (Mac only)
```

Run `npm run cap:android` (or `cap:ios`) any time you want the native app to reflect your latest web changes — that's the whole "update the app" loop.

---

## Android — do this next

1. **Install Android Studio** (free): https://developer.android.com/studio
2. First launch walks you through installing the Android SDK — accept the defaults.
3. From this folder, run:
   ```bash
   npm run cap:android
   ```
   This syncs the latest code and opens the project in Android Studio.
4. In Android Studio: pick a device (an emulator it creates for you, or your own phone via USB with Developer Mode on) → press **Run** (▶).
5. That's a real, installed Hero Mode app on Android. No account needed yet — the **$25 one-time Google Play Developer fee** is only required when you're ready to publish publicly.

---

## iOS — blocked on Mac access only

Everything code-side is done — `ios/App/` is a real Xcode project with Hero Mode already inside it, using **Swift Package Manager** (not CocoaPods), which means no extra Mac-side dependency wrangling once you're there.

**What you need:** any Mac (yours, borrowed, or a rented cloud Mac — services like MacinCloud run ~$20–30/mo if buying one isn't in the cards) with Xcode installed (free from the App Store).

When you have Mac access:
1. Copy this whole project folder to the Mac (or `git clone` if it's pushed to GitHub).
2. `npm install` (installs the same Capacitor packages fresh).
3. `npm run cap:ios` — opens the already-scaffolded project in Xcode.
4. In Xcode: sign in with your Apple ID (Settings → Accounts), select your Team on the project's Signing tab, pick a simulator or your iPhone → **Run**.
5. Free up through "runs on a real iPhone via cable." The **$99/yr Apple Developer account** is only required for TestFlight and App Store distribution.

---

## Wire the native features (the payoff)

The app already calls into `window.HeroNative` — these are the hook points. Install the plugins and fill the `NATIVE TODO` stubs in the **HERO NATIVE BRIDGE** script block at the bottom of `index.html`.

| Feature | Plugin | Where it plugs in |
|---|---|---|
| **Apple Health / Health Connect** | `@capacitor-community/health` (or `capacitor-health`) | `HeroNative.health.requestPermission()` + `syncToday()` → feed imported workouts to `cardioCommitSession()`, steps to the walk tracker, sleep to `ciSaveSleep()` |
| **Push notifications** | `@capacitor/push-notifications` | `HeroNative.push.register()` — streak/quest reminders |
| **Haptics** | `@capacitor/haptics` | `HeroNative.haptics.tap()` — already called-ready |
| **Durable storage** | `@capacitor/preferences` | Optional: mirror critical keys (`heromode_*`, `hero-*`). *Note: localStorage in a native WKWebView is already durable — it is NOT subject to Safari's 7-day eviction, so this is a nice-to-have, not urgent.* |
| **Status bar / splash** | `@capacitor/status-bar`, `@capacitor/splash-screen` | Dark theme already set in `capacitor.config.json`; the web splash screen (`#hero-splash` in `index.html`) already covers the "first paint" moment even without this plugin |

The **"Sync Health"** card is already built — it stays hidden on web and auto-appears at the top of the Train tab when running natively (`HeroNative.mountHealthUI()`).

Install any of these with e.g. `npm install @capacitor/haptics`, then re-run `npm run cap:sync`.

---

## Test with real people — TestFlight (iOS)

Free with the Apple Developer account, and the fastest way to get iPhones running it:
1. In Xcode: set your Team, a unique bundle id (`com.heromode.app`), and Archive.
2. Upload to **App Store Connect** → TestFlight.
3. **Internal testers** (up to 100, your own team) — no review, minutes.
4. **External testers** (up to 10,000) — a light "beta review," usually same-day.

## Test with real people — Android

- **Internal testing track** on Google Play Console — instant, up to 100 testers via a shareable link.
- Or just hand someone the APK directly (`android/app/build/outputs/apk/`) — no store needed at all for a handful of testers.

---

## Publish checklist (when ready)
- App icons (have them ✅) + iOS screenshot set (per device size)
- **Privacy policy URL** (required — especially with Health data)
- App Store / Play Store privacy "nutrition label": declare what data you collect (health data is sensitive — declare honestly)
- Age rating
- **Apple's cut:** 15% under $1M/yr via the Small Business Program (enroll), else 30%. **Google's cut:** 15% under $1M/yr automatically, else 30%.
- ⚠️ **HealthKit apps get extra scrutiny** — you must not use Health data for advertising, and must explain each data type's use. Read Apple's HealthKit review guidelines.
- ⚠️ **The moment accounts/social/leaderboards ship:** privacy law kicks in (COPPA if under-13 users, GDPR/CCPA). Get real legal counsel then — see the Forge's Book 17.

---

## What's done vs. what's left

- ✅ `HeroNative` bridge in `index.html` (inert on web, hook points for native)
- ✅ Native-only "Sync Health" UI that self-mounts
- ✅ `capacitor.config.json` (app id, dark theme, splash)
- ✅ Manifest, service worker, icons, safe-area handling
- ✅ `www/` build folder + `scripts/sync-www.js` + npm scripts
- ✅ `android/` project — real, synced, ready to open in Android Studio
- ✅ `ios/` project — real, synced, ready to open in Xcode (needs a Mac to actually open)
- ⬜ Install Android Studio → first real Android build
- ⬜ Get Mac access → first real iOS build
- ⬜ Wire native plugins (Health, push, haptics) once you're testing on real devices
- ⬜ Dev/Play Store accounts when ready to distribute beyond your own devices

*Android is one Android Studio install away. iOS is one Mac away. No app logic needs to change for either.*
