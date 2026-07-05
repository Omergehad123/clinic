"use client"
import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa6";

function Profile() {
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);

    // State for user profile fields
    const [editMode, setEditMode] = useState(false);
    const [fields, setFields] = useState({
        firstName: "Omar",
        lastName: "Gehad",
        dob: "5-11-2003",
        email: "omergehad593@gmail.com",
        phone: "(+20) 1061989116",
        role: "Admin",
    });

    const handleCameraClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setProfileImage(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditClick = () => {
        if (editMode) {
            // Here you would normally save changes (e.g. API call)
            // For demo, just toggle edit mode off
        }
        setEditMode((mode) => !mode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // For the date input, change format to yyyy-mm-dd when editing, revert to dd-mm-yyyy when showing
    const getEditableDate = (val) => {
        // expects dd-mm-yyyy
        const parts = val.split("-");
        if (parts.length !== 3) return val;
        return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
    };
    const getDisplayDate = (val) => {
        // expects yyyy-mm-dd
        const parts = val.split("-");
        if (parts.length !== 3) return val;
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };

    return (
        <>
            <h1 className="text-(--text-color) text-2xl block mb-5">My Profile</h1>
            <div className="w-full min-h-[100px] mb-5 rounded-md bg-(--main-color) text-(--text-color) flex items-center gap-5 p-5">
                <div className="relative w-25 h-25 bg-(--bg-color) rounded-full flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                        <img
                            src={profileImage}
                            alt="user"
                            className="w-full h-full object-cover rounded-full"
                        />
                    ) : (
                        <span className="text-xl text-(--second-color)"></span>
                    )}
                    {/* Camera button wrapper with fix for absolute overlay */}
                    <div 
                        className="pointer-events-none absolute  inset-0 z-50 flex items-end justify-end"
                        style={{zIndex: 30}}
                    >
                        <button
                            type="button"
                            className="pointer-events-auto bg-(--main-color) rounded-full p-2 shadow shadow-black hover:bg-(--second-color) transition m-2"
                            onClick={handleCameraClick}
                            aria-label="Add Profile Image"
                            style={{zIndex: 30, position: "relative"}}
                        >
                            <FaCamera />
                        </button>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
                <div>
                    <h1 className="text-(--second-color) font-bold">{fields.firstName} {fields.lastName}</h1>
                    <span className="text-(--p-color)">{fields.role}</span>
                </div>
            </div>
            {/* Personal Information Card */}
            <div className="w-full mb-5 rounded-md bg-(--main-color) shadow p-5">
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
                    <span className="text-base text-[--second-color] font-semibold">Personal Information</span>
                    <button
                        className="bg-[--second-color] hover:bg-[--main-color] text-(--text-color) text-sm px-4 py-1 rounded transition duration-150 flex items-center gap-2"
                        onClick={handleEditClick}
                    >
                        {editMode ? 'Save' : 'Edit'}
                        {editMode ? (
                            // Save icon (check)
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        ) : (
                            // Edit (pencil)
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L7.5 21H3v-4.5L16.732 3.732z" />
                            </svg>
                        )}
                    </button>
                </div>
                {/* Two-inputs side by side, flex-wrapped layout */}
                <div className="flex flex-wrap gap-6 text-sm">
                    {/* First Name */}
                    <div className="flex flex-col w-full sm:w-[48%] md:w-[45%] lg:w-[30%]">
                        <span className="block text-gray-500">First Name</span>
                        {editMode ? (
                            <input
                                type="text"
                                name="firstName"
                                className="w-full border border-gray-300 rounded px-2 py-1 text-[--text-color]"
                                value={fields.firstName}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span className="font-medium text-[--text-color]">{fields.firstName}</span>
                        )}
                    </div>
                    {/* Last Name */}
                    <div className="flex flex-col w-full sm:w-[48%] md:w-[45%] lg:w-[30%]">
                        <span className="block text-gray-500">Last Name</span>
                        {editMode ? (
                            <input
                                type="text"
                                name="lastName"
                                className="w-full border border-gray-300 rounded px-2 py-1 text-[--text-color]"
                                value={fields.lastName}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span className="font-medium text-[--text-color]">{fields.lastName}</span>
                        )}
                    </div>
                    {/* Date of Birth */}
                    <div className="flex flex-col w-full sm:w-[48%] md:w-[45%] lg:w-[30%]">
                        <span className="block text-gray-500">Date of Birth</span>
                        {editMode ? (
                            <input
                                type="date"
                                name="dob"
                                className="w-full border border-gray-300 rounded px-2 py-1 text-[--text-color]"
                                value={getEditableDate(fields.dob)}
                                onChange={e =>
                                    setFields(prev => ({
                                        ...prev,
                                        dob: getDisplayDate(e.target.value)
                                    }))
                                }
                            />
                        ) : (
                            <span className="font-medium text-[--text-color]">{fields.dob}</span>
                        )}
                    </div>
                    {/* Email Address */}
                    <div className="flex flex-col w-full sm:w-[48%] md:w-[45%] lg:w-[30%]">
                        <span className="block text-gray-500">Email Address</span>
                        {editMode ? (
                            <input
                                type="email"
                                name="email"
                                className="w-full border border-gray-300 rounded px-2 py-1 text-[--text-color]"
                                value={fields.email}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span className="font-medium text-[--text-color]">{fields.email}</span>
                        )}
                    </div>
                    {/* Phone Number */}
                    <div className="flex flex-col w-full sm:w-[48%] md:w-[45%] lg:w-[30%]">
                        <span className="block text-gray-500">Phone Number</span>
                        {editMode ? (
                            <input
                                type="tel"
                                name="phone"
                                className="w-full border border-gray-300 rounded px-2 py-1 text-[--text-color]"
                                value={fields.phone}
                                onChange={handleInputChange}
                            />
                        ) : (
                            <span className="font-medium text-[--text-color]">{fields.phone}</span>
                        )}
                    </div>
                    {/* User Role (Not Editable) */}
                    <div className="flex flex-col w-full sm:w-[48%] md:w-[45%] lg:w-[30%]">
                        <span className="block text-gray-500">User Role</span>
                        <span className="font-medium text-[--second-color]">{fields.role}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile