'use client';
import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const mockUsers = [
  { id: 1, name: 'Priya Sharma', email: 'priya@example.com', role: 'Customer', orders: 12, spent: 18450, joined: '2024-01-15', status: 'Active' },
  { id: 2, name: 'Arjun Mehta', email: 'arjun@example.com', role: 'Vendor', orders: 0, spent: 0, joined: '2024-02-20', status: 'Active' },
  { id: 3, name: 'Sanya Kapoor', email: 'sanya@example.com', role: 'Customer', orders: 7, spent: 9210, joined: '2024-03-10', status: 'Active' },
  { id: 4, name: 'Rohan Das', email: 'rohan@example.com', role: 'Customer', orders: 3, spent: 4299, joined: '2024-04-05', status: 'Blocked' },
  { id: 5, name: 'Nisha Patel', email: 'nisha@example.com', role: 'Customer', orders: 19, spent: 36700, joined: '2023-12-01', status: 'Active' },
];

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const filtered = mockUsers.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.includes(search));

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="admin" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>User Management</h1>
            <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>{mockUsers.length} registered users</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
              <input className="form-input" placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 34, width: 240 }} />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Total Users', value: mockUsers.length, icon: '👥' },
            { label: 'Active', value: mockUsers.filter(u => u.status === 'Active').length, icon: '✅' },
            { label: 'Vendors', value: mockUsers.filter(u => u.role === 'Vendor').length, icon: '🏪' },
            { label: 'Blocked', value: mockUsers.filter(u => u.status === 'Blocked').length, icon: '🚫' },
          ].map(s => (
            <div key={s.label} className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: 'var(--gold)' }}>{s.value}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--grey)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--black-3)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['User', 'Role', 'Orders', 'Total Spent', 'Joined', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: 'var(--grey)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((u, i) => (
                  <tr key={u.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ fontWeight: 600 }}>{u.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--grey)' }}>{u.email}</div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`badge ${u.role === 'Vendor' ? 'badge-gold' : 'badge-blue'}`}>{u.role}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>{u.orders}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--gold)', fontWeight: 600 }}>
                      {u.spent > 0 ? `₹${u.spent.toLocaleString()}` : '—'}
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--grey)', fontSize: '0.78rem' }}>
                      {new Date(u.joined).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`badge ${u.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{u.status}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-ghost btn-sm" style={{ padding: '5px 10px', fontSize: '0.72rem' }}>View</button>
                        <button className={`btn btn-sm ${u.status === 'Active' ? 'btn-danger' : 'btn-outline'}`} style={{ padding: '5px 10px', fontSize: '0.72rem' }}>
                          {u.status === 'Active' ? 'Block' : 'Unblock'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
