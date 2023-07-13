var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").on("click", function () {
  var userChosenColor = $(this).attr("id"); // "this" gives us access to the current button on which we clicked
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
  $("h1").text("Level " + level);
  level++;
}

function playSound(name) {
  switch (name) {
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();

      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();

      break;
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();

      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();

      break;

    default:
      console.log("Wrong Command");
      break;
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).on("keypress", function () {
  nextSequence();
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press any to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
