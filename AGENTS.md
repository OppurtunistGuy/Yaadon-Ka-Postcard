# Project Rules & Architectural Guidelines — Yaadon Ka Postcard

This document defines mandatory operational rules, architectural guidelines, privacy standards, and the deployment workflow for **Yaadon Ka Postcard**.

---

## 1. Mandatory Deployment Workflow & Dual Approval Gates

Follow this exact 9-step workflow with dual approval gates for **EVERY** code change:

```
[1. Local Development]
       ↓
[2. Local Build & Test] (bun run dev / bun run build / E2E test suites)
       ↓
[3. Report Local Changes & Issues]
       ↓
🛑 APPROVAL GATE #1: Wait for User Explicit Approval
       ↓
[4. Deploy to UAT Branch (`uat`)]
   URL: https://postcard-yadon-ka-git-uat-thinkable-co.vercel.app/
       ↓
[5. Test UAT Deployment]
       ↓
🛑 APPROVAL GATE #2: Wait for User Second Explicit Approval
       ↓
[6. Deploy to Production Branch (`main`)]
   URL: https://postcard-yadon-ka.vercel.app/
```

### Strict Deployment Constraints:
- **Never push directly to production (`main`)**.
- **Never push to UAT (`uat`) without user approval after local testing**.
- **Never promote UAT $\rightarrow$ Production automatically**.
- **Approval Chain**: `LOCAL ✅ → USER APPROVAL #1 → UAT ✅ → USER APPROVAL #2 → PRODUCTION`.
- **No Approval = NO Deployment**.

---

## 2. Postcard Short Link Architecture

- Postcard URLs MUST ALWAYS follow the format: `/p/<8-char-shortId>` (e.g. `/p/a7K9xQ2m`).
- **NEVER** place any of the following inside the URL:
  - Postcard JSON payload
  - Encrypted / encoded payload
  - JWT tokens
  - Base64 data
  - Recipient or sender names
  - Message text
  - GIF / media URLs or theme IDs
- All postcard payloads are stored server-side (SQLite / Prisma) and fetched strictly by 8-character token.

---

## 3. Receiver Mobile Presentation Rules

1. **Header Text**:
   - Never show `"Inland Postcard · Bharat"`.
   - Title: `Yaadon ka Postcard`.
   - Ribbon / Subtitle:
     - Classic: `♡ POSTED WITH LOVE ♡`
     - Rakhi: `🌸 RAKHI SPECIAL 🌸`
     - Ganpati: `☘ GANPATI BAPPA MORYA ☘`
2. **Stamp & Postmark**:
   - Fixed-size `92px x 92px` stamp container (zero layout shift).
   - Classic: Timestamp postmark only (`POSTED` / `<CITY>` / `<DATE>`).
   - Rakhi / Ganpati: Smooth 3.5s crossfade between theme emblem stamp and timestamp postmark.
   - **Never include official postal text**: `"BHARAT"`, `"BHARAT POST"`, `"INDIAN POSTCARD"`.
3. **Message Body & Recipient Box**:
   - Standalone `Priy {name},` heading above message is REMOVED.
   - Message greeting begins with `Dear {receiverName},`.
   - "Inspire Me" generator outputs pure body text only (no duplicate recipient greeting).
   - Recipient Box shows ONLY `TO:` and `CITY / ADDRESS:` (no `RISHTA:` field).
4. **Theme Background Assets**:
   - Classic: Completely clean (no background illustration).
   - Rakhi: Official image asset `public/assets/festivals/rakhi-bg-scene.png` (`mix-blend-multiply` at 7% opacity with soft radial mask).
   - Ganpati: Official image asset `public/assets/festivals/ganpati-bg-scene.png` (`mix-blend-multiply` at 7% opacity with soft radial mask).
5. **Conditional Hidden Surprise**:
   - Render hidden surprise block ONLY when an actual attachment/theme surprise exists.
   - For postcards without surprise attachments, completely hide "Something is hidden" lock banner.

---

## 4. Privacy & Form Placeholders

- Never pre-fill previously entered recipient or sender names in input fields.
- Recipient Name Placeholder: `"e.g. Rahul Sharma"`.
- Sender Name Placeholder: `"e.g. Your name"`.

---

## 5. Automated Verification Requirements

Before asking for Approval Gate #1, run:
1. `bun run build` (Must complete with 0 TypeScript compilation errors).
2. `bun scratch/run_all_e2e_scenarios.js` (E2E suite).
3. `bun scratch/verify_sender_dashboard_and_claim.js` (Sender dashboard suite).
4. `bun scratch/verify_admin_and_feedback.js` (Admin analytics suite).
