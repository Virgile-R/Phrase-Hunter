/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */
/***
 *  Variable declarations
 */
let previousGamePhrase = "";
let hasWon = false;
let streak = 0;

/***
 *  Events listener
 */
document.getElementById("btn__reset").addEventListener("click", () => {
  game = new Game();
  game.startGame();
});

document.getElementById("qwerty").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    game.handleInteraction(e);
  }
});
