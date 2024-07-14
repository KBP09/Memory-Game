const images = [
  "assets/images/orange.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg",
  "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg",
  "image6.jpg", "image6.jpg", "image7.jpg", "image7.jpg", "image8.jpg",
  "image8.jpg"
];
let shuffledImages;
let score = 0;
let mistakes = 0;
let flippedCards = [];
let matchedCards = 0;

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('start-game').addEventListener('click', startGame);
});

function startGame() {
  shuffledImages = shuffleArray(images.slice());
  score = 0;
  mistakes = 0;
  flippedCards = [];
  matchedCards = 0;
  document.getElementById('user-score').innerText = `Total Score - ${score}`;
  document.getElementById('mistake').innerText = `Mistakes - ${mistakes}/3`;

  const cardBoard = document.querySelector('.cardBoard');
  const rows = cardBoard.querySelectorAll('.row1, .row2, .row3');

  rows.forEach(row => row.innerHTML = '');

  rows.forEach((row, rowIndex) => {
    for (let i = 0; i < 5; i++) {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.image = shuffledImages[rowIndex * 5 + i];
      card.innerHTML = `
        <div class="card-front">HOVER</div>
        <div class="card-back">
          <img src="${shuffledImages[rowIndex * 5 + i]}" alt="Image">
        </div>
      `;
      card.addEventListener('click', handleCardClick);
      row.appendChild(card);
    }
  });

  document.getElementById('startGameButton').disabled = true;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function handleCardClick(event) {
  const clickedCard = event.currentTarget;
  if (clickedCard.classList.contains('flipped') || flippedCards.length === 2) {
    return;
  }

  clickedCard.classList.add('flipped');
  flippedCards.push(clickedCard);

  if (flippedCards.length === 2) {
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.image === card2.dataset.image) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    score++;
    matchedCards += 2;
    document.getElementById('user-score').innerText = `Total Score - ${score}`;
    if (matchedCards === images.length) {
      setTimeout(() => {
        alert('You won!');
        document.getElementById('startGameButton').disabled = false; 
      }, 500);
    }
  } else {
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
    mistakes++;
    document.getElementById('mistake').innerText = `Mistakes - ${mistakes}/3`;
    if (mistakes === 3) {
      setTimeout(() => {
        alert('Game over!');
        document.querySelectorAll('.card').forEach(card => card.removeEventListener('click', handleCardClick));
        document.getElementById('startGameButton').disabled = false; 
      }, 500);
    }
  }
  flippedCards = [];
}

