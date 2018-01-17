import React, { Component } from 'react';
import Select from 'react-select';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';

import FormGroup from '../../components/FormGroup';
import { filesUrl } from '../../config';

class Sticker extends Component {
  state = {
    name: '',
    category: null,
    image: null
  };

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async handleChange({ target }) {
    const { mutate } = this.props;
    if (target.validity.valid) {
      try {
        const { data: { productImageUpload } } = await mutate({
          variables: { file: target.files[0] }
        });
        this.setState({ image: productImageUpload });
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const { name, category, image } = this.state;
    const { data: { loading, categories } } = this.props;

    const options = [];
    if (!loading) {
      categories.forEach(item =>
        options.push({
          value: item.id,
          label: item.name
        })
      );
    }
    if (image) {
      console.log(`${filesUrl}/${image.path}/${image.name}`);
    }

    return loading ? null : (
      <div className="container">
        <div className="row add">
          <h2 className="title">Add Stickers</h2>
          <FormGroup
            label="Name"
            name="name"
            onChange={e => this.onChange(e)}
            value={name}
          />
          <label style={{ fontWeight: 'bold' }}>Category</label>
          <Select
            name="category"
            value={category}
            onChange={element => this.onChangeSelect('category', element)}
            options={options}
          />
          {!image ? (
            <input type="file" required onChange={e => this.handleChange(e)} />
          ) : (
            <img
              onError={e => console.log(e)}
              src={`${filesUrl}/${image.path}/${image.name}`}
              alt=""
            />
          )}
        </div>
      </div>
    );
  }
}

const categoriesQuery = gql`
  query($type: TypeEnum!) {
    categories(type: $type) {
      id
      name
    }
  }
`;

const productImageUploadMitation = gql`
  mutation($file: Upload!) {
    productImageUpload(file: $file) {
      id
      name
      path
    }
  }
`;

// const multipleUploadMutation = gql`
//   mutation($files: [Upload!]!) {
//     multipleUpload(files: $files) {
//       id
//       name
//       path
//     }
//   }
// `;

export default compose(
  graphql(categoriesQuery, {
    options: () => ({
      variables: { type: 'sticker' }
    })
  }),
  graphql(productImageUploadMitation)
)(Sticker);
