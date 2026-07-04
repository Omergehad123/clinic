const API_URL = "http://localhost:5000/services";

export async function getServices() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch services");
    return res.json();
}

export async function createService(newService) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newService),
    });
    if (!res.ok) throw new Error("Failed to create service");
    return res.json();
}

export async function deleteServiceApi(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete service");
    return id;
}

export async function updateServiceApi(id, updatedFields) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
    });
    if (!res.ok) throw new Error("Failed to update service");
    return res.json();
}