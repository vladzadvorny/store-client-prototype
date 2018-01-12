import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import CategoriesDropdown from './CategoriesDropdown';
import LocaleDropdown from './LocaleDropdown';
import UserDropdown from './UserDropdown';
import SignInPopup from './SignInPopup';
import SectionsDropdown from './SectionsDropdown';
import { types } from '../../config';

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
    const section = location.split('/')[1];
    const isType = section
      ? types.indexOf(section.substring(0, section.length - 1)) !== -1
      : false;
    const category = location.split('/')[2];

    return (
      <header className="header">
        <div className="container">
          <ul className="menu">
            {location === '/' || isType ? (
              <SectionsDropdown section={section} />
            ) : (
              <li>
                <Link to="/">{translate('home')}</Link>
              </li>
            )}

            {isType && (
              <CategoriesDropdown section={section} category={category} />
            )}

            {/* <li>
              <a href="#">FAQ</a>
            </li> */}
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
