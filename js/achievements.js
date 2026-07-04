// ===========================
// Achievements
// ===========================

function unlockAchievement(name){

    let user =
    localStorage.getItem("currentUser");

    let achievements =
    JSON.parse(
        localStorage.getItem(
            user+"_achievements"
        )
    ) || [];

    if(!achievements.includes(name)){

        achievements.push(name);

        localStorage.setItem(
            user+"_achievements",
            JSON.stringify(achievements)
        );

        alert("🏆 Achievement Unlocked!\n\n"+name);

    }

}

function getAchievementCount(){

    let user =
    localStorage.getItem("currentUser");

    let achievements =
    JSON.parse(
        localStorage.getItem(
            user+"_achievements"
        )
    ) || [];

    return achievements.length;

}