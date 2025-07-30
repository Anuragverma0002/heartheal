async function submitVent() {
  const input = document.getElementById("ventInput").value;
  if (!input.trim()) return;

  await fetch("/api/vents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),  // ✅ FIXED: "message"
  });

  document.getElementById("ventInput").value = "";
  loadVents();
}

async function loadVents() {
  const res = await fetch("/api/vents");
  const vents = await res.json();
  const list = document.getElementById("ventList");
  list.innerHTML = "";
  vents.forEach((v) => {
    const el = document.createElement("div");
    el.className = "vent-item";
    el.innerHTML = `
      <p>${v.message}</p>
      <small>${new Date(v.createdAt).toLocaleString()}</small><br/>
      <div class="reactions">
        <button>💙</button>
        <button>🤗</button>
        <button>✨</button>
      </div>
    `;
    list.appendChild(el);
  });
}

loadVents();
