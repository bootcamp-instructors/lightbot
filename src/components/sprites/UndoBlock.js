
import { Line, Arc } from 'react-konva'
import { blockSize, colors } from '../../data'

export default function UndoBlock({ x, y, clickFunc }) {
    return (
        <>
            <Line
                points={[x + 10, y + 26, x + 27, y  + 27]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + 10, y + 26, x +10, y  + 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Arc
                onClick={clickFunc}
                x={x + blockSize / 2}
                y={y + blockSize / 2}
                innerRadius={(blockSize / 2) - 10}
                outerRadius={(blockSize / 2) - 14}
                angle={250}
                rotationDeg={-160}
                fill={'black'}
                lineJoin={'round'}
                lineCap={'round'}
                stroke={'black'}
                strokeWidth={4}
            />
        </>
    )
}

