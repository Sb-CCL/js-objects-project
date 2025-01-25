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
    subText: "You guessed the right number! 🎉",
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
const message = document.getElementById("message");
const totalAttempts = document.getElementById("totalAttempts");

function checkGuess() {
  // The value is going to arrive as a string, so we're using Number() to convert it to a number
  const userGuess = Number(guessInput.value);

  // Update and display attempts
  game.updateAttempts();

  // Logic for guesses to be checked
  if (userGuess === game.secretNumber) {
    title.innerText = game.messages.correct;
    message.innerText = game.messages.subText;
    guessBtn.disabled = true;

    // Trigger confetti
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
  } else if (userGuess < game.secretNumber) {
    message.innerText = game.messages.tooLow;
  } else {
    message.innerText = game.messages.tooHigh;
  }

  guessInput.value = ""; // Clears the input value
}

// Event listener for the button press
guessBtn.addEventListener("click", checkGuess);

// Event Listener for the Enter key
guessInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    checkGuess();
  }
});
