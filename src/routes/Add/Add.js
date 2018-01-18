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
          <Link to="/add/sticker">{translate('sticker')}</Link>
        </li>
        <li>
          <Link to="/add/channel">{translate('channel')}</Link>
        </li>
        <li>
          <Link to="/add/group">{translate('group')}</Link>
        </li>
        <li>
          <Link to="/add/bot">{translate('bot')}</Link>
        </li>
      </ul>
    </div>
  </div>
);

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps, null)(Add);
