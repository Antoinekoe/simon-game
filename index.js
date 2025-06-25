// // Lecture du clavier, si "a" appuyé démarre le jeu

// $(document).on("keydown", function (event) {
//   if (event.key === "a") {
//     startGame();
//   }
// });

// // Jeu

// function startGame() {
//   // Création de la variable des sons

//   const tableauSons = [
//     "./sounds/blue.mp3",
//     "./sounds/green.mp3",
//     "./sounds/red.mp3",
//     "./sounds/yellow.mp3",
//     "./sounds/wrong.mp3",
//   ];

//   // Création de la variable des box

//   const box = [".green-box", ".red-box", ".yellow-box", ".blue-box"];

//   // Modification du niveau
//   let niveau = 1;
//   $("h1").text("Niveau " + niveau);

//   let randomNumber = random();
//   animateBox(randomNumber);

//   setupGameListeners();

//   function setupGameListeners() {
//     for (let i = 0; i < 4; i++) {
//       $(box[i]).on("click", function () {
//         const son = new Audio(tableauSons[i]);
//         son.play();
//         $(box[i]).addClass("pressed");
//         setTimeout(function () {
//           $(box[i]).removeClass("pressed");
//         }, 100);
//         if (i === randomNumber) {
//           niveau++;
//           setTimeout(function () {
//             $("h1").text("Niveau " + niveau);
//             randomNumber = random();
//             animateBox(randomNumber);
//           }, 1000);
//         } else {
//           console.log("Mal joué !");
//           erreur();
//         }
//       });
//     }
//   }

//   //   Lecture de case, si click le son correspondant se joue
//   //   function soundClickOnBox() {
//   //     for (let i = 0; i < 4; i++) {
//   //       $(box[i]).on("click", function () {
//   //         const son = new Audio(tableauSons[i]);
//   //         son.play();
//   //       });
//   //     }
//   //   }

//   // Lecture de clase, si click une animation se fait
//   //   function animationClickOnBox() {
//   //     for (let i = 0; i < 4; i++) {
//   //       $(box[i]).on("click", function () {
//   //         $(box[i]).addClass("pressed");
//   //         setTimeout(function () {
//   //           $(box[i]).removeClass("pressed");
//   //         }, 100);
//   //       });
//   //     }
//   //   }

//   // Génère un nombre aléatoire entre 0 et 3
//   function random() {
//     let nombreAleatoire = Math.floor(Math.random() * 4);
//     return nombreAleatoire;
//   }

//   // Anime la case

//   function animateBox(nombre) {
//     for (let i = 0; i < 3; i++) {
//       $(box[nombre]).addClass("pressed");
//       setTimeout(function () {
//         $(box[nombre]).removeClass("pressed");
//       }, 100);
//     }
//     return box[nombre];
//   }

//   // Erreur - Fais un son, une animation, change le background et le H1
//   function erreur() {
//     const son = new Audio(tableauSons[4]);
//     $("body").css("background-color", "red");
//     setTimeout(function () {
//       $("body").css("background-color", "#011f3f");
//     }, 100);
//     $("h1").text(
//       "Dommage ! Appuie sur n'importe quelle touche pour recommencer."
//     );
//     son.play();
//   }
// }

// Création des listes de couleurs

let buttonColors = ["red-box", "blue-box", "green-box", "yellow-box"];

let gamePattern = [];

let userClickedPattern = [];

let gameStarted = false;

let level = 0;

// Si appui sur a, jeu démarre

$(document).on("keydown", function (event) {
  if (event.key === "a" && gameStarted === false) {
    gameStarted = true;
    $("h1").text("Level " + level);
    nextSequence();
  }
});

$(".box").on("click", function (event) {
  let buttonClicked = this.id;
  userClickedPattern.push(buttonClicked);
  playSound(buttonClicked);
  animatePress(buttonClicked);
  checkAnswer(userClickedPattern.length - 1);
});

// Création d'une séquence

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).addClass("pressed");
  setTimeout(function () {
    $("#" + randomChosenColour).removeClass("pressed");
  }, 100);

  playSound(randomChosenColour);
  level++;
  $("h1").text("Level " + level);
  userClickedPattern = [];
}

function playSound(name) {
  let sound = new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log(currentLevel);
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("wrong");
    erreur();
  }
}

// Erreur
function erreur() {
  $("body").css("background-color", "red");
  setTimeout(function () {
    $("body").css("background-color", "#011f3f");
  }, 100);
  $("h1").text("Erreur ! Appuyez sur n'importe quelle touche pour redémarrer");
  let sound = new Audio("./sounds/wrong.mp3");
  sound.play();

  // Si appuie sur une touche, jeu redémarre
  $(document).on("keydown", function (event) {
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    $("h1").text("Level " + level);
    nextSequence();
  });
}
