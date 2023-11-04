const mainPage = document.getElementsByClassName("mainpage")[0];
const gamingPage = document.getElementsByClassName("game")[0];
const resultPage = document.getElementsByClassName("result")[0];

const singlePlay = document.getElementsByClassName("singleplay")[0];
const multiPlay = document.getElementsByClassName("multiplay")[0];
const restart = document.getElementsByClassName("restart")[0];
const exit = document.getElementsByClassName("exit")[0];
const playAgain = document.getElementsByClassName("playAgain")[0];
const newGame = document.getElementsByClassName("Newgame")[0];

const playCheck = false;

const openCheck = [mainPage,gamingPage,resultPage];
const view = (page) => {
    for(let i=0;i<openCheck.length;i++) {
        if(openCheck[i] === page){
            openCheck[i].classList.remove("hide");
        }
        else {
            openCheck[i].classList.add("hide");
        }
    }
}
view(resultPage);

const play = (isSinglePLay) => {
    view(gamingPage);
    playCheck = isSinglePLay;
}

const exitToMainPage = () => {
    view(mainPage);
}

const continueTogamePage = () => {
    view(gamingPage);
}

singlePlay.addEventListener('click',play(true));
multiPlay.addEventListener('click',play(false));
exit.addEventListener('click',exitToMainPage);
newGame.addEventListener('click',exitToMainPage);
