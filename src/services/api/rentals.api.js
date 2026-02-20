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

export async function getMyRentals(token) {
  const res = await fetch(`${API_URL}/me/rentals`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot get my rentals");
  }

  return await res.json();
}

export async function getUserRentals(token, userId) {
  const res = await fetch(`${API_URL}/users/${userId}/rentals`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot get user rentals");
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

export async function userHasRentedMovie(token, movieId) {
  const res = await fetch(`${API_URL}/me/rentals/${movieId}`, {
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
