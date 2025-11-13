'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { supabase } from '@/supabase';


export default function Reports() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedOfficeName, setSelectedOfficeName] = useState('');
  const [offices, setOffices] = useState([]);
  const [results, setResults] = useState([]);
  const [filtering, setFiltering] = useState(false);
  // Fetch offices once
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('offices').select('id, office');
      if (!error) setOffices(data || []);
    })();
  }, []);
  // Handler for search/select
  const handleGenerateReport = async () => {
    setFiltering(true);
    let query = supabase.from('office-checklist').select('*');
    const selectedOfficeObj = offices.find(o => o.office === selectedOfficeName);
    const officeIdToQuery = selectedOfficeObj ? selectedOfficeObj.id : null;
    if (officeIdToQuery) query = query.eq('office', officeIdToQuery);
    if (startDate) query = query.gte('created_at', `${startDate}T00:00:00Z`);
    if (endDate) query = query.lte('created_at', `${endDate}T23:59:59Z`);
    const { data, error } = await query.order('created_at', { ascending: false });
    setResults((!error && data) ? data : []);
    setFiltering(false);
  };
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Reports</h1>
          <Link href="/" className="bg-gray-600 text-white px-4 py-2 text-sm font-semibold rounded hover:bg-gray-700 transition-colors">
            Back to Home
          </Link>
        </div>
        {/* Filter Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-300">
          <h2 className="text-lg font-semibold mb-4">Filter Reports</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {/* Office dropdown - searchable */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">Office</label>
              <input list="offices-list" value={selectedOfficeName} onChange={e => setSelectedOfficeName(e.target.value)} placeholder="Type or select office" className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <datalist id="offices-list">
                {offices.map(o => <option value={o.office} key={o.id}>{o.office}</option>)}
              </datalist>
            </div>
          </div>
          <button onClick={handleGenerateReport} className="bg-blue-600 text-white px-6 py-2 text-sm font-semibold rounded hover:bg-blue-700 transition-colors" disabled={filtering}>
            {filtering ? "Loading..." : "Generate Report"}
          </button>
        </div>
        {/* Results Section */}
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Report Results ({results.length} {results.length === 1 ? 'record' : 'records'})</h2>
            <button onClick={() => window.print()} className="bg-green-600 text-white px-4 py-2 text-sm font-semibold rounded hover:bg-green-700 transition-colors">Print Report</button>
          </div>
          {/* Report Table */}
          <div className="overflow-x-auto border border-gray-300">
            <table className="w-full border-collapse bg-white text-sm">
              <thead>
                <tr className="bg-blue-600 text-white text-center">
                  <th colSpan="5" className="px-3 py-2 text-sm font-bold border border-gray-300">OFFICE CHECKLIST HISTORY</th>
                </tr>
                <tr className="bg-gray-200 text-black">
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">Item</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300" colSpan={2}>Remarks</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">Status</th>
                  <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">Date</th>
                </tr>
              </thead>
              <tbody>
                {results.length > 0 ? (
                  results.map(row => (
                    <tr key={row.id} className="bg-white text-xs">
                      <td className="px-3 py-2 border border-gray-300">{row.item}</td>
                      <td className="px-3 py-2 border border-gray-300" colSpan={2}>{row.remarks}</td>
                      <td className="px-3 py-2 border border-gray-300">{row.status}</td>
                      <td className="px-3 py-2 border border-gray-300">{row.created_at?.slice(0,16).replace('T',' ')}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-500 px-3 py-5">No records found.</td>
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

