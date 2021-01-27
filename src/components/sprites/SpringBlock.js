import { Line } from 'react-konva'
import { blockSize, colors } from '../../data'
export default function SpringBlock({ x, y, clickFunc }) {
    return (
        <>
            <Line
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={6}
                stroke="black"
                fill="black"
                points={[
                    x - 5 + (blockSize / 2), y + blockSize - 10, // bottom
                    x - 5 + blockSize - 10, y + (2 * blockSize / 3), // right
                    x - 5 + (blockSize / 2), y + (blockSize / 2), // top
                    x - 5 + 20, y + (2 * blockSize / 3) - 5, // left

                    x - 5 + (blockSize / 2), y + (2 * blockSize / 3) + 2, // middle
                    x - 5 + blockSize - 10, y + (blockSize / 2), // right
                    x - 5 + (blockSize / 2), y + (blockSize / 3), // top
                    x - 5 + 20, y + (blockSize / 2) - 5, // left

                    x - 5 + (blockSize / 2), y + (blockSize / 2) + 2, // middle
                    x - 5 + blockSize - 10, y + (blockSize / 3), // right
                    x - 5 + (blockSize / 2), y + 10, // top
                ]}
                // closed
                tension={0.6}
                stroke="black"
            // fill={colors.yellow}
            />
        </>
    )
}
