import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';

import Plane from '../components/Plane';

class Home extends Component {
  componentWillReceiveProps(newProps) {
    const { refetchProducts, data: { refetch } } = this.props;
    if (newProps.refetchProducts > refetchProducts) {
      refetch();
    }
  }

  render() {
    const { data: { loading, bots } } = this.props;
    if (loading) {
      return null;
    }
    return (
      <div>
        <button className="inverse" onClick={() => this.props.data.refetch()}>
          Hello
          <Plane size="19" />
        </button>
        {bots.map(u => (
          <div key={u.id}>
            <h3>{u.title}</h3>
            <p>{u.description}</p>
          </div>
        ))}
      </div>
    );
  }
}

const botsQuery = gql`
  {
    bots {
      id
      title
      description
    }
  }
`;

const mapStateToProps = state => ({
  refetchProducts: state.refetch.products
});

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(botsQuery)
)(Home);
