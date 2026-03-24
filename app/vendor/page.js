'use client';
import AdminSidebar from '../components/AdminSidebar';
import { StatCard } from '../components/AdminShared';

const vendorOrders = [
  { id: 'ORD-1743001', customer: 'Priya S.', fruit: '🥭 Alphonso Mango', amount: 1299, status: 'Delivered', commission: 130 },
  { id: 'ORD-1743003', customer: 'Sanya K.', fruit: '🍇 Muscat Grape', amount: 1899, status: 'Processing', commission: 190 },
  { id: 'ORD-1743007', customer: 'Vikram S.', fruit: '🌿 Monstera Fruit', amount: 3499, status: 'Processing', commission: 350 },
];

const vendorProducts = [
  { emoji: '🥭', name: 'Alphonso Mango', price: 1299, stock: 40, sold: 892 },
  { emoji: '🍇', name: 'Muscat Grape', price: 1899, stock: 12, sold: 145 },
  { emoji: '🌿', name: 'Monstera Fruit', price: 3499, stock: 3, sold: 23 },
];

const statusBadge = { Delivered: 'badge-green', Processing: 'badge-blue', Cancelled: 'badge-red' };

export default function VendorDashboard() {
  const totalEarnings = vendorOrders.filter(o => o.status === 'Delivered').reduce((s, o) => s + o.amount - o.commission, 0);
  const pendingPayouts = vendorOrders.filter(o => o.status === 'Processing').reduce((s, o) => s + o.amount - o.commission, 0);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="vendor" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>Vendor Dashboard</h1>
          <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>Welcome back, Mango Orchards Ltd.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <StatCard icon="💰" label="Total Earnings" value={`₹${totalEarnings.toLocaleString()}`} sub="After commission" color="var(--gold)" />
          <StatCard icon="⏳" label="Pending Payout" value={`₹${pendingPayouts.toLocaleString()}`} sub="Awaiting delivery" color="#f39c12" />
          <StatCard icon="📦" label="Active Orders" value={vendorOrders.filter(o => o.status === 'Processing').length} sub="In progress" color="#3498db" />
          <StatCard icon="🍇" label="Products Listed", value={vendorProducts.length} sub="2 low stock" color="var(--success)" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {/* My Products */}
          <div className="card" style={{ borderRadius: 'var(--radius-lg)', padding: '24px' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 18, fontSize: '1rem' }}>My Products</h3>
            {vendorProducts.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <span style={{ fontSize: '1.6rem' }}>{p.emoji}</span>
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
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 18, fontSize: '1rem' }}>Recent Orders</h3>
            {vendorOrders.map(o => (
              <div key={o.id} style={{ padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.82rem' }}>{o.customer}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--grey)' }}>{o.fruit}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.85rem' }}>₹{(o.amount - o.commission).toLocaleString()}</div>
                    <span className={`badge ${statusBadge[o.status]}`} style={{ fontSize: '0.65rem' }}>{o.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
