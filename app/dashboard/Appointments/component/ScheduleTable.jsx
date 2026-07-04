"use client"

import { useUpdateAppointment } from "@/hooks/useAppointments"
import Swal from "sweetalert2"
import { useState } from "react"
import ActionsDropdown from "./ActionsDropdown"

function ScheduleTable({ appointments, onEdit }) {
    const { mutate: updateAppointment } = useUpdateAppointment()
    const [openActions, setOpenActions] = useState(null) // for mobile action menu

    const handleCancel = (appointment) => {
        Swal.fire({
            title: "Cancel Appointment?",
            text: `Cancel appointment for "${appointment.patientName}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Cancel",
            cancelButtonText: "Go Back",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                updateAppointment(
                    { id: appointment.id, updatedFields: { status: "canceled" } },
                    {
                        onSuccess: () => Swal.fire({
                            title: "Cancelled!",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        })
                    }
                )
            }
        })
    }

    const handleComplete = (appointment) => {
        updateAppointment(
            { id: appointment.id, updatedFields: { status: "camed" } },
            {
                onSuccess: () => Swal.fire({
                    title: "Completed!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                })
            }
        )
    }

    const handlePaymentStatusChange = (appointment, paymentStatus) => {
        updateAppointment({ id: appointment.id, updatedFields: { paymentStatus } })
    }

    // New handler for status change
    const handleStatusChange = (appointment, status) => {
        updateAppointment({ id: appointment.id, updatedFields: { status } })
    }

    const handlePrint = (appointment) => {
        // For demo purposes, just opens a new window with appointment info. Replace with real print.
        const printContent = `
            <div>
                <h2>Appointment Details</h2>
                <p><strong>Patient Name:</strong> ${appointment.patientName}</p>
                <p><strong>Visit Type:</strong> ${appointment.visitType}</p>
                <p><strong>Service:</strong> ${appointment.serviceType}</p>
                <p><strong>Time:</strong> ${appointment.time}</p>
                <p><strong>Status:</strong> ${appointment.status}</p>
                <p><strong>Payment Type:</strong> ${appointment.paymentType}</p>
                <p><strong>Payment Status:</strong> ${appointment.paymentStatus ?? "unpaid"}</p>
            </div>
        `
        const w = window.open('', '', 'width=600,height=400')
        w.document.write(printContent)
        w.document.close()
        w.focus()
        w.print()
    }

    // Array for all statuses
    const STATUS_OPTIONS = [
        { value: "waiting", label: "Waiting" },
        { value: "completed", label: "Completed" },
        { value: "canceled", label: "Canceled" },
        { value: "not-shown", label: "Not Shown" }
    ]

    function getStatusSelectStyle(status) {
        // Style like payment status: bg and border colors based on value
        switch (status) {
            case "waiting":
                return "border-amber-200 bg-amber-50 text-amber-700"
            case "Completed":
                return "border-teal-200 bg-teal-50 text-teal-700"
            case "canceled":
                return "border-red-200 bg-red-50 text-red-700"
            case "not-shown":
                return "border-gray-300 bg-gray-50 text-gray-700"
            default:
                return "border-neutral-200 bg-neutral-50 text-neutral-700"
        }
    }

    // Responsive table: CSS for mobile (card), desktop (table)
    return (
        <div className="bg-(--main-color) rounded-xl overflow-hidden mt-6 w-full">
            {/* Table Head for md+ screens only */}
            <div className="hidden md:block">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-(--bg-color) border-b border-(--text-color)/10">
                            {["Patient No.", "Patient Name", "Visit Type", "Service", "Time", "Payment", "Status", "Actions"].map(h => (
                                <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-(--p-color) font-medium">
                                    {h}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((a) => (
                            <tr key={a.id} className="border-b border-(--text-color)/5 last:border-0 hover:bg-(--bg-color) transition-colors">
                                <td className="px-4 py-3 text-(--text-color)">PT00{appointments.indexOf(a) + 1}</td>
                                <td className="px-4 py-3 font-medium text-(--text-color)">{a.patientName}</td>
                                <td className="px-4 py-3 text-(--text-color) capitalize flex items-center justify-between gap-2 w-[120px]">
                                    {a.visitType}
                                    <span className={`w-3 h-3 block rounded-full ${a.visitType === "scheduled" ? "bg-(--second-color)" : "bg-[#00ff00]"}`}></span>
                                </td>
                                <td className="px-4 py-3 text-(--text-color)">{a.serviceType}</td>
                                <td className="px-4 py-3 text-(--text-color)">{a.time}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-between w-[150px] gap-2">
                                        <span className="text-(--text-color) capitalize">{a.paymentType}</span>
                                        <select
                                            value={a.paymentStatus ?? "unpaid"}
                                            onChange={(e) => handlePaymentStatusChange(a, e.target.value)}
                                            className={`h-[30px] px-2 rounded-md border text-xs outline-none cursor-pointer capitalize
                                                ${(a.paymentStatus ?? "unpaid") === "paid"
                                                    ? "border-teal-200 bg-teal-50 text-teal-700"
                                                    : "border-amber-200 bg-amber-50 text-amber-700"
                                                }`}
                                        >
                                            <option value="paid">Paid</option>
                                            <option value="unpaid">Unpaid</option>
                                        </select>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-between w-[180px] gap-2">
                                        <span className={`inline-block rounded-full text-xs font-medium capitalize`}>
                                            {STATUS_OPTIONS.find(s => s.value === a.status)?.label || a.status}
                                        </span>
                                        <select
                                            value={a.status}
                                            onChange={e => handleStatusChange(a, e.target.value)}
                                            className={`h-[30px] px-2 rounded-md border text-xs outline-none cursor-pointer capitalize ${getStatusSelectStyle(a.status)}`}
                                            style={{ minWidth: 110 }}
                                        >
                                            {STATUS_OPTIONS.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-2 min-w-[40px] justify-end">
                                        <ActionsDropdown
                                            appointment={a}
                                            onEditClick={onEdit}
                                            handleCancel={handleCancel}
                                            handleComplete={handleComplete}
                                            handlePrint={handlePrint}
                                            openActions={openActions}
                                            setOpenActions={setOpenActions}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Responsive mobile card UI below md breakpoint */}
            <div className="md:hidden w-full flex flex-col gap-4 p-2">
                {appointments.map((a, idx) => (
                    <div
                        key={a.id}
                        className="rounded-xl bg-(--bg-color) border border-(--main-color) shadow-sm p-4 flex flex-col gap-2"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-(--text-color) uppercase tracking-widest">
                                PT00{appointments.indexOf(a) + 1}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${getStatusSelectStyle(a.status)}`}>
                                    {STATUS_OPTIONS.find(s => s.value === a.status)?.label || a.status}
                                </span>
                                <ActionsDropdown
                                    appointment={a}
                                    onEditClick={onEdit}
                                    idx={idx}
                                    handleCancel={handleCancel}
                                    handleComplete={handleComplete}
                                    handlePrint={handlePrint}
                                    openActions={openActions}
                                    setOpenActions={setOpenActions}
                                />
                            </div>

                        </div>
                        <div className="flex justify-between mb-1 gap-2 flex-wrap">
                            <div className="flex-1 min-w-[140px]">
                                <div className="text-xs text-(--p-color)">Patient Name</div>
                                <div className="font-medium text-(--text-color)">{a.patientName}</div>
                            </div>
                            <div className="flex-1 min-w-[110px] flex items-center gap-1">
                                <div>
                                    <div className="text-xs text-(--p-color)">Visit Type</div>
                                    <span className="capitalize text-(--text-color)">{a.visitType}</span>
                                </div>
                                <span className={`w-3 h-3 block rounded-full mt-2 ${a.visitType === "scheduled" ? "bg-(--second-color)" : "bg-[#00ff00]"}`}></span>
                            </div>
                        </div>
                        <div className="flex justify-between mb-1 gap-2 flex-wrap">
                            <div className="flex-1 min-w-[140px]">
                                <div className="text-xs text-(--p-color)">Service</div>
                                <div className="text-(--text-color)">{a.serviceType}</div>
                            </div>
                            <div className="flex-1 min-w-[110px]">
                                <div className="text-xs text-(--p-color)">Time</div>
                                <div className="text-(--text-color)">{a.time}</div>
                            </div>
                        </div>
                        <div className="flex justify-between mb-1 gap-2 flex-wrap">
                            <div className="flex-1 min-w-[110px]">
                                <div className="text-xs text-(--p-color)">Payment</div>
                                <div className="flex items-center gap-2">
                                    <span className="text-(--text-color) capitalize">{a.paymentType}</span>
                                    <select
                                        value={a.paymentStatus ?? "unpaid"}
                                        onChange={(e) => handlePaymentStatusChange(a, e.target.value)}
                                        className={`h-[26px] px-2 rounded-md border text-xs outline-none cursor-pointer capitalize ml-1
                                            ${(a.paymentStatus ?? "unpaid") === "paid"
                                                ? "border-teal-200 bg-teal-50 text-teal-700"
                                                : "border-amber-200 bg-amber-50 text-amber-700"
                                            }`}
                                    >
                                        <option value="paid">Paid</option>
                                        <option value="unpaid">Unpaid</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex-1 min-w-[110px]">
                                <div className="text-xs text-(--p-color)">Status</div>
                                <select
                                    value={a.status}
                                    onChange={e => handleStatusChange(a, e.target.value)}
                                    className={`h-[26px] px-2 rounded-md border text-xs outline-none cursor-pointer capitalize w-full ${getStatusSelectStyle(a.status)}`}
                                >
                                    {STATUS_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                    </div>
                ))}
                {appointments.length === 0 && (
                    <div className="w-full text-center py-8 text-(--text-color)/70 text-sm">
                        No appointments found.
                    </div>
                )}
            </div>
        </div>
    )
}

export default ScheduleTable