const options = ['rock', 'scissors', 'paper'];
const rounds = 7
let round = 1;
let playerWins = 0;
let computerWins = 0;
let computerChoice = "";
let playerChoice = "";
let roundWinner = "";
const buttons = document.querySelectorAll('.options > button');
const winnerText = document.querySelector('p.winner-text')
const roundsLeftText = document.querySelector('span.rounds-left');

// initialize page 
addEventListener('DOMContentLoaded', (event) => {
    // init rounds left text
    roundsLeftText.textContent = rounds;

    // add functionality to buttons to play rounds when they're clicked
    buttons.forEach(element => {
        element.addEventListener('click', (event) => {
            // get player choice from button
            playerChoice = element.value;
            computerChoice = getComputerChoice();

            // play a round with given choices
            roundWinner = playRound(playerChoice, computerChoice);
            console.log(`Player played ${playerChoice}, Computer played ${computerChoice}, Winner: ${roundWinner}`)
            updateScore(roundWinner);
            console.log(`Computer: ${computerWins}, Player: ${playerWins}, Round: ${round}`)


            // check for a winner after each round
            gameWinner = checkForWinner(computerWins, playerWins, round) ?? "no winner";
            console.log(gameWinner);

            let uiDict = buildUiDict(playerChoice, computerChoice, playerWins, computerWins, roundWinner, round);
            
            // update user interface
            updateUi(uiDict);

            // if there is a winner end the game
            if (gameWinner !== "no winner") {
                endGame(gameWinner);
            }

            // if the game isn't over move on to next round
            round++;
        })
    });
})

function updateUi(uiDict) {
    const resultText = document.querySelector('div.result-text');
    resultText.textContent = `Player played ${uiDict['playerchoice']}, Computer played ${uiDict['computerchoice']}. ${uiDict['roundwinnertext']}.`;
    
    const computerScoreText = document.querySelector('span.computer-score');
    computerScoreText.textContent = uiDict['computerwins'];

    const playerScoreText = document.querySelector('span.player-score');
    playerScoreText.textContent = uiDict['playerwins'];

    roundsLeftText.textContent = uiDict['roundsleft']
}


// builds dict used in updating UI
function buildUiDict (playerChoice, computerChoice, playerWins, computerWins, roundWinner, round){
    const UiDict = {
        'playerchoice': playerChoice,
        'computerchoice': computerChoice,
        'playerwins': playerWins,
        'computerwins': computerWins,
        'roundwinnertext': roundWinner != 'tie' ?  `${roundWinner} wins!`: 'This round is a tie',
        'roundsleft': rounds - round,
    };
    return UiDict;
}


// sets UI necessary to end the game
function endGame(gameWinner) { 
    // disable buttons
    buttons.forEach(element => {
        element.disabled = true;
    })

    if (gameWinner !== "tie") {
        winnerText.textContent = `${gameWinner} wins!`
    }
    else { 
        winnerText.textContent = "It's a tie!"
    }

    // update rounds counter
    roundsLeftText.textContent = 'None!'
}

// updates score based on a given round winner
function updateScore(winner){
    switch(winner){
        case('computer'):
            computerWins++;
            break;
        case('player'):
            playerWins++;
            break;
        case('tie'):
            break;
    }
}


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
