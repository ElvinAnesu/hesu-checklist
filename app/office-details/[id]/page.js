"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/supabase";

export default function OfficeDetailsPage() {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ item: "", status: "", remarks: "" });
  const [officeChecklist, setOfficeChecklist] = useState([]);
  const [loading, setLoading] = useState(false);
  // Activity modal state
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [activityForm, setActivityForm] = useState({ checkedBy: "", issuesFound: "" });
  const [activityLoading, setActivityLoading] = useState(false);

  // Fetch checklist records for today and for this office
  async function getOfficeChecklist() {
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
    const { data, error } = await supabase
      .from("office-checklist")
      .select("*")
      .eq("office", id)
      .gte("created_at", `${dateStr}T00:00:00Z`);
    if (!error) {
      setOfficeChecklist(data || []);
    } else {
      setOfficeChecklist([]);
    }
  }

  useEffect(() => {
    if (id) getOfficeChecklist();
    // eslint-disable-next-line
  }, [id]);

  const openRecordModal = () => {
    setForm({ item: "", status: "", remarks: "" });
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Checklist record submission
  async function recordItem(e) {
    e.preventDefault();
    setLoading(true);
    const result = await supabase.from("office-checklist").insert([
      {
        ...form,
        office: id,
      },
    ]);
    setLoading(false);
    if (!result.error) {
      closeModal();
      getOfficeChecklist();
    } else {
      alert(result.error.message);
      alert("Failed to record item.");
    }
  }

  // Activity logic
  const openActivityModal = () => {
    setActivityForm({ checkedBy: "", issuesFound: "" });
    setShowActivityModal(true);
  };
  const closeActivityModal = () => { setShowActivityModal(false); };
  const handleActivityChange = (e) => {
    const { name, value } = e.target;
    setActivityForm((prev) => ({ ...prev, [name]: value }));
  };

  async function submitActivity(e) {
    e.preventDefault();
    setActivityLoading(true);
    const { checkedBy, issuesFound } = activityForm;
    const result = await supabase.from("activity-logs").insert([
      {
        office: id,
        checkedby: checkedBy,
        issues_found: Number(issuesFound),
      },
    ]);
    setActivityLoading(false);
    if (!result.error) {
      closeActivityModal();
    } else {
      alert(result.error.message);
      alert("Failed to submit activity.");
    }
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Office details</h1>
      <div className="max-w-4xl mx-auto">
        <div className="overflow-x-auto border border-gray-300 bg-white rounded-lg">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-center">
                <th colSpan="5" className="px-3 py-2 text-sm font-bold border border-gray-300">
                  OFFICE CHECKLIST
                </th>
              </tr>
              <tr className="bg-gray-200 text-black">
                <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">Item</th>
                <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300" colSpan={2}>Remarks</th>
                <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">Status</th>
              </tr>
            </thead>
            <tbody>
              {officeChecklist.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 px-3 py-5">No records found for today.</td>
                </tr>
              ) : (
                officeChecklist.map(row => (
                  <tr key={row.id} className="bg-white text-xs">
                    <td className="px-3 py-2 border border-gray-300">{row.item}</td>
                    <td className="px-3 py-2 border border-gray-300" colSpan={2}>{row.remarks}</td>
                    <td className="px-3 py-2 border border-gray-300">{row.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded font-semibold hover:bg-blue-700 transition-colors"
            onClick={openRecordModal}
          >
            Record
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded font-semibold hover:bg-green-700 transition-colors"
            onClick={openActivityModal}
          >
            Submit Activity
          </button>
        </div>
      </div>

      {/* Record checklist modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-600 text-lg font-bold"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Record Checklist</h2>
            <form onSubmit={recordItem} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Item</label>
                <input
                  type="text"
                  name="item"
                  value={form.item}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Status</label>
                <select
                  name="status"
                  value={form.status}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="Good">Good</option>
                  <option value="Faulty">Faulty</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Remarks</label>
                <textarea
                  name="remarks"
                  value={form.remarks}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Submit activity modal */}
      {showActivityModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg relative">
            <button
              className="absolute top-2 right-3 text-gray-600 text-lg font-bold"
              onClick={closeActivityModal}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4">Submit Activity</h2>
            <form onSubmit={submitActivity} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Checked By</label>
                <input
                  type="text"
                  name="checkedBy"
                  value={activityForm.checkedBy}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  onChange={handleActivityChange}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Issues Found</label>
                <input
                  type="number"
                  name="issuesFound"
                  value={activityForm.issuesFound}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  onChange={handleActivityChange}
                  required
                />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700" disabled={activityLoading}>
                {activityLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
