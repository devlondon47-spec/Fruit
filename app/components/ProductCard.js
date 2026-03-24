'use client';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link href={`/shop/${product.id}`} style={{ textDecoration: 'none' }}>
      <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
        {/* Image Area */}
        <div style={{
          position: 'relative',
          height: 200,
          background: 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(10,10,10,0.3))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '5rem',
          borderBottom: '1px solid rgba(212,175,55,0.08)',
          overflow: 'hidden',
        }}>
          <span style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}>{product.emoji}</span>
          {/* Badge */}
          {product.badge && (
            <span className="badge badge-gold" style={{
              position: 'absolute', top: 12, left: 12,
            }}>{product.badge}</span>
          )}
          {/* Discount */}
          {discount > 0 && (
            <span className="badge badge-green" style={{ position: 'absolute', top: 12, right: 12 }}>
              -{discount}%
            </span>
          )}
          {/* Out of stock */}
          {!product.inStock && (
            <div style={{
              position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(3px)',
            }}>
              <span className="badge badge-red">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 600, lineHeight: 1.3, flex: 1 }}>
              {product.name}
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <div className="stars">{'★'.repeat(Math.floor(product.rating))}</div>
            <span style={{ fontSize: '0.75rem', color: 'var(--grey)' }}>({product.reviews})</span>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--grey)', marginBottom: 4 }}>
            🌍 {product.origin} · {product.weight}
          </p>

          <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '1.1rem' }}>
                ₹{product.price.toLocaleString()}
              </span>
              {discount > 0 && (
                <span style={{ fontSize: '0.75rem', color: 'var(--grey)', textDecoration: 'line-through', marginLeft: 6 }}>
                  ₹{product.originalPrice?.toLocaleString()}
                </span>
              )}
            </div>
            {product.inStock && (
              <button
                onClick={handleAdd}
                className="btn btn-gold btn-sm"
                style={{ padding: '7px 14px', fontSize: '0.8rem' }}
              >
                + Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
