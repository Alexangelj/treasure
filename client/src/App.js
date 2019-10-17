import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { DrizzleContext } from "drizzle-react";
import MyDrizzleApp from './MyDrizzleApp';
import { newContextComponents } from "drizzle-react-components";
import { toast } from 'react-toastify';

const { AccountData, ContractData, ContractForm } = newContextComponents;
const myRender = data => (
  <>
    Value=<b>{data}</b>
  </>
);

function App() {
  return (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized } = drizzleContext;
  
      if (!initialized) {
        return "Loading... Are you on the correct network?";
      }
      const { accounts } = drizzleState;
      return (
        //<MyDrizzleApp drizzle={drizzle} drizzleState={drizzleState} />
        <div>
            <h1 className="text-center"> Hello World</h1>
                <h2>Your Account:</h2>
                    <AccountData 
                        drizzle={drizzle} 
                        drizzleState={drizzleState} 
                        accountIndex={0} 
                        units="ether" 
                        precision={0} />
                <h2>Active Account with Custom Rendered Component</h2>
                            <AccountData
                              drizzle={drizzle}
                              drizzleState={drizzleState}
                              accountIndex={0}
                              units="ether"
                              precision={3}
                              render={({ address, balance, units }) => (
                                <div>
                                  <div>My Address: <span style={{ color: "red" }}>{address}</span></div>
                                  <div>My Ether: <span style={{ color: "red" }}>{balance}</span> {units}</div>
                                </div>
                              )}
                            />

                          <div className="section">
                            <h2>TrsrToken</h2>
                            <p>
                              This shows a simple ContractData component with no arguments,
                              along with a form to set its value.
                            </p>
                            <p>
                              <strong>Total Supply of Tokens: </strong>
                              <ContractData
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="TrsrToken"
                                method="balanceOf"
                                methodArgs={[accounts[0]]}
                              />
                            </p>
                            <ContractForm
                              drizzle={drizzle}
                              drizzleState={drizzleState}
                              contract="TrsrToken"
                              method="name"
                            />
                            <p>
                              <strong>Symbol: </strong>
                              <ContractData
                                drizzle={drizzle}
                                drizzleState={drizzleState}
                                contract="TrsrToken"
                                method="symbol"
                              />
                            </p>
                            <ContractForm
                              drizzle={drizzle}
                              drizzleState={drizzleState}
                              contract="TrsrToken"
                              method="decimals"
                            />

                            <h2>TrsrToken with Custom Rendering</h2>
                            <p>
                              This is the same contract as above, but here we customize the ContractForm's rendered component's style.
                            </p>
                            <ContractForm
                              drizzle={drizzle}
                              drizzleState={drizzleState}
                              contract="TrsrToken"
                              method="set"
                              render={({ inputs, inputTypes, state, handleInputChange, handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                  {inputs.map((input, index) => (
                                    <input
                                      style={{ fontSize: 30 }}
                                      key={input.name}
                                      type={inputTypes[index]}
                                      name={input.name}
                                      value={state[input.name]}
                                      placeholder={input.name}
                                      onChange={handleInputChange}
                                    />
                                  ))}
                                  <button
                                    key="submit"
                                    type="button"
                                    onClick={handleSubmit}
                                    style={{ fontSize: 30 }}
                                  >
                                    Submit Big
                                  </button>
                                </form>

                              )}
                            />
                          </div>
                          <div className="section">
            <h2>TrsrToken</h2>
            <p>
              Here we have a form with custom, friendly labels. Also note the
              token symbol will not display a loading indicator. We've
              suppressed it with the <code>hideIndicator</code> prop because we
              know this variable is constant.
            </p>
            <p>
              <strong>Total Supply: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="TrsrToken"
                method="totalSupply"
                methodArgs={[{ from: accounts[0] }]}
              />{" "}
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="TrsrToken"
                method="symbol"
                hideIndicator
              />
            </p>
            <p>
              <strong>My Balance: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="TrsrToken"
                method="balanceOf"
                methodArgs={[accounts[0]]}
              />
            </p>
            <MyDrizzleApp drizzle={drizzle} drizzleState={drizzleState} />
          </div>
        </div>
      );
    }}
  </DrizzleContext.Consumer>
  )
}

export default App;