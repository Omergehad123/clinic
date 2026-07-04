"use client"
import { useRef, useEffect } from 'react'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const chartColors = ['#0BaF10', '#2563eb', '#ff0000', "#777"];

function QueueStates({ appointments }) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const waiting = appointments.filter(a => a.status === "waiting").length
    const completed = appointments.filter(a => a.status === "completed").length
    const canceled = appointments.filter(a => a.status === "canceled").length
    const notShown = appointments.filter(a => a.status === "not-shown").length

    const chartLabels = [
        { label: 'Waiting', color: chartColors[0], value: waiting },
        { label: 'Completed', color: chartColors[1], value: completed },
        { label: 'Canceled', color: chartColors[2], value: canceled },
        { label: 'not shown', color: chartColors[3], value: notShown },
    ]

    useEffect(() => {
        if (chartInstance.current) chartInstance.current.destroy();

        const ctx = chartRef.current.getContext('2d');
        chartInstance.current = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: chartLabels.map(i => i.label),
                datasets: [{
                    data: chartLabels.map(i => i.value),
                    backgroundColor: chartColors,
                    borderWidth: 1,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false }, tooltip: { enabled: true } },
                cutout: '67%',
            },
        });

        return () => { if (chartInstance.current) chartInstance.current.destroy(); };
    }, [waiting, completed, canceled, notShown]);

    return (
        <div
            className='bg-(--main-color) p-4 sm:p-6 rounded-lg w-full max-w-[500px] flex flex-col'
            style={{ minHeight: 320, height: '100%', boxSizing: "border-box" }}
        >
            <div className='flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 mb-4'>
                <h1 className='text-lg sm:text-xl font-semibold text-(--text-color)'>Queue States</h1>
                <select className="w-fit px-2 py-1 border border-gray-300 rounded text-xs bg-(--bg-color) text-(--text-color) focus:outline-none">
                    <option value="today">This Day</option>
                    <option value="last-week">Last Week</option>
                    <option value="last-month">Last Month</option>
                </select>
            </div>
            <div className='flex flex-col md:flex-row flex-1 items-center justify-center gap-6 sm:gap-8 w-full'>
                <div className='w-full max-w-[220px] sm:max-w-[260px] aspect-square flex items-center justify-center mx-auto'>
                    <canvas ref={chartRef} style={{ width: '100%', height: '100%' }}></canvas>
                </div>
                <div className="flex flex-row md:flex-col flex-wrap md:flex-nowrap justify-center gap-4 w-full md:w-auto">
                    {chartLabels.map((item) => (
                        <div key={item.label} className="flex items-center gap-3 min-w-[110px]">
                            <span
                                style={{
                                    background: item.color,
                                    width: 18,
                                    height: 18,
                                    borderRadius: 5,
                                    display: 'inline-block'
                                }}
                            />
                            <span className="font-medium text-(--text-color) text-sm">{item.label}</span>
                            <span className="text-(--p-color) text-xs sm:text-sm">({item.value})</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default QueueStates