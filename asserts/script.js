// pages
const mainPage = document.getElementsByClassName("mainpage")[0];
const choosingMark = document.getElementsByClassName("playersmark")[0];
const gamingPage = document.getElementsByClassName("game")[0];
const resultPage = document.getElementsByClassName("result")[0];





// buttons
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
let isHuman = false;
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

const isGameOver = (x) => {
    let isWin = false;
        let checkWin = ['','',''];
        for (let pattern of possibleWins) {
            if (pattern[0] === x ||pattern[1] === x || pattern[2] === x ) {
                for (let i = 0; i < pattern.length; i++) {
                    checkWin[i] = values[pattern[i]];
                }
            
                if (checkWin[0] !== '' || checkWin[1] !== '' || checkWin[2] !== '') {
                    if (checkWin[0] === checkWin[1] && checkWin[1] === checkWin[2]) {
                        view(resultPage);
                        gamingPage.classList.remove("hide");
                        if (values[x] === 'X') {
                            resultDisplay.innerHTML = "&#127881 X wins &#127881";
                            xWins++;
                            
                        }
                        else {
                            resultDisplay.innerHTML = "&#127881 O wins &#127881";
                            oWins++;
                            
                        }
                        isWin = true;
                    }
                    else {
                        if (countMarked ===  9 && !isWin) {
                            view(resultPage);
                            gamingPage.classList.remove("hide");
                            resultDisplay.innerHTML = "&#127881 Tie &#127881";
                            tie++;
                            isWin = true;
                        }
                    }
                }
                
            }
            
        }
        console.clear();
        console.log(`X : ${xWins} => O : ${oWins} => tie : ${tie}`);
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
            isGameOver(i);
           }
        });
    }
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
} 

const nextMove = () => {
    let available = availableSpots(values);
    let i = available[Math.floor((Math.random() * available.length))];
    if (xTurn) {
        marking(i,'X');
        xTurn = false;
    }
    else {
        marking(i,'O');
        xTurn = true;
    }
    countMarked++;
    isGameOver(i);
}

const singlePlayer = () => {
    
    view(gamingPage);
    if (!isHuman) {
        nextMove();
        isHuman = true;
        xTurn = false;
    }
    if (isHuman) {
        for (let i = 0; i < box.length; i++) {
            box[i].addEventListener('click', () => {
               if (values[i] === '') {
                if (xTurn) {
                    marking(i,'X');
                    xTurn = false;
                }
                else {
                    marking(i,'O');
                    xTurn = true;
                }
                countMarked++;
                isGameOver(i);
                if (!isGameOver(i)) {
                    nextMove();
                }
                
               }
            });
        }
    }
}

multiplayerButton.addEventListener('click',multiPlayer);
singlePlayer();




