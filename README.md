# Md Tahamin Islam — Portfolio Website

A high-performance, bilingual (English/Bangla) portfolio website built with **Next.js 14** (frontend) and **Express.js** (backend).

---

## 📁 Project Structure

```
portfolio-tahamin/
│
├── frontend/                    ← Next.js 14 app (what visitors see)
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx       ← Root HTML, fonts, SEO metadata
│   │   │   ├── page.tsx         ← Main page (composes all sections)
│   │   │   └── globals.css      ← Global styles + CSS variables
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Header.tsx   ← Fixed nav + language switcher
│   │   │   │   └── Footer.tsx   ← Links, socials, copyright
│   │   │   │
│   │   │   ├── sections/        ← One file per page section
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── AboutSection.tsx
│   │   │   │   ├── ProjectsSection.tsx
│   │   │   │   ├── PublicationsSection.tsx
│   │   │   │   ├── MediaSection.tsx
│   │   │   │   └── ContactSection.tsx
│   │   │   │
│   │   │   └── ui/              ← Reusable small components
│   │   │       ├── ProjectCard.tsx
│   │   │       ├── PublicationCard.tsx
│   │   │       ├── SectionTitle.tsx
│   │   │       └── LanguageSwitcher.tsx
│   │   │
│   │   ├── data/                ← ⭐ EDIT THESE TO UPDATE CONTENT
│   │   │   ├── projects.ts      ← Your portfolio projects
│   │   │   ├── publications.ts  ← Your research papers
│   │   │   └── media.ts         ← YouTube videos, channels, skills, education, stats
│   │   │
│   │   ├── lib/
│   │   │   ├── translations.ts  ← All English + Bangla text strings
│   │   │   └── utils.ts         ← Helper functions
│   │   │
│   │   └── types/
│   │       └── index.ts         ← TypeScript types
│   │
│   ├── public/
│   │   ├── images/              ← ⭐ ADD YOUR PHOTOS HERE
│   │   │   └── profile.jpg      ← Your profile photo
│   │   ├── resume.pdf           ← ⭐ ADD YOUR CV HERE
│   │   └── og-image.png         ← Social sharing image (1200×630)
│   │
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── next.config.mjs
│   └── .env.local.example       ← Copy to .env.local and fill in
│
├── backend/                     ← Express.js API server
│   ├── src/
│   │   ├── server.ts            ← Express app + all middleware
│   │   ├── routes/
│   │   │   ├── contact.ts       ← POST /api/contact
│   │   │   └── subscribe.ts     ← POST /api/subscribe
│   │   ├── middleware/
│   │   │   ├── validation.ts    ← Input sanitization
│   │   │   └── rateLimiter.ts   ← Spam prevention
│   │   ├── services/
│   │   │   └── emailService.ts  ← Nodemailer email templates
│   │   └── types/
│   │       └── index.ts
│   │
│   ├── package.json
│   └── .env.example             ← Copy to .env and fill in
│
├── .github/
│   └── workflows/
│       └── ci.yml               ← CI/CD: lint → build → deploy to Vercel
│
├── .gitignore
└── README.md                    ← This file
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js **v18 or v20** (download: https://nodejs.org)
- npm (comes with Node.js)
- A Gmail account (for sending contact form emails)

### Step 1 — Install Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL=http://localhost:5000
npm run dev
# Opens at http://localhost:3000
```

### Step 2 — Install Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env — set your Gmail credentials (see Gmail App Password section below)
npm run dev
# Runs at http://localhost:5000
```

### Step 3 — Open in browser

Visit **http://localhost:3000** — you should see your portfolio.

---

## ✏️ How to Personalise the Site

### 1. Add Your Profile Photo
Place your photo at:
```
frontend/public/images/profile.jpg
```
Then in `HeroSection.tsx`, replace the placeholder `<div>` with:
```tsx
<Image
  src="/images/profile.jpg"
  alt="Md Tahamin Islam — profile photo"
  fill
  className="object-cover object-center"
  priority
