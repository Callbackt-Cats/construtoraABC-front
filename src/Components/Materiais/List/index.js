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

    // Propriedades obras
    const [id, setId] = useState();
    const [nome, setNome] = useState();
    const [codigo, setCodigo] = useState();
    const [idFornecedor, setIdFornecedor] = useState();
    const [idResponsavel, setIdResponsavel] = useState();

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
    
    const [listagem, setListagem] = useState(props.listMateriais);

    function DeletarObras(id){
        setCodigo(id);
        handleDeleteShow();
    }  

    function EditarObra(item){
        setId(item.id);
        setNome(item.nome);
        setCodigo(item.codigo);
        setIdFornecedor(item.idFornecedor);
        setIdResponsavel(item.idResponsavel);
        handleAlterShow();
    }

    async function handleAlterRegister(e) {
        e.preventDefault();
        setLoader(true);
        try {
            const data = {
                id,
                nome,
                codigo,
                idFornecedor,
                idResponsavel
            }        
            const response = await Edition('/Materiais', data);
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
          const response = await Delete('/Materiais/', codigo);    
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
        <ListGroup.Item key={item.id} className="item-list-colaboradores">
            <span className="item-name"> {item.codigo}  </span>
            <span className="item-name"> {item.nome} </span>
            <span className="item-edit"><FiEdit onClick={() => EditarObra(item)} /></span>
            <span className="item-delete"><FiXCircle onClick={() => DeletarObras(item.id)} /></span>
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
                    <ListGroup variant="flush" className="list-colaboradores">
                        {itens}
                    </ListGroup>
                </Col>
            </Row>
            <Modal
                size="lg" show={showDelete} onHide={handleDeleteClose}  aria-labelledby="contained-modal-title-vcenter"
                centered >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Remover obra  <strong className="id-produto">{codigo}</strong>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Você tem certeza que gostaria de excluir essa Obra?
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
                    Editar Obra <strong>{codigo}</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleAlterRegister}>
                    <Form.Group controlId="formGroupEndereco">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="nome"
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            placeholder="Nome" />
                    </Form.Group>
                    <Form.Group controlId="formGroupLocalizacao">
                        <Form.Label>Código</Form.Label>
                        <Form.Control
                            type="codigo"
                            value={codigo}
                            onChange={e => setCodigo(e.target.value)}
                            placeholder="Código" />
                    </Form.Group>
                    <Form.Group controlId="formGroupDescricao">
                        <Form.Label>Id Fornecedor</Form.Label>
                        <Form.Control
                            type="idFornecedor"
                            value={idFornecedor}
                            onChange={e => setIdFornecedor(e.target.value)}
                            placeholder="Id Fornecedor" />
                    </Form.Group> 
                    <Form.Group controlId="formGroupCpf">
                        <Form.Label>Id Responsável</Form.Label>
                        <Form.Control
                            type="Id Responsável"
                            value={idResponsavel}
                            onChange={e => setIdResponsavel(e.target.value)}
                            placeholder="Id Responsável" />
                    </Form.Group>        
                    <Button type="submit" className="btn-salvar">Salvar</Button>
                </Form>
            </Modal.Body>
        </Modal>}
        </div>
    );
}