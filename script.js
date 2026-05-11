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
   data.winner = '';
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
   addEventListenersToGameBoard(data);
   adjustDom('#whoseTurn', `${data.player1Name}'s turn`);
   const newGameButton = document.querySelector('#newGameBtn');
   newGameButton.addEventListener('click', (event) => {
      newGame(data);
   });
   const resetGameButton = document.querySelector('#resetGameBtn');
   resetGameButton.addEventListener('click', (event) => {
      resetGame(data);
   });
   //add event click listeners to gameBoard
};

const newGame = (data) => {
   initializeVariables(data);
   document.querySelectorAll('.box').forEach((box) => {
      box.textContent = '';
   });
   let displayTurnName =
      data.currentPlayer === 'X' ? data.player1Name : data.player2Name;
   adjustDom('#whoseTurn', `${displayTurnName}'s turn`);
};

const resetGame = (data) => {
   newGame(data);
   document.querySelector('.formWrap').removeAttribute('hidden', true);
   document.querySelector('#gameForm').reset();
};

const changePlayerTurn = (data) => {
   if (data.currentPlayer === 'X') {
      data.currentPlayer = 'O';
   } else {
      data.currentPlayer = 'X';
   }
   let displayTurnName =
      data.currentPlayer === 'X' ? data.player1Name : data.player2Name;
   adjustDom('#whoseTurn', `${displayTurnName}'s turn`);
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

   //check win conditions
   if (endConditions(data)) {
      return;
      //adjust DOM to reflect Win conditions;
   }
   changePlayerTurn(data);
};

//set win conditions
const endConditions = (data) => {
   //3 options
   //winner
   //tie
   //game not done
   if (checkWinner(data)) {
      //adjust DOM for winner
      let winnerName =
         data.currentPlayer === 'X' ? data.player1Name : data.player2Name;
      adjustDom('#whoseTurn', winnerName + ' has won the game');
      return true;
   } else if (data.round === 9) {
      //adjust DOM for tie
      adjustDom('#whoseTurn', 'Its a tie game');
      data.gameOver = true;
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
const adjustDom = (selector, textContent) => {
   const elem = document.querySelector(`${selector}`);
   elem.textContent = textContent;
};
//after each move, check win conditions. If not met change active player
