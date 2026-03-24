'use client';
import { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { fruits, categories } from '../data/fruits';

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sort, setSort] = useState('popular');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let list = [...fruits];
    if (activeCategory !== 'all') list = list.filter(f => f.category === activeCategory);
    if (search) list = list.filter(f => f.name.toLowerCase().includes(search.toLowerCase()) || f.origin.toLowerCase().includes(search.toLowerCase()));
    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      default: list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [activeCategory, sort, search]);

  return (
    <main style={{ minHeight: '100vh', paddingBottom: 80 }}>
      {/* Page Header */}
      <div style={{
        background: 'linear-gradient(to bottom, rgba(212,175,55,0.08), transparent)',
        borderBottom: '1px solid rgba(212,175,55,0.1)',
        padding: '48px 24px 36px',
        textAlign: 'center',
      }}>
        <div className="badge badge-gold" style={{ marginBottom: 12 }}>✦ Full Collection</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: 12 }}>
          The Royal Shop
        </h1>
        <p style={{ color: 'var(--grey)', maxWidth: 480, margin: '0 auto' }}>
          {fruits.length} luxury varieties from {new Set(fruits.map(f => f.origin.split(',')[1] || f.origin)).size}+ countries
        </p>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        {/* Filter Bar */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '12px',
          alignItems: 'center', justifyContent: 'space-between',
          marginBottom: '32px',
          padding: '20px 24px',
          background: 'var(--black-3)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid rgba(212,175,55,0.1)',
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--grey)' }}>🔍</span>
            <input
              type="text"
              placeholder="Search fruits, origins..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '36px' }}
            />
          </div>

          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '8px 16px', borderRadius: 'var(--radius-full)', cursor: 'pointer',
                  fontSize: '0.82rem', fontWeight: 600, transition: 'var(--transition)',
                  background: activeCategory === cat.id ? 'linear-gradient(135deg,#d4af37,#a88c20)' : 'rgba(255,255,255,0.05)',
                  color: activeCategory === cat.id ? 'var(--black)' : 'var(--grey-light)',
                  border: activeCategory === cat.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}>
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select value={sort} onChange={e => setSort(e.target.value)} className="form-input" style={{ width: 'auto', minWidth: 180, flex: '0 0 auto' }}>
            {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>

        {/* Results count */}
        <div style={{ marginBottom: '24px', color: 'var(--grey)', fontSize: '0.85rem' }}>
          Showing <strong style={{ color: 'var(--gold)' }}>{filtered.length}</strong> luxury varieties
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="product-grid">
            {filtered.map(f => <ProductCard key={f.id} product={f} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--grey)' }}>
            <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</div>
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: 8 }}>No fruits found</h3>
            <p>Try a different search or category</p>
          </div>
        )}
      </div>
    </main>
  );
}
