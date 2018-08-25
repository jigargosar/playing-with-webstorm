import {DrawerLayout} from '../shared-components/DrawerLayout'
import React from 'react'
import {PropTypes} from '../lib-exports/PropTypes'

export function MainLayout({ children, title = 'Playing With Webstorm', ...otherProps }) {
  return (
    <DrawerLayout
      header={<div className={'f2 ma2'}>{title}</div>}
      // footer={<div className={"pa2 f4"}>fixed footer</div>}
      {...otherProps}
     children={children}/>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
}
