//Declaration
const canvas = document.querySelector("#jsCanvas");
const colors = document.querySelectorAll(".controls__colorSet");
const ctx = canvas.getContext("2d");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");
let painting = false;
let filling = false;
const INITIAL_COLOR = "#1e2022";
//Configuration
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

//Functions
function stopPaint() {
  painting = false;
}
function startPaint() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!filling) {
    if (!painting) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function handleBrushWidth(event) {
  ctx.lineWidth = event.target.value;
}
function handleMode(event) {
  if (!filling) {
    filling = true;
    mode.innerText = "STROKE";
  } else {
    filling = false;
    mode.innerText = "FILL";
  }
}
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
function handleCM(event) {
  event.preventDefault();
}
function handleSave() {
  const image = canvas.toDataURL("img");
  const link = document.createElement("a");
  link.href = image;
  link.download = "canvasexport";
  link.click();

  // canvas.toBlob(blob => {
  //   link.download = "paintJS";
  //   link.href = URL.createObjectURL(blob);
  //   link.click();
  // }); Using blob object
}
//Initiate
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPaint);
  canvas.addEventListener("mouseup", stopPaint);
  canvas.addEventListener("mouseleave", stopPaint);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
if (range) {
  range.addEventListener("input", handleBrushWidth);
}
if (mode) {
  mode.addEventListener("click", handleMode);
}
if (save) {
  save.addEventListener("click", handleSave);
}
Array.from(colors).forEach(colorSet => {
  const colorset = Array.from(colorSet.children);
  colorset.forEach(color => {
    color.addEventListener("click", handleColorClick);
  });
});
