const API_URL = "http://localhost:8080";

export async function loginUser(loginIdentifier, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ loginIdentifier, password }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Login Error");
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
    throw new Error(err.message || "Register Error");
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

export async function getUser(token, userId) {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Cannot get user ${userId}`);
  }

  return await res.json();
}

export async function getAllUsers(token) {
  const res = await fetch(`${API_URL}/users`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Cannot get all users");
  }

  return await res.json();
}

export async function removeUser(token, userId) {
  const res = await fetch(`${API_URL}/users/${userId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Cannot delete user ${userId}`);
  }

  return true;
}
