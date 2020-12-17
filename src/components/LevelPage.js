import { useParams } from 'react-router-dom'

function LevelPage() {
    const { sectionName, levelID } = useParams()
    return (
        <div>
            {sectionName} Section, Level {levelID + 1}
        </div>
    )
}

export default LevelPage
