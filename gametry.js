var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(document).keydown(function (){
  if(level === 0){
    nextSequence();
  }
})

function nextSequence(){
  level++;
  $("#level-title").text("Level "+ level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  userClickedPattern = [];
  // animatePress(randomChosenColour);
}

$(".btn").click(function (event){
  var userChosenColour = $(this).attr("id"); // or this.id
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  userClickedPattern = [];
});


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  setTimeout(function(){
  $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
  console.log("succes");
  if(userClickedPattern.length === gamePattern.length){
  nextSequence();
  }
}
else{
  console.log("wrong");
  endGame();
}
}

function endGame(){
  console.log("end");
  gamePattern = [];
  level = 0;
  setTimeout(nextSequence,1000);
}
