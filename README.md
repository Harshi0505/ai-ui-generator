# AI UI Design Generator (Frontend + Backend)

This package contains a ready-to-run project with:
- **frontend/** — Vite + React app (UI that accepts text prompt, voice input, sketch image, and shows live preview + editor)
- **backend/** — Express server that calls the OpenAI API securely (you must provide your API key in backend/.env)

## What you need
- Node.js (v18+ recommended)
- An OpenAI API key (place it in backend/.env)

## Quick setup (after extracting ZIP)

### Backend
```bash
cd backend
cp .env.example .env
# Edit backend/.env and set OPENAI_API_KEY=sk-...
npm install
npm run dev   # or: npm start
# Server will run on http://localhost:4000
```

### Frontend
Open a new terminal:
```bash
cd frontend
npm install
npm run dev
# Vite will show a local URL (e.g. http://localhost:5173). Open it.
```

## How it works
- Frontend sends `POST /api/generate` to the backend with `{ prompt, sketchDataUrl, source }`
- Backend calls OpenAI's Responses API and returns the generated HTML
- Frontend renders the HTML in a sandboxed iframe and lets you edit/download it

## Important
- **Never** commit your `.env` containing the OpenAI API key.
- API usage costs money; test with small prompts first.

If you want, I can:
- Add a GitHub Actions deploy workflow
- Convert this to a single-command setup script
- Add Monaco editor integration
