import { Rect } from 'react-konva'
import { colors, blockSize } from '../constants'
export default function CodeBlock({
    id, x, y, key, i, j, index,
    order,
    areaType,
    blockType,
    deleteSelf,
    handleDragEnd,
    handleDragStart
}) {
    return (
        <Rect
            key={index}
            x={x}
            y={y}
            name={id}
            width={blockSize}
            height={blockSize}
            fill={blockType === "forward" ? colors.grey : colors.blue}
            stroke={colors.darkGrey}
            strokeWidth={2}
            onClick={e => deleteSelf(e, id)}
        // draggable
        // onDragEnd={e => handleDragEnd(e, id)}
        // onDragStart={e => handleDragStart(e, id)}
        />
    )
}
