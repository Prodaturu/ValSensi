const calibrationArea = document.querySelector('.calibration-area');
const movementReadout = document.querySelector('.movement-readout');

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
