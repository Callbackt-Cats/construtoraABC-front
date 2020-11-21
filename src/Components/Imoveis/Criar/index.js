import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import insert from '../../../services/serviceInsert';

import { FiUser } from 'react-icons/fi';

import './styles.css';

export default function ModalInsert(props) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [endereco, setEndereco] = useState('')
    const [idCliente, setIdCliente] = useState('')
    const [descricao, setDescricao] = useState('')

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            endereco,
            idCliente,
            descricao
        }
        const response = await insert('/Imoveis', data);
        if (response) {
            handleClose()
        }else{
            handleClose()
        }
    }

    return (
        <div>
        <Button variant="info" size="lg" block onClick={() => handleShow(true)}>
            <FiUser /> Inserir novo imóvel
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
                    Cadastrar novo Imóvel
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleRegister}>
                    <Form.Group controlId="formGroupEndereco">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            type="endereco"
                            onChange={e => setEndereco(e.target.value)}
                            placeholder="Endereço" />
                    </Form.Group>
                    <Form.Group controlId="formGroupIdCliente">
                        <Form.Label>Id Cliente</Form.Label>
                        <Form.Control
                            type="Id Cliente"
                            onChange={e => setIdCliente(e.target.value)}
                            placeholder="Id Cliente" />
                    </Form.Group>
                    <Form.Group controlId="formDescricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="descricao"
                            onChange={e => setDescricao(e.target.value)}
                            placeholder="Descrição" />
                    </Form.Group>                 
                    <Button type="submit" className="btn-salvar">Salvar</Button>
                </Form>
            </Modal.Body>
        </Modal>
      </div>
    );
}