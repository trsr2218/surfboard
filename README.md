# Surfboard

A build by **N3M3SIS** for the ZABAL Gamez (The ZAO x Songchainn.xyz).

Surfboard is a fun, mobile-first, roughly two minute on-ramp that gets musicians into web3
with no technical background, then points them at the two opportunities on the table:

1. **Songchainn** — own your music on-chain and get paid direct.
2. **The ZABAL Gamez** — enter the Cypher by uploading a 60 second verse through Songchainn and
   compete for the prize pool.

## Files

- `index.html` — the Surfboard app: hero, an interactive 5 card web3 learn deck (benefits heavy,
  honest on risks), a intro to N3M3SIS, the Songchainn opportunity, the ZABAL Gamez Artist track
  with how-to-enter steps, prize pool and timeline, and the onboard call to action.
- `invite.html` — a personal invitation from N3M3SIS to artists, linking into the app.

## Run

Open `index.html` in any browser. No build step, no dependencies. Fonts load from Google Fonts
when online, with system font fallbacks offline.

## Before launch (open items)

- Wire the **Onboard now** button (`#onboardBtn` in `index.html`) to the live wallet / Songchainn
  connect flow. It is currently a placeholder.
- Drop in the real **Songchainn upload** link and the ZABAL **/enter** link.
- Add N3M3SIS real bio details and photo (current copy is role based and intentionally not fabricated).

## Design

Neon on near black: magenta `#FF2E8C`, gold `#FFB627`, cyan `#3EE6E0` on ink `#0B0710`.
Type: Anton (display), Space Grotesk (body), JetBrains Mono (labels).
