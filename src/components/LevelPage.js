import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Stage, Layer, Text } from 'react-konva'
import Cube from './sprites/Cube'
import Robot from './sprites/Robot'
import { sections } from '../data/sectionData'
import { levels } from '../data/levelData'

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
    return (
        <div>
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {mappedLevel.length > 0 ?
                        <>
                            <Text text={`${sectionName}, Level ${parseInt(levelID)}`} />
                            {mappedLevel}
                            <Robot {...robotLocation} />
                        </>
                        : <Text text="Level not found" />
                    }
                </Layer>
            </Stage>
        </div>
    )
}

export default LevelPage
