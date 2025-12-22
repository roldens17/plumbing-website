# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands and scripts

This is a Next.js App Router project managed with npm (see `package-lock.json`).

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

### Build and run in production mode

```bash
npm run build
npm start
```

### Lint the codebase

```bash
npm run lint
```

> Note: There are currently no test scripts configured in `package.json`. If you add a test framework (e.g. Jest, Playwright, Vitest), prefer to expose it via npm scripts (e.g. `test`, `test:watch`) so future agents can run individual tests via `npm test -- <pattern>`.

## High-level architecture

### Framework and tooling

- **Framework**: Next.js 16 App Router, using the `app/` directory (`app/layout.tsx`, `app/page.tsx`).
- **Language**: TypeScript with strict mode enabled (`tsconfig.json`).
- **Styling**: Tailwind CSS 4 is configured as a dev dependency; the main global stylesheet is imported from `app/globals.css`.
- **Module resolution**: Path alias `@/*` maps to the repo root (see `tsconfig.json`), used to import configuration from `config/`.
- **Bundler**: Next.js with Turbopack enabled via `next.config.mjs`.

### Application structure

- `app/layout.tsx`
  - Defines the global HTML skeleton and `<body>`.
  - Configures fonts via `next/font` (Geist sans and mono) and wires them into CSS variables.
  - Exposes SEO metadata (`Metadata`) including Open Graph and Twitter card config tailored to Donel & D Plumbing.
  - Injects JSON-LD business schema (`Plumber`) via an inline `<script type="application/ld+json">` for search engines.

- `app/page.tsx`
  - A **client component** (`"use client"`) implementing the entire public marketing site and interaction logic.
  - Imports `tradeConfig` from `config/trade.config.ts` and uses it as the single source of truth for:
    - Branding (name, phone, email, location, initials, website credit).
    - Hero section copy, badges, and CTAs.
    - Services, "Why choose us" cards, testimonials, footer copy, and map query.
    - Chat configuration (localStorage key) and trade label.
  - Major UI sections:
    - **Hero**: headline, badges, hero image, stats, direct-contact block.
    - **Services** (`#services`): horizontally scrollable service cards with pagination dots on mobile.
    - **Why choose us**: value-proposition cards and an embedded lead form.
    - **Projects** (`#projects`): horizontally scrollable gallery of project images with a full-screen modal viewer (keyboard accessible: Esc, arrow keys, Tab trapping, focus restoration).
    - **Testimonials** (`#reviews`): grid of static testimonials from `tradeConfig`.
    - **Footer / Contact** (`#contact`): contact info, hours, map iframe, footer links, and copyright.
  - **Lead form logic**:
    - Local state for `name`, `phone`, and `details`, with validation ensuring minimum lengths and a 10+ digit phone number.
    - Submits to `/api/lead` via `fetch` with JSON payload; interprets non-2xx responses and surfaces helpful error messages.
    - Displays success and error banners using copy from `tradeConfig.whySection.aside`.
  - **Project gallery logic**:
    - Manages selected image index, loaded image state, and scroll-snapping behavior.
    - Uses `useEffect` hooks to:
      - Lock body scrolling while the modal is open and restore previous focus on close.
      - Track active service/project cards based on scroll position.
  - **Chat widget**:
    - Uses `useChat` from `@ai-sdk/react` configured to hit `/api/chat` with `streamProtocol: "text"`.
    - Persists the full message history in `localStorage` under `tradeConfig.chat.storageKey` and restores it on load.
    - Seeds an initial assistant welcome message if no prior conversation exists.
    - Renders a floating "Help" button that opens a small chat dialog, with quick-prompt buttons that append canned user questions.

- `config/trade.config.ts`
  - Central configuration object (`tradeConfig`) for the **trade-specific and brand-specific content**.
  - Typed via `TradeKey` and `ServiceItem` to keep the content structured.
  - Key responsibilities:
    - Trade selection (`trade: "plumbing"`), which is referenced in UI copy.
    - Brand information (name, short name, location, phone numbers, email, website credit info).
    - Section-level copy and structured content for hero, services, why-choose-us cards, projects, testimonials, and footer.
    - Chat configuration (`chat.storageKey`).
  - When changing copy, phone numbers, or branding, **prefer editing this file** rather than hard-coding strings in components.

### API routes

All API routes live under `app/api/` and are implemented using the App Router route handlers.

- `app/api/chat/route.ts`
  - Exports `runtime = "edge"` so the route runs on the Edge runtime.
  - `POST` handler:
    - Expects a JSON body containing a `messages` array compatible with the `ai` SDK.
    - Filters incoming messages to user/assistant roles with non-empty string content, then maps them into the `streamText` format.
    - Returns `400` if there are no valid messages.
    - Calls `streamText` from the `ai` package with model `"xai/grok-code-fast-1"` and a short system instruction scoped to Donel & D Plumbing.
    - Returns the streamed response via `result.toTextStreamResponse()`.
  - Frontend usage is via `useChat` in `app/page.tsx`.

- `app/api/lead/route.ts`
  - `POST` handler for lead submissions from the contact form.
  - Validates the JSON body to ensure `name`, `phone`, and `details` are present and non-empty, with basic phone and details-length validation.
  - Currently logs the captured lead to `console.info` with a timestamp and returns `{ ok: true }` on success.
  - Designed to be extended later to integrate with a CRM or email provider; future agents should replace the logging block with a real integration rather than modifying the UI.

### Configuration and TypeScript

- `tsconfig.json`
  - Strict TypeScript configuration (noEmit, `strict: true`, `isolatedModules: true`).
  - Includes Next.js-specific plugin configuration and generated `.next` type files.
  - Path alias `@/*` -> `./*` is used in the main page to import `config/trade.config`.

- `next.config.mjs`
  - Enables Turbopack and sets its root to the project directory using a `URL` object.

## How to extend the project

- **Change branding or trade details**: Update `config/trade.config.ts`; ensure any new fields are wired through to `app/page.tsx` where appropriate.
- **Add new sections to the homepage**: Implement them in `app/page.tsx`, ideally reusing structured content from `tradeConfig` instead of embedding raw strings.
- **Wire up a real lead destination**: Replace the logging in `app/api/lead/route.ts` with calls to an email service or CRM SDK while preserving the existing validation and response shape so the frontend does not break.
- **Adjust chat behavior**: Update the `system` prompt or model in `app/api/chat/route.ts`; coordinate changes with the `useChat` configuration in `app/page.tsx` if you change the API path or streaming protocol.
