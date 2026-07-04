// ===========================
// Profile
// ===========================

let user =
localStorage.getItem("currentUser");

document.getElementById("playerName").innerHTML =
user;

document.getElementById("highestLevel").innerHTML =
localStorage.getItem(user+"_level");

document.getElementById("achievementCount").innerHTML =
getAchievementCount();

document.getElementById("totalMoves").innerHTML =
localStorage.getItem(user+"_moves");

document.getElementById("totalTime").innerHTML =
localStorage.getItem(user+"_time");

function goDashboard(){

window.location.href="dashboard.html";

}