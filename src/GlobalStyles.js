//
import tachyonsRules from '!radium-loader!css-loader!tachyons' // eslint-disable-line
import indexRules from '!radium-loader!css-loader!./index.css' // eslint-disable-line
//
import React, { Fragment } from 'react'
import { Style } from 'radium'

export function GlobalStyles() {
  return (
    <Fragment>
      <Style rules={tachyonsRules} />
      <Style rules={indexRules} />
    </Fragment>
  )
}
