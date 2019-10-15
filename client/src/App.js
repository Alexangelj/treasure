import React from 'react';
import logo from './logo.svg';
import './App.css';
import TrsrToken from './artifacts/TrsrToken.json'
import { DrizzleProvider } from 'drizzle-react'
import { LoadingContainer } from 'drizzle-react-components'

const drizzleOptions = {
  contracts: [TrsrToken]
}


function App() {
  return (
    <DrizzleProvider options={drizzleOptions}>
      <LoadingContainer>
        <h2>Hello World, and this is Treasure.</h2>
      </LoadingContainer>
    </DrizzleProvider>
  );
}

export default App;
