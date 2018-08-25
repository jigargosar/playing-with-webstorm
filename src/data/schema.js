export const schema = {
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
          type: 'string',
          format: 'modelId',
          modelName: 'user'
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
      required: ['id', 'mid', 'name', 'email'],
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