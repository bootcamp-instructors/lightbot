import { Line } from 'react-konva'
import { blockSize } from '../../data'
export default function ForwardBlock({ x, y, clickFunc }) {
    return (
        <>
            <Line
                points={[x + (blockSize / 2), y + 10, x + (blockSize / 2) + 15, y + 25]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + (blockSize / 2), y + 10, x + (blockSize / 2) - 15, y + 25]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + (blockSize / 2), y + 10, x + (blockSize / 2), y - 10 + blockSize]}
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
