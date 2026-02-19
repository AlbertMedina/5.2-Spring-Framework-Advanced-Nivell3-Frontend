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
    if (res.status === 401) {
      forceLogOut();
      return;
    }

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
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot return movie");
  }

  return true;
}

export async function userHasRentedMovie(token, movieId) {
  const res = await fetch(`${API_URL}/rentals/movies/${movieId}`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot check rental");
  }

  return await res.json();
}

function forceLogOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
}
