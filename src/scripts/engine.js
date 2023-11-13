const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions:{
        timerId: setInterval(randomEnemy, 1000),
        countDownTimerId: setInterval(countdown, 1000),
    },
};

function countdown() {
    state.values.currentTime--;

    state.view.time.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0 ){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        alert("Game over boy! Points: " + state.values.result);
    }
}

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.15;
    audio.play();
}

function randomEnemy(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id
}

function addListenerHitbox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        })
    });
}

function init(){
    addListenerHitbox();
}

init();
