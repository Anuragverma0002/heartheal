document.addEventListener("DOMContentLoaded", () => {
  // Check if it's login page
  const loginForm = document.querySelector("form[onsubmit*='loginUser']");
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
        const res = await fetch("https://heartheal.onrender.com/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return alert("Login failed: " + (data.message || "Invalid credentials"));
        }

        alert("Welcome back!");
        window.location.href = "/client/home.html";
      } catch (err) {
        console.error("Login error:", err);
        alert("An error occurred during login.");
      }
    });
  }

  // Check if it's signup page
  const signupForm = document.querySelector("form[onsubmit*='registerUser']");
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
        const res = await fetch("https://heartheal.onrender.com/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return alert("Signup failed: " + (data.message || "Try again later."));
        }

        alert("Signup successful! You can now log in.");
        window.location.href = "/client/login.html";
      } catch (err) {
        console.error("Signup error:", err);
        alert("An error occurred during signup.");
      }
    });
  }
});
