import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import { signIn, signOut } from '../../actions';
import Dropdown from './Dropdown';
import Locale from './Locale';
import Popup from './Popup';

const test = [
  { name: 'Hello', to: '/test' },
  { name: 'Hello', to: '/test' },
  { name: 'Hellosdfasdfasdf', to: '/test' },
  { name: 'Hello', to: '/test' },
  { name: 'Hello', to: '/test' }
];

class Header extends Component {
  state = {
    popup: false
  };

  showPopup() {
    this.setState({ popup: true });
  }

  hidePopup(action) {
    if (action === 'ok') {
      console.log('ok');
    }
    this.setState({ popup: !this.state.popup });
  }

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
            <Locale />
            {name && id ? (
              <Dropdown name={name} items={userMenu} />
            ) : (
              <li>
                <span onClick={() => this.showPopup()} role="presentation">
                  {translate('signIn')}
                </span>
              </li>
            )}
          </ul>
        </div>
        {this.state.popup && (
          <Popup
            hideOk={() => this.hidePopup('ok')}
            hideCancel={() => this.hidePopup('cancel')}
          />
        )}
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
