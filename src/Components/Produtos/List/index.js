import React, { useState } from 'react';
import './styles.css';
import { Row, Col, ListGroup, Button, Modal, Form } from 'react-bootstrap';
import { FiXCircle, FiEdit } from 'react-icons/fi';

// native react
import Loader from 'react-loader-spinner'

//Services
import Edition from '../../../services/serviceEdition';
import Delete from '../../../services/serviceDelete';

export default function List(props) {

    // Propriedades produto
    const [id, setId] = useState();
    const [nome, setNome] = useState();
    const [valor, setValor] = useState();
    const [quantidade, setQuantidade] = useState();

    // Modal de Excluir
    const [showDelete, setShowDelete] = useState(false);
    const handleDeleteClose = () => setShowDelete(false);
    const handleDeleteShow = () => setShowDelete(true);   
    
    // Modal Alteração
    const [showAlter, setShowAlter] = useState(false);
    const handleAlterClose = () => setShowAlter(false);
    const handleAlterShow = () => setShowAlter(true);
    
    // loader
    const [loader, setLoader] = useState(false);
    
    // Listagem
    const [listagem] = useState(props.listProdutos);
    
    function DeletarProduto(id) {
        setId(id);
        handleDeleteShow();
    }

    function EditarProduto(item) {
        setId(item.id);
        setNome(item.nome);
        setValor(item.valor);
        setQuantidade(item.quantidade);
        handleAlterShow();
    }

    async function handleDeleteRegister() {
        setLoader(true);
        try {
            const response = await Delete('/Produto/', id);
            if (response) {
                alert('Dados excluídos com sucesso');
                setLoader(false); 
                handleDeleteClose();
            }else {
                alert('Erro ao deletar dados');
                setLoader(false); 
                handleDeleteClose();
            }

        } catch (err) {
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
                id,
                nome,
                valor,
                quantidade
            }
            
            const response = await Edition('/produto', data);
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
            handleAlterClose();
            setLoader(false);
        }

    }


    const itens = listagem.map((item) =>
        <ListGroup.Item key={item.id} className="item-list-produtos">
            <span className="item-name"> {item.nome}  </span>
            <span className="item-valor"> R$ {item.valor} </span>
            <span className="item-edit"><FiEdit onClick={() => EditarProduto(item)} /></span>
            <span className="item-delete"><FiXCircle onClick={() => DeletarProduto(item.id)} /></span>
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
                size="lg" show={showDelete} onHide={handleDeleteClose} aria-labelledby="contained-modal-title-vcenter" centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Deletar produto  <strong className="id-produto">{id}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Você tem certeza que gostaria de excluir esse produto?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-danger" onClick={handleDeleteClose}>Cancelar</Button>
                    <Button onClick={handleDeleteRegister}>Confirmar</Button>
                </Modal.Footer>
            </Modal>

            {nome &&
                <Modal
                    show={showAlter} onHide={handleAlterClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter">
                    <Modal.Header closeButton >
                        <Modal.Title id="contained-modal-title-vcenter">
                            Editar Produto <strong>{id}</strong>
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
                                <Form.Label>Valor</Form.Label>
                                <Form.Control
                                    type="Valor"
                                    value={valor}
                                    onChange={e => setValor(e.target.value)}
                                    placeholder="Valor" />
                            </Form.Group>
                            <Form.Group controlId="formGroupQuantidade">
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control
                                    type="Quantidade"
                                    value={quantidade}
                                    onChange={e => setQuantidade(e.target.value)}
                                    placeholder="Quantidade" />
                            </Form.Group>
                            <Button type="submit" >Salvar</Button>
                        </Form>
                    </Modal.Body>
                </Modal>}

        </div>
    );
}