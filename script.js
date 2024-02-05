const gameBoardContainer = document.querySelector('#game-board');
const boardCells = document.querySelectorAll('.board-cell');
const display = document.querySelector('.display');
const restartButton = document.querySelector('button');
let clickCounter = 0

const playerOne = createplayer('playerOne', 'x');
const playerTwo = createplayer('playerTwo', 'o');
let playerTurn = playerOne;

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

    let straightRows = [[], [], [], [], [], [], []] //keeps track of all our straight rows
    let playerOneWin = false;
    let playerTwoWin = false;

    const gameCheck = (board) => {
        straightRows = [
           [board[0].play, board[1].play, board[2].play],
           [board[3].play, board[4].play, board[5].play],
           [board[6].play, board[7].play, board[8].play],
           [board[0].play, board[4].play, board[8].play],
           [board[2].play, board[4].play, board[6].play],
           [board[0].play, board[3].play, board[6].play], 
           [board[1].play, board[4].play, board[7].play], 
           [board[2].play, board[5].play, board[8].play]
        ]

        straightRows.forEach((straightRow) => {
            playerOneWin = straightRow.every((value) => { //the every method just takes the value of every elemnt in our list and check if it equals to player ones play
                return value === playerOne.play
            })
            playerTwoWin = straightRow.every((value) => {
                return value === playerTwo.play
            })

            if(playerOneWin === true){
                display.textContent = `${playerOne.player} wins!!`
                gameBoard.gameEnd = true
                return gameBoard.gameEnd
            }
            if (playerTwoWin === true){
                display.textContent = `${playerTwo.player} wins!!`
                gameBoard.gameEnd = true
                return gameBoard.gameEnd
            }
        })

    };// checks if the game is over if it is it will set game end to false
    const draw = () => null; //draws a diagnal through the board when game has ended and somebody won

    return {gameEnd, gameCheck, draw, board }
})();

function createplayer(player, play){
    return {player, play}
}

(function game(){
    gameBoardContainer.addEventListener('click', end)

    boardCells.forEach((cell) => {
        cell.addEventListener('click', play);
    })    

    restartButton.addEventListener('click', () =>{
        location.reload()
    })
})()

function play(e, index){
    playerTurn = clickCounter % 2 === 0 ? playerOne : playerTwo

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
        boardCell.play = gameBoard.board[index].play
        clickCounter++
    }

    if (clickCounter >= 5){gameBoard.gameCheck(gameBoard.board)} // once weve played 5 times we check if somebody has won or its a draw if it is the game will be ended
}

function end() {
    if(clickCounter > 8 && gameBoard.gameEnd === false){
        display.textContent = `ITS A DRAW`
        gameBoard.gameEnd = true
    }

    if (gameBoard.gameEnd === true){
        boardCells.forEach((cell) => {
            cell.removeEventListener('click', play);
        })
        
        this.removeEventListener('click', end)
    }
}


