"use client";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

// Resource and Permissions Definitions
const resources = [
    { name: "Users", key: "users" },
    { name: "Patients", key: "patients" },
    { name: "Appointments", key: "appointments" },
    { name: "Prescriptions", key: "prescriptions" },
    { name: "Services", key: "services" },
    { name: "Settings", key: "settings" },
    { name: "Trash", key: "trash" },
];

const actions = [
    { name: "Read", key: "read" },
    { name: "Create", key: "create" },
    { name: "Update", key: "update" },
    { name: "Delete", key: "delete" },
];

const roles = [
    { name: "Admin", key: "admin" },
    { name: "Assistant", key: "assistant" },
    { name: "Finance", key: "finance" },
];

const defaultPermissions = {
    admin: {
        users: { read: true, create: true, update: true, delete: true },
        patients: { read: true, create: true, update: true, delete: true },
        appointments: { read: true, create: true, update: true, delete: true },
        prescriptions: { read: true, create: true, update: true, delete: true },
        services: { read: true, create: true, update: true, delete: true },
        settings: { read: true, create: true, update: true, delete: true },
        trash: { read: true, create: false, update: false, delete: true },
    },
    assistant: {
        users: { read: true, create: false, update: true, delete: false },
        patients: { read: true, create: true, update: true, delete: false },
        appointments: { read: true, create: true, update: true, delete: false },
        prescriptions: { read: true, create: true, update: true, delete: false },
        services: { read: true, create: false, update: false, delete: false },
        settings: { read: false, create: false, update: false, delete: false },
        trash: { read: false, create: false, update: false, delete: false },
    },
    finance: {
        users: { read: true, create: false, update: false, delete: false },
        patients: { read: true, create: false, update: false, delete: false },
        appointments: { read: true, create: false, update: false, delete: false },
        prescriptions: { read: true, create: false, update: false, delete: false },
        services: { read: false, create: false, update: false, delete: false },
        settings: { read: true, create: false, update: true, delete: false },
        trash: { read: false, create: false, update: false, delete: false },
    },
};

const roleColors = {
    admin: "text-blue-600",
    assistant: "text-purple-600",
    finance: "text-amber-600",
};

const roleBg = {
    admin: "bg-blue-50",
    assistant: "bg-purple-50",
    finance: "bg-amber-50",
};

const checkboxClasses = (checked, color) =>
    `w-6 h-6 flex items-center justify-center rounded transition 
     ${checked ? `${color} bg-(--second-color)/20` : "text-gray-400 bg-(--main-color) border-(--text-color)/10"}
     border-2 focus:outline-none cursor-pointer shadow-sm`;


function Rules() {
    const [permissions, setPermissions] = useState(defaultPermissions);
    const [saving, setSaving] = useState(false);

    const handleToggle = (role, resource, action) => {
        setPermissions(prev => ({
            ...prev,
            [role]: {
                ...prev[role],
                [resource]: {
                    ...prev[role][resource],
                    [action]: !prev[role][resource][action]
                }
            }
        }));
    };

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => setSaving(false), 1200);
        // Call backend API if needed
    };

    return (
        <div className="w-full min-h-screen px-4 ">
            <div className="mx-auto">
                <div className="mb-7 flex items-center justify-between flex-wrap gap-2">
                    <div>
                        <h1 className="font-bold text-2xl text-(--text-color)">
                            Role Permissions
                        </h1>
                        <div className="text-(--text-color)/80 text-sm mt-1">
                            Control & limit what each role can access and manage
                        </div>
                    </div>
                    <button
                        onClick={handleSave}
                        className={`flex items-center px-5 py-2 rounded-lg bg-(--second-color) text-white font-semibold shadow transition-transform gap-2
                            ${saving ? "opacity-70 scale-95 pointer-events-none" : "hover:scale-[1.04]"}`}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
                <div className="overflow-x-auto bg-(--main-color) rounded-xl shadow border border-(--text-color)/10">
                    <table className="min-w-full text-left rounded-xl overflow-hidden">
                        <thead>
                            <tr className="border-b border-(--text-color)/50">
                                <th className="p-4 text-xs font-bold uppercase tracking-wider text-(--second-color) bg-(--bg-color) sticky left-0 z-10">
                                    Permission
                                </th>
                                {roles.map(role => (
                                    <th
                                        key={role.key}
                                        className={`p-4 text-xs font-bold uppercase tracking-wider bg-(--bg-color)`}
                                    >
                                        {role.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {resources.map((res, ridx) => (
                                <React.Fragment key={res.key}>
                                    <tr>
                                        <td
                                            colSpan={roles.length + 1}
                                            className={`px-4 py-2 bg-(--bg-color) font-semibold text-(--text-color) text-sm ${ridx !== 0 ? "mt-4" : ""
                                                }`}
                                        >
                                            {res.name}
                                        </td>
                                    </tr>
                                    {actions.map(action => (
                                        <tr key={res.key + action.key} className="border-b border-(--text-color)/5 transition">
                                            <td className="px-6 py-3 text-sm font-medium text-(--text-color)/80 w-40 capitalize bg-transparent">
                                                <div>{action.name}</div>
                                            </td>
                                            {roles.map(role => {
                                                const checked = permissions[role.key][res.key]?.[action.key];
                                                return (
                                                    <td key={role.key} className="text-center px-4">
                                                        <button
                                                            type="button"
                                                            aria-label={`${role.name} ${res.name} ${action.name}`}
                                                            className={checkboxClasses(checked, roleColors[role.key]) + " group"}
                                                            onClick={() => handleToggle(role.key, res.key, action.key)}
                                                        >
                                                            {checked && (
                                                                <FaCheckCircle
                                                                    size={18}
                                                                    className={roleColors[role.key] + " drop-shadow"}
                                                                />
                                                            )}
                                                        </button>
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Rules;