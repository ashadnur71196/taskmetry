# Taskmetry - Digital Outsourcing & Remote Workforce Platform

A professional, modern Next.js website for booking digital services. Taskmetry connects startups and growing businesses with expert remote professionals worldwide.

## Features

✨ **Professional Booking System**
- Dynamic service catalog with 6 core services
- Real-time pricing tiers (Starter, Professional, Enterprise)
- Comprehensive booking form with payment integration ready
- Service details page with included features and turnaround times

🎨 **Modern Design**
- Dark theme with cyan/purple gradient accents
- Responsive grid layouts
- Smooth animations and transitions
- Glassmorphism effects
- Professional typography (Syne + DM Sans fonts)

📱 **Services Offered**
1. **Data Services** - Data entry, cleaning, Excel, CRM
2. **Web Development** - Frontend, backend, React, Next.js, WordPress
3. **SEO** - Technical audits, content optimization, link building
4. **Video Editing** - Short-form content, motion graphics, thumbnails
5. **Virtual Assistance** - Admin, email, customer support, research
6. **Remote Staffing** - Dedicated teams, outsourcing, talent matching

🔐 **Security & Trust**
- Professional contact information
- Service level agreements
- Client testimonials
- Global reach (USA, UK, Canada, Australia)

## Project Structure

```
taskmetry/
├── app/
│   ├── page.jsx                    # Homepage with services catalog
│   ├── layout.jsx                  # Root layout with metadata
│   ├── globals.css                 # Global styles
│   └── booking/
│       └── [serviceId]/
│           └── page.jsx            # Booking details & payment page
├── public/
│   └── favicon.ico                 # Brand icon
├── package.json                    # Dependencies
├── next.config.js                  # Next.js configuration
└── README.md                       # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
# or
yarn install
```

2. **Run the development server:**
```bash
npm run dev
# or
yarn dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
npm run start
```

## Key Pages

### Homepage (`/`)
- Hero section with value proposition
- Service showcase with booking CTAs
- Statistics and social proof
- Why Taskmetry section
- Client testimonials
- Contact form
- Footer with links

### Service Booking (`/booking/[serviceId]`)
- Service details and description
- Included features list
- Pricing tier selection
- Booking form with fields:
  - Name, Email, Phone
  - Company (optional)
  - Start Date
  - Project Scope
- Payment method selection
- Order summary
- Booking confirmation page

## Customization

### Services
Edit the `services` array in `/app/page.jsx` to add, remove, or modify services:
```javascript
const services = [
  {
    id: 1,
    icon: "📊",
    label: "Data Services",
    color: "#00C8F0",
    description: "...",
    items: [...],
    pricing: { starter: 299, professional: 599, enterprise: "Custom" },
    turnaround: "24-48 hours",
  },
  // Add more services...
];
```

### Colors & Styling
Update CSS variables in `/app/globals.css`:
```css
:root {
  --bg: #06080F;           /* Main background */
  --cyan: #00C8F0;         /* Primary accent */
  --amber: #F5A623;        /* Secondary accent */
  --text: #E8EAF2;         /* Text color */
  /* ... more variables */
}
```

### Content
- Update company info in footer
- Modify testimonials array
- Change stats and metrics
- Edit "Why Us" section features

## Payment Integration

The booking page is prepared for payment integration. To enable payments:

1. **Stripe Integration** (recommended):
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

2. Update `/app/booking/[serviceId]/page.jsx` to handle Stripe checkout

3. Set up webhooks for payment confirmation

## Features to Add

- [ ] Email notifications (Nodemailer/SendGrid)
- [ ] Stripe/PayPal integration
- [ ] User dashboard
- [ ] Service portfolio
- [ ] Blog system
- [ ] Admin panel
- [ ] Analytics
- [ ] Multi-language support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Next.js image optimization
- Lazy loading animations
- Optimized CSS-in-JS
- Responsive images
- Font optimization with Google Fonts

## License

MIT License - feel free to use for your projects

## Support

For questions or support:
- Email: hello@taskmetry.work
- Website: taskmetry.work
- Response time: Within 24 hours

---

**Built with ❤️ for global businesses**
