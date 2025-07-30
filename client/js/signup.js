// signup.js

async function signupUser(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const submitButton = document.querySelector("button[type='submit']");

  // Disable button and show loading state
  submitButton.disabled = true;
  submitButton.textContent = "Signing up...";

  try {
    // Basic field validation
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Password match check
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Call backend API
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Signup failed: " + (data.message || "Something went wrong."));
      return;
    }

    alert("Signup successful! You can now log in.");
    window.location.href = "/client/auth/login.html";
  } catch (err) {
    console.error("Signup error:", err);
    alert("An error occurred. Please try again later.");
  } finally {
    // Re-enable button
    submitButton.disabled = false;
    submitButton.textContent = "Sign Up";
  }
}
