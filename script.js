
(() => {
  'use strict';
  let playing = null;
  const playPath = '<path d="m8 5 12 7-12 7Z"></path>';
  const pausePath = '<path d="M8 5v14M16 5v14"></path>';
  const buttons = Array.from(document.querySelectorAll('.play-toggle'));
  function updatePlayback() {
    buttons.forEach(button => {
      const isHero = button.dataset.track === 'mix';
      const isPlaying = isHero ? playing !== null : playing === button.dataset.track;
      const svg = button.querySelector('svg');
      if (svg) svg.innerHTML = isPlaying ? pausePath : playPath;
      const label = button.querySelector('.play-label');
      if (label) label.textContent = isPlaying ? 'Pause' : 'Play Something';
      const name = isHero ? 'Something' : button.dataset.track === 'chill' ? 'Chill Vibes' : button.dataset.track;
      button.setAttribute('aria-label', `${isPlaying ? 'Pause' : 'Play'} ${name}`);
      button.setAttribute('aria-pressed', String(isPlaying));
    });
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    playing = button.dataset.track === 'mix' ? (playing ? null : 'mix') : (playing === button.dataset.track ? null : button.dataset.track);
    updatePlayback();
  }));
  document.querySelectorAll('[data-nav]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-nav]').forEach(item => {
        const selected = item === button;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-pressed', String(selected));
      });
    });
  });
})();
