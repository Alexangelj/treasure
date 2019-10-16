import React from 'react';
//import logo from './logo.svg';
import './App.css';
import TrsrToken from './artifacts/TrsrToken.json'
import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext } from "drizzle-react";
import { drizzleConnect } from 'drizzle-react'
import { AccountData, ContractData } from 'drizzle-react-components'
import ChildComponent from './ChildComponent'
import TheContent from './TheContent';
import LoadingContainer from './LoadingContainer';


class App extends React.Component {
  render () {
    return (
      <ChildComponent>
          <h2>Hello World</h2>
          </ChildComponent>
    );
  }
}

export default App;
