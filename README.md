# TimeTravel Agency — Immersive Time-Travel Luxury Web App

A React + Tailwind CSS application for a fictional premium time-travel agency.

## Features

- Immersive landing page with a visual hero, premium branding, and clear CTAs.
- Interactive destination gallery (Paris 1889, Cretaceous, Florence 1504).
- Detailed destination modal (highlights, experiences, and coherent fictional pricing).
- Floating AI chatbot widget (local mock mode) with premium tone, FAQ behavior, and destination guidance.
- Recommendation quiz (automatic personalization of the suggested destination).
- Optional pre-booking form with basic validation and mock confirmation.
- Smooth Framer Motion animations and mobile-first responsive UX.

## Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: lucide-react

## Installation

```bash
npm install
```

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
  App.jsx
  main.jsx
  styles.css
```

## Deployment

Compatible with **Vercel** or **Netlify** (static Vite app).

- Build command: `npm run build`
- Output directory: `dist`

## Suggested next steps

- Connect the chatbot to a real AI provider (OpenRouter / Mistral API).
- Add authentication and booking history.
- Add self-hosted video content for the hero section.
