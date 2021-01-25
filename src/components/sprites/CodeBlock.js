import { Rect } from 'react-konva'
import { colors, blockSize } from '../../data'
export default function CodeBlock({
    id, x, y, key, i, j, index,
    order,
    powered = false,
    areaType,
    blockType,
    deleteSelf,
    handleDragEnd,
    handleDragStart
}) {
    const colorPicker = () => {
        if (blockType === "light") {
            let picked = powered ? colors.yellow : colors.blue
            console.log(picked)
            return picked
        }
        return colors.grey
    }
    return (
        <Rect
            key={index}
            x={x}
            y={y}
            name={id}
            width={blockSize}
            height={blockSize}
            fill={colorPicker()}
            stroke={colors.darkGrey}
            strokeWidth={2}
            onClick={e => deleteSelf(e, id)}
        // draggable
        // onDragEnd={e => handleDragEnd(e, id)}
        // onDragStart={e => handleDragStart(e, id)}
        />
    )
}
