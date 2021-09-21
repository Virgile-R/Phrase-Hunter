/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */



document.getElementById('btn__reset').addEventListener('click', () =>{
    game = new Game()
    game.startGame()

})

document.getElementById('qwerty').addEventListener('click', (e) => {
    if (e.target.tag === 'BUTTON'){
        game.handleInteraction()
    }

})