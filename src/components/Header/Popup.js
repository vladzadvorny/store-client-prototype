import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

class Popup extends Component {
  render() {
    const { hideCancel, hideOk } = this.props;
    return (
      <div className="popup">
        <div className="inner">
          <div className="text">111</div>
          <div className="buttons">
            <button onClick={hideCancel}>11</button>
            <button onClick={hideOk}>11</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
});

export default connect(mapStateToProps, null)(Popup);
