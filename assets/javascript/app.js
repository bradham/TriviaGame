/* Set timer
    On button click 
     show questions
     start timer
     Radio buttons on input capture answers
      only one answer
     Click Done button to also stop timer and show final page
    when timer ends 
     change page to hide questions
     show final page
     count correct answers
     incorrect answers
     unanswered questions
     */
//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

// prevents the clock from being sped up unnecessarily
var clockRunning = false;
var time = 500;

var correctAnswers = 0;
var wrongAnswers = 5;
var unanswered = 5;

var questions = [
    {
        question: "Q1?",
        answer: "Answ1",
        wrong: ["wrong1.1", "wrong1.2", "wrong1.3", "Answ1"],
        isAnswered:false
    },
    {
        question: "Q2?",
        answer: "Answr2",
        wrong: ["wrong2.1", "Answr2", "wrong2.2", "wrong2.3"],
        isAnswered:false
    },
    {
        question: "Q3?",
        answer: "Answr3",
        wrong: ["Answr3", "wrong3.1", "wrong3.2", "wrong3.3"],
        isAnswered:false
    },
    {
        question: "Q4?",
        answer: "Answr4",
        wrong: ["Answr4", "wrong4.1", "wrong4.2", "wrong4.3"],
        isAnswered:false
    },
    {
        question: "Q5?",
        answer: "Answr5",
        wrong: ["wrong5.1", "wrong5.2", "Answr5", "wrong5.3"],
        isAnswered:false
    }

]


$("#startBtn").on("click", function () {
    $("#startBtn").hide();

    showQuestions();

    //originally called start clock but changed to showQuestions
    //startClock();

    //add a done button. hover with border?


});

function startClock() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(count, 1000);
        clockRunning = true;
    }
}

function count() {

    // Decrease time by 1 because we're counting down.
    time--;
    //console.log("time-- in count() " + time);

    if (time < 0) {
        //call finalPage() after clock has shown 0 and don't show -:01.
        finalPage();
    }

    // Get the current time, pass that into the timeConverter function,
    //       and save the result in a variable.
    var converted = timeConverter(time);
    //console.log(converted);

    //Rewrite time remaining for every second. time variable was converted variable
    $("#time-remaining").text("Time remaining: " + time + " Seconds");


    // DONE: Use the variable we just created to show the converted time in the "display" div.
    //$("#time-remaining").append(converted);
}

function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return seconds;
    //if minutes are used add
    //minutes + ":" +
}

function showQuestions() {
    $("#time-remaining").text("Time remaining: " + time + " Seconds");

    //add questioins to the form
    //NEED: refactor the questions by breaking up into jQuery chunks
    for (var i = 0; i < questions.length; i++) {

        var form = $("<form>");
        form.attr("id", "question-form");
        $("#questions").append(form);
        $("#question-form").append("<p id='q" + i + "1'>" + questions[i].question + "</p>");
        //$("#question-form").append("<input type='radio' name='radio-answer" + i + "' onclick='compareAnswer(this.value, " + i + ")' value=" + questions[i].answer + ">" + questions[i].answer);
        
        //loop to show answers in "wrong" array (needs rafactoring to "answers" array). j+i is set to create a unique identifier for each radio button.
        for (var j = 0; j < questions[i].wrong.length; j++) {
            $("#question-form").append("<input type='radio' name='radio-answer" + (j+i) + "' onclick='compareAnswer(this.value, " + i + ")' value=" + questions[i].wrong[j] + ">" + questions[i].wrong[j]);
        };
    }


    startClock();

    $("#questions").append("<button id='doneBtn'> Done! </button>");
    $("#doneBtn").on("click", function () {
        finalPage();

    });

}

function finalPage() {

    //stop clock so it doesn't keep running in background
    clearInterval(intervalId);
    clockRunning = false;

    $("#questions").hide();
    $("#done-message").text("All done!");
    $("#correct").text("Correct answers: " + correctAnswers);
    $("#wrong").text("Wrong answers: " + wrongAnswers);
    $("#unanswered").text("Unanswered: " + unanswered);

}

function compareAnswer(answer, i) {

    //set answered question flag
    if (questions[i].isAnswered === false) {
        unanswered--;
        console.log("unanswered: " + unanswered);
        questions[i].isAnswered = true;

    }

    console.log("compare answer: " + answer);
    console.log("questions[i].answer - " + questions[i].answer);

    //if answer is correct then add to your correct answers total and reduce your wrong answers.
    if (answer === questions[i].answer) {
        correctAnswers++;
        console.log("correct: " + correctAnswers);
        wrongAnswers--;
        console.log("wrongAnswers: " + wrongAnswers);
    }
}


