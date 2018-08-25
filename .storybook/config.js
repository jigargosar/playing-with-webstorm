import {addDecorator, configure} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'

addDecorator(
  withInfo({
    // header: false, // Global configuration for the info addon across all of your stories.
  }),
)

function loadStories() {
  require('../src/stories/index.stories')
}

configure(loadStories, module)
