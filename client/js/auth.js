// js/auth.js

// Toggle forms
document.getElementById("loginBtn").addEventListener("click", () => {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("signupForm").classList.add("hidden");
});

document.getElementById("signupBtn").addEventListener("click", () => {
  document.getElementById("signupForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
});

// Handle Login
document.querySelector("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return alert("Login failed: " + (data.message || "Invalid credentials"));
    }

    // Success
    alert("Welcome back!");
    window.location.href = "/client/home.html";
  } catch (err) {
    console.error("Login error:", err);
    alert("An error occurred during login.");
  }
});

// Handle Signup
document.querySelector("#signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("signupConfirm").value.trim();

  if (!name || !email || !password || !confirmPassword) {
    return alert("Please fill in all fields.");
  }

  if (password !== confirmPassword) {
    return alert("Passwords do not match.");
  }

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return alert("Signup failed: " + (data.message || "Try again later."));
    }

    alert("Signup successful! Now log in.");
    document.getElementById("loginForm").classList.remove("hidden");
    document.getElementById("signupForm").classList.add("hidden");
  } catch (err) {
    console.error("Signup error:", err);
    alert("An error occurred during signup.");
  }
});
