'use client';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, cartTotal, removeFromCart, updateQty } = useCart();

  return (
    <>
      {isOpen && <div className="overlay" onClick={onClose} style={{ zIndex: 299 }} />}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0,
        width: 'min(420px, 100vw)',
        background: 'var(--black-2)',
        borderLeft: '1px solid rgba(212,175,55,0.2)',
        zIndex: 300,
        display: 'flex', flexDirection: 'column',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
      }}>
        {/* Header */}
        <div style={{
          padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--gold)' }}>
              🛒 Your Cart
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--grey)', marginTop: 2 }}>
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-sm)', padding: '8px 12px', color: 'var(--white)', cursor: 'pointer',
            fontSize: '1rem',
          }}>✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--grey)' }}>
              <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🛒</div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--gold)', marginBottom: 8 }}>
                Your cart is empty
              </p>
              <p style={{ fontSize: '0.85rem', marginBottom: 24 }}>Discover our luxury fruits</p>
              <Link href="/shop" onClick={onClose} className="btn btn-gold btn-sm">Browse Shop</Link>
            </div>
          ) : cartItems.map(item => (
            <div key={item.id} className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '16px', display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 'var(--radius-sm)',
                background: 'rgba(212,175,55,0.08)', border: '1px solid rgba(212,175,55,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', flexShrink: 0,
              }}>{item.emoji}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {item.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: 'var(--grey)', marginTop: 2 }}>{item.weight}</p>
                <p style={{ color: 'var(--gold)', fontWeight: 700, marginTop: 4, fontSize: '0.95rem' }}>
                  ₹{(item.price * item.qty).toLocaleString()}
                </p>
                {/* Qty controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '10px' }}>
                  <button onClick={() => item.qty === 1 ? removeFromCart(item.id) : updateQty(item.id, item.qty - 1)}
                    style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--white)', cursor: 'pointer', fontSize: '0.9rem', display:'flex',alignItems:'center',justifyContent:'center' }}>−</button>
                  <span style={{ fontWeight: 700, minWidth: '20px', textAlign: 'center', fontSize: '0.9rem' }}>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)}
                    style={{ width: 28, height: 28, borderRadius: '50%', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: 'var(--gold)', cursor: 'pointer', fontSize: '0.9rem', display:'flex',alignItems:'center',justifyContent:'center' }}>+</button>
                  <button onClick={() => removeFromCart(item.id)}
                    style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--grey)', cursor: 'pointer', fontSize: '0.8rem', padding: '4px 8px', borderRadius: 'var(--radius-sm)' }}>
                    🗑
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--grey)' }}>
              <span>Subtotal</span>
              <span>₹{cartTotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--grey)' }}>
              <span>Delivery</span>
              <span style={{ color: 'var(--success)' }}>FREE</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '1.1rem', marginBottom: '20px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              <span>Total</span>
              <span className="text-gold">₹{cartTotal.toLocaleString()}</span>
            </div>
            <Link href="/checkout" onClick={onClose} className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
              Proceed to Checkout →
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
