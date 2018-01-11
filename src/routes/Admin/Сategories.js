import React from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import { types } from '../../config';

const Categories = ({
  createCategory,
  deleteCategory,
  match: { params: { type } },
  data,
  data: { loading, categories }
}) => {
  if (types.indexOf(type) === -1) {
    return null;
  }

  return loading ? null : (
    <div className="container">
      <div className="row">
        <h2 className="title">
          {`${type.charAt(0).toUpperCase() + type.slice(1)}'`}s categories
        </h2>
        <ul style={{ listStyle: 'none', display: 'flex', marginBottom: 15 }}>
          {types.map((t, i) => (
            <li style={{ marginRight: 10 }} key={i}>
              {t !== type ? <Link to={`/admin/categories/${t}`}>{t}</Link> : t}
            </li>
          ))}
        </ul>

        <ul style={{ listStyle: 'none', fontSize: 15, marginBottom: 15 }}>
          {categories.map(u => (
            <li key={u.id}>
              <Link to={`/admin/categories/edit/${u.id}`}>
                {u.name ? (
                  u.name
                ) : (
                  <span style={{ color: '#98fb98' }}>NEW!</span>
                )}
              </Link>{' '}
              <i style={{ fontSize: 12, color: '#a19679' }}>{u.langs.join()}</i>{' '}
              <span
                role="presentation"
                className="link"
                style={{ color: '#ff6347' }}
                onClick={async () => {
                  await deleteCategory({
                    variables: { id: u.id }
                  });
                  data.refetch();
                }}
              >
                ✗
              </span>
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex' }}>
          <button
            style={{ marginRight: 10 }}
            className="small"
            onClick={() => {
              data.refetch();
            }}
          >
            Refetch
          </button>
          <button
            className="secondary small"
            onClick={async () => {
              await createCategory({
                variables: { type }
              });
              data.refetch();
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

const categoriesQuery = gql`
  query($type: TypeEnum!) {
    categories(type: $type) {
      id
      name
      langs
    }
  }
`;

const createCategoryMutation = gql`
  mutation($type: TypeEnum!) {
    createCategory(type: $type)
  }
`;

const deleteCategoryMutation = gql`
  mutation($id: ID!) {
    deleteCategory(id: $id)
  }
`;

export default compose(
  graphql(categoriesQuery, {
    options: props => ({
      variables: { type: props.match.params.type }
    })
  }),
  graphql(createCategoryMutation, {
    name: 'createCategory'
  }),
  graphql(deleteCategoryMutation, {
    name: 'deleteCategory'
  })
)(Categories);
