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

const scaleX = .5
const scaleY = .5
const width = 160
const height = 80
const pushX = 100
const pushY = 100

function Cube({ x = 0, y = 0, z = 0, handleClick, type = 'walk' }) {

    const moveX = (x * .25) + (y * .25)
    const moveY = (x * .25) - (y * .25) - (z * .3)

    return (
        <>
            <Shape
                sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(
                        (scaleX * (width + 10)) + (moveX * width) + pushX,
                        (scaleY * ((height / 2) + 10)) + (moveY * height) + pushY);
                    context.lineTo(
                        (scaleX * ((width / 2) + 10)) + (moveX * width) + pushX,
                        (scaleY * (0 + 10)) + (moveY * height) + pushY);
                    context.lineTo(
                        (scaleX * (0 + 10)) + (moveX * width) + pushX,
                        (scaleY * ((height / 2) + 10)) + (moveY * height) + pushY);
                    context.lineTo(
                        (scaleX * ((width / 2) + 10)) + (moveX * width) + pushX,
                        (scaleY * (height + 10)) + (moveY * height) + pushY);
                    context.closePath();
                    context.fillStrokeShape(shape);
                }}
                fill={type === 'light' ? colors['blue'] : colors['lighterGrey']}
                stroke={colors['darkGrey']}
                strokeWidth={2}
            />
            <Shape
                sceneFunc={(context, shape) => {
                    context.beginPath();

                    context.moveTo(
                        (scaleX * 170) + (moveX * width) + pushX,
                        (scaleY * 50) + (moveY * height) + pushY);
                    context.lineTo(
                        (scaleX * 170) + (moveX * width) + pushX,
                        (scaleY * 100) + (moveY * height) + pushY);
                    context.lineTo(
                        (scaleX * 90) + (moveX * width) + pushX,
                        (scaleY * 140) + (moveY * height) + pushY);
                    context.lineTo(
                        (scaleX * 90) + (moveX * width) + pushX,
                        (scaleY * 90) + (moveY * height) + pushY);
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

                    context.moveTo(
                        (scaleX * (0 + 10)) + (moveX * width) + pushX,
                        (scaleY * 50) + (moveY * height) + pushY);
                    context.lineTo(
                        (scaleX * (0 + 10)) + (moveX * width) + pushX,
                        (scaleY * 100) + (moveY * height) + pushY);
                    context.lineTo(
                        (scaleX * 90) + (moveX * width) + pushX,
                        (scaleY * 140) + (moveY * height) + pushY);
                    context.lineTo(
                        (scaleX * 90) + (moveX * width) + pushX,
                        (scaleY * 90) + (moveY * height) + pushY);
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
