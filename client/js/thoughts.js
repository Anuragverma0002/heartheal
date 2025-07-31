document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "https://heartheal.onrender.com"; // Change to http://localhost:3000 for local dev
  const input = document.getElementById("thoughtInput");
  const list = document.getElementById("thoughtList");
  const saveBtn = document.getElementById("saveThoughtBtn");

  // Save a new thought
  async function saveThought() {
    const text = input.value.trim();
    if (!text) return;

    try {
      const res = await fetch(`${BASE_URL}/api/thoughts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("Error saving thought:", err);
        alert("Failed to save thought.");
        return;
      }

      input.value = "";
      loadThoughts();
    } catch (err) {
      console.error("Save failed:", err);
    }
  }

  // Load all thoughts
  async function loadThoughts() {
    try {
      const res = await fetch(`${BASE_URL}/api/thoughts`);
      if (!res.ok) throw new Error("Failed to fetch thoughts.");
      const thoughts = await res.json();

      list.innerHTML = "";

      thoughts.reverse().forEach((t) => {
        const div = document.createElement("div");
        div.className = "vent-item";
          const dateObj = new Date(t.createdAt);
        const formattedDate = dateObj.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        const time = new Date(t.createdAt).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        });
        div.textContent = `${t.content} (${time})`;
        list.appendChild(div);
      });
    } catch (err) {
      console.error("Load failed:", err);
      list.innerHTML = "<p>Could not load thoughts.</p>";
    }
  }

  // Auto-clear thought input after 60 seconds
  setInterval(() => {
    if (input.value) {
      setTimeout(() => {
        input.value = "";
      }, 60000);
    }
  }, 5000);

  // Bind save button
  if (saveBtn) {
    saveBtn.addEventListener("click", saveThought);
  }

  // Initial load
  loadThoughts();
});
