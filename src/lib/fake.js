import faker from 'faker'
import {Chance} from 'chance'

import jsf from 'json-schema-faker'
import nanoid from "nanoid";

jsf.option({
  optionalsProbability: 0.5
});

const seed = Math.random()

export const chance = Chance(seed)
faker.seed(seed)

export function randomWords() {
  return faker.random.word()
}

const schema = {
  type: 'object',
  properties: {
    user: { $ref: '#/definitions/user' },
  },
  required: ['user'],
  definitions: {
    user: {
      type: 'object',
      properties: {
        id: {
          type:'string',
          format:'modelId',
          modelName:'user'
        },
        name: {
          type: 'string',
          faker: 'name.findName',
        },
        email: {
          type: 'string',
          faker: 'internet.email',
        },
      },
      required: ['id', 'mid','name', 'email'],
    },
    positiveInt: {
      type: 'integer',
      minimum: 0,
      exclusiveMinimum: true,
    },
    modelId: {
      type: 'string',
      faker: 'random.word',
    },
  },
}

jsf.extend('faker', function() {
  return require('faker');
});

jsf.format('modelId', function({modelName='model'}) {
  return `${modelName}_${nanoid()}`;
});


jsf.resolve(schema).then(function(sample) {
  console.table(sample.user)
  // "[object Object]"

  console.log(sample.user.name)
  // "John Doe"
})
