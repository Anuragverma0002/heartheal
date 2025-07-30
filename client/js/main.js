window.addEventListener("DOMContentLoaded", async () => {
  const quoteEl = document.getElementById("quoteText");
  const res = await fetch("/api/quotes/random?mood=medium");
  const data = await res.json();
  quoteEl.textContent = `"${data.quote}"`;
});
