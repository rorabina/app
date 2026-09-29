(function () {
  let clockElement = null;

  function updateClock() {
    // Locate the target element containing "NULL1" on the first run
    if (!clockElement) {
      const elements = Array.from(document.querySelectorAll('*'));
      clockElement = elements.find(
        (el) => el.children.length === 0 && el.textContent.trim().toUpperCase() === 'NULL1'
      );
    }

    if (clockElement) {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedHours = String(hours).padStart(2, '0');

      clockElement.textContent = `${formattedHours}:${minutes}:${seconds} ${ampm}`;
    }
  }

  function styleMobiriseBar() {
    // Find the link or container injected by Mobirise at the bottom
    const mobiriseLink = document.querySelector('a[href*="mobirise"]');
    if (mobiriseLink) {
      const container = mobiriseLink.closest('section') || mobiriseLink.parentElement;
      if (container) {
        container.style.backgroundColor = '#000000';
        container.style.color = '#555555';
      }
      mobiriseLink.style.color = '#555555';
      mobiriseLink.style.backgroundColor = '#000000';
    }
  }

  // Run on page load
  updateClock();
  styleMobiriseBar();

  // Run again once DOM finishes loading to catch dynamic Mobirise footer injection
  document.addEventListener('DOMContentLoaded', styleMobiriseBar);

  // Continuously update clock seconds every second
  setInterval(updateClock, 1000);
})();
