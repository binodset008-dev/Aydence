"use client";

import React, { useState, useEffect, useCallback } from "react";

interface BookingRecord {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string | null;
  bookingDate: string;
  timeSlot: string;
  status: string;
  notes: string | null;
  calendarEventId: string | null;
  createdAt: string;
  course: { name: string; slug: string };
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [actionLoading, setActionLoading] = useState("");

  // Check for stored session
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    if (stored) setToken(stored);
  }, []);

  const login = () => {
    if (!password) return;
    localStorage.setItem("admin_token", password);
    setToken(password);
    setError("");
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken("");
    setBookings([]);
  };

  const fetchBookings = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (filterCourse) params.set("course", filterCourse);
      if (filterStatus) params.set("status", filterStatus);
      const res = await fetch(`/api/admin/bookings?${params}`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401) { setError("Invalid password."); logout(); return; }
      const data = await res.json();
      setBookings(data.bookings || []);
    } catch { setError("Failed to load bookings."); }
    setLoading(false);
  }, [token, filterCourse, filterStatus]);

  useEffect(() => { if (token) fetchBookings(); }, [token, fetchBookings]);

  const cancelBooking = async (bookingId: string) => {
    if (!confirm(`Cancel booking ${bookingId}?`)) return;
    setActionLoading(bookingId);
    try {
      await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ bookingId, status: "cancelled" }),
      });
      fetchBookings();
    } catch { alert("Failed to cancel."); }
    setActionLoading("");
  };

  const deleteBooking = async (bookingId: string) => {
    if (!confirm(`PERMANENTLY delete booking ${bookingId}? This cannot be undone.`)) return;
    setActionLoading(bookingId);
    try {
      await fetch(`/api/admin/bookings?bookingId=${bookingId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBookings();
    } catch { alert("Failed to delete."); }
    setActionLoading("");
  };

  const exportCSV = async () => {
    const res = await fetch("/api/admin/export", { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) return alert("Export failed.");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Login Screen
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 font-sans">
        <div className="w-full max-w-sm bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Admin Dashboard</h1>
          <p className="text-sm text-gray-500 mb-6">Enter password to access bookings</p>
          {error && <div className="bg-red-50 text-red-600 px-3 py-2 rounded-lg text-sm mb-4">{error}</div>}
          <input
            type="password" placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full border border-gray-200 rounded-lg px-3 py-3 text-sm mb-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
          <button onClick={login} className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-sm">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  // Dashboard
  const statusColors: Record<string, string> = {
    confirmed: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Aydence Bookings</h1>
          <p className="text-xs text-gray-500">{bookings.length} total bookings</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Export CSV
          </button>
          <button onClick={logout} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 flex gap-3 flex-wrap">
        <select value={filterCourse} onChange={(e) => setFilterCourse(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
          <option value="">All Courses</option>
          <option value="a1-new">A1 New Batch</option>
          <option value="a1-rep">A1 Repetition</option>
        </select>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white">
          <option value="">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <button onClick={fetchBookings} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          Refresh
        </button>
      </div>

      {/* Table */}
      <div className="px-6 pb-6">
        {loading ? (
          <div className="text-center py-12 text-gray-400">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12 text-gray-400">No bookings found.</div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="px-4 py-3">Booking ID</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.bookingId} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-mono text-xs font-medium">{b.bookingId}</td>
                    <td className="px-4 py-3">{b.course.name}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{b.customerName}</div>
                      <div className="text-gray-500 text-xs">{b.customerEmail}</div>
                      {b.customerPhone && <div className="text-gray-400 text-xs">{b.customerPhone}</div>}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{b.bookingDate}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{b.timeSlot} IST</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[b.status] || "bg-gray-100 text-gray-600"}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {b.status !== "cancelled" && (
                          <button onClick={() => cancelBooking(b.bookingId)} disabled={actionLoading === b.bookingId}
                            className="text-yellow-600 hover:text-yellow-700 text-xs font-medium disabled:opacity-50">
                            Cancel
                          </button>
                        )}
                        <button onClick={() => deleteBooking(b.bookingId)} disabled={actionLoading === b.bookingId}
                          className="text-red-500 hover:text-red-600 text-xs font-medium disabled:opacity-50 ml-2">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
