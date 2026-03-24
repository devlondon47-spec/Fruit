'use client';
import AdminSidebar from '../components/AdminSidebar';
import { StatCard } from '../components/AdminShared';

const platformStats = {
  totalRevenue: 18472500,
  totalOrders: 3420,
  totalUsers: 12840,
  totalVendors: 12,
  activeVendors: 9,
  pendingVendors: 3,
  totalProducts: 480,
  avgOrderValue: 1847,
};

const recentVendors = [
  { name: 'Mango Orchards Ltd.', owner: 'Rajesh Kumar', city: 'Ratnagiri', products: 8, status: 'Approved', revenue: 547200 },
  { name: 'Berry Farm Co.', owner: 'Sunita Reddy', city: 'Ooty', products: 5, status: 'Approved', revenue: 213000 },
  { name: 'Exotic Imports Pvt.', owner: 'David Pereira', city: 'Mumbai', products: 12, status: 'Pending', revenue: 0 },
  { name: 'Himalayan Harvest', owner: 'Anil Verma', city: 'Shimla', products: 4, status: 'Pending', revenue: 0 },
];

export default function SuperAdminDashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="superadmin" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ marginBottom: 28 }}>
          <div className="badge badge-gold" style={{ marginBottom: 10 }}>👑 Super Admin Access</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>Platform Overview</h1>
          <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>Full platform analytics and control</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <StatCard icon="💰" label="Platform Revenue" value={`₹${(platformStats.totalRevenue/100000).toFixed(1)}L`} sub="All time" color="var(--gold)" />
          <StatCard icon="📦" label="Total Orders" value={platformStats.totalOrders.toLocaleString()} sub="All vendors" color="#3498db" />
          <StatCard icon="👥" label="Registered Users" value={platformStats.totalUsers.toLocaleString()} sub="↑ 8% this month" color="var(--success)" />
          <StatCard icon="🏪" label="Active Vendors" value={`${platformStats.activeVendors}/${platformStats.totalVendors}`} sub="3 pending approval" color="#e67e22" />
        </div>

        {/* Mini KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 32 }}>
          {[
            { label: 'Total Products', value: platformStats.totalProducts, icon: '🍇' },
            { label: 'Avg Order Value', value: `₹${platformStats.avgOrderValue}`, icon: '🧾' },
            { label: 'Pending Vendors', value: platformStats.pendingVendors, icon: '⏳' },
            { label: 'Commission Rate', value: '10%', icon: '📊' },
          ].map(s => (
            <div key={s.label} style={{ background: 'var(--black-3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', padding: '16px 14px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', color: 'var(--gold)' }}>{s.value}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--grey)', marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Vendor List */}
        <div className="card" style={{ borderRadius: 'var(--radius-lg)', padding: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '18px', fontSize: '1rem' }}>
            Vendor Overview
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentVendors.map(v => (
              <div key={v.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{v.name}</div>
                  <div style={{ color: 'var(--grey)', fontSize: '0.75rem' }}>{v.owner} · {v.city} · {v.products} products</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {v.revenue > 0 && <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>₹{(v.revenue/1000).toFixed(0)}K</span>}
                  <span className={`badge ${v.status === 'Approved' ? 'badge-green' : 'badge-blue'}`}>{v.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
