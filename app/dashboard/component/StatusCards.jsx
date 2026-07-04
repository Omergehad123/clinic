"use client"

const stats = [
    { id: 1, title: "Total patients", count: "1,000", sub: "All time", icon: "ti-users", accent: "blue" },
    { id: 2, title: "Today's appointments", count: "25", sub: "Scheduled", icon: "ti-calendar-event", accent: "teal" },
    { id: 3, title: "New patients", count: "50", sub: "This month", icon: "ti-user-plus", accent: "amber" },
    { id: 4, title: "Waiting today", count: "5", sub: "In queue now", icon: "ti-clock", accent: "coral" },
]

function StatusCards() {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stats.map((stat) => {

                return (
                    <div
                        key={stat.id}
                        className="relative overflow-hidden rounded-xl bg-(--bg-color) border border-neutral-200 dark:border-neutral-800 p-5"
                        style={{ borderLeftWidth: 3, borderLeftColor: "var(--second-color)" }}
                    >
                        <i
                            className={`ti ${stat.icon} absolute top-3 right-4 text-2xl opacity-20 text-(--second-color)`}
                            aria-hidden="true"
                        />
                        <p className="text-[11px] uppercase tracking-wide text-(--text-color) mb-2">
                            {stat.title}
                        </p>
                        <p className="text-3xl font-medium leading-none text-(--second-color)">
                            {stat.count}
                        </p>
                        <p className="text-[11px] text-(--p-color) mt-2">{stat.sub}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default StatusCards