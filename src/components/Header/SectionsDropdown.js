import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import { types } from '../../config';

class SectionsDropdown extends Component {
  state = {
    show: false
  };

  handleClickOutside() {
    this.setState({ show: false });
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { show } = this.state;
    const { location, translate } = this.props;

    const section = location.split('/')[1];

    if (
      section &&
      types.indexOf(section.substring(0, section.length - 1)) === -1
    ) {
      return (
        <li>
          <Link to="/">{translate('home')}</Link>
        </li>
      );
    }

    return (
      <li className={`dropdown ${show ? 'active' : null}`}>
        <span onClick={() => this.toggle()} role="presentation">
          {!section ? translate('allSections') : translate(section)}
        </span>
        {show && (
          <div
            className="dropdown-content"
            onClick={() => this.toggle()}
            role="presentation"
          >
            <ul>
              {!section ? null : (
                <li>
                  <Link to="/">{translate('allSections')}</Link>
                </li>
              )}
              {types.map((item, i) => {
                return `${item}s` === section ? null : (
                  <li key={i}>
                    <Link style={{ width: '100%' }} to={`/${item}s`}>
                      {translate(`${item}s`)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  enhanceWithClickOutside(SectionsDropdown)
);
