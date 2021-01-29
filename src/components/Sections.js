import { Link } from 'react-router-dom'
import {
    Row, Col, CardHeader, Card, CardTitle, CardBody
} from 'reactstrap'
import { sections } from '../data/sectionData'
import { useAppContext } from '../utilities/AppContext'

function Sections() {
    const { userData } = useAppContext()
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
                                <Link className="btn btn-primary" to={`/section/${section.name}`}>Start</Link>
                            </CardBody>
                        </Card>
                    </Col>
                )
            })}
        </Row>
    )
}

export default Sections
