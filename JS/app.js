console.log('Serving ...');


const Dom = {
    cells: document.querySelectorAll('.cell')
    
}

// Private Data


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

class player {
    constructor(name, isPlaying, symbol, combo, isWinner){
        this.name = name;
        this.isPlaying = isPlaying;
        this.symbol = symbol;
        this.combo = combo;
        this.isWinner = isWinner;
    }
}
let isGameOver = false;



// functions helpers controllers

const initGame = function() {
    initialiseCells();
    
    players = [];
    players.push(new player('playerOne', true, 'X', [], false))
    players.push(new player('playerTwo', false, 'O', [], false))
}

const initialiseCells = function() {
    Dom.cells.forEach(cell => {
        cell.marqued = false;
        cell.textContent = ''
    });
}
const checkActivePlayer = function(players){
    let indexFound = players.findIndex(player => player.isPlaying === true);
    return indexFound;
}

const changeIsPlaying = function(playerObj){
    playerObj.isPlaying = !playerObj.isPlaying;
}

const storeCell = function(e, indexActivePlayer) {
    let cellMarked = e.target.getAttribute('data-id');
    players[indexActivePlayer].combo.push(parseInt(cellMarked));
}
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
        console.log(`Voici le resultat ${result}`);
        isWinner = !isWinner;
        return isWinner;
        } else {
        result = [];
        count = 0;
        }
}
return isWinner;
}


let players = [];
initGame();

// UI Controller
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
            players[indexActivePlayer].combo.forEach(num => cells[num].style.color = 'white')
        }

        // ? toggles Active player
        players.forEach( player => changeIsPlaying(player));
        e.target.marqued = true;
    }
    });
})

