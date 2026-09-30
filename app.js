'use strict';

// Navigation stays usable with keyboard, touch, and reduced motion preferences.
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');
const header = document.querySelector('.site-header');

function closeMenu(returnFocus = false) {
  mobileMenu.hidden = true;
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Ouvrir le menu');
  if (returnFocus) menuButton.focus();
}

menuButton.addEventListener('click', () => {
  const isOpening = menuButton.getAttribute('aria-expanded') !== 'true';
  mobileMenu.hidden = !isOpening;
  menuButton.setAttribute('aria-expanded', String(isOpening));
  menuButton.setAttribute('aria-label', isOpening ? 'Fermer le menu' : 'Ouvrir le menu');
});
mobileMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileMenu.hidden) closeMenu(true);
});
document.addEventListener('click', event => {
  if (!header.contains(event.target) && !mobileMenu.hidden) closeMenu();
});
window.matchMedia('(min-width: 961px)').addEventListener('change', event => {
  if (event.matches) closeMenu();
});
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 20); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

// These maps are explicitly neighborhood landmarks, not unverified gym pins.
const locations = {
  ouakam: {
    number: '/ 01',
    title: 'OUAKAM COMICO.',
    description: 'Votre rendez-vous sportif au cœur de Comico, à Ouakam.',
    query: 'Comico Ouakam Dakar Senegal',
    mapTitle: 'Carte du quartier Comico à Ouakam, Dakar',
    message: "Bonjour Home Fitness, pouvez-vous m’envoyer le point GPS exact de la salle Ouakam Comico ?"
  },
  monument: {
    number: '/ 02',
    title: 'MONUMENT DE LA RENAISSANCE.',
    description: 'Retrouvez Home Fitness dans le secteur du Monument de la Renaissance, à Dakar.',
    query: 'Monument de la Renaissance Africaine Dakar Senegal',
    mapTitle: 'Carte du secteur du Monument de la Renaissance, Dakar',
    message: "Bonjour Home Fitness, pouvez-vous m’envoyer le point GPS exact de la salle du Monument de la Renaissance ?"
  }
};
const locationTabs = Array.from(document.querySelectorAll('[data-location]'));
const panel = document.querySelector('#location-panel');
let selectedLocation = 'ouakam';
function selectLocation(tab) {
  const key = tab.dataset.location;
  if (key === selectedLocation) return;
  selectedLocation = key;
  const location = locations[key];
  locationTabs.forEach(item => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
  });
  panel.setAttribute('aria-labelledby', tab.id);
  document.querySelector('#location-number').textContent = location.number;
  document.querySelector('#location-name').textContent = location.title;
  document.querySelector('#location-description').textContent = location.description;
  const map = document.querySelector('#location-map');
  map.title = location.mapTitle;
  map.src = 'https://www.google.com/maps?q=' + encodeURIComponent(location.query) + '&z=15&output=embed';
  document.querySelector('#map-link').href = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(location.query);
  document.querySelector('#gps-link').href = 'https://wa.me/221777167816?text=' + encodeURIComponent(location.message);
}
locationTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectLocation(tab));
  tab.addEventListener('keydown', event => {
    let target = null;
    if (event.key === 'ArrowRight') target = locationTabs[(index + 1) % locationTabs.length];
    if (event.key === 'ArrowLeft') target = locationTabs[(index - 1 + locationTabs.length) % locationTabs.length];
    if (event.key === 'Home') target = locationTabs[0];
    if (event.key === 'End') target = locationTabs[locationTabs.length - 1];
    if (target) { event.preventDefault(); target.focus(); selectLocation(target); }
  });
});

// Always use Dakar time even when the visitor is abroad.
function openingState(now) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Dakar', hour: '2-digit', minute: '2-digit', weekday: 'short', hourCycle: 'h23'
  }).formatToParts(now);
  const value = type => parts.find(part => part.type === type).value;
  const minutes = Number(value('hour')) * 60 + Number(value('minute'));
  return {
    open: minutes >= 360 && minutes < 1410,
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(value('weekday'))
  };
}
function updateOpeningHours() {
  const state = openingState(new Date());
  document.querySelectorAll('[data-status]').forEach(element => {
    element.classList.toggle('is-open', state.open);
    element.classList.toggle('is-closed', !state.open);
    element.textContent = state.open ? 'Ouvert · jusqu’à 23:30' : 'Fermé · ouverture à 06:00';
  });
  document.querySelectorAll('[data-day]').forEach(row => row.classList.toggle('today', Number(row.dataset.day) === state.day));
}
updateOpeningHours();
setInterval(updateOpeningHours, 30000);
document.querySelector('#year').textContent = new Date().getFullYear();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  if (!reducedMotion.matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
    document.body.classList.add('motion-ready');
  }
  const navLinks = document.querySelectorAll('.desktop-nav a');
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) navLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-20% 0px -60% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
}
