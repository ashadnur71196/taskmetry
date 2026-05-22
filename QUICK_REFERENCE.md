# Taskmetry - Developer Quick Reference

## 🚀 Command Cheatsheet

```bash
# Setup
npm install                 # Install dependencies
npm run dev                 # Start dev server (port 3000)
npm run build              # Build for production
npm run start              # Start production server

# Git
git add .
git commit -m "message"
git push origin main
```

## 📂 File Locations

| Need to... | Go to... |
|-----------|---------|
| Edit homepage | `app/page.jsx` (line 200+) |
| Edit booking page | `app/booking/[serviceId]/page.jsx` |
| Change colors | `app/globals.css` (--cyan, --amber, --bg, --text) |
| Add services | `app/page.jsx` services array + `app/booking/[serviceId]/page.jsx` servicesData |
| Update contact info | `app/page.jsx` footer section |
| Change pricing | `app/page.jsx` services array |

## 🎨 CSS Variables

```css
:root {
  --bg: #06080F;          /* Main background */
  --bg2: #0C0F1A;         /* Secondary background */
  --cyan: #00C8F0;        /* Primary accent */
  --amber: #F5A623;       /* Secondary accent */
  --text: #E8EAF2;        /* Text color */
  --muted: #7A7F9A;       /* Muted text */
  --border: #1C2035;      /* Border color */
  --card: #0F1220;        /* Card background */
}
```

## 🔗 Routes

```
/                        Homepage
/booking/1              Data Services booking
/booking/2              Web Development booking
/booking/3              SEO booking
/booking/4              Video Editing booking
/booking/5              Virtual Assistance booking
/booking/6              Remote Staffing booking
```

## 📊 Component Structure

### Homepage (app/page.jsx)
- Navbar (fixed, sticky on scroll)
- Hero section
- Services grid (6 cards with booking CTAs)
- Statistics section
- Why Us section (2 column layout)
- Clients section
- Testimonials
- CTA banner
- Contact form
- Footer

### Booking Page (app/booking/[serviceId]/page.jsx)
- Navbar with back button
- Service header with icon/title
- Left: Service details + features
- Right: Booking form + pricing

## 💻 React Hooks Used

```javascript
useState()           // State management
useEffect()          // Side effects
useRef()             // DOM references
useInView()          // Intersection observer (scroll animation)
```

## 🎯 Common Edits

### Change a service name
```javascript
// app/page.jsx - line ~80
{
  label: "NEW NAME HERE",  // Change this
  ...
}
```

### Update pricing
```javascript
pricing: { 
  starter: 299,        // Starter price
  professional: 599,   // Pro price
  enterprise: "Custom" // Enterprise option
}
```

### Update contact email
```javascript
// app/page.jsx - line ~950
{ icon: "📧", label: "Email", val: "hello@taskmetry.work" }
```

### Change brand color
```css
/* app/globals.css */
:root {
  --cyan: #00C8F0;  /* Change to your color */
}
```

## 🔌 API Integration Points

```javascript
// Email notifications
POST /api/send-email
body: { name, email, serviceName, amount }

// Payment processing
POST /api/process-payment
body: { email, serviceId, amount, paymentMethod }

// Booking confirmation
POST /api/save-booking
body: { name, email, phone, company, startDate, scope, serviceId }
```

## 📦 Package Dependencies

```json
{
  "next": "^14.0.0",      // Next.js framework
  "react": "^18.2.0",     // React library
  "react-dom": "^18.2.0"  // React DOM
}
```

## 🎬 Animation Classes

```css
.fade-up          /* Fade in upward */
.slide-in         /* Slide from left */
.visible          /* Animation trigger class */
```

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG....
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📱 Responsive Breakpoints

```css
Mobile:    375px - 768px    (1 column)
Tablet:    768px - 1024px   (2 columns)
Desktop:   1024px+          (3+ columns)
```

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| Changes not showing | Clear cache: `rm -rf .next && npm run dev` |
| Module not found | Run `npm install` again |
| Build error | Check for syntax errors with `npm run build` |

## 🚀 Deployment Checklist

- [ ] Update `.env.local` with production keys
- [ ] Test booking form end-to-end
- [ ] Check all images load
- [ ] Test on mobile devices
- [ ] Verify contact email
- [ ] Test payment integration
- [ ] Check error messages
- [ ] Run lighthouse audit
- [ ] Update favicon
- [ ] Deploy via Vercel/Netlify

## 📊 File Sizes (Approx)

```
app/page.jsx              ~25KB (gzipped: ~8KB)
app/booking/[...]/page.jsx ~18KB (gzipped: ~6KB)
Total build size          ~2MB
Time to interactive       < 2s
```

## 🔐 Security Tips

1. Always use environment variables for secrets
2. Validate form input on backend
3. Use HTTPS only
4. Implement rate limiting
5. Add CSRF protection
6. Sanitize user input
7. Use secure payment processors

## 📈 Performance Tips

1. Optimize images with Next.js Image component
2. Enable compression
3. Use CDN for static assets
4. Implement caching strategies
5. Lazy load below-fold content
6. Minify CSS/JS (automatic in Next.js)
7. Use dynamic imports for large components

## 🎓 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [React Hooks](https://react.dev/reference/react/hooks)
- [Web.dev Performance](https://web.dev/performance/)

---

**Last Updated:** 2025
**Version:** 1.0.0
