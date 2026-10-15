// In deployment, set VITE_API_URL to your Render backend URL (no trailing slash)
const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const URL = `${API}/api/items`;

export async function getItems() {
  const res = await fetch(URL);
  return res.json();
}
export async function createItem(data) {
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function updateItem(id, data) {
  const res = await fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
export async function deleteItem(id) {
  const res = await fetch(`${URL}/${id}`, { method: "DELETE" });
  return res.json();
}
