import faker from 'faker'

import jsf from 'json-schema-faker'
import nanoid from 'nanoid'

// export const chance = Chance()
// const seed = Math.random()
// export const chance = Chance(seed)
// faker.seed(seed)

export function randomWords() {
  return faker.random.word()
}

jsf.option({
  optionalsProbability: 0.5,
})

jsf.extend('faker', function() {
  return require('faker')
})

jsf.format('modelId', function({ modelName = 'model' }) {
  return `${modelName}_${nanoid()}`
})

export { jsf }

// jsf.resolve(schema).then(function(sample) {
//   console.table(sample.user)
//   // "[object Object]"
//
//   console.log(sample.user.name)
//   // "John Doe"
// })
