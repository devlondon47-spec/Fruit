'use client';
import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { fruits } from '../../data/fruits';

export default function VendorProducts() {
  const [showModal, setShowModal] = useState(false);
  const myProducts = fruits.slice(0, 4);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="vendor" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>My Products</h1>
            <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>{myProducts.length} products listed</p>
          </div>
          <button onClick={() => setShowModal(true)} className="btn btn-gold">+ Add Product</button>
        </div>

        <div className="product-grid">
          {myProducts.map(p => (
            <div key={p.id} className="card" style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
              <div style={{ height: 160, background: 'linear-gradient(135deg,rgba(212,175,55,0.08),rgba(10,10,10,0.3))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', borderBottom: '1px solid rgba(212,175,55,0.08)' }}>
                {p.emoji}
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>{p.name}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--grey)', marginBottom: 10 }}>{p.weight} · {p.origin}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.1rem' }}>₹{p.price.toLocaleString()}</span>
                  <span className={`badge ${p.inStock ? 'badge-green' : 'badge-red'}`}>{p.inStock ? 'In Stock' : 'Out'}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button className="btn btn-ghost btn-sm" style={{ flex: 1, justifyContent: 'center' }}>✏️ Edit</button>
                  <button className="btn btn-danger btn-sm" style={{ flex: 1, justifyContent: 'center' }}>🗑 Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <>
            <div className="overlay" onClick={() => setShowModal(false)} />
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', zIndex: 400, width: 'min(520px,95vw)', background: 'var(--black-2)', border: '1px solid rgba(212,175,55,0.2)', borderRadius: 'var(--radius-xl)', padding: '32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 20 }}>Add New Product</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[['Product Name','text'],['Price (₹)','number'],['Weight','text'],['Origin','text'],['Description','textarea']].map(([l,t]) => (
                  <div key={l} className="form-group">
                    <label className="form-label">{l}</label>
                    {t === 'textarea'
                      ? <textarea className="form-input" rows={3} placeholder={l} style={{ resize: 'vertical' }} />
                      : <input type={t} className="form-input" placeholder={l} />
                    }
                  </div>
                ))}
                <div style={{ display: 'flex', gap: '10px', marginTop: 6 }}>
                  <button onClick={() => setShowModal(false)} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                  <button onClick={() => setShowModal(false)} className="btn btn-gold" style={{ flex: 1 }}>Submit for Review</button>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
