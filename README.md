# SkillPath AI — Personalized Career Readiness Engine

**Orvix Hackathon 2026 · Team LegacyBuilders · Nitesh Nath**
**Domain:** EdTech (Artificial Intelligence & Machine Learning)

## Problem Statement

Students, especially from tier-2/tier-3 colleges, often graduate without knowing
which skills the job market truly demands. Career guidance in most institutions
is either missing or too generic to help individual students. This leads to
mismatched resumes, wasted time on irrelevant upskilling, and lower placement
outcomes.

## Solution

SkillPath AI analyzes a student's current skills against a target job role,
using an LLM to identify precise skill gaps and generate a prioritized,
personalized learning roadmap pointing to free, credible resources — replacing
vague advice like "learn coding" with a clear, actionable path.

## Features (MVP)

- **Skill input** — paste your skills/resume text directly (no file-parsing
  dependency needed for the MVP, keeping it fast and reliable to demo).
- **AI-powered gap analysis** — an LLM compares your skills against your
  target role and returns matched skills, missing skills (with priority), and
  a job-fit score.
- **Visual roadmap dashboard** — a step-by-step learning path with estimated
  time per skill and a named free resource for each step.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), React 18 |
| Styling | Tailwind CSS |
| Backend | Next.js API Route (`/api/analyze`) |
| AI/LLM | Google Gemini API (`gemini-1.5-flash`, free tier), JSON-mode output |
| Hosting | Vercel (frontend + serverless API route) |
| Version Control | GitHub |

## Project Structure

```
skillpath-ai/
├── app/
│   ├── api/analyze/route.js   # Server route that calls the LLM
│   ├── layout.js
│   ├── page.js                # Main UI (form + dashboard)
│   └── globals.css
├── components/
│   ├── SkillForm.js           # Skills + target role input
│   └── RoadmapDashboard.js    # Results visualization
├── lib/
│   └── llm.js                 # Prompt builder + LLM API call
├── .env.example
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── next.config.js
└── package.json
```

## Running Locally

```bash
npm install
cp .env.example .env.local   # then add your GEMINI_API_KEY
npm run dev
```

Visit `http://localhost:3000`.

## Deploying (Vercel — free tier)

1. Push this repo to your own GitHub account.
2. Go to [vercel.com](https://vercel.com), click **New Project**, and import
   the repo.
3. In **Environment Variables**, add `GEMINI_API_KEY` with your key.
4. Deploy — Vercel auto-detects Next.js. You'll get a live URL
   (`https://your-project.vercel.app`) to use as your hackathon demo link.

## How It Meets the Judging Criteria

- **Innovation** — reframes generic "learn X" advice into a personalized,
  market-aware roadmap generated per student.
- **Technical Complexity** — real LLM integration with structured JSON output,
  a full-stack Next.js app (frontend + API route), deployed live.
- **Problem Solving** — targets a concrete, widely-felt gap in Indian higher
  education career guidance.
- **Scalability** — works for any student, any target role, any domain; no
  hardcoded content.
- **UI/UX** — clean single-flow dashboard: input → score → gaps → roadmap.
- **Presentation Quality** — this README, a clear repo structure, and a live
  deployable demo make the project easy for judges to evaluate end-to-end.

## Future Scope

- Resume PDF upload with automatic parsing (currently text-paste for MVP speed).
- Integration with live job-posting APIs for real-time market signal instead
  of relying solely on LLM training knowledge.
- Progress tracking so the job-fit score updates as roadmap steps are completed.

## Team

**LegacyBuilders** — Nitesh Nath (Solo)
