// ============================================
// Puzzle Master 25
// game.js - PART 1
// ============================================

// ---------- User Information ----------
const user = localStorage.getItem("currentUser");

let currentLevel =
parseInt(localStorage.getItem("currentLevel")) || 1;

document.getElementById("welcome").innerHTML =
"Welcome " + user;

// ---------- Puzzle Difficulty ----------
let rows = 2;
let cols = 2;

if(currentLevel >= 6){
    rows = 3;
    cols = 3;
}

if(currentLevel >= 11){
    rows = 4;
    cols = 4;
}

if(currentLevel >= 16){
    rows = 5;
    cols = 5;
}

if(currentLevel >= 21){
    rows = 6;
    cols = 6;
}

document.getElementById("levelTitle").innerHTML =
"Level " + currentLevel;

// ---------- Puzzle Container ----------
const puzzle =
document.getElementById("puzzle");

puzzle.style.gridTemplateColumns =
`repeat(${cols},100px)`;

puzzle.style.gridTemplateRows =
`repeat(${rows},100px)`;

// ---------- Variables ----------
let pieces = [];

let firstPiece = null;

let moveCount = 0;

let seconds = 0;

let timerRunning = true;

// ---------- Timer ----------
setInterval(function(){

    if(timerRunning){

        seconds++;

        document.getElementById("timer").innerHTML =
        seconds;

    }

},1000);

// ---------- Move Counter ----------
function updateMoves(){

    document.getElementById("moves").innerHTML =
    moveCount;

}

// ---------- Create Puzzle ----------
function createPuzzle(){

    puzzle.innerHTML="";

    pieces=[];

    let totalPieces = rows * cols;

    for(let i=0;i<totalPieces;i++){

        pieces.push(i);

    }

    shufflePieces();

    drawPuzzle();

}

// ---------- Shuffle ----------
function shufflePieces(){

    for(let i=pieces.length-1;i>0;i--){

        let j =
        Math.floor(Math.random()*(i+1));

        let temp =
        pieces[i];

        pieces[i]=pieces[j];

        pieces[j]=temp;

    }

}

// ---------- Draw Puzzle ----------
function drawPuzzle(){

    puzzle.innerHTML="";

    let pieceWidth =
    100;

    let pieceHeight =
    100;

    let imageWidth =
    cols*100;

    let imageHeight =
    rows*100;

    for(let index=0;
        index<pieces.length;
        index++){

        let piece =
        pieces[index];

        let div =
        document.createElement("div");

        div.className="piece";

        div.style.width=
        pieceWidth+"px";

        div.style.height=
        pieceHeight+"px";

        div.style.backgroundImage=
        `url(images/level${currentLevel}.png)`;

        div.style.backgroundSize=
        imageWidth+"px "+imageHeight+"px";

        let row =
        Math.floor(piece/cols);

        let col =
        piece%cols;

        div.style.backgroundPosition=
        (-col*pieceWidth)+"px "+
        (-row*pieceHeight)+"px";

        div.dataset.index=index;

        div.onclick=function(){

            selectPiece(index);

        };

        puzzle.appendChild(div);

    }

}

// ---------- Select Piece ----------
function selectPiece(index){

    if(firstPiece==null){

        firstPiece=index;

        return;

    }

    swapPieces(firstPiece,index);

    firstPiece=null;

    moveCount++;

    updateMoves();

    drawPuzzle();

    checkWin();

}

// ---------- Swap ----------
function swapPieces(a,b){

    let temp =
    pieces[a];

    pieces[a]=
    pieces[b];

    pieces[b]=
    temp;

}

// ============================================
// game.js - PART 2
// (Continue directly after Part 1)
// ============================================

// ---------- Check Win ----------
function checkWin(){

    let solved = true;

    for(let i=0;i<pieces.length;i++){

        if(pieces[i]!==i){

            solved=false;
            break;

        }

    }

    if(solved){

        timerRunning=false;

        levelCompleted();

    }

}

// ---------- Restart ----------
function restartGame(){

    moveCount=0;

    seconds=0;

    firstPiece=null;

    timerRunning=true;

    document.getElementById("timer").innerHTML=0;

    updateMoves();

    createPuzzle();

}

// ---------- Hint ----------
function hint(){

    alert(
        "Hint:\n\n" +
        "Start by placing the corner pieces correctly."
    );

}

// ---------- Save Statistics ----------
function saveStatistics(){

    let totalMoves =
    parseInt(
        localStorage.getItem(
            user+"_moves"
        )
    ) || 0;

    totalMoves += moveCount;

    localStorage.setItem(

        user+"_moves",

        totalMoves

    );



    let totalTime =
    parseInt(
        localStorage.getItem(
            user+"_time"
        )
    ) || 0;

    totalTime += seconds;

    localStorage.setItem(

        user+"_time",

        totalTime

    );

}

// ---------- Star Rating ----------
function getStars(){

    if(moveCount<=rows*cols*2){

        return 3;

    }

    if(moveCount<=rows*cols*4){

        return 2;

    }

    return 1;

}

