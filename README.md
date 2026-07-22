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

## Go live: paste your links

Open `index.html`, find the `CONFIG` block near the top of the `<script>`, and fill in the URLs:

```js
const CONFIG = {
  onboardUrl:   "",  // live wallet / Songchainn connect flow
  songchainnUrl:"",  // upload your verse
  enterUrl:     ""   // ZABAL Gamez entry
};
```

Until `onboardUrl` is set, the "Onboard now" button shows a friendly "opens soon" modal instead of
a dead link. Set it and the button opens the real flow. No other code changes needed.

## Deploy (GitHub Pages)

1. Repo Settings, Pages, Source: Deploy from a branch, Branch: `main` / root.
2. Live at `https://trsr2218.github.io/surfboard/`.
3. The social share meta and `og.png` already point at that URL. If you use a custom domain,
   update the `og:url`, `twitter:image` and canonical URLs in both HTML files.

Validate the share preview with the Facebook Sharing Debugger and X Card Validator after deploy.

## Still to confirm before public launch

- Add N3M3SIS real bio details and photo (current copy is role based and intentionally not fabricated).
- Confirm the prize numbers and dates with the ZABAL Gamez organisers (the source page lists dates as TBD).

## Design

Neon on near black: magenta `#FF2E8C`, gold `#FFB627`, cyan `#3EE6E0` on ink `#0B0710`.
Type: Anton (display), Space Grotesk (body), JetBrains Mono (labels).
