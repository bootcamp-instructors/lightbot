import { Rect } from 'react-konva'
import { colors, blockSize } from '../constants'
export default function CodeBlock({
    id, x, y, i,
    order,
    areaType,
    blockType,
    deleteSelf,
    handleDragEnd,
    handleDragStart
}) {
    return (
        <Rect
            key={i}
            x={x}
            y={y}
            name={id}
            width={blockSize}
            height={blockSize}
            fill={colors.grey}
            stroke={colors.darkGrey}
            strokeWidth={2}
            draggable
            onClick={e => deleteSelf(e, id)}
            onDragEnd={e => handleDragEnd(e, id)}
            onDragStart={e => handleDragStart(e, id)}

        />
    )
}
