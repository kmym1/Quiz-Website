const questions = [
    {
        question: "Karbon döngüsünde CO2 bileşiğini azaltan-arttıran hareketlerden hangisi yanlış eşleştirilmiştir?",
        answers: [
            {text: "Fotosentez-Azaltır", correct: false},
            {text: "Yanma tepkimeleri-Arttırır", correct: false},
            {text: "Saprotrof canlılar-Azaltır", correct: true},
            {text: "Hücresel solunum-Arttırır", correct: false},
        ]
    },
    {
        question: "Aşağıdaki ifadelerden hangileri doğrudur? I. Enerji akışı sırasında her trofik düzeyde %90’a yakın bir kayıp gerçekleşir. II. Maddeler (karbon, azot vs.) besin zincirinde bir kez dolaşıp kaybolur. III. Üçüncül tüketiciler sayıca az olmalıdır çünkü destekleyecek enerji miktarı çok sınırlıdır. IV. Enerji, ekosistemde üreticiden başlayarak tek yönlü bir akış gösterir.",
        answers: [
            {text: "I, III ve IV", correct: true},
            {text: "I, II, III ve IV", correct: false},
            {text: "II ve III", correct: false},
            {text: "I ve IV", correct: false},
        ]
    },
    {
        question: "Bitkilerin yapraklarından atmosfere su buharı salması olayına ne ad verilir?",
        answers: [
            {text: "Su döngüsü", correct: false},
            {text: "Nitrifikasyon", correct: false},
            {text: "Fotosentez", correct: false},
            {text: "Tranpirasyon", correct: true},
        ]
    },
    {
        question: "Biyolojik birikim sonucu bir zararlı maddenin en fazla biriktiği canlılar, genellikle hangi trofik düzeyde bulunur?",
        answers: [
            {text: "Üreticiler (Bitkiler)", correct: false},
            {text: "Birincil tüketiciler (Otoburlar)", correct: false},
            {text: "İkincil tüketiciler (Etçil küçük hayvanlar)", correct: false},
            {text: "Üçüncül tüketiciler (Zincirin en üstündeki etoburlar)", correct: true},
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
