
// get score from storage if it's not the first time, for first time set it to 0 and save to an object
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
// run this function so my paragraph with the scores is always revealed
 updateScoreElement();



 // autoPlay function 
let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector('.auto-play-js').innerHTML = 'Stop Playing'

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.auto-play-js').innerHTML = 'Auto Play'
  }
}

// eventListener for the buttons instead of onClick 
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });
document.querySelector('.auto-play-js').addEventListener('click', ()=>{
  autoPlay();
});  
document.querySelector('.js-reset-score-button').addEventListener('click',()=>{ score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  clearInterval(intervalId);
  document.querySelector('.auto-play-js').innerHTML = 'Auto Play'
})
// eventListener for hotkeys for the buttons
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'q') {
    playGame('rock');
  } else if (event.key === 'w') {
    playGame('paper');
  } else if (event.key === 'e') {
    playGame('scissors');
  }else if( event.key === 'r'){
    autoPlay();
  }else if( event.key === 't'){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    clearInterval(intervalId);
    document.querySelector('.auto-play-js').innerHTML = 'Auto Play'
  }
});

 // playGame function , computer will pick a random move then we compare and localStorage the result , update the result ,show the result to the player
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';
// compare player moves vs computer moves and save the result to a variable named result so we can use it
  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }
 // use the result variable and update the score property 
  if (result === 'You win.') {
    score.wins += 1;
  } else if (result === 'You lose.') {
    score.losses += 1;
  } else if (result === 'Tie.') {
    score.ties += 1;
  }
// save the new data to localStorage so we won't lose it after a refresh
  localStorage.setItem('score', JSON.stringify(score));
// after every "play" we have to update the visual of the score
  updateScoreElement();
// cute little visual of the results of the game.
  document.querySelector('.js-result').innerHTML = result;

  // cute little visual , should make it look better in css
  document.querySelector('.js-moves').innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon"> VS
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

// how we update the score on the js-score paragraph
function updateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// for RNG(random number generator) I use  Math.random() that will give a random number between 0-1 , I split it to 3 equal parts, each part is a choice
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}