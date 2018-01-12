import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import { Link } from 'react-router-dom';
import { withApollo, compose } from 'react-apollo';
import gql from 'graphql-tag';
import findIndex from 'lodash.findindex';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import { types } from '../../config';

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

class Dropdown extends Component {
  state = {
    show: false,
    data: []
  };

  componentDidMount() {
    const { location } = this.props;
    const section = location.split('/')[1];
    if (section) {
      this.fetch(section.substring(0, section.length - 1));
    }
  }

  componentWillReceiveProps(newProps) {
    const section = this.props.location.split('/')[1];
    const newSection = newProps.location.split('/')[1];

    if (
      types.indexOf(newSection.substring(0, newSection.length - 1)) !== -1 &&
      section !== newSection
    ) {
      this.fetch(newSection.substring(0, newSection.length - 1));
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
    const { location, translate } = this.props;

    const sectionUrl = location.split('/')[1];
    const categoryUrl = location.split('/')[2];
    let categoryName;
    if (categoryUrl) {
      categoryName =
        data.length === 0
          ? null
          : data[findIndex(data, ['url', categoryUrl])].name;
    } else {
      categoryName = null;
    }

    if (types.indexOf(sectionUrl.substring(0, sectionUrl.length - 1)) === -1) {
      return null;
    }

    return (
      <li className={`dropdown ${show ? 'active' : null}`}>
        <span onClick={() => this.toggle()} role="presentation">
          {!categoryUrl ? translate('allCategories') : categoryName}
        </span>
        {show && (
          <div className="dropdown-content">
            <ul className="two">
              {!categoryUrl ? null : (
                <li>
                  <Link to={`/${sectionUrl}`}>All categories</Link>
                </li>
              )}
              {data.map((item, i) => {
                return (
                  <li key={item.id}>
                    <Link to={`/bots/${item.url}`}>{item.name}</Link>
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

export default compose(
  withApollo,
  connect(mapStateToProps, mapDispatchToProps)
)(enhanceWithClickOutside(Dropdown));
