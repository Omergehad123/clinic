"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCreatePrescription } from "@/hooks/usePrescriptions"
import { usePatients } from "@/hooks/usePatients"
import { FaArrowLeft, FaPlus, FaTrash, FaPrint } from "react-icons/fa"
import Swal from "sweetalert2"

const defaultMed = () => ({
    id: crypto.randomUUID(),
    name: "", dosage: "", frequency: "", duration: "", instructions: "", quantity: ""
})

const frequencyOptions = ["Once daily", "Twice daily", "Three times daily", "Every 8 hours", "Every 12 hours", "As needed"]
const durationOptions = ["3 days", "5 days", "7 days", "10 days", "14 days", "1 month", "3 months"]
const instructionOptions = ["Before food", "After food", "With water", "At bedtime", "With food", "On empty stomach"]

function MedicationCard({ med, index, onChange, onRemove, errors }) {
    return (
        <div className="bg-(--bg-color) rounded-xl p-4 border border-(--text-color)/10">
            <div className="flex items-center justify-between mb-3">
                <span className="text-(--text-color) font-semibold text-sm">Medication {index + 1}</span>
                <button type="button" onClick={onRemove}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600 text-xs transition-colors">
                    <FaTrash size={11} /> Remove
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <div className="sm:col-span-2 lg:col-span-1">
                    <label className="text-xs text-(--text-color)/60 mb-1 block">Medication Name *</label>
                    <input
                        type="text" value={med.name} onChange={(e) => onChange("name", e.target.value)}
                        placeholder="e.g. Amoxicillin"
                        className={`w-full h-[36px] px-3 rounded-md border bg-(--main-color) text-(--text-color) text-sm outline-none focus:border-(--second-color) ${errors?.name ? "border-red-400" : "border-(--text-color)/20"}`}
                    />
                    {errors?.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                    <label className="text-xs text-(--text-color)/60 mb-1 block">Dosage *</label>
                    <input
                        type="text" value={med.dosage} onChange={(e) => onChange("dosage", e.target.value)}
                        placeholder="e.g. 500mg"
                        className={`w-full h-[36px] px-3 rounded-md border bg-(--main-color) text-(--text-color) text-sm outline-none focus:border-(--second-color) ${errors?.dosage ? "border-red-400" : "border-(--text-color)/20"}`}
                    />
                    {errors?.dosage && <p className="text-red-500 text-xs mt-1">{errors.dosage}</p>}
                </div>
                <div>
                    <label className="text-xs text-(--text-color)/60 mb-1 block">Frequency *</label>
                    <select value={med.frequency} onChange={(e) => onChange("frequency", e.target.value)}
                        className={`w-full h-[36px] px-3 rounded-md border bg-(--main-color) text-(--text-color) text-sm outline-none focus:border-(--second-color) ${errors?.frequency ? "border-red-400" : "border-(--text-color)/20"}`}>
                        <option value="">Select frequency</option>
                        {frequencyOptions.map(o => <option key={o}>{o}</option>)}
                    </select>
                    {errors?.frequency && <p className="text-red-500 text-xs mt-1">{errors.frequency}</p>}
                </div>
                <div>
                    <label className="text-xs text-(--text-color)/60 mb-1 block">Duration *</label>
                    <select value={med.duration} onChange={(e) => onChange("duration", e.target.value)}
                        className={`w-full h-[36px] px-3 rounded-md border bg-(--main-color) text-(--text-color) text-sm outline-none focus:border-(--second-color) ${errors?.duration ? "border-red-400" : "border-(--text-color)/20"}`}>
                        <option value="">Select duration</option>
                        {durationOptions.map(o => <option key={o}>{o}</option>)}
                    </select>
                    {errors?.duration && <p className="text-red-500 text-xs mt-1">{errors.duration}</p>}
                </div>
                <div>
                    <label className="text-xs text-(--text-color)/60 mb-1 block">Instructions</label>
                    <select value={med.instructions} onChange={(e) => onChange("instructions", e.target.value)}
                        className="w-full h-[36px] px-3 rounded-md border border-(--text-color)/20 bg-(--main-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)">
                        <option value="">Select instructions</option>
                        {instructionOptions.map(o => <option key={o}>{o}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-xs text-(--text-color)/60 mb-1 block">Quantity</label>
                    <input
                        type="text" value={med.quantity} onChange={(e) => onChange("quantity", e.target.value)}
                        placeholder="e.g. 14 tablets"
                        className="w-full h-[36px] px-3 rounded-md border border-(--text-color)/20 bg-(--main-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                    />
                </div>
            </div>
        </div>
    )
}

function CreatePrescriptionPage() {
    const router = useRouter()
    const { mutate: createPrescription, isPending } = useCreatePrescription()
    const { data: patients = [] } = usePatients()

    const [patientSearch, setPatientSearch] = useState("")
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [showPatientDropdown, setShowPatientDropdown] = useState(false)

    const [form, setForm] = useState({
        prescriptionDate: new Date().toISOString().split("T")[0],
        followUpDate: "",
        diagnosis: "",
        chiefComplaint: "",
        notes: "",
        additionalInstructions: "",
        doctor: "Dr. Smith",
        status: "active",
    })

    const [medications, setMedications] = useState([defaultMed()])
    const [medErrors, setMedErrors] = useState({})
    const [formErrors, setFormErrors] = useState({})

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleMedChange = (id, field, value) => {
        setMedications(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))
        setMedErrors(prev => ({ ...prev, [id]: { ...prev[id], [field]: "" } }))
    }

    const addMedication = () => setMedications(prev => [...prev, defaultMed()])

    const removeMedication = (id) => {
        if (medications.length === 1) return
        setMedications(prev => prev.filter(m => m.id !== id))
    }

    const filteredPatients = patients.filter(p =>
        p.fullName?.toLowerCase().includes(patientSearch.toLowerCase()) ||
        p.phone?.includes(patientSearch)
    )

    const validate = () => {
        const errors = {}
        const mErrors = {}

        if (!selectedPatient) errors.patient = "Please select a patient"
        if (!form.diagnosis.trim()) errors.diagnosis = "Diagnosis is required"

        medications.forEach(med => {
            const e = {}
            if (!med.name.trim()) e.name = "Required"
            if (!med.dosage.trim()) e.dosage = "Required"
            if (!med.frequency) e.frequency = "Required"
            if (!med.duration) e.duration = "Required"
            if (Object.keys(e).length > 0) mErrors[med.id] = e
        })

        setFormErrors(errors)
        setMedErrors(mErrors)
        return Object.keys(errors).length === 0 && Object.keys(mErrors).length === 0
    }

    const handleSubmit = (e, printAfter = false) => {
        e.preventDefault()
        if (!validate()) return

        const payload = {
            ...form,
            patientId: selectedPatient.id,
            patientName: selectedPatient.fullName,
            patientPhone: selectedPatient.phone,
            medications: medications.map(({ id, ...rest }) => ({ id, ...rest })),
            attachments: [],
        }

        createPrescription(payload, {
            onSuccess: (created) => {
                Swal.fire({ title: "Prescription Created!", icon: "success", timer: 1500, showConfirmButton: false })
                    .then(() => router.push(`/dashboard/Prescriptions/${created.id}${printAfter ? "?print=true" : ""}`))
            },
            onError: () => Swal.fire({ title: "Error", text: "Something went wrong.", icon: "error" })
        })
    }

    return (
        <section className="max-w-4xl mx-auto">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-(--p-color) hover:text-(--text-color) text-sm mb-5 transition-colors">
                <FaArrowLeft size={12} /> Back
            </button>

            <div className="bg-(--main-color) rounded-xl p-5 mb-4">
                <h1 className="text-(--text-color) font-bold text-xl">New Prescription</h1>
                <p className="text-(--p-color) text-sm mt-0.5">Fill in the details to create a new prescription.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                {/* Patient Search */}
                <div className="bg-(--main-color) rounded-xl p-5">
                    <h2 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-4">Patient</h2>
                    {selectedPatient ? (
                        <div className="flex items-center justify-between p-3 rounded-lg bg-(--bg-color) border border-(--second-color)/30">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-(--second-color)/10 flex items-center justify-center text-(--second-color) font-bold">
                                    {selectedPatient.fullName?.[0]?.toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-(--text-color) font-medium text-sm">{selectedPatient.fullName}</p>
                                    <p className="text-(--p-color) text-xs">{selectedPatient.phone}</p>
                                </div>
                            </div>
                            <button type="button" onClick={() => { setSelectedPatient(null); setPatientSearch("") }}
                                className="text-xs text-red-500 hover:underline">Change</button>
                        </div>
                    ) : (
                        <div className="relative">
                            <input
                                type="text"
                                value={patientSearch}
                                onChange={(e) => { setPatientSearch(e.target.value); setShowPatientDropdown(true) }}
                                onFocus={() => setShowPatientDropdown(true)}
                                placeholder="Search patient by name or phone…"
                                className={`w-full h-[38px] px-3 rounded-md border bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color) ${formErrors.patient ? "border-red-400" : "border-(--text-color)/20"}`}
                            />
                            {formErrors.patient && <p className="text-red-500 text-xs mt-1">{formErrors.patient}</p>}
                            {showPatientDropdown && patientSearch && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-(--main-color) rounded-lg shadow-lg border border-(--text-color)/10 z-50 max-h-48 overflow-y-auto">
                                    {filteredPatients.length === 0 ? (
                                        <p className="text-(--p-color) text-sm p-3">No patients found.</p>
                                    ) : (
                                        filteredPatients.map(p => (
                                            <button key={p.id} type="button"
                                                onClick={() => { setSelectedPatient(p); setPatientSearch(""); setShowPatientDropdown(false); setFormErrors(prev => ({ ...prev, patient: "" })) }}
                                                className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-(--bg-color) transition-colors text-left">
                                                <div className="w-7 h-7 rounded-full bg-(--second-color)/10 flex items-center justify-center text-(--second-color) font-bold text-xs shrink-0">
                                                    {p.fullName?.[0]?.toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="text-(--text-color) text-sm font-medium">{p.fullName}</p>
                                                    <p className="text-(--p-color) text-xs">{p.phone}</p>
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Prescription Info */}
                <div className="bg-(--main-color) rounded-xl p-5">
                    <h2 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-4">Prescription Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Prescription Date</label>
                            <input type="date" name="prescriptionDate" value={form.prescriptionDate} onChange={handleChange}
                                className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)" />
                        </div>
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Follow-up Date</label>
                            <input type="date" name="followUpDate" value={form.followUpDate} onChange={handleChange}
                                className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)" />
                        </div>
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Diagnosis *</label>
                            <input type="text" name="diagnosis" value={form.diagnosis} onChange={handleChange}
                                placeholder="e.g. Upper Respiratory Infection"
                                className={`w-full h-[38px] px-3 rounded-md border bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color) ${formErrors.diagnosis ? "border-red-400" : "border-(--text-color)/20"}`} />
                            {formErrors.diagnosis && <p className="text-red-500 text-xs mt-1">{formErrors.diagnosis}</p>}
                        </div>
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Chief Complaint</label>
                            <input type="text" name="chiefComplaint" value={form.chiefComplaint} onChange={handleChange}
                                placeholder="e.g. Sore throat, fever"
                                className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)" />
                        </div>
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Doctor</label>
                            <input type="text" name="doctor" value={form.doctor} onChange={handleChange}
                                className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)" />
                        </div>
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Status</label>
                            <select name="status" value={form.status} onChange={handleChange}
                                className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)">
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Doctor Notes</label>
                            <textarea name="notes" value={form.notes} onChange={handleChange} rows={2}
                                placeholder="Internal notes…"
                                className="w-full px-3 py-2 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color) resize-none" />
                        </div>
                    </div>
                </div>

                {/* Medications */}
                <div className="bg-(--main-color) rounded-xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60">Medications</h2>
                        <button type="button" onClick={addMedication}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-(--second-color) text-white text-xs hover:opacity-90 transition-opacity">
                            <FaPlus size={10} /> Add Medication
                        </button>
                    </div>
                    <div className="flex flex-col gap-3">
                        {medications.map((med, index) => (
                            <MedicationCard
                                key={med.id}
                                med={med}
                                index={index}
                                onChange={(field, value) => handleMedChange(med.id, field, value)}
                                onRemove={() => removeMedication(med.id)}
                                errors={medErrors[med.id]}
                            />
                        ))}
                    </div>
                </div>

                {/* Additional Instructions */}
                <div className="bg-(--main-color) rounded-xl p-5">
                    <h2 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-4">Additional Instructions</h2>
                    <textarea name="additionalInstructions" value={form.additionalInstructions} onChange={handleChange} rows={4}
                        placeholder="Lifestyle advice, diet recommendations, warnings…"
                        className="w-full px-3 py-2 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color) resize-none" />
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2 flex-wrap">
                    <button type="button" onClick={() => router.back()}
                        className="px-4 py-2 rounded-lg text-sm text-(--text-color)/60 hover:bg-(--main-color) border border-(--text-color)/20 transition-colors">
                        Cancel
                    </button>
                    <button type="button" onClick={(e) => handleSubmit(e, false)} disabled={isPending}
                        className="px-4 py-2 rounded-lg text-sm border border-(--second-color) text-(--second-color) hover:bg-(--second-color)/10 transition-colors disabled:opacity-50">
                        Save Draft
                    </button>
                    <button type="submit" disabled={isPending}
                        className="px-4 py-2 rounded-lg text-sm bg-(--second-color) text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                        {isPending ? "Saving…" : "Save Prescription"}
                    </button>
                    <button type="button" onClick={(e) => handleSubmit(e, true)} disabled={isPending}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm bg-teal-600 text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                        <FaPrint size={12} /> Print & Save
                    </button>
                </div>
            </form>
        </section>
    )
}

export default CreatePrescriptionPage