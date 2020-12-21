import { useParams } from 'react-router-dom'
import { Stage, Layer, Text } from 'react-konva'
import Cube from './sprites/Cube'
import { sections } from '../data/sectionData'
import { levels } from '../data/levelData'

function LevelPage() {
    const { sectionName, levelID } = useParams()
    const foundLevel = levels.find(l => l.id === parseInt(levelID))

    const mappedLevel = !!foundLevel ? foundLevel.level_data.map((block, index) => {
        return block.z > 0
            ? Array(block.z).fill().map((item, layer) => {
                console.log(layer)
                return (
                    <Cube
                        x={block.x}
                        y={block.y}
                        z={layer}
                        type={block.type}
                        handleClick={e => console.log('click')}
                    />
                )
            })
            : <Cube
                x={block.x}
                y={block.y}
                type={block.type}
                handleClick={e => console.log('click')}
            />

    }) : []
    return (
        <div>
            {sectionName} Section, Level {levelID + 1}
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {mappedLevel.length > 0 ? mappedLevel : <Text text="Level not found" />}
                    {/* <Cube
                        x={0}
                        zPosition={0}
                        handleClick={e => console.log('click')}
                    />
                    <Cube
                        x={1}
                        zPosition={0}
                        handleClick={e => console.log('click')}
                    />
                    <Cube
                        x={2}
                        zPosition={0}
                        lightable={true}
                        handleClick={e => console.log('click')}
                    />

                    <Cube
                        x={3}
                        y={2}
                        zPosition={0}
                        handleClick={e => console.log('click')}
                    />
                    <Cube
                        x={3}
                        y={1}
                        zPosition={0}
                        handleClick={e => console.log('click')}
                    />
                    <Cube
                        x={3}
                        y={0}
                        zPosition={0}
                        handleClick={e => console.log('click')}
                    />
                    <Cube
                        x={4}
                        y={0}
                        handleClick={e => console.log('click')}
                    />
                    <Cube
                        x={5}
                        y={0}
                        handleClick={e => console.log('click')}
                    />
                    
                    <Cube
                        x={6}
                        y={0}
                        z={1}
                        handleClick={e => console.log('click')}
                         /> 
                    <Cube
                        x={0}
                        y={1}
                        handleClick={e => console.log('click')}
                    />
                    <Cube
                        x={1}
                        y={1}
                        handleClick={e => console.log('click')}
                    />
                    <Cube
                        x={0}
                        y={0}
                        handleClick={e => console.log('click')}
                    />
                    <Cube
                        x={1}
                        y={0}
                        handleClick={e => console.log('click')}
                    />
                   */}


                </Layer>
            </Stage>
        </div>
    )
}

export default LevelPage
