const calibrationArea = document.querySelector('.calibration-area');
const movementReadout = document.querySelector('.movement-readout');
const pointerLockStatus = document.querySelector('.pointer-lock-status');
const fullscreenStatus = document.querySelector('.fullscreen-status');
const fullscreenButton = document.querySelector('.fullscreen-button');

let cumulativeX = 0;
let cumulativeY = 0;

calibrationArea.addEventListener('mousemove', (event) => {
  const { movementX, movementY } = event;

  cumulativeX += movementX;
  cumulativeY += movementY;
  movementReadout.textContent = `movementX: ${movementX}
movementY: ${movementY}
cumulativeX: ${cumulativeX}
cumulativeY: ${cumulativeY}`;
});

calibrationArea.addEventListener('click', () => {
  calibrationArea.requestPointerLock();
});

document.addEventListener('pointerlockchange', () => {
  const isLocked = document.pointerLockElement === calibrationArea;
  pointerLockStatus.textContent = `Pointer Lock: ${isLocked ? 'ON' : 'OFF'}`;
});

fullscreenButton.addEventListener('click', (event) => {
  event.stopPropagation();
  document.body.requestFullscreen();
});

document.addEventListener('fullscreenchange', () => {
  const isFullscreen = document.fullscreenElement === document.body;
  fullscreenStatus.textContent = `Fullscreen: ${isFullscreen ? 'ON' : 'OFF'}`;
});
