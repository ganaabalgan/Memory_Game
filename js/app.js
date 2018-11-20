/*
 * Create a list that holds all of your cards
 */
const cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf"
                ,"fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle"
                ,"fa-paper-plane-o","fa-cube"];
let holder = [];
let matchingPairs = 0;
let moves = 0;
let start_time = 0;
let starCounter = 3;
const allStars = document.querySelectorAll('.fa-star');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cards);
eventSelect();
var timer = new Timer();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    document.querySelector("#timer").innerHTML = timer.getTimeValues().toString();
});
// Creates HTML for all cards
// Resets board
function resetBoard(cards) {
    shuffle(cards);
    timer.start();
    moves = 0
    holder = [];
    matchingPairs = 0;
    timer.reset();
    document.querySelector(".moves").innerHTML = moves;
    let previousDeck = document.querySelector(".deck");
    previousDeck.remove();
    let deck = document.createElement('ul');
    deck.classList.add("deck");
    cards.forEach(function(card) {
        let item = document.createElement('li');
        item.classList.add("card");
        let instance = document.createElement('i');
        instance.classList.add("fa");
        instance.classList.add(card);
        item.appendChild(instance);
        deck.appendChild(item);
    });
    let container = document.querySelector(".container");
    container.appendChild(deck);
    eventSelect();
    for (let i = 0; i < 3; i++) {
        allStars[i].classList.remove('hide');
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

document.querySelector(".restart").addEventListener("click", function() {
    resetBoard(cards);
});

function eventSelect(){
    let deck = document.querySelector(".deck");
    deck.classList.toggle("flip");
    deck.addEventListener("click", function(event) {
        currentCardClass = event.target.firstElementChild.classList[1];
        currentCard = event.target;
        if (holder.length !== 0
                && currentCardClass === holder[0].firstElementChild.classList[1]
                && (event.target.offsetLeft !== holder[0].offsetLeft
                || event.target.offsetTop !== holder[0].offsetTop)) { // Matching
            incrementMove();
            let allMatchingCards = document.querySelectorAll("." + currentCardClass);
            allMatchingCards.forEach(function(card) {
            card.parentElement.classList.add("match");
            });
            matchingPairs = matchingPairs + 1;
            holder = [];
            endGame(matchingPairs);
        } else if (holder.length !== 0 && currentCardClass !== holder[0].firstElementChild.classList[1]){ // Not matching
            incrementMove();event.target.classList.add("open");
            event.target.classList.add("show");
            setTimeout(function(){
                event.target.classList.remove("open");
                event.target.classList.remove("show");
                holder[0].classList.remove("open");
                holder[0].classList.remove("show");
                holder = [];
            }, 1000);
            incrementMove();
        } else { // Nothing opened
            holder.push(currentCard);
            event.target.classList.add("open");
            event.target.classList.add("show");
        }
    });
}

function incrementMove() {
    moves = moves + 1;
    document.querySelector(".moves").innerHTML = moves;
    if (moves === 15) {
        allStars[0].classList.add('hide');
        starCounter = starCounter - 1;
    } else if (moves === 20) {
        allStars[1].classList.add('hide');
        starCounter = starCounter - 1;
    }
}

function endGame(matchingPairs) {
    if (matchingPairs === 8){
        starCounter = 3;
        let r = confirm("You have Won with " + starCounter + " stars! It took you "
                + moves + " moves and " + document.querySelector("#timer").innerHTML
                + " seconds.\nWould you like to play again?");
        if (r == true) {
            resetBoard(cards);
        } else {
            txt = "You pressed Cancel!";
        }
        moves = 0;
    }
}
