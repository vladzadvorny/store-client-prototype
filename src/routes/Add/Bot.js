import React, { Component } from 'react';
import Select from 'react-select';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import map from 'lodash.map';

import FormGroup from '../../components/FormGroup';
import { filesUrl } from '../../config';
import Plane from '../../components/Plane';
import languages from '../../assets/languages';

const description = {
  name: '',
  nameError: false,
  lang: '',
  langError: false,
  body: '',
  bodyError: false
};

class Bot extends Component {
  state = {
    category: null, // {value: "5a5bd23290ffd10ccd224d04", label: "voluptas"},
    image: null, // {id: "5a5f7f3ef04cd00a8d4be1ef", name: "uby5d4j.jpg", path: "b/v/d", __typename: "File"}
    descriptions: [],
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

  onChangeSelect(name, value) {
    this.setState({ [name]: value });
  }

  onChangeDescriptionsInput(index, name, value) {
    const { descriptions } = this.state;
    const newDescriptions = descriptions.slice();
    newDescriptions[index][name] = value;

    this.setState({
      descriptions: newDescriptions
    });
  }

  checkDescriptionsErrors() {
    const { descriptions } = this.state;
    const newDescriptions = descriptions.slice();
    let error = false;
    descriptions.forEach((item, index) => {
      if (!item.name || item.name.length < 3 || item.name.length > 40) {
        //
        newDescriptions[index].nameError = true;
        error = true;
      } else if (!item.lang) {
        //
        newDescriptions[index].langError = true;
        error = true;
      } else if (!item.body || item.body.length < 3 || item.body.length > 240) {
        //
        newDescriptions[index].bodyError = true;
        error = true;
      }
    });

    this.setState({
      descriptions: newDescriptions
    });

    return error;
  }

  cleanDescriptionsErrors() {
    const { descriptions } = this.state;
    const newDescriptions = descriptions.slice();
    descriptions.forEach((item, index) => {
      newDescriptions[index].nameError = false;
      newDescriptions[index].langError = false;
      newDescriptions[index].bodyError = false;
    });
    this.setState({
      descriptions: newDescriptions
    });
  }

  addDescription() {
    const { descriptions } = this.state;
    const newDescriptions = descriptions.slice();
    newDescriptions.push(Object.assign({}, description));
    this.setState({
      descriptions: newDescriptions,
      descriptionsError: false
    });
  }

  deleteDescription(index) {
    const { descriptions } = this.state;
    const newDescriptions = descriptions.slice();
    newDescriptions.splice(index, 1);
    this.setState({
      descriptions: newDescriptions
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
    const { category, image, descriptions } = this.state;
    const { addBot } = this.props;

    if (!category) {
      this.setState({ categoryError: true });
    } else if (!image) {
      this.setState({ imageError: true });
    } else if (descriptions.length === 0) {
      this.setState({ descriptionsError: true });
    } else if (this.checkDescriptionsErrors()) {
      //
    } else {
      const newDescriptions = descriptions.map(item => ({
        lang: item.lang.value,
        name: item.name,
        body: item.body
      }));

      try {
        const { data } = await addBot({
          variables: {
            categoryId: category.value,
            descriptionsJSON: JSON.stringify(newDescriptions),
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
    // console.log(this.state.descriptions);
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
    const langState = map(descriptions, 'lang.value');
    Object.keys(languages).forEach(key => {
      if (langState.indexOf(key) === -1) {
        langsOptions.push({
          value: key,
          label: languages[key][1]
        });
      }
    });

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
                {translate('namesAndDescriptions')}
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
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <b style={{ color: '#a19679' }}>
                        {`#${i + 1}  ${
                          item.lang.value !== undefined
                            ? languages[item.lang.value][1]
                            : ''
                        }`}
                      </b>
                      <span
                        role="presentation"
                        onClick={() => this.deleteDescription(i)}
                        className="link"
                      >
                        {translate('delete')}
                      </span>
                    </div>

                    <FormGroup
                      label={translate('name')}
                      name={`name-${i}`}
                      error={item.nameError}
                      onChange={e =>
                        this.onChangeDescriptionsInput(
                          i,
                          'name',
                          e.target.value
                        )
                      }
                      onFocus={() => this.cleanDescriptionsErrors()}
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
                        onChange={e =>
                          this.onChangeDescriptionsInput(i, 'lang', e)
                        }
                        options={langsOptions}
                        onFocus={() => this.cleanDescriptionsErrors()}
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
                        name={`body-${i}`}
                        onFocus={() => this.cleanDescriptionsErrors()}
                        className={`form-control ${
                          item.bodyError ? 'error' : null
                        }`}
                        value={item.body}
                        onChange={e =>
                          this.onChangeDescriptionsInput(
                            i,
                            'body',
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end'
                }}
              >
                <button className="small" onClick={() => this.addDescription()}>
                  {translate('add')}
                </button>
              </div>
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

const addBotMutation = gql`
  mutation($categoryId: ID!, $descriptionsJSON: String!, $imageId: ID!) {
    addBot(
      categoryId: $categoryId
      descriptionsJSON: $descriptionsJSON
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
  graphql(addBotMutation, {
    name: 'addBot'
  })
)(Bot);
