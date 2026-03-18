# Sai Shiva - Professional Portfolio

> A high-performance, responsive, and secure personal portfolio built with modern Web Standards (HTML5, CSS3, ES6+). This portfolio dynamically showcases expertise across **Full Stack Development, Data Analytics, Cybersecurity, and Low-Code Platforms**.

![Portfolio Preview Placeholder](images/portfolio.mp4) *(Replace this line with an actual screenshot of the deployed site in the future!)*

---

## 🎯 Project Goals & Architecture
This project follows **Clean Architecture** principles. Rather than all files sitting in a single directory, logic, style, and media are safely modularized into an `assets/` folder structure to ensure that the project is beginner-friendly to comprehend, simple to scale, and heavily optimized for Lighthouse metrics.

### Key Features 
- **Accessible & Semantic**: Uses modern standard HTML5 tags (`<nav>`, `<article>`, `<address>`) coupled with ARIA labels to ensure screen-reader compliance.
- **Zero Dependencies**: Pure Vanilla Javascript means instantaneous load speeds and no reliance on bulky libraries like jQuery.
- **Micro-Interactions**: Complex Intersection Observers mapped to smooth CSS3 keyframe animations. 
- **Light / Dark Mode State Management**: Centralized custom CSS variables manage the visual presentation, offering dynamic theme toggling via data-attributes.
- **Performance Optimized**: Implements non-render-blocking scripts (`defer`), optimized asset delivery pipelines, and lazy loaded mechanics.

---

## 📂 Repository Structure

```text
├── index.html                  # Core HTML structure and layout
├── README.md                   # Project documentation
└── assets/                     # Segmented assets directory
    ├── css/
    │   └── styles.css          # Master stylesheet utilizing BEM concepts & variables
    ├── js/
    │   └── script.js           # Centralized event listeners and animation logic
    └── images/
        └── profile.jpeg        # Optimized media files
```

---

## 🚀 Deployment Guide (Production Phase)

This portfolio is entirely static and requires no backend processing. You can host this for **free** on multiple production-grade hosting services.

### Option 1: GitHub Pages (Recommended)
1. Navigate to your GitHub repository `Settings` at the top right.
2. Under "Code and automation," click **Pages**.
3. Under "Build and deployment", set the source to **Deploy from a branch**.
4. Set the branch to `main` (or `master`), select the `/ (root)` directory, and click **Save**.
5. GitHub will provide a live link in roughly 1-2 minutes!

### Option 2: Netlify 
1. Log in to [Netlify](https://app.netlify.com/).
2. Click **Add new site** -> **Import an existing project**.
3. Connect your GitHub account and select this repository.
4. Leave all build settings blank/default (since this is Vanilla HTML) and click **Deploy Site**. This is exceptionally fast and automatically runs a CDN over your assets.

---

## 🛠️ How to Edit This Portfolio (Beginner Friendly)

If you need to make future changes, everything is built to be easily customizable!

*   **Changing the Main Colors:**
    Open `assets/css/styles.css` and look at the very top under `:root`. Changing the `--lav-500` hex code will fundamentally change the overarching glow and hover mechanics across the entire site!
*   **Adding New Navigation Sections:**
    If you add a `<section>` to `index.html`, wrap it in `<div class="section-inner-container">` to automatically adopt the layout spacing, and make sure its unique `id=""` matches an `href="#..."` link in the `<nav>`.
*   **Tweaking the Hero Typer effect:**
    Open `assets/js/script.js` and locate `rolePhrases` near line 125. You can safely add, remove, and rewrite the strings inside that array to alter what the banner types!

---
*Architected and maintained by Sai Shiva. Prepared for 2026 Production Standards.*
