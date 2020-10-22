var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var buttonColours = ["green", "red", "yellow", "blue"];
var started = false;

$(document).on("keypress", function() {
  if (started == false) {

    nextSequence();
    started = true;
  }
});
$("h1").on("click", function() {
  if (started == false) {

    nextSequence();
    started = true;
  }
});

function nextSequence() {
  userClickedPattern = [];
  level += 1;
$("h1").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

};
$(".btn").click(function(event) {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);


});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(nextSequence(), 1000);

    }

  }
   else {
     startOver();
    $("h1").text("Game Over, Press Any Key or Click here to Restart");

    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);


  }

}


function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
