const options = ['rock', 'scissors', 'paper'];
const rounds = 5
let round = rounds;
let playerWins = 0;
let computerWins = 0;
let computerChoice = "";
let playerChoice = "";
let roundWinner = "";

// initialize page 
addEventListener('DOMContentLoaded', (event) => {
    // add functionality to buttons to play rounds when they're clicked
    buttons = document.querySelectorAll('.options > button');
    buttons.forEach(element => {
        element.addEventListener('click', (event) => {
            // get player choice from button
            playerChoice = element.value;
            console.log(playerChoice)
            computerChoice = getComputerChoice();

            // play a round with given choices
            roundWinner = playRound(playerChoice, computerChoice);
            console.log(`Player played ${playerChoice}, Computer played ${computerChoice}, Winner: ${roundWinner}`)
        })
    });
})

function getComputerChoice() {
    // randomly chooses  one of three options for the computer
    // get a randum number between 0 and 2
    const randInt = Math.floor(Math.random() * 3);
    
    // pick a choice from the array and return it
    const choice = options[randInt];
    return choice;
}


function playRound(playerChoice, computerChoice) {
    // evaluats a single round of rock paper scissors
    round--
    // check for ties
    if (playerChoice === computerChoice) return 'tie';

    // otherwise evaluate using order of array
    const computerArrayIndex = options.indexOf(computerChoice);
    if (playerChoice === options.slice(computerArrayIndex - 1)[0]) return 'player';
    
    // if not tie or player win computer wins
    return 'computer';
    
}

function checkForWinner (computerWins, playerWins, round) {
    // check for ties first 
    if (round === rounds) {
        if (playerWins === computerWins) {
            return 'tie'
        }
    }

    // if a player doesn't have enough rounds left to come back, end the game
    const roundsLeft = rounds - round;
    const scoreDifference = Math.abs(computerWins - playerWins);
    if ( scoreDifference > roundsLeft ) {
        switch (playerWins > computerWins) {
            case (true): return 'player';
            case (false): return 'computer';
        }
    }
    

    // if the game is in progress and nobody is far enough ahead return nothing
}
