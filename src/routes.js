import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Colaboradores from "./pages/Colaboradores";
import Clientes from "./pages/Clientes";
import Obras from "./pages/Obras";
import Imoveis from "./pages/Imoveis";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Clientes} />
                <Route exact path="/colaboradores" component={Colaboradores} />
                <Route exact path="/clientes" component={Clientes} />
                <Route exact path="/obras" component={Obras} />
                <Route exact path="/imoveis" component={Imoveis} />

            </Switch>
        </BrowserRouter>
    );
}