/*
 * Create a list that holds all of your cards
 */
var cards = ["fa-diamond","fa-paper-plane-o","fa-anchor","fa-bolt","fa-cube","fa-anchor","fa-leaf"
                ,"fa-bicycle","fa-diamond","fa-bomb","fa-leaf","fa-bomb","fa-bolt","fa-bicycle"
                ,"fa-paper-plane-o","fa-cube"];
var holder = [];
var matchingPairs = 0;
var moves = 0;
var start_time = 0;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
shuffle(cards);
eventSelect();
startCount();
// Creates HTML for all cards
// Resets board
function resetBoard(cards) {
    shuffle(cards);
    startCount();
    var previousDeck = document.querySelector(".deck");
    previousDeck.remove();
    var deck = document.createElement('ul');
    deck.classList.add("deck");
    cards.forEach(function(card) {
        var item = document.createElement('li');
        item.classList.add("card");
        var instance = document.createElement('i');
        instance.classList.add("fa");
        instance.classList.add(card);
        item.appendChild(instance);
        deck.appendChild(item);
    });
    var container = document.querySelector(".container");
    container.appendChild(deck);
    moves = 0
    eventSelect();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
    var deck = document.querySelector(".deck");
    deck.classList.toggle("flip");
    deck.addEventListener("click", function(event) {
        incrementMove();
        currentCardClass = event.target.firstElementChild.classList[1];
        currentCard = event.target;
        if (holder.length !== 0
                && currentCardClass === holder[0].firstElementChild.classList[1]
                && (event.target.offsetLeft !== holder[0].offsetLeft
                || event.target.offsetTop !== holder[0].offsetTop)) { // Matching
            var allMatchingCards = document.querySelectorAll("." + currentCardClass);
            allMatchingCards.forEach(function(card) {
            card.parentElement.classList.add("match");
            });
            matchingPairs = matchingPairs + 1;
            holder = [];
            endGame(matchingPairs);
        } else if (holder.length !== 0 && currentCardClass !== holder[0].firstElementChild.classList[1]){ // Not matching
            event.target.classList.add("open");
            event.target.classList.add("show");
            setTimeout(function(){
                event.target.classList.remove("open");
                event.target.classList.remove("show");
                holder[0].classList.remove("open");
                holder[0].classList.remove("show");
                holder = [];
            }, 1000);
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
}

function endGame(matchingPairs) {
    if (matchingPairs === 8){
        var end_time = new Date();
        alert("You have Won! It took you " + moves + " moves and " + (end_time-start_time)/1000 + " seconds.");
        resetBoard(cards);
    }
}
function startCount() {
    start_time = new Date();
}
