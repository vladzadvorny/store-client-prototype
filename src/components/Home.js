import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class Home extends Component {
  render() {
    const { products = [] } = this.props.data;
    return (
      <div>
        {products.map(u => (
          <div key={u.id}>
            <h3>{u.title}</h3>
            <p>{u.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

const productsQuery = gql`
  {
    products {
      id
      title
      description
    }
  }
`;

export default graphql(productsQuery)(Home);
