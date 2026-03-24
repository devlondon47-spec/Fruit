'use client';
import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { fruits } from '../../data/fruits';

export default function AdminProducts() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'tropical', emoji: '🍇', badge: '' });

  const filtered = fruits.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="admin" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>Product Management</h1>
            <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>{fruits.length} products in catalogue</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn btn-gold">+ Add Product</button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: '20px', maxWidth: 360 }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}>🔍</span>
          <input className="form-input" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
        </div>

        {/* Table */}
        <div style={{ background: 'var(--black-3)', border: '1px solid rgba(212,175,55,0.1)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Product', 'Category', 'Price', 'Stock', 'Rating', 'Reviews', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '14px 16px', textAlign: 'left', color: 'var(--grey)', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.6rem' }}>{p.emoji}</span>
                        <div>
                          <div style={{ fontWeight: 600 }}>{p.name}</div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--grey)' }}>{p.origin} · {p.weight}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>{p.category}</span>
                    </td>
                    <td style={{ padding: '12px 16px', color: 'var(--gold)', fontWeight: 700 }}>₹{p.price.toLocaleString()}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span className={`badge ${p.inStock ? 'badge-green' : 'badge-red'}`}>{p.inStock ? 'In Stock' : 'Out'}</span>
                    </td>
                    <td style={{ padding: '12px 16px' }}>⭐ {p.rating}</td>
                    <td style={{ padding: '12px 16px', color: 'var(--grey)' }}>{p.reviews}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button className="btn btn-ghost btn-sm" style={{ padding: '5px 10px' }}>✏️</button>
                        <button className="btn btn-danger btn-sm" style={{ padding: '5px 10px' }}>🗑</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Modal */}
        {showModal && (
          <>
            <div className="overlay" onClick={() => setShowModal(false)} />
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 400, width: 'min(540px,95vw)', background: 'var(--black-2)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 'var(--radius-xl)', padding: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 20 }}>Add New Product</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[['name','Product Name'], ['price','Price (₹)'], ['badge','Badge (optional)']].map(([k,l]) => (
                  <div key={k} className="form-group">
                    <label className="form-label">{l}</label>
                    <input className="form-input" value={newProduct[k]} onChange={e => setNewProduct(p => ({...p,[k]:e.target.value}))} />
                  </div>
                ))}
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select className="form-input" value={newProduct.category} onChange={e => setNewProduct(p => ({...p,category:e.target.value}))}>
                    {['tropical','berries','citrus','stone','exotic'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={() => setShowModal(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                <button onClick={() => setShowModal(false)} className="btn btn-gold" style={{ flex: 1 }}>Add Product</button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
