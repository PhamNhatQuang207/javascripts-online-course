function pickmove(){
    const choices = ['rock', 'paper', 'scissors'];
    const Choice = choices[Math.floor(Math.random() * 3)];
    return Choice
}
function playGame(playerChoice) {
    const computerChoice = pickmove();
    let result = '';

    if (playerChoice === computerChoice) {
        score.gamesPlayed += 1;
        result = 'It\'s a tie!';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')
    ) {
        score.wins += 1;
        score.gamesPlayed += 1;
        result = 'You win!';
    } else {
        score.losses += 1;
        score.gamesPlayed += 1;
        result = 'You lose!';
    }
    document.querySelector('.status').innerHTML = result
    document.querySelector('.choice').innerHTML = `You <img src="icons/${playerChoice}-emoji.png" class ="icons"> <img src="icons/${computerChoice}-emoji.png" class ="icons"> Computer `
    document.querySelector('.score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.gamesPlayed - score.wins - score.losses}`
}
const score = {
    gamesPlayed: 0,
    wins: 0,
    losses: 0
};
function resetScore(){
    score.gamesPlayed=0;
    score.wins=0;
    score.losses=0;
    document.querySelector('.status').innerHTML = 'Game Reset!';
    document.querySelector('.choice').innerHTML = '';
    document.querySelector('.score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.gamesPlayed - score.wins - score.losses}`;
}

let isAutoplaying = false;
let Id;
function autoplay(){
    if(!isAutoplaying){
        Id = setInterval(function(){
            playGame(pickmove());
        },1000);
        isAutoplaying = true;
    }
    else{
        clearInterval(Id);
        isAutoplaying = false;
    }
}
