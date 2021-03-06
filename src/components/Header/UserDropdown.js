import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../../actions';

class UserDropdown extends Component {
  state = {
    show: false
  };

  handleClickOutside() {
    this.setState({ show: false });
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }

  signOut() {
    const { SignOut } = this.props;
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    SignOut();
  }

  render() {
    const { show } = this.state;
    const { name, translate } = this.props;

    return (
      <li className={`dropdown ${show ? 'active' : null}`}>
        <span onClick={() => this.toggle()} role="presentation">
          {name}
        </span>
        {show && (
          <div
            className="dropdown-content"
            onClick={() => this.toggle()}
            role="presentation"
          >
            <ul>
              <li>
                <Link to="/admin">Admin</Link>
              </li>
              <li>
                <Link to="/add">{translate('addProduct')}</Link>
              </li>
              <li>
                <Link to="/my">{translate('myProducts')}</Link>
              </li>
              <hr />
              <li>
                <span
                  className="link"
                  onClick={() => this.signOut()}
                  role="presentation"
                >
                  {translate('singOut')}
                </span>
              </li>
            </ul>
          </div>
        )}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
  name: state.me.name
});

const mapDispatchToProps = {
  SignOut: signOut
};

export default connect(mapStateToProps, mapDispatchToProps)(
  enhanceWithClickOutside(UserDropdown)
);
