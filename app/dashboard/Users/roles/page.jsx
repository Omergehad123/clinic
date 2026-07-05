import { redirect } from "next/navigation"

function RolesPage() {
    redirect("/dashboard/Settings?tab=roles")
}

export default RolesPage
