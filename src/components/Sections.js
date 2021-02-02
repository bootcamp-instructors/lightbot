import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Row, Col, CardHeader, Card, CardTitle, CardBody, Button
} from 'reactstrap'
import { sections } from '../data/sectionData'
import { useAppContext } from '../utilities/AppContext'

function Sections() {
    const { userData } = useAppContext()
    const [validSection, setValidSection] = useState(-1)
    useEffect(() => {
        console.log('in useEffect')
        for (let i of userData) {
            if (i.section_id > validSection) {
                console.log(i.section_id)
                setValidSection(p => {
                    return i.section_id
                })
            }
        }
    }, [userData])
    return (
        <Row>
            {sections.map((section, index) => {
                // TODO:  check context to check section completion status based on user
                return (
                    <Col className="mt-3" xs="5" sm="4" md="4" lg="3" key={section.id}>
                        <Card>
                            <CardHeader tag="h4">{index + 1}</CardHeader>
                            {/* <CardImg top width="100%" src={section.img} alt={`${section.name} image`} /> */}
                            <CardBody>
                                <CardTitle tag="h5">{section.name}</CardTitle>
                                {/* user progress */}
                                {
                                    validSection + 1 >= section.id ?
                                        <Link className="btn btn-primary" to={`/section/${section.name}`}>Start</Link>
                                        : <Button disabled className="btn btn-primary">Unlock by completing the previous section</Button>
                                }
                            </CardBody>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}

export default Sections
