import React, { useState } from 'react';
import './styles.css';
import { Row, Col, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { FiXCircle, FiEdit } from 'react-icons/fi';
// native react
import Loader from 'react-loader-spinner'

// Services
import Edition from '../../../services/serviceEdition';
import Delete from '../../../services/serviceDelete';

export default function List(props) {

    // Propriedades clientes
    const [idUsuario, setId] = useState();
    const [nome, setNome] = useState();
    const [email, setEmail] = useState();
    const [cidadeUsuario, setCidade] = useState();
    const [cpf, setcpf] = useState();

    // Modal de Excluir
    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);

    // Modal Alteração
    const [showAlter, setShowAlter] = useState(false);
    const handleAlterClose = () => setShowAlter(false);
    const handleAlterShow = () => setShowAlter(true);

    const [loader, setLoader] = useState(false);

    // Listagem
    const [listagem] = useState(props.listClientes);

    function ExcluirCliente(id) {
        setId(id);
        handleDeleteShow();
    }

    function EditarCliente(item) {
        setId(item.id);
        setNome(item.nome);
        setEmail(item.email);
        setCidade(item.cidade);
        setcpf(item.cpf);
        handleAlterShow();
    }

    async function handleDeleteRegister() {
        setLoader(true);
        try {
          const response = await Delete('/Usuario/', idUsuario);    
          if (response) {
                alert('Registros excluídos com sucesso');
                setLoader(false); 
                handleDeleteClose();
            }else {
                alert('Erro ao deletar dados');
                setLoader(false); 
                handleDeleteClose();
            }
        } catch(err) {
          alert('Erro ao deletar dados');
          setLoader(false); 
          handleDeleteClose();
        } 
    }

    async function handleAlterRegister(e) {
        e.preventDefault();
        setLoader(true);
        try {
            const data = {
                idUsuario,
                nome,
                email,
                cidadeUsuario,
                cpf,
            }        
            const response = await Edition('/Usuario', data);
            if (response) {
                alert('Dados Alterados com sucesso');
                setLoader(false);
                handleAlterClose();
            }else {
                alert('Erro ao alterar dados');
                setLoader(false);
                handleAlterClose();
            }
        } catch (err) {
            alert('Erro ao alterar dados');
            setLoader(false);
        }
        
    }
    

    const itens = listagem.map((item) =>
        <ListGroup.Item key={item.idUsuario} className="item-list-produtos">
            <span className="item-name"> {item.nome}  </span>
            <span className="item-name"> {item.email} </span>
            <span className="item-edit"><FiEdit onClick={() => EditarCliente(item)} /></span>
            <span className="item-delete"><FiXCircle onClick={() => ExcluirCliente(item.idUsuario)} /></span>
        </ListGroup.Item>
    );

    return (
        <div>
             <Loader
                type="Rings"
                className="loader"
                color="#00BFFF"
                height={100}
                width={100}
                visible={loader}        
            />
            <Row className="justify-content-md-center">
                <Col md={10}>
                    <ListGroup variant="flush" className="list-usuarios">
                        {itens}
                    </ListGroup>
                </Col>
            </Row>
            
            <Modal
                size="lg" show={showDelete} onHide={handleDeleteClose}  aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Remover cliente  <strong className="id-produto">{idUsuario}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Você tem certeza que gostaria de excluir esse cliente?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-danger" onClick={handleDeleteClose}>Cancelar</Button>
                    <Button onClick={handleDeleteRegister}>Confirmar</Button>
                </Modal.Footer>
            </Modal>
        {nome &&
            <Modal
            size="lg"
            show={showAlter} onHide={handleAlterClose}
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar Cliente <strong>{nome}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAlterRegister}>
                    <Form.Group controlId="formGroupNome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="Nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Nome" />
                    </Form.Group>
                    <Form.Group controlId="formGroupValor">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Email" />
                    </Form.Group>               
                    <Form.Group controlId="formGroupQuantidade">
                        <Form.Label>Cpf</Form.Label>
                        <Form.Control
                            type="cpf"
                            value={cpf}
                            disabled={true}
                            onChange={e => setcpf(e.target.value)}
                            placeholder="cpf" />
                    </Form.Group>
                    <Button type="submit">Salvar</Button>
                </Form>
            </Modal.Body>
        </Modal>}
        
        </div>
    );
}