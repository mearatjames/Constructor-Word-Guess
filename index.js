const Word = require('./word.js')

const inquirer = require("inquirer")

let wordArr = ['Long Beach', 'Irvine', 'Anaheim', 'Lakewood', 'Santa Ana', 'Fountain Valley', 'Lake Forest', 'Costa Mesa', 'Westminster', 'Fullerton', 'Cerritos']

let guessCount
let word
let secretWord
let alreadyGuessed
let isWin = false


function welcome() {
    console.log('Welcome to LA and OC county city name guess game')
    console.log('====================================')
    startGame()
}

function startGame() {
    alreadyGuessed = []
    guessCount = 7
    secretWord = wordArr[Math.floor(Math.random() * wordArr.length)].toUpperCase()
    word = new Word(secretWord)
    console.log(word.toString().join(' '))
    makeGuess()
}

function makeGuess() {
    inquirer.prompt([
      {
        name: "guessedLetter",
        message:"\nGuesses Left: " + guessCount +
                "\nLetter already guessed: " + alreadyGuessed.join(', ') +
                "\nGuess a letter!" 
      }
    ])
    .then(data => {
        let validator = /^[A-Za-z]+$/
        let letterGuessed = data.guessedLetter.toUpperCase()
        if (alreadyGuessed.indexOf(letterGuessed) === -1 && letterGuessed.match(validator) && letterGuessed.length < 2) {
            alreadyGuessed.push(letterGuessed)
            word.checkLetters(letterGuessed)
            console.log(word.toString().join(' '))
            if (secretWord.indexOf(letterGuessed) === -1 ) {
                guessCount--
                console.log("Incorrect!!")
            } else {
                console.log('Correct!!')
                if (word.toString().indexOf('_') === -1) {
                    isWin = true
                    console.log('You Win!!!')
                }
            }
        } else if (!alreadyGuessed.indexOf(letterGuessed)) {
            word.toString()
            console.log('You already guessed this letter!!')
        } else {
            word.toString()
            console.log('Please enter valid alphabet characters only (do not try to break my code!!)')
        }
        if (guessCount > 0 && !isWin) {
            makeGuess()
        } else {
            nextGame()
        }
    })
}

function nextGame() {
    isWin = false
    inquirer.prompt([
        {
          name: "continue",
          type: "list",
          message: "Restart Game?",
          choices: ["Yes", "No"]
        }
      ])
    .then(data => {
        if(data.continue === "Yes") {
          welcome();
        } else {
          console.log("Thanks for playing!")
        }
    })
}

  welcome()