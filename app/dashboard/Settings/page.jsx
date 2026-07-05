"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import SettingsSidebar from "./component/SettingsSidebar"
import ClinicTab from "./component/ClinicTab"
import PreferencesTab from "./component/PreferencesTab"
import SubscriptionTab from "./component/SubscriptionTab"
import RolesTab from "./component/RolesTab"

function Settings() {
    const searchParams = useSearchParams()
    const [activeSection, setActiveSection] = useState("clinic")

    useEffect(() => {
        const tab = searchParams.get("tab")
        if (tab === "roles" || tab === "clinic" || tab === "preferences" || tab === "subscription") {
            setActiveSection(tab)
        }
    }, [searchParams])

    return (
        <section className="w-full min-h-[calc(100dvh-5rem)] flex flex-col">
            <h1 className="text-(--text-color) font-semibold text-2xl md:text-3xl tracking-tight">
                Settings Page
            </h1>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-0 mt-3 flex-1 min-h-0">
                <SettingsSidebar
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                />

                <div className="flex-1 min-w-0 flex flex-col min-h-[520px] rounded-r-full">
                    {activeSection === "clinic" && <ClinicTab />}
                    {activeSection === "preferences" && <PreferencesTab />}
                    {activeSection === "subscription" && <SubscriptionTab />}
                    {activeSection === "roles" && <RolesTab />}
                </div>
            </div>
        </section>
    )
}

export default Settings
