'use client';
import { useState } from 'react';
import Link from 'next/link';
import { fruits } from '../../data/fruits';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard';

export default function ProductDetailPage({ params }) {
  const { id } = params;
  const product = fruits.find(f => f.id === id);
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const related = fruits.filter(f => f.category === product?.category && f.id !== id).slice(0, 3);

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '120px 24px', color: 'var(--grey)' }}>
      <div style={{ fontSize: '4rem' }}>🍃</div>
      <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', margin: '16px 0 8px' }}>Product not found</h2>
      <Link href="/shop" className="btn btn-gold" style={{ marginTop: 20, display: 'inline-flex' }}>Back to Shop</Link>
    </div>
  );

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <main style={{ minHeight: '100vh', paddingBottom: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 32, fontSize: '0.82rem', color: 'var(--grey)' }}>
          <Link href="/" style={{ color: 'var(--grey)' }}>Home</Link>
          <span>›</span>
          <Link href="/shop" style={{ color: 'var(--grey)' }}>Shop</Link>
          <span>›</span>
          <span style={{ color: 'var(--gold)' }}>{product.name}</span>
        </div>

        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start' }}>
          {/* Left — Image */}
          <div>
            <div style={{
              borderRadius: 'var(--radius-xl)', aspectRatio: '1',
              background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(10,10,10,0.5))',
              border: '1px solid rgba(212,175,55,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '10rem', position: 'relative',
              boxShadow: 'var(--shadow-gold)',
            }}>
              <span style={{ animation: 'float 4s ease-in-out infinite', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.5))' }}>
                {product.emoji}
              </span>
              {product.badge && (
                <span className="badge badge-gold" style={{ position: 'absolute', top: 20, left: 20, fontSize: '0.75rem' }}>
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="badge badge-green" style={{ position: 'absolute', top: 20, right: 20, fontSize: '0.75rem' }}>
                  -{discount}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Right — Info */}
          <div>
            <p style={{ color: 'var(--grey)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: 8 }}>
              {product.category} · {product.origin}
            </p>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', marginBottom: 16, lineHeight: 1.2 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div className="stars">{'★'.repeat(Math.floor(product.rating))}</div>
              <span style={{ fontWeight: 700, color: 'var(--gold)' }}>{product.rating}</span>
              <span style={{ color: 'var(--grey)', fontSize: '0.82rem' }}>({product.reviews} reviews)</span>
            </div>

            <p style={{ color: 'var(--grey-light)', lineHeight: 1.9, marginBottom: 28, fontSize: '0.95rem' }}>
              {product.description}
            </p>

            {/* Price */}
            <div style={{ marginBottom: 28, padding: '20px', background: 'var(--black-3)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212,175,55,0.15)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 4 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 900, color: 'var(--gold)' }}>
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1.1rem', color: 'var(--grey)', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--grey)' }}>per {product.weight} · Free Delivery</p>
            </div>

            {/* Qty + Add to Cart */}
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(212,175,55,0.3)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ padding: '10px 16px', background: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '1.1rem', border: 'none' }}>−</button>
                <span style={{ padding: '10px 16px', fontWeight: 700, minWidth: 40, textAlign: 'center' }}>{qty}</span>
                <button onClick={() => setQty(q => q + 1)} style={{ padding: '10px 16px', background: 'none', color: 'var(--gold)', cursor: 'pointer', fontSize: '1.1rem', border: 'none' }}>+</button>
              </div>
              {product.inStock ? (
                <button onClick={handleAdd} className="btn btn-gold btn-lg" style={{ flex: 1, justifyContent: 'center' }}>
                  {added ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                </button>
              ) : (
                <button className="btn btn-ghost btn-lg" disabled style={{ flex: 1, opacity: 0.5, cursor: 'not-allowed', justifyContent: 'center' }}>
                  Out of Stock
                </button>
              )}
            </div>

            {/* Trust */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {['🌿 Organic Certified', '❄️ Cold Chain', '🔄 7-Day Returns', '🚚 Free Delivery'].map(t => (
                <span key={t} style={{ fontSize: '0.78rem', color: 'var(--grey)', paddingRight: 16, borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Nutrition */}
            <div style={{ marginTop: 28, padding: '20px', background: 'var(--black-3)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 14, fontSize: '0.95rem' }}>
                Nutrition Facts (per 100g)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                {Object.entries(product.nutritionFacts).map(([key, val]) => (
                  <div key={key} style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--gold)' }}>{val}</div>
                    <div style={{ color: 'var(--grey)', fontSize: '0.7rem', textTransform: 'capitalize', marginTop: 2 }}>{key}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div style={{ marginTop: '80px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '24px' }}>
              You May Also Love
            </h2>
            <div className="product-grid">
              {related.map(f => <ProductCard key={f.id} product={f} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
