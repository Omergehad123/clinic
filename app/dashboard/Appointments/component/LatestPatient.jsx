import React from 'react'

const patients = [
    {
        id: "001",
        name: "John Doe",
        doctor: "Dr. Smith",
        sex: "Male",
        phone: "555-1234"
    },
    {
        id: "002",
        name: "Jane Smith",
        doctor: "Dr. Lee",
        sex: "Female",
        phone: "555-5678"
    },
    {
        id: "003",
        name: "Emily Johnson",
        doctor: "Dr. Kim",
        sex: "Female",
        phone: "555-8765"
    },
    {
        id: "004",
        name: "Michael Brown",
        doctor: "Dr. Clark",
        sex: "Male",
        phone: "555-4321"
    }
];

function LatestPatient() {
    return (
        <div className="bg-(--main-color) rounded-xl overflow-hidden p-5 grow">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <h1 className="text-xl font-semibold text-(--text-color)">Patients</h1>
                <button className="px-4 py-1 bg-(--second-color) rounded text-xs font-medium text-(--text-color) hover:bg-(--second-color)/90 transition-colors">
                    View All
                </button>
            </div>

            {/* Responsive Table - hidden on small screens */}
            <div className="hidden xs:block w-full">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-(--bg-color) border-b border-(--text-color)/10 ">
                            <th className="text-left px-3 py-2 text-[11px] uppercase tracking-wider text-(--p-color) font-medium">Patient ID</th>
                            <th className="text-left px-3 py-2 text-[11px] uppercase tracking-wider text-(--p-color) font-medium">Name</th>
                            <th className="text-left px-3 py-2 text-[11px] uppercase tracking-wider text-(--p-color) font-medium">Doctor</th>
                            <th className="text-left px-3 py-2 text-[11px] uppercase tracking-wider text-(--p-color) font-medium">Sex</th>
                            <th className="text-left px-3 py-2 text-[11px] uppercase tracking-wider text-(--p-color) font-medium">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id} className="border-b border-(--text-color)/5 last:border-0 hover:bg-(--bg-color) transition-colors">
                                <td className="px-3 py-2">PT{patient.id}</td>
                                <td className="px-3 py-2 font-medium text-(--text-color)">{patient.name}</td>
                                <td className="px-3 py-2 text-(--text-color)">{patient.doctor}</td>
                                <td className="px-3 py-2 text-(--text-color)">{patient.sex}</td>
                                <td className="px-3 py-2 text-(--text-color)">{patient.phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Responsive Cards - only on small screens */}
            <div className="block xs:hidden w-full">
                <ul className="flex flex-col gap-3 w-full">
                    {patients.map((patient) => (
                        <li
                            key={patient.id}
                            className="p-3 rounded-md bg-(--bg-color) border border-(--text-color)/10 flex flex-col gap-1 shadow-sm"
                        >
                            <span className="font-semibold text-sm text-(--text-color)">
                                {patient.name}
                                <span className="ml-2 text-xs text-(--p-color) font-normal">PT{patient.id}</span>
                            </span>
                            <div className="flex flex-wrap text-xs gap-x-4 gap-y-1 text-(--text-color)">
                                <span><span className="text-(--p-color)">Doctor:</span> {patient.doctor}</span>
                                <span><span className="text-(--p-color)">Sex:</span> {patient.sex}</span>
                                <span><span className="text-(--p-color)">Phone:</span> {patient.phone}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default LatestPatient