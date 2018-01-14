import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { connect } from 'react-redux';
import {
  getTranslate,
  getLanguages,
  setActiveLanguage,
  getActiveLanguage
} from 'react-localize-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import langs from '../../assets/languages';
import { getStorageLocale, setStorageLocale } from '../../locale';
import {
  refetchInterface as RefetchInterface,
  refetchProducts as RefetchProducts
} from '../../actions';

class LocaleDropdown extends Component {
  state = {
    show: false,
    productsLangs: getStorageLocale().products
  };

  setStorageProductLangs(lang) {
    const locale = getStorageLocale();
    const { products } = locale;
    if (products.indexOf(lang) === -1) {
      products.push(lang);
    } else {
      products.splice(products.indexOf(lang), 1);
    }
    if (products.length === 0) {
      locale.products = ['en'];
    }

    this.setState({ productsLangs: locale.products });
    setStorageLocale(locale);
  }

  handleClickOutside() {
    this.setState({ show: false });
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { show } = this.state;
    const {
      translate,
      languages,
      currentLanguage,
      setLanguage,
      data: { loading, productsLangs },
      refetchInterface,
      refetchProducts
    } = this.props;

    if (loading) {
      return null;
    }

    return (
      <li className={`dropdown locale ${show ? 'active' : null}`}>
        <span onClick={() => this.toggle()} role="presentation">
          {currentLanguage.charAt(0).toUpperCase() + currentLanguage.slice(1)}
        </span>
        {show && (
          <div className="dropdown-content">
            <table>
              <tbody>
                <tr className="title">
                  <td>{translate('interface')}</td>
                  <td>{translate('productLanguages')}</td>
                </tr>
                <tr>
                  <td>
                    <ul>
                      {languages.map(language => (
                        <li
                          key={language.code}
                          role="presentation"
                          onClick={() => {
                            setLanguage(language.code);
                            // storage locale
                            const locale = getStorageLocale();
                            locale.interface = language.code;
                            setStorageLocale(locale);
                            refetchInterface();
                          }}
                        >
                          <span
                            className={
                              language.code === currentLanguage
                                ? 'selected'
                                : null
                            }
                          >
                            {langs[language.code][1]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul className="two">
                      {productsLangs.map((item, i) => (
                        <li
                          key={i}
                          role="presentation"
                          onClick={() => {
                            this.setStorageProductLangs(item);
                            refetchProducts();
                          }}
                        >
                          <span
                            className={
                              this.state.productsLangs.indexOf(item) !== -1
                                ? 'selected'
                                : null
                            }
                          >
                            {langs[item][1]}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </li>
    );
  }
}

const productsLangs = gql`
  {
    productsLangs
  }
`;

const mapStateToProps = state => ({
  languages: getLanguages(state.locale),
  translate: getTranslate(state.locale),
  currentLanguage: getActiveLanguage(state.locale).code
});

const mapDispatchToProps = {
  setLanguage: setActiveLanguage,
  refetchInterface: RefetchInterface,
  refetchProducts: RefetchProducts
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(productsLangs)
)(enhanceWithClickOutside(LocaleDropdown));
