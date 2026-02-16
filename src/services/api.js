const API_URL = "http://localhost:8080";

export async function loginUser(loginIdentifier, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ loginIdentifier, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error de login");
  }

  return await res.json();
}

export async function registerUser({ name, surname, username, email, password }) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, surname, username, email, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Error de registre");
  }

  return await res.json();
}

export async function getMe(token) {
  const res = await fetch(`${API_URL}/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Cannot get user info");
  }

  return await res.json();
}