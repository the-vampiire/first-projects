/**
 * Created by Vampiire on 5/11/17.
 */


// jquery shortcuts
var pauseButton = $('#pause'), resetButton = $('#reset'), timerDisplay = $('#timerDisplay'), breakDisplay = $('#breakDisplay'),
    timerPlus = $('#timerPlus'), timerMinus = $('#timerMinus'), breakPlus = $('#breakPlus'), breakMinus = $('#breakMinus'),
    defaultButton = $('#default'), ding = $('#ding'), workDiv = $('#work'), breakDiv = $('#break'), workTitle = $('#workTitle'),
    breakTitle = $('#breakTitle');

// additional variables
var timeRemaining, minutes, seconds, counter = 0, ID, on = false, work = false;

// time in minutes
var min = 25, breakTime = 5;

function decrease(time){
    return time -= 1;
}

function increase(time){
    return time += 1;
}

timerPlus.click(function(){
    min = increase(min);
    timeRemaining = min*60;
    resetTimers();
});

timerMinus.click(function(){
    if(min > 1){
        min = decrease(min);
        timeRemaining = min*60;
        resetTimers();
    }
});

breakPlus.click(function(){
    if(breakTime < Math.floor(min/2)){
        breakTime = increase(breakTime);
        breakDisplay.html(displayTime(breakTime*60));
    }


});

breakMinus.click(function(){
    if(breakTime > 1){
        breakTime = decrease(breakTime);
        breakDisplay.html(displayTime(breakTime*60));
    }

});


$(function(){
    resetTimers();
});

function startTimer(){
    ID = setInterval(countDown, 1000);
}

function timer(time){
    minutes = Math.floor(time/60);
    seconds = time%60;

    // Correct for always displaying two digits in seconds place
    if(seconds < 10) {
        seconds = '0' + seconds;
    }

    // stops timer if seconds = 0 (convert to Number first)
    if(Number(minutes) === 0 && Number(seconds) === 0){
        clearInterval(ID);

        // checks if it is time for work or break, alternates on each session as time reaches 0
        if(work){
            buzzer();
            work = false;
            breakDiv.removeClass('glow');
            breakTitle.removeClass('decoration');
            workDiv.addClass('glow');
            workTitle.addClass('decoration');
            timeRemaining = min*60;
            counter = 0;
            startTimer();
        }else{
            buzzer();
            work = true;
            workDiv.removeClass('glow');
            workTitle.removeClass('decoration');
            breakDiv.addClass('glow');
            breakTitle.addClass('decoration');
            timeRemaining = breakTime*60;
            counter = 0;
            startTimer();
        }

    }

    return minutes + ':' + seconds;
}

function countDown(){
    counter++;

    // reset the breakDisplay and begin counting down the timerDisplay
    // opposite on break time

    if(!work){
        breakDisplay.html(displayTime(breakTime*60));
        timerDisplay.html(timer(timeRemaining - counter));
    }
    else{
        timerDisplay.html(displayTime(min*60));
        breakDisplay.html(timer(timeRemaining - counter));
    }

}

function buzzer(){
    ding.trigger('play');
}

// start and stop the timer on click
pauseButton.click(startStop);

function startStop(){

    if(!on){
        on = true;
        pauseButton.html('PAUSE');
        pauseButton.css('background-color', 'red');
        startTimer();
    } else{
        on = false;
        pauseButton.html('START');
        pauseButton.css('background-color', 'green');
        clearInterval(ID);
    }
}

function displayTime(time){
        minutes = Math.floor(time/60),
        seconds = time%60;

    if(seconds < 10){
        seconds = '0' + seconds;
    }

    return minutes + ':' + seconds;
}



// reset everything to initial user settings conditions

resetButton.click(resetTimers);

function resetTimers(){
    clearInterval(ID);
    on = false;
    work = false;
    timeRemaining = min*60;
    counter = 0;
    pauseButton.html('START');
    pauseButton.css('background-color', 'green');
    workDiv.addClass('glow');
    workTitle.addClass('decoration');
    timerDisplay.html(displayTime(min*60));
    breakDisplay.html(displayTime(breakTime*60));
}


defaultButton.click(defaultTimers);

function defaultTimers(){
    min = 25;
    breakTime = 5;
    timerDisplay.html(displayTime(min*60));
    breakDisplay.html(displayTime(breakTime*60));
    resetTimers()
}