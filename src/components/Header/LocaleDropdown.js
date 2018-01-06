import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { connect } from 'react-redux';
import {
  getTranslate,
  getLanguages,
  setActiveLanguage,
  getActiveLanguage
} from 'react-localize-redux';

import langs from '../../assets/languages';

class LocaleDropdown extends Component {
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
    const { translate, languages, currentLanguage, setLanguage } = this.props;

    return (
      <li className={`dropdown locale ${show ? 'active' : null}`}>
        <span onClick={() => this.toggle()} role="presentation">
          {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)}
        </span>
        {show && (
          <div className="dropdown-content">
            <ul style={{ borderRight: '1px solid #e8e8e8' }}>
              <li className="title">{translate('interface')}</li>
              <hr />
              {languages.map(language => (
                <li
                  key={language.code}
                  role="presentation"
                  onClick={() => {
                    setLanguage(language.code);
                    localStorage.setItem('locale', language.code);
                  }}
                >
                  <span
                    className={
                      language.code === currentLanguage ? 'selected' : null
                    }
                  >
                    {langs[language.code][1]}
                  </span>
                </li>
              ))}
            </ul>
            <ul>
              <li className="title">{translate('products')}</li>
              <hr />
              <li>
                <a href="/">hello</a>
              </li>
            </ul>
          </div>
        )}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  languages: getLanguages(state.locale),
  translate: getTranslate(state.locale),
  currentLanguage: getActiveLanguage(state.locale).code
});

const mapDispatchToProps = {
  setLanguage: setActiveLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(
  enhanceWithClickOutside(LocaleDropdown)
);
