import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

const Add = ({ translate }) => (
  <div className="container">
    <div className="row">
      <h2 className="title">{translate('addProduct')}</h2>
      <ul>
        <li>
          <Link to="/add/sticker">Add Sticker</Link>
        </li>
      </ul>
    </div>
  </div>
);

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps, null)(Add);
