import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from "wouter";
import {T} from '#Util/translation';
import routes from '#Root/routes';

const Routes = () => {
return (
    <>
    {routes.map(route => <Route path={route.href} component={route.component} /> )}
    </>)

}

export default Routes;
