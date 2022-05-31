// quiz questions (multiple choice with answer)
var questions = [
    {q: "Commonly used data types DO NOT include:",
    a: "1. Strings", b: "2. Booleans", c: "3. Alerts", d: "4. Numbers",
    answer: "3. Alerts"},
    
    {q: "The condition in an if/else statement is enclosed with ____.",
    a: "1. Quotes", b: "2. Curly brackets", c: "3. Parentheses", d: "4. Square brackets",
    answer: "3. Parentheses"},
    
    {q: "Arrays in JavaScript can be used to store ____.",
    a: "1. Numbers and strings", b: "2. Other arrays", c: "3. Booleans", d: "4. All of the above",
    answer: "4. All of the above"},
    
    {q: "String values must be encosed within ____ when being assigned to variables.",
    a: "1. Quotes", b: "2. Curly brackets", c: "3. Parentheses", d: "4. Square brackets",
    answer: "1. Quotes"},
    
    {q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "1. Javascript", b: "2. Terminal/Bash", c: "3. for loops", d: "4. console.log",
    answer: "4. console.log"},
    
    {question: "What is the correct syntax for referring to an external script called 'code.js'?",
    a: "1. <script src='code.js'>", b: "2. <script href='code.js'>", c: "3. <script ref='code.js'>", d: "4. <script name='code.js'>",
    answer: "1. <script src='code.js'>"}];

var clickStart = document.getElementById("start");
var timerEl = document.getElementById("countdown");
var timeLeft = 100;
var quizDuration;
var quizContainer = document.querySelector("#quiz-container");

// timer function (100 seconds and once timer is not greater than 0 go to end page)
function timer() {
    timerEl.textContent = "Time left: " + timeLeft + "s";
    quizDuration = setInterval(function () {
        if (timeLeft > 0) {
            adjustTime(-1)} 
        else {
            endPage()}
    }, 1000)}
// add function to countdown timer
function adjustTime(amount) {
    timeLeft += amount;
    if (timeLeft < 0) {
        timeLeft = 0}
    timerEl.textContent = "Time left: " + timeLeft + "s"}
//timer begins on click of the start button
clickStart.onclick = timer;
var renderQuestion = function (question) {
    quizContainer.innerHTML = "";

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.q;

    var answerA = document.createElement("button");
    answerA.textContent = question.a;
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.b;
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.c;
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.d;
    answerD.addEventListener("click", answerClick);

    quizContainer.appendChild(questionHeader);
    quizContainer.appendChild(answerA);
    quizContainer.appendChild(answerB);
    quizContainer.appendChild(answerC);
    quizContainer.appendChild(answerD)}

var questionCounter = 0;
var playerScore = 0;
var correctAnswer = questions[questionCounter].answer;
var clickViewScores = document.getElementById("view-score");

var answerClick = function(event) {
    event.preventDefault();
    var playerChoice = event.target.textContent;
    correctAnswer = questions[questionCounter].answer;

// check the answer: right (add to score) or  wrong (adjust time remaining, -7 seconds)
    var checkAnswer = document.querySelector("#check-answer");
    if (playerChoice !== correctAnswer) {
        adjustTime(-7);
        checkAnswer.textContent = "Wrong!";
        questionCounter++;
        if (questionCounter >= questions.length) {
            endPage();
        } else {renderQuestion(questions[questionCounter])}}

    else if (playerChoice === correctAnswer) {
        questionCounter++;
        checkAnswer.textContent = "Right!";
        playerScore++;
        if (questionCounter >= questions.length) {
            endPage();
        } else {renderQuestion(questions[questionCounter])}}}

var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questions[questionCounter])};

function resetDisplay() {
    quizContainer.innerHTML="";
    document.querySelector("#intro-page").style.display = "none"}

function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    quizContainer.innerHTML = "";
    quizContainer.innerHTML = name + " " + score}

clickViewScores.addEventListener("click", () => {
    highScores()})
// Page to display after player has finished all the questions or time runs out
var endPage; 
function endPage() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(quizDuration);
    var endPage = document.createElement("h2");
    quizContainer.appendChild(endPage);

    let blank = document.querySelector("#check-answer");
    blank.innerHTML = "";

    endPage.innerHTML = "Quiz completed! Your final score is " + playerScore + ". <br> Enter your initals below to save your high score.";

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var addHighScore = document.createElement("button");
    addHighScore.textContent = "Submit";
    blank.appendChild(addHighScore);

    addHighScore.addEventListener("click", () => {

        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data = JSON.stringify({ "name":input[0], "score":input[1]})
            localStorage.setItem("object", data)}
        storeInitials(initialBox.value, playerScore);

        var playAgain = document.createElement("button");
        playAgain.textContent= "Play Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload()})});

    document.querySelector("input").value = "";

    initialBox.addEventListener("submit", endPage)};

function renderInitials() {
    submitInitialBtn.addEventListener('click', function(event) {
        event.preventDefault;})};

// single click button to start the quiz
clickStart.addEventListener('click', quiz);