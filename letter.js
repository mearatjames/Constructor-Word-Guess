function Letter(letter) {
    this.letter = letter.toUpperCase()
    this.guessed = false

    this.character = function() {
        if(!this.guessed && this.letter !== " ") {
            return "_"
        } else {
            return this.letter
        }
    }

    this.checkGuess = function(guess) {
        if (guess === this.letter) {
            this.guessed = true
        }
    }
}

module.exports = Letter