import React from 'react';
import './App.css';
//import logo from './logo.svg';

import { Drizzle, generateStore, EventActions } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import { newContextComponents } from "drizzle-react-components";

import MyDrizzleApp from './MyDrizzleApp';
import drizzleOptions from './drizzleOptions';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Jumbotron } from 'react-bootstrap';


const { AccountData, ContractData, ContractForm } = newContextComponents;

const contractEventNotifier = store => next => action => {
  if (action.type === EventActions.EVENT_FIRED) {
    const contract = action.name
    const contractEvent = action.event.event
    const message = action.event.returnValues._message
    const display = `${contract}(${contractEvent}): ${message}`

    toast.success(display, { position: toast.POSITION.TOP_RIGHT })
    console.log('toast successful', contract)
  }
  console.log('next action', action)
  return next(action)
}

const appMiddlewares = [ contractEventNotifier ]

const drizzleStore = generateStore(
  drizzleOptions,
  appMiddlewares
)

const drizzle = new Drizzle(drizzleOptions, drizzleStore);

const myRender = data => (
  <>
    Value=<b>{data}</b>
  </>
);

function App() {
  return ( 
  <DrizzleContext.Provider drizzle={drizzle}>
   <DrizzleContext.Consumer>
    {drizzleContext => {
      const { 
        drizzle, 
        drizzleState, 
        initialized } = drizzleContext;
      if (!initialized) {
        return "Loading... Are you connected to the Web 3.0?";
      }
      const { accounts } = drizzleState;
      return (
        //<MyDrizzleApp drizzle={drizzle} drizzleState={drizzleState} />
        <>
          <div>
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg text-center">
                  <h1>Col1</h1>
                </div>
                <div className="col-lg text-center">
                  <h1>Col2</h1>
                </div>
                <div className="col-lg text-center">
                  <h1>Col3</h1>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }}
    </DrizzleContext.Consumer>
  </DrizzleContext.Provider>
  )
}

export default App;