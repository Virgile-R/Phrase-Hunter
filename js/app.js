/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
/***
 *  Variable declarations
 */
let previousGamePhrase = "";
let hasWon = false;
let streak = 0;
let gameReady = true;
let gameActive = false;
const body = document.querySelector("body");
/***
 *  Events listener
 */
window.addEventListener("load", () => {  
  body.insertAdjacentHTML(
    "beforeend",
    `<div class ='credit'>Image by <a href="https://pixabay.com/users/azheer-17448000/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6528729">Reza Muhammad Fairuz</a> from <a href="https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=6528729">Pixabay</a></div>`
  );
});
document.getElementById("btn__reset").addEventListener("click", () => {
  game = new Game();
  game.startGame();
});

document.getElementById("qwerty").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON" && gameReady && gameActive) {
    game.handleInteraction(e);
  }
});

document.addEventListener("keydown", (e) => {
  if (gameReady && /[A-z]/.test(e.key) && gameActive) {
    gameReady = false;
    game.handleInteraction(e);
  }
});

document.addEventListener("keyup", () => {
  gameReady = true;
});
