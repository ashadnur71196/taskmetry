'use client';
import { useState } from 'react';
import Link from 'next/link';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const STYLES = `
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 32px;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    background: linear-gradient(135deg, #00C8F0, #4F8EF7);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-weight: 600;
    font-size: 15px;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 0 0 0 rgba(0, 200, 240, 0.3);
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0, 200, 240, 0.3);
  }
  .card {
    background: var(--card);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    padding: 28px;
    transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
  }
  .card:hover {
    border-color: rgba(0, 200, 240, 0.35);
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
  }
`;

const servicesData = [
  {
    id: 1,
    icon: "📊",
    label: "Data Services",
    color: "#00C8F0",
    description: "Accurate, scalable data solutions tailored to your business workflow.",
    items: ["Data Entry & Collection", "Data Cleaning", "Excel & Google Sheets", "CRM Management"],
    pricing: { starter: 299, professional: 599, enterprise: "Custom" },
    turnaround: "24-48 hours",
    fullDescription: "Transform your raw data into actionable insights. Our data specialists handle everything from collection and cleaning to analysis and reporting.",
    includedFeatures: [
      "Unlimited revisions",
      "Data quality assurance",
      "Weekly progress reports",
      "Dedicated account manager",
      "24/7 support",
      "Secure cloud storage"
    ]
  },
  {
    id: 2,
    icon: "💻",
    label: "Web Development",
    color: "#7C3AED",
    description: "High-performance websites and web apps built to convert and grow.",
    items: ["Frontend & Backend Dev", "WordPress & E-commerce", "React / Next.js Apps", "API Integration"],
    pricing: { starter: 999, professional: 2499, enterprise: "Custom" },
    turnaround: "2-4 weeks",
    fullDescription: "Custom websites and applications built with modern technologies. We create fast, secure, and scalable solutions that drive business growth.",
    includedFeatures: [
      "Responsive design",
      "SEO optimization",
      "SSL certificate",
      "Performance optimization",
      "2 rounds of revisions",
      "1 month free support"
    ]
  },
  {
    id: 3,
    icon: "🔍",
    label: "SEO",
    color: "#F5A623",
    description: "Rank higher, get found faster, and drive organic growth consistently.",
    items: ["Technical SEO Audits", "Local & National SEO", "Content Optimization", "Link Building"],
    pricing: { starter: 449, professional: 899, enterprise: "Custom" },
    turnaround: "Ongoing",
    fullDescription: "Dominate search rankings with data-driven SEO strategies. We optimize your website to attract qualified organic traffic.",
    includedFeatures: [
      "Keyword research",
      "On-page optimization",
      "Technical SEO audit",
      "Content strategy",
      "Monthly reports",
      "Competitor analysis"
    ]
  },
  {
    id: 4,
    icon: "🎬",
    label: "Video Editing",
    color: "#F87171",
    description: "Scroll-stopping video content that captivates and builds your brand.",
    items: ["Short-form Content", "Motion Graphics", "Thumbnail Design", "YouTube Editing"],
    pricing: { starter: 349, professional: 749, enterprise: "Custom" },
    turnaround: "3-5 days",
    fullDescription: "Professional video editing that brings your content to life. We create engaging videos that boost your channels and engagement.",
    includedFeatures: [
      "Color grading",
      "Audio mixing",
      "Motion graphics",
      "Thumbnail design",
      "Unlimited revisions",
      "Fast turnaround"
    ]
  },
  {
    id: 5,
    icon: "🤝",
    label: "Virtual Assistance",
    color: "#34D399",
    description: "Reliable remote VAs that free your time and keep operations smooth.",
    items: ["Admin & Scheduling", "Email Management", "Customer Support", "Research & Reporting"],
    pricing: { starter: 499, professional: 999, enterprise: "Custom" },
    turnaround: "Immediate",
    fullDescription: "Offload administrative tasks to experienced virtual assistants. Focus on what matters while we handle the rest.",
    includedFeatures: [
      "Email management",
      "Schedule coordination",
      "Customer support",
      "Research & reporting",
      "Data entry",
      "Flexible hours"
    ]
  },
  {
    id: 6,
    icon: "🌍",
    label: "Remote Staffing",
    color: "#818CF8",
    description: "Build your dream team globally without the overhead costs.",
    items: ["Dedicated Remote Teams", "Outsourcing Solutions", "Talent Matching", "Managed Teams"],
    pricing: { starter: 1499, professional: 3999, enterprise: "Custom" },
    turnaround: "1-2 weeks",
    fullDescription: "Scale your team without the overhead. We handle recruitment, onboarding, and management of remote professionals.",
    includedFeatures: [
      "Dedicated team members",
      "Team management",
      "Performance tracking",
      "Flexible scaling",
      "Quality assurance",
      "Replacement guarantee"
    ]
  }
];

