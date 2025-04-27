const questions = [
    {
        question: "Which country's flag is not quadrangle?",
        answers: [
            {text: "Bhutan", correct: false},
            {text: "Pakistan", correct: false},
            {text: "Zimbabwe", correct: false},
            {text: "Nepal", correct: true},
        ]
    },
    {
        question: "Which country has the largest surface area?",
        answers: [
            {text: "China", correct: false},
            {text: "Canada", correct: false},
            {text: "Russia", correct: true},
            {text: "India", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Antarctica", correct: true},
            {text: "Sahara", correct: false},
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
        ]
    },
    {
        question: "Which color is not on the Seychelles flag?",
        answers: [
            {text: "Blue", correct: false},
            {text: "Red", correct: false},
            {text: "Green", correct: false},
            {text: "Black", correct: true},
        ]
    }
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Sonraki";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `${questions.length} sorudan ${score} tanesini doğru yanıtladınız!`;
    nextButton.innerHTML = "Tekrar Oyna";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
})

startQuiz();
