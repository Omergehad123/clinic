"use client"

import { useState } from "react"
import { FaCamera } from "react-icons/fa6"
import Swal from "sweetalert2"
import {
    SettingsPanel,
    SettingsSectionHeader,
    SettingsRow,
    SettingsValue,
    SettingsInput,
    SettingsOutlineButton,
    SettingsPrimaryButton,
    SettingsFooter,
} from "./SettingsUI"

const initialClinic = {
    name: "Sunrise Medical Clinic",
    email: "contact@sunriseclinic.com",
    phone: "+20 100 123 4567",
    address: "12 Nile Street, Cairo, Egypt",
    logo: "",
}

function ClinicTab() {
    const [clinic, setClinic] = useState(initialClinic)
    const [logoPreview, setLogoPreview] = useState("")
    const [editingField, setEditingField] = useState(null)

    const handleChange = (e) => {
        setClinic({ ...clinic, [e.target.name]: e.target.value })
    }

    const handleLogoChange = (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        setLogoPreview(URL.createObjectURL(file))
        setClinic({ ...clinic, logo: file.name })
    }

    const handleSave = () => {
        setEditingField(null)
        Swal.fire({
            title: "Saved!",
            text: "Clinic information updated.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
        })
    }

    const renderField = (field, label, description, type = "text") => {
        const isEditing = editingField === field

        return (
            <SettingsRow label={label} description={description}>
                {isEditing ? (
                    <SettingsInput
                        type={type}
                        name={field}
                        value={clinic[field]}
                        onChange={handleChange}
                        autoFocus
                    />
                ) : (
                    <>
                        <SettingsValue>{clinic[field]}</SettingsValue>
                        <SettingsOutlineButton onClick={() => setEditingField(field)}>
                            Edit
                        </SettingsOutlineButton>
                    </>
                )}
            </SettingsRow>
        )
    }

    return (
        <SettingsPanel>
            <SettingsSectionHeader
                title="Clinic"
                description="Manage your clinic profile and public contact information."
            />

            <SettingsRow
                label="Clinic logo">
                <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-r-full bg-(--bg-color) border border-(--text-color)/10 overflow-hidden shrink-0">
                        {logoPreview ? (
                            <img src={logoPreview} alt="Clinic logo" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-(--p-color)">
                                Logo
                            </div>
                        )}
                    </div>
                    <label className="cursor-pointer">
                        <span className="inline-flex items-center gap-2 h-10 px-4 rounded-lg border border-(--text-color)/15 text-sm font-medium text-(--text-color) hover:bg-(--bg-color)/60 transition-all">
                            <FaCamera size={14} className="text-(--p-color)" />
                            Upload
                        </span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
                    </label>
                </div>
            </SettingsRow>

            {renderField("name", "Clinic name", "The name displayed across your clinic dashboard.")}
            {renderField("email", "Clinic email", "Primary email for patient and system notifications.", "email")}
            {renderField("phone", "Clinic phone", "Contact number shown on appointments and invoices.", "tel")}

            <SettingsRow
                label="Address"
                description="Physical location of your clinic."
                isLast
            >
                {editingField === "address" ? (
                    <SettingsInput
                        name="address"
                        value={clinic.address}
                        onChange={handleChange}
                        autoFocus
                    />
                ) : (
                    <>
                        <SettingsValue>{clinic.address}</SettingsValue>
                        <SettingsOutlineButton onClick={() => setEditingField("address")}>
                            Edit
                        </SettingsOutlineButton>
                    </>
                )}
            </SettingsRow>

            <SettingsFooter>
                <SettingsPrimaryButton onClick={handleSave}>Save Changes</SettingsPrimaryButton>
            </SettingsFooter>
        </SettingsPanel>
    )
}

export default ClinicTab
