let buttonColors = ["red", "blue", "green", "yellow"];

let randomChosenColor = buttonColors[nextSequence()];

let gamePattern = [randomChosenColor];

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    return randomNumber;
}