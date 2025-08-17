// elements
const censor = document.getElementById("censor");
const target = document.getElementById("target");
const statue = document.querySelector(".statue");
const restartBtn = document.getElementById("restartBtn");
const hud = document.getElementById("hud");

// HUD texts
const GOAL_TEXT = 'Goal: compose “modern art” by placing the black rectangle over the red zone.';
const DONE_TEXT = 'Goal complete — Exhibit unlocked. Click “Curate Again” to reset.';

// state
const START_X = 200;
const START_Y = 200;
let x = START_X;
let y = START_Y;
let covered = false;

// initial sizes and positions
censor.style.width = "140px";
censor.style.height = "60px";
censor.style.left = x + "px";
censor.style.top = y + "px";

target.style.width = "80px";
target.style.height = "40px";
target.style.left = "100px";
target.style.top = "230px";

// move censor with mouse click
document.addEventListener("click", (e) => {
    if(!covered)
    {
        x = e.clientX - censor.offsetWidth / 2;
        y = e.clientY - censor.offsetHeight / 2;
        setPos(x, y);
    }
});

// check if censor fully contains the target
function checkCovered() {
    const c = censor.getBoundingClientRect();
    const t = target.getBoundingClientRect();

    if(c.left <= t.left && c.top <= t.top && c.right >= t.right && c.bottom >= t.bottom)
    {
        covered = true;
        statue.classList.add("covered"); // turn statue black
        // hide target and censor
        target.style.display = "none";
        censor.style.display = "none";
        // goal
        hud.textContent = DONE_TEXT;
    }
}

// restart: remove covered state and reset censor
restartBtn.addEventListener("click", (e) => {
    // prevent censor on mouse position
    e.preventDefault();
    e.stopPropagation();

    covered = false;
    statue.classList.remove("covered");
    x = START_X;
    y = START_Y;
    censor.style.left = x + "px";
    censor.style.top  = y + "px";
    // show target and censor
    target.style.display = "block";
    censor.style.display = "block";
    // goal
    hud.textContent = GOAL_TEXT;
});

// move by keydown
const STEP = 16;

function clamp(n, min, max) {
    return Math.max(min, Math.min(n, max));
}

// set position and clamp to screen size
function setPos(nx, ny) {
    const maxX = window.innerWidth - censor.offsetWidth;
    const maxY = window.innerHeight - censor.offsetHeight;
    x = clamp(nx, 0, maxX);
    y = clamp(ny, 0, maxY);
    censor.style.left = x + "px";
    censor.style.top  = y + "px";

    checkCovered();
}

document.addEventListener("keydown", (e) => {
    // Enter — as click on button
    if (e.key === "Enter") {
        if (!covered || e.repeat) return;

        e.preventDefault();
        document.getElementById("restartBtn")?.click();
        return;
    }

    // stop check for moving
    if (covered) return;

    switch (e.key) {
        case "ArrowUp":    e.preventDefault(); setPos(x, y - STEP); break;
        case "ArrowDown":  e.preventDefault(); setPos(x, y + STEP); break;
        case "ArrowLeft":  e.preventDefault(); setPos(x - STEP, y); break;
        case "ArrowRight": e.preventDefault(); setPos(x + STEP, y); break;
        default: return;
    }
    
});

// if screen is changed
window.addEventListener("resize", () => setPos(x, y));