/>
```
Do the same in `AboutSection.tsx`.

### 2. Add Your CV
Place your CV PDF at:
```
frontend/public/resume.pdf
```

### 3. Add Your Projects
Edit `frontend/src/data/projects.ts` — fill in `title`, `description`, `githubUrl`, `imagePath`, and `tags` for each project.

### 4. Add Your Publications
Edit `frontend/src/data/publications.ts` — fill in `title`, `abstract`, `pdfUrl`, and `year`.

### 5. Add Your YouTube Videos
Edit `frontend/src/data/media.ts` — paste your YouTube video IDs (the part after `?v=`) into the `youtubeId` fields.

### 6. Update Skills & Education
Edit `frontend/src/data/media.ts` — update the `skills` array (names and levels 0–100) and the `education` array.

### 7. Update Social Links
Search for `yourusername` and `yourprofile` in these files and replace with your real handles:
- `frontend/src/components/layout/Footer.tsx`
- `frontend/src/components/sections/ContactSection.tsx`
- `frontend/src/app/layout.tsx` (Schema.org `sameAs` array)
- `backend/src/services/emailService.ts` (auto-reply email links)

### 8. Update Text / Translations
Edit `frontend/src/lib/translations.ts` to change any displayed text in English or Bangla.

---

## 📧 Gmail App Password Setup

The backend sends emails via Gmail SMTP. You need a **Gmail App Password** (not your normal password):

1. Go to https://myaccount.google.com/security
2. Make sure **2-Step Verification** is ON
3. Search for **"App passwords"** and click it
4. Select **Mail** → **Other** → type "Portfolio"
5. Copy the 16-character password
6. Paste it in `backend/.env` as `EMAIL_PASS`

---

## 🌐 Deployment

### Frontend → Vercel (Recommended, free)

1. Push your code to GitHub
2. Go to https://vercel.com → Import Project → select your repo
3. Set **Root Directory** to `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL` = your backend URL
5. Click Deploy

### Backend → Railway / Render (Free tiers available)

#### Railway:
1. Go to https://railway.app → New Project → Deploy from GitHub
2. Select the `backend` folder
3. Add all environment variables from `backend/.env.example`
4. Deploy — Railway gives you a URL like `https://your-app.railway.app`
5. Copy that URL and set it as `NEXT_PUBLIC_API_URL` in your Vercel frontend

#### Render:
1. Go to https://render.com → New Web Service
2. Connect GitHub → select `backend` folder
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add environment variables

### Custom Domain
1. Buy a domain (e.g. `tahaminislam.com`) from Namecheap, GoDaddy, etc.
2. In Vercel: Settings → Domains → Add your domain
3. Follow the DNS instructions Vercel provides

---

## 🔑 GitHub Secrets (for CI/CD)

Add these in GitHub → Settings → Secrets → Actions:

| Secret | Where to get it |
|---|---|
| `VERCEL_TOKEN` | vercel.com/account/tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after first Vercel deploy |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after first Vercel deploy |

---

## 📋 Serial File Checklist

| # | File | Purpose | Action needed |
|---|------|---------|---------------|
| 1 | `frontend/src/data/projects.ts` | Portfolio projects | ⭐ Fill in your projects |
| 2 | `frontend/src/data/publications.ts` | Research papers | ⭐ Fill in your papers |
| 3 | `frontend/src/data/media.ts` | Videos, skills, stats, education | ⭐ Fill in everything |
| 4 | `frontend/src/lib/translations.ts` | EN/BN text | Edit bio and any text |
| 5 | `frontend/public/images/profile.jpg` | Your photo | ⭐ Add your photo |
| 6 | `frontend/public/resume.pdf` | Your CV | ⭐ Add your CV |
| 7 | `frontend/public/og-image.png` | Social sharing image | Add 1200×630px image |
| 8 | `frontend/src/app/layout.tsx` | SEO metadata + social links | Update URLs |
| 9 | `frontend/src/components/sections/ContactSection.tsx` | Social links | ⭐ Update handles |
| 10 | `frontend/src/components/layout/Footer.tsx` | Social links | ⭐ Update handles |
| 11 | `backend/.env` | Email credentials | ⭐ Add Gmail app password |
| 12 | `frontend/.env.local` | API URL | Set backend URL |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14 (App Router), React 18, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Forms | React Hook Form + Zod validation |
| Backend | Express.js, TypeScript |
| Email | Nodemailer (Gmail SMTP) |
| Security | Helmet, CORS, express-rate-limit, express-validator |
| Fonts | Syne, Plus Jakarta Sans, JetBrains Mono (Google Fonts) |
| Hosting | Vercel (frontend) + Railway/Render (backend) |
| CI/CD | GitHub Actions |

---

Built with ❤️ for Md Tahamin Islam's portfolio | Dhaka, Bangladesh 🇧🇩
