const scoreBoard = document.getElementById('score');
const timeLeft = document.getElementById('timeLeft')
const startButton = document.getElementById('startGame');
const pauseButton = document.getElementById('pauseGame');
const squares = document.querySelectorAll('.square');
const gridLayout = document.querySelector('.grid');
let lastMole;
let hitPosition = null;
let score = 0;
let timeLeftInital = 60;
let moleInterval = null;
let timeInterval = null;
let gameMusic = new Audio('Assets_gameMusic.mp3');
let hitMusic = new Audio('Assets_hitMusic.mp3');


function randomMole() {
    const randomIndex = Math.floor(Math.random() * squares.length);
    squares.forEach(square => {
        square.classList.remove('mole')
    })
    const mole = squares[randomIndex];
    if (mole === lastMole) {
        return randomMole()
    }
    lastMole = mole;
    hitPosition = mole.id
    return mole.classList.add('mole')
}

function countDown() {
    timeLeftInital--;
    timeLeft.textContent = `Time Left: ${timeLeftInital}`;
    if (timeLeftInital === 0) {
        gridLayout.style.display = 'none';
        pauseButton.style.display = 'none';
        gameMusic.pause();
        clearInterval(moleInterval);
        clearInterval(timeInterval);
    }
}




function startGame() {
    pauseButton.style.display = 'inline-block';
    gridLayout.style.display = 'flex';
    score = 0;
    timeLeftInital = 60;
    scoreBoard.textContent = `Your Score: ${score}`;
    timeLeft.textContent = `Time Left: ${timeLeftInital}`;
    pauseButton.textContent = 'Pause';
    gameMusic.play()
    if (moleInterval) clearInterval(moleInterval); // clear previous interval if exists
    if (timeInterval) clearInterval(timeInterval);
    moleInterval = setInterval(randomMole, 1000)
    timeInterval = setInterval(countDown, 1000)
}

function pauseGame() {
    if (pauseButton.textContent === 'Pause') {
        gameMusic.pause();
        clearInterval(timeInterval);
        clearInterval(moleInterval);
        timeInterval = null;
        moleInterval = null;
        pauseButton.textContent = 'Resume';
    }
    else {
        moleInterval = setInterval(randomMole, 1000)
        timeInterval = setInterval(countDown, 1000)
        pauseButton.textContent = 'Pause'
        gameMusic.play()

    }

}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (timeInterval !== null) {
            if (square.id === hitPosition) {
                score++;
                hitMusic.play();
                setTimeout(() => {
                    hitMusic.pause();
                }, 1000);
                scoreBoard.textContent = `Your Score: ${score}`;
                hitPosition = null
            }
        }
    })
})

startButton.addEventListener('click', startGame);

pauseButton.addEventListener('click', pauseGame);