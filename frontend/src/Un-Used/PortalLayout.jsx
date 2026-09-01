import React from 'react';

export default function PortalLayout({ isAuthenticated, setIsAuthenticated, password, setPassword, handleLogin, loginError, clients }) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      {!isAuthenticated ? (
        <div className="max-w-md mx-auto bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-neutral-200 mt-12">
          <div className="text-center mb-8">
            <span className="text-4xl block mb-3">🔒</span>
            <h3 className="text-2xl font-black text-neutral-900">Secure Client Access</h3>
            <p className="text-xs text-neutral-400 mt-1">Authorized administrative execution token validation required</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">Administrative Token</label>
              <input type="password" placeholder="••••••••••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border border-neutral-200 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
            </div>
            <button type="submit" className="w-full bg-teal-950 hover:bg-teal-900 text-white py-4 rounded-xl font-bold uppercase tracking-wider text-xs transition-all">Unlock CRM Interface</button>
            {loginError && <p className="text-red-600 text-xs font-bold text-center bg-red-50 p-3 rounded-xl border border-red-100 mt-3">{loginError}</p>}
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl shadow-sm border border-neutral-100 gap-4">
            <div>
              <h2 className="text-2xl font-black text-neutral-900">Reena's CRM Command</h2>
              <p className="text-xs text-neutral-400 mt-0.5">Live Database Records Gateway</p>
            </div>
            <button onClick={()=>{setIsAuthenticated(false);}} className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors">Lock Dashboard</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100"><p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Total Inquiries</p><p className="text-3xl font-black text-neutral-950 mt-1">{clients.length}</p></div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100"><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Database Node</p><p className="text-xs font-bold text-emerald-600 mt-3 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Synchronized</p></div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-100"><p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Allocation Scope</p><p className="text-sm font-bold text-neutral-700 mt-2">Frisco Metroplex</p></div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 text-neutral-400 text-[10px] font-black uppercase tracking-wider border-b border-neutral-100">
                    <th className="p-4 w-1/4">Prospect Name</th>
                    <th className="p-4 w-1/3">Profiles</th>
                    <th className="p-4 w-5/12">Allocation Parameters / Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-sm">
                  {clients.length === 0 ? (
                    <tr><td colSpan="3" className="p-8 text-center text-neutral-400 font-medium">No records found.</td></tr>
                  ) : (
                    clients.map((c, i) => (
                      <tr key={c.id || i} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="p-4 font-bold text-neutral-900 align-top">{c.name}</td>
                        <td className="p-4 align-top space-y-1"><div className="text-neutral-900 font-medium">📧 {c.email}</div>{c.phone && <div className="text-xs text-neutral-400">📱 {c.phone}</div>}</td>
                        <td className="p-4 align-top text-neutral-600 leading-relaxed bg-neutral-50/30">{c.message || c.notes || 'No notes specified'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
