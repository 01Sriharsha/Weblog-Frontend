import React from 'react'
import { Col, Row } from 'reactstrap'
import CategorySideMenu from './CategorySideMenu'
import NewFeed from './NewFeed'

export default function Home() {
    return (
        <Row className='pt-3'>
            <Col md={2} className="p-3">
                <CategorySideMenu />
            </Col>
            <Col md={10}>
                <NewFeed />
            </Col>
        </Row>
    )
}
