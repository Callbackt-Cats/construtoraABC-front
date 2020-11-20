import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import Lists from '../../services/serviceList';

import Modal from '../../Components/Obras/Criar';
import List from '../../Components/Obras/List';
import Header from '../../Components/Header/Header';

import './styles.css'; 

export default function Obras() {

    const [listObras, setListObras] = useState([]);

    async function GetListObras() {
        const response = await Lists('Obras');
        setListObras(response.data)
    }

    useEffect(() => {
        GetListObras();
    }, []);

    return (
        <div className="Obras-container">
            <Header />
            <Container>
                <h1>Obras</h1>
                {listObras.length > 0 && (
                    <List listObras={listObras} />
                )}
                <Row className="justify-content-md-center">
                    <Col md={10}>                       
                        <Modal />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}