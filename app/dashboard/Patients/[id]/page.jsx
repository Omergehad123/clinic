"use client"
import { useParams, useRouter } from "next/navigation"
import { usePatient, useDeletePatient } from "@/hooks/usePatients"
import { useState } from "react"
import { FaArrowLeft, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUserPlus } from "react-icons/fa"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import Swal from "sweetalert2"

const DUMMY_APPOINTMENTS = [
    { id: "A1", date: "2024-06-10", time: "10:00 AM", service: "Dental Cleaning", status: "Completed", paid: 120 },
    { id: "A2", date: "2024-07-15", time: "09:30 AM", service: "Routine Checkup", status: "Upcoming", paid: 0 },
]

function StatCard({ label, value, color = "text-(--second-color)" }) {
    return (
        <div className="bg-(--main-color) rounded-xl p-4 flex flex-col gap-1">
            <p className="text-[11px] uppercase tracking-wider text-(--p-color)">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
    )
}

function Tag({ label, color = "bg-red-50 text-red-600 border-red-200" }) {
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${color}`}>{label}</span>
    )
}

function SkeletonProfile() {
    return (
        <div className="animate-pulse flex flex-col gap-4">
            <div className="h-32 bg-(--text-color)/10 rounded-xl" />
            <div className="h-20 bg-(--text-color)/10 rounded-xl" />
            <div className="h-48 bg-(--text-color)/10 rounded-xl" />
        </div>
    )
}

function PatientProfile() {
    const { id } = useParams()
    const router = useRouter()
    const { data: patient, isLoading, error } = usePatient(id)
    const { mutate: deletePatient } = useDeletePatient()
    const [tab, setTab] = useState("overview")

    const handleDelete = () => {
        Swal.fire({
            title: "Delete Patient?",
            text: `This will permanently delete "${patient?.fullName}".`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                deletePatient(id)
                Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false })
                    .then(() => router.push("/dashboard/Patients"))
            }
        })
    }

    if (isLoading) return <SkeletonProfile />
    if (error) return <p className="text-red-500 p-5">{error.message}</p>
    if (!patient) return <p className="text-(--p-color) p-5">Patient not found.</p>

    const tabs = ["Overview", "Appointments", "Medical History"]

    return (
        <section className="max-w-5xl mx-auto">
            {/* Back */}
            <button onClick={() => router.back()} className="flex items-center gap-2 text-(--p-color) hover:text-(--text-color) text-sm mb-5 transition-colors">
                <FaArrowLeft size={12} /> Back to Patients
            </button>

            {/* Top card */}
            <div className="bg-(--main-color) rounded-xl p-6 mb-4 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="w-20 h-20 rounded-full bg-(--second-color)/10 flex items-center justify-center text-(--second-color) font-bold text-3xl shrink-0">
                    {patient.fullName?.[0]?.toUpperCase()}
                </div>
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-(--text-color) font-bold text-2xl">{patient.fullName}</h1>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2 text-(--p-color) text-sm">
                        <span className="capitalize">{patient.gender}</span>
                        <span>•</span>
                        <span>Age {patient.age}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1"><FaPhone size={11} />{patient.phone}</span>
                        {patient.address && <>
                            <span>•</span>
                            <span className="flex items-center gap-1"><FaMapMarkerAlt size={11} />{patient.address}</span>
                        </>}
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2 text-(--p-color) text-xs">
                        <FaCalendarAlt size={11} />
                        Registered {patient.registrationDate}
                    </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                    <button
                        onClick={() => router.push(`/dashboard/Appointments/new?patientId=${patient.id}`)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-(--second-color) text-white text-xs hover:opacity-90 transition-opacity"
                    >
                        <FaUserPlus size={12} /> New Appointment
                    </button>
                    <button
                        onClick={() => router.push(`/dashboard/Patients/${id}/edit`)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-(--text-color)/20 text-(--text-color) text-xs hover:bg-(--bg-color) transition-colors"
                    >
                        <FiEdit2 size={12} /> Edit
                    </button>
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-500 text-xs hover:bg-red-50 transition-colors"
                    >
                        <FiTrash2 size={12} /> Delete
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <StatCard label="Total Visits" value={patient.totalVisits ?? 0} />
                <StatCard label="Next Appointment" value={patient.nextAppointment || "—"} color="text-(--text-color)" />
                <StatCard label="Total Paid" value={`$${patient.totalPaid ?? 0}`} color="text-teal-600" />
                <StatCard label="Outstanding" value={`$${patient.outstandingBalance ?? 0}`} color="text-red-500" />
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-(--main-color) rounded-xl p-1 mb-4">
                {tabs.map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t.toLowerCase().replace(" ", "-"))}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.toLowerCase().replace(" ", "-")
                            ? "bg-(--second-color) text-white"
                            : "text-(--p-color) hover:text-(--text-color)"
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            {/* Tab: Overview */}
            {tab === "overview" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-(--main-color) rounded-xl p-5">
                        <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-4">Personal Information</h3>
                        <div className="flex flex-col gap-3 text-sm">
                            {[
                                { label: "Full Name", value: patient.fullName },
                                { label: "Phone", value: patient.phone },
                                { label: "Date of Birth", value: patient.dob || "—" },
                                { label: "Gender", value: patient.gender || "—" },
                                { label: "Address", value: patient.address || "—" },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex justify-between">
                                    <span className="text-(--p-color)">{label}</span>
                                    <span className="text-(--text-color) font-medium capitalize">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="bg-(--main-color) rounded-xl p-5">
                            <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-3">Last Visit</h3>
                            <p className="text-(--text-color) text-sm">{patient.lastVisit || "No visits yet"}</p>
                        </div>
                        <div className="bg-(--main-color) rounded-xl p-5">
                            <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-3">Next Appointment</h3>
                            <p className="text-(--text-color) text-sm">{patient.nextAppointment || "No upcoming appointment"}</p>
                        </div>
                        <div className="bg-(--main-color) rounded-xl p-5">
                            <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-3">Notes</h3>
                            <p className="text-(--p-color) text-sm">{patient.notes || "No notes added."}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Tab: Appointments */}
            {tab === "appointments" && (
                <div className="bg-(--main-color) rounded-xl overflow-hidden">
                    <table className="w-full border-collapse text-sm">
                        <thead>
                            <tr className="bg-(--bg-color) border-b border-(--text-color)/10">
                                {["Date", "Time", "Service", "Status", "Paid"].map(h => (
                                    <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-(--p-color) font-medium">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {DUMMY_APPOINTMENTS.length === 0 ? (
                                <tr><td colSpan={5} className="text-center py-10 text-(--p-color)">No appointments found.</td></tr>
                            ) : (
                                DUMMY_APPOINTMENTS.map(app => (
                                    <tr key={app.id} className="border-b border-(--text-color)/5 last:border-0 hover:bg-(--bg-color) transition-colors cursor-pointer">
                                        <td className="px-4 py-3 text-(--text-color)">{app.date}</td>
                                        <td className="px-4 py-3 text-(--text-color)">{app.time}</td>
                                        <td className="px-4 py-3 text-(--text-color)">{app.service}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${app.status === "Completed" ? "bg-teal-50 text-teal-700 border-teal-200" : "bg-blue-50 text-blue-600 border-blue-200"}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-(--text-color)">${app.paid}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Tab: Medical History */}
            {tab === "medical-history" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-(--main-color) rounded-xl p-5">
                        <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-3">Allergies</h3>
                        {patient.allergies?.length ? (
                            <div className="flex flex-wrap gap-2">
                                {patient.allergies.map((a, i) => <Tag key={i} label={a} />)}
                            </div>
                        ) : <p className="text-(--p-color) text-sm">None recorded.</p>}
                    </div>

                    <div className="bg-(--main-color) rounded-xl p-5">
                        <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-3">Chronic Diseases</h3>
                        {patient.chronicDiseases?.length ? (
                            <div className="flex flex-wrap gap-2">
                                {patient.chronicDiseases.map((d, i) => <Tag key={i} label={d} color="bg-amber-50 text-amber-600 border-amber-200" />)}
                            </div>
                        ) : <p className="text-(--p-color) text-sm">None recorded.</p>}
                    </div>

                    <div className="bg-(--main-color) rounded-xl p-5">
                        <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-3">Current Medications</h3>
                        {patient.currentMedications?.length ? (
                            <div className="flex flex-wrap gap-2">
                                {patient.currentMedications.map((m, i) => <Tag key={i} label={m} color="bg-blue-50 text-blue-600 border-blue-200" />)}
                            </div>
                        ) : <p className="text-(--p-color) text-sm">None recorded.</p>}
                    </div>

                    <div className="bg-(--main-color) rounded-xl p-5">
                        <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-3">Notes</h3>
                        <p className="text-(--p-color) text-sm">{patient.notes || "No notes added."}</p>
                    </div>
                </div>
            )}
        </section>
    )
}

export default PatientProfile