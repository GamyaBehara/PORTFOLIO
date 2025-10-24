// Active navigation link highlighting on scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActiveLink() {
    navLinks.forEach((link) => link.classList.remove('active'));
    
    // Get current scroll position with a small offset for better section detection
    const scrollPosition = window.scrollY + 60;
    
    // Find which section we're currently in
    sections.forEach((section) => {
      if (section.id === 'about') return; // Skip about section since it's in hero
      
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }

  setActiveLink();
  window.addEventListener('scroll', setActiveLink);

  // Smooth scroll fallback for older browsers
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update hash without jumping
        history.pushState(null, '', href);
      }
    });
  });
});

// Ensure hero fills viewport under the header so the next section doesn't peek through
function resizeHero() {
  const header = document.querySelector('header');
  const hero = document.querySelector('.hero');
  if (!hero || !header) return;
  const headerHeight = header.getBoundingClientRect().height;
  const vh = window.innerHeight;
  // compute available height under header
  const available = Math.max(420, vh - headerHeight);
  // if hero content is smaller than available, force the height so the next section won't peek;
  // otherwise allow the hero to size naturally (auto) so content isn't clipped on small screens
  if (hero.scrollHeight <= available) {
    hero.style.height = available + 'px';
    hero.style.minHeight = available + 'px';
  } else {
    hero.style.height = 'auto';
    hero.style.minHeight = '';
  }
}


document.querySelectorAll('.about-me').forEach(p => {
  p.innerHTML = p.innerHTML.replace(/\|/g, '<span class="pipe">|</span>');
});

window.addEventListener('load', resizeHero);
window.addEventListener('resize', resizeHero);

// run once in case DOMContentLoaded already fired earlier
resizeHero();
