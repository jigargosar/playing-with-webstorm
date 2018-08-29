import React, { Component, Fragment } from 'react'
import { Page } from './components/Page'
import { GlobalStyles } from './GlobalStyles'
import { Provider } from 'reakit'
import { observer } from 'mobx-react'

const theme = {
  Button: `
    color: tomato;
  `,
}

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
            <Provider theme={theme}>
              <GlobalStyles />
              <Page />
            </Provider>
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

export default observer(App)
