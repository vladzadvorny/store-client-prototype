import gql from 'graphql-tag';

export const BotsQuery = gql`
  query($skip: Int, $limit: Int) {
    bots(skip: $skip, limit: $limit) {
      id
      name
      description
      image {
        path
        name
      }
      rating
    }
  }
`;

export const ChannelsQuery = gql`
  query($skip: Int, $limit: Int) {
    channels(skip: $skip, limit: $limit) {
      id
      name
      description
      image {
        path
        name
      }
      rating
    }
  }
`;
export const GroupsQuery = gql`
  query($skip: Int, $limit: Int) {
    groups(skip: $skip, limit: $limit) {
      id
      name
      description
      image {
        path
        name
      }
      rating
    }
  }
`;
export const StickersQuery = gql`
  query($skip: Int, $limit: Int) {
    stickers(skip: $skip, limit: $limit) {
      id
      name
      image {
        path
        name
      }
      rating
    }
  }
`;
