// MJ Adams | Austin Realtor + Relocation Expert — main.js

// === NAV: sticky style + mobile hamburger ===
(function () {
  var nav    = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('navMenu');

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
  });

  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
})();


// === REVIEWS CAROUSEL ===
(function () {
  var slides  = Array.from(document.querySelectorAll('.review'));
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

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  resetTimer();
})();


// === SCROLL FADE-IN ANIMATIONS ===
(function () {
  if (!('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll(
    '.listing, .meet-text, .meet-photo, .contact-left, .contact-right, .areas-left, .areas-right, .stat, .why-left, .why-item'
  );

  targets.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
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


// === SMOOTH SCROLL (fallback) ===
(function () {
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
    setTimeout(function () {
      btn.textContent = 'Send Message';
      btn.disabled = false;
    }, 8000);
  });
})();
