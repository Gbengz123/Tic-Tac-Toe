const gameBoardContainer = document.querySelector('#game-board');
const boardCells = document.querySelectorAll('.board-cell');
let clickCounter = 0
let playerTurn;

const playerOne = createplayer('playerOne', 'x');
const playerTwo = createplayer('playerTwo', 'o');

function cell(){
    let play;
    const marked = false; // check if the cell has been marked or not
    const draw = () => null; // draw method that will draw plays on the screen

    return {play, marked, draw}
}

const gameBoard = (function (){
    let board = []

    boardCells.forEach((bcell, index) => {
        bcell.setAttribute('data-cell', index);
        bcell = cell(); //create instance of cell object 
        board.push(bcell); // pushes it to the board list
    })

    let gameEnd = false;
    const gameCheck = () => null;// checks if the game is over if it is it will set game end to false
    const draw = () => null; //draws a diagnal through the board when game has ended and somebody won

    return {gameEnd, gameCheck, draw, board}
})();

function createplayer(player, play){
    return {player, play}
}

(function game(){

    gameBoardContainer.addEventListener('click', () => {
        playerTurn = clickCounter % 2 === 0 ? playerTwo : playerOne
    })

    boardCells.forEach((cell) => {
        cell.addEventListener('click', play);
    })    
   
})()

function play(e, index){
    index = e.target.getAttribute('data-cell')
    let boardCell = gameBoard.board[index];
    

    if (boardCell.marked === false){
        if (playerTurn === playerOne){
            boardCell.play = playerOne.play
        }
        else{
            boardCell.play = playerTwo.play
        }
        e.target.textContent = boardCell.play
        
        boardCell.marked = true;
        
        clickCounter++
    }

    console.log(playerTurn === playerOne)
}



