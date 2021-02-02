import { Line } from 'react-konva'

export default function FastForwardBlock({ x, y, clickFunc, height, width, speed }) {
    return (
        <>
            <Line
                points={[x + width - 10, y + (height / 2), x + (width / 2), y + 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + width - 10, y + (height / 2), x + (width / 2), y + height - 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + (width / 2), y + (height / 2), x + 10, y + 10]}
                onClick={clickFunc}
                lineJoin={'round'}
                lineCap={'round'}
                strokeWidth={8}
                stroke="black"
                fill="black"
                closed
            />
            <Line
                points={[x + (width / 2), y + (height / 2), x + 10, y + height - 10]}
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
