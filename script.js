const droplet = document.getElementById('droplet');
const cleanStat = document.getElementById('clean-stat');
const happyStat = document.getElementById('happy-stat');
const activeStat = document.getElementById('active-stat');
const tasks = document.querySelectorAll('#tasks button');

let dropletState = JSON.parse(localStorage.getItem('dropletState')) || {
    clean: 100,
    happy: 100,
    active: 100,
    lastLogin: new Date().toISOString(),
};

function updateStats() {
    cleanStat.textContent = dropletState.clean;
    happyStat.textContent = dropletState.happy;
    activeStat.textContent = dropletState.active;

    if (dropletState.happy > 70) {
        droplet.className = 'happy';
    } else if (dropletState.happy > 40) {
        droplet.className = 'sad';
    } else {
        droplet.className = 'very-sad';
    }
}

function performTask(task) {
    if (task === 'task1') {
        dropletState.clean += 10;
    } else if (task === 'task2') {
        dropletState.active += 10;
    } else if (task === 'task3') {
        dropletState.happy += 10;
    }
    dropletState.clean = Math.min(dropletState.clean, 100);
    dropletState.happy = Math.min(dropletState.happy, 100);
    dropletState.active = Math.min(dropletState.active, 100);
    saveState();
    updateStats();
}

function saveState() {
    dropletState.lastLogin = new Date().toISOString();
    localStorage.setItem('dropletState', JSON.stringify(dropletState));
}

function checkDailyReset() {
    const lastLogin = new Date(dropletState.lastLogin);
    const now = new Date();
    const diff = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));
    if (diff >= 1) {
        dropletState.clean -= diff * 10;
        dropletState.happy -= diff * 10;
        dropletState.active -= diff * 10;
        dropletState.clean = Math.max(dropletState.clean, 0);
        dropletState.happy = Math.max(dropletState.happy, 0);
        dropletState.active = Math.max(dropletState.active, 0);
    }
}

tasks.forEach((button) => {
    button.addEventListener('click', () => performTask(button.id));
});

checkDailyReset();
updateStats();
saveState();
