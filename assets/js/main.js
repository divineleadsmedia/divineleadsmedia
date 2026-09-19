/**
 * DivineLeads Media - Interactive UI Engine & Page Handlers
 * Smooth scroll, 3D Hero Orb tilt physics, sticky card animation,
 * modal dialogs, and video lightbox controllers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initHeroOrbInteractions();
  initModals();
  initVideoPlayer();
  initWebinarModal();
  initActiveNav();
});

// 1. Header scroll effect
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

// 2. Mobile Navigation Drawer
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeBtns = document.querySelectorAll('.close-drawer');

  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// 3. 3D Hero Orb Parallax Tilt
function initHeroOrbInteractions() {
  const heroSection = document.querySelector('.hero-section');
  const orbWrap = document.querySelector('.hero-orb-wrap');
  const orbCore = document.querySelector('.orb-core');

  if (!heroSection || !orbWrap || !orbCore) return;

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    orbWrap.style.transform = `translateY(calc(-50% + ${y * 30}px)) translateX(${x * 30}px)`;
    orbCore.style.transform = `translate(calc(-50% + ${x * 20}px), calc(-50% + ${y * 20}px)) rotate(${x * 15}deg)`;
  });

  heroSection.addEventListener('mouseleave', () => {
    orbWrap.style.transform = 'translateY(-50%) translateX(0)';
    orbCore.style.transform = 'translate(-50%, -50%) rotate(0deg)';
  });
}

// 4. Active Nav Highlighting
function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// 5. Global Modal Dialogs
function initModals() {
  document.querySelectorAll('.modal-close-btn, .modal-overlay').forEach(el => {
    el.addEventListener('click', (e) => {
      if (e.target === el || el.classList.contains('modal-close-btn')) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  document.body.style.overflow = '';
  // Stop any playing iframes
  document.querySelectorAll('.video-modal-wrap iframe').forEach(iframe => {
    iframe.src = iframe.src;
  });
}

// 6. Video Player Lightbox
function initVideoPlayer() {
  const videoCards = document.querySelectorAll('.video-card');
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('videoPlayerIframe');
  const videoTitleEl = document.getElementById('videoModalTitle');

  if (!videoModal || !videoIframe) return;

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const embedUrl = card.getAttribute('data-embed') || 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1';
      const title = card.getAttribute('data-title') || 'DivineLeads Media Video';
      
      videoIframe.src = embedUrl;
      if (videoTitleEl) videoTitleEl.textContent = title;
      openModal('videoModal');
    });
  });
}

// 7. Webinar Registration Modal
function initWebinarModal() {
  const regButtons = document.querySelectorAll('[data-action="register-webinar"]');
  const regModal = document.getElementById('webinarRegModal');
  const titleEl = document.getElementById('webinarModalTitle');
  const webinarForm = document.getElementById('webinarForm');

  if (!regModal) return;

  regButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const webinarTitle = btn.getAttribute('data-webinar-title') || 'Upcoming Webinar';
      if (titleEl) titleEl.textContent = webinarTitle;
      openModal('webinarRegModal');
    });
  });

  if (webinarForm) {
    webinarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('🎉 Thank you! Your seat has been reserved. You will receive a calendar invitation via email.');
      closeAllModals();
      webinarForm.reset();
    });
  }
}

// Toast Helper
window.showToast = function(message, type = 'success') {
  const existing = document.getElementById('dlm-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'dlm-toast';
  toast.style.position = 'fixed';
  toast.style.bottom = '28px';
  toast.style.right = '28px';
  toast.style.zIndex = '9999';
  toast.style.background = type === 'success' ? 'rgba(15, 23, 42, 0.95)' : 'rgba(153, 27, 27, 0.95)';
  toast.style.border = type === 'success' ? '1px solid #4ADE80' : '1px solid #EF4444';
  toast.style.color = '#fff';
  toast.style.padding = '14px 24px';
  toast.style.borderRadius = '10px';
  toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
  toast.style.fontFamily = 'var(--font-mono, monospace)';
  toast.style.fontSize = '0.88rem';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '10px';
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '⚠'}</span> <span>${message}</span>`;

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
};