// ---------- Achievement ----------
function checkAchievements(){

    unlockAchievement(
        "First Victory"
    );

    if(seconds<=30){

        unlockAchievement(
            "Speed Runner"
        );

    }

    if(moveCount<=rows*cols*2){

        unlockAchievement(
            "Puzzle Expert"
        );

    }

    if(currentLevel==25){

        unlockAchievement(
            "Puzzle Legend"
        );

    }

}

// ---------- Unlock Next Level ----------
function unlockNextLevel(){

    let highest =
    parseInt(

        localStorage.getItem(
            user+"_level"
        )

    );

    if(currentLevel>=highest){

        localStorage.setItem(

            user+"_level",

            currentLevel+1

        );

    }

}

// ---------- Educational Facts ----------
const facts=[

"The Eiffel Tower was completed in 1889.",

"The Great Wall of China is over 21,000 km long.",

"The Moon has no atmosphere.",

"Octopuses have three hearts.",

"Honey never spoils.",

"Mount Everest is 8848 meters high.",

"The Pacific Ocean is Earth's largest ocean.",

"Bananas are berries.",

"A day on Venus is longer than a year.",

"Koalas sleep around 20 hours a day.",

"Lightning is hotter than the Sun's surface.",

"The human brain has about 86 billion neurons.",

"Sharks existed before trees.",

"The Amazon Rainforest produces about 20% of Earth's oxygen.",

"Saturn could float on water.",

"The tallest waterfall is Angel Falls.",

"Butterflies taste with their feet.",

"Penguins cannot fly but are excellent swimmers.",

"The largest desert is Antarctica.",

"Some turtles breathe through their backsides.",

"The shortest war lasted only 38 minutes.",

"An ostrich's eye is bigger than its brain.",

"The heart beats around 100,000 times a day.",

"The blue whale is the largest animal ever.",

"Water expands when it freezes."

];

// ---------- Level Complete ----------
function levelCompleted(){

    saveStatistics();

    unlockNextLevel();

    checkAchievements();

    confetti({

        particleCount:250,

        spread:150,

        origin:{y:0.6}

    });

    let stars=getStars();

    let starText="";

    for(let i=0;i<stars;i++){

        starText+="⭐";

    }

    setTimeout(function(){

        showCompletion(starText);

    },800);

}

// ============================================
// game.js - PART 3
// (Continue directly after Part 2)
// ============================================

// ---------- Completion Popup ----------
function showCompletion(stars){

    let fact = facts[currentLevel - 1];

    let message =
    "🎉 LEVEL COMPLETED! 🎉\n\n";

    message +=
    "Level : " + currentLevel + "\n\n";

    message +=
    "Moves : " + moveCount + "\n";

    message +=
    "Time : " + seconds + " seconds\n\n";

    message +=
    "Rating : " + stars + "\n\n";

    message +=
    "Did You Know?\n";

    message +=
    fact;

    let next =
    confirm(

        message +

        "\n\nPress OK for Next Level\n\nPress Cancel to return to Levels."

    );

    if(next){

        nextLevel();

    }

    else{

        window.location.href="levels.html";

    }

}

// ---------- Next Level ----------
function nextLevel(){

    if(currentLevel<25){

        currentLevel++;

        localStorage.setItem(

            "currentLevel",

            currentLevel

        );

        window.location.reload();

    }

    else{

        unlockAchievement(

            "Puzzle Legend"

        );

        alert(

            "🏆 Congratulations!\n\n" +

            "You completed all 25 levels!"

        );

        window.location.href=

        "dashboard.html";

    }

}

// ---------- Home ----------
function goHome(){

    window.location.href=

    "dashboard.html";

}

// ---------- Go to Levels ----------
function goLevels(){

    window.location.href=

    "levels.html";

}

// ---------- Pause Game ----------
function pauseGame(){

    timerRunning=false;

}

// ---------- Resume Game ----------
function resumeGame(){

    timerRunning=true;

}

// ---------- Play Again ----------
function playAgain(){

    restartGame();

}

// ---------- Save Stars ----------
function saveStars(){

    let stars=getStars();

    let oldStars=

    parseInt(

        localStorage.getItem(

            user+"_stars"

        )

    )||0;

    oldStars+=stars;

    localStorage.setItem(

        user+"_stars",

        oldStars

    );

}

// ---------- Keyboard Shortcuts ----------
document.addEventListener(

"keydown",

function(event){

    if(event.key==="r"){

        restartGame();

    }

    if(event.key==="h"){

        hint();

    }

    if(event.key==="Escape"){

        goHome();

    }

}

);

// ---------- Auto Save ----------
window.addEventListener(

"beforeunload",

function(){

    localStorage.setItem(

        "currentLevel",

        currentLevel

    );

}

);

// ---------- Start Game ----------
updateMoves();

createPuzzle();

saveStars();

console.log(

"Puzzle Master 25 Loaded Successfully"

);

// ============================================
// END OF game.js
// ============================================