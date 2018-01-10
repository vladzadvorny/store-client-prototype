import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import map from 'lodash.map';
import diff from 'lodash.difference';
import { Link } from 'react-router-dom';

import FormGroup from '../../components/FormGroup';
import langs, { site } from '../../assets/languages';

class EditCategoty extends Component {
  state = {
    names: []
  };

  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      this.setState({ names: newProps.data.categoryNames });
    }
  }

  onChange(e, i) {
    const { name, value } = e.target;
    const { names } = this.state;
    const newArr = names.slice();
    newArr[i] = Object.assign({}, newArr[i], { [name]: value });
    this.setState({ names: newArr });
  }

  render() {
    const {
      deleteCategoryName,
      addOrUpdateCategoryName,
      data: { loading, categoryNames },
      data,
      match: { params: { id } },
      history
    } = this.props;

    const { names } = this.state;

    return loading ? null : (
      <div className="container">
        <div className="row">
          <h2 className="title">
            Edit <i>{id}</i> category
          </h2>
          <button
            style={{ marginBottom: 15 }}
            className="small"
            onClick={() => history.goBack()}
          >
            Go Back
          </button>

          <div style={{ width: '50%' }}>
            {names.map((item, i) => (
              <div
                key={i}
                style={{
                  backgroundColor:
                    categoryNames[i] && names[i].text === categoryNames[i].text
                      ? 'white'
                      : 'lightpink'
                }}
                className="wrapper"
              >
                <FormGroup
                  label={langs[item.lang][0]}
                  name="text"
                  onChange={e => this.onChange(e, i)}
                  value={names[i].text}
                />
                <div style={{ display: 'flex' }}>
                  <button
                    className="small secondary"
                    style={{ marginRight: 10 }}
                    onClick={async () => {
                      await deleteCategoryName({
                        variables: { id, lang: item.lang }
                      });
                      data.refetch();
                      const newArr = names.slice();
                      newArr.splice(i, 1);
                      this.setState({ names: newArr });
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className="small"
                    onClick={async () => {
                      await addOrUpdateCategoryName({
                        variables: { id, lang: item.lang, name: names[i].text }
                      });
                      data.refetch();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
            <div style={{ display: 'flex' }}>
              {diff(site, map(names, 'lang')).map((lang, i) => (
                <button
                  style={{ marginRight: 10 }}
                  className="small secondary"
                  key={i}
                  onClick={() => {
                    this.setState({
                      names: [...names, { lang, text: '' }]
                    });
                  }}
                >
                  {langs[lang][0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const categoryNames = gql`
  query($id: ID!) {
    categoryNames(id: $id) {
      lang
      text
    }
  }
`;

const deleteCategoryNameMutation = gql`
  mutation($id: ID!, $lang: String!) {
    deleteCategoryName(id: $id, lang: $lang)
  }
`;

const addOrUpdateCategoryNameMutation = gql`
  mutation($id: ID!, $lang: String!, $name: String!) {
    addOrUpdateCategoryName(id: $id, lang: $lang, name: $name)
  }
`;

export default compose(
  graphql(categoryNames, {
    options: props => ({
      variables: { id: props.match.params.id }
    })
  }),
  graphql(deleteCategoryNameMutation, {
    name: 'deleteCategoryName'
  }),
  graphql(addOrUpdateCategoryNameMutation, {
    name: 'addOrUpdateCategoryName'
  })
)(EditCategoty);
