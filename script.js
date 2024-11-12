const validUsername = 'admin1';
const validPassword = '1234';
let currentLevel = 1;
let attempts = 0; // Contador de intentos por nivel
const maxAttempts = 2; // Máximo de intentos permitidos

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
        'taller',  // Nivel 1: "My brother is __ than me..."
        'more',    // Nivel 2: "Is my friend __ expert than me?"
        'fewer',  // Nivel 3: "She can't run __ than me"
        'more',    // Nivel 4: "The teacher is __ patient and __ smart than us"
        'richer',  // Nivel 5: "He is __ than me, because he has more money"
        'longer'   // Nivel 6: "Laura's hair is __ than my friend Laura..."
    ];
    const correctAnswer = correctAnswers[level - 1];

    if (selectedAnswer === correctAnswer) {
        currentLevel++;
        attempts = 0; // Reinicia el contador de intentos
        updateProgress();
        if (level < 6) {
            showNextLevel(level);
        } else {
            showResult();
        }
    } else {
        attempts++;
        if (attempts >= maxAttempts) {
            gameOver(); // Llama a la función de Game Over
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
    document.getElementById('level-6').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').classList.add('fade-in-up');
}

function updateProgress() {
    const progress = document.getElementById('progress');
    const newWidth = ((currentLevel - 1) / 6) * 100;
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

    // Añade el evento al botón de reinicio
    document.getElementById('restart-button').addEventListener('click', restartGame);

    setTimeout(() => {
        gameOverAlert.classList.add('show');
    }, 10);

    setTimeout(() => {
        gameOverAlert.classList.remove('show');
        setTimeout(() => {
            gameOverAlert.remove();
        }, 300);
    }, 8000);
}

function restartGame() {
    currentLevel = 1;
    attempts = 0; // Reinicia el contador de intentos
    updateProgress();
    document.getElementById('result').style.display = 'none';
    document.getElementById('level-1').style.display = 'block';
    document.getElementById('level-1').classList.add('fade-in-up');

    // También puedes mostrar el contenedor del juego si estaba oculto
    document.getElementById('game-container').style.display = 'block';
}

// Función para cerrar el modal de instrucciones
function closeModal() {
    document.getElementById('instructions-modal').style.display = 'none';
}

// Función para iniciar el juego
function startGame() {
    closeModal();
    document.getElementById('game-container').style.display = 'block';
}
