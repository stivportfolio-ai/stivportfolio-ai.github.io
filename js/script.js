/* =========================
   UTIL: header height -> CSS var
========================= */
function setHeaderHeightVar() {
  const h = document.querySelector('header').offsetHeight || 100;
  document.documentElement.style.setProperty('--header-h', h + 'px');
}

/* =========================
   BOOK-STYLE ΠΛΟΗΓΗΣΗ
========================= */
const PAGE_IDS = ['home','about','projects','contact'];
let currentIndex = 0;

function setPagesWidth() {
  const pages = document.getElementById('pages');
  const count = pages?.children?.length || PAGE_IDS.length;
  // Δεν είναι απαραίτητο να ορίσουμε width με px: το flex αναλαμβάνει.
  // Αν θες να το κάνεις “οπτικά” ξεκάθαρο:
  // pages.style.width = (count * 100) + '%';
}

function goToPageById(id) {
  const idx = PAGE_IDS.indexOf(id);
  if (idx === -1) return;
  currentIndex = idx;

  const pages = document.getElementById('pages');
  pages.classList.add('is-tilting');
  pages.style.transform = `translateX(-${idx * 100}%)`;
  setActiveButton(id);

  setTimeout(() => pages.classList.remove('is-tilting'), 650);
}

function scrollToSection(sectionId) {
  // Κρατάμε το ίδιο API στα κουμπιά, αλλά δεν κάνουμε window scroll.
  goToPageById(sectionId);
}

function setActiveButton(sectionId) {
  const buttons = document.querySelectorAll('nav button');
  buttons.forEach(btn => btn.classList.remove('active'));
  const btn = document.querySelector(`nav button[onclick="scrollToSection('${sectionId}')"]`);
  if (btn) btn.classList.add('active');
}

/* =========================
   COPY EMAIL
========================= */
function copyEmail() {
  const email = document.getElementById("email").textContent.trim();
  const copyMsg = document.getElementById("copy-msg");
  navigator.clipboard.writeText(email).then(() => {
    copyMsg.style.display = "inline";
    setTimeout(() => { copyMsg.style.display = "none"; }, 2000);
  });
}
window.copyEmail = copyEmail; // για να δουλεύει από inline onclick

/* =========================
   BACKGROUND SHAPES
========================= */
function spawnShapes(count = 22) {
  const container = document.querySelector('.background-shapes');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'shape';

    s.style.left = Math.random() * 100 + 'vw';
    const size = 12 + Math.random() * 48;   // 12–60px
    s.style.width = size + 'px';
    s.style.height = size + 'px';

    const dur = 12 + Math.random() * 14;    // 12–26s
    const delay = -Math.random() * 14;      // ξεκινά “στη μέση”
    s.style.animationDuration = dur + 's';
    s.style.animationDelay = delay + 's';

    container.appendChild(s);
  }
}

/* =========================
   KEYBOARD & SWIPE (προαιρετικό)
========================= */
function setupKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      const next = Math.min(currentIndex + 1, PAGE_IDS.length - 1);
      goToPageById(PAGE_IDS[next]);
    } else if (e.key === 'ArrowLeft') {
      const prev = Math.max(currentIndex - 1, 0);
      goToPageById(PAGE_IDS[prev]);
    }
  });
}

function setupSwipeNav() {
  let startX = null;
  const app = document.getElementById('app');
  if (!app) return;

  app.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, {passive:true});

  app.addEventListener('touchmove', (e) => {
    if (startX === null) return;
    const dx = e.touches[0].clientX - startX;
    // αν σέρνεις αρκετά προς τα αριστερά/δεξιά, πήγαινε σε άλλη σελίδα
    if (dx < -80) {
      const next = Math.min(currentIndex + 1, PAGE_IDS.length - 1);
      goToPageById(PAGE_IDS[next]);
      startX = null;
    } else if (dx > 80) {
      const prev = Math.max(currentIndex - 1, 0);
      goToPageById(PAGE_IDS[prev]);
      startX = null;
    }
  }, {passive:true});

  app.addEventListener('touchend', () => { startX = null; });
}

/* =========================
   INIT
========================= */
document.addEventListener('DOMContentLoaded', () => {
  setHeaderHeightVar();
  setPagesWidth();
  spawnShapes(22);
  goToPageById('home');
  setupKeyboardNav();
  setupSwipeNav();
  spawnShapes(40); // <— ΦΤΙΑΞΕ ΤΑ ΣΧΗΜΑΤΑ
});

window.addEventListener('resize', setHeaderHeightVar);
