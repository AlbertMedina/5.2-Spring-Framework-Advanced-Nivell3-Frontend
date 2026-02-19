import { API_URL } from "../../config/api.config";

function authHeaders(token) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    };
}

export async function getMe(token) {
    const res = await fetch(`${API_URL}/me`, {
        headers: authHeaders(token),
    });

    if (!res.ok) {
        if (res.status === 401) {
            forceLogOut();
            return;
        }

        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Cannot get user info");
    }

    return await res.json();
}

export async function getUser(token, userId) {
    const res = await fetch(`${API_URL}/users/${userId}`, {
        headers: authHeaders(token),
    });

    if (!res.ok) {
        if (res.status === 401) {
            forceLogOut();
            return;
        }

        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Cannot get user ${userId}`);
    }

    return await res.json();
}

export async function getAllUsers(token) {
    const res = await fetch(`${API_URL}/users`, {
        headers: authHeaders(token),
    });

    if (!res.ok) {
        if (res.status === 401) {
            forceLogOut();
            return;
        }

        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Cannot get all users");
    }

    return await res.json();
}

export async function removeUser(token, userId) {
    const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: authHeaders(token),
    });

    if (!res.ok) {
        if (res.status === 401) {
            forceLogOut();
            return;
        }

        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Cannot remove user ${userId}`);
    }

    return true;
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

function forceLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
}
