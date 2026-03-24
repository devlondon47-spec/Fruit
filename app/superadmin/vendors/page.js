'use client';
import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const vendors = [
  { id: 1, name: 'Mango Orchards Ltd.', owner: 'Rajesh Kumar', city: 'Ratnagiri', products: 8, joined: '2024-01-10', revenue: 547200, commission: 54720, status: 'Approved' },
  { id: 2, name: 'Berry Farm Co.', owner: 'Sunita Reddy', city: 'Ooty', products: 5, joined: '2024-02-15', revenue: 213000, commission: 21300, status: 'Approved' },
  { id: 3, name: 'Exotic Imports Pvt.', owner: 'David Pereira', city: 'Mumbai', products: 12, joined: '2025-03-01', revenue: 0, commission: 0, status: 'Pending' },
  { id: 4, name: 'Himalayan Harvest', owner: 'Anil Verma', city: 'Shimla', products: 4, joined: '2025-03-15', revenue: 0, commission: 0, status: 'Pending' },
  { id: 5, name: 'Citrus Grove', owner: 'Meera Nair', city: 'Nagpur', products: 7, joined: '2024-06-20', revenue: 182400, commission: 18240, status: 'Rejected' },
];

export default function SuperAdminVendors() {
  const [list, setList] = useState(vendors);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? list : list.filter(v => v.status === filter);
  const change = (id, status) => setList(p => p.map(v => v.id === id ? {...v, status} : v));

  const statusBadge = { Approved: 'badge-green', Pending: 'badge-blue', Rejected: 'badge-red' };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="superadmin" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>Vendor Approval</h1>
          <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>Manage and approve vendor applications</p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          {[['all','All'],['Pending','Pending'],['Approved','Approved'],['Rejected','Rejected']].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{
              padding: '8px 18px', borderRadius: 'var(--radius-full)', cursor: 'pointer', border: 'none',
              background: filter === v ? 'linear-gradient(135deg,#d4af37,#a88c20)' : 'rgba(255,255,255,0.05)',
              color: filter === v ? 'var(--black)' : 'var(--grey-light)', fontWeight: 600, fontSize: '0.82rem',
            }}>{l} {v !== 'all' && `(${list.filter(x => x.status === v).length})`}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map(v => (
            <div key={v.id} className="card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{v.name}</div>
                  <div style={{ color: 'var(--grey)', fontSize: '0.78rem' }}>{v.owner} · {v.city}</div>
                  <div style={{ color: 'var(--grey)', fontSize: '0.72rem', marginTop: 2 }}>Applied: {v.joined}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--grey)', marginBottom: 3 }}>Products Listed</div>
                  <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '1.1rem' }}>{v.products}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--grey)', marginBottom: 3 }}>Total Revenue</div>
                  <div style={{ fontWeight: 700, color: v.revenue > 0 ? 'var(--gold)' : 'var(--grey)', fontSize: '1.1rem' }}>
                    {v.revenue > 0 ? `₹${(v.revenue/1000).toFixed(0)}K` : '—'}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--grey)', marginBottom: 3 }}>Commission Earned</div>
                  <div style={{ fontWeight: 700, color: 'var(--success)', fontSize: '1.1rem' }}>
                    {v.commission > 0 ? `₹${v.commission.toLocaleString()}` : '—'}
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                  <span className={`badge ${statusBadge[v.status]}`} style={{ marginBottom: 6 }}>{v.status}</span>
                  {v.status === 'Pending' && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => change(v.id, 'Approved')} className="btn btn-gold btn-sm" style={{ padding: '6px 14px' }}>✓ Approve</button>
                      <button onClick={() => change(v.id, 'Rejected')} className="btn btn-danger btn-sm" style={{ padding: '6px 14px' }}>✗ Reject</button>
                    </div>
                  )}
                  {v.status === 'Approved' && (
                    <button onClick={() => change(v.id, 'Rejected')} className="btn btn-danger btn-sm" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>Suspend</button>
                  )}
                  {v.status === 'Rejected' && (
                    <button onClick={() => change(v.id, 'Approved')} className="btn btn-outline btn-sm" style={{ padding: '6px 14px', fontSize: '0.75rem' }}>Reinstate</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
