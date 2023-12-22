const homeButton = document.getElementById("home-btn");
homeButton.addEventListener("click", () => {
    console.log("Home button clicked"); 
    window.location.href = "index.html"; 
});


const linuxCommandQuestions = [
    {
        question: "What command is used to list files and directories in a Linux terminal?",
        answers: [
            { text: "dir", correct: false },
            { text: "ls", correct: true },
            { text: "list", correct: false },
        ]
    },
    {
        question: "Which command is used to create a new directory in Linux?",
        answers: [
            { text: "create", correct: false },
            { text: "mkdir", correct: true },
            { text: "newdir", correct: false },
        ]
    },
    {
        question: "What command is used to display the manual page for a Linux command?",
        answers: [
            { text: "help", correct: false },
            { text: "man", correct: true },
            { text: "info", correct: false },
        ]
    },
    {
        question: "Which command is used to change the current working directory in Linux?",
        answers: [
            { text: "chdir", correct: false },
            { text: "cwd", correct: false },
            { text: "cd", correct: true },
        ]
    },
    {
        question: "What is the command to copy files or directories in Linux?",
        answers: [
            { text: "move", correct: false },
            { text: "cp", correct: true },
            { text: "copy", correct: false },
        ]
    },
    {
        question: "Which command is used to remove files or directories in Linux?",
        answers: [
            { text: "delete", correct: false },
            { text: "rm", correct: true },
            { text: "erase", correct: false },
        ]
    },
    {
        question: "What command is used to search for a specific text in files in Linux?",
        answers: [
            { text: "findtext", correct: false },
            { text: "grep", correct: true },
            { text: "searchtext", correct: false },
        ]
    },
    {
        question: "Which command is used to display the contents of a file in the terminal?",
        answers: [
            { text: "cat", correct: true },
            { text: "display", correct: false },
            { text: "show", correct: false },
        ]
    },
    {
        question: "What is the command to rename files or directories in Linux?",
        answers: [
            { text: "rename", correct: false },
            { text: "mv", correct: true },
            { text: "ren", correct: false },
        ]
    },
    {
        question: "Which command is used to display the current date and time in Linux?",
        answers: [
            { text: "clock", correct: false },
            { text: "time", correct: false },
            { text: "date", correct: true },
        ]
    },
    {
        question: "What command is used to create a new empty file in Linux?",
        answers: [
            { text: "touch", correct: true },
            { text: "createfile", correct: false },
            { text: "newfile", correct: false },
        ]
    },
    {
        question: "Which command is used to compress and decompress files in Linux?",
        answers: [
            { text: "compress", correct: false },
            { text: "zip", correct: true },
            { text: "pack", correct: false },
        ]
    },
    {
        question: "What is the command to view the system's hostname in Linux?",
        answers: [
            { text: "host", correct: false },
            { text: "machine", correct: false },
            { text: "hostname", correct: true },
        ]
    },
    {
        question: "Which command is used to display running processes in Linux?",
        answers: [
            { text: "listprocesses", correct: false },
            { text: "ps", correct: true },
            { text: "showprocesses", correct: false },
        ]
    },
    {
        question: "What command is used to change user passwords in Linux?",
        answers: [
            { text: "changepassword", correct: false },
            { text: "passwd", correct: true },
            { text: "setpassword", correct: false },
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
