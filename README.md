# TimeTravel Agency — Webapp immersive de voyage temporel

Application React + Tailwind CSS pour une agence fictive de voyages temporels de luxe.

## Aperçu fonctionnel

- Landing page immersive avec hero visuel, branding premium et CTA.
- Galerie interactive de destinations (Paris 1889, Crétacé, Florence 1504).
- Modale de détails pour chaque destination (points forts, expériences, gamme de prix fictive).
- Widget chatbot IA (mode mock local) avec ton premium, FAQ, recommandations et simulation de réponses.
- Quiz de recommandation (personnalisation automatique de la destination suggérée).
- Formulaire de pré-réservation avec validation basique et confirmation mock.
- Animations fluides (Framer Motion), transitions douces et UX mobile-first.

## Stack

- **Frontend**: React + Vite
- **UI**: Tailwind CSS
- **Animations**: Framer Motion
- **Icônes**: lucide-react

## Installation

```bash
npm install
```

## Lancer en local

```bash
npm run dev
```

## Build production

```bash
npm run build
npm run preview
```

## Structure

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

## Déploiement

Compatible avec **Vercel** ou **Netlify** (projet statique Vite).

- Build command: `npm run build`
- Output directory: `dist`

## Évolutions suggérées

- Connecter le chatbot à un provider IA réel (OpenRouter / Mistral API).
- Ajouter un système d’authentification + historique de réservations.
- Ajouter du contenu vidéo auto-hébergé pour le hero.
