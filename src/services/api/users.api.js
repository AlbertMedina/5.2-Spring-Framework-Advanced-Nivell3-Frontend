const API_URL = "http://localhost:8080";

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
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || `Cannot delete user ${userId}`);
    }

    return true;
}
