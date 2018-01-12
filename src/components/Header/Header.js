import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import CategoriesDropdown from './CategoriesDropdown';
import LocaleDropdown from './LocaleDropdown';
import UserDropdown from './UserDropdown';
import SignInPopup from './SignInPopup';
import SectionsDropdown from './SectionsDropdown';

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
    const { me: { name, id }, translate, location } = this.props;

    return (
      <header className="header">
        <div className="container">
          <ul className="menu">
            <SectionsDropdown location={location} />
            {/* <li>
              <a href="#">FAQ</a>
            </li> */}
            <CategoriesDropdown location={location} />
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
  me: state.me,
  location: state.router.location.pathname
  // location: state.router.location.pathname.split('/')[1]
});

export default connect(mapStateToProps, null)(Header);
