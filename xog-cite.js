/* ════════════════════════════════════════════════════════════════
   XOG — Citation Tooltip Engine
   Click a marker → tooltip appears with the source.
   Click elsewhere → tooltip closes.
   No dependencies. No build step.
   ════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  // Create the single shared tooltip element
  var tip = document.createElement('div');
  tip.className = 'cite-tip';
  tip.setAttribute('role', 'tooltip');
  document.body.appendChild(tip);

  var active = null;

  function closeTip() {
    tip.classList.remove('show');
    active = null;
  }

  function openTip(mark) {
    // Read the hidden <span> inside the marker
    var detail = mark.querySelector('span');
    if (!detail) return;

    tip.innerHTML = detail.innerHTML;

    // Position: below the marker on desktop, fixed bottom on mobile
    if (window.innerWidth > 640) {
      var rect = mark.getBoundingClientRect();
      var scrollY = window.pageYOffset || document.documentElement.scrollTop;

      tip.style.left = '';
      tip.style.right = '';
      tip.style.top = '';
      tip.style.bottom = '';

      // Show briefly offscreen to measure
      tip.style.visibility = 'hidden';
      tip.classList.add('show');
      var tipW = tip.offsetWidth;
      tip.classList.remove('show');
      tip.style.visibility = '';

      // Use viewport-relative rect.left, then clamp to viewport
      var left = rect.left - 12;
      if (left + tipW > window.innerWidth - 16) {
        left = window.innerWidth - tipW - 16;
      }
      if (left < 8) left = 8;

      tip.style.position = 'fixed';
      tip.style.left = left + 'px';
      tip.style.top = (rect.bottom + 8) + 'px';

      // If tooltip would go below viewport, show above instead
      if (rect.bottom + 8 + 120 > window.innerHeight) {
        tip.style.top = '';
        tip.style.bottom = (window.innerHeight - rect.top + 8) + 'px';
      }
    }

    tip.classList.add('show');
    active = mark;
  }

  // Global click handler
  document.addEventListener('click', function (e) {
    var mark = e.target.closest('.c');
    if (mark) {
      e.preventDefault();
      e.stopPropagation();
      if (active === mark) {
        closeTip();
      } else {
        closeTip();
        openTip(mark);
      }
      return;
    }
    // Click outside — close
    if (!e.target.closest('.cite-tip')) {
      closeTip();
    }
  });

  // Escape key closes
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeTip();
  });

  // Close on scroll (tooltip is fixed-position, so close after scrolling)
  var scrollTimer;
  window.addEventListener('scroll', function () {
    if (active) {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(closeTip, 400);
    }
  }, { passive: true });

})();
