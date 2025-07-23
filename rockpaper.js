function costKeydown(event) {
    if (event.key === 'Enter') {
        calculateMove();
    }
}

function calculateMove() {
    const inputElement = document.querySelector('.js-cost');
    let calcu = Number(inputElement.value); // Convert input to number

    if (calcu <= 40) {
        calcu = calcu + 10;
    }


    document.querySelector('.js-total-cost').innerHTML = `$${calcu}`;
}

let score = JSON.parse(localStorage.getItem('score'));

if (score === null) {
    score = {
        wins: 0,
        loses: 0,
        ties: 0
    };
}



// Show initial score
updateScore()
let isAutoPlaying=false;
let intervalId;

function autoPlay(){
    if (!isAutoPlaying){
        intervalId=setInterval(()=>{
            const playerMove=pickComputerMove()
            playGame(playerMove);
        },1000)
        isAutoPlaying=true;
    }else{
clearInterval(intervalId);
isAutoPlaying=false;
    }
   
}
function playGame(playerMove) {
    const computerMove = pickComputerMove();
    let result = '';

    if (playerMove === 'rock') {
        if (computerMove === 'rock') result = 'tie';
        else if (computerMove === 'paper') result = 'lose';
        else result = 'win';
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') result = 'win';
        else if (computerMove === 'paper') result = 'tie';
        else result = 'lose';
    } else if (playerMove === 'scissors') {
        if (computerMove === 'rock') result = 'lose';
        else if (computerMove === 'paper') result = 'win';
        else result = 'tie';
    }

    // Update score
    if (result === 'win') score.wins++;
    else if (result === 'lose') score.loses++;
    else score.ties++;

    // Save to localStorage
    localStorage.setItem('score', JSON.stringify(score));

    // Update score display directly
    updateScore()
    document.querySelector('.js-result').innerHTML = ` You ${result}`;
    document.querySelector('.js-move').innerHTML = `You picked ${playerMove}, computer picked ${computerMove}`;
}

function updateScore() {
    document.querySelector('.js-score').innerHTML =
        `Wins: ${score.wins}, Losses: ${score.loses}, Ties: ${score.ties}`;
}
function pickComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) return 'rock';
    else if (randomNumber < 2 / 3) return 'paper';
    else return 'scissors';
}

function resetScore() {
    score = { wins: 0, loses: 0, ties: 0 };
    localStorage.removeItem('score');

    // Update score display directly
    updateScore()
    alert('Score reset!');
}
