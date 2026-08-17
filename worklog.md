# Yaadon ka Postcard — Project Worklog

## Project Status
**Phase:** MVP complete & browser-verified ✅
**Last updated:** Initial build

A nostalgic 90s/2000s Indian digital postcard web app with two journeys
(Sender + Receiver). Built with Next.js 16, TypeScript, Tailwind CSS 4, Prisma
(SQLite), Framer Motion, Zustand, and the full shadcn/ui component set.

---

Task ID: 1
Agent: main (Z.ai Code)
Task: Full initial build of the nostalgic postcard app — design system, DB,
API, sender flow, receiver flow, and end-to-end verification.

Work Log:
- Analyzed the user's uploaded layout image via VLM: confirmed vintage Indian
  postcard aesthetic with airmail borders, stamps, postmarks, handwritten
  typography, cream/burgundy palette, and a 6-step sender + 5-step receiver flow.
- Set up vintage design system in `src/app/globals.css`: aged paper grain/stains,
  airmail red/blue diagonal stripes, perforated postage stamp, circular postmark,
  wax seal, torn tape, ruled writing lines, vignette, vintage button styles,
  reveal/float/stamp-drop animations, custom scrollbars.
- Updated `src/app/layout.tsx` to load vintage Google fonts: Playfair Display
  (serif headers), Kalam (Indian handwriting feel), Caveat (cursive signature),
  alongside Geist for body/UI.
- Created Prisma schema (`prisma/schema.prisma`) with a `Postcard` model
  (token, receiverName, city, relationship, senderName, vibe, surpriseId,
  message, openedAt, revealedAt, createdAt). Pushed to SQLite via `db:push`.
- Built curated surprise data (`src/lib/surprises.ts`) with 4 vibes (Jolly,
  Romantic, Action, Classic) and 30+ surprises across Johnny Lever, Akshay
  Kumar, Javed Jaffrey, Salman Khan, Hrithik Roshan, Ranbir Kapoor, Emraan
  Hashmi — each with character, movie, quote, caption, emoji, accent colour
  and Tenor gif link where provided by the user.
- Built API routes:
  - `POST /api/postcards` — validates fields + vibe + surprise, generates a
    friendly 3-block token (e.g. `9NMG-QV8V-ZQKV`), persists postcard.
  - `GET /api/postcards/[token]` — returns postcard + surprise for receiver.
  - `PATCH /api/postcards/[token]` — marks opened/revealed timestamps.
- Built shared vintage components (`src/components/postcard/shared/`):
  `PaperBackground`, `AirmailBorder`/`AirmailDivider`, `PostageStamp`/`Postmark`,
  `WaxSeal`/`Tape`/`LoveRibbon`, and the central `PostcardCard` that renders
  the full postcard visual (header, address, ruled message, signature, wax
  seal, and a surprise slot that supports hidden/revealed/plain states).
- Built Sender flow (`src/components/postcard/sender/`):
  - `IntroScreen` — hero with floating stamps, "Create a Postcard" CTA,
    "why it's special" grid, footer tagline.
  - `DetailsScreen` — form (receiver name, city, relationship, sender name)
    + vibe selector (4 cards). Step pips in header.
  - `SurpriseScreen` — vibe-filtered grid of surprise cards with type badges
    (Meme/Dialogue/Song/Moment) and "Picked" indicator.
  - `MessageScreen` — textarea with ruled lines + live postcard preview side
    by side, plus "Inspire me" prompt generator and char counter.
  - `PreviewScreen` — final postcard with blurred surprise (tap to peek),
    "Generate Share Link" CTA calling the POST API.
  - `ShareScreen` — wax-seal success, token display, copyable link input,
    WhatsApp share button, copy-link button, "Preview as receiver" link,
    "Create another" reset.
- Built Receiver flow (`src/components/postcard/receiver/`):
  - `ReceiverSplash` — animated red Indian postbox with "LETTERS BHARAT",
    "DELIVERED" postmark, "You've got a Postcard!" + sender attribution,
    "Open Postcard" CTA, floating envelope.
  - `ReceiverView` — "Pehle message padho..." banner, postcard with message
    first and surprise locked/blurred, tap-to-reveal with animation, post-reveal
    "Make a Postcard" CTA.
  - `ReceiverFlow` — orchestrates loading / not-found / error / splash / view
    states, fetches postcard, marks opened & revealed via PATCH.
