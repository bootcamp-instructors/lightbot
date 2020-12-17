import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

function Home() {
    return (
        <Row>
            <Col className="text-center">
                <Link className="btn btn-lg btn-primary mt-5" to="/sections">Start</Link>
            </Col>
        </Row>
    )
}

export default Home
