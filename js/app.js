
// create array that holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);

// define deck that consists of all cards in game
const deck = document.getElementById("card-deck");

// declare variables for player's moves
let moves = 0;
let counter = document.querySelector(".moves");

// declare variable for star icons that represent player's score
const stars = document.querySelectorAll(".fa-star");

// declare variable for picked cards that match
let matchedCards = document.getElementsByClassName("match");

// list of star icons
let starsList = document.querySelectorAll(".stars li");

// close icon in modal / won game message
let closeIcon = document.querySelector(".close-window");

// declare modal / won game message
let modal = document.getElementById("pop-up-window")

// array for opened cards
var openedCards = [];

// shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// shuffles cards when page is refreshed
document.body.onload = startNewGame();

// function to start a new game
function startNewGame() {
  // shuffle deck
  cards = shuffle(cards);
  // remove all exisiting classes from each card
  for (var i = 0; i < cards.length; i++) {
    deck.innerHTML = "";
    [].forEach.call(cards, function(item) {
      deck.appendChild(item);
    });
    cards[i].classList.remove("show", "open", "match", "disabled");
  }
  // reset moves
  moves = 0;
  counter.innerHTML = moves;
  // reset rating
  for (var i = 0; i < stars.length; i++) {
    stars[i].style.color = "#FFD700";
    stars[i].style.visibility = "visible";
  }
  //reset timer
  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 mins 0 secs";
  clearInterval(interval);
}

// toggles open and show class to display cards
var displayCard = function() {
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

// add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
  openedCards.push(this);
  var len = openedCards.length;
  if (len === 2) {
    moveCounter();
    if (openedCards[0].type === openedCards[1].type) {
      matched();
    } else {
      unmatched();
    }
  }
};

// when cards match
function matched() {
  openedCards[0].classList.add("match", "disabled");
  openedCards[1].classList.add("match", "disabled");
  openedCards[0].classList.remove("show", "open", "no-event");
  openedCards[1].classList.remove("show", "open", "no-event");
  openedCards = [];
}

// when cards don't match
function unmatched() {
  openedCards[0].classList.add("unmatched");
  openedCards[1].classList.add("unmatched");
  disable();
  setTimeout(function() {
    openedCards[0].classList.remove("show", "open", "no-event", "unmatched");
    openedCards[1].classList.remove("show", "open", "no-event", "unmatched");
    enable();
    openedCards = [];
  }, 1100);
}


// disables cards temporarily
function disable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.add('disabled');
  });
}

// enables cards and disables matched cards
function enable() {
  Array.prototype.filter.call(cards, function(card) {
    card.classList.remove('disabled');
    for (var i = 0; i < matchedCards.length; i++) {
      matchedCards[i].classList.add("disabled");
    }
  });
}

// count player's moves
function moveCounter() {
  moves++;
  counter.innerHTML = moves;
  // start timer on first click
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
  // setting rates based on moves
  if (moves > 11 && moves < 15) {
    for (i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves >= 15) {
    for (i = 0; i < 3; i++) {
      if (i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
  }
}

// game timer
var second = 0,
  minute = 0;
hour = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
  interval = setInterval(function() {
    timer.innerHTML = minute + " mins " + second + " secs";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

// congratulations when all cards match, show modal and moves, time and rating
function congratulations() {
  if (matchedCards.length == 16) {
    clearInterval(interval);
    totalTime = timer.innerHTML;

    // show congratulations modal
    modal.classList.add("show");

    // declare star rating variable
    var starRating = document.querySelector(".stars").innerHTML;

    //showing move, rating, time on modal
    document.getElementById("totalMoves").innerHTML = moves;
    document.getElementById("starRating").innerHTML = starRating;
    document.getElementById("totalTime").innerHTML = totalTime;

    //close icon on modal
    closeModal();
  };
}

// close icon on modal
function closeModal() {
  closeIcon.addEventListener("click", function(e) {
    modal.classList.remove("show");
    startNewGame();
  });
}

// to play again
function playAgain() {
  modal.classList.remove("show");
  startNewGame();
}

// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", displayCard);
  card.addEventListener("click", cardOpen);
  card.addEventListener("click", congratulations);
};
