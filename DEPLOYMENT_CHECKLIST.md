# Deployment Checklist

- [x] Build passes locally (`npm run build`)
- [x] Environment variables set in Vercel (Production + Preview): `GOOGLE_GENERATIVE_AI_API_KEY`, `HEALTH_API_URL`
- [x] No secrets committed to the repo (`.env.local` git-ignored)
- [x] Every route loads on the live URL with no build errors
- [x] API key confirmed server-side only (checked via `git grep`)
- [x] Error states shown to the user (chat errors, health check failure) instead of raw crashes
- [ ] Automated tests run in CI (not set up — tests run manually via `npm test`)

**Rollback plan:** redeploy the previous working commit from Vercel's Deployments tab, or `git revert <bad-commit>` and push to `main`.

**Monitoring:** none automated yet; errors are currently caught manually via Vercel's deployment logs and the in-app error messages.
