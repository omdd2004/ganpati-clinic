# Ganpati Sonography & X-Ray Clinic — Website

A premium, single-page website for Ganpati Sonography & X-Ray Clinic (Bhusawal), built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Framer Motion. Includes a Supabase-backed appointment booking system and a password-protected admin dashboard.

## Tech Stack

- Next.js 15 (App Router)
- React 19 + TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- Supabase (database)

## Project Structure

```
clinic/
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout, fonts, SEO metadata, JSON-LD
│   ├── globals.css
│   ├── robots.ts             # robots.txt
│   ├── sitemap.ts            # sitemap.xml
│   ├── admin/page.tsx        # Admin dashboard
│   └── api/
│       ├── appointments/route.ts        # Public booking endpoint
│       └── admin/
│           ├── login/route.ts           # Admin login (sets cookie)
│           └── appointments/route.ts    # List/delete (admin only)
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ClinicInfo.tsx
│   ├── AppointmentForm.tsx
│   └── Footer.tsx
├── lib/
│   ├── clinic-data.ts        # Clinic details, hours, services
│   ├── utils.ts
│   └── supabase/
│       ├── client.ts          # Browser client (anon key)
│       └── admin.ts           # Server client (service role key)
├── supabase/schema.sql        # Database schema
├── public/logo.png            # Clinic logo
├── .env.example
└── tailwind.config.js
```

## 1. Local Setup

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
ADMIN_PASSWORD=choose-a-strong-password
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## 2. Supabase Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Open the SQL Editor and run the contents of `supabase/schema.sql`.
3. Copy your **Project URL**, **anon public key**, and **service_role key** from Project Settings → API into `.env.local`.

> The `appointments` table has Row Level Security enabled with **no public policies** — all reads and writes go through the Next.js API routes using the service role key, so the table is never exposed directly to the browser.

## 3. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`. Admin dashboard: `http://localhost:3000/admin`.

## 4. Email Notifications (Resend)

To receive an email whenever a patient books an appointment, this project uses [Resend](https://resend.com) — a simple email API with no business registration required (unlike SMS to Indian numbers, which needs DLT registration).

1. Create a free account at [resend.com](https://resend.com).
2. Go to **API Keys** in the Resend dashboard → create a new key → copy it.
3. Add these environment variables (locally in `.env.local`, and in Vercel → Settings → Environment Variables):

```
RESEND_API_KEY=your-resend-api-key
ADMIN_EMAIL=youremail@example.com         # where alerts should be sent
RESEND_FROM_EMAIL=onboarding@resend.dev   # works out of the box on the free plan
```

4. Redeploy. Test by booking an appointment on the live site — an email should arrive at `ADMIN_EMAIL` within seconds.

> The default `onboarding@resend.dev` sender works immediately with no setup, great for getting started. Once you want emails to come from your own domain (e.g. `appointments@ganpatisonography.in`), verify that domain in Resend → Domains, then update `RESEND_FROM_EMAIL` accordingly.
>
> If these variables aren't set, the website still works exactly the same — appointments still save normally, the email step is just skipped.

## 5. Deploy to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Add the environment variables from `.env.example` in the Vercel project settings (Settings → Environment Variables).
4. Deploy. Vercel will automatically build and host the site.
5. (Optional) Add your custom domain in Vercel → Settings → Domains, and update `NEXT_PUBLIC_SITE_URL` accordingly.

## Features

- Sticky glassmorphism navbar with mobile menu
- Hero section with feature highlight cards
- Clinic info card (doctor, address, phone, hours) + embedded Google Map with "Get Directions"
- Validated appointment booking form with success state, stored in Supabase
- Admin dashboard (`/admin`) protected by `ADMIN_PASSWORD`: search, sort, delete, CSV export
- SEO: dynamic `robots.txt`, `sitemap.xml`, Open Graph + Twitter cards, Schema.org `MedicalClinic` JSON-LD
- Optimized fonts (`next/font`), optimized logo image (`next/image`), no external stock imagery

## Notes

- No stock photos or illustrations are used — the design relies on typography, icons, gradients, and spacing, with the clinic's own logo throughout.
- Update clinic details (hours, services, address) in `lib/clinic-data.ts`.
- Change the admin password any time by updating `ADMIN_PASSWORD` and redeploying.
