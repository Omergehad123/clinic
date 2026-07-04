"use client"
import { useDeleteUser, useUpdateUser, useUser } from "@/hooks/useUsers"
import useUsersUiStore from "@/store/usersUiStore"
import UserModal from "../component/UserModal"
import Swal from "sweetalert2"
import {
    FaEnvelope, FaPhone, FaShieldAlt,
    FaCalendarAlt, FaClock, FaEdit, FaArrowLeft
} from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"

const roleStyle = {
    admin: "bg-blue-50 text-blue-600 border-blue-200",
    assistant: "bg-purple-50 text-purple-600 border-purple-200",
    finance: "bg-amber-50 text-amber-600 border-amber-200",
}

const statusStyle = {
    active: "bg-green-50 text-green-700 border-green-200",
    inactive: "bg-gray-100 text-gray-500 border-gray-200",
}

function UserProfile() {
    const { viewingUserId, closeProfile, isModalOpen, editingUser, openEditModal, closeModal } = useUsersUiStore()
    const { data: user, isLoading, error } = useUser(viewingUserId)
    const { mutate: deleteUser } = useDeleteUser()
    const { mutate: updateUser } = useUpdateUser()

    const handleToggleStatus = () => {
        const next = user.status === "active" ? "inactive" : "active"
        updateUser(
            { id: user.id, updatedFields: { status: next } },
            {
                onSuccess: () => Swal.fire({
                    title: `User ${next === "active" ? "Activated" : "Deactivated"}!`,
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                })
            }
        )
    }

    const handleDelete = () => {
        Swal.fire({
            title: "Delete User?",
            text: `This will permanently delete "${user.name}". This action cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(user.id, {
                    onSuccess: () => {
                        Swal.fire({
                            title: "Deleted!",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        }).then(() => closeProfile())
                    }
                })
            }
        })
    }

    if (isLoading) return (
        <div className="flex items-center justify-center h-64">
            <p className="text-(--text-color)/50">Loading...</p>
        </div>
    )

    if (error) return (
        <div className="flex items-center justify-center h-64">
            <p className="text-red-500">{error.message}</p>
        </div>
    )

    if (!user) return null

    return (
        <section className="max-w-4xl mx-auto">

            {/* Back button */}
            <button
                onClick={closeProfile}
                className="flex items-center gap-2 text-(--main-color) cursor-pointer hover:text-(--text-color) text-sm mb-5 transition-colors"
            >
                <FaArrowLeft size={12} />
                Back to Users
            </button>

            {/* Top card */}
            <div className="bg-(--main-color) rounded-xl p-6 mb-4 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-(--second-color)/20"
                />
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-(--text-color) font-bold text-2xl">{user.name}</h1>
                    <p className="text-(--p-color) text-sm mt-0.5">{user.description || "No description"}</p>
                    <div className="flex items-center justify-center sm:justify-start gap-2 mt-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${roleStyle[user.role] || "bg-gray-50 text-gray-600 border-gray-200"}`}>
                            {user.role}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${statusStyle[user.status] || ""}`}>
                            {user.status}
                        </span>
                    </div>
                </div>
                <button
                    onClick={() => openEditModal(user)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-(--text-color)/20 text-(--text-color) text-sm hover:bg-(--bg-color) transition-colors"
                >
                    <FaEdit size={13} />
                    Edit
                </button>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="bg-(--main-color) rounded-xl p-5">
                    <h2 className="text-(--text-color) font-semibold text-sm mb-4 uppercase tracking-wider opacity-60">Contact Information</h2>
                    <div className="flex flex-col gap-4">
                        {[
                            { icon: <FaEnvelope />, label: "Email", value: user.email },
                            { icon: <FaPhone />, label: "Phone", value: user.phone || "—" },
                            { icon: <FaShieldAlt />, label: "Role", value: user.role },
                        ].map(({ icon, label, value }) => (
                            <div key={label} className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-(--bg-color) flex items-center justify-center shrink-0 text-(--second-color) text-sm">
                                    {icon}
                                </span>
                                <div>
                                    <p className="text-[11px] text-(--p-color)">{label}</p>
                                    <p className="text-sm text-(--text-color) font-medium capitalize">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-(--main-color) rounded-xl p-5">
                    <h2 className="text-(--text-color) font-semibold text-sm mb-4 uppercase tracking-wider opacity-60">Activity</h2>
                    <div className="flex flex-col gap-4">
                        {[
                            { icon: <FaCalendarAlt />, label: "Date Added", value: user.addDate || "—" },
                            { icon: <FaClock />, label: "Last Active", value: user.lastActive || "—" },
                        ].map(({ icon, label, value }) => (
                            <div key={label} className="flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-(--bg-color) flex items-center justify-center shrink-0 text-(--second-color) text-sm">
                                    {icon}
                                </span>
                                <div>
                                    <p className="text-[11px] text-(--p-color)">{label}</p>
                                    <p className="text-sm text-(--text-color) font-medium">{value}</p>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-lg bg-(--bg-color) flex items-center justify-center shrink-0">
                                <span className={`w-2.5 h-2.5 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                            </span>
                            <div>
                                <p className="text-[11px] text-(--p-color)">Current Status</p>
                                <button
                                    onClick={handleToggleStatus}
                                    className="text-sm text-(--second-color) font-medium hover:underline capitalize"
                                >
                                    {user.status} — click to toggle
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Danger zone */}
            <div className="bg-(--main-color) rounded-xl p-5 border border-red-200/50">
                <h2 className="text-red-500 font-semibold text-sm mb-1 uppercase tracking-wider">Danger Zone</h2>
                <p className="text-(--p-color) text-xs mb-4">Once you delete a user, there is no going back. Please be certain.</p>
                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm hover:bg-red-100 transition-colors"
                >
                    <RiDeleteBin6Line size={15} />
                    Delete This User
                </button>
            </div>

            <UserModal isOpen={isModalOpen} onClose={closeModal} user={editingUser} />
        </section>
    )
}

export default UserProfile