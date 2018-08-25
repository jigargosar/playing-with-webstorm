import React, { Component } from 'react'
import TaskPage from './components/TaskPage'

class App extends Component {
  state = {
    hasError: false,
  }
  render() {
    return this.state.hasError ? 'Error' : <TaskPage />
  }

  componentDidCatch(error, info) {
    console.log(error, info)
    this.setState({ hasError: true })
  }
}

export default App
