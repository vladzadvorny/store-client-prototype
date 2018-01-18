import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Add from './Add';
import Sticker from './Sticker';
import Channel from './Channel';
import Group from './Group';
import Bot from './Bot';

export default () => (
  <Switch>
    <Route exact path="/add" component={Add} />
    <Route exact path="/add/sticker" component={Sticker} />
    <Route exact path="/add/channel" component={Channel} />
    <Route exact path="/add/group" component={Group} />
    <Route exact path="/add/bot" component={Bot} />
  </Switch>
);
