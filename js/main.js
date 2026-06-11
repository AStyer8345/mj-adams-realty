// MJ Adams | Luxury Realty ATX — main.js

// === NAV: sticky style + mobile hamburger ===
(function () {
  var nav    = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  // Close mobile nav when any link is tapped
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();


// === REVIEWS CAROUSEL ===
(function () {
  var slides  = Array.from(document.querySelectorAll('.review-slide'));
  var dots    = Array.from(document.querySelectorAll('.dot'));
  var prevBtn = document.getElementById('reviewPrev');
  var nextBtn = document.getElementById('reviewNext');
  var current = 0;
  var timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(function () { goTo(current + 1); }, 6000);
  }

  prevBtn.addEventListener('click', function () { goTo(current - 1); });
  nextBtn.addEventListener('click', function () { goTo(current + 1); });

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      goTo(parseInt(dot.dataset.index, 10));
    });
  });

  // Keyboard arrow support
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  resetTimer();
})();


// === SCROLL FADE-IN ANIMATIONS ===
(function () {
  if (!('IntersectionObserver' in window)) return;

  var selectors = [
    '.listing-card',
    '.area-pill',
    '.about-text',
    '.about-photos',
    '.contact-text',
    '.contact-form-wrap',
    '.section-header',
    '.reviews-carousel'
  ];

  var targets = document.querySelectorAll(selectors.join(', '));

  targets.forEach(function (el) {
    el.classList.add('fade-up');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        // Stagger siblings that appear simultaneously
        var delay = (i % 4) * 80;
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

  targets.forEach(function (el) { observer.observe(el); });
})();


// === SMOOTH SCROLL (fallback for browsers without CSS scroll-behavior) ===
(function () {
  // Only needed if CSS scroll-behavior not supported
  if ('scrollBehavior' in document.documentElement.style) return;

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


// === CONTACT FORM — loading feedback ===
(function () {
  var form    = document.getElementById('contactForm');
  var btn     = document.getElementById('submitBtn');
  var success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', function () {
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // If Formspree returns to same page, show success message
    // (Formspree default redirect can be overridden; this handles the fallback)
    setTimeout(function () {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 8000);
  });
})();
