// ===========================
// Dashboard
// ===========================

let user = localStorage.getItem("currentUser");

document.getElementById("welcome").innerHTML =
"Welcome " + user + " 👋";

document.getElementById("currentLevel").innerHTML =
localStorage.getItem(user + "_level");

function continueGame(){

    localStorage.setItem(
        "currentLevel",
        localStorage.getItem(user + "_level")
    );

    window.location.href="game.html";
}

function openLevels(){

    window.location.href="levels.html";
}

function openProfile(){

    window.location.href="profile.html";
}

function openLeaderboard(){

    window.location.href="leaderboard.html";
}

function logout(){

    localStorage.removeItem("currentUser");

    window.location.href="index.html";
}