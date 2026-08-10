# Hero Mode → iOS/Android via Capacitor — Setup Runbook

*This is the follow-the-steps guide to turn the PWA into real iOS/Android apps. The project is now fully scaffolded — `android/` and `ios/` are real native projects sitting in this folder, already containing Hero Mode's web build. You do NOT need to change the app's logic; you wrap it.*

---

## Status as of 2026-08-10

| Platform | Scaffolded | Buildable on this machine? | What's left |
|---|---|---|---|
| **Android** | ✅ `android/` project exists, synced, icons updated | **Yes** — just needs Android Studio installed | Install Android Studio → open → Run |
| **iOS** | ✅ `ios/` project exists, synced, 1024×1024 icon set | **Yes — Mac available** | Clone repo on Mac → `npm install` → `npm run cap:ios` → Xcode |

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

The app uses `window.HMNativeBridge` as its native interface. A no-op stub lives in `index.html`; the real implementation is in **`capacitor-bridge.js`** (project root), which imports real Capacitor plugins and overrides the stub. Add `'capacitor-bridge.js'` to the `FILES` array in `scripts/sync-www.js` when you're ready to enable it in native builds.

**Already installed and wired in `capacitor-bridge.js`:**

| Feature | Plugin | Bridge method |
|---|---|---|
| **Share sheet** | `@capacitor/share` v8.0.1 | `HMNativeBridge.share({blob, title, text, url})` |
| **Deep links** (workout import) | `@capacitor/app` v8.1.1 | `HMNativeBridge.onDeepLink(cb)` — listens for `heromode://` URLs |
| **Haptics** | `@capacitor/haptics` v8.0.2 | `HMNativeBridge.haptic('light'|'medium'|'heavy')` |
| **Push notifications** | `@capacitor/push-notifications` v8.1.2 | `HMNativeBridge.push.register()` |
| **Status bar** | `@capacitor/status-bar` v8.0.3 | `HMNativeBridge.setStatusBarDark()` — auto-called on load |

**Still needs account setup before install:**

| Feature | Plugin | Blocker |
|---|---|---|
| **Ads (free tier)** | `@capacitor-community/admob` | Needs Google AdMob account + App ID for each platform |
| **IAP / subscriptions** | `@revenuecat/purchases-capacitor` | Needs RevenueCat account + App Store / Play Store product IDs |
| **Apple Health / Health Connect** | `@capacitor-community/health` | Needs HealthKit entitlement (iOS) + Health Connect permission (Android) |

Install any plugin with `npm install <plugin>`, then `npm run cap:sync`.

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

**Already done ✅**
- All Android mipmap icons (mdpi → xxxhdpi, square + round + adaptive foreground)
- iOS 1024×1024 icon in AppIcon.appiconset
- Play Store 512×512 icon (`icon-play-store.png`)
- `privacy-policy.html` written (entity name + email TBD — update before submission)
- `store-listing.md` — full listing copy for both stores, screenshot shot list, Data Safety form answers
- `capacitor.config.json` — deep-link scheme, status bar, splash screen, cleartext disabled
- Premium gate stubs in index.html (ready for RevenueCat wiring)
- Capacitor bridge (`capacitor-bridge.js`) written for Share, App, Haptics, Push, StatusBar

**Still needed before submission ⬜**
- [ ] Form the legal entity (HeroMode LLC or Inc.) — update `privacy-policy.html` with full name
- [ ] Set up `contact_us@heromode.app` email inbox
- [ ] Host `privacy-policy.html` at a stable public URL (GitHub Pages works — enable in repo settings)
- [ ] Open Apple Developer account ($99/yr) + create app record in App Store Connect
- [ ] Open Google Play Developer account ($25 one-time) + create app in Play Console
- [ ] Set up AdMob account — add App IDs to iOS `Info.plist` and Android `AndroidManifest.xml`
- [ ] Set up RevenueCat — wire `hmInitiatePurchase()` and `hmRestorePurchase()` in index.html
- [ ] Add ATT permission usage description to iOS `Info.plist` (required for AdMob)
- [ ] Take screenshots in the 8-scene shot list (see `store-listing.md`)
- [ ] Sign release builds (iOS: Xcode signing + provisioning profile; Android: keystore)
- [ ] Test on real device via TestFlight (iOS) or internal testing track (Android)

⚠️ **Apple's cut:** 15% under $1M/yr via the Small Business Program (enroll after account creation), else 30%.  
⚠️ **Google's cut:** 15% under $1M/yr automatically, else 30%.  
⚠️ **HealthKit apps get extra scrutiny** — if you add HealthKit, Apple requires a justification for each data type. Don't add it until you're ready to explain the use case in the review notes.

---

## What's done vs. what's left

**Native scaffold**
- ✅ `HMNativeBridge` stub in `index.html` (safe no-ops on web)
- ✅ `capacitor-bridge.js` — real Capacitor plugin wiring (Share, App, Haptics, Push, StatusBar)
- ✅ `capacitor.config.json` — app ID, deep-link scheme (`heromode://`), dark theme, splash
- ✅ Manifest, service worker, safe-area handling
- ✅ `www/` build folder + `scripts/sync-www.js` + npm scripts
- ✅ `android/` project — real, synced, all icon sizes current
- ✅ `ios/` project — real, synced, 1024×1024 icon set

**Plugins installed**
- ✅ `@capacitor/app` v8.1.1
- ✅ `@capacitor/share` v8.0.1
- ✅ `@capacitor/push-notifications` v8.1.2
- ✅ `@capacitor/haptics` v8.0.2
- ✅ `@capacitor/status-bar` v8.0.3

**App store prep**
- ✅ All icon sizes generated from master plate
- ✅ `privacy-policy.html` — full cloud-data policy written
- ✅ `store-listing.md` — all listing copy, screenshot shot list, submission checklists
- ✅ Premium gate infrastructure in index.html

**Still needed**
- ⬜ Install Android Studio → first real Android build
- ⬜ On Mac: `npm run cap:ios` → first real iOS build
- ⬜ AdMob + RevenueCat accounts → wire IAP and ads
- ⬜ Developer accounts (Apple $99/yr, Google $25 one-time)
- ⬜ Legal entity + hosted privacy policy URL
- ⬜ Screenshots → store submission

*Android is one Android Studio install away. iOS: clone repo on Mac, `npm install`, `npm run cap:ios`.*
