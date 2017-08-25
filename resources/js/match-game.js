$(document).ready(function() {

// Generate game with new random set of cards and generate html for the game cards

var cardValues = MatchGame.generateCardValues();
MatchGame.renderCards(cardValues, $('#game') );

// Listen for click and then flip cardValues





}); /* end document ready callback funtion */

var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/



/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {

 var unplacedInOrderCardValues = [];

for (var i=1; i < 9 ; i++) {
  unplacedInOrderCardValues.push(i, i);
}

var randomlyOrderedCardValues = [];

  while (unplacedInOrderCardValues.length !== 0) {

    var index = Math.floor(Math.random() * unplacedInOrderCardValues.length);


    randomlyOrderedCardValues.push(unplacedInOrderCardValues[index]);
    unplacedInOrderCardValues.splice(index, 1);
  }

return randomlyOrderedCardValues;

};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

var colorArray = ['hsl(25,85%,65%)',
                  'hsl(55,85%,65%)',
                  'hsl(90,85%,65%)',
                  'hsl(160,85%,65%)',
                  'hsl(220,85%,65%)',
                  'hsl(265,85%,65%)',
                  'hsl(310,85%,65%)',
                  'hsl(360,85%,65%)'];

$game.empty();

var flippedCardsArray = [];

$game.data("flippedCards", flippedCardsArray);

for (var i=0; i < cardValues.length; i++) {

var $card = $('<div class="card col-xs-3"></div>');

$card.data("value", cardValues[i]);
$card.data("flipped", false);
$card.data("color", colorArray[cardValues[i]-1] );

$game.append($card);

}

$('.card').on('click', function() {
 MatchGame.flipCard($(this), $('#game'));
});

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

if ($card.data("flipped") === true) {
  return;
}

$card.css('background-color', $card.data("color"));
$card.text($card.data("value"));
$card.data("flipped", true);

$game.data("flippedCards").push($card);

if ($game.data("flippedCards").length === 2) {

  if ($game.data("flippedCards")[1].data("value") === $game.data("flippedCards")[0].data("value") ) {
    $game.data("flippedCards")[1].css("color","rgb(204,204,204)");
    $game.data("flippedCards")[0].css("color","rgb(204,204,204)");

    $game.data("flippedCards")[1].css("background-color", "rgb(153,153,153)");
    $game.data("flippedCards")[0].css("background-color", "rgb(153,153,153)");

    $game.data("flippedCards")[1].css("border","4px,solid,#ffffff");
    $game.data("flippedCards")[0].css("border","4px,solid,#ffffff");

    $game.data("flippedCards")[1].css("border-radius", "8px");
    $game.data("flippedCards")[0].css("border-radius", "8px");

    $game.data("flippedCards").length=0;
  }
  else {

    setTimeout(function() {


      $game.data("flippedCards")[1].css("background-color","rgb(32,64,86)");
      $game.data("flippedCards")[0].css("background-color","rgb(32,64,86)");

      $game.data("flippedCards")[1].text("");
      $game.data("flippedCards")[0].text("");

      $game.data("flippedCards")[1].data("flipped", false);
      $game.data("flippedCards")[0].data("flipped", false);

      $game.data("flippedCards").length=0;


    }, 1000);

}



  }

return;

};
