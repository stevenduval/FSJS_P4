/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


const button = document.querySelector('#btn__reset');
const keyboard = document.querySelector('#qwerty');

// variable to access instantiated game
let game;

// function to reset the game
const resetGame = () => {
    // clear all existing phrase li elements from screen
    document.querySelector('#phrase ul').replaceChildren();
    // reset all qwerty buttons to only have key class and remove disabled attribute
    document.querySelectorAll("#qwerty button").forEach(button => { 
        button.className = 'key'; 
        button.removeAttribute('disabled');
    });
    // reset all lost hearts to live hearts
    document.querySelectorAll(`img[src*='lostHeart']`).forEach(img => img.src = 'images/liveHeart.png');
}

// function to start a new game
const startNewGame = () => {
    // call reset game function
    resetGame();
    // instatite a new game
    game = new Game();
    // start the game
    game.startGame();
}

// function to handle which letter a user clicked
const handleClickInteraction = (e) => {
    if (e.target.tagName === 'BUTTON') {
        game.handleInteraction(e.target);
    }
}

// function to handle when a user presses a key and releases it
const handleKeyUpInteraction = ( { key } ) => {
    // convert to lowercase so any alpha a-z key works
    key = key.toLowerCase();
    // test whether the key is a - z
    if (/^[a-z]$/i.test(key)) {
        // find button from on screen keyboard and make sure its not disabled
        let buttonOfkeyToSend = [...document.querySelectorAll("#qwerty button")].filter(button => button.textContent === key && !button.disabled )[0];
        // send to handleInteraction method
       if (buttonOfkeyToSend) { game.handleInteraction(buttonOfkeyToSend) }
    }

}


// event listeners
button.addEventListener('click', startNewGame);
keyboard.addEventListener('click', handleClickInteraction);
document.addEventListener('keyup', handleKeyUpInteraction);