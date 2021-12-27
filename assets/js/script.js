var question = document.querySelector("#question");
var choices = Array.from(document.querySelectorAll(".choice-text"));
var progressText = document.querySelector("#progressText");
var scoreText = document.querySelector("#score");
var progressBarFull = document.querySelector("#progressBarFull");


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let avaibleQuestions = []


let questions