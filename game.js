const amountOfLightsInput = document.querySelector('#numberOfLightsInput');
const gameBoardDiv = document.querySelector('#gameBoard');
const optionsBoard = document.querySelector('#options');
const clickedLightOutput = document.querySelector('#clickedLightOutput');
const clickCounterOutput = document.querySelector('#clickCounterOutput');
let pointsOutput = document.querySelector('#pointsOutput');

let amountOfCreatedLights;
let difficulty;
let points = 0;

const colors = ['red', 'yellow', 'slategray', 'blue', 'cyan', 'indigo'];
const clickCounter = {};
let interval;

const setupButtonListeners = () => {
    console.log(pointsOutput);
    const buttons = document.querySelectorAll('.button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            difficulty = buttons[i].innerHTML;
            initGame();
        });
    }
};

const startGame = () => {
    console.log(pointsOutput);
    const lights = document.querySelectorAll('.light');

    interval = setInterval( () => {
        const numberOfRandomLight = Math.floor(Math.random() * lights.length);
        const numberOfRandomColor = Math.floor(Math.random() * colors.length);
        for (let i = 0; i < lights.length; i++) {
            lights[i].style.backgroundColor = 'black';
        }
        lights[numberOfRandomLight].style.backgroundColor = colors[numberOfRandomColor];
    }, getDifficulty(difficulty));
};

const getLightColor = (lightNumber) => {
    console.log(pointsOutput);
    const lights = document.querySelectorAll('.light');
    return window.getComputedStyle(lights[lightNumber], null).getPropertyValue('background-color');
};

const gameOver = () => {
    console.log(pointsOutput);
    clearInterval(interval);
    clickedLightOutput.innerHTML = '';
    clickCounterOutput.innerHTML = '';
    optionsBoard.style.display = 'flex';
    gameBoardDiv.style.display = 'none';
    console.log('GAME OVER');
};

const setUpLightListeners = () => {
    console.log(pointsOutput);
    const lights = document.querySelectorAll('.light');
    for (let i = 0; i < lights.length; i++) {
        const name = 'light'+i;
        lights[i].addEventListener('click', () => {
           clickedLightOutput.innerHTML = 'Klikkasit valoa ' + (i+1);
           clickCounter[name]++;
           const str = JSON.stringify(clickCounter);
           clickCounterOutput.innerHTML = str.replace(/["{}]+/g, ' ');
           console.log(getLightColor(i));
           if (getLightColor(i) !== 'rgb(0, 0, 0)') {
               points += 10;
           } else {
               points -= 10;
           }
           lights[i].style.backgroundColor = 'black';
           pointsOutput.innerHTML = points;
           if (points < 0) {
               gameOver();
           }
        });
        clickCounter[name] = 0;
    }
};

const createLights = () => {
    console.log(pointsOutput);
    const numberOfLights = amountOfLightsInput.value;
    for (let i = 0; i < numberOfLights; i++) {
        gameBoardDiv.innerHTML += '<div class="light" id="light'+i+'"></div>';
        amountOfCreatedLights++;
    }
};

checkHighscore = () => {

};

const initGame = () => {
    console.log(pointsOutput);
    gameBoardDiv.style.display = 'flex';
    if(amountOfLightsInput.value > 0 && amountOfLightsInput.value < 5){
        createLights();
        setUpLightListeners();
        console.log(clickCounter);
        optionsBoard.style.display = 'none';
        startGame();
    } else {
        alert('Valojen lukumäärän pitää olla 1-4!');
    }
};

const getRandomInt = () => {
    console.log(pointsOutput);
    const random = Math.floor(Math.random() * amountOfCreatedLights);
    return random;
};

const getDifficulty = (difficulty) => {
    console.log(pointsOutput);
    switch (difficulty) {
        case 'Helppo':
            return 1500;
        case 'Keskivaikea':
            return 1000;
        case 'Vaikea':
            return 500;
        case 'Erittäin vaikea':
            return Math.floor(Math.random() * 500) + 100;
    }
};
setupButtonListeners();

pointsOutput.innerHTML = '50';
console.log(pointsOutput);
