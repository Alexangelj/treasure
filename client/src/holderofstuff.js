<div className="row">
          <div className="col-lg-1-24">
            <div class="col-lg-1-12">
          <div>
          <div className="index">
          <ToastContainer />
          </div>
            <h1 className="text-center">Hello World</h1>
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
                              method="approve"
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
              />{" "}
                <ContractData
                  drizzle={drizzle}
                  drizzleState={drizzleState}
                  contract="TrsrToken"
                  method="symbol"
                  hideIndicator
                />
            </p>
            <MyDrizzleApp drizzle={drizzle} drizzleState={drizzleState} />
          </div>
        </div>
      </div>
    </div>
    </div>




<nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">WebSiteName</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><a href="#">Home</a></li>
            <li><a href="#">Page 1</a></li>
            <li><a href="#">Page 2</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
            <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
          </ul>
        </div>
      </nav>


        <div>
          <nav className="nav navbar-lg" id="mainNav">
            <a className="navbar-brand-header" href="#">Treasure</a>
          </nav>
          <ul className="nav navbar-n ml-auto justify-content-center" id="mainNav">
            <li className="nav-item">
              <a className="nav-link" href="#">Code</a>
            </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Token</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
          </ul>
        </div>