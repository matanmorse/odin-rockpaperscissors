const options = ['rock', 'scissors', 'paper'];
const rounds = 5
let round = rounds;

// initialize page
addEventListener("DOMContentLoaded", (event) => {
    // update round counter
    console.log('initializing...')
    roundsLeft = document.querySelector('.rounds-left');
    roundsLeft.textContent = rounds;

    // add function to buttons
    buttons = document.querySelectorAll('.options > *')

    buttons.forEach(element => {
        // simulate round when user presses a button
        element.addEventListener('click', (event) => {
            playerChoice = element.value;
            computerChoice = getComputerChoice()
            console.log(`player choice: ${playerChoice}`);
            updateUi(playRound(playerChoice, computerChoice));
        })
    });
})

function updateUi(winner, rounds, playerChoice, computerChoice) {
    // after a round call to update the user interface
}


function getComputerChoice() {
    // randomly chooses  one of three options for the computer
    // get a randum number between 0 and 2
    const randInt = Math.floor(Math.random() * 3);
    
    // pick a choice from the array and return it
    const choice = options[randInt];
    return choice;
}

function getPlayerChoice() {
    return 'rock';
    // prompts the player for their choice
    playerChoice = prompt("Choice? (rock/paper/scissors)").toLowerCase();

    // make sure it's one of the three choices
    if (!options.includes(playerChoice)) {
        alert('Please only enter Rock/Paper/Scissors!')
        getPlayerChoice();
    }

    // otherwise return the answer
    return playerChoice;
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

function playGame() {
    let playerWins = 0;
    let computerWins = 0;

    // plays five rounds and gets the winner
    for (let i = 1; i <= rounds; i++) {
        const playerChoice = getPlayerChoice(); 
        const computerChoice = getComputerChoice();

        let roundWinner = playRound(playerChoice, computerChoice);

        // alert(`Player played ${playerChoice}. Computer played ${computerChoice}. Winner ${roundWinner}`)

        switch(roundWinner) {
            case 'tie':
                break; 
            case 'player':
                playerWins++;
                break;
            case 'computer':
                computerWins++;
                break;   
        }
        // if we check for a winner and there is one end the game
        console.log(`round: ${i}`)
        console.log(`Computer: ${computerWins}`, `Player: ${playerWins}`)
        const winner = checkForWinner(computerWins, playerWins, i)
        if (winner) {return winner;}
    }
}

result = playGame()
console.log(result)
// alert(result.toUpperCase())