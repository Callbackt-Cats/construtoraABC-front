import React, { useState } from 'react';
import './styles.css';
import { Row, Col, ListGroup, Button, Modal, Form, Input } from 'react-bootstrap';
import { FiXCircle, FiEdit } from 'react-icons/fi';

// native react
import Loader from 'react-loader-spinner'

//Services
import Edition from '../../../services/serviceEdition';
import Delete from '../../../services/serviceDelete'


export default function List(props) {

    // Propriedades clientes
    const [id, setId] = useState();
    const [endereco, setEndereco] = useState();
    const [idCliente, setIdCliente] = useState();
    const [descricao, setDescricao] = useState();

    // loader
    const [loader, setLoader] = useState(false);

     // Modal de Excluir
     const [showDelete, setShowDelete] = useState(false);
     const handleDeleteClose = () => setShowDelete(false);
     const handleDeleteShow = () => setShowDelete(true);
 
     // Modal Alteração
     const [showAlter, setShowAlter] = useState(false);
     const handleAlterClose = () => setShowAlter(false);
     const handleAlterShow = () => setShowAlter(true);
    
    const [listagem, setListagem] = useState(props.listImoveis);

    function Deletarcolaborador(id){
        setId(id);
        handleDeleteShow();
    }  

    function Editarcolaborador(item){
        setId(item.id);
        setEndereco(item.endereco);
        setIdCliente(item.idCliente);
        setDescricao(item.descricao);
        handleAlterShow();
    }

    async function handleAlterRegister(e) {
        e.preventDefault();
        setLoader(true);
        try {
            const data = {
                id,
                endereco,
                idCliente,
                descricao
            }        
            const response = await Edition('/Imoveis', data);
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

    async function handleDeleteRegister() {
        setLoader(true);
        try {
          const response = await Delete('/Imoveis/', id);    
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

    const itens = listagem.map((item) =>
        <ListGroup.Item key={item.id} className="item-list-Imoveis">
            <span className="item-name"> {item.endereco}  </span>
            <span className="item-name"> {item.descricao} </span>
            <span className="item-edit"><FiEdit onClick={() => Editarcolaborador(item)} /></span>
            <span className="item-delete"><FiXCircle onClick={() => Deletarcolaborador(item.id)} /></span>
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
                    <ListGroup variant="flush" className="list-Imoveis">
                        {itens}
                    </ListGroup>
                </Col>
            </Row>
            <Modal
                size="lg" show={showDelete} onHide={handleDeleteClose}  aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Remover cliente  <strong className="id-produto">{id}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Você tem certeza que gostaria de excluir esse imóveis?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-danger" onClick={handleDeleteClose}>Cancelar</Button>
                    <Button onClick={handleDeleteRegister}>Confirmar</Button>
                </Modal.Footer>
            </Modal>

        {endereco &&
            <Modal
            size="lg"
            show={showAlter} onHide={handleAlterClose}
            aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar Endereço <strong>{id}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAlterRegister}>
                    <Form.Group controlId="formGroupEndereco">
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            type="endereco"
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)}
                            placeholder="Endereço" />
                    </Form.Group>
                    <Form.Group controlId="formGroupIdCliente">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="idCliente"
                            value={idCliente}
                            onChange={e => setIdCliente(e.target.value)}
                            placeholder="Id Cliente" />
                    </Form.Group>
                    <Form.Group controlId="formGroupDescricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="descricao"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            placeholder="Descrição" />
                    </Form.Group>        
                    <Button type="submit" className="btn-salvar">Salvar</Button>
                </Form>
            </Modal.Body>
        </Modal>}
        </div>
    );
}