import React from 'react'
import PropTypes from 'prop-types'
import { Container } from 'constate'
import { atClampedIdx } from '../../lib/ramda-strict'
import { findIndexById } from '../../lib/ramda-ext'

const initialState = {
  idx: 0,
}

const getSelected = list => state => {
  return atClampedIdx(state.idx, list)
}

const isSelected = (element, list) => state =>
  atClampedIdx(state.idx, list) === element

const setSelected = (element, list) => state => ({
  idx: findIndexById(element.id)(list),
})

const selectors = {
  getSelected,
  isSelected,
}

const actions = {
  setSelected,
}

export const SingleSelectionContainer = props => (
  <Container
    {...props}
    initialState={{
      ...initialState,
    }}
    selectors={{ ...selectors, ...props.selectors }}
    actions={{ ...actions, ...props.actions }}
  />
)

SingleSelectionContainer.propTypes = {
  initialState: PropTypes.object,
  actions: PropTypes.objectOf(PropTypes.func),
  selectors: PropTypes.objectOf(PropTypes.func),
}
