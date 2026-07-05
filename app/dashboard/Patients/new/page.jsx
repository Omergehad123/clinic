"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCreatePatient } from "@/hooks/usePatients"
import { FaArrowLeft, FaTimes } from "react-icons/fa"
import Swal from "sweetalert2"

// ← moved outside, receives form and setForm as props
function TagInput({ label, field, form, setForm }) {
    const [input, setInput] = useState("")

    const addTag = () => {
        const val = input.trim()
        if (val && !form[field].includes(val)) {
            setForm({ ...form, [field]: [...form[field], val] })
            setInput("")
        }
    }

    const removeTag = (idx) => {
        setForm({ ...form, [field]: form[field].filter((_, i) => i !== idx) })
    }

    return (
        <div>
            <label className="text-xs text-(--text-color)/60 mb-1 block">{label}</label>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag() } }}
                    placeholder={`Add ${label.toLowerCase()} and press Enter`}
                    className="flex-1 h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="px-3 h-[38px] rounded-md bg-(--second-color) text-white text-sm hover:opacity-90"
                >
                    Add
                </button>
            </div>
            {form[field].length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {form[field].map((item, idx) => (
                        <span key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs">
                            {item}
                            <button type="button" onClick={() => removeTag(idx)}>
                                <FaTimes size={10} />
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

function AddPatientPage() {
    const router = useRouter()
    const { mutate: createPatient, isPending } = useCreatePatient()

    const [form, setForm] = useState({
        fullName: "",
        phone: "",
        dob: "",
        gender: "",
        address: "",
        allergies: [],
        chronicDiseases: [],
        currentMedications: [],
        notes: "",
        status: "active",
    })

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        createPatient(form, {
            onSuccess: (created) => {
                Swal.fire({ title: "Patient Added!", icon: "success", timer: 1500, showConfirmButton: false })
                    .then(() => router.push(`/dashboard/Patients/${created.id}`))
            },
            onError: () => Swal.fire({ title: "Error", text: "Something went wrong.", icon: "error" })
        })
    }

    return (
        <section className="max-w-3xl mx-auto">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-(--p-color) hover:text-(--text-color) text-sm mb-5 transition-colors">
                <FaArrowLeft size={12} /> Back to Patients
            </button>

            <div className="bg-(--main-color) rounded-xl p-5 mb-4">
                <h1 className="text-(--text-color) font-bold text-xl">Add New Patient</h1>
                <p className="text-(--p-color) text-sm mt-0.5">Fill out the details to register a new patient.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="bg-(--main-color) rounded-xl p-5">
                    <h2 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-4">Personal Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Full Name *</label>
                            <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="John Doe"
                                className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)" />
                        </div>
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Phone *</label>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} required placeholder="555-0000"
                                className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)" />
                        </div>
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Date of Birth</label>
                            <input type="date" name="dob" value={form.dob} onChange={handleChange}
                                className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)" />
                        </div>
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Gender</label>
                            <select name="gender" value={form.gender} onChange={handleChange}
                                className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)">
                                <option value="">Select gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                        <div className="sm:col-span-2">
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Address</label>
                            <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="123 Main St, City"
                                className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)" />
                        </div>
                    </div>
                </div>

                <div className="bg-(--main-color) rounded-xl p-5">
                    <h2 className="text-(--text-color) font-semibold text-sm uppercase tracking-wider opacity-60 mb-4">Medical Information</h2>
                    <div className="flex flex-col gap-4">
                        <TagInput label="Allergies" field="allergies" form={form} setForm={setForm} />
                        <TagInput label="Chronic Diseases" field="chronicDiseases" form={form} setForm={setForm} />
                        <TagInput label="Current Medications" field="currentMedications" form={form} setForm={setForm} />
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Notes</label>
                            <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Any additional notes…"
                                className="w-full px-3 py-2 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color) resize-none" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                    <button type="button" onClick={() => router.back()}
                        className="px-4 py-2 rounded-lg text-sm text-(--text-color)/60 hover:bg-(--main-color) transition-colors border border-(--text-color)/20">
                        Cancel
                    </button>
                    <button type="submit" disabled={isPending}
                        className="px-5 py-2 rounded-lg text-sm bg-(--second-color) text-white hover:opacity-90 transition-opacity disabled:opacity-50">
                        {isPending ? "Saving…" : "Save Patient"}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default AddPatientPage