'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('fr_orders') || '[]');
      setOrders(saved);
    } catch {}
  }, []);

  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const statusBadge = { Processing: { cls: 'badge-blue', icon: '🔄' }, Delivered: { cls: 'badge-green', icon: '✅' } };

  return (
    <main style={{ minHeight: '100vh', paddingBottom: 80 }}>
      <div style={{ background: 'linear-gradient(to bottom, rgba(212,175,55,0.08), transparent)', borderBottom: '1px solid rgba(212,175,55,0.1)', padding: '40px 24px 32px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)' }}>My Royal Orders</h1>
        <p style={{ color: 'var(--grey)', marginTop: 8 }}>{orders.length} orders placed</p>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '40px' }}>
          {[
            { icon: '📦', label: 'Total Orders', value: orders.length },
            { icon: '💰', label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}` },
            { icon: '🔄', label: 'Processing', value: orders.filter(o => o.status === 'Processing').length },
            { icon: '✅', label: 'Delivered', value: orders.filter(o => o.status === 'Delivered').length },
          ].map((s, i) => (
            <div key={i} className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--gold)' }}>{s.value}</div>
              <div style={{ color: 'var(--grey)', fontSize: '0.78rem', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--grey)' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>📦</div>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 8 }}>No orders yet</h3>
            <p style={{ marginBottom: 24 }}>Your royal journey hasn't begun!</p>
            <Link href="/shop" className="btn btn-gold">Browse Fruits</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {orders.map(order => {
              const badge = statusBadge[order.status] || { cls: 'badge-blue', icon: '🔄' };
              return (
                <div key={order.id} className="card" style={{ padding: '24px', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.9rem', marginBottom: 4 }}>{order.id}</div>
                      <div style={{ color: 'var(--grey)', fontSize: '0.78rem' }}>
                        {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' · '}{order.address}
                      </div>
                    </div>
                    <span className={`badge ${badge.cls}`}>{badge.icon} {order.status}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    {order.items.map(item => (
                      <span key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-sm)', padding: '6px 10px', fontSize: '0.8rem' }}>
                        {item.emoji} {item.name} <span style={{ color: 'var(--grey)' }}>×{item.qty}</span>
                      </span>
                    ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <span style={{ color: 'var(--grey)', fontSize: '0.82rem' }}>Paid via {order.payment?.toUpperCase()}</span>
                    <span style={{ fontWeight: 800, color: 'var(--gold)', fontSize: '1.1rem' }}>₹{order.total.toLocaleString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
