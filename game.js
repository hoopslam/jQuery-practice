var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var starter = false;
var level = 0;

//Starter function.  Starts on any mouseclick on document
$(document).click(function() {
  if (!starter) {      // If game hasn't started, do the following
    $("#level-title").text("Level " + level);  // Change h1 to display what level
    nextSequence();
    starter = true;
  }
});

// function to generate random color sequence
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);   // random number from 0-3;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); // jquery to select random color element in html and flash it
  playSound(randomChosenColor);
  level++;
  $("#level-title").text("Level " + level);
}

// jquery event listener for when user selects a color
$(".btn").click(function() {  // jquery button push event
  var userChosenColor = $(this).attr("id");  // identify which color was pushed

  animatePress(userChosenColor);  // call function to animate button press
  playSound(userChosenColor);  // play the sound of the pushed button
  userClickedPattern.push(userChosenColor);  // store pushed button

  checkAnswer(userClickedPattern.length-1);
});

// Check user's answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
      $("#level-title").text("Game Over, Press Any Key to Restart");
  }
}

function startOver () {
  level = 0;
  gamePattern = [];
  starter = false;
}

// Sound player
function playSound (name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate button pressed to indicate that button was pressed
function animatePress (currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
