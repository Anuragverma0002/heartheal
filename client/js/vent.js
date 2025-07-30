document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "https://heartheal.onrender.com"; // Change to http://localhost:3000 for local dev

  const input = document.getElementById("ventInput");
  const list = document.getElementById("ventList");
  const submitBtn = document.getElementById("submitVentBtn");

  // 🌬️ Submit a new vent message
  async function submitVent() {
    const text = input.value.trim();
    if (!text) return;

    try {
      const res = await fetch(`${BASE_URL}/api/vents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Error submitting vent:", err);
        alert("Failed to post your vent.");
        return;
      }

      input.value = "";
      loadVents();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  }

  // 📜 Load all vents
  async function loadVents() {
    try {
      const res = await fetch(`${BASE_URL}/api/vents`);
      if (!res.ok) throw new Error("Failed to fetch vents.");
      const vents = await res.json();

      list.innerHTML = "";

      vents.reverse().forEach((v) => {
        const el = document.createElement("div");
        el.className = "vent-item";
        el.innerHTML = `
          <p>${sanitize(v.message)}</p>
          <small>${new Date(v.createdAt).toLocaleString()}</small>
          <div class="reactions">
            <button title="Support">💙</button>
            <button title="Hug">🤗</button>
            <button title="Hope">✨</button>
          </div>
        `;
        list.appendChild(el);
      });
    } catch (err) {
      console.error("Load failed:", err);
      list.innerHTML = "<p>Could not load vents.</p>";
    }
  }

  // 🛡️ Prevent XSS from user input
  function sanitize(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // Bind submit button
  if (submitBtn) {
    submitBtn.addEventListener("click", submitVent);
  }

  loadVents();
});
