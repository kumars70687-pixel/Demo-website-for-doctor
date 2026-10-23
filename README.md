# AuraCare Health - Modern Medical Clinic & Doctor Website

A modern, accessible, responsive website for a medical clinic or private practice with online appointment booking, doctor credentials, medical specializations, transparent fees, and patient reviews.

---

## Netlify Deployment Guide

The project is pre-configured with `netlify.toml` and `public/_redirects` for zero-configuration Netlify deployment.

### Build Settings Summary

| Setting | Value |
| :--- | :--- |
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |
| **Node Version** | `20.x` or newer (default on Netlify) |

---

### Method 1: Git Integration (Recommended)

1. Push this repository to **GitHub**, **GitLab**, or **Bitbucket**.
2. Log in to your [Netlify Dashboard](https://app.netlify.com/).
3. Click **"Add new site"** &rarr; **"Import an existing project"**.
4. Select your Git provider and repository.
5. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**. Every future push to your default branch will automatically trigger a production build.

---

### Method 2: Netlify CLI

You can deploy directly from your terminal using the Netlify CLI:

```bash
# 1. Build the production package
npm run build

# 2. Deploy to Netlify
npx netlify deploy --prod --dir=dist
```

Follow the interactive prompts to log in and select or create your Netlify site.

---

### Method 3: Netlify Drop (Manual Drag & Drop)

1. Run `npm run build` locally to generate the `/dist` directory.
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder into the upload zone.
4. Your site is live immediately!

---

### Included Netlify Configurations

- **`netlify.toml`**: Configures the build pipeline, sets security response headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`), enables long-term cache headers for static bundles in `/assets/`, and specifies single-page application (SPA) rewrite rules to `/index.html`.
- **`public/_redirects`**: Backup fallback rewrite (`/* /index.html 200`) ensuring deep links and browser refreshes work properly.
