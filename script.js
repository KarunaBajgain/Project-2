const questions = [
    {
        question: "What is the fullform of HTML?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlink and Text Markup Language", correct: false },
            { text: "High Tech Multi-Language", correct: false },
        ]

    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "Cascading Style Sheet", correct: true },
            { text: "Creative Style Syntax", correct: false },
            { text: "Computer System Styles", correct: false },
        ]
    },
    {
        question: "What is the primary purpose of JavaScript in web development?",
        answers: [
            { text: "To style web pages", correct: false },
            { text: "To structure web content", correct: false },
            { text: "To add interactivity to web pages", correct: true },
        ]
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        answers: [
            { text: "text-color", correct: false },
            { text: "font-color", correct: false },
            { text: "color", correct: true },
        ]
    },

    {
        question: "What does the 'href' attribute in an anchor tag (<a>) define?",
        answers: [
            { text: "The heading of the page", correct: false },
            { text: "The text color", correct: false },
            { text: "The target URL of the hyperlink", correct: true },
        ]
    },
    {
        question: "What is the purpose of the <head> element in HTML?",
        answers: [
            { text: "To define the main content of the web page", correct: false },
            { text: "To specify metadata about the document", correct: true },
            { text: "To create links to other web pages", correct: false },
        ]
    },

    {
        question: "How do you add a comment in HTML?",
        answers: [

            { text: "//This is a comment//", correct: false },
            { text: "'This is a comment'", correct: false },
            { text: " <!--This is a comment--> ", correct: true },
        ]
    },
    {
        question: "Which CSS property is used to control the layout of elements in relation to each other?",
        answers: [
            { text: "display", correct: true },
            { text: "margin", correct: false },
            { text: "color", correct: false },
        ]
    },
    {
        question: "What is the purpose of the 'onclick' attribute in HTML?",
        answers: [
            { text: "To create a link to another webpage", correct: false },
            { text: "To define a function to execute when a button is clicked", correct: true },
            { text: "To change the background color of an element", correct: false },
        ]
    },
    {
        question: "What is the default display property for a <div> element in CSS?",
        answers: [
            { text: "inline", correct: false },
            { text: "block", correct: true },
            { text: "hidden", correct: false },
        ]
    },
    {
        question: "What is the role of the 'querySelector' method in JavaScript?",
        answers: [
            { text: "To select elements by class name", correct: false },
            { text: "To fetch data from a remote server", correct: false },
            { text: "To add event listeners to elements", correct: true },
        ]
    },
    {
        question: "What is the purpose of the 'for' loop in JavaScript?",
        answers: [
            { text: "To define a function", correct: false },
            { text: "To create an array", correct: false },
            { text: "To repeatedly execute a block of code", correct: true },
        ]
    },
    {
        question: "Which programming language is commonly used for web development?",
        answers: [
            { text: "Python", correct: false },
            { text: "Java", correct: false },
            { text: "JavaScript", correct: true },
        ]
    },
    {
        question: "What does the 'border-radius' property in CSS control?",
        answers: [
            { text: "The background color of an element", correct: false },
            { text: "The font size of text", correct: false },
            { text: "The roundness of an element's corners", correct: true },
        ]
    },
    {
        question: "What does the 'console.log' function in JavaScript do?",
        answers: [
            { text: "Display a message box", correct: false },
            { text: "Print text on the webpage", correct: false },
            { text: "Log messages to the browser console", correct: true },
        ]
    }
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

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Call the shuffle function to randomize the questions
shuffleArray(questions);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
const questionTimeLimit = 10; // Set the time limit for each question in seconds


function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
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

    // Start the timer for the current question
    startTimer();
}
function startTimer() {
    timeLeft = questionTimeLimit; // Reset the time left
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
    clearInterval(timer); // Clear the timer
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
const homeButton = document.getElementById("home-btn");
homeButton.addEventListener("click", () => {
    console.log("Home button clicked"); // Added this line for debugging
    window.location.href = "index.html";
});
function showScoreFeedback(score) {
    let feedbackMessage = "";

    if (score === questions.length) {
        feedbackMessage = "Excellent! You got all questions correct!";
    } else if (score >= Math.round(0.7 * questions.length)) {
        feedbackMessage = "Good job! You did well!";
    } else {
        feedbackMessage = "Needs improvement. Keep practicing!";
    }


    // Clear the timer text and answer buttons
    timerElement.textContent = "";
    answerButtons.innerHTML = "";
}


function handleNextButton() {
currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScoreFeedback(score);
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
