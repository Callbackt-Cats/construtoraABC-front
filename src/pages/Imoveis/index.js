import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import Lists from '../../services/serviceList';

import Modal from '../../Components/Imoveis/Criar';
import List from '../../Components/Imoveis/List';
import Header from '../../Components/Header/Header';

import './styles.css'; 

export default function Imoveis() {

    const [listImoveis, setListImoveis] = useState([]);

    async function GetListImoveis() {
        const response = await Lists('Imoveis');
        setListImoveis(response.data)
    }

    useEffect(() => {
        GetListImoveis();
    }, []);

    return (
        <div className="Imoveis-container">
            <Header />
            <Container>
                <h1>Imoveis</h1>
                {listImoveis.length > 0 && (
                    <List listImoveis={listImoveis} />
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