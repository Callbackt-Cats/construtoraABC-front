import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Colaboradores from "./pages/Colaboradores";
import Clientes from "./pages/Clientes";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/colaboradores" component={Colaboradores} />
                <Route exact path="/" component={Clientes} />
                <Route exact path="/clientes" component={Clientes} />

            </Switch>
        </BrowserRouter>
    );
}