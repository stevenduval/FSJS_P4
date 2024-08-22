/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    // method
    addPhraseToDisplay() {
        // create document fragment to append all li once to ul
        let docFrag = document.createDocumentFragment();
        // split phrase out and loop through each character
        this.phrase.split('').forEach(char => {
            // create li element, set className, set context, append to document fragment
            let li = document.createElement('li');
            li.className = (char === ' ') ? 'space': `hide letter ${char}`;
            li.textContent = char;
            docFrag.appendChild(li);
        });
        // select ul and append all li to it
        document.querySelector('#phrase ul').appendChild(docFrag);
    }
    // method
    checkLetter(target) {
        // loop through all the phrase lis, only return the matches
        return [...document.querySelectorAll('#phrase ul li')].filter(li => li.textContent === target);
    }
    // method
    showMatchedLetter(elem) {
        // remove hide class and add show class
        elem.classList.remove('hide');
        elem.classList.add('show');
    }
    
}