# Mandatory Deployment Workflow & Dual Approval Policy

Follow this strict 9-step workflow with dual approval gates for **EVERY** change:

```
[Local Development] 
  ↓
[Local Build & Test] (bun run dev / bun run build / E2E test suites)
  ↓
[Report Local Changes & Test Results]
  ↓
🛑 APPROVAL GATE #1: Wait for User Approval after Localhost Test
  ↓
[Push to UAT Branch (`uat`)]
  URL: https://postcard-yadon-ka-git-uat-thinkable-co.vercel.app/
  ↓
[Test UAT Deployment]
  ↓
🛑 APPROVAL GATE #2: Wait for User Approval after UAT Test
  ↓
[Push to Production Branch (`main`)]
  URL: https://postcard-yadon-ka.vercel.app/
```

## Rules & Constraints
1. **Never push directly to production (`main`)**.
2. **Never push to UAT (`uat`) without explicit user approval after localhost testing**.
3. **Never promote UAT → Production automatically**.
4. **Approval Chain**: `LOCAL ✅ → USER APPROVAL #1 → UAT ✅ → USER APPROVAL #2 → PRODUCTION`.
5. **No approval = NO deployment**.
