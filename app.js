const canvas = document.querySelector("#jsCanvas");
let painting = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
}
function onMouseDown() {
  painting = true;
}
function onMouseUp() {
  painting = false;
}
function stopPaint() {
  painting = false;
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPaint);
}
