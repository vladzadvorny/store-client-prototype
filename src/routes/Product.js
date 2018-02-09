import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import { filesUrl } from '../config';

class Product extends Component {
  render() {
    const {
      match: { params: { id } },
      data: { loading, product }
    } = this.props;

    return loading ? null : (
      <div className="container">
        <div className="row">
          <h2 className="title">{product.name}</h2>

          <div style={{ display: 'flex' }}>
            <img
              style={{ height: 300, width: 300, marginRight: 15 }}
              src={`${filesUrl}/${product.image.path}/${product.image.name}`}
              alt={product.name}
            />
            <div>
              <p className="type">{product.type}</p>
              <p className="category">
                <Link to={`/${product.type}s/${product.category.url}`}>
                  {product.category.name}
                </Link>
              </p>
              <p style={{ fontSize: 16 }}>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const productQuery = gql`
  query($id: ID!) {
    product(id: $id) {
      name
      description
      type
      status
      category {
        name
        url
      }
      owner {
        name
      }
      image {
        path
        name
      }
      rating
    }
  }
`;

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
});

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(productQuery, {
    options: props => ({
      variables: { id: props.match.params.id }
    })
  })
)(Product);
