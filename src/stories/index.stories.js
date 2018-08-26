import React from 'react'
import { storiesOf } from '@storybook/react'
import { DrawerLayout } from '../shared-components/DrawerLayout'
import 'tachyons'

// import {action} from '@storybook/addon-actions'
// import {linkTo} from '@storybook/addon-links'
//
// import {Button, Welcome} from '@storybook/react/demo'
//
// storiesOf('Welcome', module).add('to Storybook', () => (
//   <Welcome showApp={linkTo('Button')} />
// ))
//
// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>
//       <span role="img" aria-label="so cool">
//         😀 😎 👍 💯
//       </span>
//     </Button>
//   ))

const sidebarLayoutStories = storiesOf('DrawerLayout', module)

sidebarLayoutStories.add('with default props', () => (
  <DrawerLayout>a</DrawerLayout>
))
