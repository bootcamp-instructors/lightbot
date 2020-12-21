import { useParams } from 'react-router-dom'
import { Stage, Layer } from 'react-konva'
import Cube from './sprites/Cube'

function LevelPage() {
    const { sectionName, levelID } = useParams()
    return (
        <div>
            {sectionName} Section, Level {levelID + 1}
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Cube
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
                    
                </Layer>
            </Stage>
        </div>
    )
}

export default LevelPage
