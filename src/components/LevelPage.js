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
                        xPosition={0}
                        yPosition={0}
                        zPosition={0}
                        handleClick={e => console.log('click')}
                    />
                </Layer>
            </Stage>
        </div>
    )
}

export default LevelPage
