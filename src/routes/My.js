import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

class My extends Component {
  componentWillReceiveProps(newProps) {
    const { refetchProducts, data: { refetch } } = this.props;
    if (newProps.refetchProducts > refetchProducts) {
      refetch();
    }
  }

  render() {
    const {
      data: { loading, myProducts },
      data,
      translate,
      deleteProduct
    } = this.props;
    if (loading) {
      return null;
    }

    return (
      <div className="container">
        <div className="row">
          <h2 className="title">{translate('myProducts')}</h2>
          {myProducts.length === 0 ? (
            <Link style={{ fontSize: 16 }} to="/add">
              {translate('addProduct')}
            </Link>
          ) : (
            <ul style={{ listStyle: 'none', fontSize: 16 }}>
              <li>
                <p>
                  Unfortunately, editing is not yet possible. But in the near
                  future such an opportunity will appear.
                </p>
              </li>
              {myProducts.map(product => (
                <li key={product.id}>
                  <Link to={`/edit/${product.type}/${product.id}`}>
                    {product.name}
                  </Link>{' '}
                  <span style={{ color: '#aaa', fontSize: 12 }}>
                    {`(${product.type})`}
                  </span>{' '}
                  {product.status === 'moderation' ? (
                    <i style={{ color: '#a19679', fontSize: 12 }}>
                      [moderation]
                    </i>
                  ) : null}{' '}
                  <span
                    role="presentation"
                    className="link"
                    style={{ color: '#ff6347' }}
                    onClick={async () => {
                      await deleteProduct({
                        variables: { id: product.id }
                      });
                      data.refetch();
                    }}
                  >
                    ✗
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

const productsQuery = gql`
  {
    myProducts {
      id
      name
      type
      status
    }
  }
`;

const deleteProductMutation = gql`
  mutation($id: ID!) {
    deleteProduct(id: $id)
  }
`;

const mapStateToProps = state => ({
  refetchProducts: state.refetch.products,
  translate: getTranslate(state.locale)
});

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(productsQuery),
  graphql(deleteProductMutation, {
    name: 'deleteProduct'
  })
)(My);
