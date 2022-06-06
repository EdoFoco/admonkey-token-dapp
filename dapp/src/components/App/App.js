// import libraries
import React, { Component } from "react";
import AppContext from "../../services/app-context";
import Routes from "../Routes";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialized: false,
    };
  }

  render() {
    return (
      <AppContext.Provider value={this.state.appContext}>
        <Routes />
      </AppContext.Provider>
    );
  }
}

export default App;
