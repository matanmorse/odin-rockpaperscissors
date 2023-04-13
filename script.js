const options = ['rock', 'scissors', 'paper'];
const rounds = 5

function getComputerChoice() {
    // randomly chooses  one of three options for the computer
    // get a randum number between 0 and 2
    const randInt = Math.floor(Math.random() * 3);
    
    // pick a choice from the array and return it
    const choice = options[randInt];
    return choice;
}

function getPlayerChoice() {
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

    // check for ties
    if (playerChoice === computerChoice) return 'tie';

    // otherwise evaluate using order of array
    const computerArrayIndex = options.indexOf(computerChoice);
    if (playerChoice === options.slice(computerArrayIndex - 1)[0]) return 'player';
    
    // if not tie or player win computer wins
    return 'computer';
    
}

function playGame() {
    let playerWins = 0;
    let computerWins = 0;

    // plays five rounds and gets the winner
    for (let i = 0; i < rounds; i++) {
        const playerChoice = getPlayerChoice(); 
        const computerChoice = getComputerChoice();

        let roundWinner = playRound(playerChoice, computerChoice);

        alert(`Player played ${playerChoice}. Computer played ${computerChoice}. Winner ${roundWinner}`)

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
        console.table(`Computer: ${computerWins}`, `Player: ${playerWins}`)
    }
    
    // if we made 5 rounds and no winner check who has more points
    if (computerWins === playerWins) {
        return 'tie';
    }
    else if (computerWins > playerWins) {
        return 'computer';
    }
    else {
        return 'player';
    }
}

result = playGame()
alert(result)