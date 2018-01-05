import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import Plane from '../../components/Plane';

class Popup extends Component {
  state = {
    time: 60
  };

  componentDidMount() {
    this.timer(true);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      this.setState({ time: newProps.data.authCode.time });
    }
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
    const { cancel, translate, data: { loading, authCode } } = this.props;
    const { time } = this.state;
    if (loading) {
      return null;
    }

    return (
      <div className="popup">
        <div className="inner">
          <h3>{translate('signInwithTelegram')}</h3>
          <p>Go to the bot and click start.</p>

          <p>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="button inverse"
              href={`https://telegram.me/storesigninbot?start=${authCode.code}`}
            >
              @storesigninbot <Plane size="25" />
            </a>
          </p>
          <p>
            Or send this message to{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://telegram.me/storesigninbot"
            >
              @storesigninbot
            </a>:
          </p>

          <input type="text" value={authCode.code} disabled />
          <div className="bottom">
            <button
              className="secondary"
              onClick={() => {
                cancel();
                this.timer(false);
              }}
            >
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

const authCode = gql`
  {
    authCode {
      code
      time
    }
  }
`;

const mapStateToProps = state => ({
  translate: getTranslate(state.locale)
});

export default compose(
  connect(mapStateToProps, null),
  graphql(authCode, { options: { fetchPolicy: 'network-only' } })
)(Popup);
