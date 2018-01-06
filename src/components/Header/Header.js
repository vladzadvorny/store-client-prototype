import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Dropdown from './Dropdown';
import LocaleDropdown from './LocaleDropdown';
import UserDropdown from './UserDropdown';
import SignInPopup from './SignInPopup';

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

  hidePopup() {
    this.setState({ popup: !this.state.popup });
  }

  render() {
    const { me: { name, id }, translate } = this.props;

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
            <LocaleDropdown />
            {name && id ? (
              <UserDropdown />
            ) : (
              <li>
                <span onClick={() => this.showPopup()} role="presentation">
                  {translate('signIn')}
                </span>
              </li>
            )}
          </ul>
        </div>
        {this.state.popup && <SignInPopup cancel={() => this.hidePopup()} />}
      </header>
    );
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
  me: state.me
});

export default connect(mapStateToProps, null)(Header);
