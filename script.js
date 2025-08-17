// elements
const censor = document.getElementById("censor");
const target = document.getElementById("target");

// initial sizes and positions
let x = 200;
let y = 200;
censor.style.width = "140px";
censor.style.height = "60px";
censor.style.left = x + "px";
censor.style.top = y + "px";

target.style.width = "80px";
target.style.height = "80px";
target.style.left = "110px";
target.style.top = "350px";

// move censor with mouse click
document.addEventListener("click", (e) => {
    x = e.clientX - censor.offsetWidth / 2;
    y = e.clientY - censor.offsetHeight / 2;
    censor.style.left = x + "px";
    censor.style.top = y + "px";
});
