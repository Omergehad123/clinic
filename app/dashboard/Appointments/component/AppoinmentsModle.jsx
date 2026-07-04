"use client"
import { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5"
import { useCreateAppointment, useUpdateAppointment } from "@/hooks/useAppointments"
import { useServices } from "@/hooks/useServices"
import Swal from "sweetalert2"

const defaultScheduled = {
    visitType: "scheduled",
    time: "",
    patientName: "",
    serviceType: "",
    phone: "",
    status: "waiting",
    paymentType: "cash",
    paymentStatus: "unpaid",
    notes: "",
}

const defaultWalkIn = {
    visitType: "walk-in",
    patientNumber: "",
    arrivalTime: "",
    patientName: "",
    age: "",
    serviceType: "",
    paymentType: "cash",
    paymentStatus: "unpaid",
    status: "waiting",
}

function AppoinmentsModle({ isOpen, onClose, appointment }) {
    const { mutate: createAppointment } = useCreateAppointment()
    const { mutate: updateAppointment } = useUpdateAppointment()
    const { data: services = [] } = useServices()

    const isEditMode = Boolean(appointment)
    const [visitType, setVisitType] = useState("scheduled")
    const [form, setForm] = useState(defaultScheduled)

    useEffect(() => {
        if (appointment) {
            setVisitType(appointment.visitType === "walk-in" ? "walk-in" : "scheduled")
            setForm(appointment)
        } else {
            setVisitType("scheduled")
            setForm(defaultScheduled)
        }
    }, [appointment, isOpen])

    const handleVisitTypeChange = (type) => {
        setVisitType(type)
        setForm(type === "walk-in" ? defaultWalkIn : defaultScheduled)
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isEditMode) {
            updateAppointment(
                { id: appointment.id, updatedFields: form },
                {
                    onSuccess: () => {
                        Swal.fire({ title: "Updated!", icon: "success", timer: 1500, showConfirmButton: false })
                        onClose()
                    },
                    onError: () => Swal.fire({ title: "Error", text: "Something went wrong.", icon: "error" })
                }
            )
        } else {
            createAppointment(form, {
                onSuccess: () => {
                    Swal.fire({ title: "Created!", icon: "success", timer: 1500, showConfirmButton: false })
                    onClose()
                },
                onError: () => Swal.fire({ title: "Error", text: "Something went wrong.", icon: "error" })
            })
        }
    }

    if (!isOpen) return null

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-(--main-color) w-[90%] max-w-lg rounded-xl p-6 animate-popIn max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-(--text-color) font-semibold text-lg">
                            {isEditMode ? "Edit Appointment" : "New Appointment"}
                        </h2>
                        <p className="text-(--p-color) text-xs mt-0.5">
                            {isEditMode ? "Update appointment details" : "Fill in the appointment details below"}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-(--text-color)/40 hover:text-(--text-color) transition-colors"
                    >
                        <IoClose size={22} />
                    </button>
                </div>

                {/* Visit Type Toggle */}
                <div className="flex gap-2 p-1 bg-(--bg-color) rounded-lg mb-5">
                    <button
                        type="button"
                        onClick={() => handleVisitTypeChange("scheduled")}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200
                            ${visitType === "scheduled"
                                ? "bg-(--main-color) text-(--second-color) shadow-sm"
                                : "text-(--text-color)/50 hover:text-(--text-color)"
                            }`}
                    >
                        📅 Scheduled
                    </button>
                    <button
                        type="button"
                        onClick={() => handleVisitTypeChange("walk-in")}
                        className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200
                            ${visitType === "walk-in"
                                ? "bg-(--main-color) text-(--second-color) shadow-sm"
                                : "text-(--text-color)/50 hover:text-(--text-color)"
                            }`}
                    >
                        🚶 Walk-in
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    {visitType === "scheduled" ? (
                        <>
                            {/* Row: Patient Name + Phone */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Patient Name</label>
                                    <input
                                        type="text"
                                        name="patientName"
                                        value={form.patientName}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="555-0000"
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    />
                                </div>
                            </div>

                            {/* Row: Time + Service */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Time</label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={form.time}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Service Type</label>
                                    <select
                                        name="serviceType"
                                        value={form.serviceType}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    >
                                        <option value="">Select service</option>
                                        {services.map(s => (
                                            <option key={s.id} value={s.title}>{s.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Row: Payment + Payment Status */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Payment Type</label>
                                    <select
                                        name="paymentType"
                                        value={form.paymentType}
                                        onChange={handleChange}
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    >
                                        <option value="cash">Cash</option>
                                        <option value="credit">Credit</option>
                                        <option value="insurance">Insurance</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Payment Status</label>
                                    <select
                                        name="paymentStatus"
                                        value={form.paymentStatus ?? "unpaid"}
                                        onChange={handleChange}
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    >
                                        <option value="paid">Paid</option>
                                        <option value="unpaid">Unpaid</option>
                                    </select>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="text-xs text-(--text-color)/60 mb-1 block">Status</label>
                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                >
                                    <option value="waiting">Waiting</option>
                                    <option value="camed">Came</option>
                                    <option value="canceled">Canceled</option>
                                </select>
                            </div>

                            {/* Notes */}
                            <div>
                                <label className="text-xs text-(--text-color)/60 mb-1 block">Notes</label>
                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    placeholder="Any additional notes..."
                                    className="w-full px-3 py-2 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color) resize-none"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Row: Patient Number + Arrival Time */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Patient Number</label>
                                    <input
                                        type="text"
                                        name="patientNumber"
                                        value={form.patientNumber}
                                        onChange={handleChange}
                                        required
                                        placeholder="e.g. 001"
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Arrival Time</label>
                                    <input
                                        type="time"
                                        name="arrivalTime"
                                        value={form.arrivalTime}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    />
                                </div>
                            </div>

                            {/* Row: Patient Name + Age */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Patient Name</label>
                                    <input
                                        type="text"
                                        name="patientName"
                                        value={form.patientName}
                                        onChange={handleChange}
                                        required
                                        placeholder="John Doe"
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Age</label>
                                    <input
                                        type="number"
                                        name="age"
                                        value={form.age}
                                        onChange={handleChange}
                                        placeholder="e.g. 35"
                                        min="0"
                                        max="120"
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    />
                                </div>
                            </div>

                            {/* Row: Service + Payment */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Service Type</label>
                                    <select
                                        name="serviceType"
                                        value={form.serviceType}
                                        onChange={handleChange}
                                        required
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    >
                                        <option value="">Select service</option>
                                        {services.map(s => (
                                            <option key={s.id} value={s.title}>{s.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Payment Type</label>
                                    <select
                                        name="paymentType"
                                        value={form.paymentType}
                                        onChange={handleChange}
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    >
                                        <option value="cash">Cash</option>
                                        <option value="credit">Credit</option>
                                        <option value="insurance">Insurance</option>
                                    </select>
                                </div>
                            </div>

                            {/* Row: Payment Status + Status */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Payment Status</label>
                                    <select
                                        name="paymentStatus"
                                        value={form.paymentStatus ?? "unpaid"}
                                        onChange={handleChange}
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    >
                                        <option value="paid">Paid</option>
                                        <option value="unpaid">Unpaid</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs text-(--text-color)/60 mb-1 block">Status</label>
                                    <select
                                        name="status"
                                        value={form.status}
                                        onChange={handleChange}
                                        className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                                    >
                                        <option value="waiting">Waiting</option>
                                        <option value="camed">Came</option>
                                        <option value="canceled">Canceled</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-end gap-2 mt-2 pt-3 border-t border-(--text-color)/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-md text-sm text-(--text-color)/60 hover:bg-(--bg-color) transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md text-sm bg-(--second-color) text-white hover:opacity-90 transition-opacity"
                        >
                            {isEditMode ? "Save Changes" : "Create Appointment"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AppoinmentsModle