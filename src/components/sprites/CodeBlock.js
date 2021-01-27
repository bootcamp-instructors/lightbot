import { Rect, Text } from 'react-konva'
import { colors, blockSize } from '../../data'
import LeftBlock from './LeftBlock'
import RightBlock from './RightBlock'
import LightBlock from './LightBlock'
import SpringBlock from './SpringBlock'
import ForwardBlock from './ForwardBlock'

export default function CodeBlock({
    id, x, y, key, i, j,
    order,
    powered = false,
    areaType,
    blockType,
    deleteSelf,
    handleDragEnd,
    handleDragStart
}) {
    return (
        <>
            <Rect
                x={x}
                y={y}
                name={id}
                width={blockSize}
                height={blockSize}
                fill={colors.grey}
                stroke={colors.darkGrey}
                strokeWidth={2}
                onClick={e => deleteSelf(e, id)}
            // draggable
            // onDragEnd={e => handleDragEnd(e, id)}
            // onDragStart={e => handleDragStart(e, id)}
            />
            {blockType === 'forward' && <ForwardBlock
                clickFunc={e => deleteSelf(e, id)}
                x={x}
                y={y}
            />}
            {blockType === 'left' && <LeftBlock
                clickFunc={e => deleteSelf(e, id)}
                x={x}
                y={y}
            />}
            {blockType === 'right' && <RightBlock
                clickFunc={e => deleteSelf(e, id)}
                x={x}
                y={y}
            />}
            {blockType === 'light' && <LightBlock
                clickFunc={e => deleteSelf(e, id)}
                x={x}
                y={y}
            />}
            {blockType === 'jump' && <SpringBlock
                clickFunc={e => deleteSelf(e, id)}
                x={x}
                y={y}
            />}
            {blockType === 'f1' && <Text
                fontSize={35}
                onClick={e => deleteSelf(e, id)}
                x={x + 15}
                y={y + 20}
                text={'F1'}
            />}

        </>
    )
}
