const ROCK = "rock";
const PAPER = "papers";
const SCISSORS = "scissors";

const TIE = 0;
const WIN = 1;
const LOST = 2;

let isPlaying = false;



const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("papers");
const scissorsBtn = document.getElementById("scissors");
const resultText = document.getElementById("Result-text");
const userImg = document.getElementById("User-Img");
const machineImg = document.getElementById("machine-Img");
const scoreUser = document.getElementById("score-user");
const machineScore = document.getElementById("machine-score");
const ReloadGame = document.getElementById ("Reload-game")

let playerScore = 0;
let computerScore = 0;

ReloadGame.addEventListener("click",()=>{
        playerScore = 0;
        computerScore = 0;
        updateScore();
        resultText.innerHTML = "Elige tu jugada";
        userImg.src = "img/rock.png";
        machineImg.src = "img/rock.png";
        isPlaying = false;
    
})

rockBtn.addEventListener("click", () => {
    play(ROCK);
});
paperBtn.addEventListener("click", () => {
    play(PAPER);
});
scissorsBtn.addEventListener("click", () => {
    play(SCISSORS);
});

function play(userOption) {
    if(isPlaying) return;

    isPlaying = true;

    userImg.src = "img/" + userOption + ".png";

    resultText.innerHTML = "Chossing!";

    const interval = setInterval(function(){
        const machineOption = calcMachineOption();
        machineImg.src = "img/" + machineOption + ".png";
    }, 200);

    setTimeout(function () {

        clearInterval(interval);

        const machineOption = calcMachineOption();
        const result = calcResult(userOption, machineOption);

        machineImg.src = "img/" + machineOption + ".png";

        switch (result) {
            case TIE:
                resultText.innerHTML = "You have tied!";
                break;
            case WIN:
                resultText.innerHTML = "You win!";
                playerScore++;
                break;
            case LOST:
                resultText.innerHTML = "You lost!";
                computerScore++;
                break;
        }
        updateScore()
        if (playerScore === 3 ) {
            showFinalResult();
        } else if ( computerScore === 3){
           showFinalResult2();
        } else {
            isPlaying = false;
        }

    }, 2000);
}

function calcMachineOption() {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}

function calcResult(userOption, machineOption) {
    if (userOption === machineOption) {
        return TIE;

    } else if (userOption === ROCK) {

        if (machineOption === PAPER) return LOST;
        if (machineOption === SCISSORS) return WIN;

    } else if (userOption === PAPER) {

        if (machineOption === SCISSORS) return LOST;
        if (machineOption === ROCK) return WIN;

    } else if (userOption === SCISSORS) {

        if (machineOption === ROCK) return LOST;
        if (machineOption === PAPER) return WIN;

    }
}

function updateScore (){
    scoreUser.innerText = playerScore;
    machineScore.innerText = computerScore;
}

function showFinalResult() {
    const win = playerScore === 3 ? "Jugador" : "Máquina";
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: "you have won against the machine",
        showConfirmButton: false,
        timer: 3000
      });
}

function showFinalResult2() {
    const LOST = playerScore === 3 ? "Jugador" : "Máquina";
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You have lost!!",
        showConfirmButton: false,
        timer: 3000
      });
}



