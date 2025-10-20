export default function Home() {
  const checklistItems = [
    { id: 1, office: "Server Room", checked: "No", issuesFound: "None", checkedBy: "Ibrahim Msambwe", checkedAt: "-" },
    { id: 2, office: "Documentation", checked: "No", issuesFound: "None", checkedBy: "Ibrahim Msambwe", checkedAt: "-" },
    { id: 3, office: "Transport", checked: "No", issuesFound: "None", checkedBy: "Ibrahim Msambwe", checkedAt: "-" },
    { id: 4, office: "Finance", checked: "No", issuesFound: "None", checkedBy: "Ibrahim Msambwe", checkedAt: "-" },
    { id: 6, office: "HR", checked: "No", issuesFound: "None", checkedBy: "Ibrahim Msambwe", checkedAt: "-" },
    { id: 7, office: "BoardRoom", checked: "No", issuesFound: "None", checkedBy: "Ibrahim Msambwe", checkedAt: "-" },
    { id: 8, office: "QAC", checked: "No", issuesFound: "None", checkedBy: "Ibrahim Msambwe", checkedAt: "-" },
  ];

  const activityLog = [
    // { 
    //   id: 1, 
    //   office: "Finance Department", 
    //   affectedPerson: "John Kamau", 
    //   activity: "Fixed printer connection issue", 
    //   issue: "Printer not responding",
    //   technician: "Ibrahim Msambwe" 
    // },
    // { 
    //   id: 2, 
    //   office: "HR Department", 
    //   affectedPerson: "Mary Njeri", 
    //   activity: "Updated system software", 
    //   issue: "Outdated software version",
    //   technician: "Ibrahim Msambwe" 
    // },
    // { 
    //   id: 3, 
    //   office: "Operations", 
    //   affectedPerson: "Peter Ochieng", 
    //   activity: "Resolved network connectivity problem", 
    //   issue: "Network cable unplugged",
    //   technician: "Ibrahim Msambwe" 
    // },
    // { 
    //   id: 4, 
    //   office: "Depot Manager Office", 
    //   affectedPerson: "James Kimani", 
    //   activity: "Depot manager system running slow - cleared cache", 
    //   issue: "System running slow",
    //   technician: "Ibrahim Msambwe" 
    // },
  ];

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold text-center mb-6">HESU IT Department Daily Checklist</h1>
      
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Daily Checklist Table */}
        <div>
          <div className="overflow-x-auto border border-gray-300">
            <table className="w-full border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-blue-600 text-white text-center">
                  <th colSpan="7" className="px-3 py-2 text-sm font-bold border border-gray-300">
                    DAILY CHECKLIST
                  </th>
                </tr>
                <tr className="bg-gray-200 text-black">
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">SN</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">OFFICE</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">CHECKED</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">ISSUES FOUND</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">CHECKED BY</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">CHECKED AT</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {checklistItems.map((office, index) => (
                  <tr 
                    key={office.id} 
                    className="bg-white text-xs"
                  >
                    <td className="px-3 py-2 border border-gray-300">{office.id}</td>
                    <td className="px-3 py-2 border border-gray-300">{office.office}</td>
                    <td className="px-3 py-2 border border-gray-300">{office.checked}</td>
                    <td className="px-3 py-2 border border-gray-300">{office.issuesFound}</td>
                    <td className="px-3 py-2 border border-gray-300">{office.checkedBy}</td>
                    <td className="px-3 py-2 border border-gray-300">{office.checkedAt}</td>
                    <td className="px-3 py-2 border border-gray-300">
                      <a href={`/office-details/${office.id}`} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-xs font-semibold">View</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log Table */}
        <div>
          <div className="flex justify-end mb-3">
            <a 
              href="/reports"
              className="bg-blue-600 text-white px-4 py-2 text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
            >
              Reports
            </a>
          </div>
          <div className="overflow-x-auto border border-gray-300">
            <table className="w-full border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-green-600 text-white text-center">
                  <th colSpan="5" className="px-3 py-2 text-sm font-bold border border-gray-300">
                    ACTIVITY LOG
                  </th>
                </tr>
                <tr className="bg-gray-200 text-black">
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">OFFICE</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">AFFECTED PERSON</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">ISSUE</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">ACTIVITY</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">IT TECHNICIAN</th>
                </tr>
              </thead>
              <tbody>
                {activityLog.map((log, index) => (
                  <tr 
                    key={log.id} 
                    className="bg-white text-xs"
                  >
                    <td className="px-3 py-2 border border-gray-300">{log.office}</td>
                    <td className="px-3 py-2 border border-gray-300">{log.affectedPerson}</td>
                    <td className="px-3 py-2 border border-gray-300">{log.issue}</td>
                    <td className="px-3 py-2 border border-gray-300">{log.activity}</td>
                    <td className="px-3 py-2 border border-gray-300">{log.technician}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
