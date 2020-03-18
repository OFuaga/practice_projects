var dealerHand, playerHand, gamePlaying;

var card;
var ace = 11;
var playerCardHistory = [];
var dealerCardHistory = [];

init();

//Insures that the next card is a random number from 1-11
function drawCard() {
  card = Math.floor(Math.random() * (12 - 1) + 1);
}

function playerDraw() {
  drawCard();
  var secondCard = Math.floor(Math.random() * (12 - 1) + 1);
  playerHand = card + secondCard;
  playerCardHistory.push(card, secondCard);
  updateHand();
}

function dealerDraw() {
  drawCard();
  dealerHand = card;
  updateHand();
}

//Starts the game
document.querySelector('.btn-start').addEventListener('click', function() {
  if (gamePlaying) {
    //Hides message and start button
    document.querySelector('.message').style.display = 'none';
    document.querySelector('.btn-start').style.display = 'none';
    //Gives dealer one card
    dealerDraw();
    //SHOULD give player two cards
    playerDraw();
  }

});

//Hit adds another card to player's hand
document.querySelector('.btn-hit').addEventListener('click', function() {
  if (gamePlaying) {
    drawCard();
    playerHand += card;
    updateHand();
    playerCardHistory.push(card);
  }  
  
  //If playerHand >= 21 then all functions are disabled until a player starts a new game
  if (playerHand >= 21) {
    gamePlaying = false;
    playerBust();
  }
});

//Player keeps current hand and dealer becomes the active turn
document.querySelector('.btn-stand').addEventListener('click', function() {
  if (gamePlaying) {
    dealerTurn(); 
  }
});

//Switch to dealer's turn
function dealerTurn() {
  //Dealer draws a card if current hand is <= 16, otherwise they stand
  for (i = 0; i <= dealerHand; i++) {
    if (dealerHand <= 16) {
      dealerDraw();
      dealerHand += card;
      updateHand();
      dealerCardHistory.push(card);
    }
  }

 if (dealerHand >= 21) {
    dealerBust();
  } else if (playerHand < dealerHand) {
    dealerWins();
  } else if (playerHand > dealerHand) {
    playerWins();
  } else {
    tieGame();
  }
}

//Displays outcome
function playerBust() {
  document.querySelector('.message').style.display = 'block';
  document.querySelector('.message').textContent = 'You Went BUST!';
  document.querySelector('.btn-start').style.display = 'block';
  document.querySelector('.btn-start').textContent = 'Play Again';
  document.querySelector('.btn-start').addEventListener('click', function() {
    document.querySelector('.message').style.display = 'none';
    document.querySelector('.btn-start').style.display = 'none';
    newHand();
    updateHand();  
  });
}

function playerWins() {
  document.querySelector('.message').style.display = 'block';
  document.querySelector('.message').textContent = 'You\'ve Won!';
  document.querySelector('.btn-start').style.display = 'block';
  document.querySelector('.btn-start').textContent = 'Play Again';
  document.querySelector('.btn-start').addEventListener('click', function() {
    document.querySelector('.message').style.display = 'none';
    document.querySelector('.btn-start').style.display = 'none';
    newHand();
    updateHand();  
  });
}

function dealerWins() {
  document.querySelector('.message').style.display = 'block';
  document.querySelector('.message').textContent = 'Dealer Wins!';
  document.querySelector('.btn-start').style.display = 'block';
  document.querySelector('.btn-start').textContent = 'Play Again';
  document.querySelector('.btn-start').addEventListener('click', function() {
    document.querySelector('.message').style.display = 'none';
    document.querySelector('.btn-start').style.display = 'none';
    newHand();
    updateHand();  
  });
}

function dealerBust() {
  document.querySelector('.message').style.display = 'block';
  document.querySelector('.message').textContent = 'Dealer Went BUST, You\'ve Won!';
  document.querySelector('.btn-start').style.display = 'block';
  document.querySelector('.btn-start').textContent = 'Play Again';
  document.querySelector('.btn-start').addEventListener('click', function() {
    document.querySelector('.message').style.display = 'none';
    document.querySelector('.btn-start').style.display = 'none';
    newHand();
    updateHand();  
  });
}

function tieGame() {
  document.querySelector('.message').style.display = 'block';
  document.querySelector('.message').textContent = 'It\'s a Tie!';
  document.querySelector('.btn-start').style.display = 'block';
  document.querySelector('.btn-start').textContent = 'Play Again';
  document.querySelector('.btn-start').addEventListener('click', function() {
    document.querySelector('.message').style.display = 'none';
    document.querySelector('.btn-start').style.display = 'none';
    newHand();
    updateHand();  
  });
}

//Updates UI to show current values for each hand
function updateHand() {
  document.querySelector('.dealer-hand').textContent = dealerHand;
  document.querySelector('.player-hand').textContent = playerHand;
}

//New game after player busts or wins
function newHand() {
  dealerHand = 0;
  playerHand = 0;
  gamePlaying = true;
  dealerDraw();
  playerDraw();
  updateHand();
}

//Initializes new game
function init() {
  dealerHand = 0;
  playerHand = 0;
  gamePlaying = true;
  updateHand();
}

