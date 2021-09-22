/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase){
        this.phrase = phrase.toLowerCase()
    }
    /***
     * puts the phrase into an array then creates the element to display it on the page.
     */
    addPhraseToDisplay(){
        const phraseArray = this.phrase.split("")
        const phraseSection = document.getElementById("phrase")
        phraseArray.forEach(letter => {
            let li = document.createElement('li')
            if (letter !== " ") {
                li.className = `hide letter ${letter}`
                li.textContent = letter

            } else {
                li.className = "space"
            }
            phraseSection.firstElementChild.appendChild(li)
        });

    }
    /***
     * takes a string containing a letter, returns an array with all elements matching the letter
     * check if the letter inputed is present in the phrase,
     */
    checkLetter(letter){
        const virtualKeys = Array.from(document.querySelectorAll(".letter")) 
        const matchingLetters = []
        for (let i = 0; i < virtualKeys.length; i++){
            if (virtualKeys[i].textContent === letter && this.phrase.includes(virtualKeys[i].textContent) ){
                matchingLetters.push(virtualKeys[i])
            }
        } //should be a .filter but lets get this working first
    
        return matchingLetters
    }
     /***
     * takes an array of element containing elements to be reveled
     * revels the elements by giving them the class show.
     */
    showMatchedLetter(matchingLetters){
        matchingLetters.map( letter => {
            letter.className = `show letter ${letter.textContent}`
        })
        
    }
}