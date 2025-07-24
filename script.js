// Save user to localStorage on Sign Up
function validateSignUpForm(event) {
    event.preventDefault();

    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const age = parseInt(document.getElementById("signup-age").value.trim());

    if (!username || !email || !password || isNaN(age)) {
        alert("Please fill in all fields.");
        return;
    }

    if (age < 18) {
        alert("You must be at least 18 years old to sign up.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(user => user.email === email)) {
        alert("User already exists with this email.");
        return;
    }

    users.push({ username, email, password, age });
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", email); // ✅ Store current logged-in user
    window.location.href = "homepage.html";
}

// Login with validation
function validateLoginForm(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (!email || !password) {
        alert("Please fill in both fields.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
        alert("Invalid email or password.");
        return;
    }

    localStorage.setItem("currentUser", email); // ✅ Store current logged-in user
    window.location.href = "homepage.html";
}
