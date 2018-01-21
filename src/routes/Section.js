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
    const { match: { params: { section, category } } } = this.props;
    this.getProducts(section, category);
  }

  componentWillReceiveProps(newProps) {
    const {
      refetchProducts,
      match: { params: { section, category } }
    } = this.props;
    if (
      newProps.refetchProducts > refetchProducts ||
      newProps.match.params.section !== section ||
      newProps.match.params.category !== category
    ) {
      this.getProducts(
        newProps.match.params.section,
        newProps.match.params.category
      );
      this.setState({
        quantity: sum,
        showMoreButton: true
      });
    }

    // if (newProps.match.params.section !== section) {
    //   this.getProducts(
    //     newProps.match.params.section,
    //     newProps.match.params.category
    //   );
    //   this.setState({
    //     quantity: sum,
    //     showMoreButton: true
    //   });
    // }
  }

  async getProducts(section, category, reset = true, skip = 0, limit = sum) {
    const { client: { query } } = this.props;

    const products = await query({
      query: gql`
      query($skip: Int, $limit: Int, $category: String) {
        ${section}(skip: $skip, limit: $limit, category: $category) {
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
      variables: { skip, limit, category }
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
    const { match: { params: { section, category } } } = this.props;
    const { quantity } = this.state;
    this.getProducts(section, category, false, quantity, sum);
    this.setState({ quantity: quantity + sum });
  }

  render() {
    const { translate, match: { params: { section } } } = this.props;
    const { products, showMoreButton } = this.state;

    if (!section) {
      return <div>404</div>;
    }

    return (
      <div className="container home">
        <h2>{translate(section)}</h2>
        <h3 style={{ marginTop: 5, marginBottom: 20, fontSize: 16 }}>
          Category name
        </h3>

        <HomeSection products={products} stickers={section === 'stickers'} />
        {showMoreButton && (
          <div
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <button onClick={() => this.fetchMore()}>
              {translate('more')}
            </button>
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
