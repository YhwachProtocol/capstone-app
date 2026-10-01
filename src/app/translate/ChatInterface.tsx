"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";

export default function ChatInterface() {
  const { messages, sendMessage, status, stop } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const userScrolledUp = useRef(false);

  useEffect(() => {
    if (!userScrolledUp.current) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  function handleScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    userScrolledUp.current = el.scrollHeight - el.scrollTop - el.clientHeight > 80;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ text: input });
    setInput("");
    userScrolledUp.current = false;
  }

  const isBusy = status === "submitted" || status === "streaming";

  return (
    <div className="mx-auto flex h-[70vh] max-w-2xl flex-col rounded-xl border border-black/10 dark:border-white/10">
      <div onScroll={handleScroll} className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={
              m.role === "user"
                ? "ml-auto max-w-[80%] rounded-xl bg-blue-600 px-3 py-2 text-white"
                : "mr-auto max-w-[80%] rounded-xl bg-black/5 px-3 py-2 dark:bg-white/10"
            }
          >
            {m.parts.map((part, i) =>
              part.type === "text" ? <span key={i}>{part.text}</span> : null
            )}
          </div>
        ))}
        {status === "submitted" && (
          <div className="mr-auto max-w-[80%] rounded-xl bg-black/5 px-3 py-2 text-zinc-500 dark:bg-white/10">
            Thinking…
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-black/10 p-3 dark:border-white/10">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a sentence to translate…"
          className="min-w-0 flex-1 rounded-xl border border-black/20 px-3 py-2 text-base dark:border-white/20 dark:bg-black"
          disabled={isBusy}
        />
        {isBusy ? (
          <button type="button" onClick={stop} className="shrink-0 rounded-xl bg-black/10 px-4 py-2 font-medium dark:bg-white/10">
            Stop
          </button>
        ) : (
          <button type="submit" className="shrink-0 rounded-xl bg-blue-600 px-4 py-2 font-medium text-white">
            Send
          </button>
        )}
      </form>
    </div>
  );
}
