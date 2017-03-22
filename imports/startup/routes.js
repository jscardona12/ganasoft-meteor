import React from 'react';
import App from './components/app';
import {render} from 'react-dom'
import {Router, Route, hashHistory,IndexRoute} from 'react-router'
import Fincas from '../ui/Fincas';
import Animal from '../ui/Animal';
import Home from '../ui/Home'


export const renderRoutes = () => (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="/fincas" component={Fincas}/>
            <Route path="/:idfinca/animales" component={Animal}/>
        </Route>
    </Router>
);



