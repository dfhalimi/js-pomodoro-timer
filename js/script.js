var breakLength = document.getElementById("break-length");
var breakTime = 5;
var sessionLength = document.getElementById("session-length");
var sessionTime = 25;
var timer = document.getElementById("timer");
var seconds = 0;
var minutes = "sminutes";
var sminutes = sessionTime;
var bminutes = breakTime;
var interval;
var audio = new Audio("sound-files/alarm-sound.mp3");


function decBreak() {
    if(breakTime > 1) {
        breakTime--;
        bminutes = breakTime;
        breakLength.innerHTML = breakTime;
    }
}

function incBreak() {
    if(breakTime < 60) {
        breakTime++;
        bminutes = breakTime;
        breakLength.innerHTML = breakTime;
    }
}

function decSession() {
    if(sessionTime > 1) {
        sessionTime--;
        sminutes = sessionTime;
        sessionLength.innerHTML = sessionTime;
        timer.innerHTML = sessionTime + ":00";
    }
}

function incSession() {
    if(sessionTime < 60) {
        sessionTime++;
        sminutes = sessionTime;
        sessionLength.innerHTML = sessionTime;
        timer.innerHTML = sessionTime + ":00";
    }
}

function timerTransition() {
    if(minutes == "sminutes") {
        startTimer();
    }
    else {
        startBreak();
    }
}

function startTimer() {
    interval = setInterval(function() {
        seconds--;
        if(seconds < 0) {
            seconds = 59;
            sminutes--;
            timer.innerHTML = sminutes + ":" + seconds;
        }
        else if(sminutes == 0 && seconds == 0) {
            timer.innerHTML = sminutes + ":0" + seconds;
            clearInterval(interval);
            audio.play();
            startBreak();
        }
        else if(seconds < 10) {
            timer.innerHTML = sminutes + ":0" + seconds;
        }
        else {
            timer.innerHTML = sminutes + ":" + seconds;
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(interval);
}

function restartTimer() {
    clearInterval(interval);
    minutes = "sminutes";
    sminutes = 25;
    sessionTime = 25;
    bminutes = 5;
    breakTime = 5;
    seconds = 0;
    timer.innerHTML = sminutes + ":0" + seconds;
    breakLength.innerHTML = breakTime;
    sessionLength.innerHTML = sessionTime;
}

function startBreak() {
    interval = setInterval(function() {
        minutes = "bminutes";
        seconds--;
        if(seconds < 0) {
            seconds = 59;
            bminutes--;
            timer.innerHTML = bminutes + ":" + seconds;
        }
        else if(bminutes == 0 && seconds == 0) {
            timer.innerHTML = bminutes + ":0" + seconds;
            clearInterval(interval);
            restartTimer();
        }
        else if(seconds < 10) {
            timer.innerHTML = bminutes + ":0" + seconds;
        }
        else {
            timer.innerHTML = bminutes + ":" + seconds;
        }
    }, 1000)
}