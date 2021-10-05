import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import reducers from './reducers'
import App from './components/App';

ReactDOM.render(
    <Provider store={configureStore({reducer: reducers}, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <App />
    </Provider>,
    document.querySelector('#root')
)


