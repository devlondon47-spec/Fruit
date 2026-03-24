'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar({ role = 'admin' }) {
  const path = usePathname();

  const adminLinks = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '🍇' },
    { href: '/admin/categories', label: 'Categories', icon: '🏷️' },
    { href: '/admin/orders', label: 'Orders', icon: '📦' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/coupons', label: 'Coupons', icon: '🎟️' },
  ];

  const vendorLinks = [
    { href: '/vendor', label: 'Dashboard', icon: '📊' },
    { href: '/vendor/products', label: 'My Products', icon: '🍇' },
    { href: '/vendor/orders', label: 'Orders', icon: '📦' },
    { href: '/vendor/earnings', label: 'Earnings', icon: '💰' },
  ];

  const superLinks = [
    { href: '/superadmin', label: 'Platform Overview', icon: '🌐' },
    { href: '/superadmin/vendors', label: 'Vendor Approval', icon: '✅' },
    { href: '/superadmin/settings', label: 'System Config', icon: '⚙️' },
  ];

  const links = role === 'vendor' ? vendorLinks : role === 'superadmin' ? superLinks : adminLinks;

  const titles = { admin: '⚜️ Admin Panel', vendor: '🏪 Vendor Panel', superadmin: '👑 Super Admin' };
  const subtitles = { admin: 'Store Management', vendor: 'My Store', superadmin: 'Platform Control' };

  return (
    <aside style={{
      width: 240, minHeight: '100vh', background: 'var(--black-2)',
      borderRight: '1px solid rgba(212,175,55,0.12)',
      display: 'flex', flexDirection: 'column',
      position: 'sticky', top: 'var(--navbar-h)', height: 'calc(100vh - var(--navbar-h))',
      overflowY: 'auto', flexShrink: 0,
    }}>
      {/* Panel Badge */}
      <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--gold)' }}>
          {titles[role]}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--grey)', marginTop: 2 }}>{subtitles[role]}</div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {links.map(l => {
          const active = path === l.href || (l.href !== '/' + role && path.startsWith(l.href));
          return (
            <Link key={l.href} href={l.href} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: 'var(--radius-sm)',
              fontSize: '0.88rem', fontWeight: active ? 600 : 400,
              color: active ? 'var(--black)' : 'var(--grey-light)',
              background: active ? 'linear-gradient(135deg,#d4af37,#a88c20)' : 'transparent',
              transition: 'var(--transition)',
              textDecoration: 'none',
            }}>
              <span>{l.icon}</span>
              {l.label}
            </Link>
          );
        })}
      </nav>

      {/* Back to Store */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontSize: '0.8rem', color: 'var(--grey)', textDecoration: 'none',
          padding: '8px 12px', borderRadius: 'var(--radius-sm)',
        }}>
          ← Back to Store
        </Link>
      </div>
    </aside>
  );
}
