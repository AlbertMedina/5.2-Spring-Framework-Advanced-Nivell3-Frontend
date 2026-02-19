import { API_URL } from "../../config/api.config";

function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function addReview(token, { movieId, rating, comment }) {
  const res = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: authHeaders(token),
    body: JSON.stringify({ movieId, rating, comment }),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot add review");
  }

  return await res.json();
}

export async function removeReview(token, movieId) {
  const res = await fetch(`${API_URL}/reviews/${movieId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot remove review");
  }

  return true;
}

function forceLogOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
}
