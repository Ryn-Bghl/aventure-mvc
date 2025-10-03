const questions = {
  "Dans MVC, le Model sert à garder les informations importantes (comme une base de données).":
    "vrai",
  "La View sert à montrer les informations à l’écran.": "vrai",
  "Le Controller sert à relier ce que voit l’utilisateur et ce qui est stocké dans le Model.":
    "vrai",
  "MVC sert à séparer l’affichage, la logique et les données pour que le code soit plus clair.":
    "vrai",
  "Dans MVC, l’affichage peut modifier les données directement sans passer par le Controller.":
    "faux",
  "Utiliser MVC rend un projet plus facile à corriger et à améliorer.": "vrai",
  "MVC est utilisé uniquement pour créer des applications de bureau, pas pour des sites web.":
    "faux",
  "Le Controller reçoit les actions de l’utilisateur (comme cliquer sur un bouton) et décide quoi faire.":
    "vrai",
  "La View doit surtout afficher les données et contenir le moins de code possible.":
    "vrai",
  "MVC signifie Mayo View Controller.": "faux",
  "Le Model peut se connecter à une base de données pour récupérer ou stocker des informations.":
    "vrai",
  " La View peut contenir des images, des boutons et du texte pour montrer les informations à l’utilisateur.":
    "vrai",
  "Le Controller décide comment répondre quand un utilisateur clique sur un bouton.":
    "vrai",
  "Le Model et la View doivent toujours être liés directement pour que le MVC fonctionne.":
    "vrai",
  "MVC aide à travailler à plusieurs sur le même projet sans se gêner.": "vrai",
  "La View peut demander directement au Model de changer les données.": "faux",
  "MVC est une façon d’organiser le code pour que ce soit plus facile à comprendre.":
    "vrai",
  "Le Controller peut demander au Model de récupérer des informations et ensuite demander à la View de les afficher.":
    "vrai",
  "On peut utiliser MVC pour créer un site web, un jeu ou une application mobile.":
    "vrai",
  "Dans MVC, chaque partie a un rôle précis : Model pour les données, View pour l’affichage, Controller pour gérer les actions.":
    "vrai",
};

let score = 0;
let currentQuestionIndex = 0;
let questionsOrder = [];

const questionText = document.querySelector("#questions-text");
const scoreDisplay = document.querySelector("#score");
const trueBtn = document.querySelector("#true");
const falseBtn = document.querySelector("#false");
const startBtn = document.querySelector("#start");
const restartBtn = document.querySelector("#restart");
const questionCounter = document.querySelector("#question-counter");
const timerDisplay = document.querySelector("#timer");
let timerInterval = null;
const QUESTION_TIME = 10; // seconds per question
let timeLeft = QUESTION_TIME;

function setupQuestions() {
  questionsOrder = Object.keys(questions);
}

function renderQuestion(question) {
  questionText.innerHTML = question;
  renderQuestionCounter(currentQuestionIndex + 1, questionsOrder.length);
  startTimer();
}

function renderScore(score) {
  scoreDisplay.innerHTML = score;
}

function showEndGameMessage() {
  questionText.innerHTML = "Vous avez fini le jeu de vrai ou faux !";
  trueBtn.style.display = "none";
  falseBtn.style.display = "none";
  restartBtn.style.display = "inline-block";
  timerDisplay.style.display = "none";
  clearTimer();
}

function checkAnswer(userAnswer) {
  const currentQuestion = questionsOrder[currentQuestionIndex];
  const correctAnswer = questions[currentQuestion];
  if (userAnswer === correctAnswer) {
    score++;
    return true;
  }
  return false;
}

function getNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionsOrder.length) {
    return questionsOrder[currentQuestionIndex];
  }
  return null;
}

function isGameFinished() {
  return currentQuestionIndex >= questionsOrder.length - 1;
}

function handleAnswer(userAnswer) {
  clearTimer();
  checkAnswer(userAnswer);
  renderScore(score);

  if (isGameFinished()) {
    showEndGameMessage();
  } else {
    const nextQuestion = getNextQuestion();
    renderQuestion(nextQuestion);
  }
}

function handleTrueClick() {
  handleAnswer("vrai");
}

function handleFalseClick() {
  handleAnswer("faux");
}

function handleStartClick() {
  startBtn.style.display = "none";
  timerDisplay.style.display = "inline-block";
  document.querySelector("#questions-container").style.display = "block";
  trueBtn.style.display = "inline-block";
  falseBtn.style.display = "inline-block";
  scoreDisplay.style.display = "inline-block";
  restartBtn.style.display = "none";
  score = 0; // Ensure score is reset
  currentQuestionIndex = 0; // Ensure index is reset
  setupQuestions();
  renderScore(score);
  renderQuestion(questionsOrder[currentQuestionIndex]);
}

function renderQuestionCounter(current, total) {
  questionCounter.innerHTML = `Question ${current} / ${total}`;
}

function restartGame() {
  score = 0;
  currentQuestionIndex = 0;
  setupQuestions();
  renderQuestion(questionsOrder[0]);
  renderScore(score);
  trueBtn.style.display = "inline-block";
  falseBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  renderQuestionCounter(1, questionsOrder.length);
  startTimer();
}

// Start the timer for each question
function startTimer() {
  clearTimer();
  timeLeft = QUESTION_TIME;
  timerDisplay.innerHTML = `${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerHTML = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearTimer();
      handleTimeout();
    }
  }, 1000);
}

function clearTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// When time runs out, go to next question (no score increment)
function handleTimeout() {
  if (isGameFinished()) {
    showEndGameMessage();
  } else {
    getNextQuestion();
    renderQuestion(questionsOrder[currentQuestionIndex]);
    renderScore(score);
    startTimer();
  }
}

trueBtn.addEventListener("click", handleTrueClick);
falseBtn.addEventListener("click", handleFalseClick);
startBtn.addEventListener("click", handleStartClick);
restartBtn.addEventListener("click", restartGame);
