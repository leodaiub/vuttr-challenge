import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from 'serviceWorker';
import 'sanitize.css/sanitize.css';
import CssBaseline from '@material-ui/core/CssBaseline';

import { App } from 'app';

import { HelmetProvider } from 'react-helmet-async';

import { configureAppStore } from 'store/configureStore';

import './locales/i18n';
import { ThemeProvider } from 'theme/ThemeProvider';

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

interface Props {
  Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <React.StrictMode>
          <CssBaseline />
          <ThemeProvider>
            <Component />
          </ThemeProvider>
        </React.StrictMode>
      </HelmetProvider>
    </Provider>
  );
};
const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  module.hot.accept(['./app', './locales/i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    const App = require('./app').App;
    render(App);
  });
}

render(App);

serviceWorker.unregister();
