import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import insert from '../../../services/serviceInsert';

import { FiUser } from 'react-icons/fi';

import './styles.css';

export default function ModalInsert(props) {

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

      // Propriedades obras
      const [id, setId] = useState();
      const [nome, setNome] = useState();
      const [codigo, setCodigo] = useState();
      const [idFornecedor, setIdFornecedor] = useState();
      const [idResponsavel, setIdResponsavel] = useState();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            id,
            nome,
            codigo,
            idFornecedor,
            idResponsavel
        }
        const response = await insert('/materiais', data);
        if (response) {
            handleClose()
        }else{
            handleClose()
        }
    }

    return (
        <div>
        <Button variant="info" size="lg" block onClick={() => handleShow(true)}>
            <FiUser /> Inserir novo material
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
                    Cadastrar novo Material
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleRegister}>
                    <Form.Group controlId="formGroupEndereco">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="nome"
                            onChange={e => setNome(e.target.value)}
                            placeholder="Nome" />
                    </Form.Group>
                    <Form.Group controlId="formGroupLocalizacao">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="codigo"
                            onChange={e => setCodigo(e.target.value)}
                            placeholder="Código" />
                    </Form.Group>
                    <Form.Group controlId="formGroupDescricao">
                        <Form.Label>Id Fornecedor</Form.Label>
                        <Form.Control
                            type="idFornecedor"
                            onChange={e => setIdFornecedor(e.target.value)}
                            placeholder="Id Fornecedor" />
                    </Form.Group> 
                    <Form.Group controlId="formGroupCpf">
                        <Form.Label>Id Responsável</Form.Label>
                        <Form.Control
                            type="Id Responsável"
                            onChange={e => setIdResponsavel(e.target.value)}
                            placeholder="Id Responsável" />
                    </Form.Group>        
                    <Button type="submit" className="btn-salvar">Salvar</Button>
                </Form>
            </Modal.Body>
        </Modal>
      </div>
    );
}