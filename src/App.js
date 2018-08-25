import React, {Component, Fragment} from "react";
import "tachyons";
import PageHeader from "./components/PageHeader";
import PageFooter from "./components/PageFooter";

class App extends Component {
  render() {
    return (
      <Fragment>
        <PageHeader />
        <PageFooter />
      </Fragment>
    );
  }
}

export default App;
