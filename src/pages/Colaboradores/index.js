import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import Lists from '../../services/serviceList';

import Modal from '../../Components/Colaboradores/Criar';
import List from '../../Components/Colaboradores/List';
import Header from '../../Components/Header/Header';

import './styles.css'; 

export default function Colaboradores() {

    const [listColaboradores, setListColaboradores] = useState([]);

    async function GetListColaboradores() {
        const response = await Lists('Colaboradores');
        setListColaboradores(response.data)
    }

    useEffect(() => {
        GetListColaboradores();
    }, []);

    return (
        <div className="colaboradores-container">
            <Header />
            <Container>
                <h1>Colaboradores</h1>
                {listColaboradores.length > 0 && (
                    <List listColaboradores={listColaboradores} />
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