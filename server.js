document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');
    const cells = [];
  
    
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
  
    
    function handleCellClick(index) {
      
      if (gameBoard[index] === '' && gameActive) {
        
        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;
  
        
        if (checkWinner()) {
          status.textContent = `${currentPlayer} wins!`;
          gameActive = false;
        } else if (isBoardFull()) {
          status.textContent = 'It\'s a draw!';
          gameActive = false;
        } else {
          
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          status.textContent = `Player ${currentPlayer}'s turn`;
        }
      }
    }
  
    
    function checkWinner() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
  
      for (const combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
          highlightWinnerCells(combo);
          return true;
        }
      }
  
      return false;
    }
  
    
    function highlightWinnerCells(cellsToHighlight) {
      cellsToHighlight.forEach(index => {
        cells[index].classList.add('winner');
      });
    }
  
    
    function isBoardFull() {
      return !gameBoard.includes('');
    }
  
  
    function resetGame() {
      gameBoard = ['', '', '', '', '', '', '', '', ''];
      gameActive = true;
      currentPlayer = 'X';
      status.textContent = 'Player X\'s turn'
      cells.forEach(cell => {
        cell.textContent = '';
      });
    }
  
    
    resetBtn.addEventListener('click', resetGame);
  
  
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.addEventListener('click', () => handleCellClick(i));
      board.appendChild(cell);
      cells.push(cell);
    }
  });