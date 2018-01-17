import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Add from './Add';
import Sticker from './Sticker';

export default () => (
  <Switch>
    <Route exact path="/add" component={Add} />
    <Route exact path="/add/sticker" component={Sticker} />
  </Switch>
);
