'use client';
import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const mockCategories = [
  { id: 1, name: 'Tropical', icon: '🌴', count: 8, status: 'Active' },
  { id: 2, name: 'Berries', icon: '🫐', count: 5, status: 'Active' },
  { id: 3, name: 'Citrus', icon: '🍊', count: 6, status: 'Active' },
  { id: 4, name: 'Stone Fruits', icon: '🍑', count: 4, status: 'Active' },
  { id: 5, name: 'Exotic', icon: '🐉', count: 12, status: 'Active' },
  { id: 6, name: 'Dried Fruits', icon: '🌰', count: 3, status: 'Inactive' },
];

export default function AdminCategories() {
  const [cats, setCats] = useState(mockCategories);
  const [form, setForm] = useState({ name: '', icon: '🍇' });

  const add = () => {
    if (!form.name) return;
    setCats(p => [...p, { id: Date.now(), name: form.name, icon: form.icon, count: 0, status: 'Active' }]);
    setForm({ name: '', icon: '🍇' });
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="admin" />
      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>Category Management</h1>
          <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>{cats.length} categories configured</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* Category Grid */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
              {cats.map(c => (
                <div key={c.id} className="card" style={{ padding: '20px', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>{c.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 4 }}>{c.name}</div>
                  <div style={{ color: 'var(--grey)', fontSize: '0.75rem', marginBottom: 10 }}>{c.count} products</div>
                  <span className={`badge ${c.status === 'Active' ? 'badge-green' : 'badge-red'}`}>{c.status}</span>
                  <div style={{ display: 'flex', gap: 6, marginTop: '10px', justifyContent: 'center' }}>
                    <button className="btn btn-ghost btn-sm" style={{ padding: '4px 10px', fontSize: '0.72rem' }}>Edit</button>
                    <button onClick={() => setCats(p => p.filter(x => x.id !== c.id))} className="btn btn-danger btn-sm" style={{ padding: '4px 10px', fontSize: '0.72rem' }}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Category */}
          <div className="glass" style={{ borderRadius: 'var(--radius-lg)', padding: '24px', height: 'fit-content' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 18, fontSize: '1rem' }}>Add Category</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div className="form-group">
                <label className="form-label">Emoji Icon</label>
                <input className="form-input" value={form.icon} onChange={e => setForm(p => ({...p, icon: e.target.value}))} style={{ fontSize: '1.5rem', textAlign: 'center' }} maxLength={2} />
              </div>
              <div className="form-group">
                <label className="form-label">Category Name</label>
                <input className="form-input" placeholder="e.g. Superfruits" value={form.name} onChange={e => setForm(p => ({...p, name: e.target.value}))} />
              </div>
              <button onClick={add} className="btn btn-gold" style={{ justifyContent: 'center' }}>+ Add Category</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
