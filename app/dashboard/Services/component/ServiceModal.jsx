"use client"
import { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5"
import { useCreateService, useUpdateService } from "@/hooks/useServices"
import Swal from 'sweetalert2'

function ServiceModal({ isOpen, onClose, service }) {
    const { mutate: createService } = useCreateService()
    const { mutate: updateService } = useUpdateService()
    const isEditMode = Boolean(service)

    const [form, setForm] = useState({
        title: "", category: "", price: "", description: "", status: "active"
    })

    useEffect(() => {
        if (service) {
            setForm({
                title: service.title || "",
                category: service.category || "",
                price: service.price || "",
                description: service.description || "",
                status: service.status || "active"
            })
        } else {
            setForm({ title: "", category: "", price: "", description: "", status: "active" })
        }
    }, [service, isOpen])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()

        if (isEditMode) {
            updateService(
                { id: service.id, updatedFields: form },
                {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Updated!",
                            text: "The service has been updated successfully.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        })
                    },
                    onError: () => {
                        Swal.fire({
                            title: "Error",
                            text: "Something went wrong while updating the service.",
                            icon: "error"
                        })
                    }
                }
            )
        } else {
            createService(form, {
                onSuccess: () => {
                    Swal.fire({
                        title: "Created!",
                        text: "The service has been created successfully.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    })
                },
                onError: () => {
                    Swal.fire({
                        title: "Error",
                        text: "Something went wrong while creating the service.",
                        icon: "error"
                    })
                }
            })
        }

        onClose()
    }

    if (!isOpen) return null

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <div onClick={(e) => e.stopPropagation()} className="bg-(--main-color) w-[90%] max-w-md rounded-xl p-6 animate-popIn">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-(--text-color) font-semibold text-lg">{isEditMode ? "Edit Service" : "Create Service"}</h2>
                    <button onClick={onClose} className="text-(--text-color)/50 hover:text-(--text-color)">
                        <IoClose size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div>
                        <label className="text-xs text-(--text-color)/60 mb-1 block">Service Name</label>
                        <input type="text" name="title" value={form.title} onChange={handleChange} required className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)" />
                    </div>
                    <div>
                        <label className="text-xs text-(--text-color)/60 mb-1 block">Category</label>
                        <select name="category" value={form.category} onChange={handleChange} required className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)">
                            <option value="">Select category</option>
                            <option>Cardiology</option>
                            <option>Dermatology</option>
                            <option>Neurology</option>
                            <option>Orthopedics</option>
                            <option>General</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs text-(--text-color)/60 mb-1 block">Price</label>
                        <input type="number" name="price" value={form.price} onChange={handleChange} required className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)" />
                    </div>
                    <div>
                        <label className="text-xs text-(--text-color)/60 mb-1 block">Description</label>
                        <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full px-3 py-2 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color) resize-none" />
                    </div>
                    <div>
                        <label className="text-xs text-(--text-color)/60 mb-1 block">Status</label>
                        <select name="status" value={form.status} onChange={handleChange} className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)">
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-sm text-(--text-color)/60 hover:bg-(--bg-color) transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-md text-sm bg-(--second-color) text-white hover:opacity-90 transition-opacity">{isEditMode ? "Save Changes" : "Create Service"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ServiceModal