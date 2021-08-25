import { JSONSchema6 } from 'json-schema';
import { action } from 'src/functions/actions/addActions/schema';

export const addAcitvitySchema: JSONSchema6 = {
  type: 'object',
  properties: {
    date: {
      type: 'integer',
      maximum: 0,
    },
    user: {
      type: 'string',
    },
    action,
  },
};
