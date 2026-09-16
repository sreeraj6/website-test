// Lush Marketing — loads editable content from /content/*.json so that
// updates made in the CMS (/admin) appear on the site without touching this file.

document.getElementById('year').textContent = new Date().getFullYear();

// Header background toggles once the hero has scrolled past.
const header = document.getElementById('siteHeader');
const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

async function loadJSON(path) {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error(res.status);
    return await res.json();
  } catch (err) {
    console.warn('Could not load', path, '— keeping existing page content.', err);
    return null;
  }
}

function setText(id, value) {
  if (!value) return;
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function paragraphs(container, items) {
  if (!container || !Array.isArray(items) || !items.length) return;
  container.innerHTML = '';
  items.forEach((text, i) => {
    const p = document.createElement('p');
    if (i === 0) p.classList.add('lead');
    p.textContent = text;
    container.appendChild(p);
  });
}

(async function hydrate() {
  document.body.classList.add('content-loading');

  const [hero, pillars, approach, about, contact] = await Promise.all([
    loadJSON('content/hero.json'),
    loadJSON('content/pillars.json'),
    loadJSON('content/approach.json'),
    loadJSON('content/about.json'),
    loadJSON('content/contact.json'),
  ]);

  if (hero) {
    setText('heroHeadline', hero.headline);
    setText('heroSubhead', hero.subhead);
    const cta = document.getElementById('heroCta');
    if (cta) {
      if (hero.cta_label) cta.textContent = hero.cta_label;
      if (hero.cta_link) cta.setAttribute('href', hero.cta_link);
    }
  }

  if (pillars && Array.isArray(pillars.items)) {
    const row = document.getElementById('pillarsRow');
    const variants = ['one', 'two', 'three'];
    row.innerHTML = '';
    pillars.items.forEach((item, i) => {
      const article = document.createElement('article');
      article.className = `bubble bubble--${variants[i % 3]}`;
      const img = document.createElement('img');
      img.src = item.image || 'images/logo.webp';
      img.alt = item.title || '';
      img.loading = 'lazy';
      const h3 = document.createElement('h3');
      h3.textContent = item.title || '';
      const p = document.createElement('p');
      p.textContent = item.body || '';
      article.append(img, h3, p);
      row.appendChild(article);
    });
  }

  if (approach) {
    setText('approachHeading', approach.heading);
    paragraphs(document.getElementById('approachBody'), approach.paragraphs);
  }

  if (about) {
    setText('aboutHeading', about.heading);
    setText('aboutIntro', about.intro);
    setText('aboutQuote', about.pull_quote);
    paragraphs(document.getElementById('aboutParagraphs'), about.paragraphs);
    if (about.image) {
      const img = document.querySelector('.about-media img');
      if (img) img.src = about.image;
    }
  }

  if (contact) {
    setText('contactHeading', contact.heading);
    setText('contactBody', contact.body);
    const emailEl = document.getElementById('contactEmail');
    if (emailEl && contact.email) {
      emailEl.textContent = contact.email;
      emailEl.setAttribute('href', `mailto:${contact.email}`);
    }
    const phoneEl = document.getElementById('contactPhone');
    if (phoneEl && contact.phone) {
      phoneEl.textContent = contact.phone;
      phoneEl.setAttribute('href', `tel:${contact.phone.replace(/\s+/g, '')}`);
    }
  }

  document.body.classList.remove('content-loading');
})();
