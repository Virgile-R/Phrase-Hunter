/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase.toLowerCase();
  }
  /***
   * puts the phrase into an array then creates the element to display it on the page.
   */
  addPhraseToDisplay() {
    const phraseArray = this.phrase.split("");
    const phraseSection = document.getElementById("phrase");
    phraseArray.forEach((letter) => {
      let li = document.createElement("li");
      if (letter !== " ") {
        li.className = `hide letter ${letter}`;
        li.textContent = letter;
      } else {
        li.className = "space";
      }
      phraseSection.firstElementChild.appendChild(li);
    });
  }
  /***
   * 
   * check if the letter inputed by the player is present in the phrase, returns true if this is the case
   */
  checkLetter(letter) {
   
    if (this.phrase.includes(letter)){
      return true
    }
  }
  /***
   * takes a letter inputed by the player
   * revels the elements by giving them the class show.
   */
  showMatchedLetter(letter) {
    const letterEl = Array.from(document.querySelectorAll(`.${letter}`))
    letterEl.map((letter) => {
    letter.className = `show letter ${letter}`;
    }
    )} 
  }