- Wired `src/app/page.tsx` with `useSyncExternalStore` to read the `?card=`
  query param without hydration mismatch; routes to ReceiverFlow if present,
  otherwise SenderFlow.
- Ran `bun run lint` — clean, 0 errors.
- Verified end-to-end with `agent-browser`:
  - Intro screen renders with stamps, hero, CTA, footer.
  - Details → fill form → pick Jolly vibe → Choose Surprise enabled.
  - Surprise grid shows all Johnny Lever / Akshay Kumar / Javed Jaffrey content.
  - Message screen shows live postcard preview with message + locked surprise.
  - Preview → tap blurred area reveals Johnny Lever "Abhi maza aayega" dialogue.
  - Generate Share Link → POST 200, token `9NMG-QV8V-ZQKV`, toast confirms.
  - Opened `/?card=9NMG-QV8V-ZQKV` → splash "You've got a Postcard! Priya ne
    bheja hai 💌".
  - Open Postcard → message shows first, surprise blurred.
  - Tap reveal → Johnny Lever surprise animates in, "Make a Postcard" CTA.
  - Invalid token → "Postcard kho gayi..." not-found screen with recovery CTAs.
  - Mobile (390px) layout verified clean & responsive by VLM.
  - VLM visual review confirmed: airmail borders, stamps, postmarks, wax seal,
    warm cream/burgundy palette, serif+handwritten typography mix all present.

Stage Summary:
- Full MVP delivered & browser-verified end-to-end (sender + receiver flows).
- Vintage 90s Indian postcard aesthetic faithfully implemented.
- All requested celebrities & memes integrated across 4 vibes.
- API + DB working (create / fetch / mark opened & revealed).
- Lint clean, dev server healthy, no runtime errors in dev.log.
- Artifacts: `src/lib/surprises.ts` (data), `src/lib/postcard-store.ts`
  (Zustand), `src/app/api/postcards/` (routes), `src/components/postcard/`
  (shared + sender + receiver components).

Unresolved issues / risks:
- None blocking. Tenor gif URLs are linked externally ("Watch the moment")
  rather than embedded, to avoid external JS dependency & keep the app
  self-contained. Could later add direct gif embedding if desired.
