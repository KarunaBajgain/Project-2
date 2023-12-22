const homeButton = document.getElementById("home-btn");
homeButton.addEventListener("click", () => {
    console.log("Home button clicked"); 
    window.location.href = "index.html"; 
});


const pythonQuestions = [
    {
        question: "What is the primary purpose of the 'if' statement in Python?",
        answers: [
            { text: "To define a function", correct: false },
            { text: "To loop through a sequence of items", correct: false },
            { text: "To conditionally execute a block of code", correct: true },
        ]
    },
    {
        question: "Which data type is used to store a sequence of characters in Python?",
        answers: [
            { text: "Integer", correct: false },
            { text: "String", correct: true },
            { text: "Float", correct: false },
        ]
    },
    {
        question: "In Python, how do you comment a single line of code?",
        answers: [
            { text: "# Comment", correct: true },
            { text: "// Comment", correct: false },
            { text: "/* Comment */", correct: false },
        ]
    },
    {
        question: "What is the purpose of the 'elif' keyword in Python?",
        answers: [
            { text: "To define a new function", correct: false },
            { text: "To handle exceptions", correct: false },
            { text: "To add another condition in an 'if-else' statement", correct: true },
        ]
    },
    {
        question: "Which built-in function is used to find the length of a list in Python?",
        answers: [
            { text: "size()", correct: false },
            { text: "count()", correct: false },
            { text: "len()", correct: true },
        ]
    },
    {
        question: "What is the purpose of the 'for' loop in Python?",
        answers: [
            { text: "To conditionally execute a block of code", correct: false },
            { text: "To iterate over a sequence of items", correct: true },
            { text: "To define a function", correct: false },
        ]
    },
    {
        question: "In Python, what is the correct way to open a file named 'example.txt' in read mode?",
        answers: [
            { text: "file = open('example.txt', 'r')", correct: true },
            { text: "file = read('example.txt')", correct: false },
            { text: "file = open('example.txt', 'read')", correct: false },
        ]
    },
    {
        question: "What is the purpose of the 'return' statement in a Python function?",
        answers: [
            { text: "To print a value to the console", correct: false },
            { text: "To exit the function and return a value", correct: true },
            { text: "To define a new variable", correct: false },
        ]
    },
    {
        question: "Which data type is mutable in Python?",
        answers: [
            { text: "String", correct: false },
            { text: "Tuple", correct: false },
            { text: "List", correct: true },
        ]
    },
    {
        question: "In Python, how do you import a module named 'math'?",
        answers: [
            { text: "import math", correct: true },
            { text: "use math", correct: false },
            { text: "include math", correct: false },
        ]
    },
    {
        question: "What is the correct syntax to create an empty dictionary in Python?",
        answers: [
            { text: "{}", correct: true },
            { text: "[]", correct: false },
            { text: "()", correct: false },
        ]
    },
    {
        question: "Which statement is used to exit a loop prematurely in Python?",
        answers: [
            { text: "break", correct: true },
            { text: "continue", correct: false },
            { text: "return", correct: false },
        ]
    },
    {
        question: "What does the 'sys.argv' list contain in Python?",
        answers: [
            { text: "Command-line arguments", correct: true },
            { text: "Standard input/output streams", correct: false },
            { text: "System variables", correct: false },
        ]
    },
    {
        question: "Which method is used to remove the last element from a list in Python?",
        answers: [
            { text: "pop()", correct: true },
            { text: "remove()", correct: false },
            { text: "delete()", correct: false },
        ]
    },
    {
        question: "In Python, how do you convert a string to uppercase?",
        answers: [
            { text: "toUpperCase()", correct: false },
            { text: "upper()", correct: true },
            { text: "caseUpper()", correct: false },
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

shuffleArray(pythonQuestions);

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

const questionTimeLimit = 10;

function showQuestion() {
    resetState();
    let currentQuestion = pythonQuestions[currentQuestionIndex];
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

    if (score === pythonQuestions.length) {
        feedbackMessage = "Excellent! You got all questions correct!";
    } else if (score >= Math.round(0.7 * pythonQuestions.length)) {
        feedbackMessage = "Good job! You did well!";
    } else {
        feedbackMessage = "Needs improvement. Keep practicing!";
    }

    questionElement.innerHTML = `You scored ${score} out of ${pythonQuestions.length}. ${feedbackMessage}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    
    // Clear the timer text and answer buttons
    timerElement.textContent = "";
    answerButtons.innerHTML = "";

    
    // Display the summary in the summary-list
    const summaryHTML = pythonQuestions.map((question, index) => {
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
    return pythonQuestions[index].answers.find((answer) => answer.correct).text;
  }




function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < pythonQuestions.length) {
        showQuestion();
    } else {
        showScoreFeedback(score);
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < pythonQuestions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz(); 

