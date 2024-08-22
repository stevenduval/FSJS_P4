/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = [new Phrase('break a leg'), new Phrase('see eye to eye'), new Phrase('hit the sack'), new Phrase('spill the beans'), new Phrase('better late than never')];
        this.activePhrase = null;
    }
    // method
    startGame() {
        // hide the overlay
        document.querySelector('#overlay').style.display = 'none';
        // set active phrase returned from getRandomPhrase equal to activePhrase
        this.activePhrase = this.getRandomPhrase();
        // invoke addPhraseToDisplay method
        this.activePhrase.addPhraseToDisplay();
    }
    // method
    getRandomPhrase() {
        // pick a random phrase and return it
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    }
    // method
    handleInteraction(elem) {
        // disable the letter chosen by the user
        elem.setAttribute('disabled', '');
        // check if letter matches one that is in the active phrase
        let checkMatch = this.activePhrase.checkLetter(elem.textContent);
        // if matches
        if (checkMatch.length > 0) {
            // add chose class to letter chosen by user
            elem.classList.add('chosen');
            // for each match returned send to showMatchedLetter method
            checkMatch.forEach(match => this.activePhrase.showMatchedLetter(match));
            // check if win, if win then end game
            if ( this.checkForWin() ) { this.gameOver('win') } 
        } else {
            // add wrong class to letter chosen by user
            elem.classList.add('wrong');
            // remove life
            this.removeLife();
        }
    }
    // method
    removeLife() {
        // increment missed value to keep track of lives
        this.missed++;
        // if missed 5 guesses end the game
        if (this.missed === 5) { 
            // send lose status to gameover method
            this.gameOver('lose');
            // return false to signify loss
            return false;
        }
        // first heart found switch it to lost heart
        document.querySelector(`img[src*='liveHeart']`).src = 'images/lostHeart.png'
    }
    // method
    checkForWin() {
        // if all phrase li's are no longer hidden then the game is won
        if (document.querySelectorAll('li.hide').length === 0) { return true }
        // return false if above isn't met
        return false;
    }
    // method
    gameOver(status) {
        // get overlay, overlay h1 and overlay h2
        let overlay =  document.querySelector('#overlay');
        let overlayH1 = document.querySelector('#overlay > h1');
        let overlayH2 = document.querySelector('#overlay > h2');
        // show overlay
        overlay.style.display = 'flex';
        // remove overlay h2
        if (overlayH2) { overlayH2.remove() }
        // set overlay class
        overlay.className = (status === 'win') ? 'win' : 'lose';
        // set overlay H1
        overlayH1.textContent = (status === 'win') ? 'YOU HAVE WON!! WOOOOHOOO' : 'SORRY, YOU HAVE LOST!! TRY AGAIN?';
    }
}