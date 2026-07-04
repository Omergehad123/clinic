"use client"

function StatusCards({ counts }) {
    const stats = [
        { id: 1, title: "Total Appointments", count: counts.total, icon: "ti-users" },
        { id: 2, title: "Waiting", count: counts.waiting, icon: "ti-timer" },
        { id: 3, title: "Completed", count: counts.completed, icon: "ti-check-box" },
        { id: 4, title: "Cancelled", count: counts.canceled, icon: "ti-time" },
    ]

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat) => (
                <div
                    key={stat.id}
                    className="relative overflow-hidden rounded-xl bg-(--bg-color) border border-neutral-200 dark:border-neutral-800 p-5"
                    style={{ borderLeftWidth: 3, borderLeftColor: "var(--second-color)" }}
                >
                    <i className={`ti ${stat.icon} absolute top-3 right-4 text-2xl opacity-20 text-(--second-color)`} />
                    <p className="text-[11px] uppercase tracking-wide text-(--text-color) mb-2">{stat.title}</p>
                    <p className="text-3xl font-medium leading-none text-(--second-color)">{stat.count}</p>
                </div>
            ))}
        </div>
    )
}

export default StatusCards