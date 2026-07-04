"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { IoArrowBack } from "react-icons/io5"

function PatientProfile() {
    const { patientSlug } = useParams()

    return (
        <section>
            <div className="bg-(--main-color) rounded-xl p-6">
                <h1 className="text-(--text-color) font-semibold text-2xl capitalize">
                    {patientSlug?.replace(/-/g, " ")}
                </h1>
                <p className="text-(--p-color) text-sm mt-2">Patient profile page — details coming soon.</p>
            </div>
        </section>
    )
}

export default PatientProfile
