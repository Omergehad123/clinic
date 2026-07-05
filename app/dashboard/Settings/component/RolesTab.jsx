"use client"

import React, { useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import {
    SettingsPanel,
    SettingsSectionHeader,
    SettingsPrimaryButton,
    SettingsFooter,
} from "./SettingsUI"

const resources = [
    { name: "Users", key: "users" },
    { name: "Patients", key: "patients" },
    { name: "Appointments", key: "appointments" },
    { name: "Prescriptions", key: "prescriptions" },
    { name: "Services", key: "services" },
    { name: "Settings", key: "settings" },
    { name: "Trash", key: "trash" },
]

const actions = [
    { name: "Read", key: "read" },
    { name: "Create", key: "create" },
    { name: "Update", key: "update" },
    { name: "Delete", key: "delete" },
]

const roles = [
    { name: "Admin", key: "admin" },
    { name: "Assistant", key: "assistant" },
    { name: "Finance", key: "finance" },
]

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
}

const roleColors = {
    admin: "text-blue-600",
    assistant: "text-purple-600",
    finance: "text-amber-600",
}

const checkboxClasses = (checked, color) =>
    `w-7 h-7 flex items-center justify-center rounded-lg transition
     ${checked ? `${color} bg-(--second-color)/15 border-(--second-color)/30` : "text-(--p-color) bg-(--bg-color)/40 border-(--text-color)/10"}
     border focus:outline-none cursor-pointer`

function RolesTab() {
    const [permissions, setPermissions] = useState(defaultPermissions)
    const [saving, setSaving] = useState(false)

    const handleToggle = (role, resource, action) => {
        setPermissions((prev) => ({
            ...prev,
            [role]: {
                ...prev[role],
                [resource]: {
                    ...prev[role][resource],
                    [action]: !prev[role][resource][action],
                },
            },
        }))
    }

    const handleSave = () => {
        setSaving(true)
        setTimeout(() => setSaving(false), 1200)
    }

    return (
        <SettingsPanel>
            <SettingsSectionHeader
                title="Roles"
                description="Define what each role can access across the clinic system."
            />

            <div className="px-4 md:px-6 pb-4 flex-1 overflow-auto">
                <div className="overflow-x-auto rounded-xl border border-(--text-color)/10">
                    <table className="min-w-full text-left">
                        <thead>
                            <tr className="border-b border-(--text-color)/10 bg-(--bg-color)/30">
                                <th className="p-4 text-xs font-bold uppercase tracking-wider text-(--second-color) sticky left-0 z-10 bg-(--bg-color)/30">
                                    Permission
                                </th>
                                {roles.map((role) => (
                                    <th
                                        key={role.key}
                                        className="p-4 text-xs font-bold uppercase tracking-wider text-(--text-color)"
                                    >
                                        {role.name}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {resources.map((res) => (
                                <React.Fragment key={res.key}>
                                    <tr>
                                        <td
                                            colSpan={roles.length + 1}
                                            className="px-4 py-2.5 bg-(--bg-color)/20 font-semibold text-(--text-color) text-sm"
                                        >
                                            {res.name}
                                        </td>
                                    </tr>
                                    {actions.map((action) => (
                                        <tr key={res.key + action.key} className="border-b border-(--text-color)/5">
                                            <td className="px-6 py-3 text-sm font-medium text-(--text-color)/80 w-40 capitalize sticky left-0 bg-(--main-color)">
                                                {action.name}
                                            </td>
                                            {roles.map((role) => {
                                                const checked = permissions[role.key][res.key]?.[action.key]
                                                return (
                                                    <td key={role.key} className="text-center px-4 py-3">
                                                        <button
                                                            type="button"
                                                            aria-label={`${role.name} ${res.name} ${action.name}`}
                                                            className={checkboxClasses(checked, roleColors[role.key])}
                                                            onClick={() => handleToggle(role.key, res.key, action.key)}
                                                        >
                                                            {checked && (
                                                                <FaCheckCircle
                                                                    size={16}
                                                                    className={roleColors[role.key]}
                                                                />
                                                            )}
                                                        </button>
                                                    </td>
                                                )
                                            })}
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <SettingsFooter>
                <SettingsPrimaryButton onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                </SettingsPrimaryButton>
            </SettingsFooter>
        </SettingsPanel>
    )
}

export default RolesTab
