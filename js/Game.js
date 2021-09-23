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
  }
  selectRandomBackground() {
    const backgroundImages = [
      {
        url: "images/background/boat-5889919.png",
        credit:
          'Image by <a href="https://pixabay.com/users/lobsarts-19515294/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5889919">LOBS Arts</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=5889919">Pixabay</a>',
      },
      {
        url: "images/background/acorn-1292946.svg",
        credit:
          'Image by <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1292946">OpenClipart-Vectors</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1292946">Pixabay</a>',
      },
      {
        url: "images/background/background-1409125.svg",
        credit:
          'Image by <a href="https://pixabay.com/users/davidrockdesign-2595351/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1409125">DavidRockDesign</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1409125">Pixabay</a>',
      },
    ];
    const randomBG =
      backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

    const body = document.querySelector("body");
    body.style.backgroundImage = `url('${randomBG.url}')`;
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    document.querySelector(".credit").innerHTML = `${randomBG.credit}`;
  }

  /***
   * Initialises a new game, selects a new Phrase at random and transforms it in a string format for convenience.
   */
  startGame() {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none";
    this.activePhrase = new Phrase(this.getRandomPhrase(previousGamePhrase));
    gameActive = true;
    previousGamePhrase = this.activePhrase.phrase;
    this.selectRandomBackground();
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

    return nextPhrase;
  }
  /***
   * Handles game logic. Takes an event, applies the appropriate classes to the on screen keyboard.
   * checks if the game is over, then display an appropriate message and restarts the game by calling this.gameOver()
   */
  handleInteraction(e) {
    const keyboard = document.querySelectorAll(`.key`);
    const keyEvent = e.type === "click" ? e.target.textContent : e.key;
    const keyChosen = Array.from(keyboard).filter(
      (key) => key.textContent === keyEvent
    );

    if (
      !this.activePhrase.phrase.includes(keyChosen[0].textContent) &&
      !keyChosen[0].disabled
    ) {
      keyChosen[0].disabled = true;
      keyChosen[0].classList.add("wrong");
      this.missed++;
      this.removeLife();
    } else if (!keyChosen[0].disabled) {
      keyChosen[0].disabled = true;
      keyChosen[0].classList.add("chosen");
      this.activePhrase.showMatchedLetter(
        this.activePhrase.checkLetter(keyChosen[0].textContent)
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
    if (this.missed < 5) {
      scoreBoardList.children[
        scoreBoardList.children.length - this.missed
      ].firstElementChild.setAttribute("src", `images/lostHeart.png`);
    } else {
      hasWon = false;
      this.gameOver();
    }
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
    gameActive = false;
    const overlay = document.getElementById("overlay");
    overlay.style.display = "";
    this.activePhrase = null;
    const phraseDisplay = document.getElementById("phrase");
    phraseDisplay.firstElementChild.innerHTML = "";
    const virtualkeys = document.querySelectorAll(".key");
    virtualkeys.forEach((li) => {
      li.className = "key";
      li.disabled = false;
    });
    const lifeCounters = document.querySelectorAll(".tries");
    for (let i = 0; i < lifeCounters.length; i++) {
      lifeCounters[i].firstElementChild.setAttribute(
        "src",
        `images/liveHeart.png`
      );
    }
    const credit = document.querySelector(".credit");
    credit.innerHTML = "";
    const gameOverMessage = document.getElementById("game-over-message");
    if (hasWon && streak > 0) {
      overlay.className = "win";
      gameOverMessage.textContent = `🥳🥳 You Won! Your winning streak : ${streak} 🥳🥳`;
      credit.innerHTML =
        'Image by <a href="https://pixabay.com/users/memed_nurrohmad-3307648/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1674886">Memed_Nurrohmad</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1674886">Pixabay</a>';
      streak++;
    } else if (hasWon) {
      overlay.className = "win";
      gameOverMessage.textContent = `🥳🥳 You Won! Keep going! 🥳🥳`;
      credit.innerHTML =
        'Image by <a href="https://pixabay.com/users/memed_nurrohmad-3307648/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1674886">Memed_Nurrohmad</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1674886">Pixabay</a>';
      streak++;
    } else {
      overlay.className = "lose";
      gameOverMessage.textContent = "😱😱 Sorry, try again! 😱😱";
      credit.innerHTML =
        'Image by <a href="https://pixabay.com/users/openclipart-vectors-30363/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=149344">OpenClipart-Vectors</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=149344">Pixabay</a>';
      streak = 0;
    }
  }
}
