import React, { Component, Fragment } from 'react'
import { Page } from './components/Page'
import { GlobalStyles } from './GlobalStyles' // eslint-disable-line import/no-webpack-loader-syntax

class App extends Component {
  state = {
    hasError: false,
  }
  render() {
    return (
      <Fragment>
        {this.state.hasError ? (
          'Error'
        ) : (
          <Fragment>
            <GlobalStyles />
            <Page />
          </Fragment>
        )}
      </Fragment>
    )
  }

  componentDidCatch(error, info) {
    console.log(error, info)
    this.setState({ hasError: true })
  }
}

export default App
