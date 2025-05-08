function Subscribe(){
    const buttonElement = document.querySelector('.youtube-button');
    if(buttonElement.innerText=== 'Subscribe'){
        buttonElement.innerHTML = 'Subscribed'
        buttonElement.classList.add('subscribed-button')
    }
    else{
        buttonElement.innerHTML = 'Subscribe'
        buttonElement.classList.remove('subscribed-button')
    }   
}


function Calculate(){
    const input = document.querySelector('.input')
    let value = Number(input.value)
    if(value<40){
        value = value+10
    }
    document.querySelector('.total').innerHTML = `$${value}`
}


function playGame(playerChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const computerChoice = choices[Math.floor(Math.random() * 3)];

    if (playerChoice === computerChoice) {
        score.gamesPlayed += 1;
        document.querySelector('.status').innerHTML = `It's a tie!`;
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        score.wins += 1;
        score.gamesPlayed += 1;
        document.querySelector('.status').innerHTML = 'You win!';
    } else {
        score.losses += 1;
        score.gamesPlayed += 1;
        document.querySelector('.status').innerHTML = 'You lose!';
    }
    document.querySelector('.choice').innerHTML = `You ${playerChoice} - ${computerChoice} Computer`;
    document.querySelector('.score').innerHTML = `Games Played: ${score.gamesPlayed}, Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.gamesPlayed - score.wins - score.losses}`;
    }
const score = {
    gamesPlayed: 0,
    wins: 0,
    losses: 0
};


function resetScore() {
    score.gamesPlayed = 0;
    score.wins = 0;
    score.losses = 0;
    document.querySelector('.status').innerHTML = 'Game Reset!';
    document.querySelector('.choice').innerHTML = '';
    document.querySelector('.score').innerHTML = 'Games Played: 0, Wins: 0, Losses: 0, Ties: 0';
}


function handleKeyPress(event) {
    if (event.key === 'Enter') {
        Calculate();
    }
}