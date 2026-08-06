# Hero Mode — Product Roadmap & Vision

*The north star. Fitness is the entry point; the goal is an operating system for becoming a better version of yourself. Every feature should reinforce one promise: **every day you use Hero Mode, you become a stronger version of yourself.***

---

## The core insight (the moat)

> The winner isn't decided by who tapped faster or spent more money. It's decided by **who lived better.** Your real life creates your Hero. That's what makes Hero Mode impossible to copy.

**Strategic consequence:** the part that's impossible to copy — your Hero Card, Hero Rating, and stats derived from real training — needs **no servers at all.** It's fully local and buildable today. The multiplayer shell (guild wars, PvP, shared bosses, seasons) is the *wrapper*, and it's the only part that requires a backend + accounts + real users.

**Build the local core first. It's the moat AND the marketing.** A Mythic Dragon Slayer card with real stats, posted to social, is the viral loop — at $0 infrastructure.

---

## Current state — v1 is feature-complete (local)

Already shipped and working, all offline/localStorage:

- **Goal-driven plan generator** — 6 goal types incl. 🏁 Race/Endurance (2-mile → marathon → triathlon), phased periodization, equipment-aware, editable per exercise.
- **Full tracking** — workouts, smart set logging + PRs, cardio (+ repeat-last), walks/GPS, nutrition (voice/text parse, never drops unknowns), recipes (favorite + reorder), measurements, progress photos, water, sleep/check-ins.
- **Gamification** — XP/levels/ranks (Rookie→Immortal), ~45 awards across 9 categories incl. gold trophies, daily quests + chest, comic-book story cut-scenes, daily recap + AI-style coach, flexibility/Zen systems.
- **Identity** — 15 themes (emblem/pattern/sound each), profiles with photo avatars, equippable titles, level-gated avatar frames + locked themes, synthesized sound engine, activation/level-up FX.
- **Ship-ready** — manifest.json, PWA icons, service worker (offline), backup nudge, first-run tour.

**Recommended before more building: get ~10 people using this daily.** Per the business plan, Phase 1 success = "100 people who use it every single day." Everything below is better designed after watching real users.

---

## Phasing model (tied to the business plan)

| Phase | Gate | Theme | Infra cost |
|---|---|---|---|
| **Now** | 0 users | Polish local core, get first daily users | ~$0 |
| **P1 — Hero Card** | still local | The shareable artifact (the moat + viral loop) | ~$0 |
| **P2 — Accounts** | ~100 daily users | Login, cloud backup, cross-device sync | tens/mo |
| **P3 — Social** | proven retention | Leaderboards, async PvP, friends | scales |
| **P4 — Guilds & Wars** | community exists | Guild wars, community bosses, seasons | scales |
| **P5 — Economy & IP** | brand | Gear collectibles, seasons reshape world, merch | — |

**The line that costs money:** everything from P2 on needs a backend (Supabase suggested), accounts, and brings privacy/moderation obligations (especially with minors). Don't cross it until retention is proven locally.

---

## P1 — The Hero Card (next local build, the flagship)

Fully local. The unit of comparison for everything later. Two faces:

**FRONT (live):** level, rarity-tier border/glow, hero art (theme emblem/avatar for now; commissioned art later), name, title, **Power Score**, guild crest, current streak. "Live" = subtle CSS animation (glow/pulse) that intensifies with rarity.

**BACK (stats, like a baseball card):** weekly stats (workouts, weight lifted, cardio, calories, sleep, protein %, water %), **Hero Rating**, current streak, total XP, top lifts.

**Shareable:** render to a PNG (canvas) so users post it. This is the marketing engine.

### Rarity tiers (by level — cosmetic, maps to card border)
Common `<10` · Uncommon `10–19` · Rare `20–29` · Epic `30–39` · Legendary `40–59` · Mythic `60–89` · Transcendent `90+`. Reuse existing theme colors + frame system.

### Hero Rating (0–100, A+ scale) — dynamic weekly number
Composite of data already tracked: workout completion, progressive overload, recovery, sleep, nutrition, hydration, consistency, streaks. Updates every Monday (the "card flip"). This likely becomes everyone's favorite number.

### Derived RPG stats (STR/END/VIT/AGI/DIS) — from real training
- **STR** ← lifting volume, PRs, heavy compound work
- **END** ← cardio minutes/distance, walks, long runs
- **VIT** ← recovery: sleep check-ins, water, rest days, stretch/yoga
- **AGI** ← conditioning/HIIT, cardio variety, plyometrics
- **DIS** ← streaks, consistency, quest + login completion
- **Power Score** ← weighted composite of all five

### The Monday flip (extends the daily recap)
Card flips to "Week N Results" — deltas, then the card visibly evolves: border upgrades, armor/title changes, rating ticks up. *You witness your Hero getting stronger because you did.*

---

## Guild identity (local now; war needs backend)

Picking a guild is **identity + a passive stat lean** — that part is local and cheap. Guild *war* is P4.

| Guild | Philosophy | Lean |
|---|---|---|
| ⚔ **Iron Legion** | Strength, powerlifting, bodybuilding | +STR, −AGI, heavy/high-HP |
| 🏹 **Emerald Rangers** | Running, cycling, HIIT, sport | +Speed, +Dodge, crits |
| 🔥 **Phoenix Order** | Weight loss, nutrition, consistency | +Healing, +Recovery |
| 🌊 **Tideborn** | Hydration, swimming, mental health | +Recovery, mana regen |
| ❄ **Frostguard** | Cold, sleep, breathing, recovery | Tank, +Defense |
| ⚡ **Storm Vanguard** | CrossFit, hybrid, explosive | Balanced/versatile |

