const scores = {
    home: 0,
    guest: 0
};

let totalSeconds = 0;
let timerRunning = false;
let timerInterval = null;

function formatTime(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTimer() {
    document.getElementById('timer').textContent = formatTime(totalSeconds);
    updateQuarter();
}

function updateQuarter() {
    const minutes = totalSeconds / 60;
    let quarter;
    if (minutes < 12) quarter = 1;
    else if (minutes < 24) quarter = 2;
    else if (minutes < 36) quarter = 3;
    else quarter = 4;
    document.getElementById('quarter').textContent = quarter;
}

function startGame() {
    if (!timerRunning && totalSeconds === 0) {
        startTimer();
    }
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        timerInterval = setInterval(() => {
            if (totalSeconds < 2880) { // 48 minutes max
                totalSeconds++;
                updateTimer();
            } else {
                clearInterval(timerInterval);
                timerRunning = false;
            }
        }, 1000);
    }
}

function timeOut() {
    if (timerRunning) {
        clearInterval(timerInterval);
        timerRunning = false;
    }
}

function resumeTimer() {
    if (!timerRunning && totalSeconds < 2880) {
        startTimer();
    }
}

function addPoints(team, points) {
    scores[team] += points;
    document.getElementById(`${team}-score`).textContent = scores[team];
    updateHighlights();
}

function updateHighlights() {
    const homePanel = document.getElementById('home-panel');
    const guestPanel = document.getElementById('guest-panel');

    homePanel.classList.remove('winning', 'losing');
    guestPanel.classList.remove('winning', 'losing');

    if (scores.home > scores.guest) {
        homePanel.classList.add('winning');
        guestPanel.classList.add('losing');
    } else if (scores.guest > scores.home) {
        guestPanel.classList.add('winning');
        homePanel.classList.add('losing');
    }
}

function newGame() {
    // Reset scores
    scores.home = 0;
    scores.guest = 0;
    document.getElementById('home-score').textContent = '0';
    document.getElementById('guest-score').textContent = '0';

    // Reset highlights
    const homePanel = document.getElementById('home-panel');
    const guestPanel = document.getElementById('guest-panel');
    homePanel.classList.remove('winning', 'losing');
    guestPanel.classList.remove('winning', 'losing');

    // Reset timer
    clearInterval(timerInterval);
    timerRunning = false;
    totalSeconds = 0;
    updateTimer();
}

// Initialize
updateTimer();