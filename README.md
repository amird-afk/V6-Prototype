# Masterschool Enrollment Funnel Prototype

A clickable Next.js prototype demonstrating the three enrollment tracks:
- **Pro** — full scholarship (ISIR < $60K)
- **Core** — partial scholarship (ISIR $60K–$100K)
- **Self-pay** — no scholarship (income > $100K or opted out)

## Running locally

```bash
npm install && npm run dev
# or
bun install && bun dev
```

Then open [http://localhost:3000](http://localhost:3000).

## How to use the demo bar

A floating **Demo mode** panel sits in the bottom-right corner of every page. Use it to:

1. **Switch scenario** — select Pro, Core, or Self-pay before you reach decision points (FAFSA, Verification Queue). The app reads your choice and routes accordingly.
2. **Reset flow** — returns to the home screen and resets the scenario to Pro.

The demo bar is global state (React context) and persists across navigation.

## Flow overview

```
Home → Career Advisor → Apply for Scholarship
                             │
          ┌──────────────────┴──────────────────┐
          │ Apply                               │ Continue w/o scholarship
          ▼                                     ▼ [Modal M1]
   Sign up + PQL → Program → FAFSA        Maestro Plans → Sign up
                               │                              │
                    ┌──────────┴──────────┐          Program → Q-Verification
                    │ Pro/Core scenario   │ Self-pay  [Modal M5]
                    ▼                     ▼ [Modal M2]     │
             Stripe + POE         → Sign up (self-pay)     ▼
                    ▼                                Enrollment Docs
            Q-Verification                                  │
            [Modal M3/M4]                             Pay Flow → Finished
                    ▼
      Tuition Package → Agreement → Enrollment Docs → Finished
```

## Deploy to Vercel

Import the GitHub repo at [vercel.com/new](https://vercel.com/new). No environment variables needed.
