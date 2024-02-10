import React from 'react'
import { useOnDraw } from '../../hooks/useOnDraw'
import { getDivPositions } from '../../utils';

const Canvas = ({id, color, lineWidth}) => {
    const {setCanvasRef, onMouseDown} = useOnDraw(onDraw);
    const {width, height} = getDivPositions(id);

    function onDraw (data) {
      console.log('data s', data)
      drawLine(data.ctx, data.point, data.prevPoint, color, lineWidth);
    }

    function drawLine(ctx, end, start, color, width) {
      start = start ?? end;
      ctx.beginPath();
      ctx.lineWidth= width;
      ctx.strokeStyle = color;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(start.x, start.y, 1, 0, 2 * Math.PI);
      ctx.fill()
    }

  return (
    <div>
        <canvas 
            width={width}
            height={height}
            style={canvasStyle}
            ref={setCanvasRef}
            onMouseDown={onMouseDown}
        />
    </div>
  )
}

export default Canvas

const canvasStyle={
    border: `1px solid black`,
}