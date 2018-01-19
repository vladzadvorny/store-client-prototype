import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Admin from './Admin';
import Сategories from './Сategories';
import EditСategory from './EditCategory';
import Moderation from './Moderation';

export default () => (
  <Switch>
    <Route exact path="/admin" component={Admin} />
    <Route exact path="/admin/categories/edit/:id" component={EditСategory} />
    <Route exact path="/admin/categories/:type" component={Сategories} />
    <Route exact path="/admin/moderation" component={Moderation} />
  </Switch>
);
