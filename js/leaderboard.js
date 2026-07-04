// ===========================
// Leaderboard
// ===========================

let body =
document.getElementById("leaderboardBody");

let rank=1;

for(let i=0;i<localStorage.length;i++){

    let key =
    localStorage.key(i);

    if(key.endsWith("_level")){

        let username =
        key.replace("_level","");

        let row =
        document.createElement("tr");

        row.innerHTML=

        "<td>"+rank+"</td>"+

        "<td>"+username+"</td>"+

        "<td>"+localStorage.getItem(key)+"</td>"+

        "<td>"+

        localStorage.getItem(username+"_time")

        +" sec</td>";

        body.appendChild(row);

        rank++;

    }

}

function goDashboard(){

window.location.href="dashboard.html";

}