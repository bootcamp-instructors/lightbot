import { Line } from 'react-konva'
import { blockSize } from '../../data'
export default function RightBlock({ x, y, clickFunc }) {
    return (
        <>
            <Line
                points={[x + blockSize - 10, y + 25, x + blockSize - 25, y + 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + blockSize - 10, y + 25, x + blockSize - 25, y + 40]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + blockSize - 10, y + 25, x + 20, y + 25]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + 20, y + 25, x + 20, y + blockSize - 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            {/* <Line
                points={[x + (blockSize / 2), y + 10, x + (blockSize / 2), y - 10 + blockSize]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            /> */}
        </>
    )
}
