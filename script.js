const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacfic"],
        answer: "Arctic"
    },
    {
        question: "Which is the best college in the Delhi NCR",
        options: ["Abes", "Akg", "Kiet", "Ims"],
        answer: "Abes"
    },
    {
        question: "Who is the PM Of INDIA",
        options: ["Narendra Modi", "Rahul Gandhi", "Aditya Panchal", "Yash Chotala"],
        answer: "Yash Chotala"
    }
];

let currentQuestionIndex = 0;
let selectedOptions = {};

function displayQuestion() {
    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");

    questionText.innerText = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = "";
    questions[currentQuestionIndex].options.forEach((option, index) => {
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("option-container");
        
        const optionInput = document.createElement("input");
        optionInput.type = "radio";
        optionInput.name = "option";
        optionInput.value = option;
        optionInput.id = `option${index}`;

        if (selectedOptions[currentQuestionIndex] === option) {
            optionInput.checked = true;
        }
        
        const optionLabel = document.createElement("label");
        optionLabel.htmlFor = `option${index}`;
        optionLabel.innerText = option;
        
        optionContainer.appendChild(optionInput);
        optionContainer.appendChild(optionLabel);
        optionsContainer.appendChild(optionContainer);
    });
    
    document.getElementById("prev").disabled = currentQuestionIndex === 0;
    document.getElementById("next").innerText = currentQuestionIndex === questions.length - 1 ? "Submit" : "Next";
}

function nextQuestion() {
    const selectedOption = document.querySelector("input[name='option']:checked");
    if (selectedOption) {
        selectedOptions[currentQuestionIndex] = selectedOption.value;
    }

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        calculateResult();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

function calculateResult() {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
        if (selectedOptions[index] === question.answer) {
            correctAnswers++;
        }
    });
    
    const result = (correctAnswers / questions.length) * 100;
    document.getElementById("result").innerText = `Your score: ${result.toFixed(2)}%`;
}

displayQuestion();