import React from 'react';
import { FiUser, FiBox, FiUsers } from 'react-icons/fi';

import { Dropdown } from 'react-bootstrap';

import './styles.css';

export default function Menu() {
    return (
        <div className="menu-content">
            <Dropdown className="col-3">
                <Dropdown.Toggle id="dropdown-basic">
                   Menu
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="/produtos">Produtos</Dropdown.Item>
                    <Dropdown.Item href="/vendedores">Vendedores</Dropdown.Item>
                    <Dropdown.Item href="/clientes">Clientes</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div className="menu">
                <a href="/produtos" name="Produtos"> <FiBox /> <span>Produtos</span></a>
                <a href="/vendedores" name="Vendedores"> <FiUser /><span>Vendedores</span></a>
                <a href="/clientes" name="Clientes"> <FiUsers /><span>Clientes</span></a>
            </div>
        </div>
    );
}