# Divine Leads Media (DLM) — Official Website

> **Transforming Nigeria Education with Tech & AI**  
> Pioneering low-power, zero-internet school management infrastructure across Nigerian secondary and primary schools.

---

## 🌟 Overview

Divine Leads Media is an educational technology organization that powers modern school administration through offline-first, battery-efficient computing appliances and the **ResultDesk School Suite**.

- **Primary Contact Email:** `divineleadsmedia@gmail.com`
- **Secondary / Official Inquiries:** `admin@divineleadsmedia.com`
- **WhatsApp Support:** `+234 912 630 0594`
- **Headquarters:** Lagos, Nigeria

---

## 🚀 Key Features

- **Offline-First & Ultra Low Power:** Operates seamlessly on solar/inverter systems (as low as 15W–30W) without recurring monthly subscriptions or continuous internet connectivity.
- **ResultDesk School Suite:** Automated grading, 2-decimal continuous assessment, broadsheet compilation, instant PDF report generation, and student transcripts.
- **Editorial CMS:** Clean, modern dashboard for publishing news, research dispatches, hardware reviews, and educational guides.
- **Zero-Dependency Architecture:** Pure HTML5, modern CSS3 design system, and reactive JavaScript with browser storage.

---

## 📁 Repository Structure

```
├── index.html            # Main Landing Page & Product Showcase
├── about.html            # Mission, Vision, 5 Core Pillars, & Founder Bio
├── downloads.html        # ResultDesk Desktop Suite & System Requirements
├── staff.html            # Leadership Team & Executive Directory
├── news.html             # Field Dispatches & Announcements
├── articles.html         # Research Insights & Practical Guides
├── contact.html          # Inquiries, State Field Selection & Support
├── cms.html              # Internal Editorial Dashboard & Content Manager
├── login.html            # Staff & Administrator Authentication Portal
└── assets/
    ├── css/
    │   └── style.css     # Dark-mode design system & typography tokens
    └── js/
        ├── db.js         # Reactive data layer (localStorage)
        ├── main.js       # Dynamic UI bindings & responsive navigation
        └── cms.js        # Post management, tag filtering, & editorial logic
```

---

## 💻 Running Locally

Because this project is built entirely with modern web standards (vanilla HTML5/CSS3/JS), you do not need to install Node.js, PHP, or heavy database servers to preview it locally.

### Option 1: Using Python (Recommended)
In your terminal, navigate to the folder and run:
```bash
python -m http.server 8080
```
Then visit: `http://localhost:8080` in your web browser.

### Option 2: VS Code Live Server
Right-click on `index.html` in VS Code and select **"Open with Live Server"**.

---

## 🔐 Administrative & Staff Access

Public visitors cannot see links to the administrative dashboards. Authorized staff and administrators can access them directly using the private URLs below:

- **Staff Authentication Portal:** `/login.html`
- **Editorial CMS Dashboard:** `/cms.html`

*(Default development credentials: `admin@divineleadsmedia.com` / `password123`)*

---

## 🌐 Free Deployment (GitHub Pages)

This website is ready for free hosting with automatic HTTPS via **GitHub Pages**:
1. Push this repository to GitHub.
2. Go to **Settings** > **Pages** in your repository.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your site will be live instantly at `https://<your-username>.github.io/<repo-name>/`.
