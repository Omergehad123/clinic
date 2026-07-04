"use client"
import { useDeleteService, useUpdateService } from "@/hooks/useServices"
import { FiEdit2, FiTrash2 } from "react-icons/fi"
import Swal from 'sweetalert2'

function ServicesTable({ services, onEdit }) {
    const { mutate: deleteService } = useDeleteService()
    const { mutate: updateService } = useUpdateService()

    const toggleStatus = (service) => {
        const next = service.status === "active" ? "inactive" : "active"
        updateService({ id: service.id, updatedFields: { status: next } })
    }

    const handleDelete = (service) => {
        Swal.fire({
            title: "Are you sure?",
            text: `This will permanently delete "${service.title}".`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteService(service.id)
                Swal.fire({
                    title: "Deleted!",
                    text: "The service has been removed.",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                })
            }
        })
    }

    return (
        <div className="bg-(--main-color) rounded-xl overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-(--bg-color) border-b border-(--text-color)/10">
                            {["Service", "Price", "Description", "Status", "Actions"].map(h => (
                                <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-(--p-color) font-medium">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((s) => {
                            const isActive = s.status === "active"
                            return (
                                <tr key={s.id} className="border-b border-(--text-color)/5 last:border-0 hover:bg-(--bg-color) transition-colors">
                                    <td className="px-4 py-3">
                                        <p className="font-medium text-(--text-color)">{s.title}</p>
                                        <p className="text-[11px] text-(--text-color)/40">{s.category}</p>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-(--text-color)">${s.price}</td>
                                    <td className="px-4 py-3 max-w-[260px]">
                                        <p className="text-xs text-(--text-color)/50 truncate">{s.description}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => toggleStatus(s)}
                                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${isActive ? "bg-teal-50 text-teal-700" : "bg-neutral-100 text-neutral-500"}`}
                                        >
                                            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-teal-500" : "bg-neutral-400"}`} />
                                            {isActive ? "Active" : "Inactive"}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-1.5">
                                            <button onClick={() => onEdit(s)} className="w-[30px] h-[30px] rounded-lg border border-(--text-color)/15 flex items-center justify-center text-(--text-color)/40 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all">
                                                <FiEdit2 size={13} />
                                            </button>
                                            <button onClick={() => handleDelete(s)} className="w-[30px] h-[30px] rounded-lg border border-(--text-color)/15 flex items-center justify-center text-(--text-color)/40 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all">
                                                <FiTrash2 size={13} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {/* Mobile - Card List */}
            <div className="md:hidden flex flex-col gap-3 p-2">
                {services.map((s) => {
                    const isActive = s.status === "active"
                    return (
                        <div key={s.id} className="bg-(--bg-color) rounded-lg shadow-xs p-4 flex flex-col gap-2 border border-(--text-color)/10">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold text-(--text-color)">{s.title}</p>
                                    <p className="text-[12px] text-(--text-color)/40">{s.category}</p>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <button
                                        onClick={() => onEdit(s)}
                                        className="w-[28px] h-[28px] rounded-lg border border-(--text-color)/15 flex items-center justify-center text-(--text-color)/40 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 transition-all"
                                        aria-label="Edit Service"
                                    >
                                        <FiEdit2 size={13} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(s)}
                                        className="w-[28px] h-[28px] rounded-lg border border-(--text-color)/15 flex items-center justify-center text-(--text-color)/40 hover:bg-red-50 hover:border-red-400 hover:text-red-600 transition-all"
                                        aria-label="Delete Service"
                                    >
                                        <FiTrash2 size={13} />
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[15px] font-medium text-(--text-color)">
                                    ${s.price}
                                </span>
                                <button
                                    onClick={() => toggleStatus(s)}
                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium transition-colors ${isActive ? "bg-teal-50 text-teal-700" : "bg-neutral-100 text-neutral-500"}`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-teal-500" : "bg-neutral-400"}`}></span>
                                    {isActive ? "Active" : "Inactive"}
                                </button>
                            </div>
                            <p className="text-xs text-(--text-color)/50 line-clamp-3 mt-2">{s.description}</p>
                        </div>
                    )
                })}
                {services.length === 0 && (
                    <p className="text-center text-(--p-color) py-8">
                        No services found.
                    </p>
                )}
            </div>
        </div>
    )
}

export default ServicesTable