import React, { Component } from 'react';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import gql from 'graphql-tag';

import HomeSection from '../components/Home/Section';

const sum = 48;

class Section extends Component {
  state = {
    products: [],
    quantity: sum,
    showMoreButton: true
  };

  async componentWillMount() {
    const { match: { params: { section } } } = this.props;
    this.getProducts(section);
  }

  componentWillReceiveProps(newProps) {
    const { refetchProducts, match: { params: { section } } } = this.props;
    if (newProps.refetchProducts > refetchProducts) {
      this.getProducts(newProps.match.params.section);
      this.setState({
        quantity: sum,
        showMoreButton: true
      });
    }

    if (newProps.match.params.section !== section) {
      this.getProducts(newProps.match.params.section);
      this.setState({
        quantity: sum,
        showMoreButton: true
      });
    }
  }

  async getProducts(section, reset = true, skip = 0, limit = sum) {
    const { client: { query } } = this.props;
    const products = await query({
      query: gql`
      query($skip: Int, $limit: Int) {
        ${section}(skip: $skip, limit: $limit) {
          id
          name
          ${section !== 'stickers' ? 'description' : ''}
          image {
            path
            name
          }
          rating
        }
      }
    `,
      fetchPolicy: 'network-only',
      variables: { skip, limit }
    });

    if (reset) {
      this.setState({ products: products.data[section] });
    } else {
      const newProducts = this.state.products.slice();
      newProducts.push(...products.data[section]);
      this.setState({ products: newProducts });
      if (products.data[section].length < sum) {
        this.setState({ showMoreButton: false });
      }
    }
  }

  fetchMore() {
    const { match: { params: { section } } } = this.props;
    const { quantity } = this.state;
    this.getProducts(section, false, quantity, sum);
    this.setState({ quantity: quantity + sum });
  }

  render() {
    const { translate, match: { params: { section } } } = this.props;
    const { products, showMoreButton } = this.state;
    console.log(this.state.quantity);

    if (!section) {
      return <div>404</div>;
    }

    return (
      <div className="container home">
        <h2>{translate(section)}</h2>

        <HomeSection products={products} stickers={section === 'stickers'} />
        {showMoreButton && (
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <button onClick={() => this.fetchMore()}>More</button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  refetchProducts: state.refetch.products,
  translate: getTranslate(state.locale)
});

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withApollo
)(Section);
