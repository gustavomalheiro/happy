import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';

function Routes() {
    return (
        <BrowserRouter> { /* por volta de todas as rotas eu preciso ter esse browserrouter*/ }
            <Switch> {/* faz com que apenas uma única rota seja exibida ao mesmo tempo*/}
                <Route path="/" exact component={Landing} /> {/* vai fazer uma comparação de igualdade*/}
                <Route path="/app" component={OrphanagesMap} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;