import { Arrow } from 'react-konva'
import { width, height, scaleX, scaleY, pushX, pushY, colors } from '../constants'

function Robot({ x = 0, y = 0, z = 0, angle = 0 }) {
    const moveX = (x * .25) + (y * .25)
    const moveY = (x * .25) - (y * .25) - (z * .3)
    return (
        <Arrow
            x={(scaleX * ((width / 2) + 10 + 10)) + (moveX * width) + pushX}
            y={(scaleY * ((height * 1.25) + 10)) + (moveY * height) + pushY}
            points={[0, 0, width / 6, height / 6]}
            pointerLength={20}
            pointerWidth={20}
            rotation={ angle}
            stroke={colors['darkGrey']}
            fill={colors['white']}
        />
    )
}

export default Robot
