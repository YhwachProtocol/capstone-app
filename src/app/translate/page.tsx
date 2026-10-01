import ChatInterface from "./ChatInterface";

export default function TranslatePage() {
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Translate</h1>
      <p className="mt-2 text-zinc-600">
        Type a sentence and get it translated into ASL gloss, streamed live.
      </p>
      <div className="mt-4">
        <ChatInterface />
      </div>
    </div>
  );
}
