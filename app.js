//Add 3 pages
// Store best values
// Find a way to get who all played the game


const bubble = document.querySelector(".bubble");
const reactionScore = document.querySelector(".reaction-score");
const bestScore = document.querySelector(".best-score");

let clickCounter = 0;
let numberOfTries = 3;
let totalTime = 0;
let startTime = new Date().getTime();
let reactionTime = 0;
let bestTime = 999999


window.addEventListener('load', (event) => {
    console.log("Page has loaded");
    // localStorage.clear();
    const loader = document.querySelector(".loader");
    const main = document.querySelector("main");

    // loader.addEventListener("animationend", (event) => {
    //     // loader.classList.add("hide");
    //     main.classList.add("hide");
    // });

    const startButton = document.querySelector(".button");
    startButton.addEventListener("click", (event) => {
        main.classList.add("hide");
        bestScore.innerText = localStorage.getItem("best") == null ? 0: localStorage.getItem("best") + " ms";

        //1. Make the shape appear
        appearAfterDelay();
    });

});

bubble.addEventListener('click', (e) => {
    let clickTime = new Date().getTime();    // time when bubble is clicked
    clickCounter++;
    hideBubble();                           // onclick bubble disappears
    calculateReactionTime(clickTime);
    if (clickCounter != numberOfTries) {
        appearAfterDelay();                 // bubble appears again after some time
    } else {
        gameOver();
    }
})


/////////////////////////////////
////////////FUNCTIONS////////////
/////////////////////////////////

function appearAfterDelay() {
    setTimeout(showBubble, 1000);//Make delay random
    bubble.style.top = `${Math.floor(Math.random() * 70) + 20}%`;
    bubble.style.left = `${Math.floor(Math.random() * 80) + 10}%`;
    bubble.style.height = bubble.style.width = `${Math.floor(Math.random() * 100) + (window.innerWidth * 0.03125)}px`;
}
function showBubble() {
    bubble.style.display = "block";
    startTime = new Date().getTime();       //set the start time when bubble appears
}
function hideBubble() {
    bubble.style.display = "none";
}
function calculateReactionTime(clickTime) {
    reactionTime = clickTime - startTime;
    //NEED TO SHOW THE TIME
    //UPDATE BEST TIME
    if (reactionTime < bestTime) {
        bestTime = reactionTime;
    }
    totalTime += reactionTime;
    updateScore();
}
function updateScore() {
    reactionScore.innerText = reactionTime + " ms";
    bestScore.innerText = bestTime + " ms";
}
function gameOver() {
    console.log("Gameover");
    hideBubble();
    let average = Math.floor(totalTime / numberOfTries);
    // const header = document.querySelector(".header h1");
    // header.innerText = "Game Over"
    const averageScore = document.querySelector(".average-score");
    averageScore.innerText = average + " ms";
    localStorage.setItem("best",bestTime);
}


//document.location.reload(true);
