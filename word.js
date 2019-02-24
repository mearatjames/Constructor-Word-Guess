const Letter = require('./letter.js')

function Word(word) {
    this.letters = []

    word.split('').forEach(element => {
        this.letters.push(new Letter(element))
    });

    this.toString = function() {
        let display = []
        this.letters.forEach(element => {
            display.push(element.character())
        })
        return display
    }

    this.checkLetters = function(guess) {
        this.letters.forEach(element => {
            element.checkGuess(guess)
        })
        
    }
}



module.exports = Word