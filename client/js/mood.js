let chart;

// 🌈 Mood labels for better readability
const moodLabels = {
  1: "Very Low 😞",
  2: "Low 🙁",
  3: "Neutral 😐",
  4: "Hopeful 🙂",
  5: "Great 😄"
};

// 🌈 Theme switcher based on mood
function applyMoodTheme(mood) {
  const root = document.documentElement;

  if (mood <= 2) {
    root.style.setProperty('--bg-color', '#f3e5f5');
    root.style.setProperty('--text-color', '#4a148c');
    root.style.setProperty('--accent-color', '#ce93d8');
    root.style.setProperty('--header-color', '#6a1b9a');
  } else if (mood === 3) {
    root.style.setProperty('--bg-color', '#fce4ec');
    root.style.setProperty('--text-color', '#880e4f');
    root.style.setProperty('--accent-color', '#f06292');
    root.style.setProperty('--header-color', '#ad1457');
  } else {
    root.style.setProperty('--bg-color', '#e1f5fe');
    root.style.setProperty('--text-color', '#01579b');
    root.style.setProperty('--accent-color', '#4fc3f7');
    root.style.setProperty('--header-color', '#0277bd');
  }
}

// 📥 Mood submission handler
async function logMood(e) {
  e.preventDefault();

  const mood = parseInt(document.getElementById("mood").value);
  const note = document.getElementById("note").value.trim();

  if (isNaN(mood) || mood < 1 || mood > 5) return;

  applyMoodTheme(mood);

fetch("http://localhost:3000/api/moods", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ mood, note })
  }).then(async (res) => {
  if (!res.ok) {
    const err = await res.text();
    console.error("Mood save failed:", err);
  }
});

  document.getElementById("mood").value = "";
  document.getElementById("note").value = "";

  loadChart();
}

// 📊 Load and display mood chart
async function loadChart() {
  const res = await fetch("/api/moods");
  const data = await res.json();

  if (!data || data.length === 0) return;

  const now = new Date();

  const labels = data.map((entry) => {
    const entryDate = new Date(entry.date);
    const daysDiff = Math.floor((now - entryDate) / (1000 * 60 * 60 * 24));

    if (daysDiff === 0) return "Today";
    if (daysDiff === 1) return "Yesterday";
    return `${daysDiff} days ago`;
  });

  const values = data.map((entry) => entry.mood);
  const notes = data.map((entry) => entry.note || "No note");

  const lastMood = values[values.length - 1];
  applyMoodTheme(lastMood);

  // 🌟 Save current mood to localStorage
  localStorage.setItem("userMood", lastMood);

  // 🌟 Display motivational quote
  const moodQuotes = {
    1: "It's okay to not be okay. You're doing your best.",
    2: "Healing takes time. Breathe.",
    3: "Progress is progress, no matter how small.",
    4: "The sun will rise and so will you.",
    5: "Your heart is stronger than you think. 💪"
  };
  const moodQuoteEl = document.getElementById("moodQuote");
  if (moodQuoteEl) {
    moodQuoteEl.textContent =
      moodQuotes[lastMood] || "You matter. You’re loved.";
  }

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("moodChart"), {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Mood Over Time",
        data: values,
        borderColor: getComputedStyle(document.documentElement).getPropertyValue('--accent-color') || '#4fc3f7',
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-color') || '#e1f5fe',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    options: {
      scales: {
        y: {
          min: 1,
          max: 5,
          ticks: {
            stepSize: 1,
            callback: (value) => moodLabels[value] || value
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              const mood = moodLabels[context.parsed.y] || context.parsed.y;
              const note = notes[context.dataIndex];
              return `${mood} - ${note}`;
            }
          }
        }
      }
    }
  });
}

// 🚀 Load on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  loadChart();
  document.getElementById("moodForm")?.addEventListener("submit", logMood);
});
