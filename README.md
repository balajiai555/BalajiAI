# Balaji AI Lab — Official Website

> **Custom Software, AI & Digital Solutions for Real Businesses**  
> Based in Bodarwar, Kushinagar · Dedicated On-Site Support across Purvanchal (Gorakhpur, Deoria, Maharajganj, Padrauna).

---

## 🚀 Overview

This repository houses the official website for **Balaji AI Lab** (`balajiailab.com`). It showcases our full breadth of software engineering, proprietary restaurant operating systems, luxury tourism booking engines, local retail e-commerce, and autonomous AI agents.

### 🌟 Key Offerings
- **Modern School ERP & Coaching LMS Platforms:** Multi-role login portals (Principal, Admin, Teacher, Student, Parent, Accountant), instant QR smart attendance, automated WhatsApp arrival alerts, online fee collection with instant receipts, exam grade books, and coaching test series LMS.
- **Enterprise AI Systems:** Private In-House LLM fine-tuning, neural voice cloning (Hindi, Bhojpuri, English), and autonomous multi-agent workflows.
- **Consultative Discovery & Growth Marketing:** Objective-first architecture design followed by dedicated full-funnel digital marketing, Meta/Google ad campaigns, and local SEO.
- **MealQR Restro OS & Counter POS:** Offline-first high-speed billing for retail, restaurants, and sweet shops with weighing scale interfaces.
- **AI Agents & Intelligent Chatbots:** 24/7 automated WhatsApp lead capture, customer service agents, and automated workflow triggers.
- **Mobile & Web Engineering:** Full-stack web portals (Rameshwaram Cruise), on-demand grocery delivery (Grocki), native Android APKs, and food ordering platforms (Anuradha Sweets).
- **IoT & Hardware Integration:** Thermal receipt printers, local edge WLAN sync, digital weighing scales, barcode scanners, and ESP32 telemetry.
- **Digital Marketing & Local SEO:** Dominating local search and generative AI answer engine rankings in Kushinagar, Gorakhpur, and Purvanchal.

---

## 🎨 Visual Identity & Brand System

- **Primary:** Deep Teal (`#0D6E6E`) — Trust, technical depth, regional reliability
- **Accent:** Warm Amber (`#F5A623`) — High-conversion action items & trust badges
- **Typography:** `Plus Jakarta Sans`
- **Design Philosophy:** Mobile-first, offline-first reliability, clear proofs over generic hype

---

## 📁 Repository Structure

```
├── index.html                  # Core production landing page with full SEO schemas
├── README.md                   # Project documentation & deployment guide
├── css/
│   └── style.css               # Responsive design system & custom CSS variables
├── js/
│   └── main.js                 # Unified scroll engine, accessible dropdowns & form handler
├── img/                        # Real production software screenshots & founder photo
│   ├── chandanguptapic.jpg     # Chandan Gupta (Founder & Principal Systems Engineer)
│   ├── cruise-seat-selection.png # Real booking console for Rameshwaram Cruise Varanasi
│   └── cruise-booking-fleet.png  # Fleet and ticket booking overview
└── images/                     # Vector SVG mockups & assets
    ├── logo.svg                # Balaji AI Lab official emblem & brandmark
    ├── mealqr-mockup.svg       # MealQR POS interface mockup
    ├── cruise-mockup.svg       # Rameshwaram Cruise luxury ticketing preview
    ├── anuradha-mockup.svg     # Anuradha Sweets e-commerce store preview
    ├── grocki-mockup.svg       # Grocki Hyperlocal grocery delivery preview
    └── server-mockup.svg       # Server Ops mobile & cluster telemetry preview
```

---

## 🔍 SEO & Rich Snippets

The landing page embeds valid JSON-LD schemas for:
- `LocalBusiness` (Geo coordinates `26.7324, 83.7198`, NAP, service cities)
- `Organization` (Balaji AI Lab identity)
- `SoftwareApplication` (MealQR Restro OS)
- `FAQPage` (6 core customer questions for Google Rich Snippets)

---

## 💻 Local Testing & Deployment

### Run Locally:
```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```
Navigate to `http://localhost:8080`.

### Production Server (Nginx on VPS `srv1896372`):
Place files in `/var/www/balajiailab` and configure Nginx:
```nginx
server {
    listen 80;
    server_name balajiailab.com www.balajiailab.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name balajiailab.com www.balajiailab.com;

    root /var/www/balajiailab;
    index index.html;

    ssl_certificate /etc/letsencrypt/live/balajiailab.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/balajiailab.com/privkey.pem;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

---

## 📞 Contact & Engineering Support
- **Helpline:** +91 7081982024 / +91 9140054630
- **WhatsApp:** [wa.me/917081982024](https://wa.me/917081982024)
- **Email:** contact@balajiailab.com
- **Instagram:** [@balajiailab](https://www.instagram.com/balajiailab/)
- **Facebook:** [@balajiailab](https://www.facebook.com/balajiailab/)
- **Headquarters:** [Bodarwar, Kaptanganj, Kushinagar, UP, India 274149](https://share.google/YWwFFNzeyYrmfTS9F) ([Google Maps Location](https://share.google/YWwFFNzeyYrmfTS9F))
