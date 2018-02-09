import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Home from './Home';
import Admin from './Admin';
import Section from './Section';
import Add from './Add';
import My from './My';
import Edit from './Edit';
import Product from './Product';

export default () => (
  <div className="app">
    <Header />
    <div className="content">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/add" component={Add} />
        <Route path="/my" component={My} />
        <Route path="/edit" component={Edit} />
        <Route path="/admin" component={Admin} />
        <Route path="/product/:id" component={Product} />
        <Route path="/:section/:category?" exact component={Section} />
      </Switch>
    </div>
    <Footer />
  </div>
);
