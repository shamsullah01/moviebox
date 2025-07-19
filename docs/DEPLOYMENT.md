# Deployment Guide

This guide covers different deployment options for the MovieBox Clone application.

## 🚀 Quick Deployment Options

### 1. Netlify (Recommended)
- **Pros**: Easy setup, automatic deployments, CDN, form handling
- **Cons**: Limited server-side functionality
- **Best for**: Static React apps, quick demos

### 2. Vercel
- **Pros**: Excellent performance, automatic deployments, edge functions
- **Cons**: Limited to Vercel ecosystem
- **Best for**: Next.js apps, serverless functions

### 3. GitHub Pages
- **Pros**: Free, integrated with GitHub
- **Cons**: Static only, limited custom domains
- **Best for**: Open source projects, documentation

### 4. Heroku
- **Pros**: Easy scaling, add-ons ecosystem
- **Cons**: Can be expensive, sleep mode on free tier
- **Best for**: Full-stack apps with backend

## 📋 Pre-deployment Checklist

- [ ] Environment variables configured
- [ ] Production build tested locally
- [ ] API endpoints verified
- [ ] Error handling implemented
- [ ] Performance optimized
- [ ] Security headers configured
- [ ] Analytics setup (optional)
- [ ] Domain name ready (optional)

## 🌐 Netlify Deployment

### Step 1: Prepare Your Repository
```bash
# Ensure your code is pushed to GitHub
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Build Configuration
Create `netlify.toml` in your project root:
```toml
[build]
  publish = "build"
  command = "npm run build"

[build.environment]
  REACT_APP_ENV = "production"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Step 3: Deploy via Git
1. **Login to Netlify**: https://app.netlify.com
2. **New site from Git**: Choose your repository
3. **Build settings**:
   - Build command: `npm run build`
   - Publish directory: `build`
4. **Environment variables**: Add your API keys
5. **Deploy site**

### Step 4: Configure Environment Variables
In Netlify dashboard → Site settings → Environment variables:
```
REACT_APP_MOVIEBOX_API=https://moviebox.ng/api
REACT_APP_MOVIEBOX_WEB=https://moviebox.ng
REACT_APP_TMDB_API_KEY=your_key_here
REACT_APP_ENV=production
```

### Step 5: Custom Domain (Optional)
1. **Domain settings** → Add custom domain
2. **DNS configuration**: Point your domain to Netlify
3. **HTTPS**: Netlify automatically provides SSL

## ⚡ Vercel Deployment

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login and Deploy
```bash
vercel login
vercel --prod
```

