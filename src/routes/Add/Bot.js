import React, { Component } from 'react';
import Select from 'react-select';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import FormGroup from '../../components/FormGroup';
import { filesUrl } from '../../config';
import Plane from '../../components/Plane';
import languages from '../../assets/languages';

class Bot extends Component {
  state = {
    category: null, // {value: "5a5bd23290ffd10ccd224d04", label: "voluptas"},
    image: null, // {id: "5a5f7f3ef04cd00a8d4be1ef", name: "uby5d4j.jpg", path: "b/v/d", __typename: "File"}
    descriptions: [
      {
        lang: '',
        langError: false,
        name: '',
        nameError: false,
        body: '',
        bodyError: false
      }
    ],
    categoryError: false,
    imageError: false,
    descriptionsError: false,
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

  async onChangeSelect(name, value) {
    this.setState({ [name]: value });
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
    const { name, description, category, lang, image } = this.state;
    const { addBot } = this.props;

    if (!name || name.length < 3 || name.length > 40) {
      this.setState({ nameError: true });
    } else if (
      !description ||
      description.length < 3 ||
      description.length > 240
    ) {
      this.setState({ descriptionError: true });
    } else if (!category) {
      this.setState({ categoryError: true });
    } else if (!lang) {
      this.setState({ langError: true });
    } else if (!image) {
      this.setState({ imageError: true });
    } else {
      try {
        const { data } = await addBot({
          variables: {
            name,
            description,
            categoryId: category.value,
            lang: lang.value,
            imageId: image.id
          }
        });
        console.log(data.addBot);
        if (data.addBot) {
          this.setState({ ok: true });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    // console.log(this.state);
    const {
      category,
      image,
      descriptions,
      categoryError,
      imageError,
      descriptionsError,
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
    const langsOptions = [];
    Object.keys(languages).map(key =>
      langsOptions.push({
        value: key,
        label: languages[key][1]
      })
    );

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
          <h2 className="title">{translate('addBot')}</h2>

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
                .category .Select-control {
                  border-color: #ff6347;
                  background-color: #ffe5e0;
                }
              `}
              </style>
            ) : null}
            <Select
              name="category"
              className="category"
              value={category}
              placeholder={`${translate('select')}...`}
              onChange={e => this.onChangeSelect('category', e)}
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

          {/* descriptions box */}
          <div className="form-group">
            <div className="label-group">
              <label
                className={descriptionsError ? 'error' : null}
                style={{ fontWeight: 'bold' }}
              >
                {translate('description')}
              </label>
              {descriptionsError && <span>{translate('fieldIsRequired')}</span>}
            </div>
            <div
              className={`bot-desctriptions-box ${
                descriptionsError ? 'error' : null
              }`}
            >
              <ul>
                {descriptions.map((item, i) => (
                  <li key={i}>
                    <b>{`#${i + 1} - ${item.lang}`}</b>
                    <FormGroup
                      label={translate('name')}
                      name={`name-${i}`}
                      error={item.nameError}
                      onChange={e => this.onChange(e)}
                      // onFocus={() => this.setState({ nameError: false })}
                      value={item.name}
                      errorMessage={translate('nameError')}
                    />

                    {/* lang */}
                    <div className="form-group-select">
                      <div className="label-group">
                        <label
                          className={item.langError ? 'error' : null}
                          style={{ fontWeight: 'bold' }}
                        >
                          {translate('language')}
                        </label>
                        {item.langError && (
                          <span>{translate('fieldIsRequired')}</span>
                        )}
                      </div>
                      {item.langError ? (
                        <style>
                          {`                
                              .lang .Select-control {
                              border-color: #ff6347;
                              background-color: #ffe5e0;              
                            }                
                          `}
                        </style>
                      ) : null}
                      <Select
                        name="lang"
                        className="lang"
                        value={item.lang}
                        placeholder={`${translate('select')}...`}
                        onChange={e => this.onChangeSelect('lang', e)}
                        options={langsOptions}
                        onFocus={() => this.setState({ langError: false })}
                      />
                    </div>

                    {/* body */}
                    <div className="form-group">
                      <div className="label-group">
                        <label
                          className={item.bodyError ? 'error' : null}
                          style={{ fontWeight: 'bold' }}
                        >
                          {translate('description')}
                        </label>
                        {item.bodyError && (
                          <span>{translate('descriptionError')}</span>
                        )}
                      </div>
                      <textarea
                        name="body"
                        // onFocus={() =>
                        // this.setState({ descriptionError: false })
                        // }
                        className={`form-control ${
                          item.bodyError ? 'error' : null
                        }`}
                        value={item.body}
                        onChange={e => this.onChange(e)}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* buttons */}
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
/**
 *     
  name,
  description,
  category,
  lang,
  image,
 */

const addGroupMutation = gql`
  mutation(
    $name: String!
    $description: String!
    $categoryId: ID!
    $lang: String!
    $imageId: ID!
  ) {
    addBot(
      name: $name
      description: $description
      categoryId: $categoryId
      lang: $lang
      imageId: $imageId
    )
  }
`;

const mapStateToProps = state => ({
  translate: getTranslate(state.locale),
  refetchInterface: state.refetch.interface
});

const mapDispatchToProps = {};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  graphql(categoriesQuery, {
    options: () => ({
      variables: { type: 'group' }
    })
  }),
  graphql(productImageUploadMitation, {
    name: 'productImageUpload'
  }),
  graphql(addGroupMutation, {
    name: 'addBot'
  })
)(Bot);
