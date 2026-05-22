# Taskmetry - Architecture & Data Flow

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      TASKMETRY PLATFORM                          │
│                   Next.js 14 + React 18                          │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                        FRONTEND LAYER                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────┐         ┌──────────────┐     ┌──────────────┐  │
│  │  Homepage    │         │  Booking     │     │  Confirmation│  │
│  │ (page.jsx)   │────────▶│  Page        │────▶│  Page        │  │
│  │              │         │ ([serviceId])│     │              │  │
│  └──────────────┘         └──────────────┘     └──────────────┘  │
│       │                          │                     ▲           │
│       │                          │                     │           │
│       ├──────────────────────────┴─────────────────────┘           │
│       │                                                             │
│  ┌────▼────────────────────────────────────────────────────────┐  │
│  │  Shared Components & Utilities                              │  │
│  ├─────────────────────────────────────────────────────────────┤  │
│  │ • Navigation (fixed top)                                    │  │
│  │ • Cards & Button Components                                │  │
│  │ • Form Validation                                          │  │
│  │ • Animation Classes (fade-up, slide-in)                   │  │
│  │ • React Hooks (useState, useEffect, useRef, custom)      │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                   STYLING & DESIGN SYSTEM                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─────────────────────────┐  ┌──────────────────────────────┐   │
│  │   globals.css           │  │   Inline Styles (JSX)        │   │
│  ├─────────────────────────┤  ├──────────────────────────────┤   │
│  │ • CSS Variables         │  │ • Component Styles           │   │
│  │ • Base Styles           │  │ • Responsive Layout          │   │
│  │ • Typography            │  │ • Animations & Transitions   │   │
│  │ • Scrollbar Styling     │  │ • Hover Effects              │   │
│  │ • Dark Theme            │  │ • Dynamic Colors             │   │
│  └─────────────────────────┘  └──────────────────────────────┘   │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                    DATA LAYER & STATE                              │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌──────────────────┐  ┌──────────────────┐  ┌────────────────┐  │
│  │ Services Array   │  │ Testimonials     │  │ Stats Data     │  │
│  │ (6 services)     │  │ (3 samples)      │  │ (4 metrics)    │  │
│  └──────────────────┘  └──────────────────┘  └────────────────┘  │
│           │                     │                     │            │
│           └─────────────────────┴─────────────────────┘            │
│                        │                                           │
│              ┌─────────▼─────────────────┐                        │
│              │  React State Management   │                        │
│              ├──────────────────────────┤                        │
│              │ • Form Data              │                        │
│              │ • Scroll Position        │                        │
│              │ • UI State               │                        │
│              │ • Animation States       │                        │
│              │ • Payment Status         │                        │
│              └──────────────────────────┘                        │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                  INTEGRATION POINTS (Ready)                        │
├──────────────────────────────────────────────────────────────────┤
│                                                                    │
│  ┌─────────────────┐  ┌──────────────────┐  ┌─────────────────┐  │
│  │ Payment APIs    │  │ Email Service    │  │ Analytics       │  │
│  ├─────────────────┤  ├──────────────────┤  ├─────────────────┤  │
│  │ • Stripe        │  │ • SendGrid       │  │ • Google        │  │
│  │ • PayPal        │  │ • Nodemailer     │  │ • Vercel        │  │
│  │ • Bank Transfer │  │ • Mailgun        │  │ • Custom        │  │
│  └─────────────────┘  └──────────────────┘  └─────────────────┘  │
│                                                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 📊 User Flow Diagram

```
┌─────────────────────────┐
│ User Visits Homepage    │
└────────────┬────────────┘
             │
             ▼
    ┌────────────────────┐
    │ Browse Services    │
    │ (6 options)        │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │ Click "Book Now"   │
    │ (On Service Card)  │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Booking Page                   │
    │ ├─ Service Details             │
    │ ├─ Features List               │
    │ ├─ Pricing Tiers               │
    │ └─ Booking Form                │
    └────────┬───────────────────────┘
             │
             ▼
    ┌────────────────────┐
    │ Fill Form          │
    │ • Name             │
    │ • Email            │
    │ • Phone            │
    │ • Company          │
    │ • Start Date       │
    │ • Scope Details    │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │ Select Tier        │
    │ • Starter          │
    │ • Professional     │
    │ • Enterprise       │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │ Choose Payment     │
    │ • Card             │
    │ • PayPal           │
    │ • Bank             │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────┐
    │ Review & Confirm   │
    │ • Order Summary    │
    │ • Total Price      │
    └────────┬───────────┘
             │
             ▼
    ┌────────────────────────────────┐
    │ Process Payment (API)          │
    │ ├─ Validate Payment            │
    │ ├─ Process Transaction         │
    │ └─ Save Booking                │
    └────────┬───────────────────────┘
             │
             ▼
    ┌──────────────────────────────────┐
    │ Confirmation Page                │
    │ ├─ Success Message               │
    │ ├─ Booking Details               │
    │ ├─ Next Steps                    │
    │ └─ Support Contact               │
    └──────────────────────────────────┘
             │
             ▼
    ┌───────────────────────────────────┐
    │ Send Confirmation Email (optional)│
    │ ├─ Booking Details                │
    │ ├─ Invoice                        │
    │ └─ Support Information            │
    └───────────────────────────────────┘
```

