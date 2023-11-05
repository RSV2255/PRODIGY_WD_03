// pages
const mainPage = document.getElementsByClassName("mainpage")[0];
const choosingMark = document.getElementsByClassName("playersmark")[0];
const gamingPage = document.getElementsByClassName("game")[0];
const resultPage = document.getElementsByClassName("result")[0];

mainPage.classList.add("hide");
choosingMark.classList.add("hide");
gamingPage.classList.add("hide");
resultPage.classList.add("hide");


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

const xScore = document.getElementsByClassName("X_score")[0];
const oScore = document.getElementsByClassName("O_score")[0];
const tieScore = document.getElementsByClassName("tie_score")[0];