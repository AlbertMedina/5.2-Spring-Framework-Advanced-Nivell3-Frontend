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
    const err = await res.json();
    throw new Error(err.message || "Cannot remove review");
  }

  return true;
}

export async function getReviewsByMovie(movieId) {
  const res = await fetch(`${API_URL}/movies/${movieId}/reviews`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cannot get reviews");
  }

  return await res.json();
}
