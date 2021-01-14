import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Stage, Layer, Text, Rect, Line } from 'react-konva'
import Cube from './sprites/Cube'
import Robot from './sprites/Robot'
import { sections } from '../data/sectionData'
import { levels } from '../data/levelData'
import { colors } from './constants'

function LevelPage() {

    const { sectionName, levelID } = useParams()
    const section = sections.find(section => section.name === sectionName)

    const foundLevel = levels.find(l => l.section_id === section.id && l.level_id === parseInt(levelID))
    const [robotLocation, setRobotLocation] = useState(foundLevel.renderRobot)

    const mappedLevel = !!foundLevel ? foundLevel.level_data.map((block, index) => {
        return Array(block.z).fill().map((item, layer) => {
            return (
                <Cube
                    x={block.x}
                    y={block.y}
                    z={layer}
                    type={block.type}
                    handleClick={e => console.log('click')}
                    key={layer}
                />
            )
        })
    }) : []

    const grid = 68;
    const gridWidth = 273;
    const gridHeight = 204;
    const pushX = 700;
    const pushY = 20;
    const linesA = [];
    const linesB = [];
    // horizontal lines
    for (let i = 0; i < 4; i++) {
        linesB.push(<Line
            strokeWidth={2}
            stroke={"black"}
            points={[pushX + 0, pushY + i * grid, pushX + gridWidth, pushY + i * grid]}
        />)
    }
    // vertical lines
    for (let i = 0; i < 5; i++) {
        linesB.push(<Line
            strokeWidth={2}
            stroke={"black"}
            points={[pushX + grid * i, pushY + 0, pushX + grid * i, pushY + gridHeight]}
        />)
    }

    const [blocks, setBlocks] = useState([])



    const calculateDropLocation = (e) => {

        const bounds = [pushX, pushX + (grid * 4), pushY, pushY + (grid * 3)];

        // make sure another block is not already there, move block out of way
        // replace block if hover over
        // place in between and move 2 blocks left or right if in the middle
        // make sure we are not out of bounds

        const x = (blocks.length % 4) * grid
        const y = Math.floor(blocks.length / 4) * grid

        e.target.to({
            x: (pushX % 68) + Math.round(e.target.x() / grid) * grid,
            y: pushY + Math.round(e.target.y() / grid) * grid
        });
    }

    const createNewBlock = (e) => {
        console.log('line 68: clicked on', e.target)
        if (blocks.length >= 12) {
            console.log('too many blocks')
            return
        }

        console.log("creating new block")

        // calculate location for next block

        const x = (blocks.length % 4) * grid
        const y = Math.floor(blocks.length / 4) * grid


        setBlocks([
            ...blocks,
            <Rect
                onDragEnd={e => calculateDropLocation(e)}
                x={pushX + x}
                y={pushY + y}
                draggable
                width={grid}
                height={grid}
                fill={colors.grey}
                stroke={colors.darkGrey}
                strokeWidth={2}
            />
        ])

    }
    const resetBoard = (e) => {
        setBlocks([])
    }



    return (
        <div>
            <Stage width={100%} height={window.innerHeight}>

                <Layer>
                    {/* lines layer */}
                    {linesA}
                    {linesB}
                </Layer>

                <Layer>
                    {/* robot level layer */}
                    {mappedLevel.length > 0 ?
                        <>
                            <Text text={`${sectionName}, Level ${parseInt(levelID)}`} />
                            {mappedLevel}
                            <Robot {...robotLocation} />
                        </>
                        : <Text text="Level not found" />
                    }

                </Layer>

                <Layer>
                    {/* drag and drop blocks layer */}
                    {blocks}
                    <Rect
                        onClick={createNewBlock}
                        x={420}
                        y={450}
                        width={100}
                        height={100}
                        fill="green"

                    />
                    <Rect
                        onClick={resetBoard}
                        x={520}
                        y={450}
                        width={100}
                        height={100}
                        fill="red"

                    />
                </Layer>


            </Stage>

            {/* <button className="btn btn-large btn-primary" onClick={createNewBlock}>new block</button> */}
        </div>
    )
}

export default LevelPage
