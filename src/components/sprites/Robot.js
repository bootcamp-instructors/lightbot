import { Arrow } from 'react-konva'
import { width, height, scaleX, scaleY, pushX, pushY, colors } from '../../data'

function Robot({ x = 0, y = 0, z = 0, angle = 0, displace }) {
    const moveX = (x * .25) + (y * .25)
    const moveY = (x * .25) - (y * .25) - (z * .3)

    const offsets = {
        0: { x: 20, y: 12 },
        120: { x: -10, y: 15 },
        180: { x: -10, y: 0 },
        300: { x: 18, y: -2 }
    }
    const d = displace ? 200 : 0
    const angleOffset = offsets[angle]
    return (
        <Arrow
            x={(scaleX * ((width / 2) + 10 + 10)) + (moveX * width) + pushX - angleOffset.x - d}
            y={(scaleY * ((height * 1.25) + 10)) + (moveY * height) + pushY - angleOffset.y}
            points={[0, 0, width / 6, height / 6]}
            pointerLength={20}
            pointerWidth={20}
            rotation={angle}
            stroke={colors['darkGrey']}
            fill={colors['white']}
        />
    )
}

export default Robot
