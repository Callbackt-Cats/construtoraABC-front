import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import Lists from '../../services/serviceList';

import Modal from '../../Components/Materiais/Criar';
import List from '../../Components/Materiais/List';
import Header from '../../Components/Header/Header';

import './styles.css'; 

export default function Materiais() {

    const [listMateriais, setListMateriais] = useState([]);

    async function GetListMateriais() {
        const response = await Lists('Materiais');
        setListMateriais(response.data)
    }

    useEffect(() => {
        GetListMateriais();
    }, []);

    return (
        <div className="Materiais-container">
            <Header />
            <Container>
                <h1>Materiais</h1>
                {listMateriais.length > 0 && (
                    <List listMateriais={listMateriais} />
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