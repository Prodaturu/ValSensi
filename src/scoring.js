export function classifyShot({origin,target,shot,path},radius=20){
  const errorPx=Math.hypot(shot.x-target.x,shot.y-target.y);
  if(errorPx<=radius)return {outcome:'hit',errorPx};
  const dx=target.x-origin.x,dy=target.y-origin.y,length=Math.hypot(dx,dy);
  if(length<radius*2)return {outcome:'other',errorPx};
  const ux=dx/length,uy=dy/length;
  const along=(shot.x-target.x)*ux+(shot.y-target.y)*uy;
  const lateral=Math.abs((shot.x-target.x)*-uy+(shot.y-target.y)*ux);
  const crossed=path.some(p=>(p.x-target.x)*ux+(p.y-target.y)*uy>radius);
  const outcome=lateral>radius*1.5?'other':along>radius?'overshoot':along< -radius?(crossed?'overshoot':'undershoot'):'other';
  return {outcome,errorPx};
}
export function summarize(shots){
  const count=kind=>shots.filter(s=>s.outcome===kind).length;
  return {shots:shots.length,hits:count('hit'),accuracy:shots.length?Math.round(100*count('hit')/shots.length):0,overshoots:count('overshoot'),undershoots:count('undershoot'),otherMisses:count('other'),pathLength:shots.reduce((sum,s)=>sum+s.path.reduce((n,p)=>n+Math.hypot(p.dx,p.dy),0),0)};
}
