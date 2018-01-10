import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Admin from './Admin';
import Сategories from './Сategories';

export default () => (
  <Switch>
    <Route exact path="/admin" component={Admin} />
    <Route exact path="/admin/categories/edit/:id" component={Сategories} />
    <Route exact path="/admin/categories/:type" component={Сategories} />
  </Switch>
);
