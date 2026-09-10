# Surfboard

A build by **N3M3SIS** (ZABAL Gamez Season 1 artist champion) for The ZAO x $ONGCHAINN.

Surfboard is the pro onboarding for anyone who wants to get onchain: musicians, creators,
builders, and the just curious. Mobile-first, one HTML file, no build step. Eight short
lessons, a hands-on exercise at the end of each one, N3M Respect points, and an
"Onchain Ready" certificate at the finish.

## What is in the app (`index.html`)

1. **Pick your path** - Musician / Creator / Builder / Just curious. Same lessons for
   everyone; the path changes the hero copy, the closing call to action, and which
   "first move" the course recommends at the end.
2. **The course** - 8 lessons in an accordion with a progress meter, a hero progress ring
   for returning visitors, and a floating "Continue lesson N" bar on mobile.

   | # | Lesson | Exercise |
   |---|--------|----------|
   | 1 | Why onchain, in 2 minutes | 5-card swipe deck, then a 3-question check |
   | 2 | Get your wallet (Phantom, MetaMask) | "Share or never?" sorter (address vs seed phrase) |
   | 3 | Stay safe out here | Spot the scam: 6 inbox messages, legit or scam |
   | 4 | Move money like a pro (Base, gas) | Address check with highlighted diffs + send simulator |
   | 5 | Tokens, coins and NFTs | Match the word |
   | 6 | Cash in, cash out (Binance P2P, Shwa) | Order the steps of a P2P cash-out |
   | 7 | Show up onchain (X, Farcaster, Basename) | Build your bio, with live preview and copy |
   | 8 | Own your work, get paid | Live split / resale royalty calculator + commit to a first move |

   Every completed lesson pays +1 N3M Respect. Finishing all eight pays +3, unlocks the
   certificate (name, date, `SB-XXXXXX` id, share button), and fires confetti.
3. **Web2 vs Web3**, **the lingo game** (12 terms + 8-question quiz, +2 points), and the
   members-only **Deep Dives** (royalties, coins on Base, promotion, next-level safety,
   Artist Worlds).
4. **$ONGCHAINN, Phase 3** - the three phases (Audience first, Music Marketplace, Artist
   Worlds), what is real today (VR walk-in, the Parlour, coin-as-key), the 50 founding
   world places, and links to claim an artist account, walk the worlds, or open the builder.
5. **The ZABAL Gamez, history** - Season 1 (June 1 to August 31, 2026) results: artist
   N3M3SIS with "The Call Out", builder ghostmintops (Proof Drop), creator uniquebeing404
   (ColorZAO); 31 workshops, 31 projects, 15 entrants; Finals live on WaveWarZ.
6. N3M3SIS bio, Ask-AI prompts, the community lineup, the Tech Education Hub teaser, and
   the closing call to action.

`invite.html` is the personal invitation from N3M3SIS that links into the app.

## The Surf Club layer (accounts, points, DMs, guardian)

All stored on-device in localStorage, no backend needed:

- **Surfer pass** - Google Sign-In (set `googleClientId` in CONFIG) or a local artist pass.
  Joining pays +5 N3M Respect and unlocks the Deep Dives.
- **N3M Respect** - join +5, each lesson +1, full course +3, lingo quiz +2, feedback +1 a day.
  At 5 points the reward unlocks (musicians: free upload + coin on $ONGCHAINN, claimed as
  an `N3M-XXXXX` code in the profile; everyone: the Pro badge).
- **Notifications**, **DMs** with the N3M3SIS guide bot (knows the lessons, wallets, coins,
  Phase 3 worlds, the Gamez history, cash-out, safety), and a "+1 Feedback" mode.
- **The Guardian** - no raw errors, ever. JS errors and connection drops show a polite
  overlay with a countdown, rotating tips and a feedback box.

## Device-aware layout

A tiny inline script in the head sets `data-device` on `<html>` before first paint:
`mobile` (phones), `tablet` (iPad, Android tablets), or `desktop` (mouse and keyboard).
Phones and tablets get the app layout: glass app bar, bottom tab bar, bottom sheets.
Real desktops at 1024px and wider get the desktop shell: a fixed left sidebar (brand, nav,
sub links, start button), a centered 720px column with a sticky column title, and, from
1340px, a right rail with the live progress widget, quick links and the N3M3SIS card.
A desktop window narrower than 1024px falls back to the app layout.

## Auto update, no cache clearing

There is no service worker. `index.html` and `version.json` are served with
`no-store` (see `vercel.json`). Every build stamps a version into the page and writes
the same value to `version.json`. The page checks that file (with a cache buster) on
load, on focus, when the connection returns, and every 3 minutes. When a newer build is
live it reloads silently the next time the tab is hidden, or shows a "Surfboard just got
an update, Refresh" pill while the tab is in use. To ship an update: change the version
string in `version.json` and the `SB_VERSION` constant in `index.html` together
(the build script does both).

## Storage keys

`sb_course` (lesson progress, path, certificate id, exercise state), `sb_bio`,
`sb_profile`, `sb_n3m_points`, `sb_notifs`, `sb_dms`, `sb_reward`, `sb_feedback`,
`sb_milestones` (once-per-device analytics events), `sb_n3m_respect` (lingo badge).
The course engine, the exercises and the desktop shell all read the same keys.

## Run

Open `index.html` in any browser, or serve the folder with any static server. No build
step, no dependencies. Fonts load from Google Fonts when online, with system fallbacks.

## Go live: the links

The `CONFIG` block at the top of the `<script>` in `index.html` holds every outbound link:

```js
const CONFIG = {
  songchainnUrl: "https://songchainn.xyz",
  claimUrl:      "https://songchainn.xyz/claim",
  worldsUrl:     "https://songchainn.xyz/worlds",
  builderUrl:    "https://songchainn.xyz/world-builder",
  callOutUrl:    "https://www.songchainn.xyz/n3m3sis/the-call-out",
  resultsUrl:    "https://zabalgamez.com/results",
  aboutUrl:      "https://zabalgamez.com",
  zoraUrl:       "https://zora.co",
  basenameUrl:   "https://www.base.org/names",
  farcasterUrl:  "https://warpcast.com",
  googleClientId:"",   // Google OAuth Web client ID -> real "Sign in with Google"
  feedbackUrl:   ""    // optional webhook / Formspree endpoint for feedback JSON
};
```

An empty URL shows a friendly "opens soon" modal instead of a dead link.

## Analytics

Vercel Web Analytics with custom events: `first_visit`, `path_pick`, `lesson_open`,
`lesson_complete`, `course_complete`, `first_move`, `cert_share`, `deck_complete`,
`wallet_done`, `onboarded`, `lingo_quiz`, `n3m_points`, `signup`, `cta_click`,
`outbound_click`, `guardian_shown`, and more. Milestones fire once per device.

## Deploy

Vercel (project root = this folder, `vercel.json` sets no-cache headers for HTML and the
self-destructing `sw.js`). Live at `https://surfboard.diyama.online/`. GitHub Pages works
too: Settings, Pages, Deploy from branch `main` / root.

## Design

Neon on near black: magenta `#FF2E8C`, gold `#FFB627`, cyan `#3EE6E0`, green `#5BF29A`
on ink `#0B0710`. Type: Anton (display), Space Grotesk (body), JetBrains Mono (labels).
No em dashes in UI copy.
