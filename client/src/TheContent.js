import React from "react";
import { DrizzleContext } from "drizzle-react";
import ChildComponent from './ChildComponent'

export default () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {

      const { drizzle, drizzleState, initialized } = drizzleContext;

      if (!initialized) {
          console.log(initialized)
        return "Loading... from TheContent.js";
      }

      return (
        <ChildComponent drizzle={drizzle} drizzleState={drizzleState} />
      );
    }}
  </DrizzleContext.Consumer>
)