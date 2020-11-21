import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import insert from '../../../services/serviceInsert';

import { FiUser } from 'react-icons/fi';

import './styles.css';

export default function ModalInsert(props) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [cpf, setCpf] = useState('')
    const [tipo, setTipo] = useState('')

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            nome,
            email,
            cpf,
            tipo
        }
        const response = await insert('/Colaboradores', data);
        if (response) {
            handleClose()
        }else{
            handleClose()
        }
    }

    return (
        <div>
        <Button variant="info" size="lg" block onClick={() => handleShow(true)}>
            <FiUser /> Inserir novo colaborador
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
                    Cadastrar novo Colaborador
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
                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="Email"
                            onChange={e => setEmail(e.target.value)}
                            placeholder="E-mail" />
                    </Form.Group>
                    <Form.Group controlId="formGroupCpf">
                        <Form.Label>Cpf</Form.Label>
                        <Form.Control
                            type="Cpf"
                            onChange={e => setCpf(e.target.value)}
                            placeholder="Cpf" />
                    </Form.Group>
                    <Form.Group controlId="formGroupCpf">
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control
                            type="Tipo"
                            onChange={e => setTipo(e.target.value)}
                            placeholder="Tipo" />
                    </Form.Group>               
                    <Button type="submit" className="btn-salvar">Salvar</Button>
                </Form>
            </Modal.Body>
        </Modal>
      </div>
    );
}