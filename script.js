'use strict';

// Generate random number
const generateNumber = function (max) {
  return Math.floor(Math.random() * max) + 1;
};
let targetNumber = generateNumber(20);
const secretNumber = document.querySelector('.number');
// Initialize currentScore and highScore
let score = document.querySelector('.score');
let currentScore = 20;
let highScore = 0;
score.textContent = currentScore;

// "Check" event
const checkBtn = document.querySelector('.check');
checkBtn.addEventListener('click', compareAnswer);

// Testing
// console.log(targetNumber);

function compareAnswer() {
  const userInputRaw = document.querySelector('.guess').value;
  if (userInputRaw === '') {
    answerFeedback('⚠ Please input a number!');
    return;
  }
  // User input
  const userInput = Number(document.querySelector('.guess').value);
  console.log(typeof document.querySelector('.guess').value);

  // Check if number is between 1 and 20
  if (userInput > 0 && userInput < 21) {
    //   Check if number is correct
    if (targetNumber === userInput) {
      winner();
    } else {
      // If not correct, check if number is higher or lower
      if (userInput > targetNumber) {
        answerFeedback(`📈 ${userInput} is too High!`);
      } else {
        answerFeedback(`📉 ${userInput} is too Low!`);
      }
      // Update Score
      updateScore();
    }
  } else {
    answerFeedback('Please pick between numbers 1 and 20!');
    updateScore();
  }
}

const answerFeedback = function (msg) {
  const feedback = document.querySelector('.message');
  feedback.textContent = msg;
};

const body = document.getElementsByTagName('body')[0];
const winner = function () {
  body.classList.add('winner');
  answerFeedback('🎉 Correct Number!');
  checkBtn.disabled = true;
  secretNumber.textContent = targetNumber;
  if (currentScore > highScore) {
    highScore = currentScore;
    document.querySelector('.highscore').textContent = highScore;
  }
};

const updateScore = function () {
  currentScore--;
  score.textContent = currentScore;
  if (currentScore < 0) {
    console.log('should be game over!');
    gameOver();
  }
};

const reset = function () {
  // Reset new targetNumber
  targetNumber = generateNumber(20);
  secretNumber.textContent = '?';
  // Reset current Score but keep HighScore
  currentScore = 20;
  score.textContent = currentScore;
  // Reset background, answerFeedback, input value
  body.classList.remove('winner');
  answerFeedback('Start guessing...');
  document.querySelector('.guess').value = '';
  // Enable button
  checkBtn.disabled = false;
};

const resetBtn = document.querySelector('.again');

resetBtn.addEventListener('click', reset);

const gameOver = function () {
  answerFeedback('❌GAME OVER❌');
  checkBtn.disabled = true;
  score.textContent = '❌';
  secretNumber.textContent = targetNumber;
};
