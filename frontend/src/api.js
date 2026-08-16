const BASE_URL = import.meta.env.VITE_API_URL || "";

function authHeaders() {
  const token = localStorage.getItem("lr_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handle(res) {
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) throw new Error((data && data.error) || `Request failed (${res.status})`);
  return data;
}

export const api = {
  health: () => fetch(`${BASE_URL}/api/health`).then(handle),

  register: (username, password) =>
    fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then(handle),

  login: (username, password) =>
    fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }).then(handle),

  getPantry: () => fetch(`${BASE_URL}/api/pantry`, { headers: { ...authHeaders() } }).then(handle),

  addPantryItem: (name) =>
    fetch(`${BASE_URL}/api/pantry`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ name }),
    }).then(handle),

  removePantryItem: (id) =>
    fetch(`${BASE_URL}/api/pantry/${id}`, { method: "DELETE", headers: { ...authHeaders() } }).then(handle),

  searchRecipes: (ingredients) =>
    fetch(`${BASE_URL}/api/recipes/search`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ ingredients }),
    }).then(handle),

  getRecipe: (id) => fetch(`${BASE_URL}/api/recipes/${id}`, { headers: { ...authHeaders() } }).then(handle),

  getFavorites: () => fetch(`${BASE_URL}/api/favorites`, { headers: { ...authHeaders() } }).then(handle),

  addFavorite: (recipeId, title, image) =>
    fetch(`${BASE_URL}/api/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ recipeId, title, image }),
    }).then(handle),

  removeFavorite: (id) =>
    fetch(`${BASE_URL}/api/favorites/${id}`, { method: "DELETE", headers: { ...authHeaders() } }).then(handle),
};
