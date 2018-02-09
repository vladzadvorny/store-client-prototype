import React from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { Link } from 'react-router-dom';

import Stars from './Stars';
import Plane from '../Plane';
import { filesUrl } from '../../config';

const Section = ({ translate, products, stickers }) => {
  if (Array.isArray(products) && products.length === 0) {
    return 'no';
  }

  return (
    <div className="home-section">
      {products.map(product => (
        <div key={product.id} className="item">
          <Link className="title" to={`/product/${product.id}`}>
            {product.name}
          </Link>
          {!stickers && (
            <div className="description">
              <div className="shadow" />
              {product.description}
            </div>
          )}
          <img
            src={`${filesUrl}/${product.image.path}/${product.image.name}`}
            alt={product.name}
          />

          <div className="item-bottom">
            <Stars rating={product.rating} />
            <button className="small inverse" onClick={() => this.send()}>
              {translate('add')}
              <Plane size="13" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Section);
