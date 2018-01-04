import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import { signIn, signOut } from '../../actions';
import Dropdown from './Dropdown';

const test = [
  { name: 'Hello', to: '/test' },
  { name: 'Hello', to: '/test' },
  { name: 'Hello', to: '/test' },
  { name: 'Hello', to: '/test' },
  { name: 'Hello', to: '/test' }
];

class Header extends Component {
  render() {
    const { me: { name, id }, translate } = this.props;
    const userMenu = [
      { name: 'Add', to: '/add' },
      { hr: true },
      { name: translate('singOut'), to: '/signout' }
    ];
    return (
      <header className="header">
        <div className="container">
          <ul className="menu">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">FAQ</a>
            </li>
            <Dropdown name="Protocol" items={test} two />
          </ul>
          <ul className="menu">
            {name && id ? (
              <Dropdown name={name} items={userMenu} />
            ) : (
              <li>
                <Link to="/signin">{translate('signIn')}</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
  me: state.me
});

const mapDispatchToProps = {
  signIn,
  signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
