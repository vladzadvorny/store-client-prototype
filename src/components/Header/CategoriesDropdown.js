import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { Link } from 'react-router-dom';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import findIndex from 'lodash.findindex';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const categoriesQuery = gql`
  query($type: TypeEnum!) {
    categories(type: $type) {
      id
      name
      langs
      url
    }
  }
`;

class CategoryDropdown extends Component {
  state = {
    show: false,
    data: []
  };

  componentDidMount() {
    const { section } = this.props;
    const singular = section.substring(0, section.length - 1);
    if (section) {
      this.fetch(singular);
    }
  }

  componentWillReceiveProps(newProps) {
    const { section } = this.props;
    const newSection = newProps.section;
    const singular = newSection.substring(0, newSection.length - 1);

    if (singular !== -1 && section !== newSection) {
      this.fetch(singular);
    }
  }

  async fetch(type) {
    const { client: { query } } = this.props;
    const data = await query({
      query: categoriesQuery,
      variables: {
        type
      }
    });

    this.setState({ data: data.data.categories });
  }

  handleClickOutside() {
    this.setState({ show: false });
  }

  toggle() {
    this.setState({ show: !this.state.show });
  }

  render() {
    const { show, data } = this.state;
    const { section, category, translate } = this.props;

    let categoryName = '';
    if (category) {
      try {
        categoryName =
          data.length === 0
            ? null
            : data[findIndex(data, ['url', category])].name;
      } catch (error) {
        categoryName = 'noname';
      }
    }

    return (
      <li className={`dropdown ${show ? 'active' : null}`}>
        <span onClick={() => this.toggle()} role="presentation">
          {!category ? translate('allCategories') : categoryName}
        </span>
        {show && (
          <div
            className="dropdown-content"
            onClick={() => this.toggle()}
            role="presentation"
          >
            <ul className="two">
              {!category ? null : (
                <li>
                  <Link to={`/${section}`}>All categories</Link>
                </li>
              )}
              {data.map((item, i) => (
                <li key={item.id}>
                  <Link to={`/${section}/${item.url}`}>{item.name}</Link>
                </li>
              ))}
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

export default compose(
  withApollo,
  connect(mapStateToProps, mapDispatchToProps)
)(enhanceWithClickOutside(CategoryDropdown));
