'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ onCartOpen }) {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 'var(--navbar-h)',
        background: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.7)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid rgba(212,175,55,0.25)' : '1px solid transparent',
        transition: 'var(--transition)',
        display: 'flex', alignItems: 'center',
        padding: '0 24px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <span style={{ fontSize: '1.8rem' }}>🍇</span>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem',
              background: 'linear-gradient(135deg, #f0d060, #d4af37)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              lineHeight: 1.1,
            }}>FRUIT ROYALE</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--grey)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Luxury Exotic Fruits
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto' }}>
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} style={{
              padding: '8px 18px', borderRadius: 'var(--radius-full)',
              fontSize: '0.9rem', fontWeight: 500, color: 'var(--grey-light)',
              transition: 'var(--transition)',
            }}
              onMouseEnter={e => { e.target.style.color = 'var(--gold)'; e.target.style.background = 'rgba(212,175,55,0.08)'; }}
              onMouseLeave={e => { e.target.style.color = 'var(--grey-light)'; e.target.style.background = 'transparent'; }}
            >{l.label}</Link>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: 'auto' }}>
          {user ? (
            <>
              <Link href="/dashboard" className="hide-mobile" style={{ fontSize: '0.85rem', color: 'var(--gold)' }}>
                👤 {user.name?.split(' ')[0]}
              </Link>
              <button onClick={logout} className="btn btn-ghost btn-sm hide-mobile" style={{ padding: '6px 14px' }}>
                Logout
              </button>
            </>
          ) : (
            <div className="hide-mobile" style={{ display: 'flex', gap: '8px' }}>
              <Link href="/login" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link href="/register" className="btn btn-gold btn-sm">Join Us</Link>
            </div>
          )}

          {/* Cart Button */}
          <button
            onClick={onCartOpen}
            style={{
              position: 'relative', background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)', borderRadius: 'var(--radius-full)',
              padding: '8px 16px', color: 'var(--gold)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600,
              fontSize: '0.85rem', transition: 'var(--transition)',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(212,175,55,0.1)'}
          >
            🛒
            {cartCount > 0 && (
              <span style={{
                background: 'linear-gradient(135deg,#d4af37,#a88c20)',
                color: 'var(--black)', borderRadius: '50%',
                width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', fontWeight: 800,
              }}>{cartCount}</span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="show-mobile"
            onClick={() => setMobileOpen(p => !p)}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--radius-sm)', padding: '8px 10px', color: 'var(--white)',
              cursor: 'pointer', fontSize: '1.1rem',
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div className="overlay" onClick={() => setMobileOpen(false)} />
          <div style={{
            position: 'fixed', top: 'var(--navbar-h)', left: 0, right: 0,
            background: 'var(--black-2)', borderBottom: '1px solid rgba(212,175,55,0.2)',
            zIndex: 999, padding: '20px 24px', animation: 'slideUp 0.2s ease',
            display: 'flex', flexDirection: 'column', gap: '8px',
          }}>
            {navLinks.map(l => (
              <Link key={l.href} href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{ padding: '12px 16px', borderRadius: 'var(--radius-sm)', color: 'var(--white)', fontWeight: 500 }}>
                {l.label}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', marginTop: '4px', display: 'flex', gap: '8px' }}>
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="btn btn-ghost btn-sm" style={{ flex: 1, textAlign: 'center' }}>
                    My Account
                  </Link>
                  <button onClick={() => { logout(); setMobileOpen(false); }} className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMobileOpen(false)} className="btn btn-ghost btn-sm" style={{ flex: 1, textAlign: 'center' }}>Sign In</Link>
                  <Link href="/register" onClick={() => setMobileOpen(false)} className="btn btn-gold btn-sm" style={{ flex: 1, textAlign: 'center' }}>Join Us</Link>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
