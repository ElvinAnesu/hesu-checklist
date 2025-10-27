"use client";
import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Home() {
  const [offices, setOffices] = useState([]);
  const [checklistStatus, setChecklistStatus] = useState([]);

  // Fetch offices from Supabase
  const getOffices = async () => { 
    const { data, error } = await supabase.from("offices").select("*").order("id");
    if (!error) {
      setOffices(data || []);
    }
  };

  // Fetch checklist status for each office from activity-logs
  const fetchChecklistFields = async (officeList) => {
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
    let statusMap = {};
    // Run all queries in parallel for performance
    await Promise.all(
      officeList.map(async (office) => {
        const { data, error } = await supabase
          .from("activity-logs")
          .select("*")
          .eq("office", office.id);
          //.gte("created_at", `${dateStr}T00:00:00Z`);
          
        statusMap[office.id] = (data && data.length > 0) ? data : "No";
      })
    );
   // alert(JSON.stringify(statusMap));
    setChecklistStatus(statusMap);
  };

  useEffect(() => {
    getOffices();
  }, []);

  useEffect(() => {
    if (offices.length > 0) {
      fetchChecklistFields(offices);
    }
    // eslint-disable-next-line
  }, [offices]);

  const defaultIssues = "None";
  const defaultCheckedBy = "-";
  const defaultCheckedAt = "-";

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
                { offices.map((office, index) => (
                  <tr key={office.id} className="bg-white text-xs">
                    <td className="px-3 py-2 border border-gray-300">{index + 1}</td>
                    <td className="px-3 py-2 border border-gray-300">{office.office}</td>
                    <td className="px-3 py-2 border border-gray-300">{checklistStatus?.[office?.id]?.[index]?.id? "YES" : "No" }</td>
                    <td className="px-3 py-2 border border-gray-300">{checklistStatus?.[office?.id]?.[index]?.issues_found || "-" }</td>
                    <td className="px-3 py-2 border border-gray-300">{checklistStatus?.[office?.id]?.[index]?.checkedby || "-" }</td>
                    <td className="px-3 py-2 border border-gray-300">{checklistStatus?.[office?.id]?.[index]?.created_at || "-"}</td>
                    <td className="px-3 py-2 border border-gray-300">
                      <a href={`/office-details/${office?.id}`} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors text-xs font-semibold">View</a>
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
                {/* activityLog.map((log, index) => ( */}
                  <tr 
                    key={1} 
                    className="bg-white text-xs"
                  >
                    <td className="px-3 py-2 border border-gray-300">Finance Department</td>
                    <td className="px-3 py-2 border border-gray-300">John Kamau</td>
                    <td className="px-3 py-2 border border-gray-300">Printer not responding</td>
                    <td className="px-3 py-2 border border-gray-300">Fixed printer connection issue</td>
                    <td className="px-3 py-2 border border-gray-300">Ibrahim Msambwe</td>
                  </tr>
                  <tr 
                    key={2} 
                    className="bg-white text-xs"
                  >
                    <td className="px-3 py-2 border border-gray-300">HR Department</td>
                    <td className="px-3 py-2 border border-gray-300">Mary Njeri</td>
                    <td className="px-3 py-2 border border-gray-300">Outdated software version</td>
                    <td className="px-3 py-2 border border-gray-300">Updated system software</td>
                    <td className="px-3 py-2 border border-gray-300">Ibrahim Msambwe</td>
                  </tr>
                  <tr 
                    key={3} 
                    className="bg-white text-xs"
                  >
                    <td className="px-3 py-2 border border-gray-300">Operations</td>
                    <td className="px-3 py-2 border border-gray-300">Peter Ochieng</td>
                    <td className="px-3 py-2 border border-gray-300">Network cable unplugged</td>
                    <td className="px-3 py-2 border border-gray-300">Resolved network connectivity problem</td>
                    <td className="px-3 py-2 border border-gray-300">Ibrahim Msambwe</td>
                  </tr>
                  <tr 
                    key={4} 
                    className="bg-white text-xs"
                  >
                    <td className="px-3 py-2 border border-gray-300">Depot Manager Office</td>
                    <td className="px-3 py-2 border border-gray-300">James Kimani</td>
                    <td className="px-3 py-2 border border-gray-300">System running slow</td>
                    <td className="px-3 py-2 border border-gray-300">Depot manager system running slow - cleared cache</td>
                    <td className="px-3 py-2 border border-gray-300">Ibrahim Msambwe</td>
                  </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
