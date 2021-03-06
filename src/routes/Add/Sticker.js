import React, { Component } from 'react';
import Select from 'react-select';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import FormGroup from '../../components/FormGroup';
import { filesUrl } from '../../config';
import Plane from '../../components/Plane';

class Sticker extends Component {
  state = {
    name: '',
    category: null, // {value: "5a5bd23290ffd10ccd224d04", label: "voluptas"}
    image: null, // {id: "5a5f7f3ef04cd00a8d4be1ef", name: "uby5d4j.jpg", path: "b/v/d", __typename: "File"}
    nameError: false,
    categoryError: false,
    imageError: false,
    ok: false
  };

  componentWillReceiveProps(newProps) {
    const { refetchInterface, data: { refetch } } = this.props;
    if (newProps.refetchInterface > refetchInterface) {
      refetch();
      this.setState({ category: null });
    }
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async onChangeCategory(newCategory) {
    this.setState({
      category: newCategory
    });
  }

  async handleChangeImage({ target }) {
    const { productImageUpload } = this.props;
    this.setState({ imageError: false });

    if (target.validity.valid) {
      try {
        const { data } = await productImageUpload({
          variables: { file: target.files[0] }
        });
        this.setState({ image: data.productImageUpload });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async send() {
    const { name, category, image } = this.state;
    const { addSticker } = this.props;

    if (!name || name.length < 3 || name.length > 40) {
      this.setState({ nameError: true });
    } else if (!category) {
      this.setState({ categoryError: true });
    } else if (!image) {
      this.setState({ imageError: true });
    } else {
      try {
        const { data } = await addSticker({
          variables: {
            name,
            categoryId: category.value,
            imageId: image.id
          }
        });
        console.log(data.addSticker);
        if (data.addSticker) {
          this.setState({ ok: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    const {
      name,
      category,
      image,
      nameError,
      categoryError,
      imageError,
      ok
    } = this.state;
    const { data: { loading, categories }, history, translate } = this.props;

    const categoryOptions = [];
    if (!loading) {
      categories.forEach(item =>
        categoryOptions.push({
          value: item.id,
          label: item.name
        })
      );
    }

    if (ok) {
      return (
        <div className="container">
          <div className="row add">
            <p className="success">
              {translate('theProductWasSuccessfullySentForModeration')}!{' '}
              <span
                className="link"
                onClick={() => history.push('/')}
                role="presentation"
              >
                {translate('home')}
              </span>.
            </p>
          </div>
        </div>
      );
    }

    return loading ? null : (
      <div className="container">
        <div className="row add">
          <h2 className="title">{translate('addStickers')}</h2>
          <FormGroup
            label={translate('name')}
            name="name"
            error={nameError}
            onChange={e => this.onChange(e)}
            onFocus={() => this.setState({ nameError: false })}
            value={name}
            errorMessage={translate('nameError')}
          />
          {/* category */}
          <div className="form-group-select">
            <div className="label-group">
              <label
                className={categoryError ? 'error' : null}
                style={{ fontWeight: 'bold' }}
              >
                {translate('category')}
              </label>
              {categoryError && <span>{translate('fieldIsRequired')}</span>}
            </div>
            {categoryError ? (
              <style>
                {`
                .Select-control {
                  border-color: #ff6347;
                  background-color: #ffe5e0;
                }
              `}
              </style>
            ) : null}
            <Select
              name="category"
              value={category}
              placeholder={`${translate('select')}...`}
              onChange={e => this.onChangeCategory(e)}
              options={categoryOptions}
              onFocus={() => this.setState({ categoryError: false })}
            />
          </div>

          {/* image */}
          <div className="form-group">
            <div className="label-group" style={{ width: 200 }}>
              {!imageError && (
                <label
                  className={imageError ? 'error' : null}
                  style={{ fontWeight: 'bold' }}
                >
                  {translate('image')}
                </label>
              )}
              {imageError && <span>{translate('fieldIsRequired')}</span>}
            </div>
            <div className={`image-wrapper ${imageError ? 'error' : null}`}>
              {!image ? (
                <div className="file-input-wrapper">
                  {translate('clickHere')}
                  <input
                    type="file"
                    required
                    onChange={e => this.handleChangeImage(e)}
                    onFocus={() => this.setState({ imageError: false })}
                  />
                </div>
              ) : (
                <img
                  onError={e => console.log(e)}
                  src={`${filesUrl}/${image.path}/${image.name}`}
                  alt=""
                />
              )}
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginTop: 15,
              paddingTop: 15,
              borderTop: '1px solid #e8e8e8'
            }}
          >
            <button
              className="secondary"
              style={{ marginRight: 15 }}
              onClick={() => history.goBack()}
            >
              {translate('cancel')}
            </button>
            <button onClick={() => this.send()}>
              {translate('submitToModeration')}
              <Plane size="19" />
            </button>
          </div>
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

const addStickerMutation = gql`
  mutation($name: String!, $categoryId: ID!, $imageId: ID!) {
    addSticker(name: $name, categoryId: $categoryId, imageId: $imageId)
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

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
  refetchInterface: state.refetch.interface
});

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(categoriesQuery, {
    options: () => ({
      variables: { type: 'sticker' }
    })
  }),
  graphql(productImageUploadMitation, {
    name: 'productImageUpload'
  }),
  graphql(addStickerMutation, {
    name: 'addSticker'
  })
)(Sticker);
