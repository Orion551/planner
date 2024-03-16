import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './i18n/config';
import { GlobalStateProvider } from '@Context/GlobalStateContext';

function render() {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  );
}

render();

if (module.hot) {
  module.hot.accept('./App', () => render());
}