---

## 🗄️ File Structure & Dependencies

```
app/
│
├── page.jsx (Homepage)
│   ├── Imports: React hooks
│   ├── Data: 6 services, testimonials, stats
│   ├── Components: Navbar, Hero, Services, Stats, Why Us, etc.
│   └── Exports: Homepage component
│
├── booking/[serviceId]/page.jsx (Booking Page)
│   ├── Dynamic param: serviceId (1-6)
│   ├── Imports: Next.js Link, React hooks
│   ├── Data: Service details, payment info
│   ├── Components: Form, pricing, summary
│   └── Handlers: Form submission, payment
│
├── layout.jsx (Root Layout)
│   ├── Metadata configuration
│   ├── HTML/Body wrapper
│   └── Global provider (if needed)
│
└── globals.css (Global Styles)
    ├── CSS Variables (:root)
    ├── Base styles (*, html, body)
    ├── Utility classes
    └── Font imports
```

---

## 🔄 State Management Flow

```
┌─────────────────────────────────────┐
│  Component Mount                     │
└────────────┬────────────────────────┘
             │
             ▼
   ┌────────────────────────┐
   │ Initialize State:      │
   │ • formData             │
   │ • scrolled             │
   │ • submitted            │
   │ • paymentMethod        │
   │ • isProcessing         │
   └────────────┬───────────┘
             │
             ▼
   ┌────────────────────────┐
   │ useEffect Hooks Run:   │
   │ • Setup styles         │
   │ • Detect scroll        │
   │ • Observe animations   │
   └────────────┬───────────┘
             │
             ▼
   ┌────────────────────────┐
   │ User Interactions:     │
   │ • Click buttons        │
   │ • Fill forms           │
   │ • Select options       │
   │ • Scroll page          │
   └────────────┬───────────┘
             │
             ▼
   ┌────────────────────────┐
   │ Update State:          │
   │ • setFormData()        │
   │ • setScrolled()        │
   │ • setPaymentMethod()   │
   │ • setIsProcessing()    │
   └────────────┬───────────┘
             │
             ▼
   ┌────────────────────────┐
   │ Component Re-renders   │
   │ with New State         │
   └─────────────────────────┘
```

---

## 📦 Build & Deployment Pipeline

```
Local Development
    │
    ├─ npm install
    ├─ npm run dev (localhost:3000)
    ├─ Make changes
    └─ Test locally
         │
         ▼
   Push to GitHub
         │
         ▼
   Vercel/Netlify Webhook
         │
         ├─ npm install
         ├─ npm run build
         ├─ npm run start
         ├─ Run tests (optional)
         ├─ Deploy to edge
         └─ Invalidate cache
         │
         ▼
   Live on Production
         │
         ├─ Custom domain
         ├─ SSL certificate
         ├─ Analytics
         ├─ Error tracking
         └─ Performance monitoring
```

---

## 🎯 Performance Metrics

```
Target Performance:
├─ First Contentful Paint (FCP): < 1.5s
├─ Largest Contentful Paint (LCP): < 2.5s
├─ Cumulative Layout Shift (CLS): < 0.1
├─ Time to Interactive (TTI): < 3.8s
└─ Overall Lighthouse Score: > 90

Optimization Strategies:
├─ Server-side rendering (Next.js)
├─ Image optimization
├─ CSS minification
├─ JavaScript code splitting
├─ Font optimization
├─ Cache management
└─ CDN distribution
```

---

## 🔐 Security Layers

```
Frontend Security:
├─ Input validation
├─ Form sanitization
├─ CSRF protection (token-based)
└─ XSS prevention

Backend Security (Ready for):
├─ API authentication
├─ Rate limiting
├─ Request validation
├─ SQL injection prevention
├─ HTTPS/SSL enforcement
└─ Environment variables

Payment Security (Ready for):
├─ PCI DSS compliance
├─ Tokenization
├─ Webhook verification
└─ Fraud detection
```

---

## 📈 Scalability Plan

```
Current (Single Instance):
├─ Deployment: Single Vercel server
├─ Database: None (static)
├─ Cache: Client-side only
└─ Users: 1000+ concurrent

Phase 2 (With Database):
├─ Database: PostgreSQL
├─ Cache: Redis
├─ CDN: Cloudflare
└─ Users: 10,000+ concurrent

Phase 3 (Enterprise):
├─ Multi-region deployment
├─ Database replication
├─ Advanced caching
├─ Load balancing
├─ Auto-scaling
└─ Users: 1,000,000+ concurrent
```

---

## 🛠️ Technology Stack

```
Frontend:
├─ React 18 (UI library)
├─ Next.js 14 (framework)
├─ CSS (styling)
└─ JavaScript ES6+

Build & Deployment:
├─ Next.js CLI
├─ Webpack (bundler)
├─ Vercel (hosting)
└─ Git (version control)

Ready for Integration:
├─ Stripe API (payments)
├─ SendGrid API (emails)
├─ Google Analytics
├─ Sentry (error tracking)
└─ PostGreSQL (database)
```

---

**Architecture Last Updated:** 2025
**Diagram Version:** 1.0
