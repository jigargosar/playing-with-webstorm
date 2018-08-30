import React, { Component, Fragment } from 'react'
import { Page } from './components/Page'
import { GlobalStyles } from './GlobalStyles'
import { Provider } from 'reakit'
import { observer } from 'mobx-react'

const theme = {
  Button: `
    
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
          <Provider theme={theme}>
            <Fragment>
              <GlobalStyles />
              <div
                className={'sans-serif'}
                style={{
                  fontFamily: ['Source Sans Pro', 'Roboto'],
                  fontSize: 16,
                }}
              >
                <Page />
              </div>
            </Fragment>
          </Provider>
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
