import {addDecorator, configure} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'

// addDecorator(
//   withInfo({
//     // header: false, // Global configuration for the info addon across all of your stories.
//     info:"None"
//   }),
// )

addDecorator((story, context) =>
  withInfo({inline:true})(story)(context),
)

function loadStories() {
  require('../src/stories/index.stories')
}

configure(loadStories, module)
