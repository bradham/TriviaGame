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
var time = 31;


$("#startBtn").on("click", function () {
    $("#startBtn").hide();
    var timerPtag = $("<p>");
    timerPtag.text("Time remaining: ");
    //timerPtag.attr(id, "time-remaining");
    $("#questions").prepend(timerPtag);

    startClock();

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

    // DONE: decrease time by 1, remember we cant use "this" here.
    time--;
    console.log("time-- in count() " + time);
  
    // DONE: Get the current time, pass that into the timeConverter function,
    //       and save the result in a variable.
    var converted = timeConverter(time);
    console.log(converted);
  
    // DONE: Use the variable we just created to show the converted time in the "display" div.
    ///////////////////////////////////
    $("#time-remaining").append(converted);
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
  
    return minutes + ":" + seconds;
  }
  
  