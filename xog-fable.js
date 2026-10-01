/**
 * Xog · Fable layer
 * Reads the current era page's filename, then renders two things:
 * 1. The locator: where this era sits in the two threads of the map
 *    (territorial footprint, internal organisation). Links to xog-map.html.
 * 2. The artefact: one object from the era, behaving like itself,
 *    faint and fixed, in the manner of the homepage fandhaal.
 * Pages need only link xog-fable.css and this script.
 */
(function () {
  'use strict';

  /* The Somaliweyn footprint, traced from the canonical map's own
     SOMALIWEYN_COORDS and projected into a 100x100 box. Same geometry
     the territory map draws, simplified for a 175px card. */
  var OUTLINE = 'M 33.4,13.2 L 34.6,13.0 L 36.1,16.5 L 42.0,19.4 L 46.6,17.9 L 51.9,17.9 L 59.8,15.5 L 67.1,14.6 L 75.9,12.1 L 81.2,11.1 L 80.0,14.8 L 81.0,19.1 L 80.8,19.9 L 78.3,24.8 L 77.2,28.0 L 74.4,32.9 L 70.0,39.7 L 58.6,58.4 L 49.2,67.8 L 27.2,87.0 L 19.9,91.8 L 14.1,90.4 L 13.1,87.3 L 11.8,84.6 L 8.8,82.4 L 6.4,82.0 L 6.9,78.1 L 9.6,73.0 L 8.1,69.9 L 8.7,64.2 L 8.5,60.7 L 12.4,53.9 L 17.1,49.4 L 20.0,42.0 L 24.4,42.7 L 27.0,38.2 L 25.4,33.3 L 27.8,30.8 L 30.4,31.8 L 30.9,29.0 L 26.5,27.5 L 19.0,26.3 L 18.0,25.4 L 20.4,18.0 L 24.4,13.2 L 25.5,11.3 L 28.2,7.4 L 30.6,7.2 L 32.7,6.3 L 34.3,9.9 L 31.6,11.5 L 30.0,12.8 L 33.0,13.0 L 33.4,13.2 Z';
  var COASTLINE = 'M 34.6,13.8 L 39.4,19.4 L 43.3,19.6 L 48.2,16.9 L 54.0,17.2 L 62.4,15.2 L 70.1,14.0 L 76.9,10.6 L 80.9,12.4 L 80.6,15.2 L 81.8,19.2 L 80.6,19.7 L 78.7,25.3 L 76.1,28.9 L 72.5,34.6 L 68.6,42.6 L 53.0,64.3 L 42.7,71.4';

  /* zone: ellipse {cx,cy,rx,ry,rot} or {line: pathd} traced along a corridor */
  var ERAS = {
    'era-genealogies':  { era: 'Founding genealogies', dates: 'c. 2500 BCE to present', zone: { full: true }, artefact: 'tree' },
    'era-maritime':     { era: 'Maritime Horn', dates: 'Antiquity to 1500s', zone: { line: COASTLINE }, artefact: 'dhow' },
    'era-benadir':      { era: 'Benadir coast', dates: '900s to 1500s', zone: { cx: 42, cy: 72, rx: 10, ry: 4.5, rot: -35 }, artefact: 'tower' },
    'era-ajuran':       { era: 'Ajuran Sultanate', dates: '13th to 17th century', zone: { cx: 40, cy: 60, rx: 21, ry: 17, rot: -20 }, artefact: 'well' },
    'era-adal':         { era: 'Adal Sultanate', dates: '1415 to 1577', zone: { cx: 30, cy: 20, rx: 11, ry: 8, rot: -30 }, artefact: 'swords' },
    'era-xeer':         { era: 'The xeer', dates: 'Centuries, undated by design', zone: { full: true }, artefact: 'acacia' },
    'era-sufi':         { era: 'Sufi brotherhoods', dates: '1503 to present', zone: { full: true }, artefact: 'beads' },
    'era-script':       { era: 'The script wars', dates: '1920s to 1972', zone: { full: true }, artefact: 'script' },
    'era-dervish':      { era: 'Dervish State', dates: '1899 to 1920', zone: { cx: 62, cy: 33, rx: 12, ry: 9, rot: 15 }, artefact: 'fort' },
    'era-partition':    { era: 'Five partitions', dates: '1884 to 1960', zone: { full: true }, artefact: 'cuts' },
    'era-independence': { era: 'Somali Republic', dates: '1960', zone: { full: true }, artefact: 'star' },
    'era-somaliland':   { era: 'Somaliland', dates: '1991 to present', zone: { cx: 42, cy: 20, rx: 14, ry: 8, rot: 10 }, artefact: 'ring' },
    'era-2006':         { era: 'The 2006 invasion', dates: '2006 to 2012', zone: { cx: 38, cy: 75, rx: 12, ry: 10, rot: -30 }, artefact: 'scale' },
    'era-diaspora':     { era: 'The diaspora', dates: '1991 to present', zone: { full: true }, artefact: 'routes' }
  };

  var ART = {
    well: '<svg viewBox="0 0 120 120"><g class="fa-gold" stroke-width="3"><line x1="34" y1="58" x2="34" y2="28"/><line x1="86" y1="58" x2="86" y2="28"/><line x1="28" y1="28" x2="92" y2="28"/></g><line class="fa-stroke fa-well-rope" x1="60" y1="28" x2="60" y2="72" stroke-width="1.6"/><g class="fa-well-bucket"><path class="fa-stroke" stroke-width="2.4" d="M 53,72 L 55,82 L 65,82 L 67,72 Z"/><path class="fa-stroke" stroke-width="1.4" d="M 53,72 Q 60,64 67,72"/></g><ellipse class="fa-stroke" stroke-width="3" cx="60" cy="92" rx="34" ry="11"/><ellipse class="fa-stroke" stroke-width="1.6" cx="60" cy="92" rx="24" ry="7" opacity="0.6"/></svg>',
    swords: '<svg viewBox="0 0 120 120"><g class="fa-sword-l"><line class="fa-gold" stroke-width="3" x1="24" y1="92" x2="62" y2="34"/><line class="fa-gold" stroke-width="2" x1="44" y1="58" x2="56" y2="66"/><line class="fa-gold" stroke-width="2" x1="50" y1="68" x2="58" y2="56"/></g><g class="fa-sword-r"><line class="fa-gold" stroke-width="3" x1="96" y1="92" x2="58" y2="34"/><line class="fa-gold" stroke-width="2" x1="76" y1="58" x2="64" y2="66"/><line class="fa-gold" stroke-width="2" x1="70" y1="68" x2="62" y2="56"/></g><g class="fa-spark"><line class="fa-stroke" stroke-width="2" x1="52" y1="26" x2="68" y2="26"/><line class="fa-stroke" stroke-width="2" x1="60" y1="18" x2="60" y2="34"/><line class="fa-stroke" stroke-width="1.2" x1="51" y1="19" x2="69" y2="33"/><line class="fa-stroke" stroke-width="1.2" x1="69" y1="19" x2="51" y2="33"/></g></svg>',
    scale: '<svg viewBox="0 0 120 120"><line class="fa-stroke" stroke-width="3" x1="60" y1="26" x2="60" y2="96"/><path class="fa-stroke" stroke-width="2.4" d="M 44,96 L 76,96"/><g class="fa-scale-beam"><line class="fa-gold" stroke-width="2.6" x1="22" y1="26" x2="98" y2="26"/><line class="fa-gold" stroke-width="1.2" x1="22" y1="26" x2="22" y2="44"/><line class="fa-gold" stroke-width="1.2" x1="98" y1="26" x2="98" y2="44"/><path class="fa-gold" stroke-width="2" d="M 12,44 Q 22,54 32,44"/><path class="fa-gold" stroke-width="2" d="M 88,44 Q 98,54 108,44"/></g></svg>',
    tower: '<svg viewBox="0 0 120 120"><path class="fa-stroke" stroke-width="2.6" d="M 48,100 L 50,38 Q 60,30 70,38 L 72,100"/><line class="fa-stroke" stroke-width="1.4" x1="50" y1="56" x2="70" y2="56"/><line class="fa-stroke" stroke-width="1.4" x1="49" y1="74" x2="71" y2="74"/><path class="fa-gold" stroke-width="2" d="M 54,100 L 54,88 Q 60,82 66,88 L 66,100"/><circle class="fa-tower-light" cx="60" cy="24" r="5" fill="#C49A3C" stroke="none"/></svg>',
    fort: '<svg viewBox="0 0 120 120"><g stroke-width="2.4"><path class="fa-stroke fa-fort-c fa-fort-c1" d="M 30,100 L 90,100"/><path class="fa-stroke fa-fort-c fa-fort-c2" d="M 32,88 L 88,88 M 32,88 L 32,100 M 88,88 L 88,100"/><path class="fa-stroke fa-fort-c fa-fort-c3" d="M 34,76 L 86,76 M 34,76 L 34,88 M 86,76 L 86,88"/><path class="fa-stroke fa-fort-c fa-fort-c4" d="M 37,62 L 83,62 M 37,62 L 36,76 M 83,62 L 84,76"/><path class="fa-gold fa-fort-c fa-fort-c5" d="M 40,62 Q 60,30 80,62"/><path class="fa-gold fa-fort-c fa-fort-c6" d="M 56,44 L 56,34 L 64,37 L 56,40"/></g></svg>',
    routes: '<svg viewBox="0 0 120 120"><circle cx="92" cy="78" r="4" fill="#B83A22" stroke="none"/><path class="fa-stroke fa-route" stroke-width="1.4" d="M 92,78 C 70,60 50,52 24,48"/><path class="fa-stroke fa-route fa-route2" stroke-width="1.4" d="M 92,78 C 76,50 64,36 50,22"/><path class="fa-stroke fa-route fa-route3" stroke-width="1.4" d="M 92,78 C 90,52 86,36 80,18"/><path class="fa-stroke fa-route fa-route4" stroke-width="1.4" d="M 92,78 C 70,84 48,88 26,86"/><path class="fa-stroke fa-route fa-route5" stroke-width="1.4" d="M 92,78 C 102,60 106,42 104,26"/><circle class="fa-rdot fa-rdot1" cx="24" cy="48" r="3" fill="#C49A3C" stroke="none"/><circle class="fa-rdot fa-rdot2" cx="50" cy="22" r="3" fill="#C49A3C" stroke="none"/><circle class="fa-rdot fa-rdot3" cx="80" cy="18" r="3" fill="#C49A3C" stroke="none"/><circle class="fa-rdot fa-rdot4" cx="26" cy="86" r="3" fill="#C49A3C" stroke="none"/><circle class="fa-rdot fa-rdot5" cx="104" cy="26" r="3" fill="#C49A3C" stroke="none"/></svg>',
    tree: '<svg viewBox="0 0 120 120"><path class="fa-stroke fa-branch" stroke-width="2.6" d="M 60,104 L 60,64"/><path class="fa-stroke fa-branch fa-branch2" stroke-width="2" d="M 60,64 C 48,54 40,44 36,30"/><path class="fa-stroke fa-branch fa-branch2" stroke-width="2" d="M 60,64 C 72,54 80,44 84,30"/><path class="fa-gold fa-branch fa-branch3" stroke-width="1.6" d="M 36,30 C 30,24 28,18 28,12 M 36,30 C 40,22 44,18 48,14"/><path class="fa-gold fa-branch fa-branch3" stroke-width="1.6" d="M 84,30 C 90,24 92,18 92,12 M 84,30 C 80,22 76,18 72,14"/><path class="fa-gold fa-branch fa-branch4" stroke-width="1.4" d="M 60,64 C 60,50 58,42 60,32"/><path class="fa-gold fa-branch fa-branch5" stroke-width="1.2" d="M 60,32 C 56,26 54,20 55,14 M 60,32 C 64,26 66,20 65,14"/></svg>',
    star: '<svg viewBox="0 0 120 120"><path class="fa-stroke fa-star-outline" stroke-width="2" d="M 60,14 L 71,46 L 105,46 L 78,66 L 88,99 L 60,79 L 32,99 L 42,66 L 15,46 L 49,46 Z"/><path class="fa-star-pt fa-star-pt1" d="M 60,14 L 71,46 L 49,46 Z" fill="#B83A22" stroke="none"/><path class="fa-star-pt fa-star-pt2" d="M 105,46 L 78,66 L 71,46 Z" fill="#B83A22" stroke="none"/></svg>',
    dhow: '<svg viewBox="0 0 120 120"><g class="fa-dhow"><path class="fa-stroke" stroke-width="2.6" d="M 22,76 L 30,86 L 88,86 L 102,72"/><line class="fa-stroke" stroke-width="2" x1="58" y1="86" x2="58" y2="28"/><path class="fa-gold" stroke-width="2" d="M 58,28 C 78,34 88,52 90,68 L 60,68"/><line class="fa-gold" stroke-width="1.4" x1="58" y1="28" x2="34" y2="72"/></g><path class="fa-stroke fa-wave" stroke-width="1.4" d="M 10,98 Q 30,94 50,98 T 90,98 T 118,98" opacity="0.7"/></svg>',
    cuts: '<svg viewBox="0 0 120 120"><path class="fa-stroke" stroke-width="2.2" d="M 30,18 C 56,8 86,16 96,38 C 106,60 92,88 66,98 C 44,106 26,94 22,72 C 18,52 16,28 30,18 Z" opacity="0.85"/><g stroke-width="1.6" stroke-dasharray="5 4"><path class="fa-gold fa-cut" d="M 14,38 L 104,30"/><path class="fa-gold fa-cut fa-cut2" d="M 18,58 L 108,52"/><path class="fa-gold fa-cut fa-cut3" d="M 14,76 L 102,74"/><path class="fa-gold fa-cut fa-cut4" d="M 44,10 L 36,108"/><path class="fa-gold fa-cut fa-cut5" d="M 74,8 L 68,106"/></g></svg>',
    script: '<svg viewBox="0 0 200 120"><text class="fa-script-latin" x="100" y="78" text-anchor="middle">Xog</text><text class="fa-script-osmanya" x="100" y="78" text-anchor="middle">𐒄𐒙𐒌</text></svg>',
    beads: '<svg viewBox="0 0 120 120"><path class="fa-stroke" stroke-width="1.2" d="M 24,40 C 24,76 96,76 96,40" opacity="0.5"/><circle class="fa-bead" style="animation-delay:0s" cx="24" cy="40" r="4" fill="#B83A22" stroke="none"/><circle class="fa-bead" style="animation-delay:0.8s" cx="28" cy="54" r="4" fill="#B83A22" stroke="none"/><circle class="fa-bead" style="animation-delay:1.6s" cx="38" cy="64" r="4" fill="#B83A22" stroke="none"/><circle class="fa-bead" style="animation-delay:2.4s" cx="50" cy="69" r="4" fill="#B83A22" stroke="none"/><circle class="fa-bead" style="animation-delay:3.2s" cx="62" cy="70" r="4" fill="#B83A22" stroke="none"/><circle class="fa-bead" style="animation-delay:4s" cx="74" cy="66" r="4" fill="#B83A22" stroke="none"/><circle class="fa-bead" style="animation-delay:4.8s" cx="84" cy="58" r="4" fill="#B83A22" stroke="none"/><circle class="fa-bead" style="animation-delay:5.6s" cx="92" cy="48" r="4" fill="#B83A22" stroke="none"/><circle class="fa-bead" style="animation-delay:6.4s" cx="96" cy="40" r="4" fill="#B83A22" stroke="none"/><path class="fa-gold" stroke-width="1.4" d="M 60,70 L 60,84 M 56,88 L 64,88" opacity="0.8"/></svg>',
    ring: '<svg viewBox="0 0 120 120"><g class="fa-ring"><circle class="fa-ring-dot" style="animation-delay:0s" cx="60" cy="18" r="4.5" fill="#B83A22" stroke="none"/><circle class="fa-ring-dot" style="animation-delay:1.2s" cx="87" cy="28" r="4.5" fill="#B83A22" stroke="none"/><circle class="fa-ring-dot" style="animation-delay:2.4s" cx="100" cy="54" r="4.5" fill="#B83A22" stroke="none"/><circle class="fa-ring-dot" style="animation-delay:3.6s" cx="92" cy="82" r="4.5" fill="#B83A22" stroke="none"/><circle class="fa-ring-dot" style="animation-delay:4.8s" cx="68" cy="98" r="4.5" fill="#B83A22" stroke="none"/><circle class="fa-ring-dot" style="animation-delay:6s" cx="40" cy="94" r="4.5" fill="#B83A22" stroke="none"/><circle class="fa-ring-dot" style="animation-delay:7.2s" cx="22" cy="72" r="4.5" fill="#B83A22" stroke="none"/><circle class="fa-ring-dot" style="animation-delay:8.4s" cx="22" cy="44" r="4.5" fill="#B83A22" stroke="none"/><circle class="fa-ring-dot" style="animation-delay:9.6s" cx="38" cy="24" r="4.5" fill="#B83A22" stroke="none"/></g><circle class="fa-gold" stroke-width="1.2" cx="60" cy="58" r="14"/></svg>',
    acacia: '<svg viewBox="0 0 120 120"><g class="fa-acacia"><path class="fa-stroke" stroke-width="2.6" d="M 58,104 C 58,84 56,70 50,58 M 58,104 C 60,86 64,72 72,60"/><path class="fa-stroke" stroke-width="1.6" d="M 50,58 C 44,52 38,48 30,46 M 72,60 C 80,54 88,50 96,48 M 56,66 C 56,58 58,52 62,46"/><path class="fa-gold" stroke-width="2.4" d="M 18,44 C 34,32 50,28 62,28 C 78,28 94,34 104,44" opacity="0.9"/><path class="fa-gold" stroke-width="1.2" d="M 26,44 C 40,36 56,33 64,33 C 78,33 90,38 98,44" opacity="0.5"/></g><line class="fa-stroke" stroke-width="1" x1="26" y1="106" x2="94" y2="106" opacity="0.4"/></svg>'
  };

  var file = window.location.pathname.split('/').pop().replace('.html', '');
  var cfg = ERAS[file];
  if (!cfg) return;

  /* ── locator ── */
  var zone;
  if (cfg.zone.full) {
    zone = '<path class="fl-zone-full" d="' + OUTLINE + '"/>';
  } else if (cfg.zone.line) {
    zone = '<path class="fl-zone-line" d="' + cfg.zone.line + '"/>';
  } else {
    zone = '<ellipse class="fl-zone" cx="' + cfg.zone.cx + '" cy="' + cfg.zone.cy +
           '" rx="' + cfg.zone.rx + '" ry="' + cfg.zone.ry +
           '" transform="rotate(' + cfg.zone.rot + ' ' + cfg.zone.cx + ' ' + cfg.zone.cy + ')"/>';
  }
  var loc = document.createElement('aside');
  loc.className = 'fable-locator';
  loc.setAttribute('aria-label', 'Where this era sits on the territory map');
  loc.innerHTML =
    '<button class="fl-close" aria-label="Hide locator">×</button>' +
    '<div class="fl-era">' + cfg.era + '</div>' +
    '<div class="fl-dates">' + cfg.dates + '</div>' +
    '<svg viewBox="0 0 100 100" role="img" aria-hidden="true">' +
    '<circle cx="88" cy="10" r="0.9" fill="#E9EEF4" opacity="0.5"/>' +
    '<circle cx="12" cy="78" r="0.7" fill="#E9EEF4" opacity="0.35"/>' +
    '<circle cx="80" cy="88" r="0.6" fill="#C49A3C" opacity="0.4"/>' +
    '<path class="fl-coast" d="' + OUTLINE + '"/>' + zone + '</svg>' +
    '<a class="fl-link" href="xog-map.html">View on the map</a>';
  document.body.appendChild(loc);
  loc.querySelector('.fl-close').addEventListener('click', function () { loc.remove(); });

  /* ── artefact ── */
  var art = document.createElement('div');
  art.className = 'fable-artefact';
  art.setAttribute('aria-hidden', 'true');
  art.innerHTML = ART[cfg.artefact] || '';
  document.body.appendChild(art);
})();
