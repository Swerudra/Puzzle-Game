// ===========================
// Puzzle Master 25
// Login System
// ===========================

function login() {

    let username = document.getElementById("username").value.trim();

    if (username === "") {
        alert("Please enter your username.");
        return;
    }

    // Save current user
    localStorage.setItem("currentUser", username);

    // Create new user if not exists
    if (!localStorage.getItem(username + "_level")) {

        localStorage.setItem(username + "_level", 1);

        localStorage.setItem(username + "_moves", 0);

        localStorage.setItem(username + "_time", 0);

        localStorage.setItem(username + "_stars", 0);

        localStorage.setItem(username + "_achievements", JSON.stringify([]));

    }

    window.location.href = "dashboard.html";
}