import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import Lists from '../../services/serviceList';

import Modal from '../../Components/Vendedores/Criar';
import List from '../../Components/Vendedores/List';
import Header from '../../Components/Admin/Header';

import './styles.css'; 

export default function Vendedores() {

    const [listVendedores, setListVendedores] = useState([]);

    async function GetListVendedores() {
        const response = await Lists('vendedor');
        setListVendedores(response.data)
    }

    useEffect(() => {
        GetListVendedores();
    }, []);

    return (
        <div className="usuarios-container">
            <Header />
            <Container>
                <h1>Vendedores</h1>
                {listVendedores.length > 0 && (
                    <List listVendedores={listVendedores} />
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