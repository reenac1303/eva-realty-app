import React, { useState } from 'react';

export default function Admin({ setActiveTab }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTable, setActiveTable] = useState('clients');

  const fetchTableData = async (tableName) => {
    setActiveTable(tableName);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/admin/${tableName}`, {
        headers: {
          'x-admin-password': 'EvaRealty2026!'
        }
      });
      const data = await response.json();
      
      if (data.success) {
        setTableData(data.leads || []);
      } else {
        setTableData([]);
      }
    } catch (err) {
      console.error('Error connecting to backend server:', err);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'EvaRealty2026!') {
      setIsAuthenticated(true);
      setError('');
      setPassword(''); 
      fetchTableData('clients');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword(''); 
    }
  };

  const handleLockPortal = () => {
    setIsAuthenticated(false);
    setPassword(''); 
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-24">
        <div className="bg-white p-8 rounded-3xl border-4 border-indigo-200 shadow-xl space-y-6 text-center">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-bold text-xl mx-auto">🔒</div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Eva Realty One Admin</h2>
            <p className="text-slate-600 text-sm">Enter your password to access database records.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-sm text-slate-900"
              required
            />
            {error && <p className="text-rose-500 text-xs font-semibold">{error}</p>}
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-semibold py-3.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-xs"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full inline-block shadow-xs mb-2">
            Eva Realty One • eXp Realty Database
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">Admin Control Panel</h1>
        </div>
        <button
          onClick={handleLockPortal}
          className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-2.5 rounded-xl border border-slate-200 text-xs uppercase tracking-wider transition cursor-pointer shadow-xs"
        >
          Lock Portal
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        {[
          { label: 'Clients', tableKey: 'clients' },
          { label: 'Lead Activity', tableKey: 'lead_activity' },
          { label: 'Leads', tableKey: 'leads' }
        ].map((btn) => (
          <button
            key={btn.tableKey}
            onClick={() => fetchTableData(btn.tableKey)}
            className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer shadow-xs ${
              activeTable === btn.tableKey
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border-4 border-indigo-200 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 text-lg capitalize">
            Viewing Table: <span className="text-indigo-600">{activeTable}</span>
          </h3>
          <button 
            onClick={() => fetchTableData(activeTable)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
          >
            Refresh Data
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-500">Loading records for {activeTable}...</div>
        ) : tableData.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No records found in the "{activeTable}" table.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                  {Object.keys(tableData[0]).slice(0, 6).map((colKey) => (
                    <th key={colKey} className="p-4 font-semibold capitalize">{colKey.replace('_', ' ')}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                {tableData.map((row, idx) => (
                  <tr key={row.id || idx} className="hover:bg-slate-50/50 transition">
                    {Object.entries(row).slice(0, 6).map(([key, val], cellIdx) => (
                      <td key={cellIdx} className="p-4">
                        {typeof val === 'string' && val.includes('T') && !isNaN(Date.parse(val))
                          ? new Date(val).toLocaleDateString()
                          : (val !== null ? String(val) : 'N/A')}
                      </td>
                    ))}
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