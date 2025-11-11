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
    const statusMap = {};
    for (let office of officeList) {
      const { data, error } = await supabase
        .from("activity-logs")
        .select("*")
        .eq("office", office.id);
      statusMap[office.id] = (data && data.length > 0) ? data : "No";
    }
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


  const formatLastCheckedAt = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
  
    // Get current date at midnight
    const now = new Date();
    now.setHours(0,0,0,0);
  
    // Date at midnight (for correct diff)
    const target = new Date(date);
    target.setHours(0,0,0,0);
  
    const diffMs = now - target;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
  
    // Extract hour (as 2 digits) and minute
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    const timePart = `${hour}.${minute}`;
  
    if (diffDays === 0) {
      return `today ${timePart}`;
    }
    if (diffDays === 1) {
      return `yesterday ${timePart}`;
    }
    if (diffDays <= 3) {
      return `${Math.floor(diffDays)} days ago ${timePart}`;
    }
    // Else format as YYYY-MM-DD HH.mm
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${timePart}`;
  }


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
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">ISSUES FOUND</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">CHECKED BY</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">LAST CHECKED AT</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                { offices.map((office, index) => (
                  <tr key={office.id} className="bg-white text-xs">
                    <td className="px-3 py-2 border border-gray-300">{index + 1}</td>
                    <td className="px-3 py-2 border border-gray-300">{office.office}</td>
                    <td className="px-3 py-2 border border-gray-300">{office?.issues_found}</td>
                    <td className="px-3 py-2 border border-gray-300">{office.last_checked_by}</td>
                    <td className="px-3 py-2 border border-gray-300">{formatLastCheckedAt(office?.last_checked_at)}</td>
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
                    <td className="px-3 py-2 border border-gray-300"></td>
                    <td className="px-3 py-2 border border-gray-300"></td>
                    <td className="px-3 py-2 border border-gray-300"></td>
                    <td className="px-3 py-2 border border-gray-300"></td>
                    <td className="px-3 py-2 border border-gray-300"></td>
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
