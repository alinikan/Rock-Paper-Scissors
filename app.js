// DOM element references
const computerChoiceDisplay = document.getElementById('computer-choice'); // Display area for computer's choice
const userChoiceDisplay = document.getElementById('user-choice'); // Display area for user's choice
const resultDisplay = document.getElementById('result'); // Display area for the game result
const possibleChoices = document.querySelectorAll('button'); // All buttons (choices and difficulty)
let userChoice; // Variable to store user's choice
let computerChoice; // Variable to store computer's choice
let result; // Variable to store game result
let difficulty = 'easy'; // Default difficulty level
let playerChoicesFrequency = { rock: 0, paper: 0, scissors: 0 }; // Object to track the frequency of user choices

// Adding click event listeners to difficulty buttons
document.querySelectorAll('.difficulty-button').forEach(button => {
    button.addEventListener('click', () => {
        difficulty = button.id; // Set difficulty based on the button's id
        updateDifficultyButtons(button); // Update button styles for selected difficulty
    });
});

// Function to update the style of difficulty buttons
function updateDifficultyButtons(selectedButton) {
    document.querySelectorAll('.difficulty-button').forEach(button => {
        button.classList.remove('active'); // Remove 'active' class from all difficulty buttons
    });
    selectedButton.classList.add('active'); // Add 'active' class to the selected button
}

// Function to update the frequency of player choices
function updatePlayerChoicesFrequency(choice) {
    playerChoicesFrequency[choice]++; // Increment the count of the chosen option (rock, paper, or scissors)
}

// Function to determine computer's choice based on difficulty
function getAdaptiveAIChoice() {
    switch (difficulty) {
        case 'easy':
            return getRandomChoice(); // For easy difficulty, choose randomly
        case 'medium':
            return getFrequencyBasedChoice(true); // For medium difficulty, use frequency-based choice with randomness
        case 'hard':
            return getPredictiveChoice(); // For hard difficulty, use predictive logic
        case 'impossible':
            return getWinningChoice(); // For impossible difficulty, AI always wins
        default:
            return getRandomChoice();
    }
}

// Function to get a random choice
function getRandomChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)]; // Return a random choice from the array
}

// Function to get a choice based on user's most frequent choice
function getFrequencyBasedChoice(includeRandomness = false) {
    let mostFrequentChoice = Object.keys(playerChoicesFrequency).reduce((a, b) => playerChoicesFrequency[a] > playerChoicesFrequency[b] ? a : b);

    if (includeRandomness && Math.random() > 0.5) {
        return getRandomChoice(); // Add randomness to the AI's choice
    }

    // Counter the player's most frequent choice
    return mostFrequentChoice === 'rock' ? 'paper' : mostFrequentChoice === 'paper' ? 'scissors' : 'rock';
}

// Predictive choice function for hard difficulty
function getPredictiveChoice() {
  // More advanced logic: counter the most frequent choice, but add randomness
  let mostFrequentChoice = Object.keys(playerChoicesFrequency).reduce((a, b) => playerChoicesFrequency[a] > playerChoicesFrequency[b] ? a : b);
  
  // Introduce some randomness to make it less predictable
  if (Math.random() > 0.3) { // 70% chance to counter the most frequent choice, 30% random
      return counterChoice(mostFrequentChoice);
  } else {
      return getRandomChoice();
  }
}

// Function to counter a given choice
function counterChoice(choice) {
  return choice === 'rock' ? 'paper' : choice === 'paper' ? 'scissors' : 'rock';
}

// Winning choice function for impossible difficulty
function getWinningChoice() {
    // AI always counters the player's last choice
    return userChoice === 'rock' ? 'paper' : userChoice === 'paper' ? 'scissors' : 'rock';
}

// Adding click event listeners to choice buttons (rock, paper, scissors)
possibleChoices.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('difficulty-button')) return; // Ignore clicks on difficulty buttons

    userChoice = button.id; // Set user's choice based on button's id
    updatePlayerChoicesFrequency(userChoice); // Update frequency tracker for AI logic
    userChoiceDisplay.textContent = userChoice; // Display user's choice
    generateComputerChoice(); // Generate and display computer's choice
    getResult(); // Calculate and display the game result
  });
});

// Function to generate computer's choice
function generateComputerChoice() {
    computerChoice = getAdaptiveAIChoice(); // Get computer's choice from AI logic
    computerChoiceDisplay.textContent = computerChoice; // Display computer's choice
}

// Function to determine the result of the game
function getResult() {
    // Compare user's and computer's choices to determine the result
    if (computerChoice === userChoice) {
        result = 'There was a tie!';
    } else if ((computerChoice === 'rock' && userChoice === 'scissors') ||
               (computerChoice === 'scissors' && userChoice === 'paper') ||
               (computerChoice === 'paper' && userChoice === 'rock')) {
        result = 'You lost!';
    } else {
        result = 'You won!';
    }
    displayResult(); // Display the result
}

// Function to display the game result
function displayResult() {
    resultDisplay.textContent = result; // Update the text content with the result
    resultDisplay.classList.add('result-animation'); // Add animation class for the result display
}

// Event listener to remove the animation class after the animation ends
resultDisplay.addEventListener('animationend', () => {
    resultDisplay.classList.remove('result-animation'); // Remove the animation class
});
