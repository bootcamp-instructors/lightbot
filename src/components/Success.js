import React from 'react'
import { Link } from 'react-router-dom'
import {
    Row, Col
} from 'reactstrap'


export default function Success() {
    return (
        <Row>
            <Col className="mt-3">
                <h1>Great Job!</h1>
                <p>You have completed the game!</p>
                <p>You can now stop sharing your screen and return to the interview.</p>
            </Col>

        </Row>
    )
}



