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
    const [codigo, setCodigo] = useState();
    const [endereco, setEndereco] = useState();
    const [localizacao, setLocalizacao] = useState();
    const [descricao, setDescricao] = useState();
    const [valor, setValor] = useState();
    const [idImovel, setIdImovel] = useState();
    const [idEngenheiro, setIdEngenheiro] = useState();

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
    
    const [listagem, setListagem] = useState(props.listObras);

    function DeletarObras(id){
        setCodigo(id);
        handleDeleteShow();
    }  

    function EditarObra(item){
        setCodigo(item.codigo);
        setEndereco(item.endereco);
        setLocalizacao(item.localizacao);
        setDescricao(item.descricao);
        setValor(item.valor);
        setIdImovel(item.idImovel);
        setIdEngenheiro(item.idEngenheiro);
        handleAlterShow();
    }

    async function handleAlterRegister(e) {
        e.preventDefault();
        setLoader(true);
        try {
            const data = {
                codigo,
                endereco,
                localizacao,
                descricao,
                valor,
                idImovel,
                idEngenheiro
            }        
            const response = await Edition('/Obras', data);
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
          const response = await Delete('/Obras/', codigo);    
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
        <ListGroup.Item key={item.codigo} className="item-list-colaboradores">
            <span className="item-name"> {item.endereco}  </span>
            <span className="item-name"> {item.descricao} </span>
            <span className="item-edit"><FiEdit onClick={() => EditarObra(item)} /></span>
            <span className="item-delete"><FiXCircle onClick={() => DeletarObras(item.codigo)} /></span>
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

        {endereco &&
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
                        <Form.Label>Endereço</Form.Label>
                        <Form.Control
                            type="endereco"
                            value={endereco}
                            onChange={e => setEndereco(e.target.value)}
                            placeholder="Endereço" />
                    </Form.Group>
                    <Form.Group controlId="formGroupLocalizacao">
                        <Form.Label>Localização</Form.Label>
                        <Form.Control
                            type="localizacao"
                            value={localizacao}
                            onChange={e => setLocalizacao(e.target.value)}
                            placeholder="Localização" />
                    </Form.Group>
                    <Form.Group controlId="formGroupDescricao">
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            type="descricao"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)}
                            placeholder="Descrição" />
                    </Form.Group> 
                    <Form.Group controlId="formGroupCpf">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control
                            type="valor"
                            value={valor}
                            onChange={e => setValor(e.target.value)}
                            placeholder="Valor" />
                    </Form.Group>
                    <Form.Group controlId="formGroupIdImovel">
                        <Form.Label>Id Imóvel</Form.Label>
                        <Form.Control
                            type="IdImovel"
                            value={idImovel}
                            onChange={e => setIdImovel(e.target.value)}
                            placeholder="Id Imóvel" />
                    </Form.Group>   
                    <Form.Group controlId="formGroupIdEngenheiro">
                        <Form.Label>Id Engenheiro</Form.Label>
                        <Form.Control
                            type="idEngenheiro"
                            value={idEngenheiro}
                            onChange={e => setIdEngenheiro(e.target.value)}
                            placeholder="Id Engenheiro" />
                    </Form.Group>         
                    <Button type="submit" className="btn-salvar">Salvar</Button>
                </Form>
            </Modal.Body>
        </Modal>}
        </div>
    );
}