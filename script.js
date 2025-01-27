// Created an object
const game = {
  // Generate a random secret number between 1 and 10
  secretNumber: Math.floor(Math.random() * 10) + 1,
  // Reset the attempt to 0
  attempts: 0,
  // Store game messages in a nested object for easy access
  messages: {
    // Message for too low
    tooLow: "Nope, too low! Try again.",
    // Message for too high
    tooHigh: "Nope, too high! Try again.",
    // Message for just right
    correct: "Congratulations!! 🥳",
    subText: "You guessed right! 🎉",
    btnTryAgn: "Try again? 🤔",
    btnWinner: "You got it right!",
    incorrectInput: "Enter a valid number. Try again? 🧐",
  },
  // Method to increment the attempts counter
  updateAttempts: function () {
    // Increments the attempts counter
    game.attempts++;
    // Updates the current attempts
    totalAttempts.innerText = `Attempts: ${game.attempts}`;
  },
};

// Grab all the elements
const title = document.getElementById("title");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const resetBtn = document.getElementById("resetBtn");
const message = document.getElementById("message");
const totalAttempts = document.getElementById("totalAttempts");

function triggerConfetti() {
  const duration = 15 * 1000; // 15 seconds
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    // Launch confetti from two different sides
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}

function checkGuess() {
  // The value is going to arrive as a string, so we're using Number() to convert it to a number
  const userGuess = Number(guessInput.value);
  // hide reset button

  // Validates user input if its Not-A-Number
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    message.innerText = game.messages.incorrectInput;
    return;
  }

  // Update and display attempts
  game.updateAttempts();

  // Logic for guesses to be checked
  if (userGuess === game.secretNumber) {
    title.innerText = game.messages.correct;
    message.innerText = game.messages.subText;
    // Disable the guess button from being pressed
    // Hide guess button
    guessBtn.style.display = "none";
    // Show reset button
    resetBtn.style.display = "block";
    // Allow the button to repsond to users input
    guessBtn.innerText = game.messages.btnWinner;
    // Trigger confetti
    triggerConfetti();
  } else if (userGuess < game.secretNumber) {
    message.innerText = game.messages.tooLow;
    // Allow the button to repsond to users input
    guessBtn.innerText = game.messages.btnTryAgn;
  } else {
    message.innerText = game.messages.tooHigh;
    // Allow the button to repsond to users input
    guessBtn.innerText = game.messages.btnTryAgn;
  }

  guessInput.value = ""; // Clears the input value
}

const gameReset = () => {
  game.secretNumber = Math.floor(Math.random() * 10) + 1; // Generate a new random number
  game.attempts = 0; // Reset attempts
  totalAttempts.innerText = `Attempts: ${game.attempts}`; // Reset attempts display
  guessBtn.disabled = false; // Enable the Guess button
  guessBtn.innerText = "Submit"; // Reset button text
  title.innerText = "Guess the Number"; // Reset title
  message.innerText = "What number am I thinking of? 1-10"; // Reset message
  guessInput.value = ""; // Clear input field
  resetBtn.style.display = "none"; // Hide the reset button
  guessBtn.style.display = "block"; // Show the guess button
};

// Event listener for the Reset button
resetBtn.addEventListener("click", gameReset);

// Event listener for the button press
guessBtn.addEventListener("click", checkGuess);

// Event Listener for the Enter key
guessInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});
