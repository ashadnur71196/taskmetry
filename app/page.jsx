'use client';
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Georgia:wght@400;700&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');`;

const STYLES = `
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  :root{
    --bg:#06080F;--bg2:#0C0F1A;--bg3:#111525;
    --cyan:#00C8F0;--cyan2:#00E5FF;--amber:#F5A623;
    --text:#E8EAF2;--muted:#7A7F9A;--border:#1C2035;
    --card:#0F1220;--radius:14px;
  }
  html{scroll-behavior:smooth}
  body{background:var(--bg);color:var(--text);font-family:'DM Sans',sans-serif;overflow-x:hidden}
  h1,h2,h3,h4,h5{font-family:'Georgia',serif;font-weight:700;text-shadow:0 4px 12px rgba(0,200,240,.2);background:linear-gradient(135deg,rgba(0,200,240,.08),rgba(124,58,237,.08));-webkit-background-clip:text;padding:4px 8px;border-radius:4px}
  .grad{background:linear-gradient(135deg,var(--cyan),#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  .grad-amber{background:linear-gradient(135deg,var(--amber),#F87171);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
  @keyframes pulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.8;transform:scale(1.04)}}
  @keyframes spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
  @keyframes slideIn{from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}}
  @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
  @keyframes borderGlow{0%,100%{box-shadow:0 0 0 1px rgba(0,200,240,.15)}50%{box-shadow:0 0 0 2px rgba(0,200,240,.45),0 0 24px rgba(0,200,240,.12)}}
  @keyframes countUp{from{opacity:0}to{opacity:1}}
  .fade-up{opacity:0;transform:translateY(32px);transition:opacity .7s ease,transform .7s ease}
  .fade-up.visible{opacity:1;transform:translateY(0)}
  .slide-in{opacity:0;transform:translateX(-24px);transition:opacity .6s ease,transform .6s ease}
  .slide-in.visible{opacity:1;transform:translateX(0)}
  .btn-primary{
    display:inline-flex;align-items:center;gap:8px;
    padding:14px 32px;border-radius:50px;border:none;cursor:pointer;
    background:linear-gradient(135deg,var(--cyan),#4F8EF7);
    color:#fff;font-family:'DM Sans',sans-serif;font-weight:600;font-size:15px;
    transition:transform .2s,box-shadow .2s;
    box-shadow:0 0 0 0 rgba(0,200,240,.3);
    text-decoration:none;
  }
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,200,240,.3)}
  .btn-outline{
    display:inline-flex;align-items:center;gap:8px;
    padding:13px 28px;border-radius:50px;cursor:pointer;
    background:transparent;color:var(--text);
    font-family:'DM Sans',sans-serif;font-weight:500;font-size:15px;
    border:1px solid var(--border);transition:border-color .2s,background .2s;
    text-decoration:none;
  }
  .btn-outline:hover{border-color:var(--cyan);background:rgba(0,200,240,.06)}
  .card{
    background:var(--card);border-radius:var(--radius);
    border:1px solid var(--border);padding:28px;
    transition:border-color .3s,transform .3s,box-shadow .3s;
  }
  .card:hover{border-color:rgba(0,200,240,.35);transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.4)}
  .tag{
    display:inline-block;padding:4px 12px;border-radius:50px;
    background:rgba(0,200,240,.1);border:1px solid rgba(0,200,240,.25);
    color:var(--cyan);font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
  }
  nav a{text-decoration:none;color:var(--muted);font-size:14px;font-weight:500;transition:color .2s}
  nav a:hover{color:var(--text)}
  input,textarea,select{
    width:100%;background:var(--bg3);border:1px solid var(--border);border-radius:10px;
    color:var(--text);font-family:'DM Sans',sans-serif;font-size:14px;padding:12px 16px;
    outline:none;transition:border-color .2s;
  }
  input:focus,textarea:focus,select:focus{border-color:var(--cyan)}
  input::placeholder,textarea::placeholder{color:var(--muted)}
  ::-webkit-scrollbar{width:6px}
  ::-webkit-scrollbar-track{background:var(--bg)}
  ::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
  .grid-bg{
    position:absolute;inset:0;
    background-image:linear-gradient(rgba(0,200,240,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,200,240,.04) 1px,transparent 1px);
    background-size:60px 60px;pointer-events:none;
  }
  .noise{position:absolute;inset:0;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");pointer-events:none}
`;