export default function BookingPage({ params }) {
  const { serviceId } = params;
  const service = servicesData.find(s => s.id === parseInt(serviceId));
  
  const [selectedTier, setSelectedTier] = useState('starter');
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    startDate: '',
    scope: '',
    budget: selectedTier,
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);

  if (!service) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: 32, marginBottom: 16 }}>Service Not Found</h1>
          <p style={{ color: 'var(--muted)', marginBottom: 24 }}>The service you're looking for doesn't exist.</p>
          <Link href="/">
            <button className="btn-primary">← Back to Home</button>
          </Link>
        </div>
      </div>
    );
  }

  const tierPrice = selectedTier === 'enterprise' ? service.pricing.enterprise : service.pricing[selectedTier];

  const handleBooking = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setBookingComplete(true);
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowX: 'hidden' }}>
      <style>{`${FONTS}${STYLES}`}</style>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 5%', height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(6,8,15,.92)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg,var(--cyan),#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: 14, fontFamily: 'Syne' }}>T</span>
          </div>
          <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: 18, letterSpacing: '-.01em' }}>Taskmetry</span>
        </Link>
        <Link href="/">
          <button style={{ background: 'rgba(0,200,240,.1)', border: '1px solid rgba(0,200,240,.25)', color: 'var(--cyan)', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontFamily: 'DM Sans', fontSize: 13, fontWeight: 600 }}>← Back</button>
        </Link>
      </nav>

      {!bookingComplete ? (
        <div style={{ paddingTop: 100, paddingBottom: 60 }}>
          {/* HEADER */}
          <section style={{ padding: '60px 5%', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
                <div style={{ fontSize: 48 }}>{service.icon}</div>
                <div>
                  <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, marginBottom: 8, fontFamily: 'Syne' }}>{service.label}</h1>
                  <p style={{ color: 'var(--muted)', fontSize: 16 }}>{service.description}</p>
                </div>
              </div>
            </div>
          </section>

          {/* MAIN CONTENT */}
          <section style={{ padding: '60px 5%' }}>
            <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
              
              {/* LEFT - SERVICE DETAILS */}
              <div>
                <div style={{ marginBottom: 40 }}>
                  <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16, fontFamily: 'Syne' }}>About This Service</h2>
                  <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: 20 }}>{service.fullDescription}</p>
                  
                  <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 24 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, fontFamily: 'Syne' }}>What's Included:</h3>
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {service.includedFeatures.map(feature => (
                        <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'var(--text)' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: service.color, flexShrink: 0 }} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span style={{ fontSize: 24 }}>⏱️</span>
                      <div>
                        <div style={{ fontSize: 13, color: 'var(--muted)' }}>Typical Turnaround</div>
                        <div style={{ fontSize: 16, fontWeight: 700 }}>{service.turnaround}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT - BOOKING FORM */}
              <div className="card" style={{ position: 'sticky', top: 100 }}>
                <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24, fontFamily: 'Syne' }}>Book Your Service</h2>

                {/* PRICING TIERS */}
                <div style={{ marginBottom: 32 }}>
                  <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 12, textTransform: 'uppercase', fontWeight: 600 }}>Select a Package</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                    {['starter', 'professional'].map(tier => (
                      <button key={tier} onClick={() => { setSelectedTier(tier); setBookingData({ ...bookingData, budget: tier }); }} style={{
                        padding: 16, borderRadius: 10, border: selectedTier === tier ? `2px solid ${service.color}` : '1px solid var(--border)',
                        background: selectedTier === tier ? `${service.color}10` : 'var(--bg3)',
                        color: 'var(--text)', cursor: 'pointer', transition: 'all .2s', textAlign: 'left',
                      }}>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, textTransform: 'capitalize' }}>{tier} Package</div>
                        <div style={{ fontSize: 20, fontWeight: 700, color: service.color }}>${service.pricing[tier]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* FORM FIELDS */}
                <form onSubmit={handleBooking}>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Full Name *</label>
                    <input type="text" placeholder="John Smith" required value={bookingData.name} onChange={e => setBookingData({ ...bookingData, name: e.target.value })} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', padding: 12, fontFamily: 'DM Sans', fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Email *</label>
                    <input type="email" placeholder="john@company.com" required value={bookingData.email} onChange={e => setBookingData({ ...bookingData, email: e.target.value })} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', padding: 12, fontFamily: 'DM Sans', fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Phone *</label>
                    <input type="tel" placeholder="+1 (555) 123-4567" required value={bookingData.phone} onChange={e => setBookingData({ ...bookingData, phone: e.target.value })} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', padding: 12, fontFamily: 'DM Sans', fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Company</label>
                    <input type="text" placeholder="Your Company" value={bookingData.company} onChange={e => setBookingData({ ...bookingData, company: e.target.value })} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', padding: 12, fontFamily: 'DM Sans', fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Start Date *</label>
                    <input type="date" required value={bookingData.startDate} onChange={e => setBookingData({ ...bookingData, startDate: e.target.value })} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', padding: 12, fontFamily: 'DM Sans', fontSize: 14, outline: 'none' }} />
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Project Scope *</label>
                    <textarea placeholder="Describe your project requirements..." required value={bookingData.scope} onChange={e => setBookingData({ ...bookingData, scope: e.target.value })} rows={4} style={{ width: '100%', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)', padding: 12, fontFamily: 'DM Sans', fontSize: 14, outline: 'none', resize: 'vertical' }} />
                  </div>

                  {/* PAYMENT METHOD */}
                  <div style={{ marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid var(--border)' }}>
                    <label style={{ fontSize: 13, color: 'var(--muted)', display: 'block', marginBottom: 12, textTransform: 'uppercase', fontWeight: 600 }}>Payment Method</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      {['card', 'paypal', 'bank'].map(method => (
                        <button key={method} type="button" onClick={() => setPaymentMethod(method)} style={{
                          padding: 12, borderRadius: 8, border: paymentMethod === method ? `2px solid ${service.color}` : '1px solid var(--border)',
                          background: paymentMethod === method ? `${service.color}10` : 'var(--bg3)',
                          color: 'var(--text)', cursor: 'pointer', transition: 'all .2s', fontSize: 13, fontWeight: 600, textTransform: 'capitalize',
                        }}>
                          {method === 'card' && '💳 Card'}
                          {method === 'paypal' && '🅿️ PayPal'}
                          {method === 'bank' && '🏦 Bank'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ORDER SUMMARY */}
                  <div style={{ background: `${service.color}0A`, border: `1px solid ${service.color}30`, borderRadius: 12, padding: 16, marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'var(--muted)' }}>Service Fee</span>
                      <span style={{ fontWeight: 600 }}>${typeof tierPrice === 'string' ? tierPrice : tierPrice}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ color: 'var(--muted)' }}>Processing</span>
                      <span style={{ fontWeight: 600 }}>$15</span>
                    </div>
                    <div style={{ borderTop: `1px solid ${service.color}30`, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontWeight: 700 }}>Total</span>
                      <span style={{ fontSize: 18, fontWeight: 700, color: service.color }}>${typeof tierPrice === 'string' ? 'Contact' : tierPrice + 15}</span>
                    </div>
                  </div>

                  <button type="submit" disabled={isProcessing} className="btn-primary" style={{ width: '100%', justifyContent: 'center', opacity: isProcessing ? 0.7 : 1, pointerEvents: isProcessing ? 'none' : 'auto' }}>
                    {isProcessing ? '⏳ Processing...' : `💳 Pay $${typeof tierPrice === 'string' ? 'Contact' : tierPrice + 15}`}
                  </button>
                  
                  <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 12 }}>Secure payment powered by Stripe</p>
                </form>
              </div>
            </div>
          </section>
        </div>
      ) : (
        // CONFIRMATION PAGE
        <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
          <div className="card" style={{ maxWidth: 500, textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
            <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 16, fontFamily: 'Syne' }}>Booking Confirmed!</h1>
            <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8, marginBottom: 32 }}>
              Thank you for booking with Taskmetry. We've received your booking request for <strong>{service.label}</strong> and a confirmation email has been sent to <strong>{bookingData.email}</strong>.
            </p>
            <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: 24, marginBottom: 32, textAlign: 'left' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, color: service.color, textTransform: 'uppercase' }}>What's Next:</h3>
              <ol style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 2 }}>
                <li>✓ We'll review your project scope within 24 hours</li>
                <li>✓ Our team lead will contact you to finalize details</li>
                <li>✓ Work begins on your selected start date</li>
                <li>✓ Regular updates and communication throughout</li>
              </ol>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/">
                <button className="btn-primary">← Return Home</button>
              </Link>
              <button className="btn-outline" onClick={() => window.location.href = `mailto:hello@taskmetry.work?subject=Booking Confirmation`} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', border: '1px solid var(--border)', borderRadius: 50, cursor: 'pointer', background: 'transparent', color: 'var(--text)', fontFamily: 'DM Sans', fontWeight: 600, fontSize: 15 }}>
                📧 Contact Support
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
