import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { compose, graphql, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';

import FormGroup from '../components/FormGroup';
import { types } from '../config';
import languages from '../assets/languages';

const categoriesQuery = gql`
  query($type: TypeEnum!) {
    categories(type: $type) {
      id
      name
    }
  }
`;

export class AddProduct extends Component {
  state = {
    name: '',
    type: null,
    category: null,
    categoriesList: [],
    lang: ''
  };

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  async onChangeTypeSelect(element) {
    this.setState({
      type: element,
      category: null
    });
    const { client: { query } } = this.props;
    const data = await query({
      query: categoriesQuery,
      variables: {
        type: element.value
      }
    });
    const categories = [];
    data.data.categories.forEach(item =>
      categories.push({
        value: item.id,
        label: item.name
      })
    );

    this.setState({ categoriesList: categories });
  }

  onChangeSelect(type, element) {
    this.setState({ [type]: element });
  }

  render() {
    const { translate } = this.props;
    const { name, type, category, categoriesList, lang } = this.state;
    const typesList = [];
    types.forEach(item =>
      typesList.push({
        value: item,
        label: translate(item)
      })
    );
    const langList = [];
    Object.keys(languages).forEach(key => {
      langList.push({
        value: key,
        label: languages[key][1]
      });
    });
    // for (let prop in languages) {
    //   langList.push({
    //     value: prop,
    //     label: languages[prop][1]
    //   });
    // }

    return (
      <div className="container">
        <div className="row width60">
          <h2 className="title">{translate('addProduct')}</h2>
          <FormGroup
            label="Name"
            name="name"
            onChange={e => this.onChange(e)}
            value={name}
          />
          <label style={{ fontWeight: 'bold' }}>Type</label>
          <Select
            name="type"
            value={type}
            onChange={value => this.onChangeTypeSelect(value)}
            options={typesList}
          />
          <label style={{ fontWeight: 'bold' }}>Category</label>
          <Select
            name="category"
            value={category}
            disabled={categoriesList.length === 0}
            onChange={element => this.onChangeSelect('category', element)}
            options={categoriesList}
          />
          <label style={{ fontWeight: 'bold' }}>Langs</label>
          <Select
            name="langs"
            value={lang}
            onChange={element => this.onChangeSelect('lang', element)}
            options={langList}
          />
          <label style={{ fontWeight: 'bold' }}>Description</label>
          <textarea>f</textarea>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
});

const mapDispatchToProps = {};

export default compose(
  withApollo,
  connect(mapStateToProps, mapDispatchToProps)
  // graphql(addOrUpdateCategoryNameMutation, {
  //   name: 'addOrUpdateCategoryName'
  // })
)(AddProduct);
