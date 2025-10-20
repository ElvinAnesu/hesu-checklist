'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Reports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('all');

  // Mock data - in a real app, this would come from a database
  const allActivities = [
    { 
      id: 1, 
      date: "2024-10-10",
      office: "Finance Department", 
      affectedPerson: "John Kamau", 
      activity: "Fixed printer connection issue", 
      issue: "Printer not responding",
      technician: "Ibrahim Msambwe" 
    },
    { 
      id: 2, 
      date: "2024-10-10",
      office: "HR Department", 
      affectedPerson: "Mary Njeri", 
      activity: "Updated system software", 
      issue: "Outdated software version",
      technician: "Ibrahim Msambwe" 
    },
    { 
      id: 3, 
      date: "2024-10-09",
      office: "Operations", 
      affectedPerson: "Peter Ochieng", 
      activity: "Resolved network connectivity problem", 
      issue: "Network cable unplugged",
      technician: "Ibrahim Msambwe" 
    },
    { 
      id: 4, 
      date: "2024-10-09",
      office: "Depot Manager Office", 
      affectedPerson: "James Kimani", 
      activity: "Depot manager system running slow - cleared cache", 
      issue: "System running slow",
      technician: "Ibrahim Msambwe" 
    },
    { 
      id: 5, 
      date: "2024-10-08",
      office: "Sales Department", 
      affectedPerson: "Grace Muthoni", 
      activity: "Installed new software", 
      issue: "Missing required application",
      technician: "Sarah Wanjiku" 
    },
    { 
      id: 6, 
      date: "2024-10-08",
      office: "Accounts", 
      affectedPerson: "Daniel Omondi", 
      activity: "Fixed email configuration", 
      issue: "Email not syncing",
      technician: "Sarah Wanjiku" 
    },
  ];

  // Get unique technician names
  const technicians = ['all', ...new Set(allActivities.map(activity => activity.technician))];

  // Filter activities based on date range and technician
  const filteredActivities = allActivities.filter(activity => {
    const activityDate = new Date(activity.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const isInDateRange = (!start || activityDate >= start) && (!end || activityDate <= end);
    const isTechnicianMatch = selectedTechnician === 'all' || activity.technician === selectedTechnician;

    return isInDateRange && isTechnicianMatch;
  });

  const handleGenerateReport = () => {
    // In a real application, this would fetch data from the server
    console.log('Generating report with filters:', { startDate, endDate, selectedTechnician });
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Activity Reports</h1>
          <Link 
            href="/"
            className="bg-gray-600 text-white px-4 py-2 text-sm font-semibold rounded hover:bg-gray-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Filter Reports</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Technician */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                IT Technician
              </label>
              <select
                value={selectedTechnician}
                onChange={(e) => setSelectedTechnician(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all" className="text-gray-900">All Technicians</option>
                {technicians.slice(1).map((tech) => (
                  <option key={tech} value={tech} className="text-gray-900">
                    {tech}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerateReport}
            className="bg-blue-600 text-white px-6 py-2 text-sm font-semibold rounded hover:bg-blue-700 transition-colors"
          >
            Generate Report
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Report Results ({filteredActivities.length} {filteredActivities.length === 1 ? 'record' : 'records'})
            </h2>
            <button
              onClick={() => window.print()}
              className="bg-green-600 text-white px-4 py-2 text-sm font-semibold rounded hover:bg-green-700 transition-colors"
            >
              Print Report
            </button>
          </div>

          {/* Report Table */}
          <div className="overflow-x-auto border border-gray-300">
            <table className="w-full border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-blue-600 text-white text-center">
                  <th colSpan="6" className="px-3 py-2 text-sm font-bold border border-gray-300">
                    ACTIVITY REPORT
                  </th>
                </tr>
                <tr className="bg-gray-200 text-black">
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">DATE</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">OFFICE</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">AFFECTED PERSON</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">ISSUE</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">ACTIVITY</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">IT TECHNICIAN</th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((log) => (
                    <tr 
                      key={log.id} 
                      className="bg-white text-xs"
                    >
                      <td className="px-3 py-2 border border-gray-300">{log.date}</td>
                      <td className="px-3 py-2 border border-gray-300">{log.office}</td>
                      <td className="px-3 py-2 border border-gray-300">{log.affectedPerson}</td>
                      <td className="px-3 py-2 border border-gray-300">{log.issue}</td>
                      <td className="px-3 py-2 border border-gray-300">{log.activity}</td>
                      <td className="px-3 py-2 border border-gray-300">{log.technician}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-3 py-8 text-center text-gray-500 border border-gray-300">
                      No records found. Please adjust your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

