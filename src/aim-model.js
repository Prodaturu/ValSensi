// Physical calibration avoids assuming browser movementX equals hardware DPI counts.
export function pixelsPerMovementUnit({width, fovDegrees, cmPer360, movementUnitsPerCm}) {
  const focal = width / (2 * Math.tan((fovDegrees * Math.PI / 180) / 2));
  const radiansPerUnit = (2 * Math.PI) / (cmPer360 * movementUnitsPerCm);
  return focal * radiansPerUnit;
}

export function projectAim(angle, movement, {width, height, fovDegrees, cmPer360, movementUnitsPerCm}) {
  const focal = width / (2 * Math.tan(fovDegrees * Math.PI / 360));
  const radiansPerUnit = 2 * Math.PI / (cmPer360 * movementUnitsPerCm);
  const horizontalAngle = angle.x + movement.dx * radiansPerUnit;
  const verticalAngle = angle.y + movement.dy * radiansPerUnit;
  const limit = fovDegrees * Math.PI / 360;
  return {
    x: width / 2 + focal * Math.tan(Math.max(-limit, Math.min(limit, horizontalAngle))),
    y: Math.max(0, Math.min(height, height / 2 + focal * Math.tan(Math.max(-limit, Math.min(limit, verticalAngle))))),
    angle: {x: horizontalAngle, y: verticalAngle},
  };
}
