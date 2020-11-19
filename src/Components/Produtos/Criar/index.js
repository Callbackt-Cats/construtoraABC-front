import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import insert from '../../../services/serviceInsert';
import { FiBox } from 'react-icons/fi';

import './styles.css';

export default function ModalInsert(props) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [nome, setNome] = useState('')
    const [valor, setValor] = useState('')
    const [quantidade, setQuantidade] = useState('')

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            valor,
            quantidade
        }
        const response = await insert('/produto', data);
        if (response) {
            handleClose()
        }else{
            handleClose()
        }
    }

    return (
        <div>
         <Button variant="info" size="lg" block onClick={() => handleShow(true)}>
            <FiBox /> Inserir novo produto
        </Button>
        <Modal
            {...props}
            size="lg"
            show={show}
            onHide={handleClose} 
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Criar novo Produto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleRegister}>
                    <Form.Group controlId="formGroupNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="Nome"
                            onChange={e => setNome(e.target.value)}
                            placeholder="Nome" />
                    </Form.Group>
                    <Form.Group controlId="formGroupValor">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                            type="Valor"
                            onChange={e => setValor(e.target.value)}
                            placeholder="Valor" />
                    </Form.Group>
                    <Form.Group controlId="formGroupQuantidade">
                        <Form.Label>Quantidade</Form.Label>
                        <Form.Control
                            type="Quantidade"
                            onChange={e => setQuantidade(e.target.value)}
                            placeholder="Quantidade" />
                    </Form.Group>
                    <Button type="submit">Salvar</Button>
                </Form>
            </Modal.Body>
        </Modal>
        </div>
    );
}