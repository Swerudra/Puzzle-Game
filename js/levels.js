// ===========================
// Level Selection
// ===========================

let user = localStorage.getItem("currentUser");

let unlocked =
parseInt(localStorage.getItem(user+"_level"));

let container =
document.getElementById("levelContainer");

for(let i=1;i<=25;i++){

    let level =
    document.createElement("div");

    level.className="level";

    if(i<=unlocked){

        level.innerHTML=i;

        level.onclick=function(){

            localStorage.setItem(
                "currentLevel",
                i
            );

            window.location.href="game.html";

        };

    }

    else{

        level.innerHTML="🔒";

        level.classList.add("locked");

    }

    container.appendChild(level);

}

function goDashboard(){

    window.location.href="dashboard.html";

}