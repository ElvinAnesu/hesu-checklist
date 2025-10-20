"use client"
import React, { useState } from "react";

export default function OfficeDetailsPage() {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form, setForm] = useState({
    item: "",
    checked: "",
    status: "",
    checkedBy: "",
    remarks: "",
  });

  const officeChecklist = [
    {
      id: 1,
      item: "Printer",
      checked: "Yes",
      status: "Operational",
      checkedBy: "Ibrahim Msambwe",
      remarks: "No issues",
    },
    {
      id: 2,
      item: "Router",
      checked: "No",
      status: "Needs Attention",
      checkedBy: "Ibrahim Msambwe",
      remarks: "Router not powering on",
    },
    {
      id: 3,
      item: "Air Conditioner",
      checked: "Yes",
      status: "Operational",
      checkedBy: "Ibrahim Msambwe",
      remarks: "Routine maintenance done",
    },
  ];

  const handleCheck = (row) => {
    setForm({
      item: row.item,
      checked: row.checked,
      status: row.status,
      checkedBy: row.checkedBy,
      remarks: row.remarks,
    });
    setSelectedItem(row);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement submission logic or update checklist here later.
    closeModal();
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Office details</h1>
      <div className="max-w-4xl mx-auto">
        <div className="overflow-x-auto border border-gray-300 bg-white rounded-lg">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-blue-600 text-white text-center">
                <th colSpan="6" className="px-3 py-2 text-sm font-bold border border-gray-300">
                  OFFICE CHECKLIST
                </th>
              </tr>
              <tr className="bg-gray-200 text-black">
                <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">Item</th>
                <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">Checked</th>
                <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">Status</th>
                <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">Checked By</th>
                <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">Remarks</th>
                <th className="px-3 py-2 text-xs text-left font-semibold border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {officeChecklist.map(row => (
                <tr key={row.id} className="bg-white text-xs">
                  <td className="px-3 py-2 border border-gray-300">{row.item}</td>
                  <td className="px-3 py-2 border border-gray-300">{row.checked}</td>
                  <td className="px-3 py-2 border border-gray-300">{row.status}</td>
                  <td className="px-3 py-2 border border-gray-300">{row.checkedBy}</td>
                  <td className="px-3 py-2 border border-gray-300">{row.remarks}</td>
                  <td className="px-3 py-2 border border-gray-300">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors text-xs font-semibold"
                      onClick={() => handleCheck(row)}
                    >
                      Check
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
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
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Item</label>
                <input
                  type="text"
                  name="item"
                  value={form.item}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  onChange={handleChange}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Checked</label>
                <select
                  name="checked"
                  value={form.checked}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Status</label>
                <input
                  type="text"
                  name="status"
                  value={form.status}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1">Checked By</label>
                <input
                  type="text"
                  name="checkedBy"
                  value={form.checkedBy}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                  onChange={handleChange}
                />
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
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