const services = [
  {
    id: 1,
    icon: "📊",
    label: "Data Services",
    color: "#00C8F0",
    description: "Accurate, scalable data solutions tailored to your business workflow.",
    items: ["Data Entry & Collection", "Data Cleaning", "Excel & Google Sheets", "CRM Management"],
    pricing: { starter: 299, professional: 599, enterprise: "Custom" },
    turnaround: "24-48 hours",
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
  },
];

const stats = [
  { val: 200, suffix: "+", label: "Projects Delivered" },
  { val: 50, suffix: "+", label: "Expert Professionals" },
  { val: 98, suffix: "%", label: "Client Satisfaction" },
  { val: 15, suffix: "+", label: "Countries Served" },
];

const whys = [
  { icon: "⚡", title: "Fast Turnaround", desc: "Dedicated teams ensure your projects are delivered on time, every time." },
  { icon: "💰", title: "Cost Effective", desc: "Save up to 70% compared to hiring locally — without compromising quality." },
  { icon: "🔒", title: "Secure & Reliable", desc: "NDA-protected workflows with strict data confidentiality standards." },
  { icon: "📈", title: "Scalable Teams", desc: "Scale up or down instantly based on your project demands." },
  { icon: "🌐", title: "Global Expertise", desc: "Professionals vetted across data, tech, marketing, and creative fields." },
  { icon: "💬", title: "24/7 Support", desc: "Always-on communication across all time zones for seamless collaboration." },
];

const testimonials = [
  {
    name: "Sarah M.",
    role: "Founder, eCommerce Brand — USA",
    text: "Taskmetry's team handled our data entry and SEO flawlessly. We saw a 40% increase in organic traffic within 3 months. Absolutely recommend them.",
    avatar: "SM",
  },
  {
    name: "James K.",
    role: "CEO, SaaS Startup — UK",
    text: "We hired a dedicated remote team for web development. The quality was exceptional and at a fraction of the cost of local talent. Game-changer.",
    avatar: "JK",
  },
  {
    name: "Priya R.",
    role: "YouTube Creator — Canada",
    text: "Their video editing team is phenomenal. Fast, creative, and they understand my style perfectly. My channel grew 25k subs after switching.",
    avatar: "PR",
  },
];

const clients = ["Startups", "E-commerce Brands", "SaaS Companies", "YouTubers & Creators", "Agencies", "Coaches & Consultants", "Small Businesses"];

function useInView(ref) {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return vis;
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 720);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

function CountUp({ end, suffix, start }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let cur = 0;
    const step = end / 50;
    const timer = setInterval(() => {
      cur = Math.min(cur + step, end);
      setVal(Math.floor(cur));
      if (cur >= end) clearInterval(timer);
    }, 30);
    return () => clearInterval(timer);
  }, [start, end]);
  return <span>{val}{suffix}</span>;
}

function Orb({ style }) {
  return (
    <div style={{
      position: "absolute", borderRadius: "50%",
      filter: "blur(80px)", pointerEvents: "none",
      animation: "pulse 6s ease-in-out infinite",
      ...style,
    }} />
  );
}

