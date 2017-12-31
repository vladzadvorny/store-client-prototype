const defaults = {
  me: {
    id: -1,
    name: '',
    __typename: 'me'
  }
};

const resolvers = {
  signin: (_, { id, name }, { cache }) => {
    const user = {
      id,
      name
    };
    cache.writeData({ data: { me: user } });
    return null;
  },
  signout: (_, variables, { cache }) => {
    const user = {
      id: -1,
      name: ''
    };
    cache.writeData({ data: { me: user } });
    return null;
  }
};

export default {
  defaults,
  resolvers
};
