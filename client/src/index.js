import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import TrsrToken from './artifacts/TrsrToken.json'
import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import { DrizzleProvider } from 'drizzle-react-components'

const options = { contracts: [TrsrToken] };
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

ReactDOM.render(
    <DrizzleContext.Provider drizzle={drizzle}>
        <App drizzle={drizzle}/>
    </DrizzleContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
