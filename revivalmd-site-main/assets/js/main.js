/**
 * RevivalMD Main JavaScript
 * Minimal vanilla JS for mobile menu, scroll effects, and FAQ accordions
 */

(function() {
  'use strict';

  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('menu-icon-open');
  const iconClose = document.getElementById('menu-icon-close');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function() {
      const isOpen = mobileMenu.classList.contains('open');
      mobileMenu.classList.toggle('open');
      iconOpen.classList.toggle('hidden');
      iconClose.classList.toggle('hidden');
      menuToggle.setAttribute('aria-expanded', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        iconOpen.classList.remove('hidden');
        iconClose.classList.add('hidden');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Header background on scroll
  const header = document.getElementById('site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      if (scrollY > 50) {
        header.classList.add('bg-purple-950/95', 'shadow-lg');
      } else {
        header.classList.remove('shadow-lg');
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

  // Floating CTA visibility on scroll
  const floatingCta = document.getElementById('floating-cta');
  if (floatingCta) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 400) {
        floatingCta.classList.remove('opacity-0', 'pointer-events-none');
        floatingCta.classList.add('opacity-100');
      } else {
        floatingCta.classList.add('opacity-0', 'pointer-events-none');
        floatingCta.classList.remove('opacity-100');
      }
    }, { passive: true });
  }

  // FAQ accordion
  document.querySelectorAll('[data-faq-toggle]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const icon = this.querySelector('[data-faq-icon]');

      answer.classList.toggle('open');
      if (icon) {
        icon.style.transform = answer.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  });

  // Scroll reveal animation
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(function(el) {
      revealObserver.observe(el);
    });
  }

})();
