# Taskmetry - Deployment Guide

Complete guide to deploying Taskmetry to production.

## Deployment Options

### 1️⃣ Vercel (Recommended - Easiest)

**Advantages:**
- Free tier available
- Automatic deployments from Git
- Edge functions for API routes
- Built-in analytics
- SSL certificate included

**Steps:**

1. Push code to GitHub/GitLab
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "Import Project" and select your repository
4. Configure environment variables:
   - Add STRIPE_SECRET_KEY
   - Add any other needed keys
5. Click Deploy

**After Deployment:**
- Vercel gives you a live URL
- Set up custom domain in Vercel dashboard
- Enable auto-deployments on push

---

### 2️⃣ Netlify

**Steps:**

1. Create `netlify.toml`:
   ```toml
   [build]
   command = "npm run build"
   functions = "api"
   
   [[redirects]]
   from = "/*"
   to = "/index.html"
   status = 200
   ```

2. Push to GitHub

3. Connect at [netlify.com](https://netlify.com)

4. Configure environment variables in Netlify UI

---

### 3️⃣ DigitalOcean App Platform

**Steps:**

1. Go to [DigitalOcean App Platform](https://cloud.digitalocean.com/apps)

2. Create new app

3. Select GitHub repository

4. Configure:
   - Build command: `npm install && npm run build`
   - Run command: `npm start`

5. Add environment variables

6. Deploy

---

### 4️⃣ Traditional VPS/Hosting (AWS EC2, Linode, etc.)

**Requirements:**
- Ubuntu 20.04+ or similar Linux
- Node.js 18+
- PM2 for process management

**Steps:**

1. SSH into server:
   ```bash
   ssh user@your-domain.com
   ```

2. Install Node.js:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

3. Clone repository:
   ```bash
   git clone https://github.com/yourname/taskmetry.git
   cd taskmetry
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Build:
   ```bash
   npm run build
   ```

6. Install PM2:
   ```bash
   npm install -g pm2
   ```

7. Start with PM2:
   ```bash
   pm2 start "npm start" --name "taskmetry"
   pm2 startup
   pm2 save
   ```

8. Setup Nginx reverse proxy:
   ```bash
   sudo apt install nginx
   ```

   Create `/etc/nginx/sites-available/taskmetry`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/taskmetry /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

9. Setup SSL with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## Pre-Deployment Checklist

- [ ] Update `.env.local` with production keys
- [ ] Test all forms locally
- [ ] Check responsive design on mobile
- [ ] Update contact email
- [ ] Update company links
- [ ] Update testimonials (optional)
- [ ] Check all images load
- [ ] Test booking flow end-to-end
- [ ] Verify analytics setup
- [ ] Set up error tracking (Sentry)

---

## Environment Variables

Create `.env.production.local`:

```
STRIPE_SECRET_KEY=sk_live_xxx
SENDGRID_API_KEY=SG.xxx
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_GA_ID=G-xxx
```

---

## Domain Setup

### Using Vercel:
1. Go to Project Settings → Domains
2. Add custom domain
3. Point DNS records (Vercel provides instructions)

### Using Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Update DNS at registrar

### Using DigitalOcean:
1. Create DNS record pointing to App Platform IP
2. Add domain in DigitalOcean dashboard

---

## SSL Certificate

All major platforms (Vercel, Netlify, DigitalOcean) provide free SSL.

For VPS with Let's Encrypt:
```bash
sudo certbot renew --dry-run
sudo certbot renew
```

---

## Monitoring & Maintenance

### Setup Error Tracking
```bash
npm install @sentry/nextjs
```

### Monitor Performance
- Use Vercel Analytics
- Check Core Web Vitals
- Monitor uptime

### Backups
- GitHub auto-backup (repository)
- Database backups if using PostgreSQL
- S3 backups for uploads

---

## Scaling Tips

1. **Static Generation:** Use Next.js ISR for CMS content
2. **Image Optimization:** Enable auto-optimization
3. **Database:** Use managed services (AWS RDS, DigitalOcean DB)
4. **CDN:** Automatic with Vercel, or use Cloudflare
5. **Caching:** Configure Redis for sessions

---

## Updating Production

### Rolling Updates (Zero Downtime)
```bash
# On your local machine
git add .
git commit -m "Update feature"
git push origin main

# Vercel/Netlify auto-deploys on push
# For VPS: SSH and run git pull
```

---

## Cost Estimates

| Platform | Cost | Notes |
|----------|------|-------|
| **Vercel** | Free - $20/mo | Best for Next.js |
| **Netlify** | Free - $19/mo | Good alternative |
| **DigitalOcean** | $6 - $40/mo | VPS alternative |
| **AWS EC2** | $5 - $100+/mo | Pay-as-you-go |

---

## Troubleshooting

### Build fails on Vercel
```
Clear cache: Settings → Git → Clear cache
Rebuild
```

### High memory usage
- Enable Node memory limits
- Use database connection pooling
- Optimize images

### Slow API responses
- Add database indexes
- Implement caching
- Use CDN for static files

---

## Support & Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment/static-exports)
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com/)
- [DigitalOcean Docs](https://docs.digitalocean.com/)

---

**You're ready to ship! 🚀**
