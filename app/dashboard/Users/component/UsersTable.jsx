"use client"
import { useRef, useState } from "react"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { FaUser, FaEdit } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useDeleteUser, useUpdateUser } from "@/hooks/useUsers"
import Swal from "sweetalert2"

const roleStyle = {
    admin: "bg-blue-50 text-blue-600 border-blue-100",
    assistant: "bg-purple-50 text-purple-600 border-purple-100",
    finance: "bg-amber-50 text-amber-600 border-amber-100",
}

function ActionMenu({ user, size = "normal", openMenu, setOpenMenu, onView, onEdit, onDelete }) {
    const isOpen = openMenu === user.id

    return (
        <div className="flex items-center justify-center relative">
            {/* invisible full-screen backdrop — closes menu when clicking outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenMenu(null)}
                />
            )}

            <button
                className={`rounded-md bg-(--main-color) flex items-center justify-center cursor-pointer ${size === "sm" ? "p-1.5 w-7 h-7" : "p-2 w-8 h-8"}`}
                onClick={() => setOpenMenu(isOpen ? null : user.id)}
            >
                <BiDotsVerticalRounded size={size === "sm" ? 18 : 22} className="text-(--text-color)/70" />
            </button>

            {isOpen && (
                <div className="absolute top-8 right-0 min-w-[160px] rounded-lg shadow-lg bg-(--main-color) z-50 animate-popIn border border-(--text-color)/10">
                    <button
                        className="flex items-center w-full px-4 py-2 text-sm text-(--p-color) hover:text-(--text-color) transition-all gap-2 cursor-pointer"
                        onClick={() => { setOpenMenu(null); onView(user.id) }}
                    >
                        <FaUser className="w-4 h-4" />
                        View Profile
                    </button>
                    <button
                        className="flex items-center w-full px-4 py-2 text-sm text-(--p-color) hover:text-(--text-color) transition-all gap-2 cursor-pointer"
                        onClick={() => { setOpenMenu(null); onEdit(user) }}
                    >
                        <FaEdit className="w-4 h-4" />
                        Edit Details
                    </button>
                    <button
                        className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:text-red-600 transition-all gap-2 cursor-pointer"
                        onClick={() => { setOpenMenu(null); onDelete(user) }}
                    >
                        <RiDeleteBin6Line className="w-4 h-4" />
                        Delete User
                    </button>
                </div>
            )}
        </div>
    )
}

function UsersTable({ users, onEdit, onView }) {
    const { mutate: deleteUser } = useDeleteUser()
    const { mutate: updateUser } = useUpdateUser()
    const [openMenu, setOpenMenu] = useState(null)

    const handleToggleStatus = (user) => {
        const next = user.status === "active" ? "inactive" : "active"
        updateUser({ id: user.id, updatedFields: { status: next } })
    }

    const handleDelete = (user) => {
        Swal.fire({
            title: "Delete User?",
            text: `This will permanently delete "${user.name}".`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(user.id)
                Swal.fire({ title: "Deleted!", icon: "success", timer: 1500, showConfirmButton: false })
            }
        })
    }

    const menuProps = { openMenu, setOpenMenu, onView, onEdit, onDelete: handleDelete }

    return (
        <div className="bg-(--bg-color) rounded-xl shadow mt-6 w-full">
            {/* Large screens */}
            <div className="hidden lg:block w-full">
                <table className="w-full border-collapse text-sm">
                    <thead>
                        <tr className="bg-(--main-color) border-b border-(--text-color)/30">
                            {["User Name", "Email Address", "User Role", "Status", "Add Date", "Last Active", "Actions"].map(h => (
                                <td key={h} className="text-left px-4 font-semibold py-3 text-md text-(--p-color)">{h}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-(--text-color)/10 hover:bg-(--main-color) transition-colors">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                                        <div>
                                            <div className="font-semibold text-(--text-color) leading-none">{user.name}</div>
                                            <div className="text-xs text-(--p-color)">{user.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-(--text-color)">{user.email}</td>
                                <td className="px-4 py-3">
                                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold border capitalize ${roleStyle[user.role] || "bg-gray-50 text-gray-600 border-gray-100"}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => handleToggleStatus(user)}
                                        className={`inline-block px-2 py-0.5 rounded text-xs font-semibold border transition-colors ${user.status === "active" ? "bg-green-50 text-green-700 border-green-100" : "bg-gray-100 text-gray-500 border-gray-200"}`}
                                    >
                                        {user.status}
                                    </button>
                                </td>
                                <td className="px-4 py-3 text-(--text-color)">{user.addDate}</td>
                                <td className="px-4 py-3 text-(--text-color)">{user.lastActive}</td>
                                <td className="px-4 py-3">
                                    <ActionMenu user={user} {...menuProps} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Small screens */}
            <div className="block lg:hidden w-full">
                <table className="w-full border-collapse text-xs">
                    <thead>
                        <tr className="bg-(--main-color) border-b border-(--text-color)/30">
                            {["User Name", "Email", "Role", "Status", "Actions"].map(h => (
                                <td key={h} className="text-left px-2 py-2 font-semibold text-xs text-(--p-color)">{h}</td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-(--text-color)/20 hover:bg-(--main-color) transition-colors">
                                <td className="px-2 py-2">
                                    <div className="flex items-center gap-2">
                                        <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover" />
                                        <div className="font-semibold text-(--text-color) text-xs truncate max-w-[70px]">{user.name}</div>
                                    </div>
                                </td>
                                <td className="px-2 py-2 text-(--text-color) truncate max-w-[90px]">{user.email}</td>
                                <td className="px-2 py-2">
                                    <span className={`inline-block px-1.5 py-0.5 rounded text-xs border capitalize ${roleStyle[user.role] || "bg-gray-50 text-gray-600 border-gray-100"}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-2 py-2">
                                    <button
                                        onClick={() => handleToggleStatus(user)}
                                        className={`inline-block px-1.5 py-0.5 rounded text-xs font-semibold border ${user.status === "active" ? "bg-green-50 text-green-700 border-green-100" : "bg-gray-100 text-gray-500 border-gray-200"}`}
                                    >
                                        {user.status}
                                    </button>
                                </td>
                                <td className="px-2 py-2">
                                    <ActionMenu user={user} size="sm" {...menuProps} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UsersTable