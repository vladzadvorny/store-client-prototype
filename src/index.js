import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './style.scss';

const mountNode = document.createElement('div');
document.body.appendChild(mountNode);

const render = () => {
  ReactDOM.render(<App />, mountNode);
};

render();

// eslint-disable-next-line
if (__DEV__) {
  if (module.hot) {
    module.hot.accept('./App', () => {
      // restore scroll
      const { scrollLeft, scrollTop } = document.scrollingElement;
      ReactDOM.unmountComponentAtNode(mountNode);
      try {
        render();
        document.scrollingElement.scrollTop = scrollTop;
        document.scrollingElement.scrollLeft = scrollLeft;
      } catch (e) {
        console.error(e); // eslint-disable-line no-console
      }
    });
  }
}

registerServiceWorker();
