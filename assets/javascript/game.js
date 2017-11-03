// =============== DICTIONARIES ===============
var easyWords = ["harry", "hermione", "ronald", "dumbledore", "bellatrix", "snape", "hogwarts", "pensieve", "gryffindor", "hufflepuff", "slytherin", "ravenclaw", "azkaban", "diadem", "hagrid", "wizengamot", "voldemort", "hedwig", "patronus", "dementor"];

// extra words: "gringotts", "quidditch"

var hardWords = ["the boy who lived", "hermione granger", "ronald weasley", "albus dumbledore", "bellatrix lestrange", "severus snape", "hogwarts school of witchcraft and wizardy", "pensieve", "godric gryffindor", "helga hufflepuff", "salazar slytherin", "rowena ravenclaw", "azkaban", "diadem", "rubeus hagrid", "wizengamot", "tom marvolo riddle", "hedwig", "expecto patronum"];

// extra words: "gringotts", "chudley cannons", "nearly headless nick", "grindelwald", "draco malfoy", "sirius black"

// =============== GLOBAL VARIABLES ===============

var gameMode = hardWords; // sets default gameMode to easy
var rand; // holds random word from the applicable dictionary
var randIndex; // location of random word in applicable dictionary
var currentWord = []; // will display blanks and fill them in with userGuess
var userGuess;
var guesses = []; // array to hold letters the user has guessed
var remainingAttempts;
var wrongGuess = 0;
var wins = 0;
var validGuess = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

// for (var i=0; i < easyWords.length; i++) {
// 	console.log(easyWords[i]);
// }

// =============== FUCTIONS ===============

// Image factory
var createImage = function(src, title) {
  var img   = new Image();
  img.src   = src;
  img.alt   = title;
  img.title = title;
  return img;
};

// array of images
var images = [];

// push images to the array
images.push(createImage("assets/images/harry-potter.jpg", "the boy who lived"));
images.push(createImage("assets/images/hermione.jpg", "the brightest wizard of her age"));
images.push(createImage("assets/images/ronald.jpg", "the red haired best friend"));
images.push(createImage("assets/images/albus-dumbledore.jpg", "the headmaster"));
images.push(createImage("assets/images/bellatrix.jpg", "the right-hand girl of the dark lord"));
images.push(createImage("assets/images/severus-snape.jpg", "the potions master"));
images.push(createImage("assets/images/hogwarts.jpg", "the best wizarding school"));
images.push(createImage("assets/images/pensieve.jpg", "memory pool"));
images.push(createImage("assets/images/gryffindor-crest.png", "the bravest"));
images.push(createImage("assets/images/hufflepuff-crest.png", "the kindest"));
images.push(createImage("assets/images/slytherin-crest.png", "the most cunning"));
images.push(createImage("assets/images/ravenclaw-crest.png", "the most clever"));
images.push(createImage("assets/images/azkaban.jpg", "wizard prison"));
images.push(createImage("assets/images/diadem.jpg", "a lovely crown"));
images.push(createImage("assets/images/hagrid.jpg", "the sweetest giant"));
images.push(createImage("assets/images/wizengamot.jpg", "wizard council"));
images.push(createImage("assets/images/voldemort.jpg", "he who must not be named"));
images.push(createImage("assets/images/hedwig-2.jpg", "harry's pet"));
images.push(createImage("assets/images/patronus.jpg", "a ball of happy energy"));
images.push(createImage("assets/images/dementor.jpg", "the ultimate despair"));

// output
// console.log(images);

