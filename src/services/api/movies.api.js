import { API_URL } from "../../config/api.config";

function authHeaders(token) {
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function addMovie(token, movieData, posterFile) {
  const formData = new FormData();
  formData.append(
    "movie",
    new Blob([JSON.stringify(movieData)], { type: "application/json" })
  );

  if (posterFile) {
    formData.append("poster", posterFile);
  }

  const res = await fetch(`${API_URL}/movies`, {
    method: "POST",
    headers: authHeaders(token),
    body: formData,
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json().catch(() => ({}));
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
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json().catch(() => ({}));
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
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Cannot delete movie");
  }

  return true;
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
  const params = new URLSearchParams();

  params.append("page", page);
  params.append("size", size);
  params.append("sortBy", sortBy);
  params.append("ascending", ascending);

  if (genre != null && genre !== "") {
    params.append("genre", genre);
  }

  if (title != null && title !== "") {
    params.append("title", title);
  }

  if (onlyAvailable === true) {
    params.append("onlyAvailable", "true");
  }


  const res = await fetch(`${API_URL}/movies?${params.toString()}`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Cannot get movies");
  }

  return await res.json();
}

export async function getMovie(token, movieId) {
  const res = await fetch(`${API_URL}/movies/${movieId}`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Cannot get movie");
  }

  return await res.json();
}

export async function getGenres(token) {
  const res = await fetch(`${API_URL}/movies/genres`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Cannot get genres");
  }

  return await res.json();
}

export async function getMovieRating(token, movieId) {
  const res = await fetch(`${API_URL}/movies/${movieId}/rating`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot get movie rating");
  }

  return await res.json();
}

export async function getMovieReviews(token, movieId) {
  const res = await fetch(`${API_URL}/movies/${movieId}/reviews`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot get movie reviews");
  }

  return await res.json();
}

export async function getMovieRentals(token, movieId) {
  const res = await fetch(`${API_URL}/movies/${movieId}/rentals`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot get movie rentals");
  }

  return await res.json();
}

function forceLogOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
}
