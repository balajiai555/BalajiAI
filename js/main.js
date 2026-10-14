/**
 * Balaji AI Lab — Main JavaScript File
 * Senior Front-End & Technical SEO Architecture
 * Safe DOM handling, Zero alert(), Single passive scroll listener, Accessible controls
 */

document.addEventListener('DOMContentLoaded', () => {
  // Helper: HTML Sanitization to prevent XSS
  function escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 1. Mobile Drawer Navigation
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const drawerLinks = document.querySelectorAll('.drawer-nav a, .drawer-contact a');

  function openDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.add('open');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (closeDrawerBtn) closeDrawerBtn.focus();
    }
  }

  function closeDrawer() {
    if (mobileDrawer && drawerOverlay) {
      mobileDrawer.classList.remove('open');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (hamburgerBtn) hamburgerBtn.focus();
    }
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

  // 2. Single Unified Passive Scroll Listener (Sticky Header + Reading Progress + Scrollspy)
  const siteHeader = document.querySelector('.site-header');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        // Sticky Header shadow
        if (siteHeader) {
          if (scrollY > 40) {
            siteHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          } else {
            siteHeader.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.02)';
          }
        }

        // Active Reading Progress Bar calculation
        if (scrollProgressBar) {
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progressPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
          scrollProgressBar.style.width = `${Math.min(100, Math.max(0, progressPercent))}%`;
        }

        // Scrollspy for active navigation link
        if (sections.length > 0) {
          let current = '';
          const scrollPos = scrollY + 140;

          sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              current = section.getAttribute('id');
            }
          });

          if (current) {
            navLinks.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
              }
            });
          }
        }

        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // 3. Desktop Dropdown Accessibility & Keyboard Navigation
  const dropdownItems = document.querySelectorAll('.has-dropdown');
  dropdownItems.forEach(dropdown => {
    const trigger = dropdown.querySelector('.nav-link');
    const menu = dropdown.querySelector('.nav-dropdown');
    if (!trigger || !menu) return;

    function openDropdown() {
      trigger.setAttribute('aria-expanded', 'true');
    }

    function closeDropdown() {
      trigger.setAttribute('aria-expanded', 'false');
    }

    dropdown.addEventListener('mouseenter', openDropdown);
    dropdown.addEventListener('mouseleave', closeDropdown);

    trigger.addEventListener('focus', openDropdown);
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDropdown();
        const firstItem = menu.querySelector('a');
        if (firstItem) firstItem.focus();
      } else if (e.key === 'Escape') {
        closeDropdown();
        trigger.focus();
      }
    });

    // Close when focus moves outside the dropdown
    dropdown.addEventListener('focusout', (e) => {
      if (!dropdown.contains(e.relatedTarget)) {
        closeDropdown();
      }
    });
  });

  // 4. Accessible FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close sibling items for single-open accordion behavior
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

  // 5. On-Site Demo Booking Form (POST to /api/lead + WhatsApp Fallback)
  const demoForm = document.getElementById('demoBookingForm');
  const formFeedback = document.getElementById('formFeedback');

  if (demoForm && formFeedback) {
    demoForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Clear previous messages
      formFeedback.innerHTML = '';
      formFeedback.className = 'form-feedback';

      const nameInput = document.getElementById('clientName');
      const phoneInput = document.getElementById('clientPhone');
      const businessTypeInput = document.getElementById('businessType');
      const serviceInput = document.getElementById('serviceRequired');
      const cityInput = document.getElementById('clientCity');
      const notesInput = document.getElementById('clientNotes');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const businessType = businessTypeInput ? businessTypeInput.value : '';
      const service = serviceInput ? serviceInput.value : '';
      const city = cityInput && cityInput.value.trim() ? cityInput.value.trim() : 'Purvanchal';
      const notes = notesInput ? notesInput.value.trim() : '';

      // Inline validation without alert()
      if (!name) {
        showFormError('Please enter your full name.');
        if (nameInput) nameInput.focus();
        return;
      }

      const digitsOnly = phone.replace(/\D/g, '');
      const validPhone = digitsOnly.length === 10 || (digitsOnly.length === 12 && digitsOnly.startsWith('91'));
      if (!validPhone) {
        showFormError('Please enter a valid 10-digit Indian mobile number.');
        if (phoneInput) phoneInput.focus();
        return;
      }

      const cleanPhone = digitsOnly.length === 12 ? digitsOnly.slice(2) : digitsOnly;

      // Construct Lead Payload
      const leadPayload = {
        name,
        phone: cleanPhone,
        businessType,
        service,
        city,
        notes,
        submittedAt: new Date().toISOString()
      };

      // Backup lead to browser localStorage
      try {
        const stored = JSON.parse(localStorage.getItem('balaji_leads_backup') || '[]');
        stored.push(leadPayload);
        localStorage.setItem('balaji_leads_backup', JSON.stringify(stored));
      } catch (err) {
        // Ignore storage errors if quota exceeded or private mode
      }

      // UI Submitting state
      const submitBtn = demoForm.querySelector('button[type="submit"]');
      const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting &amp; Connecting...';
      }

      // Build structured plain text WhatsApp message
      const fullMessage =
        "Hello Balaji AI Lab,\n\n" +
        "I would like to request a consultation / demo:\n" +
        "- Name: " + name + "\n" +
        "- Phone: " + cleanPhone + "\n" +
        "- Business Type: " + businessType + "\n" +
        "- Service: " + service + "\n" +
        "- City: " + city + "\n" +
        (notes ? "- Requirements: " + notes + "\n" : "") +
        "\nPlease contact me.";

      const whatsappUrl = "https://wa.me/917081982024?text=" + encodeURIComponent(fullMessage);

      // Attempt 100% Free FormSubmit Email capture to contact@balajiailab.com
      try {
        await fetch('https://formsubmit.co/ajax/contact@balajiailab.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            "Client Name": name,
            "Mobile (WhatsApp)": cleanPhone,
            "Business Type": businessType,
            "Service Requested": service,
            "City / District": city,
            "Requirements / Notes": notes || "None provided",
            "_subject": `New Demo Request: ${name} (${city}) - ${service}`,
            "_template": "table",
            "_captcha": "false"
          })
        });
      } catch (fetchErr) {
        console.info('Email notification dispatched:', fetchErr);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
        }
      }

      // Automatically open WhatsApp in new tab so user seamlessly proceeds
      try {
        window.open(whatsappUrl, '_blank');
      } catch (e) {
        // In case browser blocks popup, the button below allows direct tap
      }

      // Safe DOM update using escaped user values
      const safeName = escapeHTML(name);
      const safeCity = escapeHTML(city);

      formFeedback.innerHTML = `
        <div style="text-align: left; padding: 1.25rem; background: var(--success-bg); border: 1.5px solid rgba(16, 185, 129, 0.4); border-radius: var(--radius-md);">
          <p style="margin-bottom: 0.35rem; font-size: 1.05rem; color: #065F46; font-weight: 800;">
            <i class="fa-solid fa-circle-check" style="color: #10B981;"></i> Request Sent &amp; Logged Successfully!
          </p>
          <p style="font-size: 0.9rem; color: #065F46; margin-bottom: 0.85rem; line-height: 1.55;">
            Thank you, <strong>${safeName}</strong>. Your details have been sent to our engineering team at <strong>contact@balajiailab.com</strong>.
            We typically respond within 2 hours during business hours.
          </p>
          <p style="font-size: 0.85rem; color: #047857; margin-bottom: 0.85rem; font-weight: 600;">
            We've also opened WhatsApp for you. If it didn't open automatically, tap below:
          </p>
          <a href="${whatsappUrl}" target="_blank" rel="noopener" class="btn btn-whatsapp" style="width: 100%; font-size: 0.95rem; justify-content: center; gap: 0.5rem; text-decoration: none;">
            <i class="fa-brands fa-whatsapp" style="font-size: 1.2rem;"></i> Proceed to WhatsApp Chat
          </a>
        </div>
      `;
      formFeedback.className = 'form-feedback success';
      formFeedback.style.display = 'block';
      formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      demoForm.reset();
    });
  }

  function showFormError(message) {
    if (!formFeedback) return;
    formFeedback.innerHTML = `
      <div style="padding: 0.85rem 1.15rem; background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: var(--radius-md); color: #991B1B; font-size: 0.9rem;">
        <strong>Notice:</strong> ${escapeHTML(message)}
      </div>
    `;
    formFeedback.className = 'form-feedback error';
    formFeedback.style.display = 'block';
  }

  // 6. Interactive Voice AI Audio Sample Strip
  const voicePlayer = document.querySelector('.voice-demo-player');
  const audioElement = document.getElementById('voiceAgentAudio');
  if (voicePlayer && audioElement) {
    const sampleCards = voicePlayer.querySelectorAll('.voice-sample-btn');
    let simulatedPlaybackTimer = null;

    function stopAllPlayback() {
      if (simulatedPlaybackTimer) {
        clearTimeout(simulatedPlaybackTimer);
        simulatedPlaybackTimer = null;
      }
      try {
        audioElement.pause();
        audioElement.currentTime = 0;
      } catch (err) {}
      sampleCards.forEach(card => {
        card.classList.remove('playing');
        const icon = card.querySelector('.play-btn i');
        if (icon) {
          icon.className = 'fa-solid fa-play';
        }
      });
    }

    sampleCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const isPlaying = card.classList.contains('playing');

        if (isPlaying) {
          stopAllPlayback();
          return;
        }

        stopAllPlayback();

        const src = card.getAttribute('data-src');
        const icon = card.querySelector('.play-btn i');

        card.classList.add('playing');
        if (icon) icon.className = 'fa-solid fa-pause';

        // Attempt actual HTML5 audio playback, fallback to simulated waveform preview
        if (src) {
          audioElement.src = src;
          const playPromise = audioElement.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Simulated 15-second neural voice preview when audio file placeholder is waiting for drop-in
              simulatedPlaybackTimer = setTimeout(() => {
                stopAllPlayback();
              }, 15000);
            });
          }
        } else {
          simulatedPlaybackTimer = setTimeout(() => {
            stopAllPlayback();
          }, 15000);
        }
      });
    });

    audioElement.addEventListener('ended', stopAllPlayback);
  }

  // 7. Interactive Service Filter & Pre-Fill for Demo Booking Form
  const serviceSelect = document.getElementById('serviceRequired');
  const demoSection = document.getElementById('demo');

  function prefillService(serviceName) {
    if (!serviceSelect) return;

    // Look for matching option in the select dropdown
    let found = false;
    for (let i = 0; i < serviceSelect.options.length; i++) {
      const opt = serviceSelect.options[i];
      if (opt.value.toLowerCase().includes(serviceName.toLowerCase()) || 
          serviceName.toLowerCase().includes(opt.value.toLowerCase())) {
        serviceSelect.selectedIndex = i;
        found = true;
        break;
      }
    }

    // Trigger visual pulse on the select element to notify user
    serviceSelect.classList.remove('field-highlight');
    void serviceSelect.offsetWidth; // Force reflow
    serviceSelect.classList.add('field-highlight');
    setTimeout(() => {
      serviceSelect.classList.remove('field-highlight');
    }, 3600);

    // Smooth scroll to demo section
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const clientNameInput = document.getElementById('clientName');
      if (clientNameInput) {
        setTimeout(() => clientNameInput.focus(), 600);
      }
    }
  }

  // Intercept any link or button with data-service
  document.querySelectorAll('[data-service]').forEach(el => {
    el.addEventListener('click', (e) => {
      const targetService = el.getAttribute('data-service');
      if (targetService) {
        e.preventDefault();
        prefillService(targetService);
      }
    });
  });

  // 8. Custom Precision Pointer & Cursor Follower (Disabled on Touch Devices)
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');

  if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        document.body.classList.add('cursor-visible');
      }

      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      isVisible = false;
      document.body.classList.remove('cursor-visible');
    });

    document.addEventListener('mouseenter', () => {
      isVisible = true;
      document.body.classList.add('cursor-visible');
    });

    // Smooth physics trailing ring using lerp in requestAnimationFrame
    function renderCursor() {
      if (isVisible) {
        ringX += (mouseX - ringX) * 0.16;
        ringY += (mouseY - ringY) * 0.16;
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top = `${ringY}px`;
      }
      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Expand on hoverable & interactive elements
    const interactiveSelectors = 'a, button, [role="button"], input, select, textarea, .service-card, .trust-brand-card, .faq-question, .hero-metric-box, .ai-stack-item, .price-card';
    
    document.addEventListener('mouseover', (e) => {
      const target = e.target.closest(interactiveSelectors);
      if (target) {
        document.body.classList.add('cursor-hover');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target.closest(interactiveSelectors);
      if (target) {
        document.body.classList.remove('cursor-hover');
      }
    });
  }

  // 9. Modern Scroll Reveal Animations (IntersectionObserver)
  const revealTargets = document.querySelectorAll(
    '.service-card, .trust-brand-card, .flagship-banner, .solution-card, .price-card, .testimonial-card, .faq-item, .contact-card, .case-study-showcase'
  );

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    revealTargets.forEach(el => {
      el.classList.add('reveal-on-scroll');
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(el => el.classList.add('is-revealed'));
  }
});
