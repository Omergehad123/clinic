"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import Swal from "sweetalert2"
import {
    SettingsPanel,
    SettingsSectionHeader,
    SettingsRow,
    SettingsSelect,
    SettingsToggle,
    SettingsPrimaryButton,
    SettingsFooter,
} from "./SettingsUI"

function PreferencesTab() {
    const { theme, setTheme } = useTheme()
    const [preferences, setPreferences] = useState({
        language: "en",
        timeFormat: "12",
        dateFormat: "DD/MM/YYYY",
    })

    const handleChange = (e) => {
        setPreferences({ ...preferences, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        Swal.fire({
            title: "Saved!",
            text: "Preferences updated.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
        })
    }

    return (
        <SettingsPanel>
            <SettingsSectionHeader
                title="Preferences"
                description="Customize language, appearance, and regional formats."
            />

            <SettingsRow
                label="Language"
                description="Choose the default language for your dashboard."
            >
                <SettingsSelect name="language" value={preferences.language} onChange={handleChange}>
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                </SettingsSelect>
            </SettingsRow>

            <SettingsRow
                label="Dark mode"
                description="Switch between light and dark appearance."
            >
                <SettingsToggle
                    checked={theme === "dark"}
                    onChange={(value) => setTheme(value ? "dark" : "light")}
                />
            </SettingsRow>

            <SettingsRow
                label="Time format"
                description="How appointment and activity times are displayed."
            >
                <SettingsSelect name="timeFormat" value={preferences.timeFormat} onChange={handleChange}>
                    <option value="12">12-hour (AM/PM)</option>
                    <option value="24">24-hour</option>
                </SettingsSelect>
            </SettingsRow>

            <SettingsRow
                label="Date format"
                description="Preferred date format across the system."
                isLast
            >
                <SettingsSelect name="dateFormat" value={preferences.dateFormat} onChange={handleChange}>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </SettingsSelect>
            </SettingsRow>

            <SettingsFooter>
                <SettingsPrimaryButton onClick={handleSave}>Save Changes</SettingsPrimaryButton>
            </SettingsFooter>
        </SettingsPanel>
    )
}

export default PreferencesTab