// picks random word from dictionary and displays dashes instead of letters
function pickRandomWord(arr) {

	var x = arr[Math.floor(Math.random() * arr.length)]; // picks random word from array
	rand = x; // stores word in global variable
	randIndex = arr.indexOf(x);


	console.log(rand);
	console.log(randIndex);
	console.log(rand.length);

	var currentImage = images[randIndex];
	console.log(currentImage.src);

	document.getElementById("currentImage").src = currentImage.src;



	var dashes = "";

  // This loop checks and changes the word to blank spaces and stores the new 'blank'
  // word as dashes to be displayed on screen
	for (i = 0; i < rand.length; i++) {
    // if this is the last character in the word
    if (i == rand.length-1) {
	  	dashes += "_";
	  }
    // if any other character is a space
    else if (rand.charAt(i) == " ") {
	    dashes += "- ";
	  }
    // if any other character is an apostrophe
    else if (rand.charAt(i) == "\'") {
	  	dashes += "\' ";
	  }
    // any other character (should be a letter a-z)
    else {
	    dashes += "_ ";
	  }

	}

  // displays the selected word as a string of underscores and spaces
  console.log("current word as dashes: " + dashes);
  console.log("length of dashes: " + dashes.length);

  // Chops out spaces and puts dashes into the currentWord array where each letter is in its own location
  if (gameMode == easyWords) {
    // example: snape ==> ["s", "n", "a", "p", "e"] ==> ["_", "_", "_", "_", "_"]
    currentWord = dashes.split(" ");
  }
  else {
    // example: harry potter ==> ["h","a","r","r","y","  ","p", "o","t","t","e","r"] ==> ["_","_","_","_","_","  ","_", "_","_","_","_","_"]
    // check for blank spaces
    var isBlank = "-";
    var blankIndex = [];
    var x; // will store the location of the blank and divide by two
    for (j=0; j<dashes.length; j+=2) {
      if (dashes.charAt(j) == isBlank) {
        x = j/2;
        blankIndex.push(x);
      }

    }
    console.log("blank index: " + blankIndex);
    var hardWord = dashes.split(" ");


    // if there are blanks, the blankIndex will be greater than 0
    if (blankIndex.length>0){
      for(y = 0; y<blankIndex.length; y++){
        var ind = blankIndex[y];
        hardWord[ind] = "&nbsp"; // changes the empty slot to a non-breaking space
      }
      console.log("hard word as dashes: " + hardWord);
    }

    currentWord = hardWord;
  }


	console.log(currentWord);
  console.log("length of current word: " + currentWord.length);

	document.getElementById("word").innerHTML = currentWord.join(" ");

	remainingAttempts = rand.length;

	// console.log(remainingAttempts);

} // END of pickRandomWord function

// changes userGuess to lowercase letters so that we can easily compare these guesses to the word
function changeCase(y) {

	var y = y.toLowerCase();

	userGuess = y;

	// console.log(userGuess);
} // END of changeCase function

function reset() {

}

// =============== FUNCTION CALLS ===============

// ******* INITIAL START *******

// picks a random word from the array based on whether the user is playing easy or hard mode
// game defaults to easyWords

window.onload = function (newGame) {

	pickRandomWord(gameMode);

	// console.log(rand);

	//  ******* BEGIN GUESSING *******
	document.onkeyup = function(startGame) {

		var testText = rand.split(""); // builds array from the letters of the randomly selected word

		// captures the user's guess
		userGuess = event.key;

		// changes the case of user's guess to lower case
		changeCase(userGuess);

		// array houses blanks and changes them as user guesses correctly
		var currentAttempt = currentWord;

		// checks if the userGuess is a correct guess, where -1 is a wrongGuess
		var isCorrect = rand.indexOf(userGuess);

		// console.log(isCorrect);

		// checks for blanks in the currentAttempt
		var blanksLeft = currentAttempt.indexOf("_");

		// console.log(blanksLeft);

		var isValid = validGuess.indexOf(userGuess);
		var alreadyGuessed = guesses.indexOf(userGuess);

		// check if userGuess is a letter a-z that has not been guessed yet
		if ( isValid != -1 && alreadyGuessed == -1) {

			// fills array for already guessed letters and displays on screen
			guesses.push(userGuess);

			// console.log(guesses);

			document.getElementById("guesses").innerHTML = guesses.join(",  ");

			// ******* Repeats these steps for each guess as long as there are blank spaces*******
			if(blanksLeft >= 0) {

				// If the guess is incorrect, increments wrongGuess, game ends, reloads
				if(isCorrect < 0) {

					wrongGuess += 1;
					// console.log(wrongGuess);

					if(wrongGuess === 6) {

						setTimeout(function() {alert("GAME OVER")}, 200);
						location.reload();
					}

				} else {

					// If the guess is correct, fill the currentAttempt accordingly
					for (var i=0; i < rand.length; i++) {

						if (userGuess === testText[i]) {

							currentAttempt[i] = userGuess;
							console.log(currentAttempt);
							document.getElementById("word").innerHTML = currentAttempt.join(" ");
						}

						// console.log(testText[i]);

					}
				}

				// test blanks again
				blanksLeft = currentAttempt.indexOf("_");

				if(blanksLeft === -1) {

					wins += 1;
          document.getElementById("wins").innerHTML = "Wins: " + wins;
					setTimeout(function() {
            alert("YOU WIN!");
            //reset
  					pickRandomWord(gameMode);
  					currentAttempt=currentWord;
  					guesses=[];
  					document.getElementById("guesses").innerHTML = guesses.join(",  ");
  					wrongGuess = 0;
          },200);

				}
			} // END of testing for blanks
		} // END of testing user guess
	} // End of Guessing
}
