'use strict';

// Native dialog provides focus containment and Escape handling.
// Every photo remains an ordinary image link without JavaScript.
(() => {
  const dialog = document.querySelector('#visit-lightbox');
  const items = Array.from(document.querySelectorAll('[data-gallery-item]'));
  if (!dialog || typeof dialog.showModal !== 'function' || !items.length) return;

  const image = dialog.querySelector('#lightbox-image');
  const caption = dialog.querySelector('#lightbox-caption');
  const category = dialog.querySelector('#lightbox-category');
  const counter = dialog.querySelector('#lightbox-counter');
  const error = dialog.querySelector('#lightbox-image-error');
  const original = dialog.querySelector('#lightbox-original');
  const figure = dialog.querySelector('.lightbox-figure');
  let current = 0;
  let opener = null;
  let touchStart = null;

  function renderPhoto(index) {
    current = (index + items.length) % items.length;
    const item = items[current];
    const source = item.querySelector('img');
    error.hidden = true;
    image.hidden = false;
    image.alt = source.alt;
    image.width = source.width || Number(source.getAttribute('width'));
    image.height = source.height || Number(source.getAttribute('height'));
    image.src = item.href;
    original.href = item.href;
    caption.textContent = item.dataset.caption;
    category.textContent = item.dataset.category;
    counter.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(items.length).padStart(2, '0');
  }

  function openGallery(index, trigger) {
    opener = trigger;
    renderPhoto(index);
    dialog.showModal();
    document.body.classList.add('gallery-is-open');
  }

  items.forEach((item, index) => item.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    openGallery(index, item);
  }));
  document.querySelectorAll('[data-gallery-open]').forEach(trigger => {
    trigger.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      openGallery(0, trigger);
    });
  });

  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.lightbox-prev').addEventListener('click', () => renderPhoto(current - 1));
  dialog.querySelector('.lightbox-next').addEventListener('click', () => renderPhoto(current + 1));
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      renderPhoto(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('gallery-is-open');
    touchStart = null;
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
  });
  image.addEventListener('error', () => { image.hidden = true; error.hidden = false; });
  image.addEventListener('load', () => { image.hidden = false; error.hidden = true; });

  figure.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) { touchStart = null; return; }
    touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }, { passive: true });
  figure.addEventListener('touchend', event => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) renderPhoto(current + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, { passive: true });
  figure.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
})();
