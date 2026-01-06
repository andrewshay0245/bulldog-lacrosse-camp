'use client';

import { useState, useEffect } from 'react';

interface Registration {
  id: string;
  date: string;
  camp: string;
  campName: string;
  amount: string;
  camperName: string;
  camperEmail: string;
  position: string;
  graduationYear: string;
  school: string;
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  status: string;
}

const campOptions = [
  { id: '', label: 'All Camps' },
  { id: 'summer', label: 'Summer Camp' },
  { id: 'bulldog-120', label: 'Bulldog 120' },
  { id: 'experience', label: 'Bulldog Experience' },
  { id: 'clash', label: 'Bulldog Clash' },
  { id: 'test', label: 'Test' },
];

export default function AdminDashboard() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [campFilter, setCampFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [emailStats, setEmailStats] = useState({ today: 0, thisMonth: 0, total: 0 });

  // Email composer state
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [sending, setSending] = useState(false);
  const [emailResult, setEmailResult] = useState<{ sent: number; failed: number } | null>(null);

  useEffect(() => {
    fetchRegistrations();
    fetchEmailStats();
  }, [campFilter]);

  const fetchEmailStats = async () => {
    try {
      const res = await fetch('/api/admin/email-stats');
      const data = await res.json();
      setEmailStats(data);
    } catch (error) {
      console.error('Error fetching email stats:', error);
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const params = campFilter ? `?camp=${campFilter}` : '';
      const res = await fetch(`/api/admin/registrations${params}`);
      const data = await res.json();
      setRegistrations(data.registrations || []);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRegistrations = registrations.filter((r) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      r.camperName.toLowerCase().includes(search) ||
      r.parentName.toLowerCase().includes(search) ||
      r.parentEmail.toLowerCase().includes(search) ||
      r.school.toLowerCase().includes(search)
    );
  });

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  const selectAll = () => {
    if (selectedIds.size === filteredRegistrations.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredRegistrations.map((r) => r.id)));
    }
  };

  const getSelectedEmails = () => {
    return filteredRegistrations
      .filter((r) => selectedIds.has(r.id))
      .map((r) => r.parentEmail)
      .filter((email) => email);
  };

  const handleSendEmail = async () => {
    const emails = selectedIds.size > 0 ? getSelectedEmails() : filteredRegistrations.map((r) => r.parentEmail).filter(Boolean);

    if (emails.length === 0) {
      alert('No email addresses to send to');
      return;
    }

    if (!emailSubject.trim() || !emailBody.trim()) {
      alert('Please enter a subject and message');
      return;
    }

    setSending(true);
    setEmailResult(null);

    try {
      const res = await fetch('/api/admin/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emails,
          subject: emailSubject,
          body: emailBody,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setEmailResult({ sent: data.sent, failed: data.failed });
        fetchEmailStats(); // Refresh stats after sending
      } else {
        alert(data.error || 'Failed to send emails');
      }
    } catch {
      alert('Error sending emails');
    } finally {
      setSending(false);
    }
  };

  const stats = {
    total: registrations.length,
    revenue: registrations.reduce((sum, r) => {
      const amount = parseFloat(r.amount.replace('$', '')) || 0;
      return sum + amount;
    }, 0),
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm">Total Registrations</p>
          <p className="text-3xl font-bold text-[#00356b]">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-3xl font-bold text-green-600">${stats.revenue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm">Emails Today</p>
          <p className="text-3xl font-bold text-[#286dc0]">{emailStats.today}</p>
          <p className="text-xs text-gray-500 mt-1">{emailStats.thisMonth} this month</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-gray-600 text-sm">Daily Limit</p>
          <p className="text-3xl font-bold text-gray-700">{500 - emailStats.today}</p>
          <p className="text-xs text-gray-500 mt-1">of 500 remaining</p>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <select
              value={campFilter}
              onChange={(e) => setCampFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b]"
            >
              {campOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search by name, email, or school..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b] flex-1 min-w-[250px]"
            />
          </div>
          <button
            onClick={() => setShowEmailModal(true)}
            className="bg-[#00356b] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#286dc0] transition"
          >
            Send Email ({selectedIds.size > 0 ? selectedIds.size : filteredRegistrations.length})
          </button>
        </div>
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedIds.size === filteredRegistrations.length && filteredRegistrations.length > 0}
                    onChange={selectAll}
                    className="rounded"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Camp</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Camper</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Parent</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    Loading...
                  </td>
                </tr>
              ) : filteredRegistrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                    No registrations found
                  </td>
                </tr>
              ) : (
                filteredRegistrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.has(reg.id)}
                        onChange={() => toggleSelect(reg.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{reg.date}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {reg.campName}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900">{reg.camperName}</p>
                      <p className="text-sm text-gray-500">{reg.school}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{reg.parentName}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{reg.parentEmail}</td>
                    <td className="px-4 py-3 text-sm font-medium text-green-600">{reg.amount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#00356b]">Send Email</h2>
                <button
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailResult(null);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600 mt-1">
                Sending to {selectedIds.size > 0 ? selectedIds.size : filteredRegistrations.length} recipient(s)
              </p>
            </div>

            <div className="p-6 space-y-4">
              {emailResult ? (
                <div className="text-center py-8">
                  <div className="text-5xl mb-4">
                    {emailResult.failed === 0 ? '✓' : '⚠'}
                  </div>
                  <p className="text-xl font-semibold text-gray-900">
                    {emailResult.sent} email{emailResult.sent !== 1 ? 's' : ''} sent
                  </p>
                  {emailResult.failed > 0 && (
                    <p className="text-red-600">{emailResult.failed} failed</p>
                  )}
                  <button
                    onClick={() => {
                      setShowEmailModal(false);
                      setEmailResult(null);
                      setEmailSubject('');
                      setEmailBody('');
                    }}
                    className="mt-6 bg-[#00356b] text-white px-6 py-2 rounded-lg"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="e.g., Important Camp Update"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      value={emailBody}
                      onChange={(e) => setEmailBody(e.target.value)}
                      placeholder="Write your message here..."
                      rows={8}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00356b]"
                    />
                    <p className="text-sm text-gray-500 mt-1">Plain text only. Line breaks will be preserved.</p>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={() => setShowEmailModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSendEmail}
                      disabled={sending}
                      className="flex-1 bg-[#00356b] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#286dc0] disabled:opacity-50"
                    >
                      {sending ? 'Sending...' : 'Send Email'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
