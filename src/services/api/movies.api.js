import { API_URL } from "../../config/api.config";

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function getAllMovies({
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

  const res = await fetch(`${API_URL}/movies?${params.toString()}`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cannot get movies");
  }

  return await res.json();
}

export async function getMovie(movieId) {
  const res = await fetch(`${API_URL}/movies/${movieId}`);

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cannot get movie");
  }

  return await res.json();
}

export async function addMovie(token, movieData, posterFile) {
  const formData = new FormData();
  formData.append("movie", new Blob([JSON.stringify(movieData)], { type: "application/json" }));

  if (posterFile) {
    formData.append("poster", posterFile);
  }

  const res = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cannot add movie");
  }

  return await res.json();
}

export async function updateMovie(token, movieId, updateData) {
  const res = await fetch(`${API_URL}/movies/${movieId}`, {
    method: "PUT",
    headers: {
      ...authHeaders(token),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cannot update movie");
  }

  return await res.json();
}

export async function removeMovie(token, movieId) {
  const res = await fetch(`${API_URL}/movies/${movieId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Cannot delete movie");
  }

  return true;
}
