# Scalemaker HR website

A simple professional website for **Scalemaker HR**, including a working **People & Growth Readiness Assessment**.

Pages:

- Home — who we help, problems we address, and the assessment as the primary call to action
- About — mission, vision, values, and Stacey Kay’s credentials
- Approach — assessment, complimentary results review, and paid diagnostic
- Contact — message form and email
- Assessment — scored survey and results

There is no industry-specific landing page. The main site uses growing-business language.

The assessment follows the company’s Free Assessment spec: business-profile questions, 18 scored statements in six categories, risk and impact questions, lead capture, scored results, critical-attention and business-impact flags, and a complimentary results-review invitation.

## What visitors can do

- Read who Scalemaker HR helps
- Complete the 5–7 minute assessment on desktop or phone
- See an overall readiness score and six category scores
- Receive recommended next steps based on the score band:
  - 80–100% Scale Ready
  - 65–79% Developing
  - 45–64% Growth Constrained
  - Below 45% Foundation at Risk
- Schedule a complimentary 30-minute results review from the results page or contact page

This is the assessment experience itself. It does not replace ScoreApp’s email automations, CRM, or PDF reports. Results are calculated in the browser. Lead details are stored locally on the visitor’s device until you connect email or a CRM.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:43127](http://localhost:43127) if you start the server with:

```bash
npm run dev -- --port 43127
```

## Brand

Colors, voice, and logo files follow the Scalemaker HR brand standards:

- Scalemaker Forest `#0B422C`
- Scalemaker Sage `#85956F`
- Montserrat

## Scoring

Questions 7–24 are scored. Strongly disagree = 1 through strongly agree = 5. Unsure = 3. There are 90 possible points, 15 per category. Risk flags do not change the percentage; they add extra guidance on the results page.