Guild = culture and belonging ("Phoenix Order for life," like Hogwarts houses / MMO factions). Shared identity is hard for competitors to copy and could be a defining strength.

---

## Multiplayer systems (deferred — need backend + accounts + users)

- **Guild Wars** (monthly): guilds ranked by *aggregate member effort* (workouts = war energy), not clicks. Castle invasions fueled by earned Energy.
- **Async PvP:** Commander CJ (Lv 47) challenges Sarah (Lv 45); fight is **simulated from real-life stats**. Your habits are your strategy. Never live/pay-to-win.
- **Community bosses** (escalating): Goblin King (all) → Stone Golem (500k XP community) → Shadow Dragon (5M dmg, active heroes) → World Boss / Void Emperor (every workout counts).
- **Raid Nights** (Fri 8pm): your *workouts* unlock attacks; you watch the battle unfold.
- **Seasons** (quarterly): winning guild reshapes a shared world (fortress / blooming forest / floating islands). The community literally shapes the world.
- **Leaderboards:** players + guilds.

**Collectible GEAR, not heroes.** The Hero Card is permanent because it's *earned* — never tradable. Gear (Dragonfang Greatsword, Frost Crown, Phoenix Wings…) is the collectible layer: season/guild/raid/boss rewards. This diverges from Pokémon on purpose.

---

## Infra & risk notes

- **Data safety (current risk):** everything is localStorage — iOS can evict it, users clear caches. Backup nudge exists; the real fix is P2 cloud accounts. Mitigate with export reminders until then.
- **Art is the expensive part, not code.** The gorgeous mockup fidelity means commissioned/AI art assets + a big size increase for a single-file PWA. Build *systems* now with the emoji/SVG/CSS aesthetic; swap art in later. User photos in themed frames is the budget "Hero Forge" that ships today.
- **Minors + social:** any social/PvP feature adds moderation, privacy, and safety obligations. Design the P2 consent layer before shipping any of it. (Profile share-flags already exist for this.)

---

## Suggested order when we resume building

1. **Hero Card + Hero Rating + derived stats** (P1 — local, the moat, shareable).
2. **Guild identity selection** (local — belonging, sets up P4).
3. **Solo World Boss** (local — the boss hook, cumulative workouts = damage).
4. *— get real users, prove retention —*
5. **P2 backend:** accounts + cloud sync (the first paid infra; unlocks everything social).

*Captured 2026-07-13. Vision by the founder; local-vs-backend split and phasing added as engineering guidance.*

---

## Competitive gaps — things to build when we can

*Catalogued 2026-08-06. None of these are blockers for v1 — Hero Mode already competes on gamification depth and plan generation. These are the gaps that matter once we have real users and want to go head-to-head with paid apps.*

### Must-haves for a paid product (critical)

| Gap | Why it matters | Notes |
|---|---|---|
| **Push notifications** | Workout reminders, streak alerts, quest pings are the #1 retention driver. | Blocked until Capacitor native shell ships to App Store. Infrastructure is already scaffolded. |
| **Cross-device sync / cloud accounts** | Data is localStorage only — one phone swap = all history gone. Kills word-of-mouth. | Needs P2 backend (Supabase). Don't cross this line until ~100 daily users. |

> ✅ **Exercise video demos** — already shipped. 206 guided videos in `/MoveKit_Videos/`. Streamed, not cached.

### Meaningful competitive gaps

| Gap | Why it matters | Notes |
|---|---|---|
| **Social / friend activity** | Hevy, Strava, Fitbod all have friend feeds or leaderboards. Without a social layer there's no viral loop beyond the Hero Card share. | P3 in the phasing model. Needs accounts first. |
| **Searchable nutrition database** | Meal check-ins exist, barcode scanner exists, but there's no food lookup. MyFitnessPal wins every nutrition comparison until there's one. | Could integrate Open Food Facts (free, open-source) or USDA API. |
| **True AI adaptive programming** | Fitbod uses ML to adjust weight/volume based on performance + muscle recovery. Hero Mode has smart nudges and deload detection — good, not great. | Requires user history data at scale to train properly. |
| **Wearable integration** | Heart rate, HRV, sleep from Apple Watch / Whoop / Garmin feeds into recovery decisions. | HealthKit stub already in codebase. Wire to cardioCommitSession/sleep when native. |
| **Apple Watch / Wear OS app** | Logging sets from your wrist during a workout is a strong retention hook. | Needs native shell + significant extra dev. Long-term. |

### Nice-to-have (polish tier)

| Gap | Why it matters | Notes |
|---|---|---|
| **30-day / timed challenges** | Nike Training Club and others drive engagement with structured limited-time programs. | Could be built locally — no backend needed. |
| **In-workout audio coaching** | TTS cues, rep counts, rest countdowns with voice. Hands-free in the gym. | Web Speech API available now. |
| **Side-by-side progress photo comparison** | Body transformation is the #1 motivator. Showing before/after in one frame is powerful. | Photo storage already exists. Compare view is a UI addition only. |
| **Better onboarding funnel** | The goal-builder is solid but onboarding benchmarks (What's your bench? How far can you run?) would make the starting weights and plan far more accurate from day one. | Builds on the existing cold-start fix (hmStartWeight). |
| **Richer sound design** | WebAudio SFX engine exists but sounds are basic. A proper level-up fanfare, PR impact, and chest-open sound would sell the RPG feel hard. | Agreed deferred item — code-only, zero asset cost. |
| **CSV / health app data export** | Power users want their data portable. Also a trust signal. | CSV export already partially built. |
