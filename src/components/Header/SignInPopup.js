import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import decode from 'jwt-decode';

import Plane from '../../components/Plane';
import { signIn } from '../../actions';

class SignInPopup extends Component {
  state = {
    time: 60,
    errorDisplay: false
  };

  componentDidMount() {
    this.timer(true);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.data.loading) {
      const { time, code } = newProps.data.authCode;

      if (this.props.data.authCode === undefined) {
        this.setState({
          time
        });
        this.getTokensTimer(true, code);
      }
    }
  }

  async getTokens(code) {
    const { client: { query }, cancel, SignIn } = this.props;
    const tokens = await query({
      query: gql`
        query($code: String!) {
          signIn(code: $code) {
            token
            refreshToken
          }
        }
      `,
      fetchPolicy: 'network-only',
      variables: {
        code
      }
    });

    const { token, refreshToken } = tokens.data.signIn;
    // console.log(token, refreshToken);
    if (token && refreshToken) {
      // set local storage
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      const { user } = await decode(token);

      SignIn(user);
      // get
      this.timer(false);
      this.getTokensTimer(false);
      cancel();

      return true;
    }
    return false;
  }

  getTokensTimer(start, code = '') {
    if (start) {
      this.g = setInterval(() => this.getTokens(code), 3000);
    } else {
      clearInterval(this.g);
    }
  }

  async checkTokens(code) {
    const getResult = await this.getTokens(code);

    if (!getResult) {
      this.setState({ errorDisplay: true });
      setTimeout(() => {
        this.setState({ errorDisplay: false });
      }, 4000);
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
      this.getTokensTimer(false);
      this.setState({ time: 60 });
    }
  }

  render() {
    const {
      cancel,
      translate,
      currentLanguage,
      data: { loading, authCode }
    } = this.props;
    const { time, errorDisplay } = this.state;
    if (loading) {
      return null;
    }

    return (
      <div className="popup">
        <div className="inner">
          <h3>{translate('signInwithTelegram')}</h3>
          <p>{translate('goToTheBotAndClickStart')}.</p>

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
            {translate('orSendThisMessageTo')}{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://telegram.me/storesigninbot"
            >
              @storesigninbot
            </a>:
          </p>

          <input
            style={{ marginBottom: 15 }}
            type="text"
            value={authCode.code}
            disabled
          />
          <p
            className="error"
            style={{ display: errorDisplay ? 'inline' : 'none' }}
          >
            {translate('codeNotReceived')}
          </p>

          <div className="bottom">
            <button
              className="secondary"
              onClick={() => {
                cancel();
                this.timer(false);
                this.getTokensTimer(false);
              }}
            >
              {translate('cancel')}
              {currentLanguage === 'ar' ? `  ${time}` : ` (${time})`}
            </button>
            <span className="font_small">
              {translate('ifTheAuthorizationDoesNotPassAutomatically')},{' '}
              <span
                className="link"
                onClick={() => this.checkTokens(authCode.code)}
                role="presentation"
              >
                {translate('clickHere')}
              </span>.
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
  translate: getTranslate(state.locale),
  currentLanguage: getActiveLanguage(state.locale).code
});

const mapDispatchToProps = {
  SignIn: signIn
};

export default compose(
  withApollo,
  connect(mapStateToProps, mapDispatchToProps),
  graphql(authCode, { options: { fetchPolicy: 'network-only' } })
)(SignInPopup);
