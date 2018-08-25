import faker from 'faker'
import {Chance} from 'chance'

import jsf from "json-schema-faker";

const seed = Math.random()

export const chance = Chance(seed)
faker.seed(seed)

export function randomWords() {
  return faker.random.word()
}

const schema = {
  type: 'object',
  properties: {
    user: {$ref: '#/definitions/user'},
  },
  required: ['user'],
  definitions: {
    user: {
      type: 'object',
      properties: {
        id: {
          $ref: '#/definitions/positiveInt',
        },
        name: {
          type: 'string',
          faker: 'name.findName',
        },
        email: {
          type: 'string',
          format: 'email',
          faker: 'internet.email',
        },
      },
      required: ['id', 'name', 'email'],
    },
    positiveInt: {
      type: 'integer',
      minimum: 0,
      exclusiveMinimum: true,
    },
  },
};

jsf.resolve(schema).then(function(sample) {
  console.log(sample)
  // "[object Object]"

  console.log(sample.user.name)
  // "John Doe"
})
