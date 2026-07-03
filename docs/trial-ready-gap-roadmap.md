# LivaNudge Trial-Ready Gap Roadmap

Current status: this is a sandbox-ready trial workflow prototype, not a full production trial system.

## What is now visible in the frontend

- Participant self-care home with local lifestyle imagery.
- Daily symptom and safety check-in.
- Safety-first red-flag flow.
- Daily micro-action cards with reviewed local-style images.
- Weekly feedback summary.
- Supporter view with assisted record submission and consent gate.
- Pilot desk with follow-up queue, case view, safety history, progress, data export, and integration status.
- New pilot onboarding flow covering eligibility, e-consent, baseline profile, supporter setup, and team readiness.

## What still needs to become a complete trial web app

- Production login, participant identity, role-based access, and session handling.
- Real backend API and database persistence.
- Full e-consent storage with versioned consent documents and withdrawal workflow.
- Baseline and outcome instruments agreed with the research protocol.
- AI nudge service with prompt/version control, red-flag suppression rules, and audit logs.
- Admin workflow for reviewing images and generated content before participant display.
- Data dictionary, de-identification rules, export schema, and data quality checks.
- Notification layer for reminders, missed records, and safety follow-up escalation.
- Usability testing across older users, supporters, and care-team staff.
- Security, privacy, and deployment review before any real participant data is collected.

## Recommended next build slice

Build a backend-backed pilot sandbox next:

- `/api/v1/auth/session`
- `/api/v1/participants/{id}/trial-setup`
- `/api/v1/participants/{id}/baseline`
- `/api/v1/participants/{id}/symptom-checkins`
- `/api/v1/participants/{id}/actions/today`
- `/api/v1/care-team/followups`
- `/api/v1/admin/exports/deidentified`

The frontend can keep the current mock mode as a fallback, while a `VITE_API_BASE_URL` sandbox points to the real service once ready.
