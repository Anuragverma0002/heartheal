function saveThought() {
  const input = document.getElementById("thoughtInput");
  const text = input.value.trim();
  if (!text) return;
  fetch("/api/thoughts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: text }),
  });
  input.value = "";
  loadThoughts();
}

async function loadThoughts() {
  const res = await fetch("/api/thoughts");
  const thoughts = await res.json();
  const list = document.getElementById("thoughtList");
  list.innerHTML = "";
  thoughts.forEach((t) => {
    const div = document.createElement("div");
    div.className = "vent-item";
    div.textContent = `${t.content} (${new Date(t.createdAt).toLocaleTimeString()})`;
    list.appendChild(div);
  });
}

// Fade animation
setInterval(() => {
  const el = document.getElementById("thoughtInput");
  if (el.value) {
    setTimeout(() => {
      el.value = "";
    }, 60000); // 60 seconds
  }
}, 5000);

loadThoughts();
