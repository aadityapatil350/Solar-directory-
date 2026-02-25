'use client';

import { useState, useEffect } from 'react';
import { ListFilter, RefreshCw, Trash2, Phone, Mail, MapPin } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  requirement: string | null;
  budget: string | null;
  urgency: string;
  status: string;
  location: {
    city: string;
    state: string;
  } | null;
  createdAt: string;
}

interface Stats {
  total: number;
  new: number;
  assigned: number;
  contacted: number;
  closed: number;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({
    total: 0,
    new: 0,
    assigned: 0,
    contacted: 0,
    closed: 0,
  });
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchLeads = async () => {
    try {
      const response = await fetch(`/api/admin/leads?status=${filter}`, {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });

      if (response.status === 401) {
        setIsAuthenticated(false);
        return;
      }

      const data = await response.json();
      setLeads(data.leads || []);
      setStats(data.stats || stats);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchLeads();
    }
  }, [filter, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticated(true);
    localStorage.setItem('adminAuth', auth);
  };

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify({ leadId, status: newStatus }),
      });

      fetchLeads();
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return;

    try {
      await fetch(`/api/admin/leads?leadId=${leadId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      });

      fetchLeads();
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={auth}
                onChange={(e) => setAuth(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                placeholder="Enter admin password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchLeads}
                className="flex items-center gap-2 px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Leads</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-blue-900">{stats.new}</div>
            <div className="text-sm text-blue-700">New</div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-yellow-900">{stats.assigned}</div>
            <div className="text-sm text-yellow-700">Assigned</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-purple-900">{stats.contacted}</div>
            <div className="text-sm text-purple-700">Contacted</div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-green-900">{stats.closed}</div>
            <div className="text-sm text-green-700">Closed</div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <ListFilter className="h-5 w-5 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Leads</option>
              <option value="new">New</option>
              <option value="assigned">Assigned</option>
              <option value="contacted">Contacted</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Leads Table */}
        {loading ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-gray-600">No leads found.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Lead
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{lead.name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600">{lead.phone}</span>
                          </div>
                          {lead.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">{lead.email}</span>
                            </div>
                          )}
                          {lead.location && (
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span className="text-gray-600">
                                {lead.location.city}, {lead.location.state}
                              </span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm space-y-1">
                          {lead.requirement && (
                            <div className="text-gray-600">
                              <span className="font-medium">Need:</span> {lead.requirement}
                            </div>
                          )}
                          {lead.budget && (
                            <div className="text-gray-600">
                              <span className="font-medium">Budget:</span> {lead.budget}
                            </div>
                          )}
                          {lead.urgency === 'urgent' && (
                            <div className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-medium">
                              URGENT
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium ${
                            lead.status === 'new'
                              ? 'bg-blue-100 text-blue-900'
                              : lead.status === 'assigned'
                              ? 'bg-yellow-100 text-yellow-900'
                              : lead.status === 'contacted'
                              ? 'bg-purple-100 text-purple-900'
                              : 'bg-green-100 text-green-900'
                          }`}
                        >
                          <option value="new">New</option>
                          <option value="assigned">Assigned</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete Lead"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
