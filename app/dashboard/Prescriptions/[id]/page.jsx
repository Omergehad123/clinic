"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { usePrescription, useDeletePrescription, useUpdatePrescription } from "@/hooks/usePrescriptions"
import { FaArrowLeft, FaPrint, FaTrash, FaCopy, FaEdit } from "react-icons/fa"
import Swal from "sweetalert2"

function StatusBadge({ status }) {
    const styles = {
        active: "bg-teal-50 text-teal-700 border-teal-200",
        completed: "bg-blue-50 text-blue-700 border-blue-200",
        cancelled: "bg-red-50 text-red-600 border-red-200",
    }
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border capitalize ${styles[status] || ""}`}>
            {status}
        </span>
    )
}

function SkeletonDetail() {
    return (
        <div className="animate-pulse flex flex-col gap-4 max-w-4xl mx-auto">
            <div className="h-10 bg-(--text-color)/10 rounded-xl" />
            <div className="h-32 bg-(--text-color)/10 rounded-xl" />
            <div className="h-48 bg-(--text-color)/10 rounded-xl" />
        </div>
    )
}

function PrintView({ rx }) {
    return (
        <div className="print-only p-10 max-w-2xl mx-auto font-sans" id="print-area">
            {/* Clinic Header */}
            <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">City Medical Clinic</h1>
                <p className="text-gray-500 text-sm">123 Health St, Cityville | Tel: 555-0000</p>
                <p className="text-gray-500 text-sm">{rx.doctor} — General Physician</p>
            </div>

            {/* Patient Info */}
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div><span className="font-semibold">Patient:</span> {rx.patientName}</div>
                <div><span className="font-semibold">Phone:</span> {rx.patientPhone}</div>
                <div><span className="font-semibold">Date:</span> {rx.prescriptionDate}</div>
                <div><span className="font-semibold">Prescription ID:</span> {rx.id}</div>
            </div>

            {/* Diagnosis */}
            <div className="mb-6 text-sm">
                <p><span className="font-semibold">Diagnosis:</span> {rx.diagnosis}</p>
                {rx.chiefComplaint && <p><span className="font-semibold">Chief Complaint:</span> {rx.chiefComplaint}</p>}
            </div>

            {/* Medications */}
            <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-2 border-b pb-1">Medications</h3>
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            {["#", "Medication", "Dosage", "Frequency", "Duration", "Instructions", "Qty"].map(h => (
                                <th key={h} className="text-left px-2 py-1 border border-gray-200 text-xs font-semibold text-gray-600">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rx.medications?.map((med, i) => (
                            <tr key={med.id} className="border-b border-gray-100">
                                <td className="px-2 py-1 border border-gray-200 text-xs">{i + 1}</td>
                                <td className="px-2 py-1 border border-gray-200 text-xs font-medium">{med.name}</td>
                                <td className="px-2 py-1 border border-gray-200 text-xs">{med.dosage}</td>
                                <td className="px-2 py-1 border border-gray-200 text-xs">{med.frequency}</td>
                                <td className="px-2 py-1 border border-gray-200 text-xs">{med.duration}</td>
                                <td className="px-2 py-1 border border-gray-200 text-xs">{med.instructions}</td>
                                <td className="px-2 py-1 border border-gray-200 text-xs">{med.quantity || "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Additional Instructions */}
            {rx.additionalInstructions && (
                <div className="mb-8 text-sm">
                    <h3 className="font-bold text-gray-700 mb-1 border-b pb-1">Additional Instructions</h3>
                    <p className="text-gray-600">{rx.additionalInstructions}</p>
                </div>
            )}

            {/* Signature */}
            <div className="flex justify-end mt-12">
                <div className="text-center">
                    <div className="border-t border-gray-400 w-48 mb-1" />
                    <p className="text-sm font-semibold text-gray-700">{rx.doctor}</p>
                    <p className="text-xs text-gray-500">Doctor Signature</p>
                </div>
            </div>
        </div>
    )
}

function PrescriptionDetail() {
    const { id } = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()
    const shouldPrint = searchParams.get("print") === "true"

    const { data: rx, isLoading, error } = usePrescription(id)
    const { mutate: deletePrescription } = useDeletePrescription()
    const { mutate: updatePrescription } = useUpdatePrescription()
    const [tab, setTab] = useState("overview")

    useEffect(() => {
        if (shouldPrint && rx) {
            setTimeout(() => window.print(), 500)
        }
    }, [shouldPrint, rx])

    const handlePrint = () => {
        updatePrescription({
            id,
            updatedFields: {
                timeline: [...(rx.timeline || []), {
                    action: "Printed",
                    date: new Date().toISOString().split("T")[0],
                    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
                }]
            }
        })
        window.print()
    }

    const handleDelete = () => {
        Swal.fire({
            title: "Delete Prescription?",
            text: `This will permanently delete prescription ${id}.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                deletePrescription(id)
                Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false })
                    .then(() => router.push("/dashboard/Prescriptions"))
            }
        })
    }

    if (isLoading) return <SkeletonDetail />
    if (error) return <p className="text-red-500 p-5">{error.message}</p>
    if (!rx) return <p className="text-(--p-color) p-5">Prescription not found.</p>

    const tabs = ["Overview", "Medications", "Timeline"]

    return (
        <>
            {/* Print-only view — hidden on screen, shown on print */}
            <div className="hidden print:block">
                <PrintView rx={rx} />
            </div>

            {/* Screen view — hidden on print */}
            <section className="max-w-4xl mx-auto print:hidden">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-(--p-color) hover:text-(--text-color) text-sm mb-5 transition-colors">
                    <FaArrowLeft size={12} /> Back
                </button>

                {/* Header card */}
                <div className="bg-(--main-color) rounded-xl p-5 mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <span className="font-mono text-sm bg-(--bg-color) px-3 py-1 rounded-lg text-(--second-color) font-bold">{rx.id}</span>
                                <StatusBadge status={rx.status} />
                            </div>
                            <p className="text-(--text-color) font-bold text-xl mt-2">{rx.patientName}</p>
                            <p className="text-(--p-color) text-sm">{rx.prescriptionDate} · {rx.doctor}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                            <button onClick={() => router.push(`/dashboard/Prescriptions/new?duplicate=${rx.id}`)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-(--text-color)/20 text-(--text-color) text-xs hover:bg-(--bg-color) transition-colors">
                                <FaCopy size={11} /> Duplicate
                            </button>
                            <button onClick={handlePrint}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-teal-300 text-teal-600 text-xs hover:bg-teal-50 transition-colors">
                                <FaPrint size={11} /> Print
                            </button>
                            <button onClick={handleDelete}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-500 text-xs hover:bg-red-50 transition-colors">
                                <FaTrash size={11} /> Delete
                            </button>
                        </div>
                    </div>
                </div>

                {/* Patient + Diagnosis cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="bg-(--main-color) rounded-xl p-5">
                        <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-3">Patient Information</h3>
                        <div className="flex flex-col gap-2 text-sm">
                            {[
                                { label: "Name", value: rx.patientName },
                                { label: "Phone", value: rx.patientPhone },
                            ].map(({ label, value }) => (
                                <div key={label} className="flex justify-between">
                                    <span className="text-(--p-color)">{label}</span>
                                    <span className="text-(--text-color) font-medium">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-(--main-color) rounded-xl p-5">
                        <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-3">Diagnosis</h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-(--p-color)">Diagnosis</span>
                                <span className="text-(--text-color) font-medium">{rx.diagnosis}</span>
                            </div>
                            {rx.chiefComplaint && (
                                <div className="flex justify-between">
                                    <span className="text-(--p-color)">Chief Complaint</span>
                                    <span className="text-(--text-color) font-medium">{rx.chiefComplaint}</span>
                                </div>
                            )}
                            {rx.followUpDate && (
                                <div className="flex justify-between">
                                    <span className="text-(--p-color)">Follow-up</span>
                                    <span className="text-(--text-color) font-medium">{rx.followUpDate}</span>
                                </div>
                            )}
                            {rx.notes && (
                                <div className="mt-2">
                                    <span className="text-(--p-color) block mb-1">Notes</span>
                                    <p className="text-(--text-color) text-xs">{rx.notes}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-1 bg-(--main-color) rounded-xl p-1 mb-4">
                    {tabs.map(t => (
                        <button key={t} onClick={() => setTab(t.toLowerCase())}
                            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.toLowerCase() ? "bg-(--second-color) text-white" : "text-(--p-color) hover:text-(--text-color)"}`}>
                            {t}
                        </button>
                    ))}
                </div>

                {/* Tab: Overview */}
                {tab === "overview" && (
                    <div className="flex flex-col gap-4">
                        {rx.additionalInstructions && (
                            <div className="bg-(--main-color) rounded-xl p-5">
                                <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-3">Additional Instructions</h3>
                                <p className="text-(--p-color) text-sm">{rx.additionalInstructions}</p>
                            </div>
                        )}
                        <div className="bg-(--main-color) rounded-xl p-5">
                            <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-3">Medications Summary</h3>
                            <p className="text-(--second-color) font-bold text-2xl">{rx.medications?.length}</p>
                            <p className="text-(--p-color) text-xs">medication{rx.medications?.length !== 1 ? "s" : ""} prescribed</p>
                        </div>
                    </div>
                )}

                {/* Tab: Medications */}
                {tab === "medications" && (
                    <div className="bg-(--main-color) rounded-xl overflow-hidden">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="bg-(--bg-color) border-b border-(--text-color)/10">
                                    {["#", "Medication", "Dosage", "Frequency", "Duration", "Instructions", "Qty"].map(h => (
                                        <th key={h} className="text-left px-4 py-3 text-[11px] uppercase tracking-wider text-(--p-color) font-medium">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rx.medications?.map((med, i) => (
                                    <tr key={med.id} className="border-b border-(--text-color)/5 last:border-0 hover:bg-(--bg-color) transition-colors">
                                        <td className="px-4 py-3 text-(--p-color)">{i + 1}</td>
                                        <td className="px-4 py-3 font-medium text-(--text-color)">{med.name}</td>
                                        <td className="px-4 py-3 text-(--text-color)">{med.dosage}</td>
                                        <td className="px-4 py-3 text-(--text-color)">{med.frequency}</td>
                                        <td className="px-4 py-3 text-(--text-color)">{med.duration}</td>
                                        <td className="px-4 py-3 text-(--text-color)">{med.instructions || "—"}</td>
                                        <td className="px-4 py-3 text-(--text-color)">{med.quantity || "—"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Tab: Timeline */}
                {tab === "timeline" && (
                    <div className="bg-(--main-color) rounded-xl p-5">
                        <h3 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-4">Timeline</h3>
                        <div className="flex flex-col gap-3">
                            {rx.timeline?.map((event, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="w-2 h-2 rounded-full bg-(--second-color) mt-1.5 shrink-0" />
                                    <div>
                                        <p className="text-(--text-color) text-sm font-medium">{event.action}</p>
                                        <p className="text-(--p-color) text-xs">{event.date} at {event.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>
        </>
    )
}

export default PrescriptionDetail