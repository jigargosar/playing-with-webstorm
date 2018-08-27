import React, { Component } from 'react'
import { Page } from './components/FrePage'

class App extends Component {
  state = {
    hasError: false,
  }
  render() {
    return this.state.hasError ? 'Error' : <Page />
  }

  componentDidCatch(error, info) {
    console.log(error, info)
    this.setState({ hasError: true })
  }
}

export default App
