// localStorage.clear();


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
    const startGame = document.querySelector("button");
    const loader = document.querySelector(".loader");
    const main = document.querySelector("main");
    const game = document.querySelector(".game");

    let loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        let username = document.getElementsByName("name")[0];
        username.value = username.value.trim();
        console.log("value " + username.value);
        if (username.value == "") {
            alert("Enter your name to continue!");
        } else {
            console.log(
                `UserName:- ${username.value}`
            );
            localStorage.setItem("name", username.value.toLowerCase())
            username.value = "";

            const form = document.querySelector("form");
            form.classList.add("hide");
            startGame.classList.remove("hide");
        }
    });


    startGame.addEventListener("click", (event) => {
        main.classList.add("hide");
        game.classList.remove("hide");
        bestScore.innerText =
            localStorage.getItem(localStorage.getItem("name")) == null ?
                0 : localStorage.getItem(localStorage.getItem("name")) + " ms";

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
    if (localStorage.getItem(localStorage.getItem("name")) > bestTime) {
        localStorage.setItem(localStorage.getItem("name"), bestTime);
    }
    else {
        localStorage.setItem(localStorage.getItem("name"), bestTime);
    }
}


//document.location.reload(true);