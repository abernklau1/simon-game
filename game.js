let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickPattern = [];

let started = false;

let level = 0;


function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function() {
        $("#" + gamePattern[i]).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);
        }, (i + 1) * 1000);
    }
    level++;
    $("#level-title").text("Level " + level);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickPattern[currentLevel] === gamePattern[currentLevel]) { 
        if (userClickPattern.length === gamePattern.length) {
            setTimeout(nextSequence(), 1000);
            userClickPattern = [];
        }
    } else {
        $("body").addClass("game-over");
        playSound("wrong");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

$(document).one("keypress", function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickPattern.push(userChosenColor);
    
    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userChosenColor.length - 1)
});
