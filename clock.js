(function () {
  let clockElement = null;

  function updateClock() {
    // Locate the target element on the first run, or if it isn't cached yet
    if (!clockElement) {
      clockElement = document.getElementById('clock') || document.querySelector('.clock');

      if (!clockElement) {
        const elements = Array.from(document.querySelectorAll('*'));
        // Searches for leaf elements whose exact text content is "NULL1"
        clockElement = elements.find(
          (el) => el.children.length === 0 && el.textContent.trim().toUpperCase() === 'NULL1'
        );
      }
    }

    if (!clockElement) return;

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

  // Run immediately once loaded
  updateClock();

  // Continuously update every second (1000ms)
  setInterval(updateClock, 1000);
})();
