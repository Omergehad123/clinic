const API_URL = "http://localhost:5000/users";

export async function getUsers() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
}

export async function getUserById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
}

export async function createUserApi(data) {
    const now = new Date();
    const addDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, addDate }),
    });
    if (!res.ok) throw new Error("Failed to create user");
    return res.json();
}

export async function updateUserApi(id, updatedFields) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
}

export async function deleteUserApi(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete user");
    return id;
}