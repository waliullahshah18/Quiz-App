const questions = [
  {
    question: "Which is the largest animal in the world?",
    answer: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the Smallest country in the world?",
    answer: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Shri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest Desert in the world?",
    answer: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Shari", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is the Smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const NextButton = document.getElementById("next-btn");

let cqIndex = 0;
let score = 0;

function startquiz() {
  cqIndex = 0;
  score = 0;
  NextButton.innerHTML = "Next";
  showQuestion();
}
function showQuestion() {
  restState();
  let cquestion = questions[cqIndex];
  let questionNo = cqIndex + 1;
  questionElement.innerHTML = questionNo + ". " + cquestion.question;

  cquestion.answer.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selactAnswer)
  });
}

function restState() {
  NextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selactAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";
    if (isCorrect) {
      selectedbtn.classList.add("correct")
      score ++;
    }else{
      selectedbtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
      if (button.dataset.correct === "true") {
        button.classList.add("correct")
      }
      button.disabled = true;
    });
    NextButton.style.display = "block"
}

function handleNextButton(){
  cqIndex++;
  if (cqIndex < questions.length) {
    showQuestion();
  }else{
    showscore();
  }
}

function showscore(){
  restState();
  questionElement.innerHTML =`You scored ${score} out of ${questions.length}!`
  NextButton.innerHTML = "Play Again"
  NextButton.style.display = "block"
}

NextButton.addEventListener("click", ()=>{
  if (cqIndex < questions.length) {
    handleNextButton()
  }else{
    startquiz();
  }
})


startquiz();
