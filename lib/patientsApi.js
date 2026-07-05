const API_URL = "http://localhost:5000/patients";

export async function getPatients() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch patients");
    return res.json();
}

export async function getPatientById(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch patient");
    return res.json();
}

export async function createPatientApi(data) {
    const now = new Date();
    const registrationDate = now.toLocaleDateString("en-US", {
        year: "numeric", month: "long", day: "numeric"
    });
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            ...data,
            registrationDate,
            totalVisits: 0,
            totalPaid: 0,
            outstandingBalance: 0,
            lastVisit: null,
            nextAppointment: null,
        }),
    });
    if (!res.ok) throw new Error("Failed to create patient");
    return res.json();
}

export async function updatePatientApi(id, updatedFields) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
    });
    if (!res.ok) throw new Error("Failed to update patient");
    return res.json();
}

export async function deletePatientApi(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete patient");
    return id;
}