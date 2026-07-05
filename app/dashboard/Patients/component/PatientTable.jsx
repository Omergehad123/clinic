"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDeletePatient } from "@/hooks/usePatients"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { FaUser, FaEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import Swal from "sweetalert2"

function ActionMenu({ patient, openMenu, setOpenMenu, onView, onEdit, onDelete, size = "normal" }) {
    const isOpen = openMenu === patient.id
    return (
        <div className="flex items-center justify-center relative">
            {isOpen && <div className="fixed inset-0 z-40" onClick={() => setOpenMenu(null)} />}
            <button
                className={`rounded-md bg-(--main-color) flex items-center justify-center cursor-pointer ${size === "sm" ? "p-1.5 w-7 h-7" : "p-2 w-8 h-8"}`}
                onClick={() => setOpenMenu(isOpen ? null : patient.id)}
            >
                <BiDotsVerticalRounded size={size === "sm" ? 18 : 22} className="text-(--text-color)/70" />
            </button>
            {isOpen && (
                <div className="absolute top-8 right-0 min-w-[140px] rounded-lg shadow-lg bg-(--main-color) z-50 animate-popIn border border-(--text-color)/10">
                    <button
                        className="flex items-center w-full px-4 py-2 text-sm text-(--p-color) hover:text-(--text-color) transition-all gap-2 cursor-pointer"
                        onClick={() => { setOpenMenu(null); onView(patient.id) }}
                    >
                        <FaUser className="w-4 h-4" /> View
                    </button>
                    <button
                        className="flex items-center w-full px-4 py-2 text-sm text-(--p-color) hover:text-(--text-color) transition-all gap-2 cursor-pointer"
                        onClick={() => { setOpenMenu(null); onEdit(patient.id) }}
                    >
                        <FaEdit className="w-4 h-4" /> Edit
                    </button>
                    <button
                        className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:text-red-600 transition-all gap-2 cursor-pointer"
                        onClick={() => { setOpenMenu(null); onDelete(patient) }}
                    >
                        <RiDeleteBin6Line className="w-4 h-4" /> Delete
                    </button>
                </div>
            )}
        </div>
    )
}

function TableSkeleton() {
    return Array.from({ length: 4 }).map((_, i) => (
        <tr key={i} className="border-b border-(--text-color)/10 animate-pulse">
            {Array.from({ length: 7 }).map((_, j) => (
                <td key={j} className="px-4 py-3">
                    <div className="h-4 bg-(--text-color)/10 rounded w-3/4" />
                </td>
            ))}
        </tr>
    ))
}

function EmptyState({ onAdd }) {
    return (
        <tr>
            <td colSpan={7}>
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                    <div className="w-14 h-14 rounded-full bg-(--second-color)/10 flex items-center justify-center text-(--second-color) text-2xl">👤</div>
                    <p className="text-(--text-color) font-semibold">No patients yet</p>
                    <p className="text-(--p-color) text-sm">No patients have been added yet.</p>
                    <button
                        onClick={onAdd}
                        className="px-5 py-2 rounded-lg bg-(--second-color) text-white text-sm hover:opacity-90 transition-opacity"
                    >
                        + Add Patient
                    </button>
                </div>
            </td>
        </tr>
    )
}

function PatientTable({ patients = [], isLoading = false }) {
    const router = useRouter()
    const { mutate: deletePatient } = useDeletePatient()
    const [openMenu, setOpenMenu] = useState(null)

    const handleDelete = (patient) => {
        Swal.fire({
            title: "Delete Patient?",
            text: `This will permanently delete "${patient.fullName}".`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                deletePatient(patient.id)
                Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false })
            }
        })
    }

    const menuProps = {
        openMenu,
        setOpenMenu,
        onView: (id) => router.push(`/dashboard/Patients/${id}`),
        onEdit: (id) => router.push(`/dashboard/Patients/${id}/edit`),
        onDelete: handleDelete,
    }

    const headers = ["Full Name", "Phone", "Gender", "Age", "Last Visit", "Next Appointment", "Actions"]

    return (
        <div className="bg-(--main-color) rounded-xl ">
            {/* Large screens */}
            <div className="hidden lg:block w-full">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-(--bg-color) border-b border-(--text-color)/10">
                            {headers.map(h => (
                                <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-(--p-color) font-medium">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <TableSkeleton />
                        ) : patients.length === 0 ? (
                            <EmptyState onAdd={() => router.push("/dashboard/Patients/new")} />
                        ) : (
                            patients.map(patient => (
                                <tr
                                    key={patient.id}
                                    onClick={() => router.push(`/dashboard/Patients/${patient.id}`)}
                                    className="border-b border-(--text-color)/5 last:border-0 hover:bg-(--bg-color) transition-colors cursor-pointer"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-(--second-color)/10 flex items-center justify-center text-(--second-color) font-bold text-sm shrink-0">
                                                {patient.fullName?.[0]?.toUpperCase()}
                                            </div>
                                            <span className="font-medium text-(--text-color)">{patient.fullName}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-(--text-color)">{patient.phone}</td>
                                    <td className="px-4 py-3 text-(--text-color) capitalize">{patient.gender || "—"}</td>
                                    <td className="px-4 py-3 text-(--text-color)">{patient.age || "—"}</td>
                                    <td className="px-4 py-3 text-(--text-color)">{patient.lastVisit || "—"}</td>
                                    <td className="px-4 py-3 text-(--text-color)">{patient.nextAppointment || "—"}</td>
                                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                        <ActionMenu patient={patient} {...menuProps} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Small screens */}
            <div className="block lg:hidden w-full ">
                <table className="w-full border-collapse text-xs">
                    <thead>
                        <tr className="bg-(--bg-color) border-b border-(--text-color)/10">
                            {["Name", "Phone", "Gender", "Age", "Actions"].map(h => (
                                <th key={h} className="text-left px-2 py-2 font-semibold text-xs text-(--p-color)">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <tr key={i} className="animate-pulse border-b border-(--text-color)/10">
                                    {Array.from({ length: 5 }).map((_, j) => (
                                        <td key={j} className="px-2 py-2"><div className="h-3 bg-(--text-color)/10 rounded w-full" /></td>
                                    ))}
                                </tr>
                            ))
                        ) : patients.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-(--p-color)">No patients found.</td></tr>
                        ) : (
                            patients.map(patient => (
                                <tr
                                    key={patient.id}
                                    onClick={() => router.push(`/dashboard/Patients/${patient.id}`)}
                                    className="border-b border-(--text-color)/20 hover:bg-(--bg-color) transition-colors cursor-pointer"
                                >
                                    <td className="px-2 py-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-(--second-color)/10 flex items-center justify-center text-(--second-color) font-bold text-xs shrink-0">
                                                {patient.fullName?.[0]?.toUpperCase()}
                                            </div>
                                            <span className="font-medium text-(--text-color) truncate max-w-[70px]">{patient.fullName}</span>
                                        </div>
                                    </td>
                                    <td className="px-2 py-2 text-(--text-color)">{patient.phone}</td>
                                    <td className="px-2 py-2 text-(--text-color) capitalize">{patient.gender || "—"}</td>
                                    <td className="px-2 py-2 text-(--text-color)">{patient.age || "—"}</td>
                                    <td className="px-2 py-2 " onClick={(e) => e.stopPropagation()}>
                                        <ActionMenu patient={patient} size="sm" {...menuProps} />
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PatientTable