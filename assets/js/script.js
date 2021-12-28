const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");
var c = 100;



let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let avaibleQuestions = []



let questions = [
    {
        question: "In a website browser address bar, what does “www” stand for?",
        choice1: "Wild Wild West",
        choice2: "World Wide Web",
        choice3: "World Without Windows",
        choice4: "With Warm Wishes",
        answer: 2,
    },
    {
        question: "In what year were the first Air Jordan sneakers released?",
        choice1: "1985",
        choice2: "1986",
        choice3: "1990",
        choice4: "1984",
        answer: 4,
    },
    {
        question: "Which two U.S. states don't observe Daylight Saving Time?",
        choice1: "Arizona and Hawaii",
        choice2: "Texas and California",
        choice3: "Arizona and New York",
        choice4: "Maryland and Oregon",
        answer: 1,
    },
    {
        question: "What is the tiny piece at the end of a shoelace called?",
        choice1: "Plastic piece",
        choice2: "Lace cuff",
        choice3: "An aglet",
        choice4: "idk",
        answer: 3,
    },
    {
        question: "What is the tallest breed of dog in the world?",
        choice1: "The Great Dane",
        choice2: "Husky",
        choice3: "Rottweiler",
        choice4: "German Shepherd",
        answer: 1,
    },
    {
        question: "How many ribs are in a human body?",
        choice1: "28",
        choice2: "20",
        choice3: "26",
        choice4: "24",
        answer: 4,
    },
    {
        question: "What color eyes do most humans have?",
        choice1: "Green",
        choice2: "Brown",
        choice3: "Blue",
        choice4: "Hazel",
        answer: 2,
    },
    {
        question: "What is the smallest unit of memory?",
        choice1: "Byte",
        choice2: "kilobyte",
        choice3: "Megabyte",
        choice4: "Petabyte",
        answer: 1,
    },
    {
        question: "How many hearts does an octopus have?",
        choice1: "1",
        choice2: "2",
        choice3: "3",
        choice4: "4",
        answer: 3,
    },
    {
        question: "What does CSS stand for?",
        choice1: "Cluster support system",
        choice2: "Counter strike source",
        choice3: "Cascading Style Sheets",
        choice4: "Constructing server software",
        answer: 3,
    }
]

function timer001() {
    c = c - 1;
    if (c < 100) {
        time001.innerHTML = c;
    }

    if (c < 1) {
        localStorage.setItem("mostRecentScore", score);
        return window.location.assign("./end.html") 
    }
}

upadte = setInterval("timer001()", 1000);

const SCORE_POINTS = 100
const MAX_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    avaibleQuestions = [...questions]
    getNewQuestion()
    
}

getNewQuestion = () => {
    if(avaibleQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score)
        return window.location.assign("./end.html")  
    }

    questionCounter++
    progressText.innerText = `question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionIndex = Math.floor(Math.random() * avaibleQuestions.length)
    currentQuestion = avaibleQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    avaibleQuestions.splice(questionIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :
        'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if (classToApply === 'incorrect') {
            c = c - 10;
        }


        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 750)
    })
})


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



incrementScore = num => {
    score +=num
    scoreText.innerText = score
}



startGame()