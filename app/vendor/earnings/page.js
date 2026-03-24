'use client';
import AdminSidebar from '../../components/AdminSidebar';

const monthlyEarnings = [
  { month: 'Oct', gross: 28000, commission: 2800, net: 25200 },
  { month: 'Nov', gross: 34500, commission: 3450, net: 31050 },
  { month: 'Dec', gross: 52000, commission: 5200, net: 46800 },
  { month: 'Jan', gross: 41000, commission: 4100, net: 36900 },
  { month: 'Feb', gross: 38500, commission: 3850, net: 34650 },
  { month: 'Mar', gross: 47200, commission: 4720, net: 42480 },
];

export default function VendorEarnings() {
  const totalNet = monthlyEarnings.reduce((s, m) => s + m.net, 0);
  const totalGross = monthlyEarnings.reduce((s, m) => s + m.gross, 0);
  const totalCommission = monthlyEarnings.reduce((s, m) => s + m.commission, 0);
  const maxNet = Math.max(...monthlyEarnings.map(m => m.net));

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="vendor" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>Earnings Analytics</h1>
          <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>Last 6 months performance</p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Gross Revenue', value: `₹${(totalGross/1000).toFixed(1)}K`, icon: '💼', color: 'var(--white)' },
            { label: 'Platform Commission (10%)', value: `-₹${(totalCommission/1000).toFixed(1)}K`, icon: '🏢', color: 'var(--error)' },
            { label: 'Net Earnings', value: `₹${(totalNet/1000).toFixed(1)}K`, icon: '💰', color: 'var(--gold)' },
            { label: 'Avg Monthly', value: `₹${Math.round(totalNet/monthlyEarnings.length/1000)}K`, icon: '📈', color: 'var(--success)' },
          ].map(s => (
            <div key={s.label} className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: '1.5rem' }}>{s.icon}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--grey)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{s.label}</span>
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 900, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="card" style={{ borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '24px' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '24px', fontSize: '1rem' }}>Monthly Net Earnings (₹)</h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '200px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {monthlyEarnings.map(m => {
              const h = (m.net / maxNet) * 100;
              return (
                <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '6px', height: '100%' }}>
                  <div style={{ fontSize: '0.65rem', color: 'var(--grey)' }}>₹{(m.net/1000).toFixed(0)}K</div>
                  <div style={{
                    width: '100%', borderRadius: '4px 4px 0 0',
                    background: 'linear-gradient(to top, #d4af37, #f0d060)',
                    height: `${h}%`, minHeight: 4,
                    transition: 'height 0.5s ease',
                    boxShadow: '0 0 12px rgba(212,175,55,0.3)',
                  }} />
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '16px', paddingTop: '8px' }}>
            {monthlyEarnings.map(m => (
              <div key={m.month} style={{ flex: 1, textAlign: 'center', fontSize: '0.72rem', color: 'var(--grey)' }}>{m.month}</div>
            ))}
          </div>
        </div>

        {/* Monthly Breakdown Table */}
        <div style={{ background: 'var(--black-3)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Month', 'Gross Revenue', 'Commission (10%)', 'Net Earnings'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', color: 'var(--grey)', fontSize: '0.72rem', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {monthlyEarnings.map((m, i) => (
                  <tr key={m.month} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i%2===0?'transparent':'rgba(255,255,255,0.01)' }}>
                    <td style={{ padding: '12px 20px', fontWeight: 600 }}>{m.month} 2025</td>
                    <td style={{ padding: '12px 20px' }}>₹{m.gross.toLocaleString()}</td>
                    <td style={{ padding: '12px 20px', color: 'var(--error)' }}>-₹{m.commission.toLocaleString()}</td>
                    <td style={{ padding: '12px 20px', color: 'var(--gold)', fontWeight: 700 }}>₹{m.net.toLocaleString()}</td>
                  </tr>
                ))}
                <tr style={{ background: 'rgba(212,175,55,0.05)', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 800, color: 'var(--gold)' }}>TOTAL</td>
                  <td style={{ padding: '14px 20px', fontWeight: 700 }}>₹{totalGross.toLocaleString()}</td>
                  <td style={{ padding: '14px 20px', color: 'var(--error)', fontWeight: 700 }}>-₹{totalCommission.toLocaleString()}</td>
                  <td style={{ padding: '14px 20px', color: 'var(--gold)', fontWeight: 800, fontSize: '1rem' }}>₹{totalNet.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
