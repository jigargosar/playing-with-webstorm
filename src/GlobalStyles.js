import React, { Fragment } from 'react'
import Style from 'radium/es/components/style'
import tachyonsRules from 'tachyons'
import indexRules from './index.css'

export function GlobalStyles() {
  return (
    <Fragment>
      <Style rules={tachyonsRules} />
      <Style rules={indexRules} />
    </Fragment>
  )
}
