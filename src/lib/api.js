// Talks to the .NET backend (see /backend).
// In dev, Vite proxies /api -> http://localhost:5000 (see vite.config.js).
// In production, set VITE_API_URL to your deployed backend URL.

const BASE_URL = import.meta.env.VITE_API_URL || "";

export async function submitApplication(payload) {
  const res = await fetch(`${BASE_URL}/api/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Failed to submit application");
  }
  return res.json();
}
