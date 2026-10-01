async function getHealth() {
  const url = process.env.HEALTH_API_URL;
  if (!url) return { ok: false, error: "HEALTH_API_URL is not set" };
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return { ok: false, error: `Upstream returned ${res.status}` };
    return { ok: true, data: await res.json() };
  } catch {
    return { ok: false, error: "Could not reach the upstream API" };
  }
}

export default async function HealthPage() {
  const result = await getHealth();
  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold">Health check</h1>
      <p className="mt-2">
        Status:{" "}
        <span className={result.ok ? "text-green-700" : "text-red-700"}>
          {result.ok ? "OK" : "Error"}
        </span>
      </p>
      <pre className="mt-4 overflow-x-auto rounded bg-black/5 p-4 text-sm dark:bg-white/10">
        {JSON.stringify(result.ok ? result.data : { error: result.error }, null, 2)}
      </pre>
    </div>
  );
}
