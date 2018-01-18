import React, { Component } from 'react';
import Select from 'react-select';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import FormGroup from '../../components/FormGroup';
import { filesUrl } from '../../config';
import Plane from '../../components/Plane';

class Group extends Component {
  render() {
    return (
      <div className="container">
        <div className="row add">
          <h2 className="title">Add Group</h2>
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

// const addStickerMutation = gql`
//   mutation($title: String!, $categoryId: ID!, $imageId: ID!) {
//     addSticker(title: $title, categoryId: $categoryId, imageId: $imageId)
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
      variables: { type: 'group' }
    })
  }),
  graphql(productImageUploadMitation, {
    name: 'productImageUpload'
  })
  // graphql(addStickerMutation, {
  //   name: 'addSticker'
  // })
)(Group);
