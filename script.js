const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyper Tool Multi Language",
            "Hyper Transfer Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which CSS property is used to change text color?",
        options: [
            "font-style",
            "background-color",
            "color",
            "text-align"
        ],
        correct: 2
    },
    {
        question: "Which JavaScript keyword is used to declare a constant?",
        options: [
            "const",
            "var",
            "let",
            "static"
        ],
        correct: 0
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: [
            "<!-- -->",
            "/* */",
            "#",
            "//"
        ],
        correct: 3
    },
    {
        question: "Which HTML tag is used to insert a line break?",
        options: [
            "<br>",
            "<break>",
            "<;break&gt;>",
            "<hr>"
        ],
        correct: 0
    }
];

let currentIndex = 0;
let score = 0;
let selectedAnswer = null;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const startBtn = document.getElementById("start-btn");

const questionText = document.getElementById("question-text");
const optionButtons = document.querySelectorAll(".option-btn");
const nextBtn = document.getElementById("next-btn");
const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    loadQuestion();
});

function loadQuestion() {
    const q = quizData[currentIndex];
    questionText.textContent = q.question;
    progressText.textContent = `Question ${currentIndex + 1} of ${quizData.length}`;
    progressFill.style.width = ((currentIndex + 1) / quizData.length) * 100 + "%";

    selectedAnswer = null;
    nextBtn.disabled = true;

    optionButtons.forEach((btn, index) => {
        btn.textContent = q.options[index];
        btn.classList.remove("selected");
        btn.onclick = () => selectOption(btn, index);
    });
}

function selectOption(button, index) {
    optionButtons.forEach(btn => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedAnswer = index;
    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
    if (selectedAnswer === quizData[currentIndex].correct) {
        score++;
    }
    currentIndex++;

    if (currentIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    let message =
        score === quizData.length ? "Excellent 🌟" :
        score >= 3 ? "Great Job 👍" :
        score >= 2 ? "Good Effort 🙂" :
        "Keep Practicing 💪";

    document.querySelector(".quiz-container").innerHTML = `
        <h1>Quiz Completed</h1>
        <h2>Your Score: ${score}/${quizData.length}</h2>
        <p>${message}</p>
    `;
}


