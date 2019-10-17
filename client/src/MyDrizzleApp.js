import React from "react";
import { DrizzleContext } from "drizzle-react";

export default class MyDrizzleApp extends React.Component {
    state = { dataKey: null };
  
    componentDidMount() {
      const { drizzle } = this.props;
      const contract = drizzle.contracts.TrsrToken;
  
      // get and save the key for the variable we are interested in
      const dataKey = contract.methods["name"].cacheCall();
      this.setState({ dataKey });
    }
  
    render() {
      const { TrsrToken } = this.props.drizzleState.contracts;
      const name = TrsrToken.name[this.state.dataKey];
      console.log('trsrToken debug', TrsrToken)
      console.log('name is', name)
      return <h1> Hello World</h1>;
    }
  }