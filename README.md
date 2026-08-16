# Nodeforge

Nodeforge company website — React frontend + .NET backend.

```
nodeforge/
├── frontend/     React app (Vite) — the public website + internship form
└── backend/      .NET 8 API — layered, validated, rate-limited, and
                   secured (see "Backend architecture & security" below)
```

## What's included

- **Light & dark mode** — toggle in the nav (top right), remembers the
  system preference on first load.
- **Services** — Frontend, Backend, API Development & Integration, and
  WordPress, each with a short description and feature list.
- **Portfolio ("Work")** — live-pulled from GitHub
  (`github.com/fardeen-offical`), no hardcoded project list.
- **How We Work** — a 4-step process section (Discover → Design & Plan →
  Build → Deploy & Support).
- **Internships** — 5 open tracks (Frontend, Backend, API, WordPress,
  .NET Developer), certificate badge, unpaid disclaimer, and a full
  application form.
- **WhatsApp on submit** — when someone submits the internship form, it
  (1) saves the application to the .NET backend, and (2) opens WhatsApp
  with a pre-filled message addressed to **+92 345 0107426**, ready for
  the applicant to hit send.

### A note on WhatsApp delivery

This uses WhatsApp's `wa.me` click-to-chat links — there's no cost, no
account setup, and no third-party API key needed. The trade-off: the
*applicant's* browser opens WhatsApp and they press send, rather than the
message arriving automatically and silently. True, fully automatic
server-to-WhatsApp delivery requires the paid WhatsApp Business API
(e.g. via Twilio or Meta directly), which needs a business account and
API credentials this project doesn't set up for you.

## Backend architecture & security

The API moved from one big `Program.cs` to a layered structure — same
behavior, but organized the way a real production service should be,
with several security layers added on top.

```
backend/Nodeforge.Api/
├── Program.cs                          # composition root only — wires
│                                          everything below, no business logic
├── Dtos/
│   ├── ApplicationCreateRequest.cs     # input shape + validation rules
│   └── ValidationHelper.cs             # runs DataAnnotations validation
├── Models/
│   └── InternshipApplication.cs        # the stored domain record
├── Repositories/
│   ├── IApplicationRepository.cs       # storage contract
│   └── JsonFileApplicationRepository.cs
├── Services/
│   ├── IApplicationService.cs          # business logic contract
│   └── ApplicationService.cs           # sanitizes input, maps to model
├── Endpoints/
│   └── ApplicationEndpoints.cs         # route definitions
├── Security/
│   ├── ApiKeyAuthMiddleware.cs         # guards /api/admin/*
│   └── SecurityHeadersMiddleware.cs    # standard defensive headers
└── Middleware/
    └── ExceptionHandlingMiddleware.cs  # no stack traces ever leak out
```

**Why layered?** Each piece only knows about the one below it —
endpoints call the service, the service calls the repository. Swapping
the JSON file for a real database later means writing one new
`IApplicationRepository` implementation; nothing else changes.

### Security measures

| Concern | What's in place |
|---|---|
| **Input validation** | `ApplicationCreateRequest` uses DataAnnotations (`[Required]`, `[EmailAddress]`, length limits, a strict `UnpaidOk` pattern). Invalid requests get a structured `400` with field-level errors, never reach the service layer. |
| **Stored XSS / injection** | Free-text fields (name, skills, "why", etc.) have HTML tags stripped server-side before storage — defense in depth in case this data is ever rendered in an admin UI. |
| **Admin data exposure** | Listing all applications moved to **`GET /api/admin/applications`**, protected by an API key (`X-Api-Key` header), checked with a constant-time comparison to resist timing attacks. If no key is configured, the admin route fails *closed* (503), never silently open. |
| **Abuse / spam** | The public `POST /api/applications` endpoint is rate-limited to 5 requests per 10 minutes per client — stops the form being scripted into a spam or denial-of-service vector. |
| **CORS** | Locked to an explicit origin allow-list from config (no `AllowAnyOrigin`/`AllowAnyHeader`), and only the methods/headers the app actually uses. |
| **Error handling** | A global exception handler logs full details server-side but only ever returns a generic message to the client — stack traces and internal details never leak in a response. |
| **Transport & headers** | HTTPS redirection + HSTS in production, plus `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and a strict `Content-Security-Policy` on every response. |
| **Secrets** | The admin API key is read from config/environment (`NODEFORGE_ADMIN_APIKEY`), never hardcoded. `appsettings.Development.json` ships a placeholder dev-only key. |
| **Data integrity** | Writes to `applications.json` go to a temp file and are moved into place atomically — a crash mid-write can't corrupt existing data. |

### Calling the admin endpoint

```bash
curl http://localhost:5000/api/admin/applications \
  -H "X-Api-Key: dev-only-key-change-me"
