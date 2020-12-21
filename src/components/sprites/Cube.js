import { Shape } from 'react-konva'

const colors = {
    'darkGrey': "#363D44",
    'grey': "#C2C2C2",
    'lightGrey': "#D6D6D6",
    'lighterGrey': '#E0E0E0',
    'white': "#ffffff",
    'blue': "#18BBF2",
    'yellow': "#F8D525"
}



function Cube({ xPosition, yPosition, zPosition, handleClick }) {
    return (
        <>
            <Shape
                sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(170, 50);
                    context.lineTo(90, 10);
                    context.lineTo(10, 50);
                    context.lineTo(90, 90);
                    context.closePath();
                    context.fillStrokeShape(shape);
                }}
                fill={colors['lighterGrey']}
                stroke={colors['darkGrey']}
                strokeWidth={2}
            />
            <Shape
                sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(170, 50);
                    context.lineTo(170, 100);
                    context.lineTo(90, 140);
                    context.lineTo(90, 90);
                    context.closePath();
                    context.fillStrokeShape(shape);
                }}
                fill={colors['grey']}
                stroke={colors['darkGrey']}
                strokeWidth={2}
            />
            <Shape
                sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(10, 50);
                    context.lineTo(10, 100);
                    context.lineTo(90, 140);
                    context.lineTo(90, 90);
                    context.closePath();
                    context.fillStrokeShape(shape);
                }}
                fill={colors['lightGrey']}
                stroke={colors['darkGrey']}
                strokeWidth={2}
            />
        </>
    )
}

export default Cube
