import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';

import Plane from '../../components/Plane';

class Popup extends Component {
  state = {
    time: 60
  };
  componentDidMount() {
    this.timer(true);
  }

  timer(start) {
    if (start) {
      this.t = setInterval(() => {
        if (this.state.time > 1) {
          this.setState({ time: this.state.time - 1 });
        } else {
          this.timer(false);
          this.props.cancel();
        }
      }, 1000);
    } else {
      clearInterval(this.t);
      this.setState({ time: 60 });
    }
  }
  render() {
    const { cancel } = this.props;
    const { time } = this.state;
    return (
      <div className="popup">
        <div className="inner">
          <h3>SignIn with Telegram</h3>
          <p>Go to the bot and click start.</p>

          <p>
            <a className="button inverse" href="">
              @storesigninbot <Plane size="25" />
            </a>
          </p>
          <p>
            Or send this message to <a href="">@storesigninbot</a>:
          </p>
          <p>/start sdfsasdf</p>
          <div className="bottom">
            <button className="small secondary" onClick={cancel}>
              Cancel
            </button>
            <span className="timer">
              left <b>:{time}</b>
            </span>
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
