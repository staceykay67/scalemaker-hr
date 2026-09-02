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

This is the assessment experience itself. It does not replace ScoreApp’s email automations, CRM, or PDF reports. Results are calculated in the browser. Progress and results are also saved in the visitor’s browser so they can return to the results page.

Contact messages and completed assessment lead captures are emailed to **staceykay@scalemakerhr.com** through Formspree. The site posts to `/api/contact` and `/api/leads`, which forward to Formspree using environment variables. Form IDs are not hardcoded in application source.

## Connect Formspree (required for live email)

Until these variables are set in Vercel, the Contact form will show an error and assessment leads will not be emailed (results still appear for the visitor).

Formspree forms already exist and notify `staceykay@scalemakerhr.com`:

- Contact: `https://formspree.io/f/xjyvrwad`
- Assessment: `https://formspree.io/f/xyeyjwbz`

In the Vercel project **scalemaker-hr** go to **Settings → Environment Variables** (Production and Preview) and add:

| Variable | Value | Used for |
| --- | --- | --- |
| `FORMSPREE_CONTACT_ID` | `xjyvrwad` | Contact page (`/api/contact`) |
| `FORMSPREE_ASSESSMENT_ID` | `xyeyjwbz` | Assessment completion (`/api/leads`) |

`NEXT_PUBLIC_FORMSPREE_CONTACT` and `NEXT_PUBLIC_FORMSPREE_ASSESSMENT` are also accepted if you prefer public names. Optional: `FORMSPREE_FORM_ID` (or `NEXT_PUBLIC_FORMSPREE_FORM`) for one shared form; submissions include `formType` = `contact` or `assessment`.

Redeploy after saving. These are read by the server API routes, so you do not need `NEXT_PUBLIC_` unless you want the IDs in the browser bundle.

Local development: copy `.env.example` to `.env.local` and restart `npm run dev`.

What Stacey receives:

- **Contact:** name, email, phone (if provided), business name (if provided), and message.
- **Assessment:** name, email, phone (if provided), business, discussion preference, optional HR issue, overall score and band (Scale Ready / Developing / Growth Constrained / Foundation at Risk), category scores, risk/impact flags, profile answers, and scored-statement answers when they are already in the submitted record.

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
