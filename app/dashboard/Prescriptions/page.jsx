"use client"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { usePrescriptions, useDeletePrescription } from "@/hooks/usePrescriptions"
import { FaSearch, FaPlus, FaPrint, FaEye, FaTrash, FaFileAlt } from "react-icons/fa"
import Swal from "sweetalert2"

function StatusBadge({ status }) {
    const styles = {
        active: "bg-teal-50 text-teal-700 border-teal-200",
        completed: "bg-blue-50 text-blue-700 border-blue-200",
        cancelled: "bg-red-50 text-red-600 border-red-200",
    }
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${styles[status] || "bg-gray-100 text-gray-500 border-gray-200"}`}>
            {status}
        </span>
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
                        <FaFileAlt className="text-(--second-color) text-2xl" />
                    </div>
                    <p className="text-(--text-color) font-semibold text-lg">No prescriptions yet</p>
                    <p className="text-(--p-color) text-sm">No prescriptions have been created yet.</p>
                    <button onClick={onAdd} className="px-5 py-2 rounded-lg bg-(--second-color) text-white text-sm hover:opacity-90 transition-opacity">
                        Create First Prescription
                    </button>
                </div>
            </td>
        </tr>
    )
}

function PrescriptionsPage() {
    const router = useRouter()
    const { data: prescriptions = [], isLoading } = usePrescriptions()
    const { mutate: deletePrescription } = useDeletePrescription()

    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState("")
    const [dateFilter, setDateFilter] = useState("")

    const filtered = useMemo(() => {
        let result = [...prescriptions]
        if (search.trim()) {
            result = result.filter(p =>
                p.patientName?.toLowerCase().includes(search.toLowerCase()) ||
                p.id?.toLowerCase().includes(search.toLowerCase()) ||
                p.medications?.some(m => m.name?.toLowerCase().includes(search.toLowerCase()))
            )
        }
        if (statusFilter) result = result.filter(p => p.status === statusFilter)
        if (dateFilter) result = result.filter(p => p.prescriptionDate === dateFilter)
        return result
    }, [prescriptions, search, statusFilter, dateFilter])

    const handleDelete = (prescription) => {
        Swal.fire({
            title: "Delete Prescription?",
            text: `This will permanently delete prescription ${prescription.id}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                deletePrescription(prescription.id)
                Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false })
            }
        })
    }

    const handlePrint = (prescription) => {
        router.push(`/dashboard/Prescriptions/${prescription.id}?print=true`)
    }

    return (
        <section>
            {/* Header */}
            <div className="bg-(--main-color) flex items-center justify-between p-4 rounded-xl mb-4">
                <div>
                    <h1 className="text-(--text-color) font-bold text-2xl">Prescriptions</h1>
                    <p className="text-(--p-color) text-sm mt-0.5">
                        {prescriptions.length} prescription{prescriptions.length !== 1 ? "s" : ""} total
                    </p>
                </div>
                <button
                    onClick={() => router.push("/dashboard/Prescriptions/new")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-(--second-color) text-white text-sm hover:opacity-90 transition-opacity"
                >
                    <FaPlus size={12} /> New Prescription
                </button>
            </div>

            {/* Filters */}
            <div className="bg-(--main-color) p-3 rounded-xl mb-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 px-3 bg-(--bg-color) w-full md:w-[280px] h-[36px] rounded-lg border border-(--text-color)/20">
                    <FaSearch className="text-(--text-color)/40 text-sm shrink-0" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search patient, ID, medication…"
                        className="w-full h-full focus:outline-none text-(--text-color) text-sm bg-transparent"
                    />
                </div>
                <div className="relative">
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                        className="appearance-none h-[36px] pl-3 pr-8 rounded-lg border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs cursor-pointer outline-none focus:border-(--second-color)">
                        <option value="">All statuses</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-(--text-color)/40 text-xs">▾</span>
                </div>
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="h-[36px] px-3 rounded-lg border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-xs outline-none focus:border-(--second-color)"
                />
                {(statusFilter || dateFilter || search) && (
                    <button
                        onClick={() => { setSearch(""); setStatusFilter(""); setDateFilter("") }}
                        className="text-xs text-(--second-color) hover:underline"
                    >
                        Clear filters
                    </button>
                )}
            </div>

            {/* Table */}
            <div className="bg-(--main-color) rounded-xl overflow-hidden">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-(--bg-color) border-b border-(--text-color)/10">
                            {["ID", "Patient", "Phone", "Medications", "Date", "Doctor", "Status", "Actions"].map(h => (
                                <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-(--p-color) font-medium">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? <TableSkeleton /> : filtered.length === 0 ? (
                            <EmptyState onAdd={() => router.push("/dashboard/Prescriptions/new")} />
                        ) : (
                            filtered.map(rx => (
                                <tr
                                    key={rx.id}
                                    onClick={() => router.push(`/dashboard/Prescriptions/${rx.id}`)}
                                    className="border-b border-(--text-color)/5 last:border-0 hover:bg-(--bg-color) transition-colors cursor-pointer"
                                >
                                    <td className="px-4 py-3">
                                        <span className="font-mono text-xs bg-(--bg-color) px-2 py-1 rounded text-(--second-color) font-semibold">
                                            {rx.id}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-(--second-color)/10 flex items-center justify-center text-(--second-color) font-bold text-xs shrink-0">
                                                {rx.patientName?.[0]?.toUpperCase()}
                                            </div>
                                            <span className="font-medium text-(--text-color)">{rx.patientName}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-(--text-color) text-xs">{rx.patientPhone}</td>
                                    <td className="px-4 py-3 text-(--text-color)">{rx.medications?.length ?? 0}</td>
                                    <td className="px-4 py-3 text-(--text-color) text-xs">{rx.prescriptionDate}</td>
                                    <td className="px-4 py-3 text-(--text-color) text-xs">{rx.doctor}</td>
                                    <td className="px-4 py-3"><StatusBadge status={rx.status} /></td>
                                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                                        <div className="flex items-center gap-1.5">
                                            <button onClick={() => router.push(`/dashboard/Prescriptions/${rx.id}`)}
                                                className="w-[28px] h-[28px] rounded-lg border border-(--text-color)/15 flex items-center justify-center text-(--text-color)/40 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all">
                                                <FaEye size={11} />
                                            </button>
                                            <button onClick={() => handlePrint(rx)}
                                                className="w-[28px] h-[28px] rounded-lg border border-(--text-color)/15 flex items-center justify-center text-(--text-color)/40 hover:bg-teal-50 hover:border-teal-400 hover:text-teal-600 transition-all">
                                                <FaPrint size={11} />
                                            </button>
                                            <button onClick={() => handleDelete(rx)}
                                                className="w-[28px] h-[28px] rounded-lg border border-(--text-color)/15 flex items-center justify-center text-(--text-color)/40 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all">
                                                <FaTrash size={11} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default PrescriptionsPage