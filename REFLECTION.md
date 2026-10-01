# Reflection

**What was hardest?**
Keeping the project itself straight. I had two repos (`capstone` and `capstone-app`) serving different tasks, and mid-build I nearly deployed the wrong one as my capstone. Separately, I hit a real security near-miss: I pasted a live API key into a chat, which meant treating it as compromised and rotating it immediately rather than trusting that it was fine.

**Debugging the AI integration was the other hard part.** A `messages.some is not a function` error turned out to be a missing `await` on `convertToModelMessages` — the function is async in the SDK version I was using, and the error message didn't point at that directly. I had to add temporary logging to see the actual request shape before I found it.

**What would I do differently next time?**
Set up the repo and environment correctly before writing any feature code — one project, one `.gitignore` checked early, API keys only ever typed into the editor and never into a terminal command or a chat. I'd also test the deployed (not just local) version earlier, since two bugs (the Next.js route-segment-config rule, and a stale model name Google deprecated) only showed up once deployed.

**One thing that surprised me:**
How much of "AI integration" is actually ordinary engineering — version mismatches, rate limits, and config rules — rather than anything about the model itself. The actual Gemini call was the easy part; getting a clean, safe, deployed pipeline around it took far longer.
