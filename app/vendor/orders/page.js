'use client';
import AdminSidebar from '../../components/AdminSidebar';

const vendorOrders = [
  { id: 'ORD-1743001', customer: 'Priya Sharma', fruit: '🥭 Alphonso Mango × 1', amount: 1299, commission: 130, net: 1169, status: 'Delivered', date: '2025-03-20' },
  { id: 'ORD-1743003', customer: 'Sanya Kapoor', fruit: '🍇 Muscat Grape × 2', amount: 3798, commission: 380, net: 3418, status: 'Processing', date: '2025-03-22' },
  { id: 'ORD-1743007', customer: 'Vikram Singh', fruit: '🌿 Monstera Fruit × 1', amount: 3499, commission: 350, net: 3149, status: 'Processing', date: '2025-03-23' },
];

const statusBadge = { Delivered: 'badge-green', Processing: 'badge-blue', Cancelled: 'badge-red' };

export default function VendorOrders() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="vendor" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>My Orders</h1>
          <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>{vendorOrders.length} orders assigned to your store</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 12, marginBottom: 24 }}>
          {[
            { label: 'Total Orders', value: vendorOrders.length, icon: '📦' },
            { label: 'Processing', value: vendorOrders.filter(o => o.status === 'Processing').length, icon: '🔄' },
            { label: 'Delivered', value: vendorOrders.filter(o => o.status === 'Delivered').length, icon: '✅' },
            { label: 'Net Earnings', value: `₹${vendorOrders.filter(o=>o.status==='Delivered').reduce((s,o)=>s+o.net,0).toLocaleString()}`, icon: '💰' },
          ].map(s => (
            <div key={s.label} className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '16px', textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem' }}>{s.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.3rem', color: 'var(--gold)', margin: '6px 0 2px' }}>{s.value}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--grey)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--black-3)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Order ID','Date','Customer','Items','Amount','Commission','Net Earnings','Status'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: 'var(--grey)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {vendorOrders.map((o, i) => (
                  <tr key={o.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i%2===0?'transparent':'rgba(255,255,255,0.01)' }}>
                    <td style={{ padding: '12px 16px', color: 'var(--gold)', fontWeight: 700, fontSize: '0.78rem' }}>{o.id}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--grey)', fontSize: '0.78rem' }}>{o.date}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{o.customer}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--grey-light)' }}>{o.fruit}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 700 }}>₹{o.amount.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--error)' }}>-₹{o.commission}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--success)', fontWeight: 700 }}>₹{o.net.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px' }}><span className={`badge ${statusBadge[o.status]}`}>{o.status}</span></td>
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
