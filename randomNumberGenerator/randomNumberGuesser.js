const prompt = require('prompt-sync')();

let playerName = prompt("Welcome! What's your name? ");

// Control variable for the main loop
let playAgain = true;

while (playAgain) {  // Keep looping while playAgain is true
    let difficulty = prompt("Choose difficulty: easy, medium, hard, expert: ").toLowerCase();
    let maxNumber, maxAttempts;

    if (difficulty === "easy") {
        maxNumber = 10;
        maxAttempts = Infinity;
    }
    else if (difficulty === "medium") {
        maxNumber = 50;
        maxAttempts = 7;
    }
    else if (difficulty === "hard") {
        maxNumber = 100;
        maxAttempts = 5;
    }
    else if (difficulty === "expert") {
        maxNumber = 500;
        maxAttempts = 8;
    }

    let secretNumber = Math.floor(Math.random() * maxNumber) + 1; 
    let attempts = 0;
    let hasWon = false;

    console.log("=".repeat(40));
    console.log(" NUMBER GUESSING GAME ");
    console.log("=".repeat(40));
    console.log(`Welcome ${playerName} to an adventure! You will have ${maxAttempts} attempts to guess a number between 1 and ${maxNumber}`);

    while (attempts < maxAttempts && !hasWon) {
        let isValid = false;
        let playerGuess;
        
        while (!isValid) {
            playerGuess = parseInt(prompt(`Attempt ${attempts + 1}/${maxAttempts}: Enter your guess: `));
            
            if(isNaN(playerGuess)) {
                console.log("Input is invalid. Please enter a whole number.");
            }
            else if(playerGuess < 1 || playerGuess > maxNumber) {
                console.log(`Please enter a whole number between 1 and ${maxNumber}`);
            }
            else {
                isValid = true;
            }
        }   
        
        attempts++;

        if (playerGuess == secretNumber) {
            hasWon = true;
            console.log(`Nice you won!`);
            console.log(`It took you ${attempts} attempts to guess ${secretNumber}`)
            break;
        }
        else {
            if (playerGuess > secretNumber) {
                console.log("Too high");
            }
            else {
                console.log("Too low");
            }
            console.log("Try again!");
        }
    }
    
    if (!hasWon) {
        console.log(`😢 Game over! The number was ${secretNumber}`);
    }

    // Ask if they want to play again
    let validAnswer = false;
    while (!validAnswer) {
        let answer = prompt("\nPlay again? (yes/no): ").toLowerCase();
        
        if (answer === 'yes' || answer === 'y') {
            playAgain = true;  // Keep the loop going
            validAnswer = true;
            console.log("\nStarting new game...\n");
        } else if (answer === 'no' || answer === 'n') {
            playAgain = false;  // This will stop the main while loop
            validAnswer = true;
            console.log(`\nThanks for playing, ${playerName}!`);
        } else {
            console.log("Please answer yes or no");
        }
    }
}