### Step 3: Configuration
Create `vercel.json`:
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "REACT_APP_ENV": "production"
  }
}
```

## 📄 GitHub Pages Deployment

### Step 1: Install gh-pages
```bash
npm install --save-dev gh-pages
```

### Step 2: Update package.json
```json
{
  "homepage": "https://yourusername.github.io/moviebox-clone",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Step 3: Deploy
```bash
npm run deploy
```

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
```nginx
events {
  worker_connections 1024;
}

http {
  include /etc/nginx/mime.types;
  default_type application/octet-stream;
  
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
  
  server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
      try_files $uri $uri/ /index.html;
    }
    
    location /static/ {
      expires 1y;
      add_header Cache-Control "public, immutable";
    }
  }
}
```

### Build and Run
```bash
docker build -t moviebox-clone .
docker run -p 3000:80 moviebox-clone
```

## ☁️ AWS S3 + CloudFront Deployment

### Step 1: Build Application
```bash
npm run build
```

### Step 2: Create S3 Bucket
```bash
aws s3 mb s3://your-moviebox-clone-bucket
aws s3 website s3://your-moviebox-clone-bucket --index-document index.html --error-document index.html
```

### Step 3: Upload Files
```bash
aws s3 sync build/ s3://your-moviebox-clone-bucket --delete
```

### Step 4: Create CloudFront Distribution
```bash
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

## 🔧 Environment Configuration

### Production Environment Variables
```env
# Production API endpoints
REACT_APP_MOVIEBOX_API=https://moviebox.ng/api
REACT_APP_MOVIEBOX_WEB=https://moviebox.ng
REACT_APP_ENV=production

# API Keys (keep secure)
REACT_APP_TMDB_API_KEY=your_production_key
REACT_APP_OMDB_API_KEY=your_production_key

# Analytics
REACT_APP_GOOGLE_ANALYTICS_ID=GA-XXXXXXXXX
REACT_APP_UTM_SOURCE=moviebox-clone

# CDN URLs (if using)
REACT_APP_IMAGE_CDN=https://your-cdn.com/images
REACT_APP_VIDEO_CDN=https://your-cdn.com/videos
```

### Staging Environment
```env
REACT_APP_ENV=staging
REACT_APP_MOVIEBOX_API=https://staging-moviebox.ng/api
# ... other staging-specific variables
```

## 🚀 Performance Optimization

### 1. Bundle Analysis
```bash
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### 2. Code Splitting
```javascript
// Lazy load components
const Movie = lazy(() => import('./pages/Movie'));
const Home = lazy(() => import('./pages/Home'));
```

### 3. Image Optimization
```javascript
// Use WebP format with fallbacks
<picture>
  <source srcSet="movie.webp" type="image/webp" />
  <img src="movie.jpg" alt="Movie poster" />
</picture>
```

### 4. Caching Strategy
```javascript
// Service worker for caching
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

## 🔐 Security Configuration

### 1. Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.themoviedb.org https://moviebox.ng;
">
```

### 2. Environment Variable Security
- Never commit API keys to version control
- Use environment variables or secret management
- Rotate keys regularly
- Monitor for exposed secrets

### 3. HTTPS Configuration
```nginx
# Force HTTPS redirect
server {
  listen 80;
  server_name your-domain.com;
  return 301 https://$server_name$request_uri;
}

server {
  listen 443 ssl http2;
  server_name your-domain.com;
  
  ssl_certificate /path/to/cert.pem;
  ssl_certificate_key /path/to/key.pem;
  
  # Security headers
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
  add_header X-Frame-Options DENY always;
  add_header X-Content-Type-Options nosniff always;
}
```

## 📊 Monitoring & Analytics

### 1. Google Analytics Setup
```javascript
// In public/index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA-XXXXXXXXX');
</script>
```

### 2. Error Monitoring
```bash
npm install @sentry/react
```

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.REACT_APP_ENV,
});
```

### 3. Performance Monitoring
```javascript
// Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## 🔄 CI/CD Pipeline

### GitHub Actions (Included)
The repository includes a comprehensive CI/CD pipeline that:
- Runs tests on multiple Node.js versions
- Performs security scans
- Deploys to staging on `develop` branch
- Deploys to production on `main` branch
- Runs Lighthouse performance tests

### Manual Deployment Commands
```bash
# Build for production
npm run build

# Test the build locally
npm install -g serve
serve -s build

# Deploy to your chosen platform
npm run deploy  # If configured
```

## 🆘 Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variables Not Working**
   - Ensure variables start with `REACT_APP_`
   - Restart development server after adding variables
   - Check deployment platform's environment variable settings

3. **Routing Issues in Production**
   - Configure server for SPA routing
   - Add redirect rules (see Netlify example above)

4. **CORS Errors**
   - Configure API server CORS headers
   - Use proxy during development
   - Check production API endpoints

5. **Performance Issues**
   - Optimize images and assets
   - Implement code splitting
   - Use CDN for static assets
   - Enable gzip compression

### Debug Commands
```bash
# Analyze bundle size
npm run build
npx webpack-bundle-analyzer build/static/js/*.js

# Check for vulnerabilities
npm audit

# Test production build locally
npm run build && serve -s build
```

## 📞 Support

If you encounter deployment issues:
1. Check the troubleshooting section above
2. Review deployment platform documentation
3. Check GitHub Issues for similar problems
4. Create a new issue with deployment details

---

**Happy Deploying!** 🚀
