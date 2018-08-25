import {DrawerLayout} from "../shared-components/DrawerLayout";
import React from "react";

export function MainLayout({
                             title = 'Playing With Webstorm',
                             ...otherProps
                           }) {
  return (
    <DrawerLayout
      header={<div className={'f2 ma2'}>{title}</div>}
      // footer={<div className={"pa2 f4"}>fixed footer</div>}
      {...otherProps}
    />
  )
}