const header = document.getElementById('header');
const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
const progress = document.querySelector('.scroll-progress');

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  nav.querySelectorAll('details').forEach((group) => group.removeAttribute('open'));
}));

document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    nav.querySelectorAll('details').forEach((group) => group.removeAttribute('open'));
  }
});

document.querySelectorAll('[data-interest]').forEach((link) => link.addEventListener('click', () => {
  const interest = document.getElementById('interest');
  const requested = link.dataset.interest;
  const matchingOption = [...interest.options].find((option) => option.value === requested || option.text === requested);
  interest.value = matchingOption ? matchingOption.value : 'General enquiry';
}));

document.getElementById('enquiry').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const goal = String(data.get('message') || '').trim();
  const message = `Hello Vision Institute!\n\nMy name: ${String(data.get('name') || '').trim()}\nPhone: ${String(data.get('phone') || '').trim()}\nInterested in: ${data.get('interest')}${goal ? `\nMy goal: ${goal}` : ''}\n\nPlease share more details. Thank you!`;
  window.open(`https://wa.me/919981790168?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
document.querySelectorAll('[data-full]').forEach((button) => button.addEventListener('click', () => {
  lightboxImage.src = button.dataset.full;
  lightboxImage.alt = button.querySelector('img').alt;
  lightbox.showModal();
}));
lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });

document.getElementById('year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
  document.documentElement.classList.add('motion');
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

let ticking = false;
addEventListener('scroll', () => {
  if (ticking) return;
  requestAnimationFrame(() => {
    header.classList.toggle('fixed', scrollY > 80);
    const maxScroll = document.documentElement.scrollHeight - innerHeight;
    progress.style.width = `${maxScroll ? (scrollY / maxScroll) * 100 : 0}%`;
    ticking = false;
  });
  ticking = true;
}, { passive: true });
