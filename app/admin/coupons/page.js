'use client';
import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const mockCoupons = [
  { id: 1, code: 'ROYAL15', type: 'Percentage', value: 15, minOrder: 500, uses: 234, limit: 500, expiry: '2025-06-30', status: 'Active' },
  { id: 2, code: 'FRESH100', type: 'Flat', value: 100, minOrder: 999, uses: 89, limit: 200, expiry: '2025-04-15', status: 'Active' },
  { id: 3, code: 'MANGO25', type: 'Percentage', value: 25, minOrder: 1000, uses: 56, limit: 100, expiry: '2025-05-31', status: 'Active' },
  { id: 4, code: 'SAVE50', type: 'Flat', value: 50, minOrder: 300, uses: 200, limit: 200, expiry: '2025-01-01', status: 'Expired' },
];

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState(mockCoupons);
  const [form, setForm] = useState({ code: '', type: 'Percentage', value: '', minOrder: '', limit: '', expiry: '' });

  const addCoupon = () => {
    if (!form.code) return;
    setCoupons(p => [...p, { ...form, id: Date.now(), uses: 0, status: 'Active', value: Number(form.value), minOrder: Number(form.minOrder), limit: Number(form.limit) }]);
    setForm({ code: '', type: 'Percentage', value: '', minOrder: '', limit: '', expiry: '' });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="admin" />
      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>Coupon Management</h1>
          <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>{coupons.filter(c => c.status === 'Active').length} active coupons</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Coupon List */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {coupons.map(c => (
                <div key={c.id} className="card" style={{ padding: '20px 24px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{
                      background: 'rgba(212,175,55,0.1)', border: '2px dashed rgba(212,175,55,0.4)',
                      borderRadius: 'var(--radius-sm)', padding: '8px 16px',
                      fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1rem', color: 'var(--gold)',
                      letterSpacing: '2px',
                    }}>{c.code}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>
                        {c.type === 'Percentage' ? `${c.value}% OFF` : `₹${c.value} OFF`}
                      </div>
                      <div style={{ color: 'var(--grey)', fontSize: '0.75rem' }}>
                        Min ₹{c.minOrder} · Expires {c.expiry} · {c.uses}/{c.limit} used
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={`badge ${c.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{c.status}</span>
                    <button onClick={() => setCoupons(p => p.filter(x => x.id !== c.id))} className="btn btn-danger btn-sm" style={{ padding: '5px 10px' }}>🗑</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Coupon */}
          <div className="glass" style={{ borderRadius: 'var(--radius-lg)', padding: '24px', height: 'fit-content' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 18, fontSize: '1rem' }}>Create Coupon</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[['code','Coupon Code'],['value','Discount Value'],['minOrder','Min Order (₹)'],['limit','Usage Limit'],['expiry','Expiry Date']].map(([k,l]) => (
                <div key={k} className="form-group">
                  <label className="form-label">{l}</label>
                  <input className="form-input" type={k === 'expiry' ? 'date' : 'text'} value={form[k]} onChange={e => setForm(p => ({...p,[k]:e.target.value}))} style={{ textTransform: k === 'code' ? 'uppercase' : 'none' }} />
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">Discount Type</label>
                <select className="form-input" value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))}>
                  <option>Percentage</option>
                  <option>Flat</option>
                </select>
              </div>
              <button onClick={addCoupon} className="btn btn-gold" style={{ justifyContent: 'center' }}>+ Create Coupon</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
