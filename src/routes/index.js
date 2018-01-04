import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from '../components/Header/Header';
import Footer from '../components/Footer';
import Home from './Home';
import Test from './Test';

export default () => (
  <BrowserRouter>
    <div className="app">
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/test" exact component={Test} />
      </Switch>
      <Footer />
    </div>
  </BrowserRouter>
);
