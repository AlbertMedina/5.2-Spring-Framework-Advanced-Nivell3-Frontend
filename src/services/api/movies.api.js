import { API_URL } from "../../config/api.config";

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getAllMovies({
  token,
  page,
  size,
  genre,
  onlyAvailable = false,
  title,
  sortBy,
  ascending = true,
}) {
  const params = new URLSearchParams({
    page,
    size,
    sortBy,
    ascending,
  });

  if (genre) params.append("genre", genre);
  if (title) params.append("title", title);
  if (onlyAvailable) params.append("onlyAvailable", true);

  const res = await fetch(`${API_URL}/movies?${params.toString()}`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Cannot get movies");
  }

  return await res.json();
}

export async function getGenres(token) {
  const res = await fetch(`${API_URL}/movies/genres`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Cannot get genres");
  }

  return await res.json();
}