```

In production, set a real key via environment variable before deploying:

```bash
export NODEFORGE_ADMIN_APIKEY="a-long-random-value-here"
```

## Quick start

You need [Node.js](https://nodejs.org) (18+) and the [.NET 8 SDK](https://dotnet.microsoft.com/download) installed.

### 1. Run the backend

```bash
cd backend/Nodeforge.Api
dotnet restore
dotnet run
```

The API starts at `http://localhost:5000`. Applications are saved to
`backend/Nodeforge.Api/applications.json` (created automatically on first
submission). Swap `JsonFileApplicationRepository` for a real database
whenever you're ready to go further — see "Backend architecture" above.

### 2. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The site opens at `http://localhost:5173`. In development, form
submissions are proxied to the backend automatically (see
`vite.config.js`).

### 3. Check it worked

Open the site, scroll to **Internships**, and submit the form. A WhatsApp
tab should open with the application pre-filled. Then check it landed in
the backend:

```bash
curl http://localhost:5000/api/admin/applications \
  -H "X-Api-Key: dev-only-key-change-me"
```

## Project structure

```
frontend/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx           # React entry point
    ├── App.jsx            # composes all sections
    ├── ThemeContext.jsx   # light/dark mode state
    ├── index.css          # global styles & design tokens (both themes)
    ├── lib/
    │   └── api.js         # talks to the .NET backend
    └── components/
        ├── NodeMark.jsx        # the Nodeforge logo mark
        ├── NodeField.jsx       # animated node-network background
        ├── Nav.jsx             # nav + theme toggle
        ├── Hero.jsx
        ├── About.jsx
        ├── Services.jsx        # Frontend / Backend / API / WordPress
        ├── Portfolio.jsx       # live GitHub repos ("Work" section)
        ├── Process.jsx         # "How We Work" 4-step section
        ├── Internships.jsx     # roles + application form section
        ├── ApplicationForm.jsx # the apply form + WhatsApp handoff
        └── Footer.jsx

backend/
└── Nodeforge.Api/     — see "Backend architecture & security" above
```

## Deploying

- **Frontend**: `npm run build` in `frontend/` produces a static `dist/`
  folder you can host anywhere (Vercel, Netlify, Cloudflare Pages, etc).
  Set `VITE_API_URL` to your deployed backend's URL before building.
- **Backend**: `dotnet publish` in `backend/Nodeforge.Api/`, then deploy to
  any host that runs .NET (Azure App Service, Render, a VPS, etc).
  Before going live:
  1. Set `NODEFORGE_ADMIN_APIKEY` to a long random value via environment
     variable — don't reuse the dev placeholder.
  2. Update `Cors:AllowedOrigins` in `appsettings.json` (or via config)
     to your live frontend domain.
  3. Confirm HTTPS is terminated in front of the app (most hosts do this
     automatically) so `UseHsts()`/`UseHttpsRedirection()` take effect.

## Brand

- Dark background: `#151619` / `#0F1013` · Light background: `#F7F5F0` / `#EFEBE3`
- Accent (ember): `#F0723A`
- Display type: Space Grotesk · Body: Inter · Mono/labels: JetBrains Mono
- Email: contact.nodeforge1@gmail.com
- WhatsApp: +92 345 0107426
