import { compose } from 'ramda'
import Radium from 'radium'
import { observer } from 'mobx-react'

export const composeHOC = (...hocs) =>
  compose(
    ...hocs,
    Radium,
    observer,
  )
