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
- Schedule a 30-minute results review from the results page or footer

This is the assessment experience itself. It does not replace ScoreApp’s email automations, CRM, or PDF reports. Results are calculated in the browser. Progress and results are also saved in the visitor’s browser so they can return to the results page.

Contact messages and completed assessment lead captures are emailed to **staceykay@scalemakerhr.com** through Formspree. The site posts to `/api/contact` and `/api/leads`, which forward to Formspree using environment variables. Form IDs are not hardcoded in application source. Assessment posts to `/api/leads` are rate-limited by IP on the server (see below). Contact posts are not.

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

## Assessment rate limit (protects Formspree)

`/api/leads` allows **3 assessment submissions per visitor IP**, then cools down for **24 hours**. The limit is enforced on the server before Formspree is called, so changing emails or refreshing the page does not bypass it. `/api/contact` is a separate route and is **not** included in this limit.

After the limit, visitors can still see locally calculated results. The site shows a friendly message and invites them to reach Stacey on `/contact` instead of sending another assessment.

### Required for reliable limits on Vercel

In-memory counting is used automatically for local development. It does **not** work well on Vercel: each serverless instance has its own memory, and instances are replaced often. For production, add a free [Upstash Redis](https://upstash.com/) database (or the Vercel KV / Upstash Redis integration) and set:

| Variable | Used for |
| --- | --- |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis REST token |

Vercel KV names `KV_REST_API_URL` and `KV_REST_API_TOKEN` are also accepted.

### Optional limit settings

| Variable | Default | Meaning |
| --- | --- | --- |
| `ASSESSMENT_RATE_LIMIT_MAX` | `3` | Allowed assessment posts per IP per window |
| `ASSESSMENT_RATE_LIMIT_WINDOW_HOURS` | `24` | Cooldown window after the first counted post |
| `ASSESSMENT_RATE_LIMIT_STORE` | auto | Set to `memory` to force the local store (tests / laptop) |

Add the Redis variables in Vercel → **scalemaker-hr** → **Settings → Environment Variables** (Production and Preview), then redeploy.

### How to test

```bash
npm test
```

That covers the limiter, IP parsing, the 4th `/api/leads` post returning `429`, and confirming `/api/contact` is not blocked.

Manual check against a running app (`npm run dev`):

1. Set `FORMSPREE_ASSESSMENT_ID` (or the public equivalent) and `ASSESSMENT_RATE_LIMIT_STORE=memory` in `.env.local`. For a faster check, also set `ASSESSMENT_RATE_LIMIT_MAX=1`.
2. `POST /api/leads` with a JSON body that includes `contact.firstName` and `contact.email`. Repeat from the same machine until you exceed the max. The next response should be HTTP `429` with `code: "assessment_rate_limited"` and a `contactPath` of `/contact`. Formspree should not receive that blocked post.
3. `POST /api/contact` with `name`, `email`, and `message` from the same machine should still succeed.
4. In the browser, complete an assessment after the limit (or open `/assessment/results?limited=1` with a saved result). You should see the contact-page invitation, not another assessment submit prompt as the next step.

What Stacey receives:

- **Contact:** name, email, phone (if provided), business name (if provided), and message.
- **Assessment:** name, email, phone (if provided), business, discussion preference, optional HR issue, overall score and band (Scale Ready / Developing / Growth Constrained / Foundation at Risk), category scores, risk/impact flags, profile answers, and scored-statement answers when they are already in the submitted record. If the visitor submits **Tell us what matters most** on the results page, or clicks **Schedule a 30-minute results review** after choosing outcomes, a follow-up email includes those outcomes, any custom “Other” text, and the ideal start timeline. Scheduling saves the answers without a separate submit. The same answers are not emailed again unless they change.

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
