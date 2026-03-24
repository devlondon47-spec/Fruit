'use client';

const mockStats = {
  revenue: 1847250,
  orders: 342,
  users: 1284,
  products: 48,
  vendors: 12,
  pendingOrders: 18,
  deliveredOrders: 289,
  cancelledOrders: 35,
};

const recentOrders = [
  { id: 'ORD-1743001', customer: 'Priya Sharma', fruit: '🥭 Alphonso Mango', amount: 1299, status: 'Delivered' },
  { id: 'ORD-1743002', customer: 'Arjun Mehta', fruit: '🐉 Dragon Fruit', amount: 899, status: 'Processing' },
  { id: 'ORD-1743003', customer: 'Sanya Kapoor', fruit: '🍇 Muscat Grape', amount: 1899, status: 'Processing' },
  { id: 'ORD-1743004', customer: 'Rohan Das', fruit: '🍑 Japanese Peach', amount: 2499, status: 'Delivered' },
  { id: 'ORD-1743005', customer: 'Nisha Patel', fruit: '🍓 Wild Strawberries', amount: 699, status: 'Cancelled' },
];

const topProducts = [
  { emoji: '🥭', name: 'Alphonso Mango', sold: 892, revenue: 115908 },
  { emoji: '🐉', name: 'Royal Dragon Fruit', sold: 567, revenue: 509433 },
  { emoji: '🍑', name: 'Japanese Shiro Peach', sold: 67, revenue: 167433 },
  { emoji: '🍇', name: 'Muscat Grape', sold: 145, revenue: 275355 },
];

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="glass" style={{ borderRadius: 'var(--radius-md)', padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ color: 'var(--grey)', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>{label}</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 900, color: color || 'var(--white)' }}>{value}</p>
          {sub && <p style={{ fontSize: '0.72rem', color: 'var(--grey)', marginTop: 4 }}>{sub}</p>}
        </div>
        <span style={{ fontSize: '2rem' }}>{icon}</span>
      </div>
    </div>
  );
}

export { mockStats, recentOrders, topProducts, StatCard };
