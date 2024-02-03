const gameBoard = document.querySelector('#game-board');
const boardCell = document.querySelectorAll('.board-cell');

const playerOne = createplayer('playerOne', 'x');
const playerTwo = createplayer('playerTwo', 'o');

console.log(playerOne, playerTwo)

function cell(){
    let play; 
    const marked = false; // check if the cell has been marked or not
    const draw = () => null; // draw method that will draw plays on the screen
    const checkPlay = () => null; // check for players play(x or o) and assingn to the play property

    return {play, marked, draw, checkPlay}
}

const createGameBoard = (function (){
    let gameBoard = []

    boardCell.forEach((bcell, index) => {
        bcell.setAttribute('data-cell', index);
        bcell = cell(); //create instance of cell object 
        gameBoard.push(bcell); // pushes it to the board list
    })

    let gameEnd = false;
    const gameCheck = () => null;// checks if the game is over if it is it will set game end to false
    const draw = () => null; //draws a diagnal through the board when game has ended and somebody won

    return {gameEnd, gameCheck, draw
    }
})();

function createplayer(player, play){
    return {player, play}
}



