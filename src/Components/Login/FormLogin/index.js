import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';

import './styles.css';

export default function FormLogin() {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col md={4}>
                    <Form className="form-login">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control type="email" placeholder="E-mail" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Senha" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Deixe me logado" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login   
                    </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}