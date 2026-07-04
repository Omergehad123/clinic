"use client"
import { useState, useEffect } from "react"
import { IoClose } from "react-icons/io5"
import { useCreateUser, useUpdateUser } from "@/hooks/useUsers"
import Swal from "sweetalert2"

const defaultForm = {
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "admin",
    status: "active",
    description: "",
    avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
}

function UserModal({ isOpen, onClose, user }) {
    const { mutate: createUser } = useCreateUser()
    const { mutate: updateUser } = useUpdateUser()
    const isEditMode = Boolean(user)

    const [form, setForm] = useState(defaultForm)

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name || "",
                email: user.email || "",
                password: "",
                phone: user.phone || "",
                role: user.role || "admin",
                status: user.status || "active",
                description: user.description || "",
                avatar: user.avatar || defaultForm.avatar,
            })
        } else {
            setForm(defaultForm)
        }
    }, [user, isOpen])

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()

        const payload = isEditMode && !form.password
            ? (({ password, ...rest }) => rest)(form)
            : form

        if (isEditMode) {
            updateUser(
                { id: user.id, updatedFields: payload },
                {
                    onSuccess: () => {
                        Swal.fire({ title: "Updated!", icon: "success", timer: 1500, showConfirmButton: false })
                        onClose()
                    },
                    onError: () => Swal.fire({ title: "Error", text: "Something went wrong.", icon: "error" })
                }
            )
        } else {
            createUser(payload, {
                onSuccess: () => {
                    Swal.fire({ title: "User Created!", icon: "success", timer: 1500, showConfirmButton: false })
                    onClose()
                },
                onError: () => Swal.fire({ title: "Error", text: "Something went wrong.", icon: "error" })
            })
        }
    }

    if (!isOpen) return null

    return (
        <div onClick={onClose} className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fadeIn">
            <div onClick={(e) => e.stopPropagation()} className="bg-(--main-color) w-[90%] max-w-lg rounded-xl p-6 animate-popIn max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-(--text-color) font-semibold text-lg">
                            {isEditMode ? "Edit User" : "Add New User"}
                        </h2>
                        <p className="text-(--p-color) text-xs mt-0.5">
                            {isEditMode ? "Update user details" : "Fill in the details to create a new user"}
                        </p>
                    </div>
                    <button onClick={onClose} className="text-(--text-color)/40 hover:text-(--text-color) transition-colors">
                        <IoClose size={22} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                    {/* Name + Phone */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
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

                    {/* Email */}
                    <div>
                        <label className="text-xs text-(--text-color)/60 mb-1 block">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder="example@gmail.com"
                            className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-xs text-(--text-color)/60 mb-1 block">
                            Password {isEditMode && <span className="text-(--p-color)">(leave blank to keep current)</span>}
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required={!isEditMode}
                            placeholder="••••••••"
                            className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                        />
                    </div>

                    {/* Role + Status */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs text-(--text-color)/60 mb-1 block">Role</label>
                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                            >
                                <option value="admin">Admin</option>
                                <option value="assistant">Assistant</option>
                                <option value="finance">Finance</option>
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
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-xs text-(--text-color)/60 mb-1 block">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="e.g. Front Desk"
                            className="w-full h-[38px] px-3 rounded-md border border-(--text-color)/20 bg-(--bg-color) text-(--text-color) text-sm outline-none focus:border-(--second-color)"
                        />
                    </div>

                    {/* Buttons */}
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
                            {isEditMode ? "Save Changes" : "Add User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default UserModal