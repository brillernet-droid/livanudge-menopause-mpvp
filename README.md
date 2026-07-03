# LivaNudge Menopause Pilot

Mobile-first sandbox prototype for menopause lifestyle support. LivaNudge focuses on low-burden daily actions for common menopause-related lifestyle concerns, including hot flashes, night sweats, sleep rhythm, mood and stress, energy, pelvic floor concerns, joint or muscle discomfort, and bone health.

This repository is an open-source frontend prototype. It is not a medical device, not a diagnostic tool, and not a production clinical system.

## Current Scope

- Participant self-care: daily status, relief actions, daily records, weekly feedback, privacy, and authorisation.
- Pilot onboarding: eligibility, e-consent, baseline profile, supporter setup, and trial-readiness status.
- Supporter view: authorised overview, assisted record submission, reminders, and consent status.
- Pilot desk: follow-up queue, case summaries, safety alerts, progress, de-identified data export, and integration status.
- Pilot demo: product loop, AI-generation boundaries, pilot metrics, and research export preview.

## Safety Boundary

LivaNudge provides lifestyle support only. It does not diagnose disease, recommend medication, or provide hormone therapy advice. When red-flag symptoms are entered, ordinary lifestyle suggestions are paused and the participant is prompted to seek help from a clinician, trusted person, or emergency service as appropriate.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production build is generated in `dist/`.

## Deployment

The app is a Vite frontend. Recommended Vercel settings:

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` includes a single-page app rewrite to `index.html`.

## Current Limitations

This is currently a sandbox-ready trial workflow prototype. A complete trial web app still needs backend APIs, database persistence, real authentication, role-based access, versioned consent records, AI nudge audit logs, notification delivery, and privacy/security review before any real participant data is collected.
