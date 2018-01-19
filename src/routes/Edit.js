import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Sticker from './Add/Sticker';
import Channel from './Add/Channel';
import Group from './Add/Group';
import Bot from './Add/Bot';

export default () => (
  <Switch>
    <Route exact path="/edit/sticker/:id" component={Sticker} />
    <Route exact path="/edit/channel/:id" component={Channel} />
    <Route exact path="/edit/group/:id" component={Group} />
    <Route exact path="/edit/bot/:id" component={Bot} />
  </Switch>
);
