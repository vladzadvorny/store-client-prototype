import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Section from '../components/Home/Section';
import Loading from '../components/Loading';

import {
  BotsQuery,
  ChannelsQuery,
  GroupsQuery,
  StickersQuery
} from '../queries/home';

class Home extends Component {
  componentWillReceiveProps(newProps) {
    const { refetchProducts, botsQuery, channelsQuery } = this.props;
    if (newProps.refetchProducts > refetchProducts) {
      botsQuery.refetch();
      channelsQuery.refetch();
    }
  }

  render() {
    const {
      botsQuery,
      channelsQuery,
      groupsQuery,
      stickersQuery,
      translate
    } = this.props;
    if (
      botsQuery.loading ||
      channelsQuery.loading ||
      groupsQuery.loading ||
      stickersQuery.loading
    ) {
      return null;
    }

    return (
      <div className="container home">
        {/* bots */}
        <h2>{translate('bots')}</h2>
        {botsQuery.loading ? (
          <Loading />
        ) : (
          <Section products={botsQuery.bots} />
        )}

        {/* channels */}
        <h2>{translate('channels')}</h2>
        {channelsQuery.loading ? (
          <Loading />
        ) : (
          <Section products={channelsQuery.channels} />
        )}

        {/* groups */}
        <h2>{translate('groups')}</h2>
        {groupsQuery.loading ? (
          <Loading />
        ) : (
          <Section products={groupsQuery.groups} />
        )}

        {/* stickers */}
        <h2>{translate('stickers')}</h2>
        {groupsQuery.loading ? (
          <Loading />
        ) : (
          <Section products={stickersQuery.stickers} stickers />
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
  graphql(BotsQuery, {
    name: 'botsQuery',
    fetchPolicy: 'network-only',
    options: () => ({
      variables: { skip: 0, limit: 12 }
    })
  }),
  graphql(ChannelsQuery, {
    name: 'channelsQuery',
    fetchPolicy: 'network-only',
    options: () => ({
      variables: { skip: 0, limit: 12 }
    })
  }),
  graphql(GroupsQuery, {
    name: 'groupsQuery',
    fetchPolicy: 'network-only',
    options: () => ({
      variables: { skip: 0, limit: 12 }
    })
  }),
  graphql(StickersQuery, {
    name: 'stickersQuery',
    fetchPolicy: 'network-only',
    options: () => ({
      variables: { skip: 0, limit: 12 }
    })
  })
)(Home);
