import React, { Component, Children } from 'react'


export default class ChildComponent extends React.Component {
  state = { dataKey: null };

  componentDidMount() {
    const { drizzle } = this.props;
    const contract = drizzle.contracts.TrsrToken;

    // get and save the key for the variable we are interested in
    const dataKey = contract.methods["storedData"].cacheCall();
    this.setState({ dataKey });
  }

  render() {
    const { TrsrToken } = this.props.drizzleState.contracts;
    const storedData = TrsrToken.storedData[this.state.dataKey];
    if (this.props.web3.status === 'failed')
    {
      return(
        // Display a web3 warning.
        <main>
          <h1>⚠️</h1>
          <p>This browser has no connection to the Ethereum network. Please use the Chrome/FireFox extension MetaMask, or dedicated Ethereum browsers Mist or Parity.</p>
        </main>
      )
    }

    if (this.props.drizzleStatus.initialized)
    {
      // Load the dapp.
      return Children.only(this.props.children)
    }

    return(
      // Display a loading indicator.
      <main>
        <h1>⚙️</h1>
        <p>Loading dapp...</p>
      </main>
    )
  }
}