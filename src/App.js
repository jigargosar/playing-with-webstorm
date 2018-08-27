import React, { Component, Fragment } from 'react'
import { Page } from './components/Page'
import { Style } from 'radium'

import tachyonsRules from '!radium-loader!css-loader!tachyons' // eslint-disable-line import/no-webpack-loader-syntax
import indexRules from '!radium-loader!css-loader!./index.css' // eslint-disable-line import/no-webpack-loader-syntax

class App extends Component {
  state = {
    hasError: false,
  }
  render() {
    return (
      <Fragment>
        <Style rules={tachyonsRules} />
        <Style rules={indexRules} />
        {this.state.hasError ? 'Error' : <Page />}
      </Fragment>
    )
  }

  componentDidCatch(error, info) {
    console.log(error, info)
    this.setState({ hasError: true })
  }
}

export default App
