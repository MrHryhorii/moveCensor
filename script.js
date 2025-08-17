// elements
const censor = document.getElementById("censor");
const target = document.getElementById("target");
const statue = document.querySelector(".statue");
const restartBtn = document.getElementById("restartBtn");

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
target.style.left = "110px";
target.style.top = "350px";

// move censor with mouse click
document.addEventListener("click", (e) => {
    if(!covered)
    {
        x = e.clientX - censor.offsetWidth / 2;
        y = e.clientY - censor.offsetHeight / 2;
        censor.style.left = x + "px";
        censor.style.top = y + "px";
    }

    checkCovered();
});

// check if censor fully contains the target
function checkCovered() {
    const c = censor.getBoundingClientRect();
    const t = target.getBoundingClientRect();

    if(c.left <= t.left && c.top <= t.top && c.right >= t.right && c.bottom >= t.bottom)
    {
        covered = true;
        statue.classList.add("covered"); // turn statue black
        // hide target area
        target.style.display = "none";
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
    // show target area
    target.style.display = "block";
});
