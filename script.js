// SIGNUP: Handles signup logic
function validateSignUpForm(event) {
    event.preventDefault();

    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();
    const age = document.getElementById("signup-age").value.trim();

    if (!username || !email || !password || !age) {
        alert("All fields are required.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
        alert("Email already exists. Please log in.");
        return;
    }

    const newUser = { username, email, password, age };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    window.location.href = "homepage.html";
}

// LOGIN: Handles login logic
function validateLoginForm(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const validUser = users.find(user => user.email === email && user.password === password);

    if (validUser) {
        localStorage.setItem("currentUser", JSON.stringify(validUser));
        window.location.href = "homepage.html";
    } else {
        alert("Invalid email or password.");
    }
}

// LOGOUT: Called on homepage
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.style.display = "inline-block";

        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "login.html";
        });
    }

    // USER LIST: Populate table if on userlist.html
    const userTableBody = document.getElementById("userTableBody");
    if (userTableBody) {
        const users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.length === 0) {
            userTableBody.innerHTML = "<tr><td colspan='4'>No users found.</td></tr>";
        } else {
            users.forEach((user, index) => {
                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.password}</td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </td>
                `;

                userTableBody.appendChild(row);
            });
        }

        // Add event delegation for edit/delete
        userTableBody.addEventListener("click", (event) => {
            const target = event.target;
            const index = parseInt(target.getAttribute("data-index"));

            if (target.classList.contains("delete-btn")) {
                deleteUser(index);
            } else if (target.classList.contains("edit-btn")) {
                editUser(index);
            }
        });
    }
});

// DELETE USER
function deleteUser(index) {
    if (!confirm("Are you sure you want to delete this user?")) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const deletedUser = users[index];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.email === deletedUser.email) {
        localStorage.removeItem("currentUser");
        window.location.href = "login.html";
    } else {
        location.reload();
    }
}

// EDIT USER
function editUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users[index];

    const newUsername = prompt("Edit username:", user.username);
    const newPassword = prompt("Edit password:", user.password);

    if (newUsername !== null && newPassword !== null) {
        users[index].username = newUsername.trim();
        users[index].password = newPassword.trim();
        localStorage.setItem("users", JSON.stringify(users));
        location.reload();
    }
}
