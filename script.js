'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

const displayMessage = function(message) {
  document.querySelector('.message').textContent = message;
};

const resetGame = function() {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.body.style.backgroundColor = '#333';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.check').textContent = 'Check!';
  document.querySelector('.again').classList.remove('hidden');
  document.querySelector('.check').classList.remove('red');
  document.querySelector('.check').removeEventListener('click', resetGame);
  document.querySelector('.check').addEventListener('click', checkGuess);
};

const checkGuess = function() {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('⛔️ No number!');

  } else if (guess === secretNumber) {
    displayMessage('🎉 Correct Number!');
    document.querySelector('.number').textContent = secretNumber;
    document.body.style.backgroundColor = '#60b347';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    document.querySelector('.check').textContent = 'Play Again';
    document.querySelector('.check').classList.add('red');
    document.querySelector('.again').classList.add('hidden');
    document.querySelector('.check').removeEventListener('click', checkGuess);
    document.querySelector('.check').addEventListener('click', resetGame);

  } else if (guess !== secretNumber) {
    if (score > 1) {
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💥 You lost the game!');
      document.querySelector('.score').textContent = 0;

      document.querySelector('.check').textContent = 'Play Again';
      document.querySelector('.check').classList.add('red');
      document.querySelector('.again').classList.add('hidden');
      document.querySelector('.check').removeEventListener('click', checkGuess);
      document.querySelector('.check').addEventListener('click', resetGame);
    }
  }
};

document.querySelector('.check').addEventListener('click', checkGuess);

document.querySelector('.again').addEventListener('click', resetGame);
