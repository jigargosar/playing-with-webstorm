import {addDecorator, configure} from '@storybook/react'
import {withInfo} from '@storybook/addon-info'
import {setConsoleOptions, withConsole} from '@storybook/addon-console';

setConsoleOptions({
  panelExclude: [/\[HMR]/],
});

addDecorator((storyFn, context) => withConsole()(storyFn)(context));


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
