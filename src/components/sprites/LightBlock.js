import { Line, Circle } from 'react-konva'
import { blockSize, colors } from '../../data'
export default function RightBlock({ x, y, clickFunc }) {
    return (
        <>
            <Line
                points={[x + 24, y + blockSize - 30, x + blockSize - 24, y + blockSize - 30]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={6}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + 25, y + blockSize - 30, x + 25, y + blockSize - 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={6}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + blockSize - 25, y + blockSize - 30, x + blockSize - 25, y + blockSize - 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={6}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + 25, y + blockSize - 10, x + blockSize - 25, y + blockSize - 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={6}
                stroke="black"
                fill="black"
                closed
            />
            <Circle
                onClick={clickFunc}
                x={x + (blockSize / 2)}
                y={y + (blockSize / 2) - 10}
                radius={blockSize / 4}
                fill={colors.yellow}
                stroke="black"
                strokeWidth={6} />
        </>
    )
}
