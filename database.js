const homeButton = document.getElementById("home-btn");
homeButton.addEventListener("click", () => {
    console.log("Home button clicked"); 
    window.location.href = "index.html"; 
});


const linuxCommandQuestions = [


        {
            question: "What is the primary key in a relational database?",
            answers: [
                { text: "Primary Index", correct: false },
                { text: "Main Key", correct: false },
                { text: "Primary Key", correct: true },
            ]
        },
        {
            question: "Which SQL keyword is used to retrieve unique records?",
            answers: [
                { text: "DISTINCT", correct: true },
                { text: "UNIQUE", correct: false },
                { text: "DIFFERENT", correct: false },
            ]
        },
        {
            question: "In a database, what does the acronym SQL stand for?",
            answers: [
                { text: "Structured Query Language", correct: true },
                { text: "Sequential Query Language", correct: false },
                { text: "Static Question Language", correct: false },
            ]
        },
        {
            question: "Which of the following is not a valid data type in SQL?",
            answers: [
                { text: "VARCHAR", correct: false },
                { text: "BOOLEAN", correct: false },
                { text: "DATESTRING", correct: true },
            ]
        },
        {
            question: "What is the purpose of the SQL SELECT statement?",
            answers: [
                { text: "To update records", correct: false },
                { text: "To insert new records", correct: false },
                { text: "To retrieve data from a database", correct: true },
            ]
        },
        {
            question: "In database terminology, what does CRUD stand for?",
            answers: [
                { text: "Create, Read, Update, Delete", correct: true },
                { text: "Categorize, Retrieve, Update, Delete", correct: false },
                { text: "Copy, Remove, Update, Duplicate", correct: false },
            ]
        },
        {
            question: "What is the purpose of the SQL WHERE clause?",
            answers: [
                { text: "To filter results based on a condition", correct: true },
                { text: "To sort results in ascending order", correct: false },
                { text: "To join two tables", correct: false },
            ]
        },
        {
            question: "Which type of relationship is represented by a foreign key in a database?",
            answers: [
                { text: "One-to-One", correct: false },
                { text: "Many-to-One", correct: false },
                { text: "Many-to-Many", correct: true },
            ]
        },
        {
            question: "What is the purpose of an index in a database?",
            answers: [
                { text: "To store data in a sorted order", correct: false },
                { text: "To speed up data retrieval operations", correct: true },
                { text: "To create a backup of the database", correct: false },
            ]
        },
        {
            question: "Which SQL clause is used to sort the result set in descending order?",
            answers: [
                { text: "ORDER BY DESC", correct: true },
                { text: "SORT DESC", correct: false },
                { text: "DESCENDING", correct: false },
            ]
        },
        {
            question: "What is a primary difference between a primary key and a unique key?",
            answers: [
                { text: "A table can have multiple unique keys", correct: false },
                { text: "A unique key can have NULL values", correct: true },
                { text: "A primary key can be of any data type", correct: false },
            ]
        },
        {
            question: "In database normalization, what does BCNF stand for?",
            answers: [
                { text: "Binary-Coded Normal Form", correct: false },
                { text: "Backward Chaining Normal Form", correct: false },
                { text: "Boyce-Codd Normal Form", correct: true },
            ]
        },
        {
            question: "Which SQL statement is used to add data to a database?",
            answers: [
                { text: "INSERT INTO", correct: true },
                { text: "ADD DATA", correct: false },
                { text: "UPDATE SET", correct: false },
            ]
        },
        {
            question: "What is the purpose of the SQL GROUP BY clause?",
            answers: [
                { text: "To filter results based on a condition", correct: false },
                { text: "To sort results in ascending order", correct: false },
                { text: "To group rows that have the same values", correct: true },
            ]
        },
        {
            question: "Which SQL function is used to find the maximum value in a column?",
            answers: [
                { text: "MAX()", correct: true },
                { text: "TOP()", correct: false },
                { text: "SUM()", correct: false },
            ]
        },
];
    

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const summaryContainer = document.getElementById("summary-container");
const summaryList = document.getElementById("summary-list");

let currentQuestionIndex = 0;
let score = 0;
let timer;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffleArray(linuxCommandQuestions);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

const questionTimeLimit = 10;

function showQuestion() {
    resetState();
    let currentQuestion = linuxCommandQuestions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

    startTimer();
}

function startTimer() {
    let timeLeft = questionTimeLimit;
    timerElement.textContent = `Time Left: ${timeLeft} seconds`;
    timer = setInterval(function () {
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNextButton();
        } else {
            timerElement.textContent = `Time Left: ${timeLeft} seconds`;
            timeLeft--;
        }
    }, 1000);
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    clearInterval(timer);
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    // Add the "selected" class to the clicked button
    selectedBtn.classList.add("selected");

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        // Disable all buttons to prevent further clicking
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScoreFeedback(score) {
    let feedbackMessage = "";

    if (score === linuxCommandQuestions.length) {
        feedbackMessage = "Excellent! You got all questions correct!";
    } else if (score >= Math.round(0.7 * linuxCommandQuestions.length)) {
        feedbackMessage = "Good job! You did well!";
    } else {
        feedbackMessage = "Needs improvement. Keep practicing!";
    }

    questionElement.innerHTML = `You scored ${score} out of ${linuxCommandQuestions.length}. ${feedbackMessage}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    
    // Clear the timer text and answer buttons
    timerElement.textContent = "";
    answerButtons.innerHTML = "";

    
    // Display the summary in the summary-list
    const summaryHTML = linuxCommandQuestions.map((question, index) => {
        const userAnswer = getUserAnswer(index);
        const correctAnswer = getCorrectAnswer(index);
        const isCorrect = userAnswer === correctAnswer;
    
        return `
          <li>
            Question ${index + 1}: ${question.question}
            <br>
            Your Answer: ${userAnswer}
            <br>
            Correct Answer: ${correctAnswer}
            <br>
            ${isCorrect ? "Correct" : "Incorrect"}
          </li>
        `;
    });

    summaryList.innerHTML = summaryHTML.join("");
    summaryContainer.style.display = "block";

}

function getUserAnswer(index) {
    const buttons = answerButtons.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains("selected")) { // Change "correct" to "selected"
            return buttons[i].textContent;
        }
    }
    return "N/A"; // Return "N/A" if no answer was found
}
function getCorrectAnswer(index) {
    return linuxCommandQuestions[index].answers.find((answer) => answer.correct).text;
  }




function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < linuxCommandQuestions.length) {
        showQuestion();
    } else {
        showScoreFeedback(score);
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < linuxCommandQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz(); 
