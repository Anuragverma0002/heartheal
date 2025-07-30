document.addEventListener("DOMContentLoaded", () => {
  const BASE_URL = "https://heartheal.onrender.com";

  // LOGIN HANDLER
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      if (!email || !password) {
        alert("Please enter both email and password.");
        return;
      }

      try {
        const res = await fetch(`${BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return alert("Login failed: " + (data.error || "Invalid credentials"));
        }

        alert("Welcome back!");
        // Optionally store token: localStorage.setItem("token", data.token);
        window.location.href = "/home.html";  // ✅ update path as per Vercel structure
      } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred during login.");
      }
    });
  }

  // SIGNUP HANDLER
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirm").value;

      if (!name || !email || !password || !confirmPassword) {
        return alert("Please fill in all fields.");
      }

      if (password !== confirmPassword) {
        return alert("Passwords do not match.");
      }

      try {
        const res = await fetch(`${BASE_URL}/api/auth/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return alert("Signup failed: " + (data.error || "Try again later."));
        }

        alert("Signup successful! You can now log in.");
        window.location.href = "/auth/login.html";  // ✅ update path as per Vercel structure
      } catch (err) {
        console.error("Signup error:", err);
        alert("An error occurred during signup.");
      }
    });
  }
});
