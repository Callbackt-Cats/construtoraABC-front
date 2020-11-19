import React from 'react';
import { FiUser, FiBox, FiUsers} from 'react-icons/fi';
import { FaTools } from 'react-icons/fa';
import { BiBuildingHouse } from 'react-icons/bi';
import { GiHouseKeys } from 'react-icons/gi';

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
                    <Dropdown.Item href="/materiais">Materiais</Dropdown.Item>
                    <Dropdown.Item href="/imoveis">Imovéis</Dropdown.Item>
                    <Dropdown.Item href="/obras">Obras</Dropdown.Item>
                    <Dropdown.Item href="/colaboradores">Colaboradores</Dropdown.Item>
                    <Dropdown.Item href="/clientes">Clientes</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <div className="menu">
                <a href="/materiais" name="materiais"> <FaTools /> <span>Materiais</span></a>
                <a href="/imoveis" name="imoveis"> <GiHouseKeys /> <span>Imovéis</span></a>
                <a href="/obras" name="Obras"> <BiBuildingHouse /> <span>Obras</span></a>
                <a href="/colaboradores" name="Colaboradores"> <FiUser /><span>Colaboradores</span></a>
                <a href="/clientes" name="Clientes"> <FiUsers /><span>Clientes</span></a>
            </div>
        </div>
    );
}