- The `openedAt`/`revealedAt` analytics are stored but not yet surfaced in a
  sender-facing dashboard (out of scope for "basic" per user's instruction).

Priority recommendations for next phase (for the recurring webDevReview):
- Add subtle ambient audio (postbox creak, paper rustle, stamp thud) — toggleable.
- Add an OG image / share preview so WhatsApp shows a postcard thumbnail.
- Add more curated surprises / periodic content refresh.
- Add a lightweight "postcards I've sent" recent-list via localStorage.
- Polish micro-animations (envelope open transition between splash → view).

---
Task ID: 2
Agent: webDevReview (round 2)
Task: QA the existing app via agent-browser + VLM, fix bugs, add polish and new
features (ambient sound, recent-sent list, receiver reactions, envelope-open
transition), verify end-to-end.

Work Log:
- Reviewed round-1 worklog; MVP was complete & stable.
- Ran `bun run lint` — clean (0 errors). Dev server healthy, no runtime errors.
- Performed thorough visual QA via agent-browser + VLM across all screens:
  - Intro, Details, Surprise grid, Message+preview, Preview, Share, Receiver
    splash, Receiver view, Reveal, Not-found.
  - VLM confirmed vintage aesthetic is strong; collected concrete polish notes:
    stamps need grounding/shadows, form fields need focus states, vibe cards
    need hover lift, footer icon ambiguity, ruled-line variance, etc.
- POLISH — postcard visual depth (`Stamp.tsx`):
  - Rewrote `PostageStamp` with proper notched perforated edge (radial-gradient
    scallops), drop shadow, inner frame line, ink-grunge overlay, paper-grain
    texture on the stamp body.
  - Rewrote `Postmark` with outer+inner dashed rings, ink-bleed texture
    overlay (multiply blend), rotated text, animated drop-in.
- POLISH — globals.css additions:
  - `.ruled-lines-margin` variant with red margin line (inland letter style).
  - New animations: `envelope-open` (3D perspective fold), `slide-up-fade`,
    `heartbeat` (splash CTA), `reaction-pop`, `nudge` (reveal hint), `sound-pulse`.
  - `.paper-fold` crease shadow, `.ink-stamp` approval-stamp style.
  - `.field-vintage:focus` — airmail-blue focus ring for form inputs.
  - `.vibe-card` / `.surprise-card` hover-lift utility classes.
  - `.reaction-chip` hover/active transitions.
- POLISH — DetailsScreen:
  - Vibe cards now use `.vibe-card` lift class (translateY + shadow on hover),
    selected state has stronger shadow + scale.
  - Form inputs use `.field-vintage` for airmail-blue focus ring.
  - Nav buttons aligned to consistent h-11 height, items-center.
- POLISH — SurpriseScreen:
  - Surprise cards use `.surprise-card` lift class + paper-grain + vignette,
    selected state stronger shadow.
- POLISH — IntroScreen:
  - Stamps now spring-drop in with staggered rotations, grounded by a shared
    baseline shadow strip.
  - Hero text leading tightened, "Hide a feeling" weight bumped to bold.
  - Feature cards stagger in with inset shadow.
  - Footer icon replaced ambiguous wax-seal with a clear postbox-style mail
    icon (burgundy box with slot).
- FEATURE — Ambient sound (`use-sound.ts` + `SoundToggle.tsx`):
  - Procedural Web Audio API sound effects (no external files): stamp thud,
    paper rustle, soft click, envelope open, magical reveal chime, success
    fanfare.
  - Floating toggle (bottom-right, fixed) with pulse animation when enabled.
  - Persisted to localStorage via `useSyncExternalStore`.
  - Wired into: intro "Create" (stamp), preview reveal (reveal/reveal),
    re-hide (paper), generate (stamp→success), receiver open (open),
    reveal (reveal), reaction click (click).
- FEATURE — "Postcards I've sent" recent list (`use-sent-postcards.ts` +
  `SentPostcardsList.tsx`):
  - Records created postcards in localStorage (max 6), shown on intro screen
    below feature cards.
  - Each record: mini vibe stamp, "To: name · city", "Vibe · from sender",
    open-as-receiver + delete buttons.
  - Uses `useSyncExternalStore` with in-memory cache for stable snapshots
    (avoids infinite re-render).
  - Sender flow records new postcards on link generation.
- FEATURE — Receiver emoji reactions (`ReactionBar.tsx` + API + DB):
  - Added `reaction` column to `Postcard` model, pushed to SQLite.
  - PATCH `/api/postcards/[token]` now accepts `action: "react"` + `reaction`.
  - GET returns `reaction`; receiver view hydrates initial selection.
  - 6 reactions (Hansi/Pyaar/Rula diya/Aag/Wah!/Jadoo ki jappi) with pop
    animation, floating emoji burst on tap, confirmation text, checkmark on
    selected. Appears after reveal.
- FEATURE — Envelope-open transition (`ReceiverFlow.tsx`):
  - Splash → "opening" phase (wax seal folds back in 3D perspective, 0.7s)
    → postcard view slides up with fade.
  - Sound "open" plays during transition.
- BUG FIX: Prisma client was stale after adding `reaction` column — ran
  `bun run db:generate` + restarted dev server so PATCH/GET include reaction.
- BUG FIX: `useSentPostcards` initially caused infinite re-render because
  `getSnapshot` returned a new array each call. Fixed with an in-memory cache
  invalidated on writes.
- BUG FIX: Import path typo `@lib/` → `@/lib/` in PreviewScreen caused
  module-not-found; fixed.
- Verification (agent-browser + curl):
  - Created postcard (Aarav/Delhi/Bhai/Meera, Jolly, Johnny Lever surprise) →
    token V2CD-R6VS-3YKK generated, success toast.
  - Returned to intro → "Postcards you've sent" section shows the record
    (mini stamp, receiver, vibe, open/delete buttons). VLM confirmed polished.
  - Opened receiver link → splash "Meera ne bheja hai 💌" → Open Postcard →
    envelope-open transition → postcard view → "Pehle message padho..." →
    tap reveal → Johnny Lever surprise + reaction bar + CTA.
  - Tapped ❤️ (Pyaar) → "Pyaar bhej diya ✓" + checkmark on chip.
  - curl PATCH `{"action":"react","reaction":"heart"}` → 200 `{"ok":true,
    "reaction":"heart"}`; subsequent GET returns `"reaction":"heart"`.
    Confirmed persisted to DB.
  - VLM confirmed: reaction bar well-integrated & on-theme, selected reaction
    clearly indicated, post-reveal CTA polished.
  - `bun run lint` clean, dev.log shows all 200s with `reaction` column in
    Prisma queries, no runtime errors.

Stage Summary:
- All 4 polish areas + 4 new features delivered & verified.
- Postcard visuals deepened (perforated stamps, ink-bleed postmarks, paper
  grain, focus rings, card hover lifts).
- Ambient sound system (procedural, no files) with persistent toggle.
- "Postcards I've sent" localStorage recent list with open/delete.
- Receiver emoji reactions persisted to DB (6 reactions, pop animations).
- Envelope-open 3D transition between splash and postcard view.
- Lint clean, all API + DB + UI verified end-to-end.
- Artifacts: `src/hooks/use-sound.ts`, `src/hooks/use-sent-postcards.ts`,
  `src/components/postcard/shared/SoundToggle.tsx`,
  `src/components/postcard/sender/SentPostcardsList.tsx`,
  `src/components/postcard/receiver/ReactionBar.tsx`,
  updated `Stamp.tsx`, `globals.css`, `IntroScreen.tsx`, `DetailsScreen.tsx`,
  `SurpriseScreen.tsx`, `PreviewScreen.tsx`, `ReceiverFlow.tsx`,
  `ReceiverView.tsx`, `page.tsx`, `schema.prisma`, API routes.

Unresolved / notes:
- Dev server process management in this sandbox requires keeping commands
  within a single bash session (background processes die between sessions).
  The system auto-runs `bun run dev` at session start; manual restarts use
  `nohup ./node_modules/.bin/next dev -p 3000`.
- Tenor gif URLs remain externally linked (not embedded) to keep the app
  self-contained.

Priority recommendations for next round:
- Add OG image / share preview so WhatsApp shows a postcard thumbnail.
- Add a "sender sees receiver's reaction" view (poll the reaction field).
- Add more curated surprises / periodic content refresh.
- Add subtle ambient background loop (postbox ambience) when sound is on.
- Add keyboard accessibility pass (focus traps in modals, tab order).

---
Task ID: 3
Agent: webDevReview (round 3)
Task: QA the app via agent-browser + VLM, fix any bugs, add OG share image +
delivery-status polling + polish, verify end-to-end.

Work Log:
- Reviewed round-1 & round-2 worklogs; MVP + polish (sound, recent list,
  reactions, envelope transition) all complete & stable.
- Ran `bun run lint` — clean (0 errors). Dev server health verified.
- Performed visual QA via agent-browser + VLM: intro rated 8.5/10, receiver
  splash strong. VLM suggested: hero stamps could sway, feature cards need
  more depth, CTA tactile shadow, integrate "tap to open" below button,
  postbox float animation, and OG share image for WhatsApp previews.
- FEATURE — Dynamic OG share image (`src/app/api/og/route.tsx`):
  - Uses `next/og` ImageResponse to generate a 1200x630 PNG per postcard.
  - Shows: "Yaadon ka Postcard" header, postmark (DELIVERED · CITY), "To:
    RECEIVER (relationship)" line, vibe stamp, message hook, sender signature,
    and a mystery surprise strip ("A hidden Bollywood surprise awaits" —
    deliberately doesn't spoil the specific character for click-through).
  - Airmail red/blue diagonal stripes top & bottom.
  - `runtime = "nodejs"` (Prisma needs node, not edge); `force-dynamic`.
  - Renamed route.ts → route.tsx (Satori JSX needs .tsx extension).
  - Fixed Satori error: all multi-child divs now have explicit `display: flex`.
  - VLM rated the OG image 8.5/10: "production-ready, will perform very well
    as social share creative... emotional weight of seeing your name on a
    postcard is a powerful psychological trigger."
- FEATURE — Dynamic OpenGraph metadata (`src/app/page.tsx` server component):
  - Refactored page.tsx into a server component with `generateMetadata` that
    reads `?card=` from searchParams and returns card-specific OG title,
    description, image URL (pointing to `/api/og?token=...`), twitter card.
  - Extracted client logic into `src/app/HomeClient.tsx`.
  - Added `NEXT_PUBLIC_SITE_URL` env var for absolute OG URLs.
  - Default (sender) metadata for the non-card route.
- FEATURE — Sender delivery status (`DeliveryStatus.tsx`):
  - New card on the ShareScreen that polls `GET /api/postcards/[token]` every
    20s to show: (1) Postcard posted ✓, (2) Receiver opened it (with timeAgo),
    (3) Surprise revealed (with timeAgo).
  - When receiver reacts, shows the emoji reaction large with spring pop +
    "Yay! Message pohonch gaya dil tak. 💌".
  - Manual refresh button, auto-refresh indicator, Hinglish micro-copy.
  - Integrates with existing `openedAt`/`revealedAt`/`reaction` DB fields.
- POLISH — IntroScreen:
  - All 3 hero stamps now have gentle sway animations (rotate keyframes,
    staggered delays) on top of the existing spring-drop + float.
  - Feature cards: deeper with `inset 0 0 14px` shadow + white inset top +
    drop shadow + paper-edge accent stripe + hover lift (whileHover y:-3) +
    larger emoji with drop-shadow.
- POLISH — ReceiverSplash:
  - Postbox now floats (y axis bobbing) in addition to the rotate sway.
  - "tap to open" hint moved cleanly BELOW the button (was awkwardly beside),
    centered with the hand icon.
- QA tooling: built a robust `ref()` bash helper using `agent-browser
  snapshot -i` + `grep -oE 'e[0-9]+' | tail -1 | sed 's/^/@/'` for reliable
  element ref extraction across navigations (refs go stale on page change).
- End-to-end verification (agent-browser + curl, single session):
  - Full sender flow: Vikram/Jaipur/School Friend/Anjali → Jolly → Johnny
    Lever surprise → message → preview → generate → token KMB5-X3VT-5RBG.
  - Form fields filled correctly (verified via snapshot).
  - OG image: `curl /api/og?token=KMB5-X3VT-5RBG` → HTTP 200, 58KB PNG,
    1200x630, content-type image/png. VLM confirmed all elements present.
  - Receiver flow: splash → Open → postcard view → Tap to reveal → reaction
    bar → tapped ❤️ (Pyaar) → "Pyaar bhej diya ✓".
  - DB state confirmed via curl GET: openedAt, revealedAt, reaction="❤️"
    all persisted correctly.
  - VLM analysis of share screen confirmed Delivery Status card renders with
    3-step timeline, refresh button, auto-refresh indicator, on-theme styling.
  - `bun run lint` clean, dev.log shows all 200s, no runtime errors.

Stage Summary:
- 3 new features delivered & verified: dynamic OG share image, dynamic OG
  metadata, sender delivery-status polling card.
- 2 polish areas: intro stamps sway + feature card depth, receiver splash
  postbox float + tap-to-open placement.
- OG image is production-ready (8.5/10 VLM) — WhatsApp/social link shares
  now show a personalized vintage postcard thumbnail.
- Delivery status lets senders see when their postcard was opened/revealed
  and what reaction the receiver sent back — closes the emotional loop.
- Lint clean, full E2E verified (sender→generate→OG→receiver→reveal→react→DB).
- Artifacts: `src/app/api/og/route.tsx`, `src/app/page.tsx` (server),
  `src/app/HomeClient.tsx`, `src/components/postcard/sender/DeliveryStatus.tsx`,
  updated `ShareScreen.tsx`, `IntroScreen.tsx`, `ReceiverSplash.tsx`, `.env`.

Unresolved / notes:
- OG image uses `runtime = "nodejs"` (not edge) because Prisma requires node.
  This is fine for the current SQLite setup; if scaling, consider a separate
  edge-friendly data source for OG lookups.
- The `NEXT_PUBLIC_SITE_URL` defaults to localhost; in production it should
  be set to the real domain so OG image URLs are absolute.
- Dev server process management in this sandbox: background processes die
  between bash sessions. All testing done within single bash invocations
  using a robust `ref()` helper with `agent-browser snapshot -i`.

Priority recommendations for next round:
- Add a "copy postcard image" button (download the OG PNG to share directly).
- Add more curated surprises / periodic content refresh.
- Add keyboard accessibility pass (focus traps, tab order, aria-labels).
- Add a "remix this postcard" option on the receiver view (create your own
  with the same vibe but different surprise).
- Consider ambient background loop (postbox ambience) when sound is on.
