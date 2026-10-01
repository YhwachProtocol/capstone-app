# ASL Gloss Translator

A small AI-powered app that translates English sentences into ASL gloss notation, streamed live, so learners and interpreters can see how a sentence's grammar changes when it's reshaped for American Sign Language.

**Live app:** https://capstone-app-eosin.vercel.app
**Repo:** https://github.com/Atulshukla01072007/capstone-app

## Who it's for

Students learning ASL, interpreters-in-training, and anyone preparing a message for a Deaf or Hard-of-Hearing audience who wants more than a word-for-word guess at how English maps to ASL grammar.

## Why this idea

ASL grammar (topic-comment structure, dropped articles, question-word placement at the end of a sentence) is a genuine language-reasoning problem — a good fit for an LLM, rather than a lookup table or a chatbot bolted on for its own sake.

## Setup & run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. You'll need a free Gemini API key (see below) for the Translate page to work.

### Environment variables

Create a `.env.local` file in the project root with:

Get a free Gemini key at [aistudio.google.com/apikey](https://aistudio.google.com/apikey) — no credit card required. `.env.local` is git-ignored and never committed.

## Architecture

- **`src/app/layout.tsx`** — root layout and navigation, a Server Component.
- **`src/app/page.tsx`**, **`history/`**, **`about/`** — static placeholder/content screens, Server Components.
- **`src/app/health/page.tsx`** — Server Component that fetches a test API server-side and renders OK/Error states, used as a basic liveness check.
- **`src/app/translate/page.tsx`** — the Translate screen, a Server Component that renders the client chat component.
- **`src/app/translate/ChatInterface.tsx`** — the only Client Component (`"use client"`), since it's the only part needing interactivity. Uses `useChat` from `@ai-sdk/react` to send messages and render streamed responses, with a thinking indicator, a stop button, and scroll-position-aware auto-scroll.
- **`src/app/api/chat/route.ts`** — the server route handler. Receives the message history, converts it to model format, calls Gemini via `streamText`, and streams the response back. Includes an `onError` fallback so quota/overload errors show a friendly message instead of a raw stack trace.
- **`src/lib/ai/config.ts`** — the system prompt, kept in one place so it's easy to review and change independently of the streaming/transport code.

## AI integration

The app uses **Google's Gemini (`gemini-3.8-flash`)** via the Vercel AI SDK's `streamText`, called from a Next.js Route Handler (`src/app/api/chat/route.ts`). The API key is read server-side only, via `process.env`, and is never exposed to the client.

**System prompt** (`src/lib/ai/config.ts`): instructs the model to treat each input as an English sentence to translate, respond with (1) the sentence in ASL gloss notation and (2) a one-line note on the grammar change made, and to ask for clarification if the input isn't a sentence.

**Why this shape:** structured, two-part output (translation + explanation) makes the response genuinely useful rather than a plain echo, and keeping the prompt narrow (one job, under 80 words) keeps responses fast and on-topic.

## Known limitations & future improvements

- **Multi-turn context bleeds into translations.** Because the full conversation history is sent to the model each time, asking a second, unrelated sentence shortly after a first can cause the model to blend both into one confused gloss. A fix would be to send only the latest user message for translation, while keeping prior turns for display only.
- **Markdown isn't rendered.** The model sometimes returns `**bold**` syntax, which currently displays as literal asterisks rather than bold text, since `ChatInterface.tsx` renders `part.text` as plain text.
- **Free-tier rate limit.** Gemini's free tier allows 5 requests/minute; sending messages faster than that returns a `RESOURCE_EXHAUSTED` error, which the app catches and shows as a friendly "please wait a moment" message rather than crashing.
- **Occasional model overload (503).** Gemini occasionally returns "This model is currently experiencing high demand" during traffic spikes; this is retryable on Google's side but not yet auto-retried by the app.
- **No translation history persistence.** Conversations reset on page refresh; the History page is currently a placeholder.

## Testing

See `src/app/translate/ChatInterface.test.tsx` for unit tests covering [fill in once tests are written].

## Deployment

Deployed on Vercel, connected to this GitHub repo's `main` branch. Every push to `main` triggers a new production deployment automatically.

**Rollback:** redeploy the previous working commit from the Vercel Deployments tab, or `git revert` the breaking commit and push.
