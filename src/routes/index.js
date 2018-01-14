import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Home from './Home';
import Test from './Test';
import Admin from './Admin';
import Section from './Section';
import AddProduct from './AddProduct';

export default () => (
  <div className="app">
    <Header />
    <div className="content">
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/test" exact component={Test} />
        <Route path="/add" exact component={AddProduct} />
        <Route path="/admin" component={Admin} />
        <Route path="/:section" exact component={Section} />
      </Switch>
    </div>
    <Footer />
  </div>
);
