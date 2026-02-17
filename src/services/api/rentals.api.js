import { API_URL } from "../../config/api.config";

function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function rentMovie(token, movieId) {
  const res = await fetch(`${API_URL}/rentals`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ movieId }),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cannot rent movie");
  }

  return await res.json();
}

export async function returnMovie(token, movieId) {
  const res = await fetch(`${API_URL}/rentals/${movieId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cannot return movie");
  }

  return true;
}

export async function getMyRentals(token) {
  const res = await fetch(`${API_URL}/me/rentals`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cannot get my rentals");
  }

  return await res.json();
}

export async function getRentalsByUser(token, userId) {
  const res = await fetch(`${API_URL}/users/${userId}/rentals`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cannot get user rentals");
  }

  return await res.json();
}

export async function getRentalsByMovie(token, movieId) {
  const res = await fetch(`${API_URL}/movies/${movieId}/rentals`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cannot get movie rentals");
  }

  return await res.json();
}
