(function () {
  function updateClock() {
    const elements = Array.from(document.querySelectorAll('*'));
    const clockElement = elements.find(
      (el) => el.children.length === 0 && el.textContent.trim() === 'CLOCK'
    ) || document.getElementById('clock');

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

  updateClock();
  setInterval(updateClock, 1000);
})();
