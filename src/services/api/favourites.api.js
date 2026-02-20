import { API_URL } from "../../config/api.config";

function authHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function addFavourite(token, movieId) {
  const res = await fetch(`${API_URL}/favourites`, {
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
    throw new Error(err.message || "Cannot add favourite");
  }

  return await res.json();
}

export async function removeFavourite(token, movieId) {
  const res = await fetch(`${API_URL}/favourites/${movieId}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot remove favourite");
  }

  return true;
}

export async function getMyFavourites(token) {
  const res = await fetch(`${API_URL}/me/favourites`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot get favourites");
  }

  return await res.json();
}

export async function userHasFavouriteMovie(token, movieId) {
  const res = await fetch(`${API_URL}/me/favourites/${movieId}`, {
    headers: authHeaders(token),
  });

  if (!res.ok) {
    if (res.status === 401) {
      forceLogOut();
      return;
    }

    const err = await res.json();
    throw new Error(err.message || "Cannot check favourite");
  }

  return await res.json();
}

function forceLogOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
}
