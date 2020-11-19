import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Vendedores from "./pages/Vendedores";
import Clientes from "./pages/Clientes";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/vendedores" component={Vendedores} />
                <Route exact path="/clientes" component={Clientes} />
                <Route exact path="/" component={Clientes} />

            </Switch>
        </BrowserRouter>
    );
}