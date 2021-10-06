var timer = document.getElementById("timer");
var scoreCard = document.getElementById("scorecard");
var startButton = document.getElementById('start-btn');
var QuestionContainer = document.getElementById('question-container');
var questionElement = document.getElementById("question");
var doneContainer = document.getElementById('done-container');
var initialsId = document.getElementById("initials");
var highscoreContainer = document.getElementById('highscore-container');
var finalScore = document.getElementById('final-score');
var correctIncorrect = document.getElementById("correctIncorrect");
var answerButtonsElement = document.getElementById("answer-btn");
var backButton = document.getElementById("back-btn");
var highscoreButton = document.getElementById("hs-btn");
var highList = document.getElementById("highlist");


//Variables 
var counter = 60;
var scorecounter = 0;
var gameover = 0;
var currentQuestionIndex = 0;
var questionLength = 0;
var myTime;


//Questions
var questions = [
    {
        title: "What is a method?",
        choices: ["A funciton within a function", "A Cascading Style Sheet", "HTML","A Flex Box"],
        answer: "A funciton within a function" 
    },
    {
        title: "What does CSS stand for?",
        choices: ["Cascading Standard System", "Cascading Structure Set", "Cascading Style Sheets","Clear Symbol System"],
        answer: "Cascading Style Sheets" 
    },
    {
        title: "What is a scope?",
        choices: ["A bug", "A feature in HTML", "Defines where a certain variable is accessible.","Clears a function"],
        answer: "Defines where a certain variable is accessible." 
    },
    {
        title: "What is an SSH key?",
        choices: ["A Source Shell key", "A Secure Shell Key", "A Super Shell Key","A Super Saiyan Key"],
        answer: "A Secure Shell Key" 
    },
    {
        title: "What container expands or shrink items to fill available free space?",
        choices: ["A Grow Box", "A Check Box", "A Flex Box","CSS"],
        answer: "A Flex Box" 
    },
] 

// Event listeners
startButton.addEventListener('click', startGame);
backButton.addEventListener('click', restartGame);
highscoreButton.addEventListener('click', viewhighscore);





///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////// FUNCTIONS ///////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


function startGame() {
    gameover = 0;
    counter = 60;
    scorecounter = 0;
    currentQuestionIndex = 0;
    myTime = setInterval(timeIt, 1000);
    timer.textContent = counter;
    scoreCard.textContent = scorecounter;
    startButton.setAttribute("class", "hidden");;
    QuestionContainer.removeAttribute("class", "hidden");;
    setNextQuestion();
}

function restartGame(){
    startButton.removeAttribute("class", "hidden");
    QuestionContainer.setAttribute("class", "hidden");;
    doneContainer.setAttribute("class", "hidden");;
    highscoreContainer.setAttribute("class", "hidden");;


}

function timeIt() {


    if (counter > 0) {
    counter--;
    timer.textContent = counter;
    }
    else {
      clearInterval(myTime);
      timeOver();
      
    }
    

}

function setNextQuestion() {

    questionLength = questions.length;
    
    if(currentQuestionIndex == questionLength)
    {
        finishedQuiz();
    }

    answerButtonsElement.innerHTML = "";
    var currentQuestions = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestions.title;
    

    currentQuestions.choices.forEach(function (choice, i)
    {
        var choiceBtn = document.createElement("button");      
        choiceBtn.setAttribute("class","btn");
        choiceBtn.setAttribute("class","btn-dark");
        choiceBtn.setAttribute("value", choice)
        choiceBtn.textContent = choice;
        answerButtonsElement.appendChild(choiceBtn);  
        choiceBtn.onclick = clickAnswer
    })
    
function clickAnswer() {

    var someAnswer = questions[currentQuestionIndex].answer
    
 
    if (this.textContent === someAnswer){

        correctIncorrect.textContent = "Correct!";

        currentQuestionIndex++;
        scorecounter = scorecounter + 20;
        scoreCard.textContent = scorecounter;
        setNextQuestion();
    }
    
    else {

        correctIncorrect.textContent = "Incorrect!";

        currentQuestionIndex++;
        counter = counter - 10;
        setNextQuestion();
    }

}

}

 function timeOver() {
     clearInterval(counter);
     QuestionContainer.setAttribute("class","hidden")
     alert("You ran out of time. Please try again!")
     finishedQuiz();

}

function finishedQuiz(){
    
    if (counter > 0){
    alert("You reached the end!")
    }
    QuestionContainer.setAttribute("class","hidden");
    doneContainer.removeAttribute("class","hidden");
    var score = scorecounter;
    clearInterval(myTime);
    showFinalScore(score);
    
}

function showFinalScore(score){

    var finalScore = document.getElementById("final-score");
    var submit = document.getElementById("submit-btn");

    
    finalScore.textContent = "Your final score is:" + scorecounter;

    finalScore.removeAttribute("class","hidden");
    submit.addEventListener('click', highscore);
    

}

function highscore() {

    var initialsLog = initialsId.value.trim();
    
    
    if (initialsLog != "") {

        finalScore.setAttribute("class", "hidden");
        doneContainer.setAttribute("class","hidden");
        highscoreContainer.removeAttribute("class", "hidden");
        highscoreButton.removeAttribute("class", "hidden");

        

        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        

        var Score = {
            scoreF: scorecounter,
            initials: initialsLog
        };


        highscores.push(Score);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        var li = document.createElement("li");
        li.textContent = Score.initials + " - " + Score.scoreF;
        var highList = document.getElementById("highlist");
        highList.appendChild(li);
        

    }

}

function viewhighscore() {

    var initialsLog = initialsId.value.trim();
    clearInterval(myTime);
    
    if (initialsLog != "") {

        finalScore.setAttribute("class", "hidden");
        doneContainer.setAttribute("class","hidden");
        highscoreContainer.removeAttribute("class", "hidden");
        startButton.setAttribute("class", "hidden");
        QuestionContainer.setAttribute("class", "hidden");;


        var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
        

        var Score = {
            scoreF: scorecounter,
            initials: initialsLog
        };


        highscores.push(Score);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));

        var li = document.createElement("li");
        li.textContent = Score.initials + " - " + Score.scoreF;
        var highList = document.getElementById("highlist");
        

    }

}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////