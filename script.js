const options = ['rock', 'scissors', 'paper'];
let playerWins = 0;
let computerWins = 0;
let computerChoice = "";
let playerChoice = "";
let roundWinner = "";
const nameChanges = {
    'rock':'Tarrasque',
    'paper':'Dragon',
    'scissors':'Kraken'
}
const playerNameChanges = {
    'player':'Adventurer',
    'computer':'Lich'
}

const buttons = document.querySelectorAll('button');
const winnerText = document.querySelector('div.winner-text')
const roundsLeftText = document.querySelector('span.rounds-left');

// initialize page 
addEventListener('DOMContentLoaded', (event) => {
    // init rounds left text

    // add functionality to buttons to play rounds when they're clicked
    buttons.forEach(element => {
        element.addEventListener('click', (event) => {
            // get player choice from button
            playerChoice = element.value;
            computerChoice = getComputerChoice();

            // play a round with given choices
            roundWinner = playRound(playerChoice, computerChoice);
            updateScore(roundWinner);
            console.log(`Computer: ${computerWins}, Player: ${playerWins}`)


            // check for a winner after each round
            gameWinner = checkForWinner(computerWins, playerWins) ?? "no winner";
            console.log(gameWinner);

            let uiDict = buildUiDict(playerChoice, computerChoice, playerWins, computerWins, roundWinner);
            
            // update user interface
            updateUi(uiDict);

            // if there is a winner end the game
            if (gameWinner !== "no winner") {
                endGame(gameWinner);
            }
        })
    });
})

function updateUi(uiDict) {
    const resultText = document.querySelector('div.result-text');
    resultText.textContent = uiDict['roundwinnertext'];
    
    const computerScoreText = document.querySelector('div.computer-score');
    computerScoreText.textContent = uiDict['computerwins'];

    const playerScoreText = document.querySelector('div.player-score');
    playerScoreText.textContent = uiDict['playerwins'];
}


// builds dict used in updating UI
function buildUiDict (playerChoice, computerChoice, playerWins, computerWins, roundWinner){
    // switch names for UI purposes
   
    var resultTextContent = '';

    if (roundWinner === 'player') {
        resultTextContent = `${nameChanges[playerChoice]} beats ${nameChanges[computerChoice]}!`;
    }
    else if (roundWinner === 'computer') {
        resultTextContent = `${nameChanges[computerChoice]} beats ${nameChanges[playerChoice]}!`
    }
    else {
        resultTextContent = `${nameChanges[playerChoice]} fought ${nameChanges[computerChoice]}! Stalemate!`
    }

    const UiDict = {
        'playerchoice': playerChoice,
        'computerchoice': computerChoice,
        'playerwins': playerWins,
        'computerwins': computerWins,
        'roundwinnertext': resultTextContent,
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
        winnerText.textContent = `${playerNameChanges   [gameWinner]} wins!`
    }
    else { 
        winnerText.textContent = "It's a tie!"
    }
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
    if (computerWins === 5) {
        return 'computer';
    }
    
    if (playerWins === 5) {
        return 'player'
    }
    // if the game is in progress and nobody is far enough ahead return nothing
}
