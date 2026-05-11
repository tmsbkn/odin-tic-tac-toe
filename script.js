const form = document.querySelector('#gameForm');

form.addEventListener('submit', (event) => {
   event.preventDefault();

   const formData = new FormData(form);
   const data = Object.fromEntries(formData);
   document.querySelector('.formWrap').setAttribute('hidden', true);
   console.log(data);
   initializeGame(data);
});

const initializeGame = (data) => {
   //initialize game variables

   //add event click listeners to gameBoard
   data.board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
   data.player1 = 'X';
   data.player2 = 'O';
   data.round = 0;
   data.currentPlayer = 'X';
   data.gameOver = false;
};

// Attach event listener to boxes

// initialize game

//set win conditions

// determine current player

//after each move, check win conditions. If not met change active player
