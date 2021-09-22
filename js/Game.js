/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */
class Game {
  constructor() {
    this.missed = 0;
    this.phrases = [
      "I am Programming Javascript",
      "Hello World How Are You",
      "Tell me something interesting",
      "I like cats and dogs",
      "O tempora O Mores",
    ];
    this.activePhrase = null;
    this.phraseToString = null;
  }
  /***
   * Initialises a new game, selects a new Phrase at random and transforms it in a string format for convenience.
   */
  startGame() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
    this.activePhrase = new Phrase(this.getRandomPhrase(previousGamePhrase));
    this.phraseToString = String(this.activePhrase.phrase);
    this.activePhrase.addPhraseToDisplay();
  }
  /***
   * Gets a random phrase from the game class, update the previousGamePhrase value in order to avoid repeat phrases.
   */
  getRandomPhrase(previousGamePhrase) {
    let nextPhrase =
      this.phrases[Math.floor(Math.random() * this.phrases.length)];
    while (nextPhrase === previousGamePhrase) {
      nextPhrase =
        this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }
    previousGamePhrase = nextPhrase;
    return nextPhrase;
  }
  /***
   * Handles game logic. Takes an event, applies the appropriate classes to the on screen keyboard.
   * checks if the game is over, then display an appropriate message and restarts the game by calling this.gameOver()
   */
  handleInteraction(e) {
    e.target.disabled = true;
    if (!this.phraseToString.includes(e.target.textContent)) {
      e.target.classList.add("wrong");
      this.missed++;
      this.removeLife();
      if (this.missed >= 5) {
        hasWon = false;
        this.gameOver();
      }
    } else {
      e.target.classList.add("chosen");
      this.activePhrase.showMatchedLetter(
        this.activePhrase.checkLetter(e.target.textContent)
      );
      if (this.checkForWin()) {
        this.gameOver();
      }
    }
  }
  /***
   * Hides one visible life counter when the player guesses wrong.
   */

  removeLife() {
    const scoreBoardList =
      document.getElementById("scoreboard").firstElementChild;
    if (this.missed <= 4) {
      scoreBoardList.children[
        scoreBoardList.children.length - (1 + this.missed)
      ].style.display = "none";
    } else {
      scoreBoardList.firstElementChild.style.display = "none";
    } //hacky but should work
  }

  /***
   * returns true if a player has discovered every letter in the phrase and sets the value of hasWon to true.
   */
  checkForWin() {
    const phraseLetters = document.querySelectorAll(".letter");
    if (
      Array.from(phraseLetters).filter((classes) =>
        classes.className.includes("hide")
      ).length === 0
    ) {
      hasWon = true;
      return true;
    }
  }
  /***
   * Resets the game board and display an appropriate message for the player.
   */
  gameOver() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "";
    this.activePhrase = null;
    this.phraseToString = null;
    const phraseDisplay = document.getElementById("phrase");
    phraseDisplay.firstElementChild.innerHTML = "";
    const virtualkeys = document.querySelectorAll(".key");
    virtualkeys.forEach((li) => {
      li.className = "key";
      li.disabled = false;
    });
    const lifeCounters = document.querySelectorAll(".tries");
    for (let i = 0; i < lifeCounters.length; i++) {
      lifeCounters[i].removeAttribute("style");
    }

    const gameOverMessage = document.getElementById("game-over-message");
    if (hasWon && streak > 0) {
      gameOverMessage.textContent = `🥳🥳 You Won! Your winning streak : ${streak} 🥳🥳`;
      streak++;
    } else if (hasWon) {
      gameOverMessage.textContent = `🥳🥳 You Won! Keep going! 🥳🥳`;
      streak++;
    } else {
      gameOverMessage.textContent = "😱😱 Sorry, try again! 😱😱";
      streak = 0;
    }
  }
}
