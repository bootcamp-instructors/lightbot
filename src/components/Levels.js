import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, CardHeader, Card, Button, CardBody } from 'reactstrap'
import { sections } from '../data/sectionData'
import { levels } from '../data/levelData'
import { useAppContext } from '../utilities/AppContext'

function Levels() {
    const { userData } = useAppContext()
    const { sectionName } = useParams()
    const section = sections.find(section => section.name === sectionName)
    const filteredLevels = levels.filter(level => level.section_id === section.id)

    const [validLevel, setValidLevel] = useState(-1)
    useEffect(() => {
        for (let i of userData) {
            if (i.section_id > validLevel) {
                setValidLevel(p => i.level_id)
            }
        }
    }, [])
    return (
        <Row>
            {filteredLevels.map((level, index) => {
                const levelInProgress = true
                // TODO: check context to see if level in progress based on user
                return (
                    <Col className="mt-3" xs="2" sm="3" md="4" lg="2">
                        <Card>
                            <CardHeader tag="h4">{index + 1}</CardHeader>
                            {/* <CardImg top width="100%" src={section.img} alt={`${section.name} image`} /> */}
                            <CardBody>
                                {`Level ${level.level_id}`}
                            </CardBody>
                            <CardBody>
                                {validLevel + 1 >= level.id || level.id === 0 ?
                                    <Link className={`btn ${levelInProgress ? 'btn-primary' : 'btn-success'}`}
                                        to={`/level/${sectionName}/${level.level_id}`}
                                        key={level.id}>Start!</Link>
                                    : <Button disabled className="btn btn-primary">Locked</Button>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}

export default Levels
