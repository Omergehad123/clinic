"use client"
import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { usePatients, useDeletePatient } from "@/hooks/usePatients"
import usePatientsUiStore from "@/store/patientsUiStore"
import { FaSearch, FaUserPlus } from "react-icons/fa"
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi"
import Swal from "sweetalert2"
import PatientTable from "./component/PatientTable"

function PatientRow({ patient, onView, onEdit, onDelete }) {
    return (
        <tr
            onClick={() => onView(patient.id)}
            className="border-b border-(--text-color)/10 hover:bg-(--bg-color) transition-colors cursor-pointer"
        >
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-(--second-color)/10 flex items-center justify-center text-(--second-color) font-bold text-sm shrink-0">
                        {patient.fullName?.[0]?.toUpperCase()}
                    </div>
                    <span className="font-medium text-(--text-color)">{patient.fullName}</span>
                </div>
            </td>
            <td className="px-4 py-3 text-(--text-color) text-sm">{patient.phone}</td>
            <td className="px-4 py-3 text-(--text-color) text-sm capitalize">{patient.gender}</td>
            <td className="px-4 py-3 text-(--text-color) text-sm">{patient.age}</td>
            <td className="px-4 py-3 text-(--text-color) text-sm">{patient.lastVisit || "—"}</td>
            <td className="px-4 py-3 text-(--text-color) text-sm">{patient.nextAppointment || "—"}</td>
            <td className="px-4 py-3 text-(--text-color) text-sm">{patient.registrationDate}</td>
            <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-1.5">
                    <button
                        onClick={() => onView(patient.id)}
                        className="w-[28px] h-[28px] rounded-lg border border-(--text-color)/15 flex items-center justify-center text-(--text-color)/40 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all"
                    >
                        <FiEye size={12} />
                    </button>
                    <button
                        onClick={() => onEdit(patient.id)}
                        className="w-[28px] h-[28px] rounded-lg border border-(--text-color)/15 flex items-center justify-center text-(--text-color)/40 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-600 transition-all"
                    >
                        <FiEdit2 size={12} />
                    </button>
                    <button
                        onClick={() => onDelete(patient)}
                        className="w-[28px] h-[28px] rounded-lg border border-(--text-color)/15 flex items-center justify-center text-(--text-color)/40 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all"
                    >
                        <FiTrash2 size={12} />
                    </button>
                </div>
            </td>
        </tr>
    )
}

function TableSkeleton() {
    return Array.from({ length: 4 }).map((_, i) => (
        <tr key={i} className="border-b border-(--text-color)/10 animate-pulse">
            {Array.from({ length: 8 }).map((_, j) => (
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
            <td colSpan={8}>
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <div className="w-16 h-16 rounded-full bg-(--second-color)/10 flex items-center justify-center">
                        <FaUserPlus className="text-(--second-color) text-2xl" />
                    </div>
                    <p className="text-(--text-color) font-semibold text-lg">No patients yet</p>
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

function PatientsPage() {
    const router = useRouter()
    const { data: patients = [], isLoading } = usePatients()
    const { mutate: deletePatient } = useDeletePatient()
    const { search, setSearch } = usePatientsUiStore()

    const filtered = useMemo(() => {
        if (!search.trim()) return patients
        return patients.filter(p =>
            p.fullName?.toLowerCase().includes(search.toLowerCase()) ||
            p.phone?.includes(search)
        )
    }, [patients, search])

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

    return (
        <section>
            {/* Header */}
            <div className="bg-(--main-color) flex items-center justify-between p-4 rounded-xl mb-4">
                <div>
                    <h1 className="text-(--text-color) font-bold text-2xl">Patients</h1>
                    <p className="text-(--p-color) text-sm mt-0.5">Manage all patients registered in the clinic.</p>
                </div>
                <button
                    onClick={() => router.push("/dashboard/Patients/new")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--second-color) text-white text-sm hover:opacity-90 transition-opacity"
                >
                    <FaUserPlus size={14} />
                    Add Patient
                </button>
            </div>

            {/* Search */}
            <div className="bg-(--main-color) p-3 rounded-xl mb-4">
                <div className="flex items-center gap-2 px-3 bg-(--bg-color) w-full md:w-[300px] h-[36px] rounded-lg border border-(--text-color)/20">
                    <FaSearch className="text-(--text-color)/40 text-sm shrink-0" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or phone…"
                        className="w-full h-full focus:outline-none text-(--text-color) text-sm bg-transparent"
                    />
                </div>
            </div>

            {/* Table */}
            <PatientTable patients={filtered} isLoading={isLoading} />
        </section>
    )
}

export default PatientsPage