
import { Link, useParams } from 'react-router-dom'
import {
    Row, Col, CardHeader, Card, CardImg, CardTitle, CardBody
} from 'reactstrap'
import { sections } from '../data/sectionData'
import { levels } from '../data/levelData'
function Levels() {
    const { sectionName } = useParams()
    const section = sections.find(section => section.name === sectionName)
    const filteredLevels = levels.filter(level => level.section_id === section.id)
    return (
        <Row>
            <Col>
                {filteredLevels.map((level, index) => {
                    const levelInProgress = true
                    // check context to see if level in progress based on user
                    return (
                        <Link
                            className={`btn ${levelInProgress ? 'btn-primary' : 'btn-success'}`}
                            to={`/level/${sectionName}/${level.id}`}
                        >
                            {index + 1}
                        </Link>
                    )
                }
                )}

            </Col>
        </Row >
    )
}

export default Levels
