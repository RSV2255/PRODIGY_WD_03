
const mainPage = document.getElementsByClassName("mainpage")[0];
const choosingMark = document.getElementsByClassName("playersmark")[0];
const gamingPage = document.getElementsByClassName("game")[0];
const resultPage = document.getElementsByClassName("result")[0];






const singleplayerButton = document.getElementsByClassName("singleplay")[0];
const multiplayerButton = document.getElementsByClassName("multiplay")[0];

const pickX = document.getElementsByClassName("pick_X")[0];
const pickO = document.getElementsByClassName("pick_O")[0];

const startGameButton = document.getElementsByClassName("startGame")[0];
const backButton = document.getElementsByClassName("back")[0];

const box = document.getElementsByClassName("square");
const restartButton = document.getElementsByClassName("restart")[0];
const exit = document.getElementsByClassName("exit")[0];

const playAgainButton = document.getElementsByClassName("playAgain")[0];
const newGameButton = document.getElementsByClassName("Newgame")[0];

const resultDisplay = document.getElementsByClassName("finalResult")[0];

const xScore = document.getElementsByClassName("X_score")[0];
const oScore = document.getElementsByClassName("O_score")[0];
const tieScore = document.getElementsByClassName("tie_score")[0];

const pages = [mainPage, choosingMark, gamingPage, resultPage];
const possibleWins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let values = ['','','','','','','','',''];

let xTurn = true;
let countMarked = 0;
let xWins = 0;
let oWins = 0;
let tie = 0;
let isHuman = true;
let ai;
let human;
let winner = null;
const scores = {
    'X':1,
    'O':-1,
    'tie':0
}
const view = (page) => {
    for (let x of pages) {
        if(x === page) {
            x.classList.remove("hide");
        }
        else {
            x.classList.add("hide");
        }
    }
}

const updateScoreBoard = () => {
    switch(winner) {
        case 'X':
            xWins++;
            break;
        case 'O':
            oWins++;
            break;
        case 'tie':
            tie++;
            break;
    }
    xScore.innerHTML = xWins;
    oScore.innerHTML = oWins;
    tieScore.innerHTML = tie;
}

const resetGameBoard = () => {
    values = ['','','','','','','','',''];
    xTurn = true;
    countMarked = 0;
    xWins = 0;
    oWins = 0;
    tie = 0;
}

const isGameOver = () => {
    winner = null;
    let isWin = false;
        let checkWin = ['','',''];
        for (let pattern of possibleWins) {
             
                for (let i = 0; i < pattern.length; i++) {
                    checkWin[i] = values[pattern[i]];
                }
                if (checkWin[0] !== '' || checkWin[1] !== '' || checkWin[2] !== '') {
                    if (checkWin[0] === checkWin[1] && checkWin[1] === checkWin[2]) {
                        view(resultPage);
                        gamingPage.classList.remove("hide");
                        isWin = true;
                        if (checkWin[0] === 'X') {
                            winner = 'X';
                            resultDisplay.innerHTML = "&#127881 X wins &#127881";
                            break;
                        }
                        else {
                            winner = 'O';
                            resultDisplay.innerHTML = "&#127881 O wins &#127881";
                            break;
                        }
                    }
                    else {
                        if (countMarked ===  9) {
                            winner = 'tie';
                            view(resultPage);
                            gamingPage.classList.remove("hide");
                            resultDisplay.innerHTML = "&#127881 Tie &#127881";
                            isWin = true;
                        }
                    }
                    
                }
                else {
                    break;
                }
            
        }
    
    updateScoreBoard();
    return isWin;
}

const multiPlayer = () => {
    view(gamingPage);
    for (let i = 0; i < box.length; i++) {
        box[i].addEventListener('click', () => {
           if (values[i] === '') {
            if (xTurn) {
                xTurn = false;
                box[i].classList.add("X");
                values[i] = 'X';
            }
            else {
                xTurn = true;
                box[i].classList.add("O");
                values[i] = 'O';
            }
            countMarked++;
            isGameOver();
            
           }
        });
    }
}
const xPicked = () => {
    isHuman = true;
    human = 'X';
    ai = 'O';
    singlePlayer();
}
const oPicked = () => {
    isHuman = false;
    human = 'O';
    ai = 'X';
    singlePlayer();
}
const availableSpots = (filled) => {
    let available = [];
    for (let x = 0; x < filled.length; x++) {
        if (filled[x] === '') {
            available.push(x);
        }
    }
    return available;
}

const marking = (i,value) => {
    box[i].classList.add(value);
    values[i] = value;
    countMarked++;
}
const isWinner = () => {
    winner = null;
        let checkWin = ['','',''];
        for (let pattern of possibleWins) {
                for (let i = 0; i < pattern.length; i++) {
                    checkWin[i] = values[pattern[i]];
                }
            if (checkWin[0] !== '' && checkWin[1] !== '' && checkWin[2] !== '') {
                if (checkWin[0] === checkWin[1] && checkWin[1] === checkWin[2]) {
                    
                    if (checkWin[0] === 'X') {
                        winner = 'X';
                    }
                    else {
                        winner = 'O';
                    }
                }
                else {
                    if (countMarked ===  9) {
                        winner = 'tie';      
                    }
                }
            }
        }
        return winner;
}
const aiMove = (values,isAi,depth,spot) => {
    const emptyBoxes = availableSpots(values);
    if((spot !== null ))  {
        let score = scores[spot];
        return score;
    }
    if(isAi) {
        let spot = isWinner();
        let maxEval = -Infinity;
        for(let x of emptyBoxes) {
            values[x] = ai;
            let eval = aiMove(values,false,depth--,spot);
            values[x] = '';
            if(eval > maxEval) {
                maxEval = eval;
            }
        }
        return maxEval;
    }
    else {
        let spot = isWinner();
        let minEval = Infinity;
        for(let x of emptyBoxes) {
            values[x] = human;
            
            let eval = aiMove(values,true,depth--, spot);
            values[x] = '';
            if(eval < minEval) {
                minEval = eval;
            }
        }
        return minEval;
    }
}

const firstMove = () => {
    let i;
    let available = availableSpots(values);
    if (countMarked < 0) {
        i = available[Math.floor((Math.random() * available.length))];
    }
    else {
        // i = available[0];
        let spot = isWinner();
        let maxEval = -Infinity;
        for(let x of available) {
            values[x] = ai;
            let eval = aiMove(values,false,countMarked++,spot);
            values[x] = '';
            if(eval > maxEval) {
                maxEval = eval;
                i = x;
            }
        }
    }
    marking(i,ai);
    isGameOver();
}

const singlePlayer = () => {
    view(gamingPage);
    if (!isHuman) {
        firstMove();
        isHuman = true;
    }
    if (isHuman) {
        for (let i = 0; i < box.length; i++) {
            box[i].addEventListener('click', () => {
               if (values[i] === '') {
                    marking(i,human);
                    if(!isGameOver()) {
                        firstMove();
                    }
               }
            });
        }
    }
}
pickO.addEventListener('click',oPicked);
pickX.addEventListener('click',xPicked);
singleplayerButton.addEventListener('click',()=> {view(choosingMark);});
multiplayerButton.addEventListener('click',multiPlayer);




