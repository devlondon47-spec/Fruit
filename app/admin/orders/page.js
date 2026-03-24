'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const statusBadge = { 
  Delivered: { cls: 'badge-green', icon: '✅' }, 
  Processing: { cls: 'badge-blue', icon: '🔄' }, 
  'Sent to Vendor': { cls: 'badge-gold', icon: '🏪' }, 
  Pending: { cls: 'badge-red', icon: '⏳' },
  Cancelled: { cls: 'badge-red', icon: '❌' } 
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem('fr_orders') || '[]'));
    } catch {}
  }, []);

  const updateStatus = (id, status) => {
    setOrders(prev => {
      const next = prev.map(o => o.id === id ? { ...o, status } : o);
      localStorage.setItem('fr_orders', JSON.stringify(next));
      return next;
    });
  };

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="admin" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>Order Management</h1>
          <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>{orders.length} total orders</p>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }}>
          {[['all','All'], ['Pending','Pending (New)'], ['Sent to Vendor','Sent to Vendor'], ['Delivered','Delivered'], ['Cancelled','Cancelled']].map(([v,l]) => (
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
                  {['Order ID', 'Customer', 'Items', 'Amount', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: 'var(--grey)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((o, i) => {
                  const b = statusBadge[o.status] || { cls: 'badge-blue', icon: '🔹' };
                  const itemNames = o.items ? o.items.map(i => `${i.emoji} ${i.name}`).join(', ') : o.fruit;
                  return (
                    <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                      <td style={{ padding: '12px 16px', color: 'var(--gold)', fontWeight: 700, fontSize: '0.78rem' }}>{o.id}</td>
                      <td style={{ padding: '12px 16px', fontWeight: 600 }}>{o.customerName || o.customer}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--grey-light)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{itemNames}</td>
                      <td style={{ padding: '12px 16px', color: 'var(--gold)', fontWeight: 700 }}>₹{(o.total || o.amount).toLocaleString()}</td>
                      <td style={{ padding: '12px 16px' }}><span className={`badge ${b.cls}`}>{b.icon} {o.status}</span></td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <select className="form-input" style={{ padding: '5px 8px', fontSize: '0.72rem', width: 'auto' }}
                            value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
                            <option value="Pending">Pending</option>
                            <option value="Sent to Vendor">Approve & Send to Vendor</option>
                            <option value="Processing">Processing</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && <div style={{ padding: 40, textAlign: 'center', color: 'var(--grey)' }}>No orders found for this filter.</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
