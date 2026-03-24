'use client';
import AdminSidebar from '../components/AdminSidebar';
import { mockStats, recentOrders, topProducts, StatCard } from '../components/AdminShared';

const statusBadge = {
  Delivered: { cls: 'badge-green', icon: '✅' },
  Processing: { cls: 'badge-blue', icon: '🔄' },
  Cancelled: { cls: 'badge-red', icon: '❌' },
};

export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="admin" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>Welcome back. Here's your platform overview.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <StatCard icon="💰" label="Total Revenue" value={`₹${(mockStats.revenue/100000).toFixed(1)}L`} sub="This month" color="var(--gold)" />
          <StatCard icon="📦" label="Total Orders" value={mockStats.orders} sub="+18 pending" color="#3498db" />
          <StatCard icon="👥" label="Registered Users" value={mockStats.users} sub="↑ 12% this week" color="var(--success)" />
          <StatCard icon="🍇" label="Active Products" value={mockStats.products} sub="From 12 vendors" color="#e67e22" />
        </div>

        {/* Order mini stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '32px' }}>
          {[
            { label: 'Pending', value: mockStats.pendingOrders, color: '#f39c12', icon: '⏳' },
            { label: 'Delivered', value: mockStats.deliveredOrders, color: 'var(--success)', icon: '✅' },
            { label: 'Cancelled', value: mockStats.cancelledOrders, color: 'var(--error)', icon: '❌' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--black-3)', border: `1px solid ${s.color}22`, borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: s.color, margin: '6px 0 2px' }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--grey)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Recent Orders */}
          <div className="card" style={{ borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '18px', fontSize: '1rem' }}>Recent Orders</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {recentOrders.map(o => {
                const b = statusBadge[o.status] || statusBadge.Processing;
                return (
                  <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)', gap: 8 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.82rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{o.customer}</div>
                      <div style={{ color: 'var(--grey)', fontSize: '0.72rem' }}>{o.fruit}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                      <span style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.85rem' }}>₹{o.amount.toLocaleString()}</span>
                      <span className={`badge ${b.cls}`}>{b.icon}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Products */}
          <div className="card" style={{ borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '18px', fontSize: '1rem' }}>Top Selling Products</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {topProducts.map((p, i) => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(212,175,55,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800, color: 'var(--gold)', flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: '1.4rem' }}>{p.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.82rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--grey)' }}>{p.sold} sold</div>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.82rem', flexShrink: 0 }}>
                    ₹{(p.revenue/1000).toFixed(1)}K
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
