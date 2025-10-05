// INITIALIZATION
// 1. Define the array of question objects.
// 2. Select all the necessary HTML elements (question text, answer buttons, next button).
// 3. Define the state variables: `currentQuestionIndex` and `score`.

// CORE FUNCTIONS
// 4. Create a `startQuiz()` function.
//    a. Reset `currentQuestionIndex` to 0.
//    b. Reset `score` to 0.
//    c. Set the "Next" button's text to "Next".
//    d. Call the `showQuestion()` function to display the first question.

// 5. Create a `showQuestion()` function.
//    a. First, reset the state from the previous question (clear old answer buttons).
//    b. Get the current question object from the `questions` array using `currentQuestionIndex`.
//    c. Update the HTML question text with the `question` property from the object.
//    d. Loop through the `answers` array of the current question object.
//    e. For each answer object, create a new `<button>`.
//    f. Set the button's text to the `text` property.
//    g. If the answer's `correct` property is true, add a special data attribute to the button (e.g., `dataset.correct = "true"`).
//    h. Add a 'click' event listener to each new button, which calls the `selectAnswer()` function.
//    i. Append the new button to the answers container in the HTML.

// 6. Create a `selectAnswer(event)` function.
//    a. Get the button that was clicked from the `event`.
//    b. Check if the clicked button has the `dataset.correct` attribute.
//    c. If it's correct, increment the `score` and add a "correct" CSS class to the button.
//    d. If it's incorrect, add an "incorrect" CSS class.
//    e. **Crucially:** Disable all answer buttons so the user can't click again.
//    f. Display the "Next" button.

// 7. Create a `showScore()` function.
//    a. Clear out the question and answer elements.
//    b. Display the final score text (e.g., "You scored X out of Y!").
//    c. Change the "Next" button's text to "Play Again".

// EVENT LISTENERS
// 8. Add a 'click' event listener to the "Next" button.
//    a. Increment `currentQuestionIndex`.
//    b. Check if there are more questions left in the array.
//    c. If yes, call `showQuestion()`.
//    d. If no, call `showScore()`.

// 9. When the user clicks the "Play Again" button, it should call `startQuiz()`.


const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false },
            { text: "Blue whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Giraffe", correct: false },
        ]
    },
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false },
        ]
    },
    // Add more questions here...
];


const questionElement = document.querySelector("#question");
const answerButtons = document.querySelector("#answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;



const selectAnswer = (event) => {
    const clickedBtn = event.target;
    if(clickedBtn.dataset.correct === "true"){
        score++;
        clickedBtn.classList.add("correct");
    }
    else{
        clickedBtn.classList.add("incorrect");
    }

    // Show correct answer and disable all buttons
    Array.from(answerButtons.children).forEach((button)=>{
        if(button.dataset.correct === 'true'){
            button.classList.add("correct");
        }
        button.disabled = true;

        nextButton.style.display = 'block';
    })
}


const showQuestion = () => {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach((curElem,index)=>{
        const button = document.createElement('button');
        button.textContent = curElem.text;
        button.classList.add("btn");

        if(curElem.correct){
            button.dataset.correct = curElem.correct;
        }

        button.addEventListener("click",selectAnswer);

        answerButtons.appendChild(button);
    })

}

const showScore = () => {
    resetState();

    questionElement.innerHTML = `You scored ${score} out of ${questions.length} questions`;
}



const startQuiz = () => {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";

    showQuestion();

}


nextButton.addEventListener("click",()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
})


function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

startQuiz();