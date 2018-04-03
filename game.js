const gameBoardDiv = document.querySelector('#gameBoard');
const optionsBoard = document.querySelector('#options');
const clickedLightOutput = document.querySelector('#clickedLightOutput');
const clickCounterOutput = document.querySelector('#clickCounterOutput');
const mainHeader = document.querySelector('#mainHeader');
const messageHeader = document.querySelector('#messageHeader');

let amountOfCreatedLights;
let difficulty;
let points = 0;

const colors = [
    {
        color:'red',
        code: 'rgb(255, 0, 0)',
        points: 10
    },
    {
        color:'yellow',
        code: 'rgb(255, 255, 0)',
        points: 20
    },
    {
        color:'slategray',
        code: 'rgb(112, 128, 144)',
        points: 30
    },
    {
        color:'blue',
        code: 'rgb(0, 0, 255)',
        points: 40
    },
    {
        color: 'cyan',
        code: "rgb(0, 255, 255)",
        points: 50
    }
];

const clickCounter = {};
let interval;

const highscores = [
    {
        difficulty: 'Easy',
        score: 0
    },
    {
        difficulty: 'Medium',
        score: 0
    },
    {
        difficulty: 'Hard',
        score: 0
    },
    {
        difficulty: 'Expert',
        score: 0
    }
];

const setupButtonListeners = () => {
    const buttons = document.querySelectorAll('.button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', () => {
            difficulty = buttons[i].innerHTML;
            initGame();
        });
    }
};

const startGame = () => {
    const lights = document.querySelectorAll('.light');
    interval = setInterval( () => {
        const numberOfRandomLight = Math.floor(Math.random() * lights.length);
        const numberOfRandomColor = Math.floor(Math.random() * colors.length);
        for (let i = 0; i < lights.length; i++) {
            lights[i].style.backgroundColor = 'black';
        }
        lights[numberOfRandomLight].style.backgroundColor = colors[numberOfRandomColor].color;
    }, getDifficulty(difficulty)[0]);
};

const getLightColor = (lightNumber) => {
    const lights = document.querySelectorAll('.light');
    return window.getComputedStyle(lights[lightNumber], null).getPropertyValue('background-color');
};

const checkHighscore = () => {
    for (let i = 0; i < highscores.length; i++) {
        if (highscores[i].difficulty === difficulty && points > highscores[i].score) {
            highscores[i].score = points;
        }
    }
    localStorage.setItem('scores', JSON.stringify(highscores));
};

const gameOver = () => {
    checkHighscore();
    mainHeader.innerHTML = 'GAME OVER';
    messageHeader.innerHTML = 'You scored '+points+' points! Play Again?';
    clearInterval(interval);
    clickedLightOutput.innerHTML = '';
    clickCounterOutput.innerHTML = '';
    optionsBoard.style.display = 'block';
    gameBoardDiv.classList.add('behind');
    points = 0;
};

const setPoints = () => {
    const pointsDisplay = document.querySelector('#pointsOutput');
    pointsDisplay.innerHTML = points;
};

const setHighscore = () => {
    const highscoreOutput = document.querySelector('#highscoreOutput');
    if (localStorage.getItem('scores') !== null) {
        const savedHighscores = JSON.parse(localStorage.getItem('scores'));
        for (let i = 0; i < savedHighscores.length; i++) {
            if (savedHighscores[i].difficulty === difficulty) {
                highscoreOutput.innerHTML = savedHighscores[i].score;
            }
        }
    }
};

const setUpLightListeners = () => {
    console.log('setUpLightListeners');
    const lights = document.querySelectorAll('.light');
    for (let i = 0; i < lights.length; i++) {
        const name = 'light'+i;
        lights[i].addEventListener('click', () => {
           clickedLightOutput.innerHTML = 'Klikkasit valoa ' + (i+1);
           clickCounter[name]++;
           const str = JSON.stringify(clickCounter);
           clickCounterOutput.innerHTML = str.replace(/["{}]+/g, ' ');
           if (getLightColor(i) !== 'rgb(0, 0, 0)') {
               for (let j = 0; j < colors.length; j++) {
                   if (colors[j].code === getLightColor(i)) {
                       points += colors[j].points;
                       break;
                   }
               }
           } else {
               gameOver();
           }
           lights[i].style.backgroundColor = 'black';
           console.log(points);
           setPoints();
        });
        clickCounter[name] = 0;
    }
};

const getDifficulty = (difficulty) => {
    switch (difficulty) {
        case 'Easy':
            return [1000, 3];
        case 'Medium':
            return [600, 3];
        case 'Hard':
            return [500, 4];
        case 'Expert':
            return [300, 4];
    }
};

const createLights = () => {
    for (let i = 0; i < getDifficulty(difficulty)[1]; i++) {
        gameBoardDiv.innerHTML += '<div class="light" id="light'+i+'"></div>';
        amountOfCreatedLights++;
    }
};

const removeElementsByClass = (className) => {
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
};

const initGame = () => {
    setHighscore();
    gameBoardDiv.style.display = 'flex';
    gameBoardDiv.classList.remove('behind');
    removeElementsByClass('light');
    createLights();
    setUpLightListeners();
    console.log(clickCounter);
    optionsBoard.style.display = 'none';
    startGame();
};

setupButtonListeners();