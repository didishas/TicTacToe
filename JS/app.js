console.log('Serving ...');

// bloc Init and components Private Datas
const Dom = {
    cells: document.querySelectorAll('.cell'),
    resetBtn: document.querySelector('.btn .button:first-child'),
    title: document.querySelector('h1')
    
}



// Winnig combo
const winningCombo = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
];

let isGameOver = false;
class player {
    constructor(name, isPlaying, symbol, combo, isWinner){
        this.name = name;
        this.isPlaying = isPlaying;
        this.symbol = symbol;
        this.combo = combo;
        this.isWinner = isWinner;
    }
}



// functions helpers controllers

//* GameController
const initGame = function() {
    initialiseCells();
    
    players = [];
    players.push(new player('playerOne', true, 'X', [], false));
    players.push(new player('playerTwo', false, 'O', [], false));
    Dom.cells.forEach(elt => elt.style.backgroundColor = "#F9AA33");
    Dom.title.textContent = 'Tic Tac Toe';
    isGameOver = false;
    console.clear();
    console.log('Serving ...')
}

// * GameController
const initialiseCells = function() {
    Dom.cells.forEach(cell => {
        cell.marqued = false;
        cell.textContent = ''
    });
}

// * GameController
const checkActivePlayer = function(players){
    let indexFound = players.findIndex(player => player.isPlaying === true);
    return indexFound;
}

// * GameController
const storeCell = function(e, indexActivePlayer) {
    let cellMarked = e.target.getAttribute('data-id');
    players[indexActivePlayer].combo.push(parseInt(cellMarked));
}

// * GameController


function resetCheckCells(result, count) {
    result = [];
    count = 0;
    return { result, count };
}

function displayWinner(result, isWinner) {
    console.log(`Voici le resultat ${result}`);
    markWinningCells(result);
    freeseScreen();
    isWinner = !isWinner;
    return { __return: isWinner, isWinner };
}

// [] UI
const markWinningCells = function(result) {
    result.forEach(cell => Dom.cells[cell - 1].style.backgroundColor = 'red');
}

// [] UI
const freeseScreen = function(){
    Dom.cells.forEach(cell => {
        cell.marqued = true;
        cell.classList.remove('cell-hover')
    });
}

// bloc GameRule
const changeIsPlaying = function(playerObj){
    playerObj.isPlaying = !playerObj.isPlaying;
}

// bloc GameRule
const verifyWinner = function(secretCode, test, isWinner){
    let count = 0;
    let arr = [...secretCode];
    let result = []
    let cellsId = [...test].sort();
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            
            if(cellsId.includes(arr[i][j])){
                console.log(`${arr[i][j]} is included`);
                result.push(arr[i][j]);
                count++;
            }
        }
        // ? if 3 in a row return isWinner else next line check...
        if(count === 3){
            let __return;
            ({ __return, isWinner } = displayWinner(result, isWinner));
            return __return;
        } else {
            ({ result, count } = resetCheckCells(result, count));
        }
}
return isWinner;
}


let players = [];
initGame();

// [] UI Controller

Dom.resetBtn.addEventListener('click', function(e){
    initGame();
})



Dom.cells.forEach(cell => {
    cell.addEventListener('click', function(e){
        // ? if Game is not over 
    if(e.target.marqued === false && !isGameOver){
        // console.log(e.target,`${e.target.getAttribute('data-id')}` );
        e.target.classList.remove('cell-hover');
        // ? check What player have to play 
        const indexActivePlayer = checkActivePlayer(players);
        console.log(indexActivePlayer);

        // ? chooses the symbol to use
        e.target.textContent = players[indexActivePlayer].symbol;

        // ? stores cell played by player
        storeCell(e, indexActivePlayer);
        console.log(players[indexActivePlayer].combo)

        // ? Verifies if the active player won if yes Game is Over
        console.log(verifyWinner(winningCombo,players[indexActivePlayer].combo,players[indexActivePlayer].isWinner))
        if(verifyWinner(winningCombo,players[indexActivePlayer].combo,players[indexActivePlayer].isWinner)){
            isGameOver = verifyWinner(winningCombo,players[indexActivePlayer].combo,players[indexActivePlayer].isWinner);
            Dom.title.textContent = `${players[indexActivePlayer].name} won`
        }

        // ? toggles Active player
        players.forEach( player => changeIsPlaying(player));
        e.target.marqued = true;
    }
    });
})



