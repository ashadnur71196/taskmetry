# Development Guide - Taskmetry

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Server will start at `http://localhost:3000`

### 3. Start Building
- Edit `/app/page.jsx` for homepage
- Edit `/app/booking/[serviceId]/page.jsx` for booking page
- Modify colors in `/app/globals.css`

## Project Files Overview

| File | Purpose |
|------|---------|
| `app/page.jsx` | Main homepage with service cards and booking CTAs |
| `app/booking/[serviceId]/page.jsx` | Dynamic booking page with form and payment setup |
| `app/layout.jsx` | Root layout wrapper and metadata |
| `app/globals.css` | Global CSS variables and base styles |
| `package.json` | Dependencies and scripts |
| `next.config.js` | Next.js configuration |
| `public/favicon.ico` | Website icon |

## Making Changes

### Add a New Service
1. Open `/app/page.jsx`
2. Add to the `servicesData` array in `/app/booking/[serviceId]/page.jsx`
3. The service will automatically appear on:
   - Homepage service grid
   - Booking page

### Update Pricing
Edit the `pricing` object in service data:
```javascript
pricing: { 
  starter: 299,      // Change starter price
  professional: 599, // Change pro price
  enterprise: "Custom" // Enterprise pricing
}
```

### Customize Colors
All colors are CSS variables in `/app/globals.css`:
- `--cyan` - Primary accent
- `--amber` - Secondary accent
- `--bg` - Main background
- `--text` - Text color

### Update Contact Info
In `/app/page.jsx`, find the contact section and update:
- Email address
- Website URL
- Phone number
- Response time

## Deployment

### To Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### To GitHub Pages
```bash
npm run build
# Deploy the `.next` folder
```

### To Traditional Hosting
```bash
npm run build
npm run start
```
Then copy entire directory to your hosting.

## Features Implementation

### Payment Integration (Stripe)
1. Sign up at [stripe.com](https://stripe.com)
2. Copy API keys to `.env.local`
3. Install Stripe React library:
   ```bash
   npm install @stripe/stripe-js @stripe/react-stripe-js
   ```
4. Update booking page with Stripe checkout

### Email Notifications
1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Add API key to `.env.local`
3. Create API route in `app/api/send-email.js`

### Analytics
Add Google Analytics ID to `.env.example` and update `app/layout.jsx`

## Testing

### Manual Testing Checklist
- [ ] All service cards load
- [ ] Booking buttons navigate correctly
- [ ] Form validation works
- [ ] Responsive on mobile
- [ ] All links work
- [ ] Contact form submits
- [ ] Smooth scrolling works

### Browser Testing
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Mobile Safari (iPhone)
- [ ] Mobile Chrome (Android)

## Troubleshooting

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Image Not Loading
- Check `/public` folder
- Verify file path is correct
- Ensure file format is supported

## Performance Tips

1. **Minimize Images** - Use WebP format
2. **Code Splitting** - Next.js does this automatically
3. **Lazy Loading** - Images load on scroll
4. **Cache Strategy** - Static pages are pre-rendered

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks Guide](https://react.dev/reference/react/hooks)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel Deployment](https://vercel.com/docs)

---

Happy coding! 🚀