export default function Taskmetry() {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const statsRef = useRef(null);
  const statsVis = useInView(statsRef);

  useEffect(() => {
    const s = `<style>${FONTS}${STYLES}</style>`;
    if (!document.getElementById("tm-styles")) {
      const el = document.createElement("div");
      el.id = "tm-styles";
      el.innerHTML = s;
      document.head.appendChild(el);
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".fade-up, .slide-in");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", service: "", message: "" });
    }, 3000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 5%", height: 68,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(6,8,15,.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all .3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,var(--cyan),#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 14, fontFamily: "Syne" }}>T</span>
          </div>
          <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18, letterSpacing: "-.01em" }}>Taskmetry</span>
        </div>
        <div style={{ display: "flex", gap: isMobile ? 0 : 32, alignItems: "center" }}>
          {["Services", "Why Us", "Work", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(" ", "")}`} style={{ display: isMobile ? "none" : "inline", textDecoration: "none", color: "var(--muted)", fontSize: 14, fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => e.target.style.color = "var(--text)"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>
              {item}
            </a>
          ))}
          <button className="btn-primary" style={{ padding: isMobile ? "9px 14px" : "9px 22px", fontSize: isMobile ? 13 : 14 }}
            onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
            Get a Quote
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: isMobile ? "auto" : "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: isMobile ? "104px 5% 56px" : "120px 5% 80px", overflow: "hidden" }}>
        <div className="grid-bg" />
        <div className="noise" />
        <Orb style={{ width: 500, height: 500, top: "10%", left: "-10%", background: "rgba(0,200,240,.07)" }} />
        <Orb style={{ width: 400, height: 400, bottom: "5%", right: "-8%", background: "rgba(124,58,237,.08)", animationDelay: "3s" }} />
        <Orb style={{ width: 200, height: 200, top: "40%", right: "25%", background: "rgba(245,166,35,.05)", animationDelay: "1.5s" }} />

        {[
          { w: 60, h: 60, top: "15%", left: "8%", rot: "45deg", color: "rgba(0,200,240,.15)", delay: "0s" },
          { w: 40, h: 40, top: "70%", left: "6%", rot: "30deg", color: "rgba(124,58,237,.2)", delay: "1s" },
          { w: 80, h: 80, top: "20%", right: "8%", rot: "15deg", color: "rgba(245,166,35,.12)", delay: "2s" },
          { w: 35, h: 35, bottom: "20%", right: "12%", rot: "60deg", color: "rgba(0,200,240,.18)", delay: ".5s" },
        ].map((s, i) => (
          <div key={i} style={{
            position: "absolute", top: s.top, bottom: s.bottom, left: s.left, right: s.right,
            width: s.w, height: s.h, borderRadius: 8,
            border: `1.5px solid ${s.color}`,
            transform: `rotate(${s.rot})`,
            animation: `float 5s ease-in-out infinite`,
            animationDelay: s.delay,
          }} />
        ))}

        <div style={{ textAlign: "center", maxWidth: 820, position: "relative", zIndex: 2 }}>
          <div className="fade-up" style={{ animationDelay: ".1s" }}>
            <span className="tag" style={{ marginBottom: 24, display: "inline-block" }}>🌍 Trusted Globally · Remote-First</span>
          </div>
          <h1 className="fade-up" style={{ fontSize: isMobile ? "clamp(34px, 12vw, 48px)" : "clamp(42px, 7vw, 78px)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-.03em", marginBottom: 24, animationDelay: ".2s" }}>
            Scale Your Business<br />
            <span className="grad">Without Limits</span>
          </h1>
          <p className="fade-up" style={{ fontSize: 18, color: "var(--muted)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto 40px", animationDelay: ".35s" }}>
            Taskmetry is a digital outsourcing and remote workforce company — connecting startups and growing businesses with expert professionals worldwide.
          </p>
          <div className="fade-up" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", animationDelay: ".5s" }}>
            <button className="btn-primary" onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}>
              Book a Service ↓
            </button>
            <button className="btn-outline" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
              Talk to an Expert
            </button>
          </div>

          <div className="fade-up" style={{ marginTop: isMobile ? 36 : 64, display: "flex", gap: isMobile ? 10 : 32, justifyContent: "center", flexWrap: "wrap", animationDelay: ".65s" }}>
            {["🇺🇸 USA", "🇬🇧 UK", "🇨🇦 Canada", "🇦🇺 Australia"].map(c => (
              <span key={c} style={{ fontSize: 13, color: "var(--muted)", background: "var(--bg3)", padding: "6px 14px", borderRadius: 50, border: "1px solid var(--border)" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES - WITH BOOKING */}
      <section id="services" style={{ padding: isMobile ? "64px 5%" : "100px 5%", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: isMobile ? 40 : 64 }}>
          <span className="tag fade-up">What We Do</span>
          <h2 className="fade-up" style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, marginTop: 16, marginBottom: 16, letterSpacing: "-.02em" }}>
            Our <span className="grad">Core Services</span>
          </h2>
          <p className="fade-up" style={{ color: "var(--muted)", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>
            End-to-end digital solutions powered by skilled remote professionals.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(320px, 1fr))", gap: 20, maxWidth: 1200, margin: "0 auto" }}>
          {services.map((s, i) => (
            <div key={s.label} className="card fade-up" style={{ animationDelay: `${i * .08}s`, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "0 0 0 80px", background: `${s.color}0D` }} />
              <div>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, fontFamily: "Syne" }}>{s.label}</h3>
                <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.65, marginBottom: 18 }}>{s.description}</p>
                
                {/* Pricing tiers */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
                  <div style={{ background: "rgba(0,200,240,.06)", padding: 12, borderRadius: 8, textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Starter</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--cyan)" }}>${s.pricing.starter}</div>
                  </div>
                  <div style={{ background: "rgba(124,58,237,.06)", padding: 12, borderRadius: 8, textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>Pro</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "#7C3AED" }}>${s.pricing.professional}</div>
                  </div>
                </div>

                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                  {s.items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--muted)" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.color, flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 18, display: "flex", alignItems: "center", gap: 6 }}>
                  <span>⏱️</span> Turnaround: {s.turnaround}
                </div>
              </div>

              <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
                <Link href={`/booking/${s.id}`} style={{ flex: 1 }}>
                  <button style={{ width: "100%", background: s.color, color: "#fff", border: "none", padding: "10px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "DM Sans", transition: "opacity .2s" }}
                    onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                    Book Now →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} style={{ padding: isMobile ? "56px 5%" : "80px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden" }}>
        <Orb style={{ width: 300, height: 300, top: "-50%", left: "50%", background: "rgba(0,200,240,.05)" }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24, maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          {stats.map(s => (
            <div key={s.label} className="fade-up">
              <div style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 800, fontFamily: "Syne", background: "linear-gradient(135deg,var(--cyan),#7C3AED)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                <CountUp end={s.val} suffix={s.suffix} start={statsVis} />
              </div>
              <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section id="whyus" style={{ padding: isMobile ? "64px 5%" : "100px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 36 : 80, alignItems: "center" }}>
            <div>
              <span className="tag slide-in">Why Taskmetry</span>
              <h2 className="slide-in" style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, marginTop: 16, marginBottom: 20, letterSpacing: "-.02em", lineHeight: 1.15 }}>
                The Smarter Way to<br /><span className="grad-amber">Grow Your Business</span>
              </h2>
              <p className="slide-in" style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.75, marginBottom: 32 }}>
                We combine top-tier remote talent with streamlined processes, so you get enterprise-level results at startup-friendly costs.
              </p>
              <button className="btn-primary slide-in" onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}>
                Start Working With Us
              </button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }}>
              {whys.map((w, i) => (
                <div key={w.title} className="card fade-up" style={{ padding: 20, animationDelay: `${i * .1}s` }}>
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{w.icon}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, fontFamily: "Syne", marginBottom: 6 }}>{w.title}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TARGET CLIENTS */}
      <section style={{ padding: isMobile ? "56px 5%" : "80px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="tag fade-up">Who We Serve</span>
          <h2 className="fade-up" style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, marginTop: 14, letterSpacing: "-.02em" }}>
            Built for <span className="grad">Every Ambitious Business</span>
          </h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 800, margin: "0 auto" }}>
          {clients.map((c, i) => (
            <div key={c} className="fade-up" style={{
              animationDelay: `${i * .07}s`,
              padding: "12px 24px", borderRadius: 50,
              background: "var(--card)", border: "1px solid var(--border)",
              fontSize: 15, fontWeight: 500,
              transition: "all .25s", cursor: "default",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.background = "rgba(0,200,240,.07)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--card)"; }}>
              {c}
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: isMobile ? "64px 5%" : "100px 5%" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="tag fade-up">Testimonials</span>
          <h2 className="fade-up" style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, marginTop: 14, letterSpacing: "-.02em" }}>
            What Our <span className="grad">Clients Say</span>
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, maxWidth: 1100, margin: "0 auto" }}>
          {testimonials.map((t, i) => (
            <div key={t.name} className="card fade-up" style={{ animationDelay: `${i * .1}s`, position: "relative" }}>
              <div style={{ fontSize: 40, color: "var(--cyan)", opacity: .3, fontFamily: "Syne", lineHeight: 1, marginBottom: 12 }}>"</div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "var(--text)", marginBottom: 24 }}>{t.text}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "linear-gradient(135deg,var(--cyan),#7C3AED)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700, color: "#fff",
                }}>
                  {t.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: "Syne" }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section id="work" style={{ padding: isMobile ? "56px 5%" : "80px 5%" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          background: "linear-gradient(135deg,rgba(0,200,240,.08),rgba(124,58,237,.08))",
          border: "1px solid rgba(0,200,240,.2)", borderRadius: isMobile ? 16 : 24, padding: isMobile ? "44px 5%" : "64px 5%",
          textAlign: "center", position: "relative", overflow: "hidden",
        }}>
          <div className="grid-bg" />
          <Orb style={{ width: 300, height: 300, top: "-30%", left: "10%", background: "rgba(0,200,240,.06)" }} />
          <Orb style={{ width: 250, height: 250, bottom: "-20%", right: "10%", background: "rgba(124,58,237,.07)" }} />
          <h2 className="fade-up" style={{ fontSize: "clamp(30px, 5vw, 54px)", fontWeight: 800, letterSpacing: "-.02em", position: "relative", zIndex: 2 }}>
            Ready to Scale Smarter?
          </h2>
          <p className="fade-up" style={{ color: "var(--muted)", fontSize: 18, margin: "16px auto 36px", maxWidth: 480, position: "relative", zIndex: 2 }}>
            Join 200+ businesses that outsource smartly with Taskmetry and reclaim their time.
          </p>
          <div className="fade-up" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative", zIndex: 2 }}>
            <button className="btn-primary" onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}>
              Browse Services
            </button>
            <a href="https://taskmetry.work" target="_blank" rel="noopener noreferrer"
              style={{ textDecoration: "none" }}>
              <button className="btn-outline">Visit Taskmetry.work ↗</button>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: isMobile ? "64px 5%" : "100px 5%", background: "var(--bg2)", borderTop: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.3fr", gap: isMobile ? 36 : 80, alignItems: "start" }}>
          <div>
            <span className="tag slide-in">Contact Us</span>
            <h2 className="slide-in" style={{ fontSize: "clamp(30px, 4vw, 48px)", fontWeight: 800, marginTop: 16, marginBottom: 20, letterSpacing: "-.02em", lineHeight: 1.15 }}>
              Let's Build Something <span className="grad">Great Together</span>
            </h2>
            <p className="slide-in" style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.75, marginBottom: 36 }}>
              Tell us what you need, and we'll match you with the right remote professionals within 48 hours.
            </p>
            {[
              { icon: "🌐", label: "Website", val: "taskmetry.work" },
              { icon: "📧", label: "Email", val: "hello@taskmetry.work" },
              { icon: "💬", label: "Response Time", val: "Within 24 hours" },
            ].map(c => (
              <div key={c.label} className="slide-in" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{c.icon}</div>
                <div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 500 }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>

          {!submitted ? (
            <form className="card fade-up" style={{ padding: isMobile ? 22 : 36 }} onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 8 }}>Full Name</label>
                  <input placeholder="John Smith" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                </div>
                <div>
                  <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 8 }}>Email Address</label>
                  <input type="email" placeholder="john@company.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                </div>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 8 }}>Service Needed</label>
                <select value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })} required>
                  <option value="">Select a service…</option>
                  {services.map(s => <option key={s.label} value={s.label}>{s.label}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 13, color: "var(--muted)", display: "block", marginBottom: 8 }}>Tell Us About Your Project</label>
                <textarea rows={4} placeholder="Describe your needs, timeline, and goals…" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ resize: "vertical" }} required />
              </div>
              <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Send Message →
              </button>
            </form>
          ) : (
            <div className="card fade-up" style={{ padding: 36, textAlign: "center" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, fontFamily: "Syne", marginBottom: 12 }}>Message Received!</h3>
              <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.7 }}>
                Thank you for reaching out. Our team will get back to you within 24 hours with a tailored proposal.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "var(--bg)", borderTop: "1px solid var(--border)", padding: isMobile ? "44px 5% 32px" : "60px 5% 40px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr 1fr", gap: isMobile ? 28 : 48, marginBottom: isMobile ? 32 : 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,var(--cyan),#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontWeight: 800, fontSize: 14, fontFamily: "Syne" }}>T</span>
                </div>
                <span style={{ fontFamily: "Syne", fontWeight: 700, fontSize: 18 }}>Taskmetry</span>
              </div>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.75, maxWidth: 260 }}>
                Digital outsourcing and remote workforce solutions for startups and growing businesses worldwide.
              </p>
            </div>
            {[
              { title: "Services", links: ["Data Entry", "Web Development", "SEO", "Video Editing", "Virtual Assistance", "Remote Staffing"] },
              { title: "Company", links: ["About", "Portfolio", "Blog", "Careers", "Contact"] },
              { title: "Markets", links: ["USA", "UK", "Canada", "Australia", "Europe"] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "Syne", marginBottom: 16, color: "var(--text)" }}>{col.title}</div>
                {col.links.map(link => (
                  <div key={link} style={{ fontSize: 13, color: "var(--muted)", marginBottom: 10, cursor: "pointer", transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "var(--text)"} onMouseLeave={e => e.target.style.color = "var(--muted)"}>{link}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>© 2025 Taskmetry. All rights reserved.</span>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>Taskmetry.work · Built with ❤️ for global businesses</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
