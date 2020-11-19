import React, { useEffect, useState } from 'react';

import Header from '../../Components/Admin/Header';

import List from '../../Components/Produtos/List';
import ModalInsert from '../../Components/Produtos/Criar';

import Lists from '../../services/serviceList';

import { Container, Row,Col } from 'react-bootstrap';

import './styles.css';

export default function Produtos() {

    const [listProdutos, setListProdutos] = useState([]);
    
    async function GetListProdutos() {
        const response = await Lists('produto');
        setListProdutos(response.data)
    }

    useEffect(() => {
        GetListProdutos();
    }, []);

    return (
        <div className="produtos-container">
            <Header />
            <Container>
                <h1>Produtos</h1>
                {listProdutos.length > 0 && (
                    <List listProdutos={listProdutos} />
                )}
                <Row className="justify-content-md-center">
                    <Col md={10}>
                        <ModalInsert  />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}