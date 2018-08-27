//
import tachyonsRules from '!radium-loader!css-loader!tachyons' // eslint-disable-line
import indexRules from '!radium-loader!css-loader!./index.css' // eslint-disable-line
//
import React, { Fragment } from 'react'
import { Style } from 'radium'
import { __, pick } from 'ramda'

const tr = tachyonsRules
const trs = pick(__)(tr)
export { tr, trs, indexRules }

export function GlobalStyles() {
  return (
    <Fragment>
      <Style rules={tachyonsRules} />
      <Style rules={indexRules} />
    </Fragment>
  )
}

export const trLink = {
  ...tr['.link'],
  ':focus': tr['.link:focus'],
}
