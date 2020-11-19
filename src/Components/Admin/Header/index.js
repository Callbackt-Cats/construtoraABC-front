import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Menu from '../Menu';

import './styles.css';

export default function Header() {
    return (
        <div className="header">
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Menu />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}