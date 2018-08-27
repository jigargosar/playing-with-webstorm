import React, { Fragment } from 'react'
import { Style } from 'radium'
import tachyonsRules from '!radium-loader!css-loader!tachyons' // eslint-disable-line
import indexRules from '!radium-loader!css-loader!./index.css' // eslint-disable-line

export { tachyonsRules as tr, indexRules }

export function GlobalStyles() {
  return (
    <Fragment>
      <Style rules={tachyonsRules} />
      <Style rules={indexRules} />
    </Fragment>
  )
}
