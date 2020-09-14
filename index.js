const buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let level = 0;

let started = true;

$(document).on("keypress", function () {
  if (started) {
    $("#level-title").text("level " + level);

    nextSequence();

    started = false;
  }
});
$(".btn").click(function () {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log(currentLevel - 1);
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over. Press any key to restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = true;
}

function nextSequence() {
  userClickedPattern = [];

  level++;
  $("#level-title").text("level " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}

let x = document.querySelector(".btn-transit");
document.querySelector("button").addEventListener("click", function () {
  if (x.style.display !== "none") {
    document.querySelector("#class-change").style.display = "none";
    this.classList.remove("btn-trans");
    x.classList.remove("play__method");
  } else {
    this.classList.add("btn-trans");
    x.classList.add("play__method");
    document.querySelector("#class-change").style.display = "block";
  }
});
