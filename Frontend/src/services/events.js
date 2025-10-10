const BASE_URL = "http://localhost:4000";

export async function createEvent(payload) {
  const res = await fetch(`${BASE_URL}/eventuro/api/event`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

