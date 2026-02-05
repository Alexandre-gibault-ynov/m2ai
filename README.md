# TimeTravel Agency — Immersive Time-Travel Luxury Web App

A React + Tailwind CSS application for a fictional premium time-travel agency.

## Features

- Immersive landing page with a visual hero, premium branding, and clear CTAs.
- Interactive destination gallery (Paris 1889, Cretaceous, Florence 1504).
- Detailed destination modal (highlights, experiences, and coherent fictional pricing).
- Floating AI chatbot widget with **real OpenRouter integration** and automatic local fallback mode.
- Recommendation quiz (automatic personalization of the suggested destination).
- Optional pre-booking form with basic validation and mock confirmation.
- Smooth Framer Motion animations and mobile-first responsive UX.

## Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: lucide-react
- **AI Provider**: OpenRouter (Mistral model by default)

## Installation

```bash
npm install
```

## Configure AI provider

1. Copy `.env.example` to `.env`.
2. Set your OpenRouter API key and (optionally) model.

```bash
cp .env.example .env
```

Environment variables:

- `VITE_OPENROUTER_API_KEY`: OpenRouter API key (required for live mode)
- `VITE_OPENROUTER_MODEL`: Model ID (default: `mistralai/mistral-small-3.1-24b-instruct:free`)
- `VITE_OPENROUTER_ENDPOINT`: API endpoint (default OpenRouter chat completions)
- `VITE_APP_NAME`: App title sent in request headers

> Note: this project currently calls OpenRouter from the client for demo speed. For production, move API calls behind a secure backend proxy to keep secrets private.

## Chatbot troubleshooting

- If the header shows `Local fallback mode (missing API key)`, verify `VITE_OPENROUTER_API_KEY` in `.env` and restart `npm run dev`.
- If you receive `429` responses, your provider/model is rate-limited. Wait a few seconds, retry, or switch to a less constrained model in `VITE_OPENROUTER_MODEL`.

## Run locally

```bash
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    BookingForm.jsx
    ChatWidget.jsx
    DestinationCard.jsx
    DestinationModal.jsx
    Quiz.jsx
  lib/
    aiProvider.js
  App.jsx
  main.jsx
  styles.css
```

## Deployment

Compatible with **Vercel** or **Netlify** (static Vite app).

- Build command: `npm run build`
- Output directory: `dist`

## Suggested next steps

- Add a backend proxy endpoint for secure AI key handling.
- Store conversation history per user session.
- Add structured booking intents and CRM handoff.
