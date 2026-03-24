'use client';
import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { recentOrders } from '../../components/AdminShared';

const allOrders = [
  ...recentOrders,
  { id: 'ORD-1743006', customer: 'Meera Joshi', fruit: '🍒 Rainier Cherry', amount: 1999, status: 'Delivered' },
  { id: 'ORD-1743007', customer: 'Vikram Singh', fruit: '🌿 Monstera Fruit', amount: 3499, status: 'Processing' },
  { id: 'ORD-1743008', customer: 'Anjali Nair', fruit: '🍋 Persian Limon', amount: 549, status: 'Delivered' },
];

const statusBadge = { Delivered: { cls: 'badge-green', icon: '✅' }, Processing: { cls: 'badge-blue', icon: '🔄' }, Cancelled: { cls: 'badge-red', icon: '❌' } };

export default function AdminOrders() {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? allOrders : allOrders.filter(o => o.status === filter);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="admin" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>Order Management</h1>
          <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>{allOrders.length} total orders</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }}>
          {[['all','All'], ['Processing','Processing'], ['Delivered','Delivered'], ['Cancelled','Cancelled']].map(([v,l]) => (
            <button key={v} onClick={() => setFilter(v)} style={{
              padding: '8px 18px', borderRadius: 'var(--radius-full)', cursor: 'pointer', border: 'none', whiteSpace: 'nowrap',
              background: filter === v ? 'linear-gradient(135deg,#d4af37,#a88c20)' : 'rgba(255,255,255,0.05)',
              color: filter === v ? 'var(--black)' : 'var(--grey-light)', fontWeight: 600, fontSize: '0.82rem',
            }}>{l}</button>
          ))}
        </div>

        <div style={{ background: 'var(--black-3)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: 'var(--grey)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letter: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => {
                  const b = statusBadge[o.status] || statusBadge.Processing;
                  return (
                    <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                      <td style={{ padding: '12px 16px', color: 'var(--gold)', fontWeight: 700, fontSize: '0.78rem' }}>{o.id}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{o.customer}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--grey-light)' }}>{o.fruit}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--gold)', fontWeight: 700 }}>₹{o.amount.toLocaleString()}</td>
                      <td style={{ padding: '12px 16px' }}><span className={`badge ${b.cls}`}>{b.icon} {o.status}</span></td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button className="btn btn-ghost btn-sm" style={{ padding: '5px 10px', fontSize: '0.72rem' }}>View</button>
                          <select className="form-input" style={{ padding: '5px 8px', fontSize: '0.72rem', width: 'auto' }}>
                            <option>Change Status</option>
                            <option>Processing</option>
                            <option>Delivered</option>
                            <option>Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
