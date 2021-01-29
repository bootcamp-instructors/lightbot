import { Line } from 'react-konva'
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
            {/* TODO: make this a circle instead */}
            <Line
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={6}
                stroke="black"
                fill="black"
                points={[
                    x + 25, y + blockSize - 30, // bottom
                    x + 18, y + blockSize - 40, // bottom
                    x + 20, y + 18, // left
                    x + (blockSize / 2), y + 10, // top
                    x + blockSize - 20, y + 18, // right
                    x + blockSize - 18, y + blockSize - 40, // bottom again
                    x + blockSize - 25, y + blockSize - 30, // bottom again
                ]}
                closed
                tension={0.2}
                stroke="black"
                fill={colors.yellow}
            />
        </>
    )
}
