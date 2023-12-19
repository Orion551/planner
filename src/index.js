import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

function render() {
    ReactDOM.createRoot(document.getElementById('root'))
        .render(
            <App />
        )
}

render();

if(module.hot) {
    module.hot.accept('./App', () => render());
}