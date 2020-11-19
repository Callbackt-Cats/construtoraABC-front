import React, { useEffect, useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

import Lists from '../../services/serviceList';

import List from '../../Components/Clientes/List';
import ModalInsert from '../../Components/Clientes/Criar';
import Header from '../../Components/Header/Header';

import './styles.css'; 

export default function Clientes() {

    const [listClientes, setListClientes] = useState([]);

    async function GetListClientes() {
        const response = await Lists('Clientes');
            setListClientes(response.data)
    }

    useEffect(() => {
        GetListClientes();
    }, []);

    return (
        <div className="usuarios-container">
            <Header />
            <Container>
                <h1>Clientes</h1>
                {listClientes.length > 0 && (
                    <List listClientes={listClientes} />
                )}
                 <Row className="justify-content-md-center">
                    <Col md={10}>                      
                        <ModalInsert />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}