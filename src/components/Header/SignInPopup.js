import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslate } from 'react-localize-redux';
import { graphql, compose, withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import decode from 'jwt-decode';

import Plane from '../../components/Plane';
import { signIn } from '../../actions';

class SignInPopup extends Component {
  state = {
    time: 60
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

  getTokensTimer(start, code = '') {
    const { client: { query }, cancel, SignIn } = this.props;
    if (start) {
      this.g = setInterval(async () => {
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
        }
      }, 2000);
    } else {
      clearInterval(this.g);
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
    const { cancel, translate, data: { loading, authCode } } = this.props;
    const { time } = this.state;
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

          <input type="text" value={authCode.code} disabled />

          <div className="bottom">
            <button
              className="secondary"
              onClick={() => {
                cancel();
                this.timer(false);
                this.getTokensTimer(false);
              }}
            >
              {translate('cancel')} ({time})
            </button>
            <span className="font_small">
              {translate('ifTheAuthorizationDoesNotPassAutomatically')},{' '}
              <span className="link">{translate('clickHere')}</span>.
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

const mapDispatchToProps = {
  SignIn: signIn
};

export default compose(
  withApollo,
  connect(mapStateToProps, mapDispatchToProps),
  graphql(authCode, { options: { fetchPolicy: 'network-only' } })
)(SignInPopup);
