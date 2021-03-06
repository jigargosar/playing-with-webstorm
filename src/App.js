import React, { Component, Fragment } from 'react'
import { TasksPage } from './components/TasksPage/TasksPage'
import { GlobalStyles } from './GlobalStyles'
import { Provider } from 'reakit'
import { observer } from 'mobx-react'

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
          <Provider>
            <Fragment>
              <GlobalStyles />
              <div
                className={'sans-serif'}
                style={{
                  fontFamily: ['Source Sans Pro', 'Roboto'],
                  fontSize: 16,
                }}
              >
                <TasksPage />
              </div>
            </Fragment>
          </Provider>
        )}
      </Fragment>
    )
  }

  componentDidCatch(error, info) {
    console.debug(error, info)
    this.setState({ hasError: true })
  }
}

export default observer(App)
