Looking at [`clock.html`](https://rorabina.github.io/app/clock.html) and your repository's [`clock.js`](https://github.com/rorabina/app/blob/gh-pages/clock.js), the script is finding the `"CLOCK"` element once on page load, but the target element is lost on subsequent ticks.

Here is why it freezes:

1. On the first run, `clock.js` finds the element with text `"CLOCK"` and replaces its text with `"08:49:24 PM"`.
2. One second later, `setInterval` calls `updateClock()` again.
3. The script searches for an element whose text content equals `"clock"`. Because the element's text is now `"08:49:24 PM"` (and no longer `"clock"`), the search fails to find `clockElement` and immediately exits without updating the time!

---

### The Fix

To ensure the script keeps track of the element even after its text changes, update [`clock.js`](https://github.com/rorabina/app/blob/gh-pages/clock.js) to store a reference to the matched element outside the repeating function:

```javascript
(function () {
  let clockElement = null;

  function updateClock() {
    // Locate the target element on the first run, or if it isn't cached yet
    if (!clockElement) {
      clockElement = document.getElementById('clock') || document.querySelector('.clock');

      if (!clockElement) {
        const elements = Array.from(document.querySelectorAll('*'));
        clockElement = elements.find(
          (el) => el.children.length === 0 && el.textContent.trim().toLowerCase() === 'clock'
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

```

### Why this works:

By caching `clockElement` in a variable outside `updateClock()`, the script remembers which element it found the first time and will keep updating its text content every second regardless of what string it contains.
