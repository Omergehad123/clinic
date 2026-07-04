const API_URL = "http://localhost:5000/appointments";

export async function getAppointments() {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error("failed to fetch Appoinments")
    return res.json();
}

export async function createAppointment(appoinment) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appoinment),
    });
    if (!res.ok) throw new Error("Failed to create Appoinments");
    return res.json();
}

export async function deleteAppointment(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete Appoinments");
    return id;
}

export async function updateAppointment(id, updatedFields) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
    });
    if (!res.ok) throw new Error("Failed to update appointment");
    return res.json();
}