'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { fruits } from '../data/fruits';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!user) { router.push('/login'); return; }
    try {
      setOrders(JSON.parse(localStorage.getItem('fr_orders') || '[]'));
    } catch {}
  }, [user, router]);

  if (!user) return null;

  const totalSpent = orders.reduce((s, o) => s + o.total, 0);
  const recentOrders = orders.slice(0, 3);
  const recommended = fruits.slice(0, 4);

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'orders', label: '📦 My Orders' },
    { id: 'wishlist', label: '❤️ Wishlist' },
    { id: 'profile', label: '👤 Profile' },
  ];

  return (
    <main style={{ minHeight: '100vh', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(to right, rgba(212,175,55,0.12), rgba(10,10,10,0)), borderBottom: "1px solid rgba(212,175,55,0.1)"', padding: '48px 24px 36px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <p style={{ color: 'var(--grey)', fontSize: '0.85rem', marginBottom: 6 }}>Welcome back,</p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', marginBottom: 4 }}>
              {user.name} 👑
            </h1>
            <p style={{ color: 'var(--grey)', fontSize: '0.82rem' }}>{user.email}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link href="/shop" className="btn btn-gold btn-sm">Shop Now</Link>
            <button onClick={() => { logout(); router.push('/'); }} className="btn btn-ghost btn-sm">Logout</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 40px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', padding: '20px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              padding: '8px 18px', borderRadius: 'var(--radius-full)', cursor: 'pointer', border: 'none',
              background: activeTab === t.id ? 'linear-gradient(135deg,#d4af37,#a88c20)' : 'rgba(255,255,255,0.04)',
              color: activeTab === t.id ? 'var(--black)' : 'var(--grey-light)',
              fontWeight: 600, fontSize: '0.82rem', whiteSpace: 'nowrap', transition: 'var(--transition)',
            }}>{t.label}</button>
          ))}
        </div>

        <div style={{ paddingTop: '32px' }}>
          {activeTab === 'overview' && (
            <>
              {/* Stat Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '40px' }}>
                {[
                  { icon: '📦', label: 'Total Orders', value: orders.length, color: 'var(--gold)' },
                  { icon: '💰', label: 'Total Spent', value: `₹${totalSpent.toLocaleString()}`, color: '#3498db' },
                  { icon: '🔄', label: 'Processing', value: orders.filter(o => o.status === 'Processing').length, color: '#f39c12' },
                  { icon: '🌿', label: 'Member Since', value: '2025', color: 'var(--success)' },
                ].map((s, i) => (
                  <div key={i} className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: 10 }}>{s.icon}</div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 900, color: s.color }}>{s.value}</div>
                    <div style={{ color: 'var(--grey)', fontSize: '0.75rem', marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              {recentOrders.length > 0 && (
                <div style={{ marginBottom: 40 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>Recent Orders</h3>
                    <button onClick={() => setActiveTab('orders')} style={{ color: 'var(--gold)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.82rem' }}>View All →</button>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {recentOrders.map(o => (
                      <div key={o.id} className="card" style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--gold)', fontSize: '0.82rem' }}>{o.id}</div>
                          <div style={{ color: 'var(--grey)', fontSize: '0.75rem', marginTop: 2 }}>{o.items?.length} items</div>
                        </div>
                        <span className={`badge ${o.status === 'Processing' ? 'badge-blue' : 'badge-green'}`}>{o.status}</span>
                        <span style={{ fontWeight: 700, color: 'var(--gold)' }}>₹{o.total.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommended */}
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', marginBottom: 16 }}>Recommended for You</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                  {recommended.map(f => (
                    <Link key={f.id} href={`/shop/${f.id}`} style={{
                      display: 'flex', alignItems: 'center', gap: 14, padding: '16px',
                      background: 'var(--black-3)', border: '1px solid rgba(212,175,55,0.1)',
                      borderRadius: 'var(--radius-md)', transition: 'var(--transition)', textDecoration: 'none',
                    }}>
                      <span style={{ fontSize: '2.2rem' }}>{f.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{f.name}</div>
                        <div style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.9rem', marginTop: 2 }}>₹{f.price.toLocaleString()}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px', color: 'var(--grey)' }}>
                  <div style={{ fontSize: '3rem', marginBottom: 16 }}>📦</div>
                  <p>No orders yet. <Link href="/shop" style={{ color: 'var(--gold)' }}>Start shopping!</Link></p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {orders.map(o => (
                    <div key={o.id} className="card" style={{ padding: '20px 24px', borderRadius: 'var(--radius-lg)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                        <div>
                          <div style={{ fontWeight: 700, color: 'var(--gold)' }}>{o.id}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--grey)' }}>{new Date(o.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}</div>
                        </div>
                        <span className={`badge ${o.status === 'Processing' ? 'badge-blue' : 'badge-green'}`}>{o.status}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                        {o.items?.map(item => (
                          <span key={item.id} style={{ fontSize: '1.2rem', padding: '4px 8px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-sm)' }}>
                            {item.emoji}
                          </span>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                        <span style={{ fontSize: '0.78rem', color: 'var(--grey)' }}>{o.address}</span>
                        <span style={{ fontWeight: 800, color: 'var(--gold)' }}>₹{o.total.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--grey)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 16 }}>❤️</div>
              <p>Your wishlist is empty. <Link href="/shop" style={{ color: 'var(--gold)' }}>Discover fruits you'll love!</Link></p>
            </div>
          )}

          {activeTab === 'profile' && (
            <div style={{ maxWidth: 520 }}>
              <div className="glass" style={{ borderRadius: 'var(--radius-xl)', padding: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 24 }}>Profile Details</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[['Full Name', user.name], ['Email', user.email], ['Phone', user.phone || 'Not set'], ['Role', 'Royal Member']].map(([l, v]) => (
                    <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ color: 'var(--grey)', fontSize: '0.82rem' }}>{l}</span>
                      <span style={{ fontWeight: 500, fontSize: '0.85rem' }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
                  <button className="btn btn-gold btn-sm">Edit Profile</button>
                  <button onClick={() => { logout(); router.push('/'); }} className="btn btn-danger btn-sm">Logout</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
