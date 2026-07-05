const API_URL = "http://localhost:5000/prescriptions";

export async function getPrescriptions() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch prescriptions");
    return res.json();
}

export async function getPrescriptionById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch prescription");
    return res.json();
}

export async function createPrescriptionApi(data) {
    const now = new Date();
    const createdAt = now.toISOString().split("T")[0];
    const timeline = [{ action: "Prescription Created", date: createdAt, time: now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }) }];
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, createdAt, timeline, status: data.status || "active" }),
    });
    if (!res.ok) throw new Error("Failed to create prescription");
    return res.json();
}

export async function updatePrescriptionApi(id, updatedFields) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
    });
    if (!res.ok) throw new Error("Failed to update prescription");
    return res.json();
}

export async function deletePrescriptionApi(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete prescription");
    return id;
}