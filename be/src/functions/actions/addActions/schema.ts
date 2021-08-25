import { JSONSchema6, JSONSchema6Definition } from 'json-schema';

export const action: JSONSchema6Definition = {
  type: 'object',
  properties: {
    action: {
      type: 'string',
    },
    category: {
      type: 'string',
    },
    score: {
      type: 'integer',
    },
  },
  required: ['action', 'category', 'score'],
};

export const addActionSchema: JSONSchema6 = {
  type: 'object',
  properties: {
    actions: {
      type: 'array',
      items: action,
      minItems: 1,
    },
  },
  required: ['actions'],
};
