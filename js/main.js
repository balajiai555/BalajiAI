/**
 * Balaji AI Lab — Main JavaScript Interactions
 * Mobile Drawer, Sticky Navbar, FAQ Accordion, WhatsApp Lead Dispatcher
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Drawer Navigation
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-nav a');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeDrawer);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // 2. Sticky Header Elevation on Scroll
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
      siteHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.02)';
    }
  });

  // 3. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other active items for clean single accordion
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      if (isActive) {
        item.classList.remove('active');
        questionBtn.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('active');
        questionBtn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // 4. On-Site Demo Booking Form Validation & Instant WhatsApp Integration
  const demoForm = document.getElementById('demoBookingForm');
  const formFeedback = document.getElementById('formFeedback');

  if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const phone = document.getElementById('clientPhone').value.trim();
      const businessType = document.getElementById('businessType').value;
      const service = document.getElementById('serviceRequired').value;
      const city = document.getElementById('clientCity').value.trim() || 'Purvanchal';
      const notes = document.getElementById('clientNotes').value.trim();

      // Basic phone check (supports Indian 10 digits with or without +91 / 0)
      const cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length < 10) {
        alert('Please enter a valid 10-digit mobile number.');
        document.getElementById('clientPhone').focus();
        return;
      }

      // Generate structured WhatsApp message
      const whatsappText = `Hello Balaji AI Lab! 🚀%0A%0AI would like to request a FREE Demo / Consultation:%0A` +
        `• *Name:* ${encodeURIComponent(name)}%0A` +
        `• *Phone:* ${encodeURIComponent(phone)}%0A` +
        `• *Business Type:* ${encodeURIComponent(businessType)}%0A` +
        `• *Service:* ${encodeURIComponent(service)}%0A` +
        `• *City:* ${encodeURIComponent(city)}%0A` +
        (notes ? `• *Requirements:* ${encodeURIComponent(notes)}%0A%0A` : '%0A') +
        `Please arrange a live demo or contact me.`;

      const targetWhatsAppURL = `https://wa.me/917081982024?text=${whatsappText}`;

      // Show instant success UI feedback
      formFeedback.innerHTML = `
        <div style="text-align: left;">
          <p style="margin-bottom: 0.5rem; font-size: 1rem;">✅ <strong>Demo Request Received!</strong></p>
          <p style="font-size: 0.88rem; color: #065F46; margin-bottom: 0.75rem;">
            Thank you, <strong>${name}</strong>. Opening WhatsApp to connect directly with our engineering team in Kushinagar...
          </p>
          <a href="${targetWhatsAppURL}" target="_blank" rel="noopener" class="btn btn-whatsapp btn-sm" style="width: 100%;">
            <i class="fa-brands fa-whatsapp"></i> Tap to Open WhatsApp Directly
          </a>
        </div>
      `;
      formFeedback.className = 'form-feedback success';
      formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Automatically launch WhatsApp in new tab after 400ms
      setTimeout(() => {
        window.open(targetWhatsAppURL, '_blank');
      }, 400);

      // Reset form fields
      demoForm.reset();
    });
  }

  // 5. Active Link Highlight on Scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});
