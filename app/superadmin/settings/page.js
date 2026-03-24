'use client';
import { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

export default function SuperAdminSettings() {
  const [settings, setSettings] = useState({
    commissionRate: 10,
    freeDeliveryAbove: 499,
    maxProductsPerVendor: 50,
    maintenanceMode: false,
    newRegistrations: true,
    vendorRegistrations: true,
    razorpayKey: 'rzp_live_mock_***',
    supportEmail: 'support@fruitroyale.com',
    minOrderValue: 199,
    couponLimit: 500,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Section = ({ title, children }) => (
    <div className="glass" style={{ borderRadius: 'var(--radius-lg)', padding: '28px', marginBottom: '20px' }}>
      <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '20px', fontSize: '1.05rem', paddingBottom: '12px', borderBottom: '1px solid rgba(212,175,55,0.15)' }}>
        {title}
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {children}
      </div>
    </div>
  );

  const Field = ({ label, k, type = 'number', readOnly }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        type={type} readOnly={readOnly}
        className="form-input"
        value={settings[k]}
        onChange={e => !readOnly && setSettings(p => ({...p, [k]: type === 'number' ? Number(e.target.value) : e.target.value}))}
        style={readOnly ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
      />
    </div>
  );

  const Toggle = ({ label, k, description }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{label}</div>
        {description && <div style={{ color: 'var(--grey)', fontSize: '0.74rem', marginTop: 2 }}>{description}</div>}
      </div>
      <button
        onClick={() => setSettings(p => ({...p, [k]: !p[k]}))}
        style={{
          width: 48, height: 26, borderRadius: 13, border: 'none', cursor: 'pointer',
          background: settings[k] ? 'linear-gradient(135deg,#d4af37,#a88c20)' : 'rgba(255,255,255,0.15)',
          transition: 'all 0.3s', position: 'relative', flexShrink: 0,
        }}
      >
        <div style={{
          position: 'absolute', top: 3, width: 20, height: 20, borderRadius: '50%', background: 'white',
          transition: 'left 0.3s', left: settings[k] ? '24px' : '4px',
        }} />
      </button>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <AdminSidebar role="superadmin" />
      <main style={{ flex: 1, padding: '32px', overflowX: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--gold)' }}>System Configuration</h1>
            <p style={{ color: 'var(--grey)', fontSize: '0.82rem', marginTop: 4 }}>Platform-wide settings and controls</p>
          </div>
          <button onClick={handleSave} className="btn btn-gold">
            {saved ? '✓ Saved!' : '💾 Save Changes'}
          </button>
        </div>

        <div style={{ maxWidth: 860 }}>
          <Section title="💰 Commerce Settings">
            <Field label="Commission Rate (%)" k="commissionRate" />
            <Field label="Free Delivery Above (₹)" k="freeDeliveryAbove" />
            <Field label="Min Order Value (₹)" k="minOrderValue" />
            <Field label="Max Products / Vendor" k="maxProductsPerVendor" />
          </Section>

          <Section title="⚙️ Platform Controls">
            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column' }}>
              <Toggle label="Maintenance Mode" k="maintenanceMode" description="Take the store offline for updates" />
              <Toggle label="New User Registrations" k="newRegistrations" description="Allow new customers to sign up" />
              <Toggle label="Vendor Registrations" k="vendorRegistrations" description="Accept new vendor applications" />
            </div>
          </Section>

          <Section title="📧 Contact & Integration">
            <Field label="Support Email" k="supportEmail" type="email" />
            <Field label="Razorpay Key" k="razorpayKey" type="text" readOnly />
            <Field label="Max Coupon Uses" k="couponLimit" />
          </Section>
        </div>
      </main>
    </div>
  );
}
