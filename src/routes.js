import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Vendedores from "./pages/Vendedores";
import Produtos from "./pages/Produtos";
import Clientes from "./pages/Clientes";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/produtos" component={Produtos} />
                <Route exact path="/produtos" component={Produtos} />
                <Route exact path="/vendedores" component={Vendedores} />
                <Route exact path="/clientes" component={Clientes} />

            </Switch>
        </BrowserRouter>
    );
}