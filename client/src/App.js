import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { DrizzleContext } from "drizzle-react";
import MyDrizzleApp from './MyDrizzleApp';


function App() {
  return (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
  
      if (!initialized) {
        return "Loading...";
      }

      return (
        <MyDrizzleApp drizzle={drizzle} drizzleState={drizzleState} />
      );
    }}
  </DrizzleContext.Consumer>
  )
}

export default App;