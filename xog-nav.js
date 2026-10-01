/**
 * Xog Archive — Shared Navigation & Footer
 * Include this script at the end of <body> on every page.
 * Detects directory depth and adjusts all internal links.
 */
(function () {
  'use strict';

  // Detect if page is in a subdirectory
  var path = window.location.pathname;
  var inSub = path.indexOf('/files/') !== -1;
  var prefix = inSub ? '../' : '';

  // Pages that have their own nav — only inject footer + progress bar
  var hasOwnNav = document.querySelector('header nav') || document.querySelector('.header-inner');
  var skipNav = hasOwnNav && !document.querySelector('[data-xog-replace-nav]');

  // Current page for active state
  var currentFile = path.split('/').pop();

  // ─── PROGRESS BAR ───
  var progressBar = document.getElementById('xog-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.id = 'xog-progress';
    document.body.insertBefore(progressBar, document.body.firstChild);
  }
  window.addEventListener('scroll', function () {
    var pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = pct + '%';
  });

  // ─── TOP NAVIGATION ───
  if (skipNav) {
    // Page has its own nav — skip injection but still add footer
  } else {
  var existingNav = document.getElementById('xog-nav');
  if (!existingNav) {
    existingNav = document.createElement('nav');
    existingNav.id = 'xog-nav';
    existingNav.setAttribute('role', 'navigation');
    existingNav.setAttribute('aria-label', 'Main navigation');
    document.body.insertBefore(existingNav, progressBar.nextSibling);
  }

  var navLinks = [
    { href: 'xog-explore.html', label: 'Archive' },
    { href: 'xog-map.html', label: 'Map' },
    { href: 'files/xog-somali-poetry.html', label: 'Gabay' },
    { href: 'xog-sources.html', label: 'Sources' },
    { href: 'xog-about.html', label: 'About' }
  ];

  var navLinksHTML = navLinks.map(function (link) {
    var href = prefix + link.href;
    var isActive = currentFile === link.href.split('#')[0] ? ' class="active"' : '';
    return '<a href="' + href + '"' + isActive + '>' + link.label + '</a>';
  }).join('');

  existingNav.innerHTML =
    '<div class="xn-inner">' +
      '<a href="' + prefix + 'somali-archive.html" class="xn-logo" aria-label="Xog Archive home">' +
        'Xog<span class="xn-dot"></span><span class="xn-osm" lang="so">𐒄𐒙𐒌</span>' +
      '</a>' +
      '<div class="xn-links">' + navLinksHTML + '</div>' +
      '<button class="xn-burger" aria-label="Open menu" aria-expanded="false">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</div>' +
    '<div class="xn-mobile" aria-hidden="true">' +
      navLinks.map(function (link) {
        return '<a href="' + prefix + link.href + '">' + link.label + '</a>';
      }).join('') +
    '</div>';

  // Mobile menu toggle
  var burger = existingNav.querySelector('.xn-burger');
  var mobileMenu = existingNav.querySelector('.xn-mobile');
  if (burger) {
    burger.addEventListener('click', function () {
      var expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', !expanded);
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      mobileMenu.setAttribute('aria-hidden', expanded);
    });
  }
  } // end skipNav check

  // ─── FOOTER ───
  var existingFooter = document.getElementById('xog-footer');
  if (!existingFooter) {
    existingFooter = document.createElement('footer');
    existingFooter.id = 'xog-footer';
    existingFooter.setAttribute('role', 'contentinfo');
    document.body.appendChild(existingFooter);
  }

  var eras = [
    { href: 'era-genealogies.html', label: 'The Founding Genealogies' },
    { href: 'era-maritime.html', label: 'Maritime Networks' },
    { href: 'era-benadir.html', label: 'Benadiri City-States' },
    { href: 'era-xeer.html', label: 'The Xeer' },
    { href: 'era-sufi.html', label: 'The Sufi Brotherhoods' },
    { href: 'era-ajuran.html', label: 'Ajuran Sultanate' },
    { href: 'era-adal.html', label: 'Adal Sultanate' },
    { href: 'era-dervish.html', label: 'Dervish State' },
    { href: 'era-partition.html', label: 'The Partition' },
    { href: 'era-independence.html', label: 'Independence' },
    { href: 'era-script.html', label: 'The Script Wars' },
    { href: 'era-somaliland.html', label: 'Somaliland' },
    { href: 'era-2006.html', label: 'The 2006 Invasion' },
    { href: 'era-diaspora.html', label: 'The Diaspora' }
  ];

  var erasHTML = eras.map(function (era) {
    return '<a href="' + prefix + era.href + '">' + era.label + '</a>';
  }).join('');

  existingFooter.innerHTML =
    '<div class="xf-inner">' +
      '<div class="xf-brand">' +
        '<div class="xf-logo">Xog<span class="xf-osm" lang="so">𐒄𐒙𐒌</span></div>' +
        '<p class="xf-tagline">The archive for untold perspectives.</p>' +
      '</div>' +
      '<div class="xf-cols">' +
        '<div class="xf-col">' +
          '<span class="xf-label">Navigate</span>' +
          '<a href="' + prefix + 'somali-archive.html">Home</a>' +
          '<a href="' + prefix + 'xog-explore.html">Explore</a>' +
          '<a href="' + prefix + 'xog-map.html">Territory Map</a>' +
          '<a href="' + prefix + 'xog-sources.html">Sources</a>' +
          '<a href="' + prefix + 'xog-about.html">About</a>' +
        '</div>' +
        '<div class="xf-col xf-col-eras">' +
          '<span class="xf-label">Historical Eras</span>' +
          erasHTML +
        '</div>' +
      '</div>' +
    '</div>' +
    '<div class="xf-bottom">' +
      '<span>2025 Xog Archive. The history was always there.</span>' +
      '<span>~4,500 years · 14 eras · oral tradition as primary source</span>' +
    '</div>';

  // ─── SKIP TO CONTENT ───
  var main = document.querySelector('main') || document.querySelector('.content') || document.querySelector('article');
  if (main && !main.id) main.id = 'main-content';
  if (main) {
    var skip = document.createElement('a');
    skip.href = '#' + main.id;
    skip.className = 'xn-skip';
    skip.textContent = 'Skip to content';
    document.body.insertBefore(skip, document.body.firstChild);
  }

})();
