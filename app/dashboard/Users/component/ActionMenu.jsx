import { useDeleteUser } from "@/hooks/useUsers";

const { BiDotsVerticalRounded } = require("react-icons/bi");
const { FaUser, FaEdit } = require("react-icons/fa");
const { RiDeleteBin6Line } = require("react-icons/ri");

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
            Swal.fire({
                title: "Deleted!",
                icon: "success",
                timer: 1500,
                showConfirmButton: false
            })
        }
    })
}

function ActionMenu({ user, size = "normal", openMenu, setOpenMenu, onView, onEdit, onDelete, menuRefs }) {
    const { mutate: deleteUser } = useDeleteUser()
    return (
        <div className="flex items-center justify-center relative">
            <button
                className={`rounded-md bg-(--main-color) flex items-center justify-center cursor-pointer ${size === "sm" ? "p-1.5 w-7 h-7" : "p-2 w-8 h-8"}`}
                onClick={() => setOpenMenu(openMenu === user.id ? null : user.id)}
            >
                <BiDotsVerticalRounded size={size === "sm" ? 18 : 22} className="text-(--text-color)/70" />
            </button>
            {openMenu === user.id && (
                <div
                    ref={el => (menuRefs.current[user.id] = el)}
                    className="absolute top-8 right-0 min-w-[160px] rounded-lg shadow-lg bg-(--main-color) z-50 animate-popIn border border-(--text-color)/10"
                >
                    <button
                        className="flex items-center w-full px-4 py-2 text-sm text-(--p-color) hover:text-(--text-color) transition-all gap-2 cursor-pointer"
                        onClick={() => { onView(user.id); setOpenMenu(null) }}
                    >
                        <FaUser className="w-4 h-4" />
                        View Profile
                    </button>
                    <button
                        className="flex items-center w-full px-4 py-2 text-sm text-(--p-color) hover:text-(--text-color) transition-all gap-2 cursor-pointer"
                        onClick={() => { onEdit(user); setOpenMenu(null) }}
                    >
                        <FaEdit className="w-4 h-4" />
                        Edit Details
                    </button>
                    <button
                        className="flex items-center w-full px-4 py-2 text-sm text-red-500 hover:text-red-600 transition-all gap-2 cursor-pointer"
                        onClick={() => { onDelete(user); setOpenMenu(null) }}
                    >
                        <RiDeleteBin6Line className="w-4 h-4" />
                        Delete User
                    </button>
                </div>
            )}
        </div>
    )
}

export default ActionMenu