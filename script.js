const winningMoves = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

const form = document.querySelector('#gameForm');

form.addEventListener('submit', (event) => {
   event.preventDefault();

   const formData = new FormData(form);
   const data = Object.fromEntries(formData);
   document.querySelector('.formWrap').setAttribute('hidden', true);
   initializeGame(data);
});

const initializeVariables = (data) => {
   data.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
   data.player1 = 'X';
   data.player2 = 'O';
   data.round = 0;
   data.currentPlayer = 'X';
   data.gameOver = false;
};

const addEventListenersToGameBoard = (data) => {
   document.querySelectorAll('.box').forEach((box) => {
      box.addEventListener('click', (event) => {
         playMove(event.target, data);
      });
   });
};

const initializeGame = (data) => {
   //initialize game variables
   initializeVariables(data);
   console.log(data);
   addEventListenersToGameBoard(data);
   //add event click listeners to gameBoard
};

const changePlayerTurn = (data) => {
   if (data.currentPlayer === 'X') {
      data.currentPlayer = 'O';
   } else {
      data.currentPlayer = 'X';
   }
};

const playMove = (box, data) => {
   //is game over?
   if (data.gameOver || data.round > 8) {
      return;
   }
   //is box occupied?
   if (data.board[box.id] === 'X' || data.board[box.id] === 'O') {
      return;
   }

   //adjust DOM with player move, then check against win conditions

   data.board[box.id] = data.currentPlayer;
   box.textContent = data.currentPlayer;
   box.className = data.currentPlayer === 'X' ? 'box player1' : 'box player2';
   data.round++;
   console.log(box, data);
   changePlayerTurn(data);
   //check win conditions
   if (endConditions(data)) {
      //adjust DOM to reflect Win conditions;
   }
};

//set win conditions
const endConditions = (data) => {
   //3 options
   //winner
   //tie
   //game not done
   if (checkWinner(data)) {
      //adjust DOM for winner
      return true;
   } else if (data.round === 9) {
      //adjust DOM for tie
      return true;
   }
   return false;
};
// determine current player
const checkWinner = (data) => {
   let result = false;
   winningMoves.forEach((condition) => {
      if (
         data.board[condition[0]] === data.board[condition[1]] &&
         data.board[condition[1]] === data.board[condition[2]]
      ) {
         data.gameOver = true;
         result = true;
      }
   });
   return result;
};
//after each move, check win conditions. If not met change active player
