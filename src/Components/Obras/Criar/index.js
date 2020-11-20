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
      const [codigo, setCodigo] = useState();
      const [endereco, setEndereco] = useState();
      const [localizacao, setLocalizacao] = useState();
      const [descricao, setDescricao] = useState();
      const [valor, setValor] = useState();
      const [idImovel, setIdImovel] = useState();
      const [idEngenheiro, setIdEngenheiro] = useState();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            codigo,
            endereco,
            localizacao,
            descricao,
            valor,
            idImovel,
            idEngenheiro
        }
        const response = await insert('/Obras', data);
        if (response) {
            handleClose()
        }else{
            handleClose()
        }
    }

    return (
        <div>
        <Button variant="info" size="lg" block onClick={() => handleShow(true)}>
            <FiUser /> Inserir novo colaboradores
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
                    <Form.Group controlId="formGroupEndereco">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            type="endereco"
                            onChange={e => setEndereco(e.target.value)}
                            placeholder="Endereço" />
                    </Form.Group>
                    <Form.Group controlId="formGroupLocalizacao">
                        <Form.Label>Localização</Form.Label>
                        <Form.Control
                            type="localizacao"
                            onChange={e => setLocalizacao(e.target.value)}
                            placeholder="Localização" />
                    </Form.Group>
                    <Form.Group controlId="formGroupDescricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="descricao"
                            onChange={e => setDescricao(e.target.value)}
                            placeholder="Descrição" />
                    </Form.Group> 
                    <Form.Group controlId="formGroupCpf">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                            type="valor"
                            onChange={e => setValor(e.target.value)}
                            placeholder="Valor" />
                    </Form.Group>
                    <Form.Group controlId="formGroupIdImovel">
                        <Form.Label>Id Imóvel</Form.Label>
                        <Form.Control
                            type="IdImovel"
                            onChange={e => setIdImovel(e.target.value)}
                            placeholder="Id Imóvel" />
                    </Form.Group>   
                    <Form.Group controlId="formGroupIdEngenheiro">
                        <Form.Label>Id Engenheiro</Form.Label>
                        <Form.Control
                            type="idEngenheiro"
                            onChange={e => setIdEngenheiro(e.target.value)}
                            placeholder="Id Engenheiro" />
                    </Form.Group>                 
                    <Button type="submit" className="btn-salvar">Salvar</Button>
                </Form>
            </Modal.Body>
        </Modal>
      </div>
    );
}