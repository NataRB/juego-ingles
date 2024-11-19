const validUsername = 'admin1';
const validPassword = '1234';
let currentLevel = 1;
let attempts = 0;
const maxAttempts = 2;

document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('game-container').style.display = 'block';
        document.getElementById('level-1').style.display = 'block';
        document.getElementById('game-container').classList.add('fade-in-up');
    } else {
        document.getElementById('error-message').style.display = 'block';
        document.getElementById('login-container').classList.add('shake');
        setTimeout(() => {
            document.getElementById('login-container').classList.remove('shake');
        }, 500);
    }
});

function checkAnswer(level, selectedAnswer) {
    const correctAnswers = [
        'fewer', // Level 1
        'less', // Level 2
        'fewer', // Level 3
        'less/faster', // Level 4
        'as cold as', // Level 5
        'as well as', // Level 6
        'as difficult as', // Level 7
        'as fast as' // Level 8
    ];
    const correctAnswer = correctAnswers[level - 1];

    if (selectedAnswer === correctAnswer) {
        currentLevel++;
        attempts = 0;
        updateProgress();
        if (level === 4) {
            showMidGameModal();
        } else if (level < 8) {
            showNextLevel(level);
        } else {
            showResult();
        }
    } else {
        attempts++;
        if (attempts >= maxAttempts) {
            gameOver();
        } else {
            showErrorAlert();
        }
    }
}

function showNextLevel(currentLevel) {
    document.getElementById(`level-${currentLevel}`).style.display = 'none';
    document.getElementById(`level-${currentLevel + 1}`).style.display = 'block';
    document.getElementById(`level-${currentLevel + 1}`).classList.add('fade-in-up');
}

function showResult() {
    // Ocultar todos los niveles
    for (let i = 1; i <= 8; i++) {
        document.getElementById(`level-${i}`).style.display = 'none';
    }

    // Mostrar el resultado
    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';

    // Animar la barra de progreso
    const progressBar = document.getElementById('final-progress');
    progressBar.style.width = '0%';
    setTimeout(() => {
        progressBar.style.width = '100%';
    }, 100);

    // Añadir clase para la animación de aparición
    resultElement.classList.add('fade-in-up');
}

function updateProgress() {
    const progress = document.getElementById('progress');
    const newWidth = ((currentLevel - 1) / 8) * 100;
    progress.style.width = newWidth + '%';
}

function showErrorAlert() {
    const errorAlert = document.createElement('div');
    errorAlert.classList.add('error-alert');
    errorAlert.innerHTML = `<p>Incorrect answer. You have ${maxAttempts - attempts} attempts left.</p>`;
    document.body.appendChild(errorAlert);

    setTimeout(() => {
        errorAlert.classList.add('show');
    }, 10);

    setTimeout(() => {
        errorAlert.classList.remove('show');
        setTimeout(() => {
            errorAlert.remove();
        }, 300);
    }, 3000);
}

function gameOver() {
    document.getElementById('game-container').style.display = 'none';
    const gameOverAlert = document.createElement('div');
    gameOverAlert.classList.add('error-alert');
    gameOverAlert.innerHTML = `
        <p>GAME OVER! You have used all your attempts.</p>
        <button id="restart-button">Restart Game</button>
    `;
    document.body.appendChild(gameOverAlert);

    document.getElementById('restart-button').addEventListener('click', restartGame);

    setTimeout(() => {
        gameOverAlert.classList.add('show');
    }, 10);
}

function restartGame() {
    currentLevel = 1;
    attempts = 0;
    updateProgress();
    document.getElementById('result').style.display = 'none';
    document.getElementById('level-1').style.display = 'block';
    document.getElementById('level-1').classList.add('fade-in-up');
    document.getElementById('game-container').style.display = 'block';
    
    // Hide all levels except the first one
    for (let i = 2; i <= 8; i++) {
        document.getElementById(`level-${i}`).style.display = 'none';
    }
    
    // Remove any existing game over alert
    const existingAlert = document.querySelector('.error-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
}

function closeModal() {
    document.getElementById('instructions-modal').style.display = 'none';
}

function showMidGameModal() {
    document.getElementById('mid-game-modal').style.display = 'block';
}

function closeMidGameModal() {
    document.getElementById('mid-game-modal').style.display = 'none';
    showNextLevel(4);
}

// Show the instructions modal when the page loads
window.onload = function() {
    document.getElementById('instructions-modal').style.display = 'block';
};