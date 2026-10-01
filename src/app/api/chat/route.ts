import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { SYSTEM_PROMPT } from "@/lib/ai/config";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-3.8-flash"),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    onError: (error) => {
      const message = String(error);
      if (message.includes("RESOURCE_EXHAUSTED") || message.includes("429")) {
        return "The translator is handling a lot of requests right now. Please wait a moment and try again.";
      }
      return "Something went wrong generating a response. Please try again.";
    },
  });
}
