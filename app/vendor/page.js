'use client';
import { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { StatCard } from '../components/AdminShared';
import { fruits } from '../data/fruits';

const vendorProducts = fruits.slice(0, 3).map(f => ({
  ...f,
  stock: Math.floor(Math.random() * 50) + 2,
  sold: Math.floor(Math.random() * 300) + 10,
}));

const statusBadge = { Delivered: 'badge-green', Processing: 'badge-blue', Cancelled: 'badge-red', 'Sent to Vendor': 'badge-gold', 'Pending': 'badge-red' };

export default function VendorDashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const allOrders = JSON.parse(localStorage.getItem('fr_orders') || '[]');
      // Vendor only sees orders that are beyond Admin Pending
      const vOrders = allOrders.filter(o => ['Sent to Vendor', 'Processing', 'Delivered'].includes(o.status));
      setOrders(vOrders);
    } catch {}
  }, []);

  const updateStatus = (id, status) => {
    setOrders(prev => {
      const next = prev.map(o => o.id === id ? { ...o, status } : o);
      
      // We also must update the global fr_orders array so User and Admin see the change
      const allOrders = JSON.parse(localStorage.getItem('fr_orders') || '[]');
      const updatedGlobal = allOrders.map(o => o.id === id ? { ...o, status } : o);
      localStorage.setItem('fr_orders', JSON.stringify(updatedGlobal));
      
      return next;
    });
  };

  const totalEarnings = orders.filter(o => o.status === 'Delivered').reduce((s, o) => s + (o.total || o.amount) * 0.9, 0);
  const pendingPayouts = orders.filter(o => o.status === 'Processing' || o.status === 'Sent to Vendor').reduce((s, o) => s + (o.total || o.amount) * 0.9, 0);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="vendor" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>Vendor Dashboard</h1>
          <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>Welcome back, Mango Orchards Ltd.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <StatCard icon="💰" label="Total Earnings" value={`₹${totalEarnings.toLocaleString()}`} sub="Approx 90% generic payout" color="var(--gold)" />
          <StatCard icon="⏳" label="Pending Payout" value={`₹${pendingPayouts.toLocaleString()}`} sub="Awaiting delivery" color="#f39c12" />
          <StatCard icon="📦" label="Active Orders" value={orders.filter(o => o.status === 'Processing' || o.status === 'Sent to Vendor').length} sub="In progress" color="#3498db" />
          <StatCard icon="🍇" label="Products Listed" value={vendorProducts.length} sub="2 low stock" color="var(--success)" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {/* My Products */}
          <div className="card" style={{ borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 18, fontSize: '1rem' }}>My Products</h3>
            {vendorProducts.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {p.image ? (
                  <img src={p.image} alt={p.name} style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '1.6rem' }}>{p.emoji}</span>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--grey)' }}>Stock: {p.stock} · Sold: {p.sold}</div>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.85rem' }}>₹{p.price.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="card" style={{ borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 18, fontSize: '1rem' }}>Vendor Orders</h3>
            {orders.length === 0 ? (
              <p style={{ color: 'var(--grey)', fontSize: '0.85rem' }}>No active orders for your products yet.</p>
            ) : orders.map(o => {
              const itemNames = o.items ? o.items.map(i => `${i.emoji} ${i.name}`).join(', ') : o.fruit;
              return (
                <div key={o.id} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--gold)' }}>{o.id}</div>
                      <div style={{ fontSize: '0.75rem', marginTop: 2 }}>{o.customerName || o.customer}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--grey)', marginTop: 2, maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{itemNames}</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: '0.85rem' }}>₹{((o.total || o.amount) * 0.9).toLocaleString()} <span style={{fontSize:'0.65rem', color:'var(--grey)', fontWeight: 400}}>(Payout)</span></div>
                      
                      {/* Vendor Status Controls */}
                      <select className="form-input" style={{ padding: '4px 8px', fontSize: '0.7rem', width: 'auto', background: 'rgba(255,255,255,0.05)' }}
                        value={o.status} onChange={(e) => updateStatus(o.id, e.target.value)}>
                        <option value="Sent to Vendor">New Order</option>
                        <option value="Processing">Processing</option>
                        <option value="Delivered">Mark Delivered</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
