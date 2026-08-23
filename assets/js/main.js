(() => {
  'use strict';

  // Marks JS as running so CSS can opt IN to the hide-then-reveal treatment
  // (see [data-reveal] rules) instead of opting out of it — without this
  // class, a failed/blocked script leaves all content plainly visible.
  document.documentElement.classList.add('js');

  /* Sticky nav elevation on scroll */
  const header = document.querySelector('.site-header');
  if (header) {
    const setScrolled = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });

    // Mobile menu sits above the header (see .mobile-nav z-index), so it
    // needs the header's real height to avoid covering the first nav link.
    // ResizeObserver catches height changes from any cause (font swap,
    // content reflow, orientation change) — a plain window "resize"
    // listener only fires for viewport resizes, missing those cases.
    const setHeaderHeight = () => {
      document.documentElement.style.setProperty('--header-h', `${header.offsetHeight}px`);
    };
    setHeaderHeight();
    if ('ResizeObserver' in window) {
      new ResizeObserver(setHeaderHeight).observe(header);
    } else {
      window.addEventListener('resize', setHeaderHeight);
    }
  }

  /* Mobile nav toggle */
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavScrim = document.getElementById('mobile-nav-scrim');
  if (navToggle && mobileNav) {
    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    // Elements that sit behind the overlay: without `inert`, they stay in
    // the tab order even though the scrim visually dims them and blocks
    // pointer events (WCAG 2.2 2.4.3 Focus Order / 2.4.11 Focus Not Obscured).
    // The header's brand link and primary nav go inert too, but not the
    // header itself — .nav-toggle lives inside <header> and has to stay
    // clickable so it can still close the dialog it just opened.
    const behindOverlay = [
      document.querySelector('.brand'),
      document.querySelector('.nav-links'),
      document.querySelector('.nav-quick-actions'),
      document.getElementById('main'),
      document.querySelector('.site-footer'),
    ].filter(Boolean);

    let previouslyFocused;

    const closeNav = ({ restoreFocus = true } = {}) => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileNav.setAttribute('inert', '');
      mobileNav.classList.remove('is-open');
      if (mobileNavScrim) mobileNavScrim.classList.remove('is-open');
      document.body.style.overflow = '';
      behindOverlay.forEach((el) => el.removeAttribute('inert'));
      if (restoreFocus) (previouslyFocused || navToggle).focus();
    };
    const openNav = () => {
      previouslyFocused = document.activeElement;

      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Close menu');
      mobileNav.setAttribute('aria-hidden', 'false');
      mobileNav.removeAttribute('inert');
      mobileNav.classList.add('is-open');
      if (mobileNavScrim) mobileNavScrim.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      behindOverlay.forEach((el) => el.setAttribute('inert', ''));
      const firstFocusable = mobileNav.querySelector(focusableSelector);
      if (firstFocusable) firstFocusable.focus();
    };
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeNav() : openNav();
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => closeNav({ restoreFocus: false }));
    });
    if (mobileNavScrim) {
      mobileNavScrim.addEventListener('click', () => closeNav());
    }
    mobileNav.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeNav();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = [...mobileNav.querySelectorAll(focusableSelector)];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  /* Scroll-reveal */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    const groups = new Map();
    revealEls.forEach((el) => {
      const group = el.closest('[data-reveal-group]');
      if (group) {
        const list = groups.get(group) || [];
        list.push(el);
        groups.set(group, list);
      }
    });
    groups.forEach((list) => {
      list.forEach((el, i) => el.style.setProperty('--i', i));
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    );
    revealEls.forEach((el) => io.observe(el));

    // Safety net: landing directly on a URL fragment, a scroll faster than
    // the observer's threshold, or an instant (non-smooth) jump can leave
    // an element's intersection callback never firing. Any element already
    // on screen gets revealed by the observer within a frame or two of
    // load, so this only ever catches elements that are still off-screen
    // when it fires — invisibly to the user, not as a mid-view pop-in.
    window.setTimeout(() => {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }, 4000);
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* Close only one FAQ item open at a time for focus clarity (optional, non-blocking) */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* Current year in footer */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Carousel prev/next buttons scroll their target by roughly one card width,
     and disable themselves at either scroll edge. Track -> {prevBtn, nextBtn}
     is built once so edge-checking (which runs on every scroll event) never
     re-queries the DOM. */
  const carouselTracks = new Map();
  document.querySelectorAll('[data-carousel-prev], [data-carousel-next]').forEach((btn) => {
    const targetId = btn.dataset.carouselPrev || btn.dataset.carouselNext;
    const track = document.getElementById(targetId);
    if (!track) return;
    const entry = carouselTracks.get(track) || {};
    if (btn.dataset.carouselPrev) entry.prevBtn = btn; else entry.nextBtn = btn;
    carouselTracks.set(track, entry);
    const direction = btn.dataset.carouselPrev ? -1 : 1;
    btn.addEventListener('click', () => {
      const card = track.querySelector(':scope > *');
      // Real gap, not a hardcoded copy of the CSS value — stays correct if
      // .service-groups' gap ever changes without this file being touched.
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      const step = card ? card.getBoundingClientRect().width + gap : track.clientWidth * 0.8;
      track.scrollBy({ left: step * direction, behavior: 'smooth' });
    });
  });
  /* Scroll-snap forces the resting scroll position to align with the first
     card rather than sitting at literal 0 (its container has inline
     padding for the peek-past-the-edge bleed) — so "start" is measured
     against that resting offset, captured once per track, not a hardcoded 0. */
  const updateCarouselEdges = (track, { prevBtn, nextBtn }) => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const startOffset = track._startScroll ?? 0;
    if (prevBtn) prevBtn.disabled = track.scrollLeft <= startOffset + 1;
    if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll - 1;
  };
  carouselTracks.forEach((buttons, track) => {
    requestAnimationFrame(() => {
      track._startScroll = track.scrollLeft;
      updateCarouselEdges(track, buttons);
    });
    track.addEventListener('scroll', () => updateCarouselEdges(track, buttons), { passive: true });
    window.addEventListener('resize', () => updateCarouselEdges(track, buttons));
  });

})();
