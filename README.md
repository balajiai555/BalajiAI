# Balaji AI Lab — Official Website

> **Custom Software, AI & Digital Solutions for Real Businesses**  
> Based in Bodarwar, Kushinagar · Dedicated On-Site Support across Purvanchal (Gorakhpur, Deoria, Maharajganj, Padrauna).

---

## 🚀 Overview

This repository houses the official website for **Balaji AI Lab** (`balajiailab.com`). It showcases our full breadth of software engineering, proprietary restaurant operating systems, luxury tourism booking engines, local retail e-commerce, and autonomous AI agents.

### 🌟 Key Offerings
- **MealQR Restro OS:** 150+ live restaurant outlets across Purvanchal. QR self-ordering, KDS kitchen display, thermal GST invoicing, 0% commission.
- **Custom Billing & POS:** High-speed, keyboard-driven offline-first billing for retail, sweet shops, and supermarkets.
- **AI Agents & Intelligent Chatbots:** 24/7 automated WhatsApp lead capture, customer service agents, and automated workflow triggers.
- **Mobile & Web Engineering:** Native Android applications, handheld POS terminals, high-conversion responsive websites, and custom CMS platforms.
- **IoT & Hardware Integration:** Thermal receipt printers, local edge WLAN sync, barcode/RFID scanners, and systems integration.
- **Digital Marketing & Local SEO:** Dominating local search in Kushinagar, Gorakhpur, and Purvanchal.

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
│   └── main.js                 # Mobile drawer, FAQ accordion & WhatsApp demo dispatcher
├── img/                        # Real production software screenshots & founder photo
│   ├── chandanguptapic.jpg     # Chandan Gupta (Founder & Principal Systems Engineer)
│   ├── dashboard.png           # Live POS & sales analytics dashboard
│   ├── quickbill.png           # Rapid touch & barcode billing terminal
│   ├── tablemanage.png         # Table status & floor management
│   ├── sweetshopswitch.png     # Sweet shop vs restaurant dual-mode
│   ├── allbills.png            # Bill history ledger & thermal reprint
│   └── reportview.png          # Daily tax & profit analytics report
└── images/                     # Vector SVG mockups & assets
    ├── logo.svg                # Balaji AI Lab official emblem & brandmark
    ├── mealqr-mockup.svg       # MealQR POS interface mockup
    ├── cruise-mockup.svg       # Rameshwaram Cruise luxury ticketing preview
    ├── anuradha-mockup.svg     # Anuradha Sweets e-commerce store preview
    └── server-mockup.svg       # Server Ops mobile & cluster telemetry preview
```

---

## 🔍 SEO & Rich Snippets

The landing page embeds valid JSON-LD schemas for:
- `LocalBusiness` (Geo coordinates `26.7410, 83.8890`, NAP, service cities)
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
- **Email:** hello@balajiailab.com
- **Headquarters:** Bodarwar, Kaptanganj, Kushinagar, UP, India 274149
