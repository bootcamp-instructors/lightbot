
import { Line } from 'react-konva'
import { blockSize, colors } from '../../data'

export default function PlayBlock({ x, y, clickFunc }) {
    return (
        <>
            <Line
                onClick={clickFunc}
                points={[
                    x + blockSize - 10, y + (blockSize / 2),
                    x + (blockSize / 4), y + 10,
                    x + (blockSize / 4), y + blockSize - 10
                ]}
                strokeWidth={6}
                lineJoin={'round'}
                lineCap={'round'}
                fill={colors.green}
                closed
                stroke="black"
            />
        </>
    )
}

