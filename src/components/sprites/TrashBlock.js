
import { Line, Rect } from 'react-konva'
import { blockSize, colors } from '../../data'

export default function TrashBlock({ x, y, clickFunc }) {
    return (
        <>
            <Line
                points={[x + (blockSize / 2) - 2, y + 10, x+ (blockSize / 2) + 2, y + 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + 20, y + 12, x + blockSize - 20, y + 12]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + 10, y + 20, x + 20, y + blockSize - 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + blockSize - 10, y + 20, x + blockSize - 20, y + blockSize - 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + 20, y + blockSize - 10, x + blockSize - 20, y + blockSize - 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
        </>
    )
